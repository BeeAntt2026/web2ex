import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ex13 } from './ex13/ex13';
import { ServiceProductImageEvent } from './ex13/service-product-image-event/service-product-image-event';
import { ServiceProductImageEventDetail } from './ex13/service-product-image-event-detail/service-product-image-event-detail';
import { Ex18 } from './ex18/ex18';
import { Ex19 } from './ex19/ex19';
import { Product } from './ex19/product/product';
import { ListProduct } from './ex19/list-product/list-product';
import { ServiceProduct } from './ex19/service-product/service-product';
import { FakeProduct } from './fake-product/fake-product';
import { FakeProduct2 } from './fake-product-2/fake-product-2';
import { Bitcoin } from './bitcoin/bitcoin';
import { Books } from './books/books';
import { Ex22 } from './ex22/ex22';
import { BookDetailComponent } from './book-detail.component/book-detail.component';
import { FileUploadComponent } from './file-upload.component/file-upload.component';
import { BookForm } from './book-form/book-form';
const routes: Routes = [
  { path: 'file-upload', component: FileUploadComponent },
  { path: 'add-book', component: FileUploadComponent },
  {path:'ex26',component:FakeProduct},
  { path: 'ex13', component: Ex13 },
  { path: 'service-product-image-event', component: ServiceProductImageEvent },
  { path: 'service-product-image-event/:id', component: ServiceProductImageEventDetail },
  { path: 'ex18', component: Ex18 },
  { path: 'exercise-18', redirectTo: 'ex18', pathMatch: 'full' },
  { path: 'ex19', component: Ex19 },
  { path: 'product', component: Product },
  { path: 'list-product', component: ListProduct },
  { path: 'service-product', component: ServiceProduct },
  { path: 'fake-product-2', component: FakeProduct2 },
  { path: 'bitcoin', component: Bitcoin },
  { path: 'ex28', component: Bitcoin },  
  { path: 'books/create', component: FileUploadComponent },
  { path: 'books/edit/:id', component: BookForm },
  { path: 'books/detail/:id', component: BookDetailComponent },
  { path: 'books', component: Books },
  { path: 'ex39', component: Books },
  { path: 'ex22', component: Ex22 },
  { path: 'ex41/:id', component: BookDetailComponent },
  { path: 'ex49', component: FileUploadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
