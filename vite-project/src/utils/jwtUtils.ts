export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp;
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}
