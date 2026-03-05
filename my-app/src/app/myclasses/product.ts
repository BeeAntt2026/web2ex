export class Product {
  _id: string = '';
  sku: string = '';
  name: string = '';
  price: number = 0;
  image: string = '';
}

export class CartItem {
  productId: string = ''; 
  sku: string = '';
  name: string = '';
  price: number = 0;
  image: string = '';
  quantity: number = 1;
  checked: boolean = false; 
}