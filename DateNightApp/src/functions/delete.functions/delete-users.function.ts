import { Subject, filter, fromEvent, takeUntil } from "rxjs";
import { environmentVariableBaseURL } from "../../environment-variables/environment-variables";
import { GetUsersFunction } from "../get.functions/get-users.function";

export function DeleteUsersFunctions() {
  const trashButtonElement = document.querySelector("#trash-button");
  fromEvent(trashButtonElement, "click").subscribe((dummy) => {
    DeleteUsersIfTheyExistFunction()
      .then(() => {})
      .catch(() => {});
  });
}

function DeleteUsersIfTheyExistFunction(): Promise<any> {
  const unsubscribeSubject$ = new Subject<void>();

  return new Promise((resolve, reject) => {
    GetUsersFunction()
      .pipe(
        filter((user) => user !== undefined && user !== null),

        takeUntil(unsubscribeSubject$)
      )
      .subscribe((user) => {
        DeleteUsersFromServerFunction(user.id)
          .then(() => {})
          .catch(() => {});
      });
  });
}

function DeleteUsersFromServerFunction(userId: number): Promise<any> {
  const url = `${environmentVariableBaseURL}/users/${userId}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          reject("greska");
        }
        resolve(response);
      })
      .catch((error) => reject(error));
  });
}
