import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: 'src/app/modules/dashboard/dashboard.module#DashboardModule'   
  },
  {
    path: 'form',
    loadChildren: 'src/app/modules/profile/profile.module#ProfileModule'
  },
  {
    path: 'submenu',
    loadChildren: 'src/app/modules/news/news.module#NewsModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
