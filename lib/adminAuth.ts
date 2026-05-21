export function validateAdminRequest(req: Request): boolean {
  const auth = req.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return false;
  const token = auth.slice(7);
  const adminToken = process.env.ADMIN_TOKEN;
  return !!adminToken && token === adminToken;
}
