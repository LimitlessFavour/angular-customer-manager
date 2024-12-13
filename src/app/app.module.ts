import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { API_CONFIG, DEFAULT_API_CONFIG } from './config/api.config';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    DeleteConfirmationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    LoadingIndicatorComponent,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    { provide: API_CONFIG, useValue: DEFAULT_API_CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 