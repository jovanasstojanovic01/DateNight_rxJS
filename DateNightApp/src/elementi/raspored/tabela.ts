import {
  Observable,
  Subject,
  combineLatest,
  interval,
  map,
  merge,
  startWith,
  switchMap,
  take,
  tap,
  zip,
} from "rxjs";
import { day } from "../popunjavanjeTermina/unosTermina";
import { users$ } from "./lista";
import { Dani } from "../../interfejsi/dani";

let niz = [0, 0, 0, 0, 0, 0, 0];

const dani$: Observable<Dani> = users$.pipe(
  take(10),
  map((user) => user.dani),
  startWith([0, 0, 0, 0, 0, 0, 0]) // Dodajte početnu vrednost ovde
);

const niz$: Subject<number[]> = new Subject<number[]>();

merge(dani$)
  .pipe(
    tap((dan) => {
      niz$.next([...niz]);
      // console.log(dan);
      // console.log(niz);
    })
  )
  .subscribe();

import { ajax } from "rxjs/ajax";

interface WeatherDay {
  datetime: string;
  tempmax: number;
  tempmin: number;
  icon: string;
}

interface WeatherResponse {
  days: WeatherDay[];
}
//////////
const apiUrl =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Ni%C5%A1%2C%20Serbia?unitGroup=metric&key=JV2CAGVLA6Y38ZCT8CD4YNKWN&contentType=json";

const weatherData$ = interval(3600000).pipe(
  switchMap(() => ajax.getJSON<WeatherResponse>(apiUrl))
);
const sevenDayForecast$ = weatherData$.pipe(
  map((data) =>
    data.days.slice(1).map((day: WeatherDay) => ({
      date: day.datetime,
      maxTemp: day.tempmax,
      minTemp: day.tempmin,
      icon: day.icon,
    }))
  )
);

export function tabela(container: HTMLDivElement) {
  const slova = ["M", "T", "W", "T", "F", "S", "S"];

  for (let i = 0; i < 7; i++) {
    let dan = document.createElement("div");
    dan.style.border = "3px solid white";
    dan.style.height = "80px";
    dan.style.width = "14%";
    dan.classList.add("dan-div");
    dan.setAttribute("id", "dan" + i);

    const labela = document.createElement("label");
    labela.innerHTML = slova[(day + i) % 7];
    labela.style.margin = "5px";
    labela.style.fontFamily = "'Trebuchet MS', sans-serif";
    labela.style.fontSize = "25px";

    dan.appendChild(labela);
    container.appendChild(dan);
  }
  let maxTemperatures: number[];
  sevenDayForecast$.subscribe((weatherData) => {
    maxTemperatures = weatherData.map((day) => day.maxTemp);
    console.log("ovde");
  });

  combineLatest([niz$, dani$])
    .pipe(
      tap(([niz, dani]) => {
        niz.forEach((value, index) => {
          niz[index] += dani[index];
        });

        const divs = document.querySelectorAll(".dan-div");

        divs.forEach((div: HTMLDivElement, index) => {
          if (niz[index] > 0) {
            let val1 = 100 - 10 * niz[index];
            div.style.backgroundColor = "hsl(300, 100%, " + val1 + "%)";
          } else {
            div.style.backgroundColor = "#e6e6e6";
          }
          const prognoza = document.createElement("label");
          prognoza.innerHTML = maxTemperatures[index] + "";
          div.appendChild(prognoza);
        });
      })
    )
    .subscribe();
}
