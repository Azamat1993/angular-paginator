import { Injectable, Subject, ReplaySubject } from "@angular/core";

@Injectable()
export class LoaderService {
  private _isLoading$: Subject<boolean> = new ReplaySubject(1);

  constructor() {}

  public isLoading = () => {
    return this._isLoading$.asObservable();
  };

  public setLoading = (loading: boolean) => {
    this._isLoading$.next(loading);
  };
}
