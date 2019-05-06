import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { HttpClientModule } from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { AppService } from "./app.service";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
