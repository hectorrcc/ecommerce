interface Product {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price: number;
  quantity: number;
  rating: number;
  category: string;
}

interface ProductCreate extends Omit<Product, "id" | "rating"> {}
