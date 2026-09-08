declare global {
  namespace NodeJS {
    interface ProcessEnv {
      QWEN_API_KEY: string;
      QWEN_BASE_URL: string;
      KIMI_API_KEY: string;
      KIMI_BASE_URL: string;
    }
  }
}

export {};
