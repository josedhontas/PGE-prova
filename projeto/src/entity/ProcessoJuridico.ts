import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Caixa } from "./Caixa";

@Entity()
export class ProcessoJuridico {
  constructor(numero: number, descricao: string, caixas: Caixa[]) {
    this.numero = numero;
    this.descricao = descricao;
    this.caixas = caixas;
  }

  adicionarCaixa(caixa: Caixa) {
    this.caixas.push(caixa);
    caixa.processosjuridicos.push(this);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column()
  descricao: string;

  @ManyToMany(() => Caixa)
  @JoinTable()
  caixas: Caixa[];
}
