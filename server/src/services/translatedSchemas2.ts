
// Additional translated schemas for Malayalam, Bengali, Marathi, Kannada, Punjabi, Odia, Assamese

// Common structures for consistency across languages
const commonStructure = {
    grievance: {
        sections: (t: any) => [
            {
                title: t.authDetails,
                questions: [
                    { id: "authority", type: "text", label: t.authName, placeholder: t.authPlaceholder, required: true },
                    { id: "authority_address", type: "textarea", label: t.address, required: true }
                ]
            },
            {
                title: t.complaintDetails,
                questions: [
                    { id: "subject", type: "text", label: t.subject, placeholder: t.subjectPlaceholder, required: true },
                    { id: "grievance_description", type: "textarea", label: t.desc, placeholder: t.descPlaceholder, required: true, rows: 8 },
                    { id: "location", type: "text", label: t.loc, placeholder: t.locPlaceholder, required: false },
                    { id: "relief_sought", type: "textarea", label: t.relief, placeholder: t.reliefPlaceholder, required: true, rows: 4 }
                ]
            }
        ]
    },
    municipal: {
        sections: (t: any) => [
            {
                title: t.muniAdmin,
                questions: [
                    { id: "municipality", type: "text", label: t.muniName, placeholder: t.muniPlaceholder, required: true },
                    { id: "ward", type: "text", label: t.ward, required: false }
                ]
            },
            {
                title: t.complaintDetails,
                questions: [
                    { id: "issue_type", type: "select", label: t.issueType, options: t.issueOptions, required: true },
                    { id: "location", type: "textarea", label: t.exactLoc, placeholder: t.locPlaceholder, required: true, rows: 3 },
                    { id: "problem_description", type: "textarea", label: t.probDesc, placeholder: t.probPlaceholder, required: true, rows: 6 },
                    { id: "urgency", type: "select", label: t.urgency, options: t.urgencyOptions, required: true },
                    { id: "action_requested", type: "textarea", label: t.actionReq, placeholder: t.actionPlaceholder, required: true, rows: 3 }
                ]
            }
        ]
    },
    pil: {
        sections: (t: any) => [
            {
                title: t.courtDetails,
                questions: [
                    { id: "court", type: "select", label: t.selectCourt, options: t.courtOptions, required: true }
                ]
            },
            {
                title: t.publicInterest,
                questions: [
                    { id: "public_issue", type: "textarea", label: t.issueDesc, placeholder: t.issuePlaceholder, required: true, rows: 6 },
                    { id: "relief_sought", type: "textarea", label: t.relief, placeholder: t.reliefPlaceholder, required: true, rows: 4 }
                ]
            }
        ]
    },
    writ: {
        sections: (t: any) => [
            {
                title: t.writDetails,
                questions: [
                    { id: "writ_type", type: "select", label: t.writType, options: t.writOptions, required: true },
                    { id: "facts", type: "textarea", label: t.facts, placeholder: t.factsPlaceholder, required: true, rows: 8 },
                    { id: "relief", type: "textarea", label: t.relief, placeholder: t.reliefPlaceholder, required: true, rows: 4 }
                ]
            }
        ]
    }
};

// --- MALAYALAM ---
const mlText = {
    authDetails: "അധികാരിയുടെ വിവരങ്ങൾ", authName: "അധികാരി/വകുപ്പിന്റെ പേര്", authPlaceholder: "ഉദാ. ജില്ലാ കളക്ടർ", address: "വിലാസം",
    complaintDetails: "പരാതി വിവരങ്ങൾ", subject: "വിഷയം", subjectPlaceholder: "ചുരുക്കത്തിൽ",
    desc: "പരാതിയുടെ പൂർണ്ണരൂപം", descPlaceholder: "വിശദമായി നൽകുക...", loc: "സ്ഥലം", locPlaceholder: "ഇത് എവിടെയാണ് നടന്നത്?",
    relief: "ആവശ്യപ്പെടുന്ന പരിഹാരം", reliefPlaceholder: "നിങ്ങൾക്ക് എന്ത് പരിഹാരമാണ് വേണ്ടത്?",
    muniAdmin: "മുനിസിപ്പൽ ഭരണം", muniName: "മുനിസിപ്പാലിറ്റി/കോർപ്പറേഷൻ പേര്", muniPlaceholder: "ഉദാ. കൊച്ചി കോർപ്പറേഷൻ", ward: "വാർഡ് നമ്പർ",
    issueType: "പ്രശ്ന തരം", issueOptions: ["റോഡ് അറ്റകുറ്റപ്പണി", "ഓവുചാൽ", "ജലവിതരണം", "മാലിന്യശേഖരണം", "തെരുവുവിളക്ക്", "കയ്യേറ്റം", "കെട്ടിടം ചട്ടം ലംഘനം", "മറ്റുള്ളവ"],
    exactLoc: "കൃത്യമായ സ്ഥലം", probDesc: "പ്രശ്ന വിവരണം", probPlaceholder: "വിശദമായി...",
    urgency: "അടിയന്തിര ഘട്ടം", urgencyOptions: ["കുറഞ്ഞ", "ഇടത്തരം", "കൂടിയ", "അതിഗൗരവം"],
    actionReq: "ആവശ്യമായ നടപടി", actionPlaceholder: "എന്ത് നടപടിയാണ് വേണ്ടത്?",
    courtDetails: "കോടതി വിവരങ്ങൾ", selectCourt: "കോടതി തിരഞ്ഞെടുക്കുക", courtOptions: ["സുപ്രീം കോടതി", "ഹൈക്കോടതി", "മറ്റ് കോടതികൾ"],
    publicInterest: "പൊതുതാൽപ്പര്യ വിഷയം", issueDesc: "പൊതുപ്രശ്നം വിവരിക്കുക", issuePlaceholder: "എന്താണ് പൊതുജനങ്ങളെ ബാധിക്കുന്നത്?",
    writDetails: "റിട്ട് വിവരങ്ങൾ", writType: "റിട്ട് തരം", writOptions: ["ഹേബിയസ് കോർപ്പസ്", "മാൻഡമസ്", "പ്രൊഹിബിഷൻ", "സെർഷ്യോററി", "ക്വാ-വാറന്റോ"],
    facts: "വസ്തുതകൾ", factsPlaceholder: "കേസിന്റെ വസ്തുതകൾ..."
};

