import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  carts :any [] = [];
  cartInView:any [] = [];
  cartInViewItemDetails:any [] = [];

  filterForm:FormGroup = new FormGroup({
    startDate: new FormControl(null),
    endDate : new FormControl(null)
  });

  constructor(private _CartService:CartService , private spinner:NgxSpinnerService) {}

  ngOnInit(): void {
    this.getAllCarts();   
  }
  getAllCarts(){
    this.spinner.show();
    this._CartService.getAllCarts().subscribe(res =>{
      this.carts = res;
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);  
    })
  }

  applyFilter(){
    this.spinner.show();
    let date = this.filterForm.value;
    console.log(date);
    this._CartService.getAllCarts(date).subscribe(res =>{
      this.carts = res;
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    })
  }

  deleteCart(id:number){
    this._CartService.deleteCart(id).subscribe(res =>{
      alert("Item Deleted Successfuly");
      this.getAllCarts();
    })
  }
  view(data:any){
    this.spinner.show();
    this.cartInView = data;
    this.cartInViewItemDetails = [];
    for (let i = 0;i<this.cartInView.length;i++){
      this._CartService.getSingleProduct(this.cartInView[i].productId).subscribe(res =>{
        this.cartInViewItemDetails.push({item : res , qty : this.cartInView[i].quantity });
      })
    }
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
}

