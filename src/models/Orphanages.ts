import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Orphanages")
export default class Orphanage {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: number;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  opening_on_weekends: boolean;
}
