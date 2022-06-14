import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector : Reflector) {}

    canActivate(context : ExecutionContext) : boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();
        const roles = this.reflector.get<string[]>('role',context.getHandler());

        if(!roles) return false;

        const user = request.user;

        return this.checkRoles(roles,user.role)

    }

    private checkRoles(roles : string[] , userRoles: string[]) : boolean{

        let match : boolean = false;

        roles.forEach(role =>{

            console.log(userRoles)
            if(userRoles.indexOf(role) !== -1){
                match = true;
            }

        })

        return match
    }


}