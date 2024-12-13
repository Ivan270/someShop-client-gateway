import { OrderStatus, OrderStatusList } from "../enum/order.enum";
import { IsEnum, IsOptional } from "class-validator";

export class StatusDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Order Status must be one of the following: ${OrderStatusList}`,
  })
  status: OrderStatus


}