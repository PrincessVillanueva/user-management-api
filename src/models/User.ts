import "reflect-metadata"; // Ensure this is at the top!
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100 })
    firstName!: string;

    @Column({ type: "varchar", length: 100 })
    lastName!: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email!: string;
}