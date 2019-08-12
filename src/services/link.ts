const isDevelopment = process.env.NODE_ENV === "development";

export const protol = isDevelopment ? "http" : "https";
export const host = isDevelopment ? "localhost" : "blog.swnb.site";

export const GitHub = "https://github.com/swnb";
export const CanvasCutBetter = "https://swnb.github.io/canvas-cut-better/"

export const concatURL = (path: string) => `${protol}://${host}${path}`;
