import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    NgxSpinnerModule,
    CommonModule,
    ReactiveFormsModule,
    
  ],

})
export class CartsModule { }
