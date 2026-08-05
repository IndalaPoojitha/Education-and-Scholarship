import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { SCHOLARSHIPS_DATA } from './src/data/scholarships.js';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '5mb' }));

// Lazy instantiation for Gemini AI client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 1. AI Scholarship Matcher Endpoint
app.post('/api/gemini/match-scholarships', async (req, res) => {
  try {
    const { profile } = req.body;
    if (!profile) {
      return res.status(400).json({ error: 'Profile data is required' });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are an expert higher education scholarship advisor specializing in women's education, international grants, STEM fellowships, and social equity funding. Your task is to evaluate a student profile against a list of available scholarships and output a structured JSON array of matching evaluation scores and strategic advice.`;

    const prompt = `
Student Profile:
- Education Level: ${profile.educationLevel || 'Undergraduate'}
- Field of Study: ${profile.fieldOfStudy || 'STEM'}
- Country of Origin: ${profile.countryOfOrigin || 'Global'}
- Target Country for Study: ${profile.targetCountry || 'Global'}
- Academic Standing / GPA: ${profile.gpa || '3.5/4.0'}
- Financial Need Level: ${profile.financialNeed || 'Moderate'}
- Special Background Details: ${Array.isArray(profile.specialStatus) ? profile.specialStatus.join(', ') : profile.specialStatus || 'None'}
- Career & Leadership Goals: ${profile.careerGoals || 'Desire to advance research and empower women in my field'}

Available Scholarships Database:
${JSON.stringify(
  SCHOLARSHIPS_DATA.map((s) => ({
    id: s.id,
    title: s.title,
    provider: s.provider,
    amount: s.amount,
    level: s.level,
    field: s.field,
    region: s.region,
    eligibility: s.eligibility,
    targetAudience: s.targetAudience,
    tags: s.tags,
  })),
  null,
  2
)}

Task:
Evaluate how well the student matches each scholarship. Select the top 4-6 most relevant scholarships for this candidate.
Return a JSON array where each object has:
- scholarshipId (string matching the exact id from database)
- matchPercentage (number between 60 and 99 based on criteria fit)
- matchReason (concise 1-2 sentence explanation of why this student is a strong candidate)
- strengthPoints (array of 2-3 specific student strengths relevant to this grant)
- recommendationTips (array of 2-3 actionable advice points for writing a winning application for this specific scholarship)
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          description: 'List of evaluated scholarship matches for the student',
          items: {
            type: Type.OBJECT,
            properties: {
              scholarshipId: { type: Type.STRING },
              matchPercentage: { type: Type.NUMBER },
              matchReason: { type: Type.STRING },
              strengthPoints: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              recommendationTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: [
              'scholarshipId',
              'matchPercentage',
              'matchReason',
              'strengthPoints',
              'recommendationTips',
            ],
          },
        },
      },
    });

    const jsonText = response.text || '[]';
    const matches = JSON.parse(jsonText);
    res.json({ matches });
  } catch (error: any) {
    console.error('Error matching scholarships:', error);
    res.status(500).json({
      error: 'Failed to compute scholarship matches',
      details: error.message || String(error),
    });
  }
});

// 2. AI Scholarship Essay Feedback Advisor
app.post('/api/gemini/essay-feedback', async (req, res) => {
  try {
    const { scholarshipTitle, essayPrompt, essayDraft, targetWordCount } = req.body;

    if (!essayDraft || essayDraft.trim().length < 20) {
      return res
        .status(400)
        .json({ error: 'Please provide a substantive essay draft (at least 20 characters).' });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are a world-class scholarship review committee member and female educational mentor. Analyze the provided draft essay written by a student applying for a scholarship. Provide constructive, empowering, and concrete feedback in structured JSON format.`;

    const prompt = `
Scholarship Title: ${scholarshipTitle || 'Women Leadership Scholarship'}
Essay Prompt: ${essayPrompt || 'Describe your leadership experience, research passion, and commitment to supporting women and girls in education.'}
Target Word Count: ${targetWordCount || '500 words'}

Student Draft Essay:
"""
${essayDraft}
"""

Please evaluate this essay thoroughly:
1. Rate overall quality score (1 to 100).
2. Analyze tone (e.g. "Confident and passionate", "Understated; needs more active ownership", etc.).
3. Identify 2-4 key strengths already present in the draft.
4. Identify 2-4 specific areas for improvement (clarity, impact metrics, narrative flow).
5. Suggest 2-3 leadership & gender equity alignment ideas to make the essay stand out.
6. Provide a short polished sample snippet showing how a key paragraph could be elevated into a highly persuasive opening or conclusion.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { type: Type.NUMBER },
            toneAnalysis: { type: Type.STRING },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            areasForImprovement: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            leadershipAndImpactSuggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            polishedSnippetSample: { type: Type.STRING },
          },
          required: [
            'overallScore',
            'toneAnalysis',
            'strengths',
            'areasForImprovement',
            'leadershipAndImpactSuggestions',
            'polishedSnippetSample',
          ],
        },
      },
    });

    const jsonText = response.text || '{}';
    const feedback = JSON.parse(jsonText);
    res.json({ feedback });
  } catch (error: any) {
    console.error('Error generating essay feedback:', error);
    res.status(500).json({
      error: 'Failed to generate essay feedback',
      details: error.message || String(error),
    });
  }
});

// Vite Middleware for development / Static fallback for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EduHer Express Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
