import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto, UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findOne(options?: unknown): Promise<UserDto> {
    const user = await this.userRepo.findOne(options);
    return {
      id: user.id,
      email: user.email,
    };
  }

  async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await bcrypt.compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return {
      id: user.id,
      email: user.email,
    };
  }

  async findByPayload({ email }: { email: string }): Promise<UserDto> {
    return await this.findOne({
      where: { email },
    });
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { password, email } = userDto;

    // check if the user exists in the db
    const userInDb = await this.userRepo.findOne({
      where: { email },
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    try {
      const user: User = await this.userRepo.create({
        password,
        email,
      });

      await this.userRepo.save(user);

      return {
        id: user.id,
        email: user.email,
      };
    } catch (err) {
      throw Error(err);
    }
  }
}
