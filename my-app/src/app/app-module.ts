import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Ex13 } from './ex13/ex13';
import { MenuBar } from './menu-bar/menu-bar';
import { ServiceProductImageEvent } from './ex13/service-product-image-event/service-product-image-event';
import { ServiceProductImageEventDetail } from './ex13/service-product-image-event-detail/service-product-image-event-detail';
import { Ex18 } from './ex18/ex18';
import { Ex19 } from './ex19/ex19';
import { ListProduct } from './ex19/list-product/list-product';
import { Product } from './ex19/product/product';
import { ServiceProduct } from './ex19/service-product/service-product';
import { FakeProduct } from './fake-product/fake-product';
import { FakeProduct2 } from './fake-product-2/fake-product-2';
import { Bitcoin } from './bitcoin/bitcoin';
import { Books } from './books/books';
@NgModule({
  declarations: [
    App,
    Ex13,
    MenuBar,
    ServiceProductImageEvent,
    ServiceProductImageEventDetail,
    Ex18,
    Ex19,
    ListProduct,
    Product,
    ServiceProduct,
    FakeProduct,
    FakeProduct2,
    Bitcoin,
    Books
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
