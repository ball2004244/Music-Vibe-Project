export async function authenticateAdmin(
  username: string,
  password: string
): Promise<boolean> {
  const res = await fetch("/api/auth/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    return false;
  }

  return true;
}
