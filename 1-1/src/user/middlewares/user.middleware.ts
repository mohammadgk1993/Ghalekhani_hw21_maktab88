import { Injectable, NestMiddleware, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class FindUser implements NestMiddleware {
    constructor(@InjectModel('User') private UserModel: Model<UserDocument>) {}

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const {username} = req.params
            const userExit = await this.UserModel.findOne({username})
            if (!userExit) return res.status(404).json({ message: 'User not found' });
            next()
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

// export async function userValidator(req: Request, res: Response, next: NextFunction) {
//     try {
//         const {username} = req.params
//         const userExit = await this.UserModel.findOne({username})
//         if (!userExit) return res.status(404).json({ message: 'User not found' });
//         next()
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// }