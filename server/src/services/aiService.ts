
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY?.trim();
export const genAI = geminiApiKey ? new GoogleGenerativeAI(geminiApiKey) : null;

interface PetitionData {
    type: string;
    language: string;
    userName?: string;
    name?: string;
    [key: string]: any;
}

// Map languages to English names for prompt construction
const getLanguageName = (code: string) => {
    const map: Record<string, string> = {
        'hi': 'Hindi', 'ta': 'Tamil', 'te': 'Telugu',
        'gu': 'Gujarati', 'kn': 'Kannada', 'mr': 'Marathi',
        'bn': 'Bengali', 'ml': 'Malayalam', 'pa': 'Punjabi',
        'or': 'Odia', 'as': 'Assamese'
    };
    return map[code.split('-')[0].toLowerCase()] || 'English';
};

// Helper: AI translation for small strings (names, etc)
async function translateToLanguage(text: string, targetLang: string): Promise<string> {
    if (!genAI || !text || text.toLowerCase().includes('authority')) return text;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Translate the following name or phrase into ${targetLang} script only: "${text}". No English. Output ONLY the translated text.`;
        const result = await model.generateContent(prompt);
        const translated = result.response.text().trim();
        return translated || text;
    } catch (e) {
        return text;
    }
}

export const generatePetition = async (data: PetitionData): Promise<string> => {
    console.log(`[AI-DEBUG] Petition Request: ${data.language}`);
    const hasGemini = !!geminiApiKey && !!genAI;
    const langCode = data.language?.split('-')[0].toLowerCase() || 'en';
    const targetLangName = getLanguageName(langCode);

    // 1. Pre-translate dynamic user fields for better results
    let translatedName = data.userName || data.name || 'Petitioner';
    if (langCode !== 'en' && hasGemini) {
        translatedName = await translateToLanguage(translatedName, targetLangName);
    }

    // Reconstruct data with translated name so AI sees it as native
    const processingData = { ...data, userName: translatedName };

    const prompt = `Draft a professional Indian legal petition for the following:
    Type: ${data.type}
    Details: ${JSON.stringify(processingData, null, 2)}
    
    IMPORTANT INSTRUCTIONS:
    1. Write the entire petition in ${targetLangName} language (${targetLangName} script).
    2. USE ${targetLangName} SCRIPT ONLY. 
    3. Use a formal, state-level legal tone appropriate for e-Jagriti.
    4. Format with professional headers in ${targetLangName}: BEFORE THE AUTHORITY, IN THE MATTER OF, PRAYER, etc.
    5. Translate all English terms like "Google User", "State Authority", etc. into ${targetLangName} script.
    6. No English text allowed in the draft content.
    7. No introductory text or meta-talk.`;

    if (hasGemini) {
        // Use flash model for speed and translation capability
        // Use 'gemini-1.5-pro' if available for better reasoning, but flash is good and fast.
        const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest"];

        for (const m of models) {
            try {
                const model = genAI!.getGenerativeModel({ model: m });
                const result = await model.generateContent(prompt);
                const text = result.response.text();

                if (text && text.length > 50) {
                    // Create a localized metadata header
                    let headerText = `[E-JAGRITI OFFICIAL AI DRAFT - ${targetLangName.toUpperCase()}]`;

                    // Simple hardcoded translations for common headers to ensure script consistency
                    const headers: Record<string, string> = {
                        'hi': '[ई-जागृति आधिकारिक एआई ड्राफ्ट]',
                        'ta': '[ஈ-ஜாக்ரிதி அங்கீகரிக்கப்பட்ட வரைவு]',
                        'te': '[ఈ-జాగృతి అధికారిక AI డ్రాఫ్ట్]',
                        'gu': '[ઇ-જાગૃતિ સત્તાવાર AI ડ્રાફ્ટ]',
                        'kn': '[ಇ-ಜಾಗೃತಿ ಅಧಿಕೃತ AI ಕರಡು]',
                        'ml': '[ഇ-ജാഗ്രതി ഔദ്യോഗിക AI ഡ്രാഫ്റ്റ്]',
                        'mr': '[ई-जागृती अधिकृत AI मसुदा]',
                        'bn': '[ই-জাগৃতি অফিসিয়াল এআই ড্রাফ্ট]',
                        'pa': '[ਈ-ਜਾਗ੍ਰਿਤੀ ਅਧਿਕਾਰਤ AI ਡਰਾਫਟ]',
                        'or': '[ଇ-ଜାଗୃତି ଅଫିସିଆଲ୍ AI ଡ୍ରାଫ୍ଟ]',
                        'as': '[ই-জাগৃতি অফিচিয়েল এআই ড্ৰাফ্ট]'
                    };

                    if (headers[langCode]) {
                        headerText = headers[langCode];
                    }

                    return `${headerText}\n\n${text}`;
                }
            } catch (err: any) {
                console.warn(`[AI-DEBUG] Model ${m} failed for ${targetLangName}: ${err.message}`);
            }
        }
    }

    console.warn("[AI-DEBUG] AI Failed. Falling back to Mock.");
    return generateMockPetition({ ...data, userName: translatedName }, targetLangName);
};

// Expanded Mock Generation with rudimentary support for all
const generateMockPetition = (data: PetitionData, langName: string): string => {
    const langCode = data.language?.split('-')[0] || 'en';

    // Default English Mock
    const defaultMock = `[E-JAGRITI OFFICIAL AI DRAFT]
    
BEFORE THE HONOURABLE AUTHORITY

IN THE MATTER OF:
${data.userName || 'Petitioner'}
...Petitioner

VERSUS

${data.oppositeParty || 'Respondent Authority'}
...Respondent

SUBJECT: Formal Petition regarding ${data.type.toUpperCase()}

MOST RESPECTFULLY SHOWETH:

1. That the petitioner is a citizen of India residing at ${data.userAddress || '[Address]'}.
2. That the petitioner wishes to bring to your notice: ${data.questionnaireData?.information_details || 'Details provided in application'}.
3. That the petitioner requests immediate action on this matter.

GROUNDS:
The legal rights of the petitioner have been violated and service deficiency is observed.

PRAYER:
It is therefore prayed that this Authority may be pleased to grant the requested relief.

DATE: ${new Date().toLocaleDateString()}
SIGNATURE: ${data.userName || 'Petitioner'}`;

    // If English, return default
    if (langCode === 'en') return defaultMock;

    // For other languages, since we don't have hardcoded mocks for all 12 yet,
    // we return a "Translation Pending" English draft properly labeled, 
    // OR if we have specific hardcoded ones (Hi/Ta/Te), we use them.

    // We can try to use the 'translateToLanguage' as a last resort if it was async, 
    // but here we are synchronous.
    // Ideally, for the hackathon, we ensure AI works so we don't hit this.
    // But let's keep the Hi/Ta/Te mocks we built.

    if (langCode === 'hi') return generateHindiMock(data);
    if (langCode === 'ta') return generateTamilMock(data);
    if (langCode === 'te') return generateTeluguMock(data);
    if (langCode === 'gu') return generateGujaratiMock(data);
    if (langCode === 'kn') return generateKannadaMock(data);
    if (langCode === 'ml') return generateMalayalamMock(data);
    if (langCode === 'mr') return generateMarathiMock(data);
    if (langCode === 'bn') return generateBengaliMock(data);
    if (langCode === 'pa') return generatePunjabiMock(data);
    if (langCode === 'or') return generateOdiaMock(data);
    if (langCode === 'as') return generateAssameseMock(data);

    // Fallback for others: Return English but with a header saying AI unavailable
    return `[NOTE: AI Generation Failed for ${langName}. Showing English Draft]\n\n${defaultMock}`;
};

// --- Language Specific Mocks (Preserved from previous iterations) ---

const generateHindiMock = (data: any) => `[ई-जागृति आधिकारिक एआई ड्राफ्ट]

माननीय प्राधिकारी के समक्ष

मामले में:
${data.userName}
...याचिकाकर्ता

बनाम

${data.oppositeParty || 'विपक्षी'}
...विपक्षी

विषय: ${data.type} के संबंध में याचिका

अत्यंत विनम्रतापूर्वक निवेदन है:
1. याचिकाकर्ता भारत का नागरिक है और ${data.userAddress || 'पते'} पर रहता है।
2. विवरण: ${data.questionnaireData?.information_details || 'कोई विवरण नहीं'}।

प्रार्थना:
अतः निवेदन है कि उचित कार्यवाही की जाए।

दिनांक: ${new Date().toLocaleDateString()}
हस्ताक्षर: ${data.userName}`;

const generateTamilMock = (data: any) => `[ஈ-ஜாக்ரிதி அங்கீகரிக்கப்பட்ட வரைவு]

மாண்புமிகு அதிகாரி முன்பு

விஷயத்தில்:
${data.userName}
...மனுதாரர்

எதிராக

${data.oppositeParty || 'எதிர் தரப்பு'}
...எதிர்மனுதாரர்

பொருள்: ${data.type} தொடர்பான மனு

மரியாதையுடன் சமர்ப்பிக்கப்படுகிறது:
1. மனுதாரர் இந்திய குடிமகன்.
2. விவரங்கள்: ${data.questionnaireData?.information_details || 'விவரங்கள் இல்லை'}.

கோரிக்கை:
தகுந்த நடவடிக்கை எடுக்குமாறு கேட்டுக்கொள்ளப்படுகிறது.

தேதி: ${new Date().toLocaleDateString()}
கையெழுத்து: ${data.userName}`;

const generateTeluguMock = (data: any) => `[ఈ-జాగృతి అధికారిక AI డ్రాఫ్ట్]

గౌరవనీయ అధికారి సమక్షంలో

విషయంలో:
${data.userName}
...పిటిషనర్

వర్సెస్

${data.oppositeParty || 'ప్రతివాది'}
...రెస్పాండెంట్

విషయం: ${data.type} కి సంబంధించిన పిటిషన్

గౌరవపూర్వక విన్నపం:
1. పిటిషనర్ భారతీయ పౌరుడు.
2. వివరాలు: ${data.questionnaireData?.information_details || 'వివరాలు లేవు'}.

ప్రార్థన:
తగిన చర్య తీసుకోవాలని కోరుతున్నాము.

తేదీ: ${new Date().toLocaleDateString()}
సంతకం: ${data.userName}`;

const generateGujaratiMock = (data: any) => `[ઇ-જાગૃતિ સત્તાવાર AI ડ્રાફ્ટ]

નામદાર સત્તાધિકારી સમક્ષ

બાબતમાં:
${data.userName}
...અરજદાર

વિરુદ્ધ

${data.oppositeParty || 'પ્રતિવાદી'}
...પ્રતિવાદી

વિષય: ${data.type} અંગે અરજી

અત્યંત આદરપૂર્વક રજૂઆત:
1. અરજદાર ભારતીય નાગરિક છે.
2. વિગતો: ${data.questionnaireData?.information_details || 'કોઈ વિગતો નથી'}.

પ્રાર્થના:
યોગ્ય કાર્યવાહી કરવા વિનંતી છે.

તારીખ: ${new Date().toLocaleDateString()}
સહી: ${data.userName}`;

const generateKannadaMock = (data: any) => `[ಇ-ಜಾಗೃತಿ ಅಧಿಕೃತ AI ಕರಡು]

ಗೌರವಾನ್ವಿತ ಪ್ರಾಧಿಕಾರದ ಮುಂದೆ

ವಿಷಯದಲ್ಲಿ:
${data.userName}
...ಅರ್ಜಿದಾರ

ವಿರುದ್ಧ

${data.oppositeParty || 'ಪ್ರತಿವಾದಿ'}
...ಪ್ರತಿವಾದಿ

ವಿಷಯ: ${data.type} ಕುರಿತು ಅರ್ಜಿ

ಅತ್ಯಂತ ಗೌರವದಿಂದ ಸಲ್ಲಿಕೆ:
1. ಅರ್ಜಿದಾರರು ಭಾರತೀಯ ಪ್ರಜೆ.
2. ವಿವರಗಳು: ${data.questionnaireData?.information_details || 'ಯಾವುದೇ ವಿವರಗಳಿಲ್ಲ'}.

ಪ್ರಾರ್ಥನೆ:
ಸೂಕ್ತ ಕ್ರಮ ಕೈಗೊಳ್ಳಲು ಕೋರಲಾಗಿದೆ.

ದಿನಾಂಕ: ${new Date().toLocaleDateString()}
ಸಹಿ: ${data.userName}`;

const generateMalayalamMock = (data: any) => `[ഇ-ജാഗ്രതി ഔദ്യോഗിക AI ഡ്രാഫ്റ്റ്]

ബഹുമാനപ്പെട്ട അധികാരിയുടെ മുമ്പാകെ

വിഷയത്തിൽ:
${data.userName}
...ഹർജിക്കാരൻ

എതിരെ

${data.oppositeParty || 'എതിർകക്ഷി'}
...എതിർകക്ഷി

വിഷയം: ${data.type} സംബന്ധിച്ച ഹർജി

ബഹുമാനപൂർവം ബോധിപ്പിക്കുന്നു:
1. ഹർജിക്കാരൻ ഇന്ത്യൻ പൗരനാണ്.
2. വിവരങ്ങൾ: ${data.questionnaireData?.information_details || 'വിവരങ്ങൾ ലഭ്യമല്ല'}.

അപേക്ഷ:
ഉചിതമായ നടപടി സ്വീകരിക്കണമെന്ന് അപേക്ഷിക്കുന്നു.

തീയതി: ${new Date().toLocaleDateString()}
ഒപ്പ്: ${data.userName}`;

const generateMarathiMock = (data: any) => `[ई-जागृती अधिकृत AI मसुदा]

माननीय प्राधिकरणासमोर

प्रकरणात:
${data.userName}
...याचिकाकर्ता

विरुद्ध

${data.oppositeParty || 'प्रतिवादी'}
...प्रतिवादी

विषय: ${data.type} बाबत याचिका

अत्यंत आदराने सादर:
1. याचिकाकर्ता भारतीय नागरिक आहे.
2. तपशील: ${data.questionnaireData?.information_details || 'तपशील नाही'}.

प्रार्थना:
योग्य ती कारवाई करावी ही विनंती.

दिनांक: ${new Date().toLocaleDateString()}
स्वाक्षरी: ${data.userName}`;

const generateBengaliMock = (data: any) => `[ই-জাগৃতি অফিসিয়াল এআই ড্রাফ্ট]

মাননীয় কর্তৃপক্ষের নিকট

বিষয়ে:
${data.userName}
...আবেদনকারী

বনাম

${data.oppositeParty || 'প্রতিপক্ষ'}
...প্রতিপক্ষ

বিষয়: ${data.type} সম্পর্কিত আবেদন

যথাবিহিত সম্মানপূর্বক নিবেদন:
1. আবেদনকারী একজন ভারতীয় নাগরিক।
2. বিবরণ: ${data.questionnaireData?.information_details || 'কোন বিবরণ নেই'}.

প্রার্থনা:
উপযুক্ত ব্যবস্থা গ্রহণের অনুরোধ জানানো হলো।

তারিখ: ${new Date().toLocaleDateString()}
স্বাক্ষর: ${data.userName}`;

const generatePunjabiMock = (data: any) => `[ਈ-ਜਾਗ੍ਰਿਤੀ ਅਧਿਕਾਰਤ AI ਡਰਾਫਟ]

ਮਾਨਯੋਗ ਅਥਾਰਟੀ ਦੇ ਸਾਹਮਣੇ

ਮਾਮਲੇ ਵਿੱਚ:
${data.userName}
...ਪਟੀਸ਼ਨਰ

ਬਨਾਮ

${data.oppositeParty || 'ਜਵਾਬਦੇਹ'}
...ਜਵਾਬਦੇਹ

ਵਿਸ਼ਾ: ${data.type} ਬਾਰੇ ਪਟੀਸ਼ਨ

ਬਹੁਤ ਹੀ ਸਤਿਕਾਰ ਨਾਲ ਪੇਸ਼:
1. ਪਟੀਸ਼ਨਰ ਭਾਰਤੀ ਨਾਗਰਿਕ ਹੈ।
2. ਵੇਰਵਾ: ${data.questionnaireData?.information_details || 'ਕੋਈ ਵੇਰਵਾ ਨਹੀਂ'}.

ਬੇਨਤੀ:
ਉਚਿਤ ਕਾਰਵਾਈ ਕਰਨ ਦੀ ਬੇਨਤੀ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।

ਮਿਤੀ: ${new Date().toLocaleDateString()}
ਦਸਤਖਤ: ${data.userName}`;

const generateOdiaMock = (data: any) => `[ଇ-ଜାଗୃତି ଅଫିସିଆଲ୍ AI ଡ୍ରାଫ୍ଟ]

ମାନ୍ୟବର କର୍ତ୍ତୃପକ୍ଷଙ୍କ ନିକଟରେ

ବିଷୟରେ:
${data.userName}
...ଆବେଦନକାରୀ

ବନାମ

${data.oppositeParty || 'ଉତ୍ତରଦାତା'}
...ଉତ୍ତରଦାତା

ବିଷୟ: ${data.type} ସମ୍ବନ୍ଧୀୟ ଆବେଦନ

ବିନମ୍ର ନିବେଦନ:
୧. ଆବେଦନକାରୀ ଜଣେ ଭାରତୀୟ ନାଗରିକ।
୨. ବିବରଣୀ: ${data.questionnaireData?.information_details || 'କୌଣସି ବିବରଣୀ ନାହିଁ'}।

ପ୍ରାର୍ଥନା:
ଉଚିତ୍ କାର୍ଯ୍ୟାନୁଷ୍ଠାନ ଗ୍ରହଣ କରିବାକୁ ଅନୁରୋଧ।

ତାରିଖ: ${new Date().toLocaleDateString()}
ସ୍ୱାକ୍ଷର: ${data.userName}`;

const generateAssameseMock = (data: any) => `[ই-জাগৃতি অফিচিয়েল এআই ড্ৰাফ্ট]

সন্মানীয় কৰ্তৃপক্ষৰ সন্মুখত

বিষয়ত:
${data.userName}
...আবেদনকাৰী

বনাম

${data.oppositeParty || 'উত্তৰদাতা'}
...উত্তৰদাতা

বিষয়: ${data.type} সম্পৰ্কীয় আবেদন

সন্মান সহকাৰে:
১. আবেদনকাৰী এজন ভাৰতীয় নাগৰিক।
২. বিৱৰণ: ${data.questionnaireData?.information_details || 'কোনো বিৱৰণ নাই'}।

প্ৰাৰ্থনা:
উপযুক্ত ব্যৱস্থা গ্ৰহণ কৰিবলৈ অনুৰোধ জনোৱা হ'ল।

তাৰিখ: ${new Date().toLocaleDateString()}
স্বাক্ষৰ: ${data.userName}`;


export const chatWithAI = async (message: string, language: string, context?: any): Promise<string> => {
    if (!genAI) return "I am in offline mode.";
    try {
        const langName = getLanguageName(language);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(`Act as an Indian Legal Assistant. Answer in ${langName} language (${langName} script). Question: ${message}`);
        return result.response.text();
    } catch (e) {
        return "Service unavailable.";
    }
};
