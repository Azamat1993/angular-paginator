import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";

  sendRequest = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          items: [],
          totalPages: 12
        });
      }, 1000);
    });
  };
}
