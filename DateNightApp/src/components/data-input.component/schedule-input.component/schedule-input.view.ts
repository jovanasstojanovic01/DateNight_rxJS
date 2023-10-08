import { ScheduleInputFunctionalities } from "./schedule-input.functionalities";

export function ScheduleInputView(): Element {
  const scheduleInput = document.createElement("div");
  scheduleInput.style.display = "flex";
  scheduleInput.style.flexDirection = "row";
  scheduleInput.style.marginTop = "20px";

  for (let i = 0; i < 7; i++) {
    let dayContainer = document.createElement("div");
    dayContainer.style.display = "flex";
    dayContainer.style.flexDirection = "column";
    dayContainer.style.margin = "17px";

    let dayInputCheckBox = document.createElement("INPUT");
    dayInputCheckBox.setAttribute("type", "checkbox");
    dayInputCheckBox.setAttribute("id", `day-input-checkbox:${i}`);
    dayInputCheckBox.style.height = "25px";
    dayInputCheckBox.style.accentColor = "#b300b3";
    dayInputCheckBox.style.cursor = "pointer";

    dayContainer.appendChild(dayInputCheckBox);

    const dayNameLabel = document.createElement("label");
    dayNameLabel.setAttribute("id", "d" + i);
    dayNameLabel.style.fontSize = "23px";
    dayNameLabel.style.fontFamily = "'Trebuchet MS', sans-serif";

    const weatherLabel = document.createElement("label");
    weatherLabel.setAttribute("id", "p" + i);

    dayContainer.appendChild(dayNameLabel);
    dayContainer.appendChild(weatherLabel);
    scheduleInput.appendChild(dayContainer);
  }

  ScheduleInputFunctionalities();
  return scheduleInput;
}
