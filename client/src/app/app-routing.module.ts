import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LearnComponent } from './components/learn/learn.component';


const appRoutes: Routes = [
  // Default home page
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'learn',
    component: LearnComponent
  },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  declarations: [],
  // Imports all of our routes
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
