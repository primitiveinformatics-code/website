"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, File, X, CheckCircle } from "lucide-react";

// TODO: Gate this component behind auth middleware in production

interface UploadedFile {
  name: string;
  size: number;
  progress: number;
  done: boolean;
}

export default function FileUploadZone() {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFiles = useCallback((fileList: FileList) => {
    const acceptedTypes = ["audio/mpeg", "video/mp4", "audio/wav", "video/quicktime", "audio/mp3"];
    const newFiles = Array.from(fileList).filter((f) => {
      const ext = f.name.split(".").pop()?.toLowerCase();
      return acceptedTypes.includes(f.type) || ["mp3", "mp4", "wav", "mov"].includes(ext || "");
    });

    if (newFiles.length === 0) return;

    const uploadItems: UploadedFile[] = newFiles.map((f) => ({
      name: f.name,
      size: f.size,
      progress: 0,
      done: false,
    }));

    setFiles((prev) => [...prev, ...uploadItems]);

    // Simulate upload progress
    // TODO: Connect to actual file upload API
    uploadItems.forEach((_, i) => {
      const startIdx = files.length + i;
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f, idx) => (idx === startIdx ? { ...f, progress: 100, done: true } : f))
          );
        } else {
          setFiles((prev) =>
            prev.map((f, idx) => (idx === startIdx ? { ...f, progress } : f))
          );
        }
      }, 200);
    });
  }, [files.length]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Drop Zone */}
      <motion.div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        animate={{
          borderColor: dragging ? "rgba(59, 130, 246, 0.6)" : "rgba(30, 41, 59, 0.8)",
          backgroundColor: dragging ? "rgba(59, 130, 246, 0.05)" : "rgba(17, 24, 39, 0.5)",
        }}
        className="rounded-2xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all"
        style={{
          border: "2px dashed rgba(30, 41, 59, 0.8)",
          minHeight: "200px",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple
          accept=".mp3,.mp4,.wav,.mov"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <motion.div
          animate={{ scale: dragging ? 1.1 : 1 }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            backgroundColor: dragging ? "rgba(59, 130, 246, 0.2)" : "rgba(30, 41, 59, 0.8)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
          }}
        >
          <Upload size={28} style={{ color: dragging ? "#3B82F6" : "#64748B" }} />
        </motion.div>
        <div className="text-center">
          <p className="font-semibold mb-1" style={{ color: "#F1F5F9" }}>
            {dragging ? "Drop files here" : "Drag & drop files here"}
          </p>
          <p className="text-sm" style={{ color: "#64748B" }}>
            or <span style={{ color: "#3B82F6" }}>browse</span> to upload
          </p>
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          {["MP3", "MP4", "WAV", "MOV"].map((type) => (
            <span
              key={type}
              className="px-2 py-0.5 text-xs rounded"
              style={{ backgroundColor: "rgba(30, 41, 59, 0.8)", color: "#64748B" }}
            >
              {type}
            </span>
          ))}
        </div>
      </motion.div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 space-y-3"
          >
            {files.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="rounded-xl p-4"
                style={{
                  backgroundColor: "rgba(17, 24, 39, 0.8)",
                  border: "1px solid rgba(30, 41, 59, 0.8)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <File size={16} style={{ color: "#3B82F6" }} />
                  <span className="flex-1 text-sm truncate" style={{ color: "#F1F5F9" }}>{file.name}</span>
                  <span className="text-xs shrink-0" style={{ color: "#64748B" }}>{formatSize(file.size)}</span>
                  {file.done ? (
                    <CheckCircle size={16} style={{ color: "#10B981" }} />
                  ) : (
                    <button onClick={() => removeFile(index)}>
                      <X size={16} style={{ color: "#64748B" }} />
                    </button>
                  )}
                </div>
                {!file.done && (
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(30, 41, 59, 1)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #3B82F6, #6366F1)" }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${file.progress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
