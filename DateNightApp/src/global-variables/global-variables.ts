import { environmentVariableWeatherAPIKey } from "../environment-variables/environment-variables";

export const globalVariableDate = new Date();
export let globalVariableDay = globalVariableDate.getDay();
export let globalVariableCombinedResponses = [0, 0, 0, 0, 0, 0, 0];
export const globalVariableWeatherURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Ni%C5%A1%2C%20Serbia?unitGroup=metric&key=${environmentVariableWeatherAPIKey}&contentType=json`;
export const globalVariableDayNameList = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export let globalVariableArray = [0, 0, 0, 0, 0, 0, 0];
export let globalValueNameCounter = 0;
