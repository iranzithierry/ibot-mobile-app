import { Alert } from 'react-native';
import { apiKey } from '../constants';
import axios from 'axios';
const client = axios.create({
    headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
    }
})

const chatgptUrl = 'https://api.openai.com/v1/chat/completions';

export const chatgptApiCall = async (prompt) => {
    try {
        const res = await client.post(chatgptUrl, {
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": "You are a helpful assistant." },
                { "role": "user", "content": prompt }],
        })

        let answer = res.data?.choices[0]?.message?.content;
        return answer.trim()

    } catch (err) {
        Alert.alert("Error sending a message:", err);
    }
}
