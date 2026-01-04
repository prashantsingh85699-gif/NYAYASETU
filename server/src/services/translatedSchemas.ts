export const schemasHi: Record<string, any> = {
    rti: {
        title: "आरटीआई आवेदन",
        description: "सूचना का अधिकार अधिनियम, 2005",
        sections: [
            {
                title: "लोक प्राधिकारी विवरण",
                questions: [
                    { id: "authority_name", type: "text", label: "लोक प्राधिकारी का नाम", placeholder: "उदा. दिल्ली नगर निगम", required: true },
                    { id: "department", type: "text", label: "विभाग (यदि विशिष्ट हो)", placeholder: "उदा. लोक निर्माण विभाग", required: false },
                    { id: "authority_address", type: "textarea", label: "प्राधिकारी का पता", placeholder: "पूरा पता", required: true }
                ]
            },
            {
                title: "मांगी गई जानकारी",
                questions: [
                    { id: "information_details", type: "textarea", label: "आप क्या जानकारी चाहते हैं?", placeholder: "जो जानकारी आप चाहते हैं उसका विस्तार से वर्णन करें...", required: true, rows: 6 },
                    { id: "time_period", type: "text", label: "जानकारी की समयावधि", placeholder: "उदा. जनवरी 2023 से दिसंबर 2023", required: false },
                    { id: "reason", type: "textarea", label: "जानकारी मांगने का कारण/उद्देश्य", placeholder: "वैकल्पिक लेकिन अनुशंसित...", required: false, rows: 3 }
                ]
            },
            {
                title: "शुल्क भुगतान",
                questions: [
                    { id: "payment_mode", type: "select", label: "भुगतान का प्रकार", options: ["नकद", "डिमांड ड्राफ्ट", "भारतीय पोस्टल ऑर्डर", "ऑनलाइन भुगतान", "अन्य"], required: true }
                ]
            }
        ]
    },
    consumer: {
        title: "उपभोक्ता शिकायत",
        description: "उपभोक्ता संरक्षण अधिनियम, 2019",
        sections: [
            {
                title: "विक्रेता/सेवा प्रदाता विवरण",
                questions: [
                    { id: "opposite_party_name", type: "text", label: "विक्रेता/कंपनी का नाम", placeholder: "विक्रेता/कंपनी का पूरा नाम", required: true },
                    { id: "opposite_party_address", type: "textarea", label: "विक्रेता/कंपनी का पता", placeholder: "पूरा पता", required: true },
                    { id: "gstin", type: "text", label: "GSTIN (यदि उपलब्ध हो)", placeholder: "जीएसटी पहचान संख्या", required: false }
                ]
            },
            {
                title: "उत्पाद/सेवा विवरण",
                questions: [
                    { id: "product_service", type: "text", label: "उत्पाद/सेवा का नाम", placeholder: "उत्पाद या सेवा का नाम", required: true },
                    { id: "purchase_date", type: "date", label: "खरीद/सेवा की तिथि", required: true },
                    { id: "amount_paid", type: "number", label: "भुगतान की गई राशि (₹)", placeholder: "0", required: true },
                    { id: "bill_number", type: "text", label: "चालान/बिल नंबर", placeholder: "रसीद संख्या", required: false }
                ]
            },
            {
                title: "शिकायत विवरण",
                questions: [
                    { id: "defect_deficiency", type: "textarea", label: "दोष/कमी का वर्णन करें", placeholder: "समस्या को विस्तार से समझाएं...", required: true, rows: 6 },
                    { id: "issue_date", type: "date", label: "मुद्दा कब हुआ?", required: true },
                    { id: "attempts_to_resolve", type: "textarea", label: "समस्या को हल करने के लिए किए गए प्रयास", placeholder: "विक्रेता के साथ किसी भी संचार का वर्णन करें...", required: false, rows: 4 },
                    { id: "compensation_sought", type: "textarea", label: "मुआवजा/राहत मांगी गई", placeholder: "आप क्या समाधान चाहते हैं?", required: true, rows: 4 }
                ]
            }
        ]
    },
    grievance: {
        title: "शिकायत याचिका",
        description: "सरकारी प्राधिकारी को शिकायत",
        sections: [
            {
                title: "प्राधिकारी विवरण",
                questions: [
                    { id: "authority", type: "text", label: "प्राधिकारी/विभाग का नाम", placeholder: "उदा. जिला कलेक्टर", required: true },
                    { id: "authority_address", type: "textarea", label: "पता", required: true }
                ]
            },
            {
                title: "शिकायत विवरण",
                questions: [
                    { id: "subject", type: "text", label: "शिकायत का विषय", placeholder: "संक्षिप्त विषय पंक्ति", required: true },
                    { id: "grievance_description", type: "textarea", label: "शिकायत का विस्तृत विवरण", placeholder: "अपनी समस्या को विस्तार से समझाएं...", required: true, rows: 8 },
                    { id: "location", type: "text", label: "स्थान (यदि लागू हो)", placeholder: "यह कहां हुआ?", required: false },
                    { id: "relief_sought", type: "textarea", label: "राहत/कार्रवाई मांगी गई", placeholder: "आप प्राधिकारी से क्या करवाना चाहते हैं?", required: true, rows: 4 }
                ]
            }
        ]
    },
    municipal: {
        title: "नगर निगम शिकायत",
        description: "स्थानीय निकाय शिकायत",
        sections: [
            {
                title: "नगर प्राधिकरण",
                questions: [
                    { id: "municipality", type: "text", label: "नगर निगम/परिषद का नाम", placeholder: "उदा. बैंगलोर नगर निगम", required: true },
                    { id: "ward", type: "text", label: "वार्ड संख्या/नाम", required: false }
                ]
            },
            {
                title: "शिकायत विवरण",
                questions: [
                    { id: "issue_type", type: "select", label: "मुद्दे का प्रकार", options: ["सड़क मरम्मत", "जल निकासी/सीवेज", "जल आपूर्ति", "कचरा संग्रह", "स्ट्रीट लाइट्स", "अतिक्रमण", "भवन उल्लंघन", "अन्य"], required: true },
                    { id: "location", type: "textarea", label: "सटीक स्थान", placeholder: "लैंडमार्क के साथ पूरा पता", required: true, rows: 3 },
                    { id: "problem_description", type: "textarea", label: "समस्या का विवरण", placeholder: "नागरिक मुद्दे का विस्तार से वर्णन करें...", required: true, rows: 6 },
                    { id: "urgency", type: "select", label: "तात्कालिकता स्तर", options: ["निम्न", "मध्यम", "उच्च", "गंभीर"], required: true },
                    { id: "action_requested", type: "textarea", label: "कार्रवाई अनुरोधित", placeholder: "नगर पालिका को क्या करना चाहिए?", required: true, rows: 3 }
                ]
            }
        ]
    },
    pil: {
        title: "जनहित याचिका",
        description: "PIL याचिका",
        sections: [
            {
                title: "न्यायालय विवरण",
                questions: [
                    { id: "court", type: "select", label: "न्यायालय चुनें", options: ["भारत का सर्वोच्च न्यायालय", "उच्च न्यायालय - दिल्ली", "अन्य उच्च न्यायालय"], required: true }
                ]
            },
            {
                title: "जनहित मामला",
                questions: [
                    { id: "public_issue", type: "textarea", label: "जनहित के मुद्दे का वर्णन करें", placeholder: "क्या जनहित दांव पर है?", required: true, rows: 6 },
                    { id: "relief_sought", type: "textarea", label: "राहत मांगी गई", placeholder: "आप अदालत से क्या आदेश चाहते हैं?", required: true, rows: 4 }
                ]
            }
        ]
    },
    writ: {
        title: "रिट याचिका",
        description: "संवैधानिक उपचार",
        sections: [
            {
                title: "रिट विवरण",
                questions: [
                    { id: "writ_type", type: "select", label: "रिट का प्रकार", options: ["बंदी प्रत्यक्षीकरण", "परमादेश", "निषेध", "उत्प्रेषण", "अधिकार पृच्छा"], required: true },
                    { id: "facts", type: "textarea", label: "मामले के तथ्य", placeholder: "विस्तृत तथ्य...", required: true, rows: 8 },
                    { id: "relief", type: "textarea", label: "राहत मांगी गई", placeholder: "आप क्या आदेश चाहते हैं?", required: true, rows: 4 }
                ]
            }
        ]
    }
};

