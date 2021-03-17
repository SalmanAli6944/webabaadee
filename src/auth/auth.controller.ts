import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from 'src/dto/auth-credential.dto';
import { User } from 'src/entity/user.entity';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private authsevices:AuthService,
    ){}
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto):Promise<void>{
        console.log(authCredentialsDto);
       return this.authsevices.signUp(authCredentialsDto);
        
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe
    ) authCredentialsDto:AuthCredentialsDto) {
     return this.authsevices.sigIn(authCredentialsDto);
    }
    @Get("/varification")
     @UseGuards(AuthGuard())
    varification(@Req() user){
        console.log(user.url.header);
    }

}
