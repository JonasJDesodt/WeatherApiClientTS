const key : string = 'api_key';

export const SetApiKey = async (value: string): Promise<void> => {
    sessionStorage.setItem(key, value);
};

export const GetApiKey = async (): Promise<string | null> => {
    return sessionStorage.getItem(key);
};

export const DeleteApiKey = async (): Promise<void> => {
    sessionStorage.removeItem(key);
};