export const getApiBaseUrl = (): string => {
  const raw = process.env.PUBLIC_API_URL;
  if (!raw) {
    throw new Error("PUBLIC_API_URL is not configured");
  }

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("PUBLIC_API_URL must be a valid absolute URL");
  }

  const trimmedPath = url.pathname.replace(/\/+$/, "");
  const path = trimmedPath === "/" ? "" : trimmedPath;

  if (/\/api(\/|$)/i.test(path)) {
    url.pathname = path || "/api";
    return url.toString().replace(/\/+$/, "");
  }

  const uuidMatch = path.match(
    /\/([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i
  );
  if (uuidMatch) {
    url.pathname = `/api/${uuidMatch[1]}`;
    return url.toString().replace(/\/+$/, "");
  }

  url.pathname = path ? `${path}/api` : "/api";
  return url.toString().replace(/\/+$/, "");
};
