import { Body, Controller, Delete, Get, Patch, Post, Render, Req, Res } from '@nestjs/common';
import { LoginUserDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';
import { Request, Response } from 'express';
import { CreateUserDto, UpdateUserDto } from 'src/user/dto/user.dto';


@Controller('auth')
export class AuthController {
  constructor(@InjectModel('User') private UserModel: Model<UserDocument>) {}

  @Get('login')
  @Render('login')
  getLoginPage(@Req() req:any,@Res() res:Response) {
    if (!!req.session.user) res.redirect('dashboard')
    return {title: 'login'}
  }

  @Post('login')
    async loginUser(@Body() loginBody: LoginUserDto,
    @Req() req: any,
    @Res() res: Response,
    ) {
      const { username, password } = loginBody
      const user = await this.UserModel.findOne({username})

      if (!!user && user.password == password ) {
        req.session.user = user
        console.log(req.session.user)
      }
      else return

      console.log(req.session.id)
      res.redirect('dashboard')
  }

  @Get('dashboard')
  @Render('dashboard')
  async getProfile(@Req() req:any, @Res() res: Response) {
    const {username} = req.session.user
    const checkUserExist = await this.UserModel.findOne({username:username})
    if (!checkUserExist) {
      req.session.destroy()
      return res.redirect('login')
    }
    
    if (!!req.session.user && !!checkUserExist) {
      const {name,email} = checkUserExist
      return res.render('dashboard', {user: {name,username,email}})
    }
  }

  @Get('logout')
  @Render('login')
  async logOut(@Req() req:any, @Res() res: Response) {
    req.session.destroy()
    res.redirect('login')
  }

  @Get('register')
  @Render('register')
  async getRegisterPage(@Req() req:any, @Res() res: Response) {
    if (!!req.session.user) res.redirect('dashboard')
    return { title: 'register'}
  }

  @Post('register')
  async register(@Body() registerBody: CreateUserDto,@Req() req:any, @Res() res: Response) {
    if (!!req.session.user) return res.redirect('dashboard')

    const { username } = registerBody
    const user = await this.UserModel.findOne({ username })

    if (!!user) return
    
    await this.UserModel.create(registerBody)

    return res.redirect('login')
  }



  // @Delete()
  // async deleteUser(@Req() req:any) {
  //   if (!!req.session.user) {
  //     await this.UserModel.deleteOne({username:req.session.user.username})
  //     await req.session.destroy()
  //   }
  // }
  
  // @Patch()
  // async updateUser(@Body() body:UpdateUserDto ,@Req() req:any): Promise<void> {
  //   if (!!req.session.user) {
  //     const { username } = req.session.user
  //     await this.UserModel.findOneAndUpdate({username:req.session.user.username},body)
  //     await req.session.destroy()
  //     const user = await this.UserModel.findOne({username})
  //     req.session.user = user
  //   }
  // }
}