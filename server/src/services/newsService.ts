
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY?.trim();
const genAI = geminiApiKey ? new GoogleGenerativeAI(geminiApiKey) : null;

// Generic helper to get language name
const getLanguageName = (code: string) => {
    const map: Record<string, string> = {
        'hi': 'Hindi', 'ta': 'Tamil', 'te': 'Telugu',
        'gu': 'Gujarati', 'kn': 'Kannada', 'mr': 'Marathi',
        'bn': 'Bengali', 'ml': 'Malayalam', 'pa': 'Punjabi',
        'or': 'Odia', 'as': 'Assamese'
    };
    return map[code.split('-')[0].toLowerCase()] || 'English';
};

// --- Hardcoded Translated News Fallbacks for Resilience ---
const getStaticNewsForLanguage = (language: string) => {
    const langCode = language.split('-')[0].toLowerCase();

    const commonNews = {
        title1: "Supreme Court Launches 'Suswagatam' Portal",
        summary1: "The Supreme Court has launched a new online portal 'Suswagatam' to generate e-passes for visitors.",
        title2: "New Consumer Protection Guidelines",
        summary2: "Government introduces new guidelines for consumer protection in digital commerce.",
        title3: "Digital India Phase 2 Updates",
        summary3: "Expansion of digital services to rural areas for better citizen engagement."
    };

    const translations: any = {
        'hi': [
            { title: "सुप्रीम कोर्ट ने 'सुस्वागतम' पोर्टल लॉन्च किया", summary: "सुप्रीम कोर्ट ने आगंतुकों के लिए ई-पास बनाने के लिए एक नया ऑनलाइन पोर्टल 'सुस्वागतम' लॉन्च किया है।", link: "https://www.india.gov.in" },
            { title: "नए उपभोक्ता संरक्षण दिशानिर्देश", summary: "सरकार ने डिजिटल कॉमर्स में उपभोक्ता संरक्षण के लिए नए दिशानिर्देश पेश किए।", link: "https://pib.gov.in" },
            { title: "डिजिटल इंडिया चरण 2 अपडेट", summary: "बेहतर नागरिक जुड़ाव के लिए ग्रामीण क्षेत्रों में डिजिटल सेवाओं का विस्तार।", link: "https://www.india.gov.in" }
        ],
        'ta': [
            { title: "உச்ச நீதிமன்றம் 'சுஸ்வாகதம்' போர்ட்டலை அறிமுகப்படுத்தியது", summary: "பார்வையாளர்களுக்கான இ-பாஸ்களை உருவாக்க உச்ச நீதிமன்றம் 'சுஸ்வாகதம்' என்ற புதிய ஆன்லைன் போர்ட்டலை அறிமுகப்படுத்தியுள்ளது.", link: "https://www.india.gov.in" },
            { title: "புதிய நுகர்வோர் பாதுகாப்பு வழிகாட்டுதல்கள்", summary: "டிஜிட்டல் வர்த்தகத்தில் நுகர்வோர் பாதுகாப்பிற்கான புதிய வழிகாட்டுதல்களை அரசு அறிமுகப்படுத்தியுள்ளது.", link: "https://pib.gov.in" },
            { title: "டிஜிட்டல் இந்தியா கட்டம் 2 புதுப்பிப்புகள்", summary: "சிறந்த குடிமக்கள் ஈடுபாட்டிற்காக கிராமப்புறங்களில் டிஜிட்டல் சேவைகளை விரிவுபடுத்துதல்.", link: "https://www.india.gov.in" }
        ],
        'te': [
            { title: "సుప్రీం కోర్ట్ 'సుస్వాగతం' పోర్టల్‌ను ప్రారంభించింది", summary: "సందర్శకుల కోసం ఇ-పాస్‌లను రూపొందించడానికి సుప్రీం కోర్ట్ 'సుస్వాగతం' అనే కొత్త ఆన్‌లైన్ పోర్టల్‌ను ప్రారంభించింది.", link: "https://www.india.gov.in" },
            { title: "కొత్త వినియోగదారుల రక్షణ మార్గదర్శకాలు", summary: "డిజిటల్ వాణిజ్యంలో వినియోగదారుల రక్షణ కోసం ప్రభుత్వం కొత్త మార్గదర్శకాలను ప్రవేశపెట్టింది.", link: "https://pib.gov.in" },
            { title: "డిజిటల్ ఇండియా ఫేజ్ 2 అప్‌డేట్‌లు", summary: "పౌరుల భాగస్వామ్యం కోసం గ్రామీణ ప్రాంతాలకు డిజిటల్ సేవలను విస్తరించడం.", link: "https://www.india.gov.in" }
        ],
        'bn': [
            { title: "সুপ্রিম কোর্ট 'সুস্বাগতম' পোর্টাল চালু করেছে", summary: "দর্শকদের জন্য ই-পাস তৈরি করতে সুপ্রিম কোর্ট একটি নতুন অনলাইন পোর্টাল 'সুস্বাগতম' চালু করেছে।", link: "https://www.india.gov.in" },
            { title: "নতুন ভোক্তা সুরক্ষা নির্দেশিকা", summary: "ডিজিটাল বাণিজ্যে ভোক্তা সুরক্ষার জন্য সরকার নতুন নির্দেশিকা এনেছে।", link: "https://pib.gov.in" },
            { title: "ডিজিটাল ইন্ডিয়া ফেস ২ আপডেট", summary: "নাগরিকদের আরও ভালো অংশগ্রহণের জন্য গ্রামীণ এলাকায় ডিজিটাল সেবার সম্প্রসারণ।", link: "https://www.india.gov.in" }
        ],
        'mr': [
            { title: "सुप्रीम कोर्टाने 'सुस्वागतम' पोर्टल लाँच केले", summary: "नगंतुकांसाठी ई-पास तयार करण्यासाठी सुप्रीम कोर्टाने 'सुस्वागतम' हे नवीन ऑनलाइन पोर्टल सुरू केले आहे.", link: "https://www.india.gov.in" },
            { title: "नवीन ग्राहक संरक्षण मार्गदर्शक तत्त्वे", summary: "सरकारने डिजिटल व्यापारात ग्राहक संरक्षणासाठी नवीन मार्गदर्शक तत्त्वे जारी केली आहेत.", link: "https://pib.gov.in" },
            { title: "डिजिटल इंडिया फेज 2 अपडेट्स", summary: "नागरिकांच्या चांगल्या सहभागासाठी ग्रामीण भागात डिजिटल सेवांचा विस्तार.", link: "https://www.india.gov.in" }
        ],
        'gu': [
            { title: "સુપ્રીમ કોર્ટે 'સુસ્વાગતમ' પોર્ટલ લોન્ચ કર્યું", summary: "મુલાકાતીઓ માટે ઈ-પાસ જનરેટ કરવા માટે સુપ્રીમ કોર્ટે નવું ઓનલાઈન પોર્ટલ 'સુસ્વાગતમ' લોન્ચ કર્યું છે.", link: "https://www.india.gov.in" },
            { title: "ગ્રાહક સુરક્ષા માટેની નવી માર્ગદર્શિકા", summary: "સરકારે ડિજિટલ વેપારમાં ગ્રાહક સુરક્ષા માટે નવી માર્ગદર્શિકા રજૂ કરી.", link: "https://pib.gov.in" },
            { title: "ડિજિટલ ઈન્ડિયા ફેઝ 2 અપડેટ્સ", summary: "નાગરિકોની સુવિધા માટે ગ્રામીણ વિસ્તારોમાં ડિજિટલ સેવાઓનો વિસ્તાર.", link: "https://www.india.gov.in" }
        ],
        'kn': [
            { title: "ಸುಪ್ರೀಂ ಕೋರ್ಟ್ 'ಸುಸ್ವಾಗತಂ' ಪೋರ್ಟಲ್ ಪ್ರಾರಂಭಿಸಿದೆ", summary: "ಸಂದರ್ಶಕರಿಗೆ ಇ-ಪಾಸ್ ರಚಿಸಲು ಸುಪ್ರೀಂ ಕೋರ್ಟ್ ಹೊಸ ಆನ್‌ಲೈನ್ ಪೋರ್ಟಲ್ 'ಸುಸ್ವಾಗತಂ' ಅನ್ನು ಪ್ರಾರಂಭಿಸಿದೆ.", link: "https://www.india.gov.in" },
            { title: "ಹೊಸ ಗ್ರಾಹಕ ರಕ್ಷಣೆ ಮಾರ್ಗಸೂಚಿಗಳು", summary: "ಡಿಜಿಟಲ್ ವಾಣಿಜ್ಯದಲ್ಲಿ ಗ್ರಾಹಕರ ರಕ್ಷಣೆಗಾಗಿ ಸರ್ಕಾರವು ಹೊಸ ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಪರಿಚಯಿಸಿದೆ.", link: "https://pib.gov.in" },
            { title: "ಡಿಜಿಟಲ್ ಇಂಡಿಯಾ ಹಂತ 2 ನವೀಕರಣಗಳು", summary: "ಉತ್ತಮ ನಾಗರಿಕ ತೊಡಗಿಸಿಕೊಳ್ಳುವಿಕೆಗಾಗಿ ಗ್ರಾಮೀಣ ಪ್ರದೇಶಗಳಿಗೆ ಡಿಜಿಟಲ್ ಸೇವೆಗಳ ವಿಸ್ತರಣೆ.", link: "https://www.india.gov.in" }
        ],
        'ml': [
            { title: "സുപ്രീം കോടതി 'സുസ്വാഗതം' പോർട്ടൽ ആരംഭിച്ചു", summary: "സന്ദർശകർക്കായി ഇ-പാസ് നൽകുന്നതിനായി സുപ്രീം കോടതി 'സുസ്വാഗതം' എന്ന പുതിയ ഓൺലൈൻ പോർട്ടൽ ആരംഭിച്ചു.", link: "https://www.india.gov.in" },
            { title: "പുതിയ ഉപഭോക്തൃ സംരക്ഷണ മാർഗ്ഗനിർദ്ദേശങ്ങൾ", summary: "ഡിജിറ്റൽ വാണിജ്യത്തിൽ ഉപഭോക്തൃ സംരക്ഷണത്തിനായി സർക്കാർ പുതിയ മാർഗ്ഗനിർദ്ദേശങ്ങൾ അവതരിപ്പിച്ചു.", link: "https://pib.gov.in" },
            { title: "ഡിജിറ്റൽ ഇന്ത്യ ഘട്ടം 2 അപ്‌ഡേറ്റുകൾ", summary: "ഗ്രാമപ്രദേശങ്ങളിലേക്ക് ഡിജിറ്റൽ സേവനങ്ങൾ വ്യാപിപ്പിക്കുന്നു.", link: "https://www.india.gov.in" }
        ],
        'pa': [
            { title: "ਸੁਪਰੀਮ ਕੋਰਟ ਨੇ 'ਸੁਸਵਾਗਤਮ' ਪੋਰਟਲ ਲਾਂਚ ਕੀਤਾ", summary: "ਸੁਪਰੀਮ ਕੋਰਟ ਨੇ ਯਾਤਰੀਆਂ ਲਈ ਈ-ਪਾਸ ਬਣਾਉਣ ਲਈ ਨਵਾਂ ਆਨਲਾਈਨ ਪੋਰਟਲ 'ਸੁਸਵਾਗਤਮ' ਲਾਂਚ ਕੀਤਾ ਹੈ।", link: "https://www.india.gov.in" },
            { title: "ਨਵੇਂ ਖਪਤਕਾਰ ਸੁਰੱਖਿਆ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼", summary: "ਸਰਕਾਰ ਨੇ ਡਿਜੀਟਲ ਵਪਾਰ ਵਿੱਚ ਖਪਤਕਾਰਾਂ ਦੀ ਸੁਰੱਖਿਆ ਲਈ ਨਵੇਂ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ ਪੇਸ਼ ਕੀਤੇ ਹਨ।", link: "https://pib.gov.in" },
            { title: "ਡਿਜੀਟਲ ਇੰਡੀਆ ਫੇਜ਼ 2 ਅਪਡੇਟਸ", summary: "ਵਧੀਆ ਨਾਗਰਿਕ ਸ਼ਮੂਲੀਅਤ ਲਈ ਪੇਂਡੂ ਖੇਤਰਾਂ ਵਿੱਚ ਡਿਜੀਟਲ ਸੇਵਾਵਾਂ ਦਾ ਵਿਸਥਾਰ।", link: "https://www.india.gov.in" }
        ],
        'or': [
            { title: "ସୁପ୍ରିମକୋର୍ଟ 'ସୁସ୍ଵାଗତମ୍' ପୋର୍ଟାଲ୍ ଆରମ୍ଭ କଲେ", summary: "ଦର୍ଶକଙ୍କ ପାଇଁ ଇ-ପାସ୍ ସୃଷ୍ଟି କରିବାକୁ ସୁପ୍ରିମକୋର୍ଟ ଏକ ନୂତନ ଅନଲାଇନ୍ ପୋର୍ଟାଲ୍ 'ସୁସ୍ଵାଗତମ୍' ଆରମ୍ଭ କରିଛନ୍ତି।", link: "https://www.india.gov.in" },
            { title: "ନୂତନ ଗ୍ରାହକ ସୁରକ୍ଷା ନିୟମାବଳୀ", summary: "ଡିଜିଟାଲ୍ ବାଣିଜ୍ୟରେ ଗ୍ରାହକଙ୍କ ସୁରକ୍ଷା ପାଇଁ ସରକାର ନୂତନ ନିୟମାବଳୀ ଆଣିଛନ୍ତି।", link: "https://pib.gov.in" },
            { title: "ଡିଜିଟାଲ୍ ଇଣ୍ଡିଆ ପର୍ଯ୍ୟାୟ ୨ ଅପଡେଟ୍", summary: "ଗ୍ରାମାଞ୍ଚଳରେ ଡିଜିଟାଲ୍ ସେବାର ସମ୍ପ୍ରସାରଣ।", link: "https://www.india.gov.in" }
        ],
        'as': [
            { title: "উচ্চতম ন্যায়ালয়ে 'সুস্বাগতম' পৰ্টেল মুকলি কৰিলে", summary: "দৰ্শকৰ বাবে ই-পাছ সৃষ্টি কৰিবলৈ উচ্চতম ন্যায়ালয়ে এটা নতুন অনলাইন পৰ্টেল 'সুস্বাগতম' মুকলি কৰিছে।", link: "https://www.india.gov.in" },
            { title: "নতুন গ্ৰাহক সুৰক্ষা নিৰ্দেশনা", summary: "ডিজিটেল বাণিজ্যত গ্ৰাহক সুৰক্ষাৰ বাবে চৰকাৰে নতুন নিৰ্দেশনা প্ৰৱৰ্তন কৰিছে।", link: "https://pib.gov.in" },
            { title: "ডিজিটেল ইণ্ডিয়া ফেজ ২ আপডেট", summary: "গ্ৰামাঞ্চলত ডিজিটেল সেৱাৰ সম্প্ৰসাৰণ।", link: "https://www.india.gov.in" }
        ]
    };

    const newsItem = translations[langCode];
    if (newsItem) {
        return newsItem.map((item: any) => ({
            ...item,
            date: new Date().toLocaleDateString()
        }));
    }

    // Default Fallback
    return [
        { title: commonNews.title1, date: new Date().toLocaleDateString(), summary: commonNews.summary1, link: "https://www.india.gov.in" },
        { title: commonNews.title2, date: new Date().toLocaleDateString(), summary: commonNews.summary2, link: "https://pib.gov.in" },
        { title: commonNews.title3, date: new Date().toLocaleDateString(), summary: commonNews.summary3, link: "https://www.india.gov.in" }
    ];
};

