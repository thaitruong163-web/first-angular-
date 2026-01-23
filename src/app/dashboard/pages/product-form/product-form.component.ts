import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  @Input() product?: Product;        // dùng cho edit
  @Output() submitForm = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.product?.title || '', Validators.required],
      price: [this.product?.price || 0, Validators.required],
      thumbnail: [this.product?.thumbnail || '', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.submitForm.emit({
      id: this.product?.id || Date.now(),
      ...this.form.value
    });
  }
}
