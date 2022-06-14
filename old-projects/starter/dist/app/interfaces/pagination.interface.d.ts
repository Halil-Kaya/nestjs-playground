export declare type Paginated<T> = {
    count: number;
    data: T[];
};
export interface IPagination {
    sort?: string;
    order?: string;
    keyword?: string;
    offset: number;
    limit: number;
}
