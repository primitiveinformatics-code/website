"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, LogOut, FolderOpen, PlayCircle, FileText,
  Plus, Trash2, ExternalLink, Eye, EyeOff, Loader2,
  ChevronDown, ChevronRight, Pencil, X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Category { id: number; name: string; }
interface Resource { id: number; title: string; description: string; category: string | null; category_id: number | null; gdrive_url: string; published: boolean; }
interface Playlist { id: number; name: string; description: string; type: "video" | "podcast"; }
interface BlogPost { id: number; slug: string; title: string; excerpt: string; content: string; author: string; tags: string[]; published: boolean; published_at: string | null; created_at: string; }

// ─── Shared ───────────────────────────────────────────────────────────────────
const IS: React.CSSProperties = {
  backgroundColor: "rgba(15,23,42,0.8)",
  border: "1px solid rgba(30,41,59,0.8)",
  color: "#F1F5F9",
  width: "100%",
  padding: "9px 13px",
  borderRadius: "10px",
  fontSize: "14px",
  outline: "none",
};

function mkFetch(token: string) {
  return (url: string, opts: RequestInit = {}) =>
    fetch(url, {
      ...opts,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...(opts.headers || {}) },
    });
}

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function Tag({ label, color = "#8B5CF6" }: { label: string; color?: string }) {
  return (
    <span className="px-2 py-0.5 text-xs rounded" style={{ backgroundColor: `${color}18`, color, border: `1px solid ${color}30` }}>
      {label}
    </span>
  );
}

function StatusMsg({ msg }: { msg: { text: string; ok: boolean } | null }) {
  if (!msg) return null;
  return (
    <p className="text-xs mt-2" style={{ color: msg.ok ? "#10B981" : "#EF4444" }}>{msg.text}</p>
  );
}

// ─── Login Modal ──────────────────────────────────────────────────────────────
function LoginModal({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const d = await res.json();
      if (res.ok && d.token) {
        sessionStorage.setItem("adminToken", d.token);
        onLogin(d.token);
      } else {
        setError(d.error || "Invalid credentials");
      }
    } catch {
      setError("Network error — try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#080D1A" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm"
      >
        <div
          className="rounded-2xl p-8"
          style={{ backgroundColor: "rgba(17,24,39,0.95)", border: "1px solid rgba(30,41,59,0.9)", backdropFilter: "blur(16px)" }}
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(99,102,241,0.2))", border: "1px solid rgba(59,130,246,0.3)" }}>
              <Shield size={26} style={{ color: "#3B82F6" }} />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: "#F1F5F9" }}>Admin Login</h1>
            <p className="text-xs mt-1" style={{ color: "#64748B" }}>Primitive Informatics Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com" required autoFocus style={IS} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" required style={{ ...IS, paddingRight: "40px" }} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#64748B" }}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            {error && <p className="text-xs" style={{ color: "#EF4444" }}>{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #3B82F6, #2563EB)", color: "#fff", boxShadow: "0 0 24px rgba(59,130,246,0.25)" }}>
              {loading ? <><Loader2 size={15} className="animate-spin" /> Signing in…</> : "Sign In"}
            </button>
          </form>

          {/* Amplify env setup hint */}
          <div className="mt-6 p-3 rounded-xl" style={{ backgroundColor: "rgba(30,41,59,0.5)", border: "1px solid rgba(30,41,59,0.8)" }}>
            <p className="text-xs font-semibold mb-1" style={{ color: "#64748B" }}>Required Environment Variables</p>
            <code className="text-xs block leading-5" style={{ color: "#475569" }}>
              ADMIN_EMAIL=your@email.com<br />
              ADMIN_PASSWORD=your_password<br />
              ADMIN_TOKEN=random_secret_string
            </code>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Resources Tab ────────────────────────────────────────────────────────────
