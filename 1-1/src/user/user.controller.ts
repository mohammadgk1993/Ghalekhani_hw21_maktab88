import { Controller, Param, Body, Get, Post, Delete, Patch, Req} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { Request } from 'express';


@Controller('user')
export default class UserController {
  constructor(private readonly userSerivce: UserService) {}

  @Get()
  getUsers() {
    return this.userSerivce.findAllUsers();
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userSerivce.createUser(body);
  }

  @Get(':username')
  getUser(@Param('username') username: string) {
    return this.userSerivce.findByUsername(username);
  }

  @Patch(':username')
  updateUser(
    @Param('username') username: string,
    @Body() body: UpdateUserDto
  ) {
    return this.userSerivce.updateUser(username,body);
  }

  @Delete(':username')
  deleteUser(@Param('username') username: string) {
    return this.userSerivce.deleteUser(username);
  }
}