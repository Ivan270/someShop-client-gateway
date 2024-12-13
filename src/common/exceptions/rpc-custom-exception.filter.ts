import { Catch, ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {

  catch(exception: RpcException, host: ArgumentsHost) {
    // ctx = context
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();
    // confirmar tipo de dato del error, y si es que contiene atributos status y message
    console.error(rpcError);

    // Manejar error en caso de que el servicio no responda
    if(rpcError.toString().includes('Empty response')){
      return response.status(500).json({
        status: 500,
        message: rpcError.toString().substring(0, rpcError.toString().indexOf('(')-1)
      })
    }

    if (
      typeof rpcError === "object" &&
      "status" in rpcError &&
      "message" in rpcError
    ) {
      const status = isNaN(+rpcError.status) ? 400 : +rpcError.status;
      response.status(status).json(rpcError);
    }

  //   Si no se cumple condiciones anteriores, se lanza error genérico
    else {
      response.status(400).json({
        status: 400,
        message: rpcError,
      });
    }
  }
}