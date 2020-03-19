import { Component, OnInit, Input, TemplateRef } from "@angular/core";
import { LoaderService } from "../../core/loader.service";

const DEFAULT_REQUEST_FN = (pageNumber: number) => Promise.resolve(null);
const DEFAULT_CURRENT_PAGE = 0;

@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.css"]
})
export class PaginatorComponent implements OnInit {
  @Input() public loaderTemplate: TemplateRef<any>;
  @Input() public errorTemplate: TemplateRef<any>;
  @Input() public nextPageTemplate: TemplateRef<any>;
  @Input() public prevPageTemplate: TemplateRef<any>;

  @Input() public currentPage = DEFAULT_CURRENT_PAGE;

  @Input() private requestFn = DEFAULT_REQUEST_FN;

  public error: any = null;

  constructor(public loaderService: LoaderService) {}

  public nextPage() {
    this.sendRequest(this.currentPage + 1);
  }

  public prevPage() {
    if (this.currentPage > 0) {
      this.sendRequest(this.currentPage - 1);
    }
  }

  private sendRequest(nextPage: number) {
    this.loaderService.setLoading(true);
    this.requestFn(nextPage)
      .then(_ => {
        this.currentPage = nextPage;
      })
      .catch(err => {
        this.error = err;
      })
      .finally(() => {
        this.loaderService.setLoading(false);
      });
  }
}
