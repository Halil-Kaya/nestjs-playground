import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
import {switchMap,map,catchError} from 'rxjs/operators';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>,
        private authService:AuthService
        ){}

    create(user:User):Observable<User>{
        return this.authService.hashPassword(user.password)
            .pipe(switchMap((passwordHash:string) => {
                
                const newUser = new UserEntity();
                newUser.name = user.name;
                newUser.username = user.username;
                newUser.email = user.email;
                newUser.password = passwordHash;

                return from(this.userRepository.save(newUser)).pipe(
                    map((user:User) => {
                        const {password,...result} = user;
                        return result;
                    }), 
                    catchError(err => throwError(err))
                );
            }))
    }

    findOne(id:number) : Observable<User>{
        return from(this.userRepository.findOne({id})).pipe(
            map((user:User) => {
                const {password,...result} = user;
                return result;
            })
        );
    }
    
    findAll() : Observable<User[]>{
        return from(this.userRepository.find()).pipe(
            map((users) => {
                users.forEach((v) => {delete v.password})
                return users;
            })
        );;
    }

    deleteOne(id:number):Observable<any>{
        return from(this.userRepository.delete(id))
    }

    updateOne(id:number,user:User) : Observable<any>{
        delete user.email;
        delete user.password;

        return from(this.userRepository.update(id,user));
    }

    login(user:User) : Observable<string>{
        return 
    }

    validateUser(email:string,password:string):Observable<User>{
        return
    }

    findByEmail(email:string):Observable<User>{
        return from(this.userRepository.findOne({email}));

    }

    

}
