import { AIMessage, BaseMessage, HumanMessage } from "langchain";
import readlineSync from "readline-sync";
import graphApp from "./modules/graph.js";

(async () => {
  const messages: BaseMessage[] = [];

  while (true) {
    const question = readlineSync.question("\n👤 用户：").trim();

    if (!question) continue;

    if (question.toLowerCase() === "exit") break;

    if (question.toLowerCase() === "clear") {
      messages.length = 0;
      console.log("记忆已清除");
      continue;
    }

    if (question.toLowerCase() === "history") {
      console.log(messages);
      continue;
    }

    // 对话

    try {
      const newMessages: BaseMessage[] = [
        ...messages,
        new HumanMessage(question),
      ];

      const events = graphApp.streamEvents(
        {
          messages: newMessages,
        },
        {
          version: "v2",
        },
      );

      process.stdout.write("\n🤖 AI：");

      let finalAnswer = "";

      for await (const ev of events) {
        if (ev.event === "on_chat_model_stream") {
          // 思考链
          const reason = ev.data.chunk.additional_kwargs.reasoning_content;
          if (reason) {
            process.stdout.write("\x1b[33m" + reason + "\x1b[0m");
          }
          // 回答
          const content = ev.data.chunk.content;
          if (content) {
            finalAnswer += content;
            process.stdout.write(content);
          }
        }

        if (ev.event === "on_tool_start") {
          process.stdout.write(`\n 【正在调用工具 ${ev.name}】\n`);
        }

        if (ev.event === "on_tool_end") {
          process.stdout.write(`\n 【调用工具完成 ${ev.name}】\n`);
        }
      }

      console.log("\n");

      messages.push(new HumanMessage(question), new AIMessage(finalAnswer));
    } catch (err) {
      console.log("--------- 会话报错 ----------", err);
    }
  }
})();
