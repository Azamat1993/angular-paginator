import { Injectable } from "@angular/core";

@Injectable({
  provideIn: "root"
})
export class LoaderService {
  public isLoading = false;

  constructor() {}

  public setLoading = (loading: boolean) => {
    this.isLoading = loading;
  };
}
