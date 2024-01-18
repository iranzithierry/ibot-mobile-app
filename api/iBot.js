import { Alert } from 'react-native';
import axios, { CanceledError } from 'axios';

const client = axios.create({
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

const API_URL = 'https://datrue.pythonanywhere.com/prompt';

export const iBotApiCall = async (prompt, signal) => {
    try {
        const formData = new FormData();
        formData.append('prompt', prompt);
        const response = await client.post(API_URL, formData, { signal });
        return response.data.response;
    } catch (err) {
        if(!err instanceof CanceledError){
            Alert.alert('Error sending a message:', err.message);
        }
    }
}