export const schemasMl: Record<string, any> = {
    rti: {
        title: "വിവരാവകാശ അപേക്ഷ", description: "വിവരാവകാശ നിയമം, 2005",
        sections: [
            { title: "പബ്ലിക് ഇൻഫർമേഷൻ ഓഫീസർ വിവരങ്ങൾ", questions: [{ id: "authority_name", type: "text", label: "പബ്ലിക് ഇൻഫർമേഷൻ ഓഫീസറുടെ പേര്", placeholder: "ഉദാ. മുനിസിപ്പൽ കോർപ്പറേഷൻ", required: true }, { id: "department", type: "text", label: "വകുപ്പ് (വ്യക്തമാണെങ്കിൽ)", placeholder: "ഉദാ. പൊതുമരാമത്ത് വകുപ്പ്", required: false }, { id: "authority_address", type: "textarea", label: "ഓഫീസറുടെ വിലാസം", placeholder: "പൂർണ്ണ വിലാസം", required: true }] },
            { title: "ആവശ്യപ്പെട്ട വിവരങ്ങൾ", questions: [{ id: "information_details", type: "textarea", label: "നിങ്ങൾക്ക് എന്തൊക്കെ വിവരങ്ങളാണ് വേണ്ടത്?", placeholder: "വിശദമായി വിവരിക്കുക...", required: true, rows: 6 }, { id: "time_period", type: "text", label: "വിവരങ്ങളുടെ കാലയളവ്", placeholder: "ഉദാ. ജനുവരി 2023 മുതൽ ഡിസംബർ 2023 വരെ", required: false }] },
            { title: "ഫീസ് വിവരങ്ങൾ", questions: [{ id: "payment_mode", type: "select", label: "ഫീസ് അടച്ച രീതി", options: ["പണം", "ഡിമാൻഡ് ഡ്രാഫ്റ്റ്", "കോർട്ട് ഫീ സ്റ്റാമ്പ്", "ഓൺലൈൻ", "മറ്റുള്ളവ"], required: true }] }
        ]
    },
    consumer: {
        title: "ഉപഭോക്തൃ പരാതി", description: "ഉപഭോക്തൃ സംരക്ഷണ നിയമം, 2019",
        sections: [
            { title: "എതിർകക്ഷി വിവരങ്ങൾ", questions: [{ id: "opposite_party_name", type: "text", label: "എതിർകക്ഷിയുടെ പേര്", placeholder: "കടയുടെ അല്ലെങ്കിൽ കമ്പനിയുടെ പേര്", required: true }, { id: "opposite_party_address", type: "textarea", label: "എതിർകക്ഷിയുടെ വിലാസം", required: true }, { id: "bill_number", type: "text", label: "ബിൽ നമ്പർ / ഇൻവോയ്സ് നമ്പർ", required: false }] },
            { title: "പരാതിയുടെ വിശദാംശങ്ങൾ", questions: [{ id: "defect_deficiency", type: "textarea", label: "പരാതിയുടെ കാരണം", placeholder: "ഉൽപ്പന്നത്തിൻ്റെയോ സേവനത്തിൻ്റെയോ പോരായ്മകൾ വിവരിക്കുക...", required: true, rows: 6 }, { id: "compensation_sought", type: "textarea", label: "ആവശ്യപ്പെടുന്ന പരിഹാരം", placeholder: "നഷ്ടപരിഹാരം അല്ലെങ്കിൽ ഉൽപ്പന്നം മാറ്റി നൽകൽ...", required: true, rows: 4 }] }
        ]
    },
    grievance: { title: "പരാതി", description: "അധികാരിക്ക് പരാതി", sections: commonStructure.grievance.sections(mlText) },
    municipal: { title: "മുനിസിപ്പൽ പരാതി", description: "മുനിസിപ്പാലിറ്റി പരാതി", sections: commonStructure.municipal.sections(mlText) },
    pil: { title: "പൊതുതാൽപ്പര്യ ഹർജി", description: "PIL അപേക്ഷ", sections: commonStructure.pil.sections(mlText) },
    writ: { title: "റിട്ട് ഹർജി", description: "ഭരണഘടനാപരമായ ഹർജി", sections: commonStructure.writ.sections(mlText) }
};

