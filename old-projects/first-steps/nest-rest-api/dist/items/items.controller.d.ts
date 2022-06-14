import { ItemsService } from "./items.service";
import { Item } from "./interfaces/item.interface";
export declare class ItemsController {
    private readonly itemService;
    constructor(itemService: ItemsService);
    findAll(): Promise<Item[]>;
    findOne(id: any): Promise<Item>;
    create(createItemDto: any): Promise<Item>;
    delete(id: any): Promise<Item>;
    update(updateItemDto: any, id: any): Promise<Item>;
}
