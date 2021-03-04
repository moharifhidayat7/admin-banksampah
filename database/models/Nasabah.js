import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NasabahCredentialSchema = new Schema({
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
    _profile: {
        type: Schema.Types.ObjectId,
        ref: 'NasabahProfile',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const NasabahProfileSchema = new Schema({
    nik: {
        type: String,
        required: true,
    },
    membership: {
        membershipType: {
            type: String,
            enum: ['personal', 'corporate', 'business'],
            required: true,
        },
        member: {
            type: [Schema.Types.ObjectId],
        },
    },
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
    },
    address: {
        current: {
            type: String,
            required: true,
        },
        origin: {
            type: String,
            required: true,
        },
    },
    mobile: {
        type: String,
        required: true,
    },
    birth: {
        date: {
            type: Date,
            required: true,
        },
        place: {
            type: String,
            required: true,
        },
    },
    religion: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
    },
    accountType: {
        type: String,
        enum: ['personal', 'corporate', 'business'],
        required: true,
    },
    ofAccounts: {
        type: [Schema.Types.ObjectId],
        ref: 'Rekening',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const AccountSchema = new Schema({
    no: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const NasabahCredential =
    mongoose.models.NasabahCredential ||
    mongoose.model('NasabahCredential', NasabahCredentialSchema);
const NasabahProfile =
    mongoose.models.NasabahProfile ||
    mongoose.model('NasabahProfile', NasabahProfileSchema);
const Account =
    mongoose.models.Account || mongoose.model('Account', AccountSchema);

export { NasabahCredential, NasabahProfile, Account };