// --- BENGALI ---
const bnText = {
    authDetails: "কর্তৃপক্ষের বিবরণ", authName: "কর্তৃপক্ষ/বিভাগের নাম", authPlaceholder: "উদাঃ জেলা প্রশাসক", address: "ঠিকানা",
    complaintDetails: "অভিযোগের বিবরণ", subject: "বিষয়", subjectPlaceholder: "সংক্ষেপে",
    desc: "বিস্তারিত বিবরণ", descPlaceholder: "বিস্তারিত লিখুন...", loc: "স্থান", locPlaceholder: "কোথায় ঘটেছে?",
    relief: "প্রতিকার", reliefPlaceholder: "আপনি কি চান?",
    muniAdmin: "পৌরসভা", muniName: "পৌরসভা/নিগমের নাম", muniPlaceholder: "উদাঃ কলকাতা পৌরনিগম", ward: "ওয়ার্ড নম্বর",
    issueType: "সমস্যার ধরন", issueOptions: ["রাস্তা মেরামত", "নিকাশি", "জল সরবরাহ", "আবর্জনা", "রাস্তার আলো", "দখল", "অবৈধ নির্মাণ", "অন্যান্য"],
    exactLoc: "সঠিক স্থান", probDesc: "সমস্যার বিবরণ", probPlaceholder: "বিস্তারিত...",
    urgency: "জরুরি স্তর", urgencyOptions: ["কম", "মাঝারি", "উচ্চ", "খুব জরুরি"],
    actionReq: "অনুরোধ", actionPlaceholder: "কি ব্যবস্থা নেওয়া উচিত?",
    courtDetails: "আদালতের বিবরণ", selectCourt: "আদালত নির্বাচন করুন", courtOptions: ["সুপ্রিম কোর্ট", "হাই কোর্ট", "অন্যান্য"],
    publicInterest: "জনস্বার্থ", issueDesc: "জনস্বার্থের বিষয়টি বর্ণনা করুন", issuePlaceholder: "জনগণের কি ক্ষতি হচ্ছে?",
    writDetails: "রিট বিবরণ", writType: "রিটের ধরন", writOptions: ["হেবিয়াস কর্পাস", "ম্যান্ডামাস", "প্রহিবিশন", "সার্টিওরালি", "কুও-ওয়ারেন্টো"],
    facts: "তথ্য", factsPlaceholder: "মামলার তথ্য..."
};

export const schemasBn: Record<string, any> = {
    rti: {
        title: "আরটিআই আবেদন", description: "তথ্যের অধিকার আইন, ২০০৫",
        sections: [
            { title: "পাবলিক অথরিটি বিবরণ", questions: [{ id: "authority_name", type: "text", label: "পাবলিক অথরিটির নাম", placeholder: "যেমন, কলকাতা পৌরনিগম", required: true }, { id: "department", type: "text", label: "বিভাগ (যদি নির্দিষ্ট হয়)", placeholder: "যেমন, গণপূর্ত বিভাগ", required: false }, { id: "authority_address", type: "textarea", label: "কর্তৃপক্ষের ঠিকানা", placeholder: "সম্পূর্ণ ঠিকানা", required: true }] },
            { title: "দাবিকৃত তথ্য", questions: [{ id: "information_details", type: "textarea", label: "আপনি কি তথ্য চান?", placeholder: "আপনার প্রয়োজনীয় তথ্যের বিস্তারিত বিবরণ দিন...", required: true, rows: 6 }, { id: "time_period", type: "text", label: "সময়ের সময়কাল", placeholder: "যেমন, জানুয়ারী ২০২৩ থেকে ডিসেম্বর ২০২৩", required: false }] },
            { title: "ফি প্রদান", questions: [{ id: "payment_mode", type: "select", label: "পেমেন্ট মোড", options: ["নগদ", "ডিমান্ড ড্রাফ্ট", "পোস্টাল অর্ডার", "অনলাইন", "অন্যান্য"], required: true }] }
        ]
    },
    consumer: {
        title: "ভোক্তা অভিযোগ", description: "ভোক্তা সুরক্ষা আইন, ২০১৯",
        sections: [
            { title: "বিক্রেতা/সেবা প্রদানকারীর বিবরণ", questions: [{ id: "opposite_party_name", type: "text", label: "বিক্রেতা/কোম্পানির নাম", placeholder: "বিক্রেতা বা কোম্পানির নাম", required: true }, { id: "opposite_party_address", type: "textarea", label: "ঠিকানা", required: true }, { id: "bill_number", type: "text", label: "ল নম্বর", required: false }] },
            { title: "অভিযোগের বিবরণ", questions: [{ id: "defect_deficiency", type: "textarea", label: "অভিযোগের কারণ", placeholder: "পণ্যের ত্রুটি বা সেবার ঘাটতি বর্ণনা করুন...", required: true, rows: 6 }, { id: "compensation_sought", type: "textarea", label: "প্রতিকার বা ক্ষতিপূরণ", required: true, rows: 4 }] }
        ]
    },
    grievance: { title: "অভিযোগ", description: "কর্তৃপক্ষের কাছে অভিযোগ", sections: commonStructure.grievance.sections(bnText) },
    municipal: { title: "পৌরসভা অভিযোগ", description: "পৌরসভা সংক্রান্ত", sections: commonStructure.municipal.sections(bnText) },
    pil: { title: "জনস্বার্থ মামলা", description: "PIL", sections: commonStructure.pil.sections(bnText) },
    writ: { title: "রিট পিটিশন", description: "সাংবিধানিক", sections: commonStructure.writ.sections(bnText) }
};