export const schemasGu: Record<string, any> = {
    rti: {
        title: "RTI અરજી",
        description: "માહિતી અધિકાર કાયદો, 2005",
        sections: [
            {
                title: "જાહેર સત્તાધિકારીની વિગતો",
                questions: [
                    { id: "authority_name", type: "text", label: "જાહેર સત્તાધિકારીનું નામ", placeholder: "દા.ત., મ્યુનિસિપલ કોર્પોરેશન", required: true },
                    { id: "department", type: "text", label: "વિભાગ (જો ચોક્કસ હોય)", placeholder: "દા.ત., જાહેર બાંધકામ વિભાગ", required: false },
                    { id: "authority_address", type: "textarea", label: "સત્તાધિકારીનું સરનામું", placeholder: "પૂરું સરનામું", required: true }
                ]
            },
            {
                title: "માગેલી માહિતી",
                questions: [
                    { id: "information_details", type: "textarea", label: "તમે કઈ માહિતી ઈચ્છો છો?", placeholder: "તમને જોઈતી માહિતીનું વિગતવાર વર્ણન કરો...", required: true, rows: 6 },
                    { id: "time_period", type: "text", label: "માહિતીનો સમયગાળો", placeholder: "દા.ત., જાન્યુઆરી ૨૦૨૩ થી ડિસેમ્બર ૨૦૨૩", required: false },
                    { id: "reason", type: "textarea", label: "માહિતી માંગવાનું કારણ/હેતુ", placeholder: "વૈકલ્પિક પરંતુ ભલામણ કરેલ...", required: false, rows: 3 }
                ]
            },
            {
                title: "ફી ચુકવણી",
                questions: [
                    { id: "payment_mode", type: "select", label: "ચુકવણીની રીત", options: ["રોકડ", "ડિમાન્ડ ડ્રાફ્ટ", "ઇન્ડિયન પોસ્ટલ ઓર્ડર", "ઓનલાઇન પેમેન્ટ", "અન્ય"], required: true }
                ]
            }
        ]
    }
};

