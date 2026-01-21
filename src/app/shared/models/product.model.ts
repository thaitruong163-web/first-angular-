export class Product {

  readonly id: number;
  readonly title: string;
  readonly price: number;
  readonly thumbnail: string;

  constructor(data: Product) {
    this.id = data.id ?? 0;
    this.title = data.title ?? 'Unnamed product';
    this.price = data.price ?? 0;
    this.thumbnail = data.thumbnail ?? '';
  }
}
