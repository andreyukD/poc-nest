import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class BaseService<T> {
    constructor(@InjectModel('User') private readonly model: Model<T>) {}

    async getById(id: string): Promise<T> {
        const item = await this.model.findById(id).exec()
       if (!item) throw new NotFoundException(`${id} not found`);
       return item;
    }

    async create(data: Partial<T>): Promise<any> {
        const newDoc = new this.model(data);
        return await newDoc.save();
    }

    async update(id: string): Promise<any> {
        return this.model.findByIdAndUpdate(
            id,
            {age: Math.random()},
            {new: true},
        ).exec();
    }
}
