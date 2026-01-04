import { Request, Response } from 'express';
import { chatWithAI, genAI } from '../services/aiService';
import { questionnaireSchemas } from '../services/questionnaireSchemas';
import { schemasHi, schemasGu, schemasTa, schemasTe } from '../services/translatedSchemas';
import { schemasMl, schemasBn, schemasMr, schemasKn, schemasPa, schemasOr, schemasAs } from '../services/translatedSchemas2';
import { additionalGuTe } from '../services/translatedSchemas3';

export const chat = async (req: Request, res: Response) => {
    try {
        const { message, language, context } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const response = await chatWithAI(message, language || 'en', context);

        res.json({ response });
    } catch (error: any) {
        console.error('Chat error:', error);
        res.status(500).json({ error: error.message || 'Failed to get AI response' });
    }
};

export const getQuestionnaireSchema = async (req: Request, res: Response) => {
    try {
        const { type } = req.params;
        const lang = req.query.lang as string;

        let schema = JSON.parse(JSON.stringify(questionnaireSchemas[type]));

        if (!schema) {
            return res.status(404).json({ error: 'Schema not found for this petition type' });
        }

        // 1. Check Hardcoded Translations
        if (lang === 'hi' || lang?.startsWith('hi')) {
            if (schemasHi[type]) schema = schemasHi[type];
        } else if (lang === 'gu' || lang?.startsWith('gu')) {
            if (schemasGu[type]) {
                schema = schemasGu[type];
            } else if (additionalGuTe.gu[type as keyof typeof additionalGuTe.gu]) {
                schema = additionalGuTe.gu[type as keyof typeof additionalGuTe.gu];
            }
        } else if (lang === 'ta' || lang?.startsWith('ta')) {
            if (schemasTa[type]) schema = schemasTa[type];
        } else if (lang === 'te' || lang?.startsWith('te')) {
            if (schemasTe[type]) {
                schema = schemasTe[type];
            } else if (additionalGuTe.te[type as keyof typeof additionalGuTe.te]) {
                schema = additionalGuTe.te[type as keyof typeof additionalGuTe.te];
            }
        } else if (lang === 'ml' || lang?.startsWith('ml')) {
            if (schemasMl[type]) schema = schemasMl[type];
        } else if (lang === 'bn' || lang?.startsWith('bn')) {
            if (schemasBn[type]) schema = schemasBn[type];
        } else if (lang === 'mr' || lang?.startsWith('mr')) {
            if (schemasMr[type]) schema = schemasMr[type];
        } else if (lang === 'kn' || lang?.startsWith('kn')) {
            if (schemasKn[type]) schema = schemasKn[type];
        } else if (lang === 'pa' || lang?.startsWith('pa')) {
            if (schemasPa[type]) schema = schemasPa[type];
        } else if (lang === 'or' || lang?.startsWith('or')) {
            if (schemasOr[type]) schema = schemasOr[type];
        } else if (lang === 'as' || lang?.startsWith('as')) {
            if (schemasAs[type]) schema = schemasAs[type];
        }
        // 2. AI Fallback for ANY other language (if schema is still English)
        else if (lang && !lang.startsWith('en')) {
            try {
                const geminiKey = process.env.GEMINI_API_KEY?.trim();
                if (geminiKey && genAI) {
                    console.log(`[AI] Translating schema ${type} to ${lang}...`);
                    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                    const prompt = `Translate this JSON schema for a legal petition into ${lang} language. 
                    Return ONLY the translated JSON object.
                    Keep the 'id', 'type', 'required' fields exactly same. 
                    Only translate 'title', 'description', 'label', 'placeholder', and 'options' values.
                    
                    Schema: ${JSON.stringify(schema)}`;

                    const result = await model.generateContent(prompt);
                    const translatedText = result.response.text();
                    const jsonMatch = translatedText.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        schema = JSON.parse(jsonMatch[0]);
                    }
                }
            } catch (err) {
                console.error("AI Schema Translation Failed:", err);
                // Schema stays as English fallback
            }
        }

        res.json(schema);
    } catch (error) {
        console.error('Get schema error:', error);
        res.status(500).json({ error: 'Failed to fetch questionnaire schema' });
    }
};
