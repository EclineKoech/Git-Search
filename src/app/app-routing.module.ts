import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchFormComponent } from './search-form/search-form.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search-form', component: SearchFormComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
