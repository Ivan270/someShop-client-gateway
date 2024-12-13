import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { NATS_SERVICE } from "../config";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { PaginationDto } from "../common";
import { catchError } from "rxjs";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller("products")
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: "create_product" }, createProductDto);
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    // si se necesita respuesta, se ocupa 'send'
    // 'emit' solamente emite un evento
    // segundo argumento es el payload, en este caso se envía un objeto vacío
    return this.client.send({ cmd: "find_all_products" },
      paginationDto
    );
  }

  @Get(":id")
  async findProductById(@Param("id", ParseIntPipe) id: string) {

    // try {
    //   return await firstValueFrom(this.client.send({ cmd: "find_one_product" }, { id }));
    // } catch (error) {
    //   throw new RpcException(error)
    // }

    //   Otra opción sería utilizar los métodos disponibles de los Observables:
    return this.client.send({ cmd: "find_one_product" }, { id })
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        })
      );
  }

  @Delete(":id")
  deleteProduct(@Param("id", ParseIntPipe) id: number) {
    console.log('alo?')
    return this.client.send({ cmd: "delete_product" }, { id })
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        })
      );
  }

  @Patch(":id")
  updateProduct(@Param("id", ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    const product = {
      id: id,
      ...updateProductDto
    }
    return this.client.send({cmd: 'update_product'}, product )
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        })
      )
  }
}
