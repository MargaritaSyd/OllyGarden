export function normalizeGitHubRepositoryUrl(value: string) {
  let url: URL;
  try {
    url = new URL(value.trim());
  } catch {
    return null;
  }

  const pathSegments = url.pathname.split("/").filter(Boolean);
  if (
    url.protocol !== "https:" ||
    url.hostname !== "github.com" ||
    url.port ||
    url.username ||
    url.password ||
    pathSegments.length !== 2
  ) {
    return null;
  }

  url.pathname = `/${pathSegments.join("/")}`;
  url.search = "";
  url.hash = "";
  return url.href;
}
