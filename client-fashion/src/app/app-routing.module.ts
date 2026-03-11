import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FashionList } from './fashion-list/fashion-list';
import { FashionDetail } from './fashion-detail/fashion-detail';

const routes: Routes = [
  { path: '', redirectTo: 'fashion-list', pathMatch: 'full' },
  { path: 'fashion-list', component: FashionList },
  { path: 'fashion-detail/:id', component: FashionDetail }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }