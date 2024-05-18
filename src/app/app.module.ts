import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {AuthModule, getAuth, provideAuth} from '@angular/fire/auth';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app.routes';
import {SidebarComponent} from "./shared/components/sidebar/sidebar.component";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        AuthModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
        SidebarComponent,
        ToastrModule.forRoot(),
    ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
