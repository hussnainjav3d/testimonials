import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'reader',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      role: 'reader',
    },
    {
      id: 3,
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      role: 'editor',
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      role: 'user',
    },
    {
      id: 5,
      name: 'Eve Davis',
      email: 'eve.davis@example.com',
      role: 'manager',
    },
  ];

  findAll(role?: Role) {
    if (role) {
      const rolesArray = this.users.filter(
        (user) => user.role?.toUpperCase() === role?.toUpperCase(),
      );
      if (!rolesArray.length) {
        throw new NotFoundException('User role not found');
      }
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const userExist = this.users.find((user) => user.id === id);
    if (!userExist) {
      throw new NotFoundException(`User not found with id ${id}`);
    }
    return userExist;
  }

  create(user: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user?.id !== id);
    return removedUser;
  }
}