export const generateNewsUpdates = async (language: string = 'en') => {
    const langName = getLanguageName(language);

    // 1. Get Robust Static Backup (Fully Translated)
    const staticNews = getStaticNewsForLanguage(language);

    // 2. Try AI Generation for fresh news in target language
    if (genAI) {
        // Multi-model strategy for resilience
        const models = ["gemini-1.5-flash", "gemini-pro", "gemini-1.5-pro-latest"];

        for (const m of models) {
            try {
                console.log(`[NEWS] Generating for ${langName} (${language}) using ${m}...`);
                const model = genAI.getGenerativeModel({ model: m });
                const prompt = `Generate 3 factual Indian legal/civic news updates in ${langName} language (${langName} script).
                Return ONLY a raw JSON array of objects with keys: "title", "date" (today's date), "summary" (short), "link" (real gov link).
                Avoid using Markdown syntax in your response.`;

                const result = await model.generateContent(prompt);
                const text = result.response.text().replace(/```json|```/g, '').trim();
                const news = JSON.parse(text);
                if (Array.isArray(news) && news.length > 0) return news;
            } catch (error: any) {
                console.warn(`[NEWS-DEBUG] Model ${m} failed: ${error?.message || 'Unknown error'}`);
            }
        }

        console.warn("All AI models failed for news generation. Falling back to Translated Static News.");

        // 3. Last resort AI Translation attempt (optional, but good if we have valid source text)
        // If AI generation failed, we can try to translate the ENGLISH static news if we didn't have a hardcoded map.
        // But since we implemented `getStaticNewsForLanguage` which IS translated, we just return that directly.
        // This is safer and faster than a second AI call that is likely to fail if the first one did.
    }

    return staticNews;
};
