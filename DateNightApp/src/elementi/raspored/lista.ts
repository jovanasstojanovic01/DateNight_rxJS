import { Observable, map, reduce, zip } from "rxjs";
import { fetchUsers } from "../../funkcije/citanjePodatakaKorisnika/fetchUsers";
import { User } from "../../interfejsi/user";
import { brisi } from "../../funkcije/brisanjeKorisnika/brisi";

const baseUrl = "http://localhost:3000";

export const users$ = fetchUsers(baseUrl);

export const names$: Observable<string[]> = users$.pipe(
  map((user: User) => user.ime),
  reduce((acc: string[], name: string) => [...acc, name], [])
);
const dani$: Observable<number[][]> = users$.pipe(
  map((user) => Object.values(user.dani)),
  reduce((acc: number[][], dani) => [...acc, dani], [])
);

export function lista() {
  const listaImena = document.createElement("div");
  listaImena.style.width = "100%";
  listaImena.style.marginTop = "10px";
  listaImena.style.display = "flex";
  listaImena.style.flexDirection = "row-reverse";
  listaImena.style.flexWrap = "wrap";

  //ovaj deo ide u dinamicki kontejner
  zip(names$, dani$).subscribe(([allNames, dani]) => {
    let br = -1;
    allNames.forEach((ime, index) => {
      if (index < 10) {
        br = index;

        const jedno = document.createElement("label");
        jedno.style.fontSize = "30px";
        jedno.style.margin = "20px";
        jedno.style.fontFamily = "'Brush Script MT', cursive";
        jedno.style.color = "#343434";
        jedno.innerHTML = "• " + ime;
        dani[index].forEach((element, index) => {
          if (element > 0) {
            const el = document.querySelector(`#dan${index}`) as HTMLElement;
            const color = el.style.backgroundColor;
            //dynamicLabel.setAttribute("id", `dynamic-label:${name}`);
            jedno.addEventListener("mouseover", () => {
              el.style.backgroundColor = "hsl(225, 100%, 80%)";
            });
            jedno.addEventListener("mouseout", () => {
              el.style.backgroundColor = color;
            });
          }
        });

        listaImena.appendChild(jedno);
      }
    });

    if (br >= 0) {
      brisi(listaImena);
    }
  });

  const linija = document.createElement("div");
  linija.style.width = "100%";
  linija.style.height = "1px";
  linija.style.backgroundColor = "#e6e6e6";
  linija.style.marginTop = "50px";

  document.body.appendChild(linija);
  document.body.appendChild(listaImena);
}
