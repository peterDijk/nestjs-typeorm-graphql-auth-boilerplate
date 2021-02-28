import { User } from '../users/user.model';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  ManyToOne,
} from 'typeorm';

@Entity()
export class HealthCheck extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  message: string;

  @Column('timestamptz', { nullable: false, default: () => `now()` })
  dateCreated: Timestamp;

  @ManyToOne((type) => User)
  user: User;
}
