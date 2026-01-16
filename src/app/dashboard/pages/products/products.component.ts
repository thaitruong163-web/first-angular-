import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/service/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { OrderService } from '../../../shared/service/order.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFormComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  

  constructor(private productService: ProductService, private orderService: OrderService, private router: Router ) {}

  ngOnInit(): void{
    
    this.productService.getAll().subscribe(data => {
        console.log('DUMMY_HTTP',data)
        this.products = data;  

    });
  }

  showForm = false;
  selectedProduct?: Product;

  addProduct(p: Product) {
    this.products.unshift(p);
    this.showForm = false;
  }

  editProduct(p: Product) {
    this.selectedProduct = p;
    this.showForm = true;
  }

  updateProduct(p: Product) {
    const index = this.products.findIndex(x => x.id === p.id);
    this.products[index] = p;
    this.showForm = false;
    this.selectedProduct = undefined;
  }
  deleteProduct(id: number) {
  this.products = this.products.filter(p => p.id !== id);
  }

  createOrderFromProduct(p: Product) {
    this.orderService.create({
      id: Date.now(),
      totalPrice: p.price,
      status: 'pending',
      createdAt: new Date(),
      items: [{
        productId: p.id,
        title: p.title,
        price: p.price,
        quantity: 1
      }]
    });
    this.router.navigate(['dashboard/orders']);
    console.log('Order Create:', this.orderService.getAll());
  }


}
