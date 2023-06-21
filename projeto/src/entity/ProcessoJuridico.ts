import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Caixa } from "./Caixa";

@Entity()
export class ProcessoJuridico{
    constructor(numero: number, descricao: string){
        this.numero = numero;
        this.descricao = descricao;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numero: number;

    @Column()
    descricao: string;

    @ManyToOne(()=> Caixa)
    caixa : Caixa;
}