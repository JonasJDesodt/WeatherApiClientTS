import * as SecureStore from 'expo-secure-store';

const key : string = 'api_key';

export const SetApiKey = async (value: string): Promise<void> => {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (error) {
        console.error('Error saving the data', error);
    }
};

export const GetApiKey = async (): Promise<string | null> => {
    try {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
            return result;
        } else {
            console.log('No API key stored.');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving the API key', error);
        return null;
    }
};

export const DeleteApiKey = async (): Promise<void> => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.error('Error deleting the API key', error);
    }
};