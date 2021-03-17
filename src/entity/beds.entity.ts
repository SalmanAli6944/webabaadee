import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Addproperty } from "./addproperty.entity";

@Entity()
export class Beds {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    beds_quaintity: number;
    
    @OneToMany(()=>Addproperty,addproperty=>addproperty.bedid)
    addproperty:Addproperty[];
}