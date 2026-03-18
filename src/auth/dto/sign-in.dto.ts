import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignInDto {
    @IsEmail({}, {
        message: '邮箱格式不正确'
    })
    @IsNotEmpty({
        message: '邮箱不能为空'
    })
    email: string

    @IsString()
    @IsNotEmpty({
        message: '密码不能为空'
    })
    @MinLength(8, {
        message: '密码长度不能小于8位'
    })
    password: string
}