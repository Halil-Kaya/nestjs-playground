import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
export declare class ItemsService {
    private readonly itemModel;
    constructor(itemModel: Model<Item>);
    findAll(): Promise<Item[]>;
    findOne(id: string): Promise<Item>;
    create(item: Item): Promise<Item>;
    delete(id: string): Promise<Item>;
    update(id: string, item: Item): Promise<Item>;
}
