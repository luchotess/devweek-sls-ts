import { CONFIG } from 'config';
import mongoose   from 'mongoose';
mongoose.Promise = global.Promise;

export const connectDb = () => {
    return mongoose.connect('mongodb://dev:password1@ds061747.mlab.com:61747/auth-base');
};
