import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Keyword')
export class Keyword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column({ nullable: false })
  keyword: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
