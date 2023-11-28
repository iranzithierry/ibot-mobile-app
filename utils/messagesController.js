import { getData } from "./asyncStorage";

export const getStorageMessages = async ( message, setMessage, setMessagesShown) => {
    const storageMessages = await getData('messages');
    if (storageMessages) {
        try {
            const parsedMessages = JSON.parse(storageMessages);
            if (parsedMessages && parsedMessages.length > message.length) {
                setMessage(parsedMessages);
            }
        } catch (error) {
            console.log("ERROR: ", error.message);
            return;
        } finally {
            setMessagesShown(true);
        }
    }
};