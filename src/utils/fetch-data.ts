import { getLocales } from 'expo-localization'; 
import { Weather, Location, ErrorResponse } from '../config/weather-api-types';


interface FetchDataParams {
    coords: string,
    key: string,
    setLocationResponse: (location: Location | null) => void; 
    t: (key: string) => string;
}
  
interface FetchDataResult {
    data: Weather | null;
    error: string | null;
}

const FetchData = async ({ coords, key, setLocationResponse, t } : FetchDataParams) : Promise<FetchDataResult> => {
  let data : Weather | null = null;
  let error : string | null = null;


  let url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${coords}&days=14`;

  const lang = getLocales()[0].languageCode
  if(lang === 'nl'){
      url += '&lang=' + lang;
  }  

  try {  
    const response = await fetch(url);

    if(response.ok){
      data = await response.json();
      
      if(data){
        setLocationResponse(data.location);

        console.log('data fetched');
      }
    } else {     
      const errorResponse : ErrorResponse = await response.json();

      error = t(errorResponse.error.code.toString());
      console.log(error);
    }
  } catch (error) {
    if (error instanceof Error) {
      error = error.message; 
    } else {
      error  = t('unknown_fetch_error');
    }
    console.log(error);
  }

  return { data: data, error : error };
}

export default FetchData;