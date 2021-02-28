import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
} from 'typeorm';
import { IsString, MinLength, IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
import config from '../../config';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  username: string;

  @IsEmail()
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string;

  @IsString()
  @MinLength(config.MIN_PW_LENGTH)
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
