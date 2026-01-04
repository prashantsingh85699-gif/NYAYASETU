
// Additional translated schemas part 3 (Gujarati & Telugu remaining types)

const guText = {
    authDetails: "સત્તાધિકારીની વિગતો", authName: "સત્તાધિકારી/વિભાગનું નામ", authPlaceholder: "દા.ત., જિલ્લા કલેક્ટર", address: "સરનામું",
    complaintDetails: "ફરિયાદ વિગતો", subject: "વિષય", subjectPlaceholder: "ટૂંકમાં",
    desc: "વિગતવાર વર્ણન", descPlaceholder: "સંપૂર્ણ માહિતી...", loc: "સ્થળ", locPlaceholder: "ક્યાં બન્યું?",
    relief: "રાહત", reliefPlaceholder: "તમે શું ઈચ્છો છો?",
    muniAdmin: "મ્યુનિસિપલ", muniName: "પાલિકા/કોર્પોરેશન", muniPlaceholder: "દા.ત., અમદાવાદ મ્યુનિ.", ward: "વોર્ડ નં.",
    issueType: "સમસ્યા", issueOptions: ["રસ્તા", "ગટર", "પાણી", "કચરો", "લાઈટ", "દબાણ", "બાંધકામ", "અન્ય"],
    exactLoc: "ચોક્કસ સ્થળ", probDesc: "સમસ્યા વર્ણન", probPlaceholder: "વિગતવાર...",
    urgency: "તાકીદ", urgencyOptions: ["ઓછી", "મધ્યમ", "વધુ", "ખૂબ તાકીદ"],
    actionReq: "કાર્યવાહી", actionPlaceholder: "શું કરવું જોઈએ?",
    courtDetails: "કોર્ટ", selectCourt: "કોર્ટ પસંદ કરો", courtOptions: ["સુપ્રીમ કોર્ટ", "હાઈકોર્ટ", "અન્ય"],
    publicInterest: "જાહેર હિત", issueDesc: "મુદ્દો", issuePlaceholder: "લોકોનું શું નુકસાન થાય છે?",
    writDetails: "રિટ", writType: "પ્રકાર", writOptions: ["હેબિયસ કોર્પસ", "મેન્ડમસ", "પ્રોહિબિશન", "સર્શિયોરરી", "કો-વોરંટો"],
    facts: "હકીકતો", factsPlaceholder: "કેસની હકીકતો..."
};

const teText = {
    authDetails: "అథారిటీ వివరాలు", authName: "అథారిటీ/శాఖ పేరు", authPlaceholder: "ఉదా. జిల్లా కలెక్టర్", address: "చిరునామా",
    complaintDetails: "ఫిర్యాదు వివరాలు", subject: "విషయం", subjectPlaceholder: "క్లుప్తంగా",
    desc: "వివరణ", descPlaceholder: "పూర్తి వివరాలు...", loc: "స్థలం", locPlaceholder: "ఎక్కడ జరిగింది?",
    relief: "పరిష్కారం", reliefPlaceholder: "మీరు ఏమి కోరుకుంటున్నారు?",
    muniAdmin: "మున్సిపల్", muniName: "మున్సిపాలిటీ/కార్పొరేషన్", muniPlaceholder: "ఉదా. హైదరాబాద్ కార్పొరేషన్", ward: "వార్డు",
    issueType: "సమస్య", issueOptions: ["రోడ్డు", "మురుగునీరు", "నీరు", "చెత్త", "లైట్లు", "ఆక్రమణ", "భవనం", "ఇతర"],
    exactLoc: "ఖచ్చితమైన స్థలం", probDesc: "సమస్య వివరణ", probPlaceholder: "వివరంగా...",
    urgency: "అత్యవసర", urgencyOptions: ["తక్కువ", "మధ్యస్థ", "ఎక్కువ", "అత్యంత అత్యవసర"],
    actionReq: "చర్య", actionPlaceholder: "ఏమి చేయాలి?",
    courtDetails: "కోర్టు", selectCourt: "కోర్టును ఎంచుకోండి", courtOptions: ["సుప్రీం కోర్ట్", "హైకోర్ట్", "ఇతర"],
    publicInterest: "ప్రజా ప్రయోజనం", issueDesc: "సమస్య", issuePlaceholder: "ప్రజలకు ఏమి నష్టం జరుగుతోంది?",
    writDetails: "రిట్", writType: "రకం", writOptions: ["హేబియస్ కార్పస్", "మాండమస్", "ప్రొహిబిషన్", "సెర్టియోరారి", "కో-వారెంటో"],
    facts: "వాస్తవాలు", factsPlaceholder: "కేసు వాస్తవాలు..."
};

