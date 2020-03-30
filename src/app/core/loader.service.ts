import { Injectable } from "@angular/core";

@Injectable()
export class LoaderService {
  public isLoading = false;

  constructor() {}

  public setLoading = (loading: boolean) => {
    this.isLoading = loading;
  };
}
