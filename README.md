# langgraph-app

基于 LangChain、LangGraph 实现的命令行AI聊天Agent，学习大模型工具调用工作流。

## 项目介绍

1. 终端交互：通过 readline-sync 实现命令行交互式对话。
2. 工具调用：内置天气查询Tool，当大模型判断需要天气信息时，自动调用该工具获取数据。
3. 基于 LangGraph 管理对话状态，实现多轮对话循环，理解Agent思考与工具调用的完整链路。

## 安装依赖

```bash
pnpm install
```

## 添加环境变量

根目录添加.env文件，并写入 API_KEY 和 BASE_URL

```
示例：
API_KEY=sk-xxx
BASE_URL=xxx
```

## 启动项目

```bash
pnpm run dev
```
