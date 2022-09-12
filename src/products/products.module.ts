import { Module } from '@nestjs/common';
import { ProductsContoller } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
    controllers: [ProductsContoller],
    providers: [ProductsService],
})
export class ProductsModule{}