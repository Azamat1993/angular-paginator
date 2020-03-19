import { Directive, Input } from "@angular/core";
import { LoaderService } from "../core/loader.service";

@Directive({
  selector: "[appPaginator]"
})
export class PaginatorDirective {
  @Input() private currentPage = 0;
  @Input() private requestFn = (pageNumber: number) => Promise.resolve(null);

  constructor(private loaderService: LoaderService) {}

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
      .finally(() => {
        this.loaderService.setLoading(false);
      });
  }
}
