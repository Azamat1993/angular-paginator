import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { PaginatorDirective } from "./shared/paginator.directive";
import { NextPageDirective } from "./shared/next-page.directive";

@NgModule({
  declarations: [AppComponent, PaginatorDirective, NextPageDirective],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
