import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus()


        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: this.getMessage(exception)
            })
    }

    private getMessage(exception: HttpException): string {
        const response = exception.getResponse()

        if (!response) {
            return '未知错误'
        }

        if (typeof response === 'object') {
            const message = response['message']

            if (Array.isArray(message)) {
                return message.join(';')
            }

            return message
        }

        return response
    }
}
