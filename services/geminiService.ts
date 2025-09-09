import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, RiskCategory } from '../types';



const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        validationScore: {
            type: Type.INTEGER,
            description: "A validation score from 1 to 100 for the startup idea, considering market, financial, technical, and execution risks.",
        },
        scoreRationale: {
            type: Type.STRING,
            description: "A brief, one-sentence explanation for why the score was given, summarizing the key strengths and weaknesses.",
        },
        redFlags: {
            type: Type.ARRAY,
            description: "A list of potential red flags for the startup idea.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: {
                        type: Type.STRING,
                        description: "A short, catchy title for the red flag (e.g., 'Market Saturation').",
                    },
                    description: {
                        type: Type.STRING,
                        description: "A detailed explanation of the red flag and why it's a concern.",
                    },
                    severity: {
                        type: Type.STRING,
                        description: "The severity of the red flag, must be one of: 'High', 'Medium', or 'Low'.",
                    },
                    category: {
                        type: Type.STRING,
                        description: "The category of the red flag, must be one of: 'Market', 'Financial', 'Technical', or 'Execution'."
                    },
                    suggestion: {
                        type: Type.STRING,
                        description: "A concrete, actionable suggestion for how to mitigate this risk. The suggestion should be lean, focusing on low-cost validation methods, 'no-code' solutions, or customer discovery, rather than expensive development."
                    }
                },
                required: ["title", "description", "severity", "category", "suggestion"],
            },
        },
        summary: {
            type: Type.STRING,
            description: "An overall summary providing constructive feedback and actionable next steps for the entrepreneur.",
        },
    },
    required: ["validationScore", "scoreRationale", "redFlags", "summary"],
};

export const analyzeStartupIdea = async (idea: string): Promise<AnalysisResult> => {
    if (!process.env.API_KEY || !ai) {
        throw new Error("API key is missing. Please set your API key in the environment variables to use the analysis feature.");
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze the following startup idea and provide feedback. Be thorough and critical. Startup Idea: "${idea}"`,
            config: {
                systemInstruction: "You are an expert startup advisor and lean startup coach. Your task is to analyze a startup idea and identify potential red flags across four key categories: Market, Financial, Technical, and Execution. For each red flag, you must assign a title, description, severity, category, and a concrete, actionable suggestion for how to mitigate the risk. The suggestion should be lean, focusing on low-cost validation methods, 'no-code' solutions, or customer discovery, rather than expensive development. Be critical but constructive. Provide a final validation score and a rationale for it based on the provided JSON schema. Your feedback should be insightful and actionable for an aspiring entrepreneur.",
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
            },
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        return result as AnalysisResult;

    } catch (error) {
        console.error("Error analyzing startup idea:", error);
        throw new Error("Failed to get analysis from AI. The model may have returned an invalid response. Please try again.");
    }
};