const ValidateApiKey = async (key: string) : Promise<boolean> =>{
    let url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=brussels&days=1`;

    try {  
        const response = await fetch(url);
    
        if(!response.ok){
            console.log(response.statusText)

            return false;
        } 
    } catch (error) {
        console.log(error);

        return false;
    };

    return true;
}

export default ValidateApiKey;