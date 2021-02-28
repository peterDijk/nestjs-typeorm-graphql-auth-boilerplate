import { User } from '../users/user.model';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class HealthCheck extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text', { nullable: false })
  message: string;

  @Field()
  @Column('timestamptz', { nullable: false, default: () => `now()` })
  dateCreated: Date;

  @Field()
  @ManyToOne((type) => User)
  user: User;
}
