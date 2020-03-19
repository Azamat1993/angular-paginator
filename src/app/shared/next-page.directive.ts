import { Directive, HostListener } from "@angular/core";
import { PaginatorDirective } from "./paginator.directive";

@Directive({
  selector: "[appNextPage]"
})
export class NextPageDirective {
  constructor(private paginator: PaginatorDirective) {}

  @HostListener("click")
  public onClick() {
    this.paginator.nextPage();
  }
}
