import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/service/product.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  

  constructor(private productService: ProductService) {}

  ngOnInit(): void{
    
    this.productService.getAll().subscribe(data => {
        console.log('DUMMY_HTTP',data)
        this.products = data;  

    });
  }
}
