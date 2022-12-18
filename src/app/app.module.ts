import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputValidatorsModule } from 'projects/goodbetterbist/input-validators/src/public-api';
// import { InputValidatorsModule } from '@goodbetterbist/input-validators';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    InputValidatorsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
