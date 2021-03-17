import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Addproperty } from "./addproperty.entity";

@Entity()
export class Bathrooms {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bathroom_quaintity: number;
    
    @OneToMany(()=>Addproperty,addproperty=>addproperty.bathroomid)
    addproperty:Addproperty[];
}