// --- MARATHI ---
const mrText = {
    authDetails: "प्राधिकरण तपशील", authName: "प्राधिकरण/विभागाचे नाव", authPlaceholder: "उदा. जिल्हाधिकारी", address: "पत्ता",
    complaintDetails: "तक्रार तपशील", subject: "विषय", subjectPlaceholder: "शॉर्टमध्ये",
    desc: "सविस्तर वर्णन", descPlaceholder: "पूर्ण माहिती...", loc: "ठिकाण", locPlaceholder: "कुठे घडले?",
    relief: "अपेक्षित मदत", reliefPlaceholder: "तुम्हाला काय हवे आहे?",
    muniAdmin: "महानगरपालिका", muniName: "पालिका/निगम", muniPlaceholder: "उदा. पुणे मनपा", ward: "वार्ड क्र.",
    issueType: "समस्येचा प्रकार", issueOptions: ["रस्ते", "ड्रेनेज", "पाणी", "कचरा", "दिवे", "अतिक्रमण", "बांधकाम", "इतर"],
    exactLoc: "नेमके ठिकाण", probDesc: "समस्या", probPlaceholder: "सविस्तर...",
    urgency: "तात्काळ", urgencyOptions: ["कमी", "मध्यम", "जास्त", "अतिमहत्त्वाचे"],
    actionReq: "कृती", actionPlaceholder: "काय करावे?",
    courtDetails: "न्यायालय", selectCourt: "न्यायालय निवडा", courtOptions: ["सर्वोच्च न्यायालय", "उच्च न्यायालय", "इतर"],
    publicInterest: "जनहित", issueDesc: "जनहिताचा मुद्दा", issuePlaceholder: "लोकांचे काय नुकसान होत आहे?",
    writDetails: "रिट तपशील", writType: "रिट प्रकार", writOptions: ["हेबियस कॉर्पस", "मँडमस", "प्रोहिबिशन", "सर्शिओरारी", "को-वारंट"],
    facts: "तथ्ये", factsPlaceholder: "केसची तथ्ये..."
};

export const schemasMr: Record<string, any> = {
    rti: {
        title: "माहिती अधिकार अर्ज", description: "माहिती अधिकार अधिनियम, २००५",
        sections: [
            { title: "लोक प्राधिकरण तपशील", questions: [{ id: "authority_name", type: "text", label: "लोक प्राधिकरणाचे नाव", placeholder: "उदा. पुणे महानगरपालिका", required: true }, { id: "department", type: "text", label: "विभाग", placeholder: "उदा. सार्वजनिक बांधकाम विभाग", required: false }, { id: "authority_address", type: "textarea", label: "पत्ता", required: true }] },
            { title: "मागितलेली माहिती", questions: [{ id: "information_details", type: "textarea", label: "तुम्हाला कोणती माहिती हवी आहे?", placeholder: "सविस्तर माहिती द्या...", required: true, rows: 6 }, { id: "time_period", type: "text", label: "कालावधी", required: false }] },
            { title: "शुल्क", questions: [{ id: "payment_mode", type: "select", label: "पेमेंट पद्धत", options: ["रोख", "डीडी (Demand Draft)", "पोस्टल ऑर्डर", "ऑनलाइन", "इतर"], required: true }] }
        ]
    },
    consumer: {
        title: "ग्राहक तक्रार", description: "ग्राहक संरक्षण कायदा, २०१९",
        sections: [
            { title: "विक्रेता तपशील", questions: [{ id: "opposite_party_name", type: "text", label: "विक्रेता/कंपनीचे नाव", required: true }, { id: "opposite_party_address", type: "textarea", label: "पत्ता", required: true }, { id: "bill_number", type: "text", label: "बिल क्रमांक", required: false }] },
            { title: "तक्रारीचे तपशील", questions: [{ id: "defect_deficiency", type: "textarea", label: "दोष/त्रुटीचे वर्णन करा", placeholder: "नेमकी काय अडचण आहे?", required: true, rows: 6 }, { id: "compensation_sought", type: "textarea", label: "अपेक्षित नुकसानभरपाई", required: true, rows: 4 }] }
        ]
    },
    grievance: { title: "तक्रार", description: "शासकीय तक्रार", sections: commonStructure.grievance.sections(mrText) },
    municipal: { title: "पालिका तक्रार", description: "स्थानिक स्वराज्य संस्था", sections: commonStructure.municipal.sections(mrText) },
    pil: { title: "जनहित याचिका", description: "PIL", sections: commonStructure.pil.sections(mrText) },
    writ: { title: "रिट याचिका", description: "संवैधानिक", sections: commonStructure.writ.sections(mrText) }
};