function ResourcesTab({ token }: { token: string }) {
  const af = useCallback(mkFetch(token), [token]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [newCat, setNewCat] = useState("");
  const [catMsg, setCatMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [form, setForm] = useState({ title: "", description: "", category_id: "", gdrive_url: "", published: true });
  const [resMsg, setResMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadAll = useCallback(async () => {
    const [cr, rr] = await Promise.all([
      af("/api/admin/categories").then((r) => r.json()),
      af("/api/admin/resources").then((r) => r.json()),
    ]);
    setCategories(cr.categories || []);
    setResources(rr.resources || []);
  }, [af]);

  useEffect(() => { loadAll(); }, [loadAll]);

  async function addCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCat.trim()) return;
    const res = await af("/api/admin/categories", { method: "POST", body: JSON.stringify({ name: newCat.trim() }) });
    const d = await res.json();
    if (res.ok) { setNewCat(""); setCatMsg({ text: "Category added", ok: true }); loadAll(); }
    else setCatMsg({ text: d.error || "Failed", ok: false });
    setTimeout(() => setCatMsg(null), 3000);
  }

  async function deleteCategory(id: number) {
    if (!confirm("Delete this category? Resources in it become uncategorized.")) return;
    await af(`/api/admin/categories/${id}`, { method: "DELETE" });
    loadAll();
  }

  async function addResource(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await af("/api/admin/resources", {
      method: "POST",
      body: JSON.stringify({ ...form, category_id: form.category_id ? parseInt(form.category_id) : null }),
    });
    const d = await res.json();
    if (res.ok) {
      setForm({ title: "", description: "", category_id: "", gdrive_url: "", published: true });
      setResMsg({ text: "Resource added!", ok: true });
      loadAll();
    } else setResMsg({ text: d.error || "Failed", ok: false });
    setSubmitting(false);
    setTimeout(() => setResMsg(null), 3000);
  }

  async function deleteResource(id: number) {
    if (!confirm("Delete this resource?")) return;
    await af(`/api/admin/resources/${id}`, { method: "DELETE" });
    loadAll();
  }

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(17,24,39,0.7)", border: "1px solid rgba(30,41,59,0.8)" }}>
        <h3 className="text-base font-semibold mb-4" style={{ color: "#F1F5F9" }}>Manage Categories</h3>
        <form onSubmit={addCategory} className="flex gap-2 mb-4">
          <input value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="New category name…"
            style={{ ...IS, width: "auto", flex: 1 }} />
          <button type="submit" className="px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5"
            style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff" }}>
            <Plus size={14} /> Add
          </button>
        </form>
        <StatusMsg msg={catMsg} />
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <span key={c.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm"
              style={{ backgroundColor: "rgba(30,41,59,0.6)", border: "1px solid rgba(30,41,59,0.8)", color: "#94A3B8" }}>
              {c.name}
              <button onClick={() => deleteCategory(c.id)} className="ml-1 hover:text-red-400 transition-colors">
                <X size={12} />
              </button>
            </span>
          ))}
          {categories.length === 0 && <p className="text-xs" style={{ color: "#475569" }}>No categories yet</p>}
        </div>
      </div>

      {/* Add Resource */}
      <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(17,24,39,0.7)", border: "1px solid rgba(139,92,246,0.2)" }}>
        <h3 className="text-base font-semibold mb-4" style={{ color: "#F1F5F9" }}>Add Google Drive Resource</h3>
        <form onSubmit={addResource} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Resource title" required style={IS} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Category</label>
              <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} style={{ ...IS, cursor: "pointer" }}>
                <option value="">No category</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Google Drive URL *</label>
            <input value={form.gdrive_url} onChange={(e) => setForm({ ...form, gdrive_url: e.target.value })}
              placeholder="https://drive.google.com/file/d/…/view?usp=sharing" required style={IS} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Short description of this resource…" rows={2}
              style={{ ...IS, resize: "vertical", minHeight: "68px" }} />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: "#94A3B8" }}>
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
              Publish immediately
            </label>
            <button type="submit" disabled={submitting}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-60"
              style={{ background: "linear-gradient(135deg,#8B5CF6,#7C3AED)", color: "#fff" }}>
              {submitting ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              Add Resource
            </button>
          </div>
          <StatusMsg msg={resMsg} />
        </form>
      </div>

      {/* Resources List */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(30,41,59,0.8)" }}>
        <div className="px-6 py-4" style={{ backgroundColor: "rgba(17,24,39,0.7)", borderBottom: "1px solid rgba(30,41,59,0.8)" }}>
          <h3 className="text-base font-semibold" style={{ color: "#F1F5F9" }}>Resources ({resources.length})</h3>
        </div>
        {resources.length === 0 ? (
          <div className="px-6 py-8 text-center" style={{ backgroundColor: "rgba(15,23,42,0.5)", color: "#475569" }}>
            No resources yet — add one above.
          </div>
        ) : (
          <div style={{ backgroundColor: "rgba(15,23,42,0.5)" }}>
            {resources.map((r) => (
              <div key={r.id} className="flex items-center gap-4 px-6 py-4"
                style={{ borderBottom: "1px solid rgba(30,41,59,0.5)" }}>
                <FolderOpen size={16} style={{ color: "#8B5CF6", flexShrink: 0 }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium truncate" style={{ color: "#F1F5F9" }}>{r.title}</span>
                    {r.category && <Tag label={r.category} color="#8B5CF6" />}
                    {!r.published && <Tag label="Draft" color="#64748B" />}
                  </div>
                  {r.description && <p className="text-xs mt-0.5 truncate" style={{ color: "#64748B" }}>{r.description}</p>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a href={r.gdrive_url} target="_blank" rel="noopener noreferrer"
                    className="p-1.5 rounded-lg transition-colors hover:bg-white/5" style={{ color: "#64748B" }}>
                    <ExternalLink size={14} />
                  </a>
                  <button onClick={() => deleteResource(r.id)}
                    className="p-1.5 rounded-lg transition-colors hover:bg-red-500/10" style={{ color: "#64748B" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Content Tab (YouTube Playlists) ──────────────────────────────────────────
function ContentTab({ token }: { token: string }) {
  const af = useCallback(mkFetch(token), [token]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [plForm, setPlForm] = useState({ name: "", description: "", type: "video" });
  const [plMsg, setPlMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [ytForm, setYtForm] = useState({ playlistId: "", url: "", title: "", description: "" });
  const [ytMsg, setYtMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadPlaylists = useCallback(async () => {
    const r = await fetch("/api/playlists").then((x) => x.json());
    setPlaylists(r.playlists || []);
  }, []);

  useEffect(() => { loadPlaylists(); }, [loadPlaylists]);

  async function createPlaylist(e: React.FormEvent) {
    e.preventDefault();
    const res = await af("/api/admin/playlists", { method: "POST", body: JSON.stringify(plForm) });
    const d = await res.json();
    if (res.ok) { setPlForm({ name: "", description: "", type: "video" }); setPlMsg({ text: "Playlist created!", ok: true }); loadPlaylists(); }
    else setPlMsg({ text: d.error || "Failed", ok: false });
    setTimeout(() => setPlMsg(null), 3000);
  }

  async function deletePlaylist(id: number) {
    if (!confirm("Delete this playlist and all its videos?")) return;
    await af(`/api/admin/playlists/${id}`, { method: "DELETE" });
    loadPlaylists();
  }

  async function addVideo(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await af("/api/playlists/items", {
      method: "POST",
      body: JSON.stringify({ playlistId: parseInt(ytForm.playlistId), youtubeUrl: ytForm.url, title: ytForm.title, description: ytForm.description }),
    });
    const d = await res.json();
    if (res.ok) { setYtForm({ playlistId: "", url: "", title: "", description: "" }); setYtMsg({ text: "Video added!", ok: true }); }
    else setYtMsg({ text: d.error || "Failed", ok: false });
    setSubmitting(false);
    setTimeout(() => setYtMsg(null), 3000);
  }

  return (
    <div className="space-y-8">
      {/* Playlist management */}
      <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(17,24,39,0.7)", border: "1px solid rgba(59,130,246,0.2)" }}>
        <h3 className="text-base font-semibold mb-4" style={{ color: "#F1F5F9" }}>Manage Playlists</h3>
        <form onSubmit={createPlaylist} className="space-y-3 mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <input value={plForm.name} onChange={(e) => setPlForm({ ...plForm, name: e.target.value })}
                placeholder="Playlist name…" required style={IS} />
            </div>
            <div>
              <select value={plForm.type} onChange={(e) => setPlForm({ ...plForm, type: e.target.value })} style={{ ...IS, cursor: "pointer" }}>
                <option value="video">Video</option>
                <option value="podcast">Podcast</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <input value={plForm.description} onChange={(e) => setPlForm({ ...plForm, description: e.target.value })}
              placeholder="Short description (optional)" style={{ ...IS, flex: 1 }} />
            <button type="submit" className="px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 shrink-0"
              style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff" }}>
              <Plus size={14} /> Create
            </button>
          </div>
          <StatusMsg msg={plMsg} />
        </form>

        <div className="space-y-2">
          {playlists.map((pl) => (
            <div key={pl.id} className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ backgroundColor: "rgba(15,23,42,0.5)", border: "1px solid rgba(30,41,59,0.6)" }}>
              <PlayCircle size={15} style={{ color: pl.type === "podcast" ? "#EF4444" : "#8B5CF6", flexShrink: 0 }} />
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium" style={{ color: "#F1F5F9" }}>{pl.name}</span>
                <Tag label={pl.type} color={pl.type === "podcast" ? "#EF4444" : "#8B5CF6"} />
              </div>
              <button onClick={() => deletePlaylist(pl.id)}
                className="p-1.5 rounded-lg transition-colors hover:bg-red-500/10" style={{ color: "#64748B" }}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {playlists.length === 0 && <p className="text-xs text-center py-4" style={{ color: "#475569" }}>No playlists yet</p>}
        </div>
      </div>

      {/* Add YouTube Video */}
      <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(17,24,39,0.7)", border: "1px solid rgba(239,68,68,0.2)" }}>
        <h3 className="text-base font-semibold mb-4" style={{ color: "#F1F5F9" }}>Add YouTube Video to Playlist</h3>
        <form onSubmit={addVideo} className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Playlist *</label>
            <select value={ytForm.playlistId} onChange={(e) => setYtForm({ ...ytForm, playlistId: e.target.value })}
              required style={{ ...IS, cursor: "pointer" }}>
              <option value="">Select a playlist…</option>
              {playlists.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>YouTube URL *</label>
            <input value={ytForm.url} onChange={(e) => setYtForm({ ...ytForm, url: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=…" required style={IS} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Title</label>
              <input value={ytForm.title} onChange={(e) => setYtForm({ ...ytForm, title: e.target.value })}
                placeholder="Video title" style={IS} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Description</label>
              <input value={ytForm.description} onChange={(e) => setYtForm({ ...ytForm, description: e.target.value })}
                placeholder="Short description" style={IS} />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={submitting}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-60"
              style={{ background: "linear-gradient(135deg,#EF4444,#DC2626)", color: "#fff" }}>
              {submitting ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              Add Video
            </button>
          </div>
          <StatusMsg msg={ytMsg} />
        </form>
      </div>
    </div>
  );
}

// ─── Blog Tab ─────────────────────────────────────────────────────────────────
function BlogTab({ token }: { token: string }) {
  const af = useCallback(mkFetch(token), [token]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [slugEdited, setSlugEdited] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", author: "Primitive Informatics", tags: "", published: false });
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const loadPosts = useCallback(async () => {
    setPostsLoading(true);
    setPostsError(null);
    try {
      const res = await af("/api/admin/blog");
      if (!res.ok) {
        const d = await res.json();
        setPostsError(d.error || `Server error (${res.status})`);
        return;
      }
      const d = await res.json();
      setPosts(d.posts || []);
    } catch {
      setPostsError("Network error — check your connection and try again");
    } finally {
      setPostsLoading(false);
    }
  }, [af]);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  useEffect(() => {
    if (!slugEdited && !editing) {
      setForm((f) => ({ ...f, slug: toSlug(f.title) }));
    }
  }, [form.title, slugEdited, editing]);

  function startEdit(post: BlogPost) {
    setEditing(post);
    setSlugEdited(true);
    setForm({
      title: post.title, slug: post.slug, excerpt: post.excerpt || "",
      content: post.content || "", author: post.author || "Primitive Informatics",
      tags: (post.tags || []).join(", "), published: post.published,
    });
  }

  function cancelEdit() {
    setEditing(null);
    setSlugEdited(false);
    setForm({ title: "", slug: "", excerpt: "", content: "", author: "Primitive Informatics", tags: "", published: false });
    setMsg(null);
  }

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);
    const payload = { ...form };
    const url = editing ? `/api/admin/blog/${editing.id}` : "/api/admin/blog";
    const method = editing ? "PUT" : "POST";
    const res = await af(url, { method, body: JSON.stringify(payload) });
    const d = await res.json();
    if (res.ok) {
      setMsg({ text: editing ? "Post updated!" : "Post created!", ok: true });
      cancelEdit();
      loadPosts();
    } else {
      setMsg({ text: d.error || "Failed", ok: false });
    }
    setSubmitting(false);
  }

  async function togglePublish(post: BlogPost) {
    await af(`/api/admin/blog/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...post, tags: post.tags.join(", "), published: !post.published }),
    });
    loadPosts();
  }

  async function deletePost(id: number) {
    if (!confirm("Permanently delete this post?")) return;
    await af(`/api/admin/blog/${id}`, { method: "DELETE" });
    loadPosts();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Post List */}
      <div className="lg:col-span-2 space-y-2">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold" style={{ color: "#F1F5F9" }}>Posts ({posts.length})</h3>
          {editing && (
            <button onClick={cancelEdit} className="text-xs flex items-center gap-1" style={{ color: "#64748B" }}>
              <X size={12} /> Cancel edit
            </button>
          )}
        </div>
        {postsLoading && (
          <div className="flex items-center justify-center py-8 gap-2" style={{ color: "#64748B" }}>
            <Loader2 size={14} className="animate-spin" /> Loading posts…
          </div>
        )}
        {postsError && (
          <div className="px-4 py-3 rounded-xl text-xs" style={{ backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#EF4444" }}>
            {postsError}
          </div>
        )}
        {!postsLoading && !postsError && posts.length === 0 && (
          <p className="text-xs text-center py-8" style={{ color: "#475569" }}>No posts yet</p>
        )}
        {posts.map((post) => (
          <div key={post.id} className="rounded-xl overflow-hidden"
            style={{ border: editing?.id === post.id ? "1px solid rgba(59,130,246,0.4)" : "1px solid rgba(30,41,59,0.6)" }}>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-left"
              style={{ backgroundColor: expandedId === post.id ? "rgba(30,41,59,0.5)" : "rgba(15,23,42,0.5)" }}
              onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}>
              {expandedId === post.id ? <ChevronDown size={14} style={{ color: "#64748B" }} /> : <ChevronRight size={14} style={{ color: "#64748B" }} />}
              <span className="flex-1 text-sm font-medium truncate" style={{ color: "#F1F5F9" }}>{post.title}</span>
              <span className="px-1.5 py-0.5 text-xs rounded shrink-0"
                style={{ backgroundColor: post.published ? "rgba(16,185,129,0.1)" : "rgba(100,116,139,0.1)", color: post.published ? "#10B981" : "#64748B" }}>
                {post.published ? "Live" : "Draft"}
              </span>
            </button>
            <AnimatePresence>
              {expandedId === post.id && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="px-4 pb-3 flex gap-2 flex-wrap" style={{ backgroundColor: "rgba(15,23,42,0.5)", borderTop: "1px solid rgba(30,41,59,0.5)" }}>
                    <p className="w-full text-xs mt-2 mb-1" style={{ color: "#64748B" }}>
                      {new Date(post.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                    <button onClick={() => startEdit(post)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{ backgroundColor: "rgba(59,130,246,0.1)", color: "#3B82F6", border: "1px solid rgba(59,130,246,0.2)" }}>
                      <Pencil size={11} /> Edit
                    </button>
                    <button onClick={() => togglePublish(post)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{ backgroundColor: post.published ? "rgba(100,116,139,0.1)" : "rgba(16,185,129,0.1)", color: post.published ? "#64748B" : "#10B981", border: `1px solid ${post.published ? "rgba(100,116,139,0.2)" : "rgba(16,185,129,0.2)"}` }}>
                      {post.published ? <><EyeOff size={11} /> Unpublish</> : <><Eye size={11} /> Publish</>}
                    </button>
                    <button onClick={() => deletePost(post.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.2)" }}>
                      <Trash2 size={11} /> Delete
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Create / Edit Form */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(17,24,39,0.7)", border: "1px solid rgba(30,41,59,0.8)" }}>
          <h3 className="text-base font-semibold mb-5" style={{ color: "#F1F5F9" }}>
            {editing ? `Editing: ${editing.title}` : "New Blog Post"}
          </h3>
          <form onSubmit={submitForm} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Post title" required style={IS} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Slug *</label>
              <input value={form.slug}
                onChange={(e) => { setSlugEdited(true); setForm({ ...form, slug: e.target.value }); }}
                placeholder="url-slug" required style={IS} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Author</label>
                <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="Author name" style={IS} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Tags (comma-separated)</label>
                <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="AI, Interview Prep, Career" style={IS} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Excerpt</label>
              <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="One-paragraph summary shown in listing pages…" rows={2}
                style={{ ...IS, resize: "vertical", minHeight: "64px" }} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#94A3B8" }}>Content (Markdown)</label>
              <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="## Heading&#10;&#10;Write your post content in Markdown…" rows={10}
                style={{ ...IS, resize: "vertical", minHeight: "200px", fontFamily: "monospace", fontSize: "13px" }} />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: "#94A3B8" }}>
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                Publish immediately
              </label>
              <div className="flex items-center gap-3">
                {editing && (
                  <button type="button" onClick={cancelEdit} className="px-4 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ backgroundColor: "transparent", color: "#64748B", border: "1px solid rgba(30,41,59,0.8)" }}>
                    Cancel
                  </button>
                )}
                <button type="submit" disabled={submitting}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff" }}>
                  {submitting ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
                  {editing ? "Update Post" : "Create Post"}
                </button>
              </div>
            </div>
            <StatusMsg msg={msg} />
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
type Tab = "resources" | "content" | "blog";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "resources", label: "Audio & Video Resources", icon: <FolderOpen size={15} /> },
  { id: "content", label: "Free Expert Content", icon: <PlayCircle size={15} /> },
  { id: "blog", label: "Blog Posts", icon: <FileText size={15} /> },
];

export default function AdminPage() {
  const [state, setState] = useState<"loading" | "login" | "dashboard">("loading");
  const [token, setToken] = useState("");
  const [tab, setTab] = useState<Tab>("resources");

  useEffect(() => {
    const stored = sessionStorage.getItem("adminToken");
    if (stored) { setToken(stored); setState("dashboard"); }
    else setState("login");
  }, []);

  function handleLogin(t: string) { setToken(t); setState("dashboard"); }
  function handleLogout() { sessionStorage.removeItem("adminToken"); setToken(""); setState("login"); }

  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#080D1A" }}>
        <Loader2 size={28} className="animate-spin" style={{ color: "#3B82F6" }} />
      </div>
    );
  }

  if (state === "login") return <LoginModal onLogin={handleLogin} />;

  return (
    <div style={{ backgroundColor: "#0A0F1C", minHeight: "100vh" }}>
      {/* Dashboard Header */}
      <div style={{ backgroundColor: "rgba(10,15,28,0.95)", borderBottom: "1px solid rgba(30,41,59,0.6)", position: "sticky", top: "64px", zIndex: 40, backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
              <Shield size={15} style={{ color: "#F59E0B" }} />
            </div>
            <span className="font-bold text-sm" style={{ color: "#F1F5F9" }}>Admin Dashboard</span>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:bg-red-500/10"
            style={{ color: "#64748B", border: "1px solid rgba(30,41,59,0.6)" }}>
            <LogOut size={13} /> Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 pb-0">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all"
              style={{
                color: tab === t.id ? "#3B82F6" : "#64748B",
                borderBottomColor: tab === t.id ? "#3B82F6" : "transparent",
                backgroundColor: "transparent",
              }}>
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            {tab === "resources" && <ResourcesTab token={token} />}
            {tab === "content" && <ContentTab token={token} />}
            {tab === "blog" && <BlogTab token={token} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
