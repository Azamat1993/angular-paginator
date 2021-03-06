import { Component, OnInit, Input, TemplateRef } from "@angular/core";
import { Observable } from "rxjs";

import { LoaderService } from "../../core/loader.service";
import { request } from "http";

interface IPaginatorResponse {
  items: Array<any>;
  totalPages: number;
}

const DEFAULT_REQUEST_FN = (pageNumber: number): Promise<IPaginatorResponse> | Observable<IPaginatorResponse> =>
  Promise.resolve({
    items: [],
    totalPages: 0
  });

const DEFAULT_CURRENT_PAGE = 0;

@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.css"],
  providers: [
    LoaderService
  ]
})
export class PaginatorComponent implements OnInit {
  @Input() public loaderTemplate: TemplateRef<any>;
  @Input() public errorTemplate: TemplateRef<any>;
  @Input() public nextPageTemplate: TemplateRef<any>;
  @Input() public prevPageTemplate: TemplateRef<any>;
  @Input() public emptyTemplate: TemplateRef<any>;

  @Input() public currentPage = DEFAULT_CURRENT_PAGE;

  @Input() private requestFn = DEFAULT_REQUEST_FN;

  public error: any = null;
  public totalPages: number = 10;

  constructor(public loaderService: LoaderService) {}

  public ngOnInit() {
    this.sendRequest(DEFAULT_CURRENT_PAGE);
  }

  public nextPage() {
    if (this.currentPage < this.totalPages) {
      this.sendRequest(++this.currentPage);
    }
  }

  public prevPage() {
    if (this.currentPage > 0) {
      this.sendRequest(--this.currentPage);
    }
  }

  protected sendRequest(nextPage: number) {
    this.initRequest();
    this.makeRequest(nextPage)
      .then(this.checkResponse)
      .then(this.handleResponse)
      .catch(this.handleError)
      .finally(this.handleFinally);
  }

  protected makeRequest(nextPage: number): Promise<IPaginatorResponse> {
    let requestObj = this.requestFn(nextPage);

    switch (requestObj.constructor) {
      case Observable:
        requestObj = (requestObj as Observable<IPaginatorResponse>).toPromise();
      case Promise:
        break;
      default:
        throw new Error(`requestFn must return either Observable or Promise, returned: ${requestObj.constructor.name}`);
    }

    return requestObj as Promise<IPaginatorResponse>;
  }

  protected initRequest = () => {
    this.loaderService.setLoading(true);
  }

  protected handleError = err => {
    this.error = err;
  };

  protected handleFinally = () => {
    this.loaderService.setLoading(false);
  };

  protected handleResponse = (response: IPaginatorResponse) => {
    this.totalPages = response.totalPages;
  };

  protected checkResponse = (response: IPaginatorResponse) => {
    if (!response || response.totalPages === undefined) {
      throw "Incorrect response " + response;
    }
    return response;
  };
}
