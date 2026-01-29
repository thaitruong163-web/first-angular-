import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../shared/models/product.model';
import { ProductState } from '../../../shared/state/product.state';
import { CartState } from '../../../shared/state/cart.state';
import { CartService } from '../../../shared/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    standalone: true,
    selector: 'app-product-detail',
    imports: [CommonModule, FormsModule],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
    product?: Product;
    quantity = 1;
    loading = true;
    error = '';

    constructor(
        private route: ActivatedRoute,
        private productState: ProductState,
        private cartState: CartState,
        private cartService: CartService,
        private toastr: ToastrService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        
        if (!id) {
            this.error = 'ID sản phẩm không hợp lệ';
            this.loading = false;
            return;
        }
        
        this.productState.getById(id).subscribe({
            next: (product) => {
                this.product = new Product(product);
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.error = 'Không thể tải sản phẩm';
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }

    addToCart() {
        const user = JSON.parse(localStorage.getItem('current_user') || 'null');

        if (!user) {
            this.toastr.error('Bạn chưa đăng nhập');
            return;
        }

        if (!this.product) {
            this.toastr.error('Sản phẩm không tồn tại');
            return;
        }

        this.cartService.addToCart(user.id, this.product.id, 1).subscribe({
            next: cart => {
                this.cartState.setCart(cart);   
                this.toastr.success('Đã thêm vào giỏ hàng');
            },
        });
    }


    increaseQuantity() {
        this.quantity++;
    }

    decreaseQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }
}
