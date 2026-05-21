import pool from "@/lib/db";

export interface Resource {
  id: number;
  title: string;
  description: string;
  category: string | null;
  gdrive_url: string;
}

const SAMPLE_RESOURCES: Resource[] = [
  { id: 1, title: "System Design Interview Guide", description: "Comprehensive guide covering distributed systems, caching, and scalability patterns.", category: "Technical", gdrive_url: "#" },
  { id: 2, title: "Behavioral Interview Workbook", description: "STAR method templates and curated example answers for every situation.", category: "Behavioral", gdrive_url: "#" },
  { id: 3, title: "Salary Negotiation Playbook", description: "Proven strategies to negotiate your compensation package at any level.", category: "Career Growth", gdrive_url: "#" },
  { id: 4, title: "Communication Skills for Engineers", description: "How to present technical ideas clearly to non-technical stakeholders.", category: "Soft Skills", gdrive_url: "#" },
];

export async function getResources(): Promise<Resource[]> {
  try {
    const result = await pool.query(
      `SELECT r.id, r.title, r.description, r.gdrive_url, c.name AS category
       FROM resources r
       LEFT JOIN resource_categories c ON r.category_id = c.id
       WHERE r.published = true
       ORDER BY r.created_at DESC`
    );
    return result.rows.length > 0 ? result.rows : SAMPLE_RESOURCES;
  } catch {
    return SAMPLE_RESOURCES;
  }
}
