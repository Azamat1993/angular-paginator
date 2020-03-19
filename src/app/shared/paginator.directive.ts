import { Directive, Input } from "@angular/core";

@Directive({
  selector: "[appPaginator]"
})
export class PaginatorDirective {
  @Input() private currentPage = 0;

  constructor() {}

  public nextPage() {
    this.currentPage++;
  }

  public prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}
