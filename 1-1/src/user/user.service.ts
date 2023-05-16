import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { CreateUserDto,UpdateUserDto } from './dto/user.dto';


@Injectable()
export class UserService {
  constructor(@InjectModel('User') private UserModel: Model<UserDocument>) {
    this.createAdmin()
  }

  private async createAdmin(): Promise<UserDocument> {
    const adminExist = await this.UserModel.findOne({"role":"admin"})
    if (!!adminExist) return
    return this.UserModel.create({
      "name":"admin",
      "username":"admin",
      "password":"admin123",
      "email":"admin@gmail.com",
      "role":"admin"
    })
  }

  public async findAllUsers(): Promise<UserDocument[]> {
    return this.UserModel.find({});
  }

  public async createUser(userInfo: CreateUserDto): Promise<UserDocument> {
    return this.UserModel.create(userInfo);
  }

  public async findByUsername(username: string): Promise<UserDocument> {
    return await this.UserModel.findOne({username});
  }

  public async updateUser(username: string,body: UpdateUserDto): Promise<any> {
    return this.UserModel.findOneAndUpdate({username},body);
  }

  public async deleteUser(username: string): Promise<any> {
    return this.UserModel.deleteOne({ username });
  }
}