export const additionalGuTe = {
    gu: {
        grievance: {
            title: "ફરિયાદ અરજી", description: "સરકારી ફરિયાદ",
            sections: [
                { title: guText.authDetails, questions: [{ id: "authority", type: "text", label: guText.authName, placeholder: guText.authPlaceholder, required: true }, { id: "authority_address", type: "textarea", label: guText.address, required: true }] },
                { title: guText.complaintDetails, questions: [{ id: "subject", type: "text", label: guText.subject, placeholder: guText.subjectPlaceholder, required: true }, { id: "grievance_description", type: "textarea", label: guText.desc, placeholder: guText.descPlaceholder, required: true, rows: 8 }, { id: "location", type: "text", label: guText.loc, placeholder: guText.locPlaceholder, required: false }, { id: "relief_sought", type: "textarea", label: guText.relief, placeholder: guText.reliefPlaceholder, required: true, rows: 4 }] }
            ]
        },
        municipal: {
            title: "મ્યુનિસિપલ ફરિયાદ", description: "સ્થાનિક સ્વરાજ્ય",
            sections: [
                { title: guText.muniAdmin, questions: [{ id: "municipality", type: "text", label: guText.muniName, placeholder: guText.muniPlaceholder, required: true }, { id: "ward", type: "text", label: guText.ward, required: false }] },
                { title: guText.complaintDetails, questions: [{ id: "issue_type", type: "select", label: guText.issueType, options: guText.issueOptions, required: true }, { id: "location", type: "textarea", label: guText.exactLoc, placeholder: guText.locPlaceholder, required: true, rows: 3 }, { id: "problem_description", type: "textarea", label: guText.probDesc, placeholder: guText.probPlaceholder, required: true, rows: 6 }, { id: "urgency", type: "select", label: guText.urgency, options: guText.urgencyOptions, required: true }, { id: "action_requested", type: "textarea", label: guText.actionReq, placeholder: guText.actionPlaceholder, required: true, rows: 3 }] }
            ]
        },
        pil: {
            title: "જાહેર હિતની અરજી", description: "PIL",
            sections: [
                { title: guText.courtDetails, questions: [{ id: "court", type: "select", label: guText.selectCourt, options: guText.courtOptions, required: true }] },
                { title: guText.publicInterest, questions: [{ id: "public_issue", type: "textarea", label: guText.issueDesc, placeholder: guText.issuePlaceholder, required: true, rows: 6 }, { id: "relief_sought", type: "textarea", label: guText.relief, placeholder: guText.reliefPlaceholder, required: true, rows: 4 }] }
            ]
        },
        writ: {
            title: "રિટ અરજી", description: "બંધારણીય",
            sections: [
                { title: guText.writDetails, questions: [{ id: "writ_type", type: "select", label: guText.writType, options: guText.writOptions, required: true }, { id: "facts", type: "textarea", label: guText.facts, placeholder: guText.factsPlaceholder, required: true, rows: 8 }, { id: "relief", type: "textarea", label: guText.relief, placeholder: guText.reliefPlaceholder, required: true, rows: 4 }] }
            ]
        }
    },
    te: {
        grievance: {
            title: "ఫిర్యాదు", description: "ప్రభుత్వానికి ఫిర్యాదు",
            sections: [
                { title: teText.authDetails, questions: [{ id: "authority", type: "text", label: teText.authName, placeholder: teText.authPlaceholder, required: true }, { id: "authority_address", type: "textarea", label: teText.address, required: true }] },
                { title: teText.complaintDetails, questions: [{ id: "subject", type: "text", label: teText.subject, placeholder: teText.subjectPlaceholder, required: true }, { id: "grievance_description", type: "textarea", label: teText.desc, placeholder: teText.descPlaceholder, required: true, rows: 8 }, { id: "location", type: "text", label: teText.loc, placeholder: teText.locPlaceholder, required: false }, { id: "relief_sought", type: "textarea", label: teText.relief, placeholder: teText.reliefPlaceholder, required: true, rows: 4 }] }
            ]
        },
        municipal: {
            title: "మున్సిపల్ ఫిర్యాదు", description: "స్థానిక సంస్థ",
            sections: [
                { title: teText.muniAdmin, questions: [{ id: "municipality", type: "text", label: teText.muniName, placeholder: teText.muniPlaceholder, required: true }, { id: "ward", type: "text", label: teText.ward, required: false }] },
                { title: teText.complaintDetails, questions: [{ id: "issue_type", type: "select", label: teText.issueType, options: teText.issueOptions, required: true }, { id: "location", type: "textarea", label: teText.exactLoc, placeholder: teText.locPlaceholder, required: true, rows: 3 }, { id: "problem_description", type: "textarea", label: teText.probDesc, placeholder: teText.probPlaceholder, required: true, rows: 6 }, { id: "urgency", type: "select", label: teText.urgency, options: teText.urgencyOptions, required: true }, { id: "action_requested", type: "textarea", label: teText.actionReq, placeholder: teText.actionPlaceholder, required: true, rows: 3 }] }
            ]
        },
        pil: {
            title: "పిఐఎల్", description: "ప్రజా ప్రయోజన వ్యాజ్యం",
            sections: [
                { title: teText.courtDetails, questions: [{ id: "court", type: "select", label: teText.selectCourt, options: teText.courtOptions, required: true }] },
                { title: teText.publicInterest, questions: [{ id: "public_issue", type: "textarea", label: teText.issueDesc, placeholder: teText.issuePlaceholder, required: true, rows: 6 }, { id: "relief_sought", type: "textarea", label: teText.relief, placeholder: teText.reliefPlaceholder, required: true, rows: 4 }] }
            ]
        },
        writ: {
            title: "రిట్ పిటిషన్", description: "రాజ్యాంగ పరిహారం",
            sections: [
                { title: teText.writDetails, questions: [{ id: "writ_type", type: "select", label: teText.writType, options: teText.writOptions, required: true }, { id: "facts", type: "textarea", label: teText.facts, placeholder: teText.factsPlaceholder, required: true, rows: 8 }, { id: "relief", type: "textarea", label: teText.relief, placeholder: teText.reliefPlaceholder, required: true, rows: 4 }] }
            ]
        }
    }
};
