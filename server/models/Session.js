
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let SessionModel = {};

const convertId = mongoose.Types.ObjectId;
const setTitle = (title) => _.escape(title).trim();

const SessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        set: setTitle,
    },

    sessionnumber: {
        type: Number,
        min: 0,
        required: true,
    },

    notes: {
        type: String,
        trim: true,
        required: true,
    },

    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },

    createdData: {
        type: Date,
        default: Date.now,
    },
});

SessionSchema.statics.toAPI = (doc) => ({
    title: doc.title,
    gamesystem: doc.gamesystem,
    settinginfo: doc.settinginfo,
});

SessionSchema.statics.findByOwner = (ownerId, callback) => {
    const search = {
        owner: convertId(ownerId),
    };

    return SessionModel.find(search).select('title sessionnumber notes').lean().exec(callback);
};

SessionModel = mongoose.model('Session', SessionSchema);

module.exports.SessionModel = SessionModel;
module.exports.SessionSchema = SessionSchema;