// --- KANNADA ---
const knText = {
    authDetails: "ಪ್ರಾಧಿಕಾರದ ವಿವರಗಳು", authName: "ಪ್ರಾಧಿಕಾರ/ಇಲಾಖೆ", authPlaceholder: "ಉದಾ. ಜಿಲ್ಲಾಧಿಕಾರಿ", address: "ವಿಳಾಸ",
    complaintDetails: "ದೂರಿನ ವಿವರಗಳು", subject: "ವಿಷಯ", subjectPlaceholder: "ಸಂಕ್ಷಿಪ್ತವಾಗಿ",
    desc: "ವಿವರಣೆ", descPlaceholder: "ವಿವರವಾಗಿ...", loc: "ಸ್ಥಳ", locPlaceholder: "ಎಲ್ಲಿ ನಡೆಯಿತು?",
    relief: "ಪರಿಹಾರ", reliefPlaceholder: "ನಿಮಗೆ ಏನು ಬೇಕು?",
    muniAdmin: "ನಗರಸಭೆ", muniName: "ನಗರಸಭೆ/ಪಾಲಿಕೆ", muniPlaceholder: "ಉದಾ. ಬಿಬಿಎಂಪಿ", ward: "ವಾರ್ಡ್",
    issueType: "ಸಮಸ್ಯೆ", issueOptions: ["ರಸ್ತೆ", "ಚರಂಡಿ", " ನೀರು", "ಕಸ", "ದೀಪ", "ಒತ್ತುವರಿ", "ಕಟ್ಟಡ", "ಇತರೆ"],
    exactLoc: "ನಿಖರ ಸ್ಥಳ", probDesc: "ಸಮಸ್ಯೆ ವಿವರಣೆ", probPlaceholder: "ವಿವರಿಸಿ...",
    urgency: "ತುರ್ತು", urgencyOptions: ["ಕಡಿಮೆ", "ಮಧ್ಯಮ", "ಹೆಚ್ಚು", "ಅತ್ಯಂತ ತುರ್ತು"],
    actionReq: "ಕ್ರಮ", actionPlaceholder: "ಏನು ಮಾಡಬೇಕು?",
    courtDetails: "ನ್ಯಾಯಾಲಯ", selectCourt: "ನ್ಯಾಯಾಲಯ ಆಯ್ಕೆ", courtOptions: ["ಸುಪ್ರೀಂ ಕೋರ್ಟ್", "ಹೈಕೋರ್ಟ್", "ಇತರೆ"],
    publicInterest: "ಸಾರ್ವಜನಿಕ ಹಿತಾಸಕ್ತಿ", issueDesc: "ವಿಷಯ", issuePlaceholder: "ಜನರಿಗೆ ತೊಂದರೆ ಏನು?",
    writDetails: "ರಿಟ್ ವಿವರ", writType: "ರಿಟ್ ವಿಧ", writOptions: ["ಹೆಬಿಯಸ್ ಕಾರ್ಪಸ್", "ಮ್ಯಾಂಡಮಸ್", "ಪ್ರೊಹಿಬಿಷನ್", "ಸೆರ್ಟಿಯೊರಾರಿ", "ಕ್ವಾ-ುವಾರಂಟೊ"],
    facts: "ಅಂಶಗಳು", factsPlaceholder: "ವಿವರಗಳು..."
};

export const schemasKn: Record<string, any> = {
    rti: {
        title: "ಆರ್‌ಟಿಐ ಅರ್ಜಿ", description: "ಮಾಹಿತಿ ಹಕ್ಕು ಕಾಯಿದೆ, 2005",
        sections: [
            { title: "ಸಾರ್ವಜನಿಕ ಪ್ರಾಧಿಕಾರದ ವಿವರಗಳು", questions: [{ id: "authority_name", type: "text", label: "ಪ್ರಾಧಿಕಾರದ ಹೆಸರು", placeholder: "ಉದಾ. ಬೃಹತ್ ಬೆಂಗಳೂರು ಮಹಾನಗರ ಪಾಲಿಕೆ", required: true }, { id: "department", type: "text", label: "ಇಲಾಖೆ", required: false }, { id: "authority_address", type: "textarea", label: "ವಿಳಾಸ", required: true }] },
            { title: "ಮಾಹಿತಿ ವಿವರಗಳು", questions: [{ id: "information_details", type: "textarea", label: "ನಿಮಗೆ ಯಾವ ಮಾಹಿತಿ ಬೇಕು?", placeholder: "ವಿವರವಾಗಿ ಬರೆಯಿರಿ...", required: true, rows: 6 }] },
            { title: "ಶುಲ್ಕ", questions: [{ id: "payment_mode", type: "select", label: "ಪಾವತಿ ವಿಧಾನ", options: ["ನಗದು", "ಡಿಡಿ", "ಪೋಸ್ಟಲ್ ಆರ್ಡರ್", "ಆನ್‌ಲೈನ್", "ಇತರೆ"], required: true }] }
        ]
    },
    consumer: {
        title: "ಗ್ರಾಹಕ ದೂರು", description: "ಗ್ರಾಹಕ ಸಂರಕ್ಷಣಾ ಕಾಯಿದೆ, 2019",
        sections: [
            { title: "ಮಾರಾಟಗಾರರ ವಿವರಗಳು", questions: [{ id: "opposite_party_name", type: "text", label: "ಮಾರಾಟಗಾರ/ಕಂಪನಿ ಹೆಸರು", required: true }, { id: "opposite_party_address", type: "textarea", label: "ವಿಳಾಸ", required: true }] },
            { title: "ದೂರಿನ ವಿವರಗಳು", questions: [{ id: "defect_deficiency", type: "textarea", label: "ದೋಷದ ವಿವರಣೆ", placeholder: "ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ...", required: true, rows: 6 }, { id: "compensation_sought", type: "textarea", label: "ಪರಿಹಾರ", required: true, rows: 4 }] }
        ]
    },
    grievance: { title: "ದೂರು", description: "ಸಾರ್ವಜನಿಕ ದೂರು", sections: commonStructure.grievance.sections(knText) },
    municipal: { title: "ಪುರಸಭೆ ದೂರು", description: "ಸ್ಥಳೀಯ ಸಂಸ್ಥೆ", sections: commonStructure.municipal.sections(knText) },
    pil: { title: "ಪಿಐಎಲ್", description: "ಸಾರ್ವಜನಿಕ ಹಿತಾಸಕ್ತಿ ಅರ್ಜಿ", sections: commonStructure.pil.sections(knText) },
    writ: { title: "ರಿಟ್ ಅರ್ಜಿ", description: "ಸಾಂವಿಧಾನಿಕ ಪರಿಹಾರ", sections: commonStructure.writ.sections(knText) }
};


