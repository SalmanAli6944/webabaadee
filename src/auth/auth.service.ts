import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from 'src/dto/auth-credential.dto';
import { User } from 'src/entity/user.entity';
import { UserRepository } from 'src/reposatory/user.repository';
import * as bcrypt from "bcrypt";
import { UtilityService } from 'src/utility/utility.service';
import { CityRepository } from 'src/reposatory/city.repositery';
import { LocationRepository } from 'src/reposatory/location.repository';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository,
        
        @InjectRepository(CityRepository)
        private cityrepo:CityRepository,

        @InjectRepository(LocationRepository)
        private locationrepo:LocationRepository,
        private jwtService:JwtService,
        private utilityservice:UtilityService
    ){}
    
    
    async signUp(authCredentialsDto:AuthCredentialsDto):Promise<void>{

        var {name,email,password,phone_number,city,
            location, is_active,is_verified,created_at,updated_at,
        }= authCredentialsDto;
        is_active=true;
        is_verified=false;
        created_at=Date().toString();
        updated_at=Date().toString();
        
        const user=new User();
        user.name=name;
        user.email=email;
        user.salt=await bcrypt.genSalt();
        user.password=await this.hashpassword(password,user.salt);
        //console.log(user.password);
        user.phone_number=phone_number;
       
        
        const findcity = await this.cityrepo
        .createQueryBuilder("city")
        .where("city.cityname = :cityname", { cityname: city })
        .getOne();
        user.city=findcity;


        const findlocation = await this.locationrepo
        .createQueryBuilder("location")
        .where("location.locationname = :locationname", { locationname: location })
        .getOne();
        user.location=findlocation;
        user.is_active=is_active;
        user.is_verified=is_verified;
        user.created_at=created_at;
        user.updated_at=updated_at;
        
        try {
            
            await this.userRepository.save(user);
            const payload={name};
            const accessToken=await this.jwtService.sign(payload);
            this.utilityservice.sendEmail(email,accessToken);
          } catch (error) {
            console.log(typeof (error.code));
            if (error.code === '23505') {
              throw new ConflictException("Username Already exsist")
            }
            else {
              throw new InternalServerErrorException();
            }
          }
    }
    
    async sigIn(authCredentialsDto:AuthCredentialsDto){
        const username=await this.userRepository.validateUserpassword(authCredentialsDto);
        console.log(username);
        
        if(!username){
            throw new UnauthorizedException("invalid Cridential");
        }
        const payload:JwtPayload={username};
        const accessToken=await this.jwtService.sign(payload);
        return {accessToken};
    }


    
    private async hashpassword(password:string,salt:string):Promise<string>{

        return bcrypt.hash(password,salt);
      }
}
