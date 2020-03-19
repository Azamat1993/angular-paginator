import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { PaginatorComponent } from "./shared/paginator/paginator.component";

import { NextPageDirective } from "./shared/paginator/next-page.directive";

import { LoaderService } from "./core/loader.service";

@NgModule({
  declarations: [AppComponent, NextPageDirective, PaginatorComponent],
  imports: [BrowserModule],
  providers: [LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
