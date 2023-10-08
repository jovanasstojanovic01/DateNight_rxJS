import { fromEvent, map, zip } from "rxjs";
import {
  globalVariableCombinedResponses,
  globalVariableDay,
} from "../../../global-variables/global-variables";
import {
  dayNameListStream$,
  sevenDayForecastStream$,
} from "../../../global-streams/global-streams";
import { ScheduleInputView } from "./schedule-input.view";

export function ScheduleInputFunctionalities() {
  let dayNumberLocalVariable = globalVariableDay;
  for (let i = 0; i < 7; i++) {
    const dayInputCheckBoxFromTheView = document.querySelector(
      `#day-input-checkbox:${i}`
    );
    const checkedInputCheckBoxLocalStream$ = fromEvent(
      dayInputCheckBoxFromTheView,
      "click"
    );
    checkedInputCheckBoxLocalStream$
      .pipe(
        map((event) => {
          const checkbox = event.target as HTMLInputElement;
          return checkbox.checked ? 1 : 0;
        })
      )
      .subscribe((value) => {
        globalVariableCombinedResponses[i] = value;
      });
    dayNumberLocalVariable++;
    if (dayNumberLocalVariable == 7) dayNumberLocalVariable = 0;
  }

  let i = 0;
  document.addEventListener("DOMContentLoaded", () => {
    zip([dayNameListStream$, sevenDayForecastStream$]).subscribe(
      ([dan, weatherData]) => {
        const maxTemperaturesArray = weatherData.map((day) => day.maxTemp);
        const dayNameElement = document.querySelector(`#d${i}`);
        dayNameElement.innerHTML = dan;
        const weatherDataElement = document.querySelector(`#p${i}`);
        weatherDataElement.innerHTML = maxTemperaturesArray[i] + "";
        i++;
      }
    );
  });
}
