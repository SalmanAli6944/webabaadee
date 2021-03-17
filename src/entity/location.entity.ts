import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Addproperty } from "./addproperty.entity";
import { City } from "./city.entity";
import { User } from "./user.entity";


@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    locationname:string;

    @ManyToOne(type => City, city => city.location)
    city: City;
    @OneToMany(()=>Addproperty,addproperty=>addproperty.Locationid)
    addproperty:Addproperty[];

    @OneToMany(()=>User,user=>user.location)
    user:User[];

}