import { Component, OnInit, Input, TemplateRef } from "@angular/core";
import { LoaderService } from "../../core/loader.service";

interface IPaginatorResponse {
  items: Array<any>;
  totalPages: number;
}

const DEFAULT_REQUEST_FN = (pageNumber: number): Promise<IPaginatorResponse> =>
  Promise.resolve({
    items: [],
    totalPages: 0
  });

const DEFAULT_CURRENT_PAGE = 0;

@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.css"]
})
export class PaginatorComponent {
  @Input() public loaderTemplate: TemplateRef<any>;
  @Input() public errorTemplate: TemplateRef<any>;
  @Input() public nextPageTemplate: TemplateRef<any>;
  @Input() public prevPageTemplate: TemplateRef<any>;

  @Input() public currentPage = DEFAULT_CURRENT_PAGE;

  @Input() private requestFn = DEFAULT_REQUEST_FN;

  public error: any = null;

  constructor(public loaderService: LoaderService) {}

  public nextPage() {
    this.sendRequest(++this.currentPage);
  }

  public prevPage() {
    if (this.currentPage > 0) {
      this.sendRequest(--this.currentPage);
    }
  }

  private sendRequest(nextPage: number) {
    this.loaderService.setLoading(true);
    this.requestFn(nextPage)
      .then(this.checkResponse)
      .then(this.handleResponse)
      .catch(this.handleError)
      .finally(this.handleFinally);
  }

  private handleError = err => {
    this.error = err;
  };

  private handleFinally = () => {
    this.loaderService.setLoading(false);
  };

  private handleResponse = (response: IPaginatorResponse) => {
    console.log("handling response");
  };

  private checkResponse = (response: IPaginatorResponse) => {
    if (!response || !response.totalPages) {
      throw "Incorrect response";
    }
    return response;
  };
}
