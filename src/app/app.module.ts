import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TimeFormComponent } from './components/time-form/time-form.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    TimePickerComponent,
    DashboardComponent,
    TimeFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
