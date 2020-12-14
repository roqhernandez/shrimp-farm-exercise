import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {FarmsListComponent} from './components/farms-list/farms-list.component';
import {FarmsFormComponent} from './components/farms-form/farms-form.component';

//import {FarmsListComponent} from './components/farms-list/farms-list.component';
import {PondsFormComponent} from './components/ponds-form/ponds-form.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/farms',
    pathMatch: 'full'
  },
  {
    path: 'farms',
    component: FarmsListComponent
  },
  {
    path: 'farms/new',
    component: FarmsFormComponent
  },
  {
    path: 'farms/edit/:id',
    component: FarmsFormComponent
  },
  {
    path: 'ponds/new/:farm_id',
    component: PondsFormComponent
  },
  { // A params approach via url could have been used but for this simple example
    //The ID data for both a farm and a pond is passed through the URL
    path: 'ponds/edit/:farm_id/:pond_id',
    component: PondsFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
