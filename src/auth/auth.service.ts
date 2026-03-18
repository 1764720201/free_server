import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async signIn(email: string, pass: string) {
        let user = await this.usersService.findOne(email)

        if (!user) {
            user = await this.usersService.create(email, pass)
        }

        if (user && !(await compare(pass, user.password))) {
            throw new UnauthorizedException()
        }

        const payload = { sub: user.id, email: user.email }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