// --- PUNJABI ---
const paText = {
    authDetails: "ਅਥਾਰਟੀ ਵੇਰਵੇ", authName: "ਅਥਾਰਟੀ ਦਾ ਨਾਮ", authPlaceholder: "ਉਦਾਹਰਨ: ਡਿਪਟੀ ਕਮਿਸ਼ਨਰ", address: "ਪਤਾ",
    complaintDetails: "ਸ਼ਿਕਾਇਤ ਵੇਰਵੇ", subject: "ਵਿਸ਼ਾ", subjectPlaceholder: "ਸੰਖੇਪ ਵਿੱਚ",
    desc: "ਵੇਰਵਾ", descPlaceholder: "ਪੂਰੀ ਜਾਣਕਾਰੀ...", loc: "ਸਥਾਨ", locPlaceholder: "ਕਿੱਥੇ?",
    relief: "ਰਾਹਤ", reliefPlaceholder: "ਤੁਸੀਂ ਕੀ ਚਾਹੁੰਦੇ ਹੋ?",
    muniAdmin: "ਨਗਰ ਨਿਗਮ", muniName: "ਨਿਗਮ ਦਾ ਨਾਮ", muniPlaceholder: "ਉਦਾਹਰਨ: ਲੁਧਿਆਣਾ ਨਗਰ ਨਿਗਮ", ward: "ਵਾਰਡ ਨੰਬਰ",
    issueType: "ਮੁੱਦਾ", issueOptions: ["ਸੜਕ", "ਸੀਵਰੇਜ", "ਪਾਣੀ", "ਕੂੜਾ", "ਲਾਈਟਾਂ", "ਕਬਜ਼ਾ", "ਇਮਾਰਤ", "ਹੋਰ"],
    exactLoc: "ਸਹੀ ਸਥਾਨ", probDesc: "ਸਮੱਸਿਆ", probPlaceholder: "ਵੇਰਵਾ...",
    urgency: "ਜਰੂਰੀ", urgencyOptions: ["ਘੱਟ", "ਦਰਮਿਆਨਾ", "ਉੱਚ", "ਬਹੁਤ ਜਰੂਰੀ"],
    actionReq: "ਕਾਰਵਾਈ", actionPlaceholder: "ਕੀ ਕੀਤਾ ਜਾਵੇ?",
    courtDetails: "ਅਦਾਲਤ", selectCourt: "ਅਦਾਲਤ ਚੁਣੋ", courtOptions: ["ਸੁਪਰੀਮ ਕੋਰਟ", "ਹਾਈ ਕੋਰਟ", "ਹੋਰ"],
    publicInterest: "ਲੋਕ ਹਿੱਤ", issueDesc: "ਮੁੱਦਾ", issuePlaceholder: "ਲੋਕਾਂ ਨੂੰ ਕੀ ਨੁਕਸਾਨ ਹੈ?",
    writDetails: "ਰਿਟ", writType: "ਕਿਸਮ", writOptions: ["ਹੇਬੀਅਸ ਕਾਰਪਸ", "ਮੈਂਡਮਸ", "ਮਨਾਹੀ", "ਸਰਟੀਓਰੀ", "ਕੋ-ਵਾਰੰਟੋ"],
    facts: "ਤੱਥ", factsPlaceholder: "ਕੇਸ ਦੇ ਤੱਥ..."
};

export const schemasPa: Record<string, any> = {
    rti: {
        title: "ਆਰਟੀਆਈ ਅਰਜ਼ੀ", description: "ਸੂਚਨਾ ਦਾ ਅਧਿਕਾਰ ਐਕਟ, 2005",
        sections: [
            { title: "ਜਨਤਕ ਅਥਾਰਟੀ ਵੇਰਵੇ", questions: [{ id: "authority_name", type: "text", label: "ਅਥਾਰਟੀ ਦਾ ਨਾਮ", placeholder: "ਉਦਾਹਰਨ: ਨਗਰ ਨਿਗਮ", required: true }, { id: "authority_address", type: "textarea", label: "ਪਤਾ", required: true }] },
            { title: "ਜਾਣਕਾਰੀ", questions: [{ id: "information_details", type: "textarea", label: "ਤੁਸੀਂ ਕਿਹੜੀ ਜਾਣਕਾਰੀ ਚਾਹੁੰਦੇ ਹੋ?", placeholder: "ਵੇਰਵਾ ਦਿਓ...", required: true, rows: 6 }] },
            { title: "ਫੀਸ", questions: [{ id: "payment_mode", type: "select", label: "ਭੁਗਤਾਨ ਵਿਧੀ", options: ["ਨਕਦੀ", "ਡਰਾਫਟ", "ਪੋਸਟਲ ਆਰਡਰ", "ਆਨਲਾਈਨ", "ਹੋਰ"], required: true }] }
        ]
    },
    consumer: {
        title: "ਖਪਤਕਾਰ ਸ਼ਿਕਾਇਤ", description: "ਖਪਤਕਾਰ ਸੁਰੱਖਿਆ ਐਕਟ, 2019",
        sections: [
            { title: "ਵੇਚਣ ਵਾਲੇ ਦਾ ਵੇਰਵਾ", questions: [{ id: "opposite_party_name", type: "text", label: "ਕੰਪਨੀ/ਦੁਕਾਨ ਦਾ ਨਾਮ", required: true }, { id: "opposite_party_address", type: "textarea", label: "ਪਤਾ", required: true }] },
            { title: "ਸ਼ਿਕਾਇਤ", questions: [{ id: "defect_deficiency", type: "textarea", label: "ਨੁਕਸ ਦਾ ਵੇਰਵਾ", required: true, rows: 6 }, { id: "compensation_sought", type: "textarea", label: "ਮੁਆਵਜ਼ਾ", required: true, rows: 4 }] }
        ]
    },
    grievance: { title: "ਸ਼ਿਕਾਇਤ ਪੱਤਰ", description: "ਸਰਕਾਰੀ ਸ਼ਿਕਾਇਤ", sections: commonStructure.grievance.sections(paText) },
    municipal: { title: "ਨਗਰ ਨਿਗਮ ਸ਼ਿਕਾਇਤ", description: "ਸਥਾਨਕ ਸਰਕਾਰ", sections: commonStructure.municipal.sections(paText) },
    pil: { title: "ਜਨਹਿਤ ਪਟੀਸ਼ਨ", description: "PIL", sections: commonStructure.pil.sections(paText) },
    writ: { title: "ਰਿਟ ਪਟੀਸ਼ਨ", description: "ਸੰਵਿਧਾਨਕ", sections: commonStructure.writ.sections(paText) }
};

