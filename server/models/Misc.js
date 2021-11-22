
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let MiscModel = {};

const convertId = mongoose.Types.ObjectId;
const setTitle = (title) => _.escape(title).trim();

const MiscSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        set: setTitle,
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

MiscSchema.statics.toAPI = (doc) => ({
    title: doc.title,
    gamesystem: doc.gamesystem,
    settinginfo: doc.settinginfo,
});

MiscSchema.statics.findByOwner = (ownerId, callback) => {
    const search = {
        owner: convertId(ownerId),
    };

    return MiscModel.find(search).select('title notes').lean().exec(callback);
};

MiscModel = mongoose.model('Misc', MiscSchema);

module.exports.MiscModel = MiscModel;
module.exports.MiscSchema = MiscSchema;
