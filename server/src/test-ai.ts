import dotenv from 'dotenv';
dotenv.config();

import { chatWithAI } from './services/aiService';

const runTest = async () => {
    console.log("Testing AI Chat...");
    const question = "IPC 420 kya hota hai detail mein batao";
    console.log(`Question: ${question}`);

    try {
        const answer = await chatWithAI(question, 'hi');
        console.log("\n--- AI Answer ---");
        console.log(answer);
        console.log("-----------------");
    } catch (error) {
        console.error("Test Failed:", error);
    }
};

runTest();
