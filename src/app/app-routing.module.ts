import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
   {path: '', component: HomeComponent  , pathMatch: 'full'},
   {path: 'create', component: CreateUserComponent  , pathMatch: 'full'},
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
