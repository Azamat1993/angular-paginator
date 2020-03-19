import { Directive, HostListener } from "@angular/core";
import { PaginatorComponent } from "./paginator.component";

@Directive({
  selector: "[appNextPage]"
})
export class NextPageDirective {
  constructor(private paginator: PaginatorComponent) {}

  @HostListener("click")
  public onClick() {
    this.paginator.nextPage();
  }
}
