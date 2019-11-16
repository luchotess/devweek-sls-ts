import bcrypt from 'bcryptjs';
import mongoose   from 'mongoose';

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    role: String
});

UserSchema.methods.serialize = function () {
    return {
        _id: this._id,
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        role: this.role
    };
};

UserSchema.pre('save', async function (next) {
    if (this.isNew) {
        await this.hashPassword();
    }
    next();
});

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.hashPassword = async function (password = null) {
    this.password = await bcrypt.hash(password ? password : this.password, 10);
};

UserSchema.pre('findOneAndUpdate', async function (next) {
    const data = this.getUpdate();

    if (data.password) {
        throw new Error(`Can't change password on update process.`);
    }
    next();
});

export const User = mongoose.model('User', UserSchema);
