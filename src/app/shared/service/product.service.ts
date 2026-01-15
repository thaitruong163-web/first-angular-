import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const DUMMY_HTTP ='https://dummyjson.com/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<any>(DUMMY_HTTP).pipe(
      map(res => res.products)
    );
  }
}


