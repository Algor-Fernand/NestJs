import { Injectable } from '@nestjs/common';

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
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }
  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }
  create(user: {
    name: string;
    email: string;
    role: 'intern' | 'engineer' | 'admin';
  }) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'intern' | 'engineer' | 'admin';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
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
