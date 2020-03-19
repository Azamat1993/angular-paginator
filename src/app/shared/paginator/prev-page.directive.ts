import { Directive, HostListener } from "@angular/core";
import { PaginatorComponent } from "./paginator.component";

@Directive({
  selector: "[appPrevPage]"
})
export class PrevPageDirective {
  constructor(private paginator: PaginatorComponent) {}

  @HostListener("click")
  public onClick() {
    this.paginator.prevPage();
  }
}
