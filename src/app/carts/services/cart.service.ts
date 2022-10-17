import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  getAllCarts(param?:any):Observable<any>
  {
    let params = new HttpParams()
    params = params.append("startdate", param?.startDate ).append("enddate",param?.endDate)
    return this.http.get(environment.baseApi + `carts?` + {params});
  }
  deleteCart(id:number):Observable<any>
  {
    return this.http.get(environment.baseApi + `carts/${id}`); 
  }
  
  getSingleProduct(id:number):Observable<any>
  {
    return this.http.get(environment.baseApi + `products/${id}`);
  }
}
