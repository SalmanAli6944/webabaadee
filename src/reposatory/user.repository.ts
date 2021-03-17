import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "../dto/auth-credential.dto";
import { User } from "../entity/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
  async validateUserpassword(authCredentialsDto:AuthCredentialsDto):Promise<string>
      {
          const {name,password}=authCredentialsDto;
          const user= await this.findOne({name});

          if (user && await user.validatPassword(password)) {
            return user.name;
          } else {
            return null;
          }

      }
     
}


