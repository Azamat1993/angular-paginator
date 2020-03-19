import { Component, OnInit, Input, TemplateRef } from "@angular/core";
import { LoaderService } from "../../core/loader.service";

@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.css"]
})
export class PaginatorComponent implements OnInit {
  @Input() public loaderTemplate: TemplateRef<any>;

  @Input() private currentPage = 0;
  @Input() private requestFn = (pageNumber: number) => Promise.resolve(null);

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
      .finally(() => {
        this.loaderService.setLoading(false);
      });
  }
}
