import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: {
            "forecast": "Forecast",
            "settings": "Settings",
            "weather_api_key": "Weather Api Key",
            "enter_your_key": "Enter your key",
            "use_device_location": "Use device location",
            "location": "Location",
            "enter_a_location": "Enter a location",
            "use_device_theme": "Use device theme",
            "darkmode": "Dark mode",
            "save": "Save",
            "forecast_overview": "Forecast overview",
            "forecast_detail": "Forecast detail",
            "last_update": "Last update",
            "no_api_key_provided": "There is no API key provided.",
            "no_location_permission": "Permission to access system location not granted.",
            "no_location_provided": "There is no location provided.",
            "unknown_fetch_error": "Unknown fetch error occurred",
            1002: "API key not provided",
            1003: "Parameter 'q' not provided.",
            1005: "API request url is invalid",
            1006: "The provided location is not found.",
            2006: "API key provided is invalid",
            2007:	"API key has exceeded calls per month quota.",
            2008:	"API key has been disabled.",
            2009:	"API key does not have access to the resource. Please check pricing page for what is allowed in your API subscription plan.",
            9999:	"Internal application error.",
            "unknown_api_error": "Unknown API error occurred",
            "validate": "Validate",
            "location_permission_not_granted": "Please grant permission in the system settings or turn off 'use device location in settings'."
        }
      },
      nl: {
        translation: {
            "forecast": "Voorspelling",
            "settings": "Instellingen",
            "weather_api_key": "Weather API Key",
            "enter_your_key": "Geef uw key",
            "use_device_location": "Gebruik toestel locatie",
            "location": "Locatie",
            "enter_a_location": "Geef een locatie",
            "use_device_theme": "Gebruik toestel thema",
            "darkmode": "Donkere modus",
            "save": "Opslaan",
            "forecast_overview": "Voorspelling: overzicht",
            "forecast_detail": "Voorspelling: detail",
            "last_update": "Laatste update",
            "no_api_key_provided": "Er is geen API key ingesteld.",
            "no_location_permission": "Er is geen toestemming verleend om de systeem locatie te gebruiken.",
            "no_location_provided": "Er is geen locatie ingesteld.",
            "unknown_fetch_error": "Er is een onbekende fetch error opgetreden.",
            1002: "API-sleutel niet opgegeven",
            1003: "Parameter 'q' niet opgegeven.",
            1005: "API-verzoek URL is ongeldig",
            1006: "De ingestelde locatie is niet gevonden.",
            2006: "Opgegeven API-sleutel is ongeldig",
            2007: "API-sleutel heeft het aantal oproepen per maand overschreden.",
            2008: "API-sleutel is uitgeschakeld.",
            2009: "API-sleutel heeft geen toegang tot de bron. Controleer de prijspagina om te zien wat is toegestaan in uw API-abonnement.",
            9999: "Interne applicatiefout.",
            "unknown_api_error": "Onbekende API-fout opgetreden",
            "validate": "valideer",
            "location_permission_not_granted": "Geef toestemming in de systeem instellingen om de locatie te  gebruiken of schakel 'gebruik toestel locatie' uit in de instellingen."
        }
      }
    },
    lng: "en", 
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;