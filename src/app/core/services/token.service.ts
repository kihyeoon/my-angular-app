import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class tokenService {
  getToken(): string {
    return window.localStorage["token"];
  }

  saveToken(token: string): void {
    window.localStorage["token"] = token;
  }

  destroyToken(): void {
    window.localStorage.removeItem("token");
  }
}
