import { BaseMessage } from "langchain";
import { StateGraph } from "@langchain/langgraph";
import z from "zod";
import agent from "./agent.js";

const GraphSchema = z.object({
  messages: z.array(z.custom<BaseMessage>().describe("会话记录")),
  count: z.number().optional().describe("会话次数"),
});

type GraphState = z.infer<typeof GraphSchema>;

const llmNode = async (state: GraphState) => {
  const { messages, count } = state;
  const resp = await agent.invoke({ messages });

  return {
    messages: [...messages, resp],
    count: (count ?? 0) + 1,
  };
};

const graphApp = new StateGraph(GraphSchema)
  .addNode("llm", llmNode)
  .addEdge("__start__", "llm")
  .addEdge("llm", "__end__")
  .compile();

export default graphApp;
