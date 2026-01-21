import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const DUMMY_HTTP ='https://dummyjson.com/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(DUMMY_HTTP);
}
}


