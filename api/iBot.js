import { Alert } from 'react-native';
import axios from 'axios';

const client = axios.create({
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

const API_URL = 'https://i-bot-api-9cc82e2ea8b1.herokuapp.com/prompt';

export const iBotApiCall = async (prompt) => {
    try {
        const formData = new FormData();
        formData.append('prompt', prompt);
        const response = await client.post(API_URL, formData);
        return response.data.bot_response;
    } catch (err) {
        console.log('Error sending a message:', err);
        Alert.alert('Error sending a message:', err.message);
    }
}
