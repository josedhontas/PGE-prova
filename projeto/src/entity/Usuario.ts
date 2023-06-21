import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Usuario{
    constructor(email: string, senha: string, cargo: boolean){
        this.email = email;
        this.senha = senha;
        this.cargo = cargo;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column()
    cargo: boolean;
}