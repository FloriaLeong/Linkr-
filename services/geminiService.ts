
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, MatchResult } from "../types";

// 使用 process.env.API_KEY 初始化，并增加防御性处理
const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const getMatchingResults = async (
  query: string,
  allProfiles: UserProfile[]
): Promise<MatchResult[]> => {
  if (!apiKey) {
    console.error("API_KEY is missing. Please check your environment variables.");
    return [];
  }

  const model = "gemini-3-flash-preview";

  const profileContext = allProfiles.map(p => ({
    userId: p.id,
    role: p.role,
    industry: p.industry,
    tags: p.tags.join(", "),
    providing: p.resources,
    lookingFor: p.needs
  }));

  try {
    const response = await ai.models.generateContent({
      model,
      contents: `你现在是 Linkr 智能人脉匹配平台的匹配引擎核心。
      当前用户的搜索需求: "${query}"
      
      人脉库数据:
      ${JSON.stringify(profileContext)}
      
      任务: 请基于以下准则筛选并排名最匹配的 3-5 个用户:
      1. 语义相关性: 用户的角色和行业是否符合需求？
      2. 资源互补: 搜索者需要的资源，匹配者是否正好拥有？
      3. 协同价值: 两者合作是否能产生 1+1>2 的效果？
      
      返回要求:
      必须返回 JSON 数组。
      每个对象包含: userId, score (0-100), 以及 2-3 个简短的中文匹配理由标签 (例如: "资源高度契合", "行业资深专家", "跨界合作潜力")。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              userId: { type: Type.STRING },
              score: { type: Type.NUMBER },
              reasons: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["userId", "score", "reasons"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("AI 响应解析或调用失败", e);
    return [];
  }
};
