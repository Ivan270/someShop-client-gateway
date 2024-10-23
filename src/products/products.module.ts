import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { envs, PRODUCT_SERVICE } from "../config";

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          // Opciones de host del microservicio en cuestión
          host: envs.productsMicroserviceHost,
          port: envs.productsMicroservicePort
        }
      }
    ])
  ]
})
export class ProductsModule {
}