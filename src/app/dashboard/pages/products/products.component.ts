import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'

import { Product } from '../../../shared/models/product.model';
import { ProductState } from '../../../shared/state/product.state';
import { ProductFormComponent } from '../product-form/product-form.component';
import { OrderService } from '../../../shared/service/order.service';
import { CartService } from '../../../shared/service/cart.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFormComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  //State
  products: Product[] = [];
  filteredProducts: Product[] = [];
  //UI
  keyword = '';
  showForm = false;
  selectedProduct?: Product;

  constructor(
    private productState: ProductState,
    private orderService: OrderService,
    private cartService: CartService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productState.getAll().subscribe(data => {
      this.products = data;              // dữ liệu gốc
      this.applyFilter();               //dữ liệu hiển thị
    });
  }
  //Product CRUD
  addProduct(p: Product) {
    this.productState.add(p);
    this.showForm = false;
  }

  editProduct(p: Product) {
    this.selectedProduct = p;
    this.showForm = true;
  }

  updateProduct(p: Product) {
    this.productState.update(p);
    this.showForm = false;
    this.selectedProduct = undefined;
  }
  deleteProduct(id: number) {
    this.productState.delete(id);
  }
  //Cart
  addToCart(p: Product) {
    this.cartService.addToCart(1, p.id, 1).subscribe({
      next: cart =>{
        //API thành công
        this.toastr.success('Thêm thành công');
        console.log('Cart response', cart);
      },
      error: err =>{
        this.toastr.error('Thêm thất bại');
        console.log(err);
      }
    });
  }
  //Filter
  applyFilter() {
    const keyword = this.keyword.toLowerCase().trim();
    this.filteredProducts = !keyword
      ? [...this.products]
      : this.products.filter(p =>
        p.title.toLowerCase().includes(keyword)
      );
  }

}
