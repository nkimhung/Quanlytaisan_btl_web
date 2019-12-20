import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { ProductInCart, ProductInfo, ProductOrder } from '@/_models';

@Injectable({ providedIn: 'root' })

export class ProductService {
  constructor(private http: HttpClient) { }

  public registerProduct(product): Observable<any> {
    return this.http.post(`http://localhost:4000/product/registerProduct`, product);
  }
    public update(product): Observable<any> {
        return this.http.post(`http://localhost:4000/users/upload`, product);
    }
  public registerProductOrder(productOrder): Observable<any> {
    return this.http.post(`http://localhost:4000/product/registerProductOrder`, productOrder)
  }
  public getProductById(id: number) {
        console.log(id)
        return this.http.get<ProductInfo>(`http://localhost:4000/product/${id}`);
  }
    public getAllOrderByEmployee(id: number) {
        console.log(id)
        return this.http.get(`http://localhost:4000/product/allorderemployee/${id}`);
    }
    public getMessageEmployee(id: number) {
        console.log(id)
        return this.http.get(`http://localhost:4000/product/message/${id}`);
    }
    public deleteInCart(id: number) {
        console.log(id)
        return this.http.get(`http://localhost:4000/product/deletecart/${id}`);
    }
    public deleteInCartSend2(id: number) {
        console.log(id)
        return this.http.get(`http://localhost:4000/product/deletecartsend/${id}`);
    }
  public updateProduct(data): Observable<any> {
      return this.http.post(`http://localhost:4000/product/update-product`, data);
  }

  public registerProductInCart(productInCart): Observable<any> {
    return this.http.post(`http://localhost:4000/product/borrowProduct`, productInCart)
  }

  public updateStatus(data): Observable<any> {
    return this.http.post(`http://localhost:4000/product/update-status`, data);
  }
    public revoke(data): Observable<any> {
        return this.http.post(`http://localhost:4000/product/revokeproduct`, data);
    }

  public getAllProduct() {
    return this.http.get<ProductInfo[]>(`http://localhost:4000/product/list-product`);
  }

  public getAllOrderDetail() {
    return this.http.get(`http://localhost:4000/product/order-detail`);
  }
    public getAllOrderAccept() {
        return this.http.get(`http://localhost:4000/product/order-accept`);
    }

  public getAllProductOrder() {
    return this.http.get<ProductOrder[]>(`http://localhost:4000/product/product-order`);
  }

  public getAllInfoProductFromOrder(id: number) {
    console.log(id);
    return this.http.get(`http://localhost:4000/product/info-product-order/${id}`);
  }

  addProductToCart(products: any) {
    localStorage.setItem("product", JSON.stringify(products));
  }
  getProductFromCart() {
    //return localStorage.getItem("product");
    return JSON.parse(localStorage.getItem('product'));
  }
  removeAllProductFromCart() {
    return localStorage.removeItem("product");
  }
}
