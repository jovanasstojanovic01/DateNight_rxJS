import {
  combineLatest,
  from,
  fromEvent,
  interval,
  map,
  switchMap,
  zip,
} from "rxjs";
import { ajax } from "rxjs/ajax";

export let odgovara = [0, 0, 0, 0, 0, 0, 0];
const date = new Date();
export let day = date.getDay();

/////////////////////////////
export function unosTermina(): Element {
  const nizDana = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const termini = document.createElement("div");
  termini.style.display = "flex";
  termini.style.flexDirection = "row";
  termini.style.marginTop = "20px";

  for (let i = 0; i < 7; i++) {
    let dan = document.createElement("div");
    dan.style.display = "flex";
    dan.style.flexDirection = "column";
    dan.style.margin = "17px";

    let x = document.createElement("INPUT");
    x.setAttribute("type", "checkbox");
    x.style.height = "25px";
    x.style.accentColor = "#b300b3";
    x.style.cursor = "pointer";

    dan.appendChild(x);

    const checked$ = fromEvent(x, "click");
    checked$
      .pipe(
        map((event) => {
          const checkbox = event.target as HTMLInputElement;
          return checkbox.checked ? 1 : 0;
        })
      )
      .subscribe((value) => {
        odgovara[i] = value;
        //console.log(odgovara);
      });

    const kojiDan = document.createElement("label");
    kojiDan.setAttribute("id", "d" + i);
    kojiDan.style.fontSize = "23px";
    kojiDan.style.fontFamily = "'Trebuchet MS', sans-serif";

    const prognoza = document.createElement("label");
    prognoza.setAttribute("id", "p" + i);
    dan.appendChild(kojiDan);
    dan.appendChild(prognoza);
    termini.appendChild(dan);

    day++;
    if (day == 7) day = 0;
  }

  const nizDana$ = from(nizDana).pipe(
    map((_, index) => nizDana[(day + index) % 7])
  );

  //nizDana$.subscribe((value) => console.log("nizDana$ emituje: ", value));

  //sevenDayForecast$.subscribe((data)=>console.log)

  // let i = 0;
  // document.addEventListener("DOMContentLoaded", () => {
  //   zip([nizDana$, sevenDayForecast$]).subscribe(([dan, weatherData]) => {
  //     const maxTemperatures = weatherData.map((day) => day.maxTemp);
  //     const el = document.querySelector(`#d${i}`);
  //     el.innerHTML = dan;
  //     const p = document.querySelector(`#p${i}`);
  //     p.innerHTML = maxTemperatures[i] + "";
  //     i++;
  //   });
  // });

  return termini;
}
