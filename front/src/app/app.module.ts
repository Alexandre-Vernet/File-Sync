import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthenticationInterceptor } from './authentication/authentication.interceptor';
import { IonicModule } from '@ionic/angular';
import { HttpInterceptor } from './http.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        IonicModule.forRoot(),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true
        },
        {
            provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true
        },
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
