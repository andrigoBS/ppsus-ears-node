import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from "typeorm";

@Entity( "user")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "name", type: "varchar", length: "255"})
    name: string;

}