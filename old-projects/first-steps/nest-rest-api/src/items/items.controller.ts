import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {CreateItemDto} from "./dto/create-item.dto"
import {ItemsService} from "./items.service"
import {Item} from "./interfaces/item.interface"


@Controller('items')
export class ItemsController {

    constructor(private readonly itemService:ItemsService){}

    @Get()
    async findAll():Promise<Item[]>{
        return this.itemService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id):Promise<Item>{
        return this.itemService.findOne(id);
    }

    @Post()
    async create(@Body() createItemDto):Promise<Item>{
        return await this.itemService.create(createItemDto);
    }

    @Delete(':id')
    delete(@Param('id') id):Promise<Item>{
        return this.itemService.delete(id)
    }

    @Put(':id')
    update(@Body() updateItemDto,@Param('id') id):Promise<Item>{
        return this.itemService.update(id,updateItemDto)
    }

}
