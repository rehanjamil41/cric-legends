// 🟢 CHANGE: Ab key .env file se aayegi
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Hum working model ka naam yahan save kar lenge
let selectedModel = null;

export const callGemini = async (prompt, systemInstruction = "") => {
  // 1. Key Check
  if (!apiKey) {
    alert("API Key Missing! Please check your .env file.");
    return "Error: API Key missing.";
  }

  try {
    // -----------------------------------------------------------
    // STEP 1: Model Auto-Discovery (Agar pehle select nahi hua)
    // -----------------------------------------------------------
    if (!selectedModel) {
      console.log("🔍 Checking available models for your Key...");
      
      const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
      const listResponse = await fetch(listUrl);
      const listData = await listResponse.json();

      if (!listResponse.ok) {
        throw new Error(`Model List Failed: ${listData.error?.message}`);
      }

      // Filter: Sirf wo models lo jo 'generateContent' support karte hain
      // Aur jo 'experimental' NAHI hain (stable wale)
      const validModels = listData.models.filter(m => 
        m.supportedGenerationMethods.includes("generateContent") &&
        !m.name.includes("exp") // Experimental models hata diye
      );

      // Prefer: Flash ya Pro
      const bestModel = validModels.find(m => m.name.includes("flash")) || 
                        validModels.find(m => m.name.includes("pro")) || 
                        validModels[0]; // Jo bhi pehla mile

      if (!bestModel) {
        throw new Error("No valid models found for this API Key.");
      }

      // Model ka naam clean karo (e.g., 'models/gemini-pro' -> 'gemini-pro')
      selectedModel = bestModel.name.replace("models/", "");
      console.log("✅ Auto-Selected Working Model:", selectedModel);
    }

    // -----------------------------------------------------------
    // STEP 2: Chat Request
    // -----------------------------------------------------------
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;
    
    const finalPrompt = systemInstruction 
      ? `System: ${systemInstruction}\n\nUser: ${prompt}` 
      : prompt;

    const payload = {
      contents: [{ parts: [{ text: finalPrompt }] }]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("API Error:", data);
        // Agar selected model fail ho jaye (e.g. 429 quota), to cache clear karo
        selectedModel = null;
        const errorMsg = data.error?.message || "Unknown Error";
        alert(`Error: ${errorMsg}`);
        return `Error: ${errorMsg}`;
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";

  } catch (error) {
    console.error("Critical Error:", error);
    alert(`Connection Error: ${error.message}`);
    return "Network connection failed.";
  }
};