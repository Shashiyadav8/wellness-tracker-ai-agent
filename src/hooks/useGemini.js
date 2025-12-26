import { useState } from "react";
import { GEMINI_API_KEY } from "../config";

const useGemini = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const analyzeFood = async (prompt, imageBase64 = null) => {
        if (!GEMINI_API_KEY) {
            setError("Missing Gemini API Key");
            return null;
        }

        setLoading(true);
        setError(null);

        try {
            // ✅ Use model that ACTUALLY exists for your key
            const API_URL =
                `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

            const parts = [];

            // 🖼️ Image support (Gemini 2.5 is multimodal)
            if (imageBase64) {
                const cleanBase64 = imageBase64.split(",")[1] || imageBase64;

                parts.push({
                    inlineData: {
                        data: cleanBase64,
                        mimeType: "image/jpeg"
                    }
                });
            }

            // 📝 Prompt
            parts.push({
                text: `
You are a nutrition assistant.

Analyze the food (image and/or text) and return ONLY valid JSON.
No markdown. No explanation.

JSON format:
{
  "name": "Short meal name",
  "calories": number,
  "protein": number,
  "fats": number,
  "carbs": number,
  "sugar": number,
  "fiber": number,
  "iron": number
}

User input: ${prompt || "Analyze the image"}
        `.trim()
            });

            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts
                        }
                    ]
                })
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.error?.message || `API Error: ${response.status}`);
            }

            const data = await response.json();

            const text =
                data?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!text) throw new Error("No response from Gemini");

            const cleaned = text.replace(/```json|```/g, "").trim();
            return JSON.parse(cleaned);

        } catch (err) {
            console.error("Gemini Error:", err);
            setError(err.message || "Gemini analysis failed");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { analyzeFood, loading, error };
};

export default useGemini;
