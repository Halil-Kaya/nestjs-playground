import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IPagination } from "src/app/interfaces/pagination.interface";


export const Pagination = createParamDecorator(
    (data:string,ctx:ExecutionContext) : IPagination => {

        const request = ctx.switchToHttp().getRequest();

        //page kismini bodyde, eger body de degilse query de ariyor ordada yoksa 0 atiyor
        let page = request.body.page ? parseInt(request.body.page) : (request.query.page ? parseInt(request.query.page) : 0);

        //limit kismini bodyde, eger body de degilse query de ariyor ordada yoksa undefined atiyor
        let limit = request.body.limit ? parseInt(request.body.limit) : (request.query.limit ? parseInt(request.query.limit) : undefined); 

        //sort kismini bodyde, eger body de degilse query de ariyor ordada yoksa undefined atiyor
        let sort = request.body.sort ? request.body.sort : (request.query.sort ? request.query.sort : undefined);

        //order kismini bodyde, eger body de degilse query de ariyor ordada yoksa undefined atiyor
        let order = request.body.order ? request.body.order : (request.query.order ? request.query.order : undefined);

        return {
            offset : page * limit < 0 ? 0 : (page * limit),
            limit : limit < 0 ? 15 : limit,
            sort: sort,
            order : order
        };

    },
);
