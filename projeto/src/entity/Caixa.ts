import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { Usuario } from "./Usuario";
import { ProcessoJuridico } from "./ProcessoJuridico";

@Entity() 
export class Caixa{
    constructor(nome: string, usuario: Usuario){
        this.nome = nome;
        this.usuario = usuario
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
