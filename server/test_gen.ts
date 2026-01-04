
import { generatePetition } from './src/services/aiService';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
    console.log("STARTING OFFLINE TEST...");
    const result = await generatePetition({
        type: 'rti',
        language: 'ta',
        questionnaireData: { information_details: 'Test RTI information request for drinking water.' },
        userName: 'Test User',
        userAddress: 'Tamil Nadu, India'
    });
    console.log("-----------------------------------");
    console.log(result);
    console.log("-----------------------------------");
    process.exit(0);
}

test().catch(e => {
    console.error(e);
    process.exit(1);
});
