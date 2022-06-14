import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { TryCatch } from 'src/app/core/decorators/try-catch.decorator';
import { IPagination, Paginated } from 'src/app/interfaces/pagination.interface';
import { User } from '../models/user';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User> ){
      
    }

    create(user:User) : Promise<User>{
        return this.userModel.create(user);
    }

    findById(id:string) : Promise<User>{
        return this.userModel
            .findById(Types.ObjectId(id))
            .exec()
    }

    findOne(query: FilterQuery<User>) : Promise<User>{
        return this.userModel
            .findOne(query)
            .exec()
    }

    
    updateUser(query : FilterQuery<User>, user:Partial<User>) : Promise<User>{

        if(query._id){//string olarak gonderilen id yi object i dye donusturuyor?
            query._id = Types.ObjectId(query._id);
        }

        return this.userModel
            .findOneAndUpdate(
                { deletedAt : null, ...query },
                { ...user },
                { new : true }//?
            ).exec()

    }   

    @TryCatch()
    async findUsers(paginate?: IPagination, query? : FilterQuery<User>) : Promise<Paginated<User>> {

        const count = await this.userModel.countDocuments({deletedAt:null, ...query});

        const users = await this.userModel
                .find({deletedAt : null,...query}) //silinmemis ve querye uygun kullanicilari getiriyor
                .select([//bu kisimlari cikartiyor
                    '-deletedAt',
                    '-bannedAt',
                    '-updatedAt',
                    '-protectedAt',
                    '-password'
                ])
                .skip(paginate ? paginate.offset : 0)//sayfalama icin datayi bu kisimlara gore getiriyor
                .limit(paginate ? paginate.limit : undefined);

        
        return {
            count : count,
            data:users
        };

    }
    


}