// --- ODIA ---
const orText = {
    authDetails: "କର୍ତ୍ତୃପକ୍ଷଙ୍କ ବିବରଣୀ", authName: "କର୍ତ୍ତୃପକ୍ଷ ନାମ", authPlaceholder: "ଉଦାହରଣ: ଜିଲ୍ଲାପାଳ", address: "ଠିକଣା",
    complaintDetails: "ଅଭିଯୋଗ ବିବରଣୀ", subject: "ବିଷୟ", subjectPlaceholder: "ସଂକ୍ଷିପ୍ତ",
    desc: "ବିବରଣୀ", descPlaceholder: "ସମ୍ପୂର୍ଣ୍ଣ...", loc: "ସ୍ଥାନ", locPlaceholder: "କେଉଁଠାରେ?",
    relief: "ପ୍ରତିକାର", reliefPlaceholder: "ଆପଣ କ'ଣ ଚାହୁଁଛନ୍ତି?",
    muniAdmin: "ପୌରପାଳିକା", muniName: "ପୌରପାଳିକା ନାମ", muniPlaceholder: "ଉଦାହରଣ: ଭୁବନେଶ୍ୱର", ward: "ୱାର୍ଡ",
    issueType: "ସମସ୍ୟା", issueOptions: ["ରାସ୍ତା", " ନାଳ", "ଜଳ", "ଆବର୍ଜନା", "ଆଲୋକ", "ଜବରଦଖଲ", "କୋଠା", "ଅନ୍ୟାନ୍ୟ"],
    exactLoc: "ସଠିକ ସ୍ଥାନ", probDesc: "ସମସ୍ୟାର ବିବରଣୀ", probPlaceholder: "ବିସ୍ତୃତ...",
    urgency: "ଜରୁରୀ", urgencyOptions: ["କମ୍", "ମଧ୍ୟମ", "ଅଧିକ", "ଅତି ଜରୁରୀ"],
    actionReq: "କାର୍ଯ୍ୟାନୁଷ୍ଠାନ", actionPlaceholder: "କ'ଣ କରିବା ଉଚିତ୍?",
    courtDetails: "ଅଦାଲତ", selectCourt: "ଅଦାଲତ ବାଛନ୍ତୁ", courtOptions: ["ସୁପ୍ରିମକୋର୍ଟ", "ହାଇକୋର୍ଟ", "ଅନ୍ୟାନ୍ୟ"],
    publicInterest: "ଜନସ୍ୱାର୍ଥ", issueDesc: "ବିଷୟ", issuePlaceholder: "ଲୋକଙ୍କର କ'ଣ କ୍ଷତି ହେଉଛି?",
    writDetails: "ରିଟ୍", writType: "ପ୍ରକାର", writOptions: ["ବନ୍ଦୀ ପ୍ରତ୍ୟକ୍ଷୀକରଣ", "ପରମାଦେଶ", "ପ୍ରତିଷେଧ", "ଉତ୍ପ୍ରେଷଣ", "ଅଧିକାର ପୃଚ୍ଛା"],
    facts: "ତଥ୍ୟ", factsPlaceholder: "ଘଟଣାର ତଥ୍ୟ..."
};

