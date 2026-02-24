/// <reference types="@cloudflare/workers-types" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
    }
  }

  interface CloudflareEnv {
    DB: D1Database;
    // MEDIA: R2Bucket;  // when you add R2 for photos/videos
  }
}

export {};
