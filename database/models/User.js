import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    _role: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Role',
    },
    _profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
    },
});

const RoleSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

const ProfileSchema = new Schema({
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
    },
    avatar: {
        type: String,
    },
});

const User = mongoose.model('User', UserSchema);
const Role = mongoose.model('Role', RoleSchema);
const Profile = mongoose.model('Profile', ProfileSchema);

export { User, Role, Profile };
