import { Middleware }  from '../Middleware';
import { HttpSucceed } from '../utils';
import { UserDto }     from './user.dto';
import { User }        from './user.model';

let UserModel = new UserDto(User);

export async function getUsersFunction (event, context) {
    return new Middleware().run(event, context).then(async lambda => {
        const users = await UserModel.findAll();
        lambda.context.succeed(HttpSucceed(users));
    });
}

export async function createUsersFunction (event, context) {
    return new Middleware().run(event, context).then(async lambda => {
        const newUser = await UserModel.create(event.body);
        lambda.context.succeed(HttpSucceed(await newUser.save()));
    });
}

export async function updateUsersFunction (event, context) {
    return new Middleware().run(event, context).then(async lambda => {
        lambda.context.succeed(HttpSucceed(await UserModel.update(lambda.event.params.id, lambda.event.body)));
    });
}

export async function deleteUsersFunction (event, context) {
    return new Middleware().run(event, context).then(async lambda => {
        lambda.context.succeed(HttpSucceed(await UserModel.delete(lambda.event.params.id)));
    });
}
