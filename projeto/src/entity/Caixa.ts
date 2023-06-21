import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { Usuario } from "./Usuario";
import { ProcessoJuridico } from "./ProcessoJuridico";

export class Caixa{
    constructor(nome: string){
        this.nome = nome;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @ManyToMany(() => Usuario)
    usuario: Usuario;

    @OneToMany(() => ProcessoJuridico, (processojuridico) => processojuridico.caixa)
    processosjuridicos: ProcessoJuridico[]
    
}