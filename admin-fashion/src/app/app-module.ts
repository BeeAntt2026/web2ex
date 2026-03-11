import { NgModule, provideBrowserGlobalErrorListeners, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FashionAdminList } from './fashion-admin-list/fashion-admin-list';
import { FashionForm } from './fashion-form/fashion-form';
import { FashionDetail } from './fashion-detail/fashion-detail';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: 
  [App, 
  FashionAdminList,
  FashionForm,
  FashionDetail],
  imports: 
  [BrowserModule,
  CommonModule, 
  RouterModule,
  AppRoutingModule,
  FormsModule,
  HttpClientModule,
  // QuillModule.forRoot()
],
  providers: [provideBrowserGlobalErrorListeners(), DatePipe],
  bootstrap: [App],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
