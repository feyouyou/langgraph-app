import { tool } from "langchain";
import { getWeather } from "../api/apis.js";
import z from "zod";

const weatherTool = tool(
  async ({ city, date }) => {
    const weatherResp = await getWeather(city, date);
    return JSON.stringify({
      daily_units: weatherResp.daily_units,
      daily: weatherResp.daily,
    });
  },
  {
    name: "get_weather_tool",
    description: "这是一个用于获取指定城市指定日期的天气工具",
    schema: z.object({
      city: z
        .string()
        .describe(
          "指定城市。中国城市使用拼音，如：beijing、shanghai、guangzhou；外国城市使用英文名，如：osaka，houston",
        ),
      date: z
        .string()
        .describe("指定日期。格式必须是 YYYY-MM-DD，如：2026-01-23"),
    }),
  },
);

export default weatherTool;
