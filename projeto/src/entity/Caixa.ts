import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Usuario } from "./Usuario";
import { ProcessoJuridico } from "./ProcessoJuridico";

@Entity()
export class Caixa {
  constructor(nome: string, usuario: Usuario) {
    this.nome = nome;
    this.usuario = usuario;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToOne(() => Usuario)
  usuario: Usuario;

  @ManyToMany(() => ProcessoJuridico)
  @JoinTable()
  processosjuridicos: ProcessoJuridico[];
}