export const schemasTa: Record<string, any> = {
    rti: {
        title: "RTI விண்ணப்பம்",
        description: "தகவல் அறியும் உரிமைச் சட்டம், 2005",
        sections: [
            {
                title: "பொது அதிகாரி விவரங்கள்",
                questions: [
                    { id: "authority_name", type: "text", label: "பொது அதிகாரியின் பெயர்", placeholder: "உதாரணமாக, சென்னை மாநகராட்சி", required: true },
                    { id: "department", type: "text", label: "துறை (குறிப்பிட்டிருந்தால்)", placeholder: "உதாரணமாக, பொதுப்பணித் துறை", required: false },
                    { id: "authority_address", type: "textarea", label: "அதிகாரியின் முகவரி", placeholder: "முழு முகவரி", required: true }
                ]
            },
            {
                title: "கோரப்பட்ட தகவல்",
                questions: [
                    { id: "information_details", type: "textarea", label: "நீங்கள் என்ன தகவலை விரும்புகிறீர்கள்?", placeholder: "உங்களுக்குத் தேவையான தகவலை விரிவாக விவரிக்கவும்...", required: true, rows: 6 },
                    { id: "time_period", type: "text", label: "தகவலின் கால அளவு", placeholder: "உதாரணமாக, ஜனவரி 2023 முதல் டிசம்பர் 2023 வரை", required: false },
                    { id: "reason", type: "textarea", label: "தகவல் கோருவதற்கான காரணம்/நோக்கம்", placeholder: "விருப்பமானது ஆனால் பரிந்துரைக்கப்படுகிறது...", required: false, rows: 3 }
                ]
            },
            {
                title: "கட்டணம் செலுத்துதல்",
                questions: [
                    { id: "payment_mode", type: "select", label: "கட்டணம் செலுத்தும் முறை", options: ["பணம்", "வரைவோலை", "இந்திய அஞ்சல் ஆணை", "ஆன்லைன் கட்டணம்", "மற்றவை"], required: true }
                ]
            }
        ]
    },
    consumer: {
        title: "நுகர்வோர் புகார்",
        description: "நுகர்வோர் பாதுகாப்புச் சட்டம், 2019",
        sections: [
            {
                title: "விற்பனையாளர்/சேவை வழங்குநர் விவரங்கள்",
                questions: [
                    { id: "opposite_party_name", type: "text", label: "விற்பனையாளர்/நிறுவனத்தின் பெயர்", placeholder: "விற்பனையாளர்/நிறுவனத்தின் முழு பெயர்", required: true },
                    { id: "opposite_party_address", type: "textarea", label: "விற்பனையாளர்/நிறுவனத்தின் முகவரி", placeholder: "முழு முகவரி", required: true },
                    { id: "gstin", type: "text", label: "GSTIN (இருந்தால்)", placeholder: "ஜிஎஸ்டி அடையாளம் காணும் எண்", required: false }
                ]
            },
            {
                title: "தயாரிப்பு/சேவை விவரங்கள்",
                questions: [
                    { id: "product_service", type: "text", label: "தயாரிப்பு/சேவையின் பெயர்", placeholder: "தயாரிப்பு அல்லது சேவையின் பெயர்", required: true },
                    { id: "purchase_date", type: "date", label: "வாங்கிய/சேவை தேதி", required: true },
                    { id: "amount_paid", type: "number", label: "செலுத்தப்பட்ட தொகை (₹)", placeholder: "0", required: true },
                    { id: "bill_number", type: "text", label: "விலைப்பட்டியல்/பில் எண்", placeholder: "ரசீது எண்", required: false }
                ]
            },
            {
                title: "புகார் விவரங்கள்",
                questions: [
                    { id: "defect_deficiency", type: "textarea", label: "குறைபாடு/குறையை விவரிக்கவும்", placeholder: "பிரச்சனையைக் விரிவாக விளக்கவும்...", required: true, rows: 6 },
                    { id: "issue_date", type: "date", label: "பிரச்சனை எப்போது நடந்தது?", required: true },
                    { id: "attempts_to_resolve", type: "textarea", label: "பிரச்சனையைத் தீர்க்க எடுக்கப்பட்ட முயற்சிகள்", placeholder: "விற்பனையாளருடனான எந்தவொரு தொடர்பையும் விவரிக்கவும்...", required: false, rows: 4 },
                    { id: "compensation_sought", type: "textarea", label: "கோரப்பட்ட இழப்பீடு/நிவாரணம்", placeholder: "நீங்கள் என்ன தீர்வை விரும்புகிறீர்கள்?", required: true, rows: 4 }
                ]
            }
        ]
    },
    grievance: {
        title: "புகார் மனு",
        description: "அரசு அதிகாரிக்கு புகார்",
        sections: [
            {
                title: "அதிகாரி விவரங்கள்",
                questions: [
                    { id: "authority", type: "text", label: "அதிகாரி/துறையின் பெயர்", placeholder: "உதாரணமாக, மாவட்ட ஆட்சியர்", required: true },
                    { id: "authority_address", type: "textarea", label: "முகவரி", required: true }
                ]
            },
            {
                title: "புகார் விவரங்கள்",
                questions: [
                    { id: "subject", type: "text", label: "புகாரின் பொருள்", placeholder: "சுருக்கமான பொருள்", required: true },
                    { id: "grievance_description", type: "textarea", label: "புகாரின் விரிவான விளக்கம்", placeholder: "உங்கள் பிரச்சனையை விரிவாக விளக்கவும்...", required: true, rows: 8 },
                    { id: "location", type: "text", label: "இடம் (பொருந்தினால்)", placeholder: "இது எங்கே நடந்தது?", required: false },
                    { id: "relief_sought", type: "textarea", label: "கோரப்பட்ட நிவாரணம்/நடவடிக்கை", placeholder: "அதிகாரி என்ன செய்ய வேண்டும் என்று நீங்கள் விரும்புகிறீர்கள்?", required: true, rows: 4 }
                ]
            }
        ]
    },
    municipal: {
        title: "நகராட்சி புகார்",
        description: "உள்ளாட்சி அமைப்பு புகார்",
        sections: [
            {
                title: "நகராட்சி நிர்வாகம்",
                questions: [
                    { id: "municipality", type: "text", label: "மாநகராட்சி/நகராட்சியின் பெயர்", placeholder: "உதாரணமாக, மதுரை மாநகராட்சி", required: true },
                    { id: "ward", type: "text", label: "வார்டு எண்/பெயர்", required: false }
                ]
            },
            {
                title: "புகார் விவரங்கள்",
                questions: [
                    { id: "issue_type", type: "select", label: "பிரச்சனை வகை", options: ["சாலை பழுது", "வடிகால்/கழிவுநீர்", "குடிநீர் வழங்கல்", "குப்பை சேகரிப்பு", "தெருவிளக்குகள்", "ஆக்கிரமிப்பு", "கட்டிட விதிமீறல்", "மற்றவை"], required: true },
                    { id: "location", type: "textarea", label: "துல்லியமான இடம்", placeholder: "அடையாளங்களுடன் கூடிய முழு முகவரி", required: true, rows: 3 },
                    { id: "problem_description", type: "textarea", label: "பிரச்சனை விவரம்", placeholder: "குடிமைப் பிரச்சனையை விரிவாக விவரிக்கவும்...", required: true, rows: 6 },
                    { id: "urgency", type: "select", label: "அவசர நிலை", options: ["குறைந்த", "நடுத்தர", "அதிக", "மிகவும் அவசரம்"], required: true },
                    { id: "action_requested", type: "textarea", label: "கோரப்பட்ட நடவடிக்கை", placeholder: "நகராட்சி என்ன செய்ய வேண்டும்?", required: true, rows: 3 }
                ]
            }
        ]
    },
    pil: {
        title: "பொது நல மனு",
        description: "PIL மனு",
        sections: [
            {
                title: "நீதிமன்ற விவரங்கள்",
                questions: [
                    { id: "court", type: "select", label: "நீதிமன்றத்தைத் தேர்வு செய்க", options: ["இந்திய உச்ச நீதிமன்றம்", "உயர் நீதிமன்றம் - சென்னை", "மற்ற உயர் நீதிமன்றங்கள்"], required: true }
                ]
            },
            {
                title: "பொது நல விஷயம்",
                questions: [
                    { id: "public_issue", type: "textarea", label: "பொது நலப் பிரச்சனையை விவரிக்கவும்", placeholder: "பொது நலன் என்ன?", required: true, rows: 6 },
                    { id: "relief_sought", type: "textarea", label: "கோரப்பட்ட நிவாரணம்", placeholder: "நீதிமன்றத்திலிருந்து நீங்கள் என்ன உத்தரவுகளை விரும்புகிறீர்கள்?", required: true, rows: 4 }
                ]
            }
        ]
    },
    writ: {
        title: "ரிட் மனு",
        description: "அரசியலமைப்பு பரிகாரம்",
        sections: [
            {
                title: "ரிட் விவரங்கள்",
                questions: [
                    { id: "writ_type", type: "select", label: "ரிட் வகை", options: ["ஆட்கொணர்வு நீதிப்பேராணை", "செயலுறுத்தும் நீதிப்பேராணை", "தடை நீதிப்பேராணை", "நெறிமுறை உறுத்தும் நீதிப்பேராணை", "தகுதி முறை வினவும் நீதிப்பேராணை"], required: true },
                    { id: "facts", type: "textarea", label: "வழக்கின் உண்மைகள்", placeholder: "விரிவான உண்மைகள்...", required: true, rows: 8 },
                    { id: "relief", type: "textarea", label: "கோரப்பட்ட நிவாரணம்", placeholder: "நீங்கள் என்ன உத்தரவுகளை விரும்புகிறீர்கள்?", required: true, rows: 4 }
                ]
            }
        ]
    }
};

