import { ArgumentMetadata, createParamDecorator, ExecutionContext, PipeTransform } from '@nestjs/common';

export type Paginated<T> = {
    count: number;
    data: T[];
}

export interface Pagination {
    sort?: string;
    order?: string;
    offset?: number;
    limit?: number;
    totalData?: number;
    currentPage?: number;
    totalPage?: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
}

export const Paginate = createParamDecorator(
    (data: string, ctx: ExecutionContext): Pagination => {
        const request = ctx.switchToHttp().getRequest();

        let page = request.body.page
            ? parseInt(request.body.page)
            : (request.query.page
                ? parseInt(request.query.page)
                : 0);

        let limit = request.body.limit
            ? parseInt(request.body.limit)
            : (request.query.limit
                ? parseInt(request.query.limit)
                : undefined);

        let sort = request.body.sort
            ? request.body.sort
            : (request.query.sort
                ? request.query.sort
                : undefined);

        let order = request.body.order
            ? request.body.order
            : (request.query.order
                ? request.query.order
                : undefined);

        return {
            offset: page * limit < 0 ? 0 : (page * limit),
            limit: limit == -1 ? Number.MAX_VALUE : (limit < 0 ? undefined : limit),
            sort: sort,
            order: order,
            currentPage: page
        };
    },
);