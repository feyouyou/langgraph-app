import { ChatOpenAI } from "@langchain/openai";
import { createAgent } from "langchain";
import tools from "../tools/index.js";

const model = new ChatOpenAI({
  model: "qwen3.8-flash",
  configuration: {
    apiKey: process.env.API_KEY,
    baseURL: process.env.BASE_URL,
  },
});

const agent = createAgent({
  model,
  tools,
  systemPrompt: `你是一个幽默的中文助手，回答要简洁。当前的记准时间为${new Date().toString()}`,
});

export default agent;
