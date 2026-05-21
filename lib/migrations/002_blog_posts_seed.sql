-- Seed blog posts from documents/posts
-- Run with: psql $DATABASE_URL -f lib/migrations/002_blog_posts_seed.sql
-- Or: psql -h localhost -U postgres -d primitive -f lib/migrations/002_blog_posts_seed.sql

INSERT INTO blog_posts (slug, title, excerpt, content, author, tags, published, published_at)
VALUES (
  'turboquant-kv-cache-compression',
  'TurboQuant: KV Cache Compression for LLM Inference',
  'LLM inference has a dirty secret: the KV cache grows linearly with context length, and most teams just throw more GPU RAM at it. TurboQuant takes a different approach — compressing the KV cache itself without meaningful quality loss.',
  $post1$
LLM inference has a dirty secret: the KV cache grows linearly with context length, and most teams just throw more GPU RAM at it.

TurboQuant takes a different approach. It compresses the KV cache itself — without meaningful quality loss.

The method combines three techniques working in concert: random orthogonal rotation to spread information uniformly across dimensions, Lloyd-Max optimal scalar quantization tailored to Beta-distributed values, and QJL projection for sign bit preservation. The result is near-lossless key compression (cosine similarity 1.0 at 3–4 bits) — the kind of number that should make inference engineers sit up.

On an RTX 5090 running Qwen3.5-27B-AWQ: 2.0× maximum token capacity while keeping throughput within 3–5% of baseline. On an 8× RTX 3090 cluster with MoE models: 30.9% KV cache savings with consistent retrieval accuracy maintained across 131k token contexts.

The tradeoff? 2-bit value quantization drops cosine similarity to 0.94 — a real tradeoff worth tracking for precision-sensitive workloads.

But here's the broader point: we're still in the early innings of inference optimization. Most production deployments are nowhere near compute-optimal. Papers like TurboQuant are quietly closing the gap between what's theoretically possible and what's actually running in datacenters.

The implementation is open-source and integrates with vLLM via monkey-patching, so the barrier to evaluation is low.

If you're running long-context workloads and haven't looked at KV cache compression recently — this is worth an afternoon.

What's your current bottleneck at inference time: memory, latency, or cost?

---

**References:**
- 0xSero — TurboQuant: KV Cache Compression for LLM Inference, 2026 (https://github.com/0xSero/turboquant)
- TurboQuant paper: arXiv:2504.19874 (ICLR 2026)
  $post1$,
  'Primitive Informatics',
  ARRAY['LLM Inference', 'AI Engineering', 'Machine Learning', 'Generative AI'],
  true,
  '2026-05-21 09:00:00+00'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  tags = EXCLUDED.tags,
  published = EXCLUDED.published,
  published_at = EXCLUDED.published_at,
  updated_at = NOW();

INSERT INTO blog_posts (slug, title, excerpt, content, author, tags, published, published_at)
VALUES (
  'ui-voyager-self-evolving-gui-agent',
  'UI-Voyager: Self-Evolving GUI Agent That Beats Human Performance',
  'A 4B parameter model just beat reported human-level performance on mobile GUI automation. That''s not a headline from a frontier lab — it''s from Tencent Hunyuan, and the method is worth understanding.',
  $post2$
A 4B parameter model just beat reported human-level performance on mobile GUI automation. That's not a headline from a frontier lab — it's from Tencent Hunyuan, and the method is worth understanding.

UI-Voyager achieves an 81.0% Pass@1 success rate on AndroidWorld (116 diverse real-world tasks) using two stages most GUI agent papers skip:

**Stage 1 — Rejection Fine-Tuning (RFT):**
Instead of expensive human annotation, the model generates its own trajectories, filters them with a rule-based verifier, and trains on the successful ones. After three iterations, Pass@1 jumped from 37% to 73%. The data and the model co-evolve — no human in the loop.

**Stage 2 — Group Relative Self-Distillation (GRSD):**
This is the clever part. When a batch of rollouts splits between success and failure at the same decision point (a "fork point"), the system identifies that exact moment using SSIM matching, then uses successful trajectories to directly correct failed ones. Dense, step-level supervision from the agent's own successes — without an external teacher model.

The core insight: failed trajectories aren't noise to be discarded. They're a training signal, if you can identify precisely where they went wrong.

Most RL-based GUI agents treat failure as a binary event. UI-Voyager treats it as a curriculum.

The gap between a 4B model outperforming human-level benchmarks on complex, multi-step mobile tasks and what's actually shipping in consumer products is still enormous. But the infrastructure for self-improving agents that get better by doing — without annotation — is maturing faster than most organisations are ready for.

Are your internal automation workflows anywhere near ready for agents that learn on the job?

---

**References:**
- Zichuan Lin et al. (Tencent Hunyuan) — UI-Voyager: A Self-Evolving GUI Agent Learning via Failed Experience, 2026 (https://arxiv.org/abs/2603.24533)
- AndroidWorld benchmark: Rawles et al., 2025
  $post2$,
  'Primitive Informatics',
  ARRAY['AI Agents', 'Mobile AI', 'GUI Automation', 'Reinforcement Learning', 'Machine Learning'],
  true,
  '2026-05-20 09:00:00+00'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  tags = EXCLUDED.tags,
  published = EXCLUDED.published,
  published_at = EXCLUDED.published_at,
  updated_at = NOW();

INSERT INTO blog_posts (slug, title, excerpt, content, author, tags, published, published_at)
VALUES (
  'microsoft-harrier-oss-multilingual-embeddings',
  'Microsoft Harrier-OSS: State-of-the-Art 94-Language Embeddings',
  'Multilingual embeddings have a dirty secret: most "multilingual" models work well in English, passably in French or German, and noticeably worse in everything else. Microsoft''s Harrier-OSS-v1-270M is worth a look.',
  $post3$
Multilingual embeddings have a dirty secret: most "multilingual" models work well in English, passably in French or German, and noticeably worse in everything else.

Microsoft's Harrier-OSS-v1-270M is worth a look if you're building anything that requires semantic understanding across languages.

270M parameters. 94 languages. 32,768 max token context. MTEB v2 Score of 66.5, which puts it at state-of-the-art for its weight class.

What's technically interesting: it uses a decoder-only architecture with last-token pooling and L2 normalization — not the typical encoder-based setup you'd expect for embeddings. The model was trained with contrastive learning and knowledge distillation from larger embedding models.

MIT licensed.

The capabilities are solid: retrieval, clustering, semantic similarity, classification, bitext mining, reranking — the full enterprise embedding toolkit.

For teams building multilingual RAG pipelines, cross-lingual search, or any semantic layer that needs to work in more than a handful of languages, the combination of size (0.3B in BF16), context length (32k tokens), and MTEB performance is a practical sweet spot.

The 0.6B variant is also available for teams that can afford the extra weight.

What I'm still watching: real-world performance gaps between high-resource and low-resource languages tend to be larger than benchmark numbers suggest. Worth testing on your specific language distribution before committing.

Are you already running multilingual embeddings in production, and how are you handling the quality variance across languages?

---

**References:**
- Microsoft — harrier-oss-v1-270m, 2026 (https://huggingface.co/microsoft/harrier-oss-v1-270m)
- MTEB v2 Benchmark (Massive Text Embedding Benchmark), 2026
  $post3$,
  'Primitive Informatics',
  ARRAY['NLP', 'Embeddings', 'Multilingual AI', 'Semantic Search', 'Machine Learning'],
  true,
  '2026-05-19 09:00:00+00'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  tags = EXCLUDED.tags,
  published = EXCLUDED.published,
  published_at = EXCLUDED.published_at,
  updated_at = NOW();

INSERT INTO blog_posts (slug, title, excerpt, content, author, tags, published, published_at)
VALUES (
  'llava-dymoe-routing-drift-continual-learning',
  'LLaVA-DyMoE: Solving Routing-Drift in Continual Learning',
  'Mixture of Experts promised a clean solution to continual learning: add new experts for new tasks, freeze old ones. Problem solved. Except it isn''t. And the reason is subtle.',
  $post4$
Mixture of Experts promised a clean solution to continual learning: add new experts for new tasks, freeze old ones. Problem solved.

Except it isn't. And the reason is subtle.

When you add new experts to a MoE model and fine-tune on new data, old-task tokens get attracted to those new experts. The router drifts. Old knowledge degrades. This is "routing-drift" — and it's the reason so many MoE-based continual learning systems quietly catastrophically forget.

A new paper from UNSW Sydney identifies that the root cause is at the token level. They call it the "token's dilemma": ambiguous tokens (those with similar affinity to both old and new expert groups) offer minimal learning value for new tasks but pose the highest forgetting risk. The same tokens that are hard to route are the ones that destroy your old capabilities.

LLaVA-DyMoE addresses this with two mechanisms:
- **Token Assignment Guidance (TAG):** identifies ambiguous and old-dominant tokens using a relative affinity score, then steers them away from new experts during training
- **Routing Score Regularization (RSR):** enforces expert-group separation (exclusivity loss) and ensures new experts actually specialise on new data (specialisation loss)

The results on the CoIN benchmark (8 VQA tasks): +7.35% Mean Final Accuracy and +12% improvement in Backward Transfer compared to IncMoELoRA baseline. On ImageNet specifically: 95.80% vs 68.42% — a 27-point gap.

What makes this particularly interesting for practitioners: the method is orthogonal to other continual learning approaches (replay buffers, data augmentation, task-specific routing) and scales to 13B models with consistent gains.

The deeper insight here: architectural decisions alone don't prevent forgetting. You have to intervene at the token routing level to get stable continual learning in MoE systems.

Are you deploying foundation models in production contexts that need to stay updated over time without full retraining?

---

**References:**
- Chongyang Zhao et al. (UNSW Sydney) — On Token's Dilemma: Dynamic MoE with Drift-Aware Token Assignment for Continual Learning of Large Vision Language Models, 2026 (https://arxiv.org/abs/2603.27481)
- CoIN Benchmark (Continual Instruction Learning Benchmark)
  $post4$,
  'Primitive Informatics',
  ARRAY['Continual Learning', 'Mixture of Experts', 'Vision Language Models', 'Machine Learning', 'AI Research'],
  true,
  '2026-05-18 09:00:00+00'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  tags = EXCLUDED.tags,
  published = EXCLUDED.published,
  published_at = EXCLUDED.published_at,
  updated_at = NOW();

INSERT INTO blog_posts (slug, title, excerpt, content, author, tags, published, published_at)
VALUES (
  'harness-agent-team-architect-plugin',
  'Harness: Agent Team Architect Plugin for Claude Code',
  'The hardest part of building multi-agent systems isn''t writing the agents. It''s figuring out how they should talk to each other, who owns which task, and what happens when one fails. Harness tackles this as a design problem first.',
  $post5$
The hardest part of building multi-agent systems isn't writing the agents. It's figuring out how they should talk to each other, who owns which task, and what happens when one fails.

Harness is a Claude Code plugin that tackles this as a design problem first.

It's a meta-skill: you describe your domain, and it generates the full `.claude/agents/` and `.claude/skills/` configuration for a coordinated agent team, choosing from six architectural patterns — Pipeline, Fan-out/Fan-in, Expert Pool, Producer-Reviewer, Supervisor, and Hierarchical Delegation — based on what your task actually needs.

The research paper behind it ("Harness: Structured Pre-Configuration for Enhancing LLM Code Agent Output Quality") reports a 60% improvement in average quality scores and a 100% win rate across 15 software engineering tasks. Those are strong numbers — and they hold up better on complex tasks than simple ones, which is the right direction.

What I find conceptually interesting: the tool treats agent team design as an architectural choice, not an implementation detail. Most teams bolt agents together until something works. Harness forces a deliberate decision about coordination topology before any code gets written.

The Progressive Disclosure feature for skill generation also deserves attention — it layers complexity incrementally, which makes the scaffolding easier to understand and modify.

Apache 2.0 license. Worth exploring if you're building agentic workflows and spending more time on coordination logic than on the actual task logic.

The question it implicitly raises: at what point does your multi-agent orchestration become complex enough that you need a structured methodology to design it?

---

**References:**
- revfactory — Harness: Structured Pre-Configuration for Enhancing LLM Code Agent Output Quality, 2026 (https://github.com/revfactory/harness)
  $post5$,
  'Primitive Informatics',
  ARRAY['AI Agents', 'Multi-Agent', 'Claude Code', 'LLM Engineering', 'Software Engineering'],
  true,
  '2026-05-17 09:00:00+00'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  tags = EXCLUDED.tags,
  published = EXCLUDED.published,
  published_at = EXCLUDED.published_at,
  updated_at = NOW();

INSERT INTO blog_posts (slug, title, excerpt, content, author, tags, published, published_at)
VALUES (
  'trace2skill-agent-skills-from-trajectories',
  'Trace2Skill: Distilling Agent Skills from Trajectory Data',
  'Every time an LLM agent fails a task, it leaves behind a trace. Most systems throw it away. Trace2Skill asks: what if that trace is the most valuable training signal you have?',
  $post6$
Every time an LLM agent fails a task, it leaves behind a trace. Most systems throw it away. Trace2Skill asks: what if that trace is the most valuable training signal you have?

The paper introduces a three-stage pipeline for distilling trajectory-local lessons into transferable, reusable agent skills:

1. The agent runs tasks and generates trajectories (including failed ones).
2. Two parallel analysts — a Success Analyst and an Error Analyst — independently propose "patches": concrete rule updates to the skill document.
3. A Merge Operator consolidates patches hierarchically, resolving conflicts and generalising specific observations into reusable standard operating procedures.

The key finding that surprised me: error analysis produces more transferable patches than success analysis. Success traces tend to generate volatile, situation-specific patches. Failed traces, when analysed carefully, yield broader, more robust rules.

On spreadsheet agent tasks (the benchmark domain), Trace2Skill-generated skills matched or exceeded human-written skills across in-distribution, out-of-distribution, and cross-model settings. The most commonly learned rule across 323 patches: always use openpyxl over pandas.to_excel() for write-back — a specific, portable, actionable insight that generalises beyond any single trajectory.

The latency advantage of parallel consolidation vs. sequential editing was also notable, though the paper is appropriately careful about drawing conclusions from single-run timing data.

What this points toward: agent skill development doesn't have to be a manual knowledge engineering process. If you have trajectories, you have a curriculum. The question is whether you have the infrastructure to harvest it.

Are your agentic systems currently learning anything from their failures — or are you still discarding that signal?

---

**References:**
- Trace2Skill authors — Trace2Skill: Distill Trajectory-Local Lessons into Transferable Agent Skills, 2026 (https://arxiv.org/abs/2603.25158)
  $post6$,
  'Primitive Informatics',
  ARRAY['AI Agents', 'Agent Learning', 'LLM Engineering', 'Machine Learning', 'Skill Distillation'],
  true,
  '2026-05-16 09:00:00+00'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  tags = EXCLUDED.tags,
  published = EXCLUDED.published,
  published_at = EXCLUDED.published_at,
  updated_at = NOW();

INSERT INTO blog_posts (slug, title, excerpt, content, author, tags, published, published_at)
VALUES (
  'gameplayqa-benchmarking-agentic-perception',
  'GameplayQA: Benchmarking Agentic Perception with Multiplayer Games',
  'We keep benchmarking AI on passive video understanding — a model watches a scene and describes it. But real-world agents don''t watch. They act. GameplayQA uses 3D multiplayer gameplay as a cognitive sandbox for testing exactly this.',
  $post7$
We keep benchmarking AI on passive video understanding — a model watches a scene and describes it. But real-world agents don't watch. They act. And they need to track what's happening to themselves, to other agents, and to the shared environment — simultaneously, at pace.

GameplayQA is a new benchmark from USC that uses 3D multiplayer gameplay as a "cognitive sandbox" for testing exactly this.

The numbers that stand out: annotations at 1.22 labels/second across 9 commercial multiplayer games. 2.4K QA pairs organized into three cognitive levels — basic perception (L1), temporal reasoning (L2), and cross-video understanding (L3) requiring synchronized multi-POV analysis. Frontier MLLMs all show a substantial gap from human performance.

The taxonomy is genuinely novel: questions are structured around **Self** (what is the POV player doing?), **Other Agents** (what are teammates/enemies doing?), and **World** (what's happening in the environment?) — a decomposition borrowed from multi-agent reinforcement learning frameworks. This isn't just a video benchmark; it's a test of the kind of situational awareness that agentic systems in robotics, autonomous vehicles, and game AI actually need.

The diagnostic framework also stands out: instead of just reporting accuracy, GameplayQA categorises errors as lexical, temporal, or role-based confusions — so you can see why a model fails, not just that it fails.

The hardest questions? Cross-video synchronization (L3) with average durations of 91–110 seconds across synchronized POV recordings. Models consistently fail at attributing actions to the right agent across camera angles.

This is the kind of research that reveals what frontier models still can't do — which is usually more useful than another benchmark they already ace.

Where do you see multi-agent perception becoming critical first: robotics, games, or enterprise automation?

---

**References:**
- Yunzhe Wang et al. (University of Southern California) — GameplayQA: A Benchmarking Framework for Decision-Dense POV-Synced Multi-Video Understanding of 3D Virtual Agents, 2026 (https://arxiv.org/abs/2603.24329)
- Project page: https://hats-ict.github.io/gameplayqa/
  $post7$,
  'Primitive Informatics',
  ARRAY['Embodied AI', 'Multimodal AI', 'AI Benchmarks', 'Agent Perception', 'Machine Learning'],
  true,
  '2026-05-15 09:00:00+00'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  tags = EXCLUDED.tags,
  published = EXCLUDED.published,
  published_at = EXCLUDED.published_at,
  updated_at = NOW();

INSERT INTO blog_posts (slug, title, excerpt, content, author, tags, published, published_at)
VALUES (
  'murf-multi-resolution-fusion-vision-models',
  'MuRF: Multi-Resolution Fusion for Vision Foundation Models',
  'Vision foundation models are typically deployed at a single, fixed resolution at inference time. MuRF makes a deceptively simple observation: different resolutions offer complementary inductive biases — why pick one?',
  $post8$
Vision foundation models are typically deployed at a single, fixed resolution at inference time.

That's a surprisingly crude choice for something that handles tasks ranging from coarse scene classification to fine-grained pixel-level detection.

MuRF (Multi-Resolution Fusion) from UW-Madison makes a deceptively simple observation: different resolutions offer complementary inductive biases. Low-resolution views capture global semantics. High-resolution views capture fine-grained detail. Why pick one?

The method: process the same image at multiple resolutions through a frozen VFM, then fuse the resulting features. No retraining. No architectural changes. Works at inference time on already-deployed models.

Validated across DINOv2 (the primary focus) and SigLIP2 (contrastive models), so the generalization appears real. The paper covers a range of computer vision tasks, positioning this as a fundamental enhancement to visual representation rather than a task-specific trick.

What I find conceptually clean here: the method takes something that was considered a fixed design choice (inference resolution) and turns it into a tunable parameter you can exploit for free — if you can afford the compute.

The honest tradeoff: multiple forward passes means higher compute cost at inference. This isn't a free lunch, and the paper is open about the compute/accuracy tradeoff. Whether that's acceptable depends heavily on your latency requirements and workload.

But for offline or batch vision tasks where quality matters more than speed, this is worth evaluating immediately — it requires no fine-tuning and works with models you already have.

Are you using any multi-scale inference strategies in your vision pipelines, or sticking with single-resolution for simplicity?

---

**References:**
- Bocheng Zou et al. (University of Wisconsin-Madison) — MuRF: Unlocking the Multi-Scale Potential of Vision Foundation Models, 2026 (https://arxiv.org/abs/2603.25744)
- Project page: https://MuRF-VFM.github.io
  $post8$,
  'Primitive Informatics',
  ARRAY['Computer Vision', 'Vision AI', 'Foundation Models', 'Machine Learning', 'AI Research'],
  true,
  '2026-05-14 09:00:00+00'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  tags = EXCLUDED.tags,
  published = EXCLUDED.published,
  published_at = EXCLUDED.published_at,
  updated_at = NOW();

INSERT INTO blog_posts (slug, title, excerpt, content, author, tags, published, published_at)
VALUES (
  'dreamlite-on-device-image-generation-editing',
  'DreamLite: On-Device Image Generation and Editing in Under 1 Second',
  'FLUX.1 has 12 billion parameters and requires serious cloud infrastructure. DreamLite runs on a Xiaomi 14 smartphone, has 0.39 billion parameters, and generates or edits a 1024×1024 image in under 1 second — in a single model.',
  $post9$
FLUX.1 has 12 billion parameters. It produces stunning images. It also requires serious cloud infrastructure to run at any reasonable latency.

DreamLite (ByteDance) runs on a Xiaomi 14 smartphone. It has 0.39 billion parameters. It generates or edits a 1024×1024 image in under 1 second.

And it does both generation and editing in a single model.

That last part is what makes this technically interesting. Almost every on-device diffusion model in the literature focuses exclusively on text-to-image generation. Editing requires either a separate model or significant architectural additions — more complexity, more RAM, more latency.

DreamLite's solution: in-context spatial concatenation. For generation tasks, the model sees `(target || blank)`. For editing tasks, it sees `(target || source)`. The same compact UNet backbone, the same weights, task routing via explicit `[Generate]` or `[Edit]` prefix tokens. No separate branches, no parameter overhead.

The benchmark numbers: GenEval 0.72 (generation), ImgEdit 4.11 (editing) — outperforming on-device baselines like SnapGen and SANA-0.6B, competitive with larger cloud-side models.

The training strategy is also worth noting: three progressive pretraining stages (T2I → editing → joint), followed by SFT and RL for preference alignment, then DMD2 step distillation down to 4 denoising steps. That's a lot of engineering to get a compact model to behave well across two fundamentally different tasks.

What this signals: the "generative AI requires cloud infrastructure" assumption is eroding faster than most enterprise AI strategies account for. The gap between on-device and server-side quality is closing.

How are you thinking about on-device AI capabilities in your product roadmap?

---

**References:**
- Yuxiang Wei et al. (ByteDance Intelligent Creation Lab) — DreamLite: A Lightweight On-Device Unified Model for Image Generation and Editing, 2026 (https://arxiv.org/abs/2603.28713)
  $post9$,
  'Primitive Informatics',
  ARRAY['On-Device AI', 'Generative AI', 'Diffusion Models', 'Mobile AI', 'AI Engineering'],
  true,
  '2026-05-13 09:00:00+00'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  tags = EXCLUDED.tags,
  published = EXCLUDED.published,
  published_at = EXCLUDED.published_at,
  updated_at = NOW();

INSERT INTO blog_posts (slug, title, excerpt, content, author, tags, published, published_at)
VALUES (
  'docker-container-doctor-ai-agent-devops',
  'Docker Container Doctor: Building an AI Agent for DevOps Automation',
  'A developer built an AI agent that monitors Docker containers, diagnoses failures, and applies fixes — then shared exactly how it works. The part most people will overlook is what made it actually usable in production.',
  $post10$
A developer built an AI agent that monitors Docker containers, diagnoses failures, and applies fixes — then shared exactly how it works. The part most people will overlook is what made it actually usable in production.

The architecture is straightforward: a Python agent polls the Docker socket every 10 seconds, scans logs for error patterns (OOM, connection timeouts, pool exhaustion), sends relevant logs to Claude for diagnosis, and executes safe restarts. Flask endpoint for health checks. Slack webhooks for notifications.

What's interesting is the safety layer:
- **Rate limiting:** 20 diagnoses per hour
- **Error deduplication:** same error doesn't trigger repeated API calls
- **Restart throttling:** max 3 restarts per container per hour
- **Claude-based safety assessment** before any action is taken

That deduplication detail isn't minor. It cut API costs by ~80%. The entire system runs for $3.80/month.

Over 3 weeks of operation, it caught OOM kills, connection pool exhaustion, transient timeouts, and disk space issues. The number it reports: 2–3 hours of monthly manual debugging prevented.

What I find most instructive here isn't the architecture — it's the framing. The developer didn't ask "how do I automate DevOps?" They asked "what is the specific, bounded task that has a clear success condition and is safe to automate?" Container restart decisions fit that shape well: the error signal is observable, the action space is constrained, and Claude can make a credible safety judgment before acting.

That's the template for any agentic automation that actually ships: start with a task that's specific, bounded, and reversible.

What bounded, repetitive operational task in your stack would you automate first if you had a working agent template?

---

**References:**
- freeCodeCamp — Docker Container Doctor: How I Built an AI Agent That Monitors and Fixes My Containers, 2026 (https://www.freecodecamp.org/news/docker-container-doctor-how-i-built-an-ai-agent-that-monitors-and-fixes-my-containers/)

*Note: This article is a practitioner write-up, not peer-reviewed research. The outcome metrics are self-reported by the author.*
  $post10$,
  'Primitive Informatics',
  ARRAY['AI Agents', 'DevOps', 'Docker', 'Cloud Engineering', 'Automation'],
  true,
  '2026-05-12 09:00:00+00'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  tags = EXCLUDED.tags,
  published = EXCLUDED.published,
  published_at = EXCLUDED.published_at,
  updated_at = NOW();
