import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { FashionDetail } from './fashion-detail/fashion-detail';
import { FashionList } from './fashion-list/fashion-list';
import { FashionFilterPipe } from './fashion-filter-pipe';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    App,
    FashionDetail,
    FashionList,
    FashionFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }