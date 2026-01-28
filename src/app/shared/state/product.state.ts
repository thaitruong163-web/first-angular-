import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../service/product.service';

const DUMMY_HTTP = 'https://dummyjson.com/products';
@Injectable({
    providedIn: 'root'
})
export class ProductState {

    private products$ = new BehaviorSubject<Product[]>([]);

    constructor(private productService: ProductService) {}

    getAll() {
        if (this.products$.value.length === 0) {
            const cache = localStorage.getItem('products');

            if (cache) {
            this.products$.next(JSON.parse(cache));
            } else {
            this.productService.getAll().subscribe(data => {
                this.setState(data);
            });
            }
        }

        return this.products$.asObservable();
    }
    getById(id: number){
        return this.productService.getById(id);
    }

    add(p: Product) {
        this.setState([p, ...this.products$.value]);
    }

    update(p: Product) {
        this.setState(
            this.products$.value.map(x => x.id === p.id ? p : x)
        );
    }

    delete(id: number) {
        this.setState(
            this.products$.value.filter(p => p.id !== id)
        );
    }

    private setState(data: Product[]) {
        this.products$.next(data);
        localStorage.setItem('products', JSON.stringify(data));
    }
}