export const schemasTe: Record<string, any> = {
    rti: {
        title: "RTI దరఖాస్తు",
        description: "సమాచార హక్కు చట్టం, 2005",
        sections: [
            {
                title: "పబ్లిక్ అథారిటీ వివరాలు",
                questions: [
                    { id: "authority_name", type: "text", label: "పబ్లిక్ అథారిటీ పేరు", placeholder: "ఉదా., ఢిల్లీ మున్సిపల్ కార్పొరేషన్", required: true },
                    { id: "department", type: "text", label: "విభాగం (నిర్దిష్టంగా ఉంటే)", placeholder: "ఉదా., ప్రజా పనుల శాఖ", required: false },
                    { id: "authority_address", type: "textarea", label: "అథారిటీ చిరునామా", placeholder: "పూర్తి చిరునామా", required: true }
                ]
            },
            {
                title: "కోరిన సమాచారం",
                questions: [
                    { id: "information_details", type: "textarea", label: "మీరు ఏ సమాచారం కోరుకుంటున్నారు?", placeholder: "మీకు కావలసిన సమాచారాన్ని వివరంగా వివరించండి...", required: true, rows: 6 },
                    { id: "time_period", type: "text", label: "సమాచార కాల వ్యవధి", placeholder: "ఉదా., జనవరి 2023 నుండి డిసెంబర్ 2023 వరకు", required: false },
                    { id: "reason", type: "textarea", label: "సమాచారం అడగడానికి కారణం/ఉద్దేశ్యం", placeholder: "ఐచ్ఛికం కానీ సిఫార్సు చేయబడింది...", required: false, rows: 3 }
                ]
            },
            {
                title: "రుసుము చెల్లింపు",
                questions: [
                    { id: "payment_mode", type: "select", label: "చెల్లింపు విధానం", options: ["నగదు", "డిమాండ్ డ్రాఫ్ట్", "భారతీయ పోస్టల్ ఆర్డర్", "ఆన్‌లైన్ పేమెంట్", "ఇతర"], required: true }
                ]
            }
        ]
    },
    consumer: {
        title: "వినియోగదారు ఫిర్యాదు",
        description: "వినియోగదారు రక్షణ చట్టం, 2019",
        sections: [
            {
                title: "విక్రేత/సర్వీస్ ప్రొవైడర్ వివరాలు",
                questions: [
                    { id: "opposite_party_name", type: "text", label: "విక్రేత/కంపెనీ పేరు", placeholder: "విక్రేత/కంపెనీ పూర్తి పేరు", required: true },
                    { id: "opposite_party_address", type: "textarea", label: "విక్రేత/కంపెనీ చిరునామా", placeholder: "పూర్తి చిరునామా", required: true },
                    { id: "gstin", type: "text", label: "GSTIN (అందుబాటులో ఉంటే)", placeholder: "GST గుర్తింపు సంఖ్య", required: false }
                ]
            },
            {
                title: "ఉత్పత్తి/సేవ వివరాలు",
                questions: [
                    { id: "product_service", type: "text", label: "ఉత్పత్తి/సేవ పేరు", placeholder: "ఉత్పత్తి లేదా సేవ పేరు", required: true },
                    { id: "purchase_date", type: "date", label: "కొనుగోలు/సేవ తేదీ", required: true },
                    { id: "amount_paid", type: "number", label: "చెల్లించిన మొత్తం (₹)", placeholder: "0", required: true },
                    { id: "bill_number", type: "text", label: "ఇన్వాయిస్/బిల్ నంబర్", placeholder: "రశీదు సంఖ్య", required: false }
                ]
            },
            {
                title: "ఫిర్యాదు వివరాలు",
                questions: [
                    { id: "defect_deficiency", type: "textarea", label: "లోపం/లోపాన్ని వివరించండి", placeholder: "సమస్యను వివరంగా వివరించండి...", required: true, rows: 6 },
                    { id: "issue_date", type: "date", label: "సమస్య ఎప్పుడు జరిగింది?", required: true },
                    { id: "attempts_to_resolve", type: "textarea", label: "సమస్యను పరిష్కరించడానికి చేసిన ప్రయత్నాలు", placeholder: "విక్రేతతో జరిగిన ఏదైనా సంభాషణను వివరించండి...", required: false, rows: 4 },
                    { id: "compensation_sought", type: "textarea", label: "కోరిన నష్టపరిహారం/పరిష్కారం", placeholder: "మీరు ఏ పరిష్కారాన్ని కోరుకుంటున్నారు?", required: true, rows: 4 }
                ]
            }
        ]
    }
};
