import { BaseDto } from '../database/base.dto';

export class UserDto extends BaseDto {
    constructor(model) {
        super(model);
    }

    async findAll (): Promise<any[]> {
        const users = await this.model.find().exec();
        return users.map(user => user.serialize());
    }
}
