import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { PaginatorComponent } from "./shared/paginator/paginator.component";

import { NextPageDirective } from "./shared/paginator/next-page.directive";

import { LoaderService } from "./core/loader.service";
import { PrevPageDirective } from "./shared/paginator/prev-page.directive";

@NgModule({
  declarations: [
    AppComponent,
    NextPageDirective,
    PaginatorComponent,
    PrevPageDirective
  ],
  imports: [BrowserModule],
  providers: [LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
