import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from 'types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(role?: Role) {
    // if (role) {
    //   const rolesArray = this.users.filter(
    //     (user) => user.role?.toUpperCase() === role?.toUpperCase(),
    //   );
    //   if (!rolesArray.length) {
    //     throw new NotFoundException('User role not found');
    //   }
    //   return rolesArray;
    // }
    return `this.users ${role}`;
  }

  findOne(id: number) {
    // const userExist = this.users.find((user) => user.id === id);
    // if (!userExist) {
    //   throw new NotFoundException(`User not found with id ${id}`);
    // }
    return id;
  }
  findOneByEmail(email: string) {
    try {
      const user = this.databaseService.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
    }
    // const userExist = this.users.find((user) => user.id === id);
    // if (!userExist) {
    //   throw new NotFoundException(`User not found with id ${id}`);
    // }
    return email;
  }

  async create(user: CreateUserDto) {
    try {
      const newUser = await this.databaseService.user.create({
        data: user,
      });
      return newUser;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  update(id: number, updatedUser: UpdateUserDto) {
    // this.users = this.users.map((user) => {
    //   if (user.id === id) {
    //     return { ...user, ...updatedUser };
    //   }
    //   return user;
    // });
    console.log(`updatedUser`, updatedUser);
    return this.findOne(id);
  }

  delete(id: number) {
    // const removedUser = this.findOne(id);
    // this.users = this.users.filter((user) => user?.id !== id);
    return id;
  }
}
