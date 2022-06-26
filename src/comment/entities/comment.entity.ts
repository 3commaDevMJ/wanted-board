import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  boardId: number;

  @Column({ length: 200 })
  comment: string;

  @Column({ length: 30 })
  userName: string;

  @Column()
  password: string;

  @Column({ default: false })
  depth: number;

  @Column({ default: false })
  groupId: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
