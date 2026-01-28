import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'

import { Product } from '../../../shared/models/product.model';
import { ProductState } from '../../../shared/state/product.state';
import { ProductFormComponent } from '../product-form/product-form.component';
import { OrderService } from '../../../shared/service/order.service';
import { CartService } from '../../../shared/service/cart.service';
import { CartState } from '../../../shared/state/cart.state';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFormComponent, RouterModule],
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

  isAdmin = false;

  constructor(
    private productState: ProductState,
    private orderService: OrderService,
    private cartService: CartService,
    private cartState: CartState, 
    private toastr: ToastrService,
    private router: Router
    
  ) { }

  ngOnInit(): void {
    const rawUser = localStorage.getItem('current_user');
    if (rawUser) {
      const user = JSON.parse(rawUser);
      this.isAdmin = user.role === 'admin';
    }
    this.productState.getAll().subscribe(data => {
      this.products = data;              // dữ liệu gốc
      this.applyFilter();               //dữ liệu hiển thị
    });
  }
  
  //Product CRUD
  addProduct(p: Product) {
    if (!this.isAdmin) {
      this.toastr.error('Bạn không có quyền thêm sản phẩm');
      return;
    }
    this.productState.add(p);
    this.showForm = false;  
  }

  editProduct(p: Product) {
    if (!this.isAdmin) {
      this.toastr.error('Bạn không có quyền sửa sản phẩm');
      return;
    }

    this.selectedProduct = p;
    this.showForm = true;
  }


  updateProduct(p: Product) {
    if (!this.isAdmin) {
      this.toastr.error('Bạn không có quyền cập nhật sản phẩm');
      return;
    }

    this.productState.update(p);
    this.showForm = false;
    this.selectedProduct = undefined;
  }
                                    
  deleteProduct(id: number) {
    if (!this.isAdmin) {
      this.toastr.error('Bạn không có quyền xoá sản phẩm');
      return;
    }

    this.productState.delete(id);
  }

  //Cart
  addToCart(p: Product) {
    const user = JSON.parse(localStorage.getItem('current_user') || 'null');

    if (!user) {
      this.toastr.error('Bạn chưa đăng nhập');
      return;
    }

    this.cartService.addToCart(user.id, p.id, 1).subscribe({
      next: cart => {
        this.cartState.setCart(cart);
        this.toastr.success('Đã thêm vào giỏ hàng');
        
      },
      error: err => {
        this.toastr.error('Không thêm được vào giỏ');
        console.error(err);
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
