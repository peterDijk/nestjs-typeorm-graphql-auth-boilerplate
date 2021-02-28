import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
} from 'typeorm';
import { IsString, MinLength, IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import config from '../../config';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  username: string;

  @Field()
  @IsEmail()
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string;

  @Field()
  @IsString()
  @MinLength(config.MIN_PW_LENGTH)
  @Exclude({ toPlainOnly: true })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @BeforeInsert() async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
      throw Error('error hashing password');
    }
  }
}
