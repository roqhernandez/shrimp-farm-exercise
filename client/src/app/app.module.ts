import { FarmsService } from './services/farms.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FarmsFormComponent } from './components/farms-form/farms-form.component';
import { FarmsListComponent } from './components/farms-list/farms-list.component';
import { PondsFormComponent } from './components/ponds-form/ponds-form.component';
import { PondsListComponent } from './components/ponds-list/ponds-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FarmsFormComponent,
    FarmsListComponent,
    PondsFormComponent,
    PondsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    FarmsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