export const schemasOr: Record<string, any> = {
    rti: {
        title: "RTI ଆବେଦନ", description: "ସୂଚନା ଅଧିକାର ଆଇନ, ୨୦୦୫",
        sections: [
            { title: "କର୍ତ୍ତୃପକ୍ଷଙ୍କ ବିବରଣୀ", questions: [{ id: "authority_name", type: "text", label: "କର୍ତ୍ତୃପକ୍ଷଙ୍କ ନାମ", required: true }, { id: "authority_address", type: "textarea", label: "ଠିକଣା", required: true }] },
            { title: "ସୂଚନା", questions: [{ id: "information_details", type: "textarea", label: "ଆପଣ କେଉଁ ସୂଚନା ଚାହୁଁଛନ୍ତି?", required: true, rows: 6 }] }
        ]
    },
    consumer: {
        title: "ଗ୍ରାହକ ଅଭିଯୋଗ", description: "ଗ୍ରାହକ ସୁରକ୍ଷା ଆଇନ, ୨୦୧୯",
        sections: [
            { title: "ବିକ୍ରେତା ବିବରଣୀ", questions: [{ id: "opposite_party_name", type: "text", label: "ବିକ୍ରେତାଙ୍କ ନାମ", required: true }, { id: "opposite_party_address", type: "textarea", label: "ଠିକଣା", required: true }] },
            { title: "ଅଭିଯୋଗ", questions: [{ id: "defect_deficiency", type: "textarea", label: "ଅଭିଯୋଗର ବିବରଣୀ", required: true, rows: 6 }] }
        ]
    },
    grievance: { title: "ଅଭିଯୋଗ", description: "ସରକାରୀ ଅଭିଯୋଗ", sections: commonStructure.grievance.sections(orText) },
    municipal: { title: "ପୌର ଅଭିଯୋଗ", description: "ସ୍ଥାନୀୟ", sections: commonStructure.municipal.sections(orText) },
    pil: { title: "ଜନସ୍ୱାର୍ଥ ମାମଲା", description: "PIL", sections: commonStructure.pil.sections(orText) },
    writ: { title: "ରିଟ୍ ଆବେଦନ", description: "ସାମ୍ବିଧାନିକ", sections: commonStructure.writ.sections(orText) }
};

// --- ASSAMESE ---
const asText = {
    authDetails: "কর্তৃপক্ষৰ বিৱৰণ", authName: "কর্তৃপক্ষৰ নাম", authPlaceholder: "উদাহৰণ: উপায়ুক্ত", address: "ঠিকনা",
    complaintDetails: "অভিযোগৰ বিৱৰণ", subject: "বিষয়", subjectPlaceholder: "চমুকৈ",
    desc: "বিৱৰণ", descPlaceholder: "বিতং ভাৱে...", loc: "স্থান", locPlaceholder: "ক'ত ঘটিছিল?",
    relief: "প্ৰতিকাৰ", reliefPlaceholder: "আপুনি কি বিচাৰে?",
    muniAdmin: "পৌৰসভা", muniName: "পৌৰসভাৰ নাম", muniPlaceholder: "উদাহৰণ: গুৱাহাটী পৌৰ নিগম", ward: "ৱাৰ্ড",
    issueType: "সমস্যা", issueOptions: ["ৰাস্তা", "নলা", "পানী", "আৱৰ্জনা", "লাইট", "দখল", "নিৰ্মাণ", "অন্যান্য"],
    exactLoc: "সঠিক স্থান", probDesc: "সমস্যাৰ বিৱৰণ", probPlaceholder: "বিতং...",
    urgency: "জৰুৰী", urgencyOptions: ["কম", "মধ্যম", "বেছি", "অতি জৰুৰী"],
    actionReq: "কি কৰিব লাগে", actionPlaceholder: "কি ব্যৱস্থা ল'ব লাগে?",
    courtDetails: "আদালত", selectCourt: "আদালত বাছনি", courtOptions: ["উচ্চতম ন্যায়ালয়", "উচ্চ ন্যায়ালয়", "অন্যান্য"],
    publicInterest: "জনস্বাৰ্থ", issueDesc: "বিষয়", issuePlaceholder: "ৰাইজৰ কি ক্ষতি হৈছে?",
    writDetails: "ৰিট", writType: "প্ৰকাৰ", writOptions: ["হেবিয়াছ কৰ্পাছ", "মেণ্ডাডমাছ", "প্ৰহিবিচন", "ছাৰ্চিঅ'ৰাৰি", "কো-ৱাৰেণ্টো"],
    facts: "তথ্য", factsPlaceholder: "ঘটনাৰ তথ্য..."
};

export const schemasAs: Record<string, any> = {
    rti: {
        title: "RTI আবেদন", description: "তথ্য জনাৰ অধিকাৰ আইন, ২০০৫",
        sections: [
            { title: "কর্তৃপক্ষৰ বিৱৰণ", questions: [{ id: "authority_name", type: "text", label: "কর্তৃপক্ষৰ নাম", required: true }, { id: "authority_address", type: "textarea", label: "ঠিকনা", required: true }] },
            { title: "তথ্য", questions: [{ id: "information_details", type: "textarea", label: "আপুনি কি তথ্য বিচাৰে?", required: true, rows: 6 }] }
        ]
    },
    consumer: {
        title: "গ্ৰাহকৰ অভিযোগ", description: "গ্ৰাহক সুৰক্ষা আইন, ২০১৯",
        sections: [
            { title: "বিক্রেতাৰ বিৱৰণ", questions: [{ id: "opposite_party_name", type: "text", label: "বিক্রেতা/কোম্পানীৰ নাম", required: true }, { id: "opposite_party_address", type: "textarea", label: "ঠিকনা", required: true }] },
            { title: "অভিযোগ", questions: [{ id: "defect_deficiency", type: "textarea", label: "অভিযোগৰ বিৱৰণ", required: true, rows: 6 }] }
        ]
    },
    grievance: { title: "অভিযোগ", description: "চৰকাৰী অভিযোগ", sections: commonStructure.grievance.sections(asText) },
    municipal: { title: "পৌৰ অভিযোগ", description: "স্থানীয়", sections: commonStructure.municipal.sections(asText) },
    pil: { title: "জনস্বাৰ্থ গোচৰ", description: "PIL", sections: commonStructure.pil.sections(asText) },
    writ: { title: "ৰিট আবেদন", description: "সাংবিধানিক", sections: commonStructure.writ.sections(asText) }
};
