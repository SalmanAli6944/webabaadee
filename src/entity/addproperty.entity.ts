import { Column, Entity, JoinColumn,  ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Areaofunit } from "./area_unit.entity";
import { Bathrooms } from "./bathroom.entity";
import { Beds } from "./beds.entity";
import { City } from "./city.entity";
import { User } from "./user.entity";
import { Location } from "./location.entity";
import { PropertyCategory } from "./property_category.entity";
import { PropertyType } from "./property_type.entity";
import { Propertyimage } from "./propertyimage.entity";

export enum Purpose {
    ForSale = "Forsale",
    Rent = "Rent",
    Wanted = "Wanted"
}

@Entity()
export class Addproperty {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>User,userid=>userid.addproperty)
    userid:User;
    
    @Column()
    purpose: Purpose;
    
    @ManyToOne(()=>PropertyType,propertytype=>propertytype.addproperty)
    @JoinColumn()
    propertytype: PropertyType;
    
    @ManyToOne(() => PropertyCategory,propertycatogory=>propertycatogory.addproperty)
    @JoinColumn()
    propertysubtype: PropertyCategory;

    
    @ManyToOne(() => City,city=>city.addproperty)
    @JoinColumn()
    cityid: City;
    
    @ManyToOne(() => Location,location=>location.addproperty)
    @JoinColumn()
    Locationid: Location;
    
    @Column()
    propertytitle: string;
    
    @Column()
    propertydescription: string;
    
    @Column()
    price: number;
    
    @Column()
    landarea: number;

    @ManyToOne(() => Areaofunit,areaofunit=>areaofunit.addproperty)
    @JoinColumn()
    areaunitid: Areaofunit;

    @ManyToOne(() => Beds,beds=>beds.addproperty)
    @JoinColumn()
    bedid: Beds;


    @ManyToOne(() => Bathrooms,bathrooms=>bathrooms.addproperty)
    @JoinColumn()
    bathroomid: Bathrooms;

    @OneToMany(()=>Propertyimage,images=>images.addproperty)
    @JoinColumn()
    images: Propertyimage[];
    
    @Column()
    expiredate: string;
    
    @Column()
    createdat: string;
    
    @Column()
    updatedat:string;
}