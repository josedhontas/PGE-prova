import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Caixa } from "./Caixa";

@Entity()
export class Usuario{
    constructor(email: string, nome:string, senha: string, cargo: boolean){
        this.email = email;
        this.nome = nome;
        this.senha = senha;
        this.cargo = cargo;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    nome: string;

    @Column()
    senha: string;

    @Column()
    cargo: boolean;

    @OneToMany(() => Caixa, (caixa) => caixa.usuario)
    caixas: Caixa[];
}