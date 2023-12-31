import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'algor', email: 'rugo@gmail.com', role: 'engineer' },
    { id: 2, name: 'fernand', email: 'rugo@gmail.com', role: 'intern' },
    { id: 3, name: 'junior', email: 'rugo@gmail.com', role: 'admin' },
    { id: 4, name: 'eligrand', email: 'rugo@gmail.com', role: 'engineer' },
    { id: 5, name: 'chris', email: 'rugo@gmail.com', role: 'engineer' },
  ];
  findAll(role?: 'intern' | 'engineer' | 'admin') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (!rolesArray.length) {
        throw new NotFoundException('role does not exitst');
      }
      return rolesArray;
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  //      delete()
  delete(id: number) {
    const removeUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removeUser;
  }
}
