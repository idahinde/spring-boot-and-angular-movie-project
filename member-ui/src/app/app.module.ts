import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from "../app-src/home";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
  imports: [
    // toast module for displaying message
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }), BrowserAnimationsModule,
    BrowserModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [
    AppComponent]
})
export class AppModule {
}
