import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export default class User {
    @PrimaryGeneratedColumn("increment")
    id:number;
    
    @Column("character varying",{unique:true})
    username:number;

} 