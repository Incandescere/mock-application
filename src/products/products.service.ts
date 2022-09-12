import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/entities/product.model';

@Injectable()
export class ProductsService {
  currId: number = 1;
  private products: Product[] = [];

  constructor() {
    this.createProduct('title', 'desc', 1);
    this.createProduct('title', 'desc', 1);
    this.createProduct('title', 'desc', 1);
  }

  async createProduct(
    title: string,
    desc: string,
    price: number,
  ): Promise<Product> {
    const newPdt = new Product(this.currId, title, desc, price);
    this.currId += 1;
    this.products.push(newPdt);
    return newPdt;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.products;
  }

  async getProductWithId(id: number): Promise<Product> {
    const product = this.getSingleProduct(id);
    if (!product || product.title == 'Deleted') {
      throw new NotFoundException('Product with id ' + id + ' not found');
    }
    return product;
  }

  async deleteProductWithId(id: number): Promise<Product> {
    const toBeDeleted = this.getSingleProduct(id);
    if (!toBeDeleted || toBeDeleted.title == 'Deleted') {
      throw new NotFoundException('Product with id ' + id + ' not found');
    }
    const idx = this.products.indexOf(toBeDeleted);
    this.products[idx] = { id:toBeDeleted.id, title: 'Deleted' } as Product;
    return toBeDeleted;
  }

  async updateProductWithId(
    id: number,
    title: string,
    desc: string,
    price: number,
  ): Promise<Product> {
    const toBeUpdated = this.getSingleProduct(id);
    if (!toBeUpdated || toBeUpdated.title == 'Deleted') {
      throw new NotFoundException('Product with id ' + id + ' not found');
    }
    const idx = this.products.indexOf(toBeUpdated);
    const updated = {
      ...toBeUpdated,
      title: title,
      description: desc,
      price: price,
    };
    this.products[idx] = updated;
    return updated;
  }

  private getSingleProduct(id: number): Product {
    return this.products.find((pdt: Product) => pdt.id == id);
  }
}

