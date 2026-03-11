import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FashionAdminList } from './fashion-admin-list/fashion-admin-list';
import { FashionForm } from './fashion-form/fashion-form';
import { FashionDetail } from './fashion-detail/fashion-detail';

const routes: Routes = [
  { path: '', redirectTo: 'fashion-admin-list', pathMatch: 'full' },
  { path: 'fashion-admin-list', component: FashionAdminList },
  { path: 'fashion-form', component: FashionForm },
  { 
    path: 'fashion-form/:id', 
    component: FashionForm,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  { 
    path: 'fashion-detail/:id', 
    component: FashionDetail,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
