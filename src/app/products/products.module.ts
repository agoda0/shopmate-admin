import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from 'ngx-spinner';
import { SelectComponent } from '../shared/components/select/select.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AllProductsComponent,
    ProductDetailsComponent,
    SelectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
    
  ]
})
export class ProductsModule { }
