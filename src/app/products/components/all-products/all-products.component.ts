import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products:any [] = [];
  categories:any [] = [];
  cartProducts:any [] = [];
  BaseUrl:any = '';
  addOrUpdate:boolean = false;
  productId:number = 0;
  addForm:FormGroup = new FormGroup({
    title:new FormControl(null,[Validators.required]),
    price:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9.]*[0-9]$/)]),
    description:new FormControl(null,[Validators.required]),
    image:new FormControl(null,[Validators.required]),
    category:new FormControl(null,[Validators.required])
    
  });
  constructor(private _ProductsService:ProductsService , private spinner:NgxSpinnerService) { 
    
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getCategories();
    
  }

  getAllProducts(){
    this.spinner.show();
    this._ProductsService.getAllProducts().subscribe((results) =>{
      this.products = results;
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);      
    }, (error) =>{
      alert(error.message);
    })
  }
  
  getCategories(){
    this.spinner.show();
    this._ProductsService.getAllCategories().subscribe((results) =>{
      this.categories = results;
      setTimeout(() => {
        this.spinner.hide();
      }, 1000); 
    }, (error) =>{
      alert(error.message);
    })
  }

  getSelectedCategory(event:any){
    this.addForm.get("category")?.setValue(event.target.value);
  }

  getImagePath(event:any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>{
      this.BaseUrl = reader.result;
      this.addForm.get("image")?.setValue("ahmed");
    }
  }

  supmitProduct(){
    let model = this.addForm.value;
    if(this.addOrUpdate){
      this._ProductsService.addProduct(model).subscribe(res =>{
        alert("Product Added Successfuly");
      })
    } else {
      this._ProductsService.updateProduct(this.productId,model).subscribe(res =>{
        alert("Product Updated Successfuly");
      })
    }
  }
  updateProduct(product:any){
    this.addOrUpdate=false;
    this.productId=product.id;
    this.addForm.get("title")?.setValue(product.title); 
    this.addForm.get("price")?.setValue(product.price); 
    this.addForm.get("description")?.setValue(product.description); 
    this.addForm.get("image")?.setValue(product.image);
    this.addForm.get("category")?.setValue(product.category); 
    this.BaseUrl = product.image;
  }
}
