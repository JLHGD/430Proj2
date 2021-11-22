
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let CharacterModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const CharacterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName,
    },

    level: {
        type: Number,
        min: 0,
        required: false,
    },

    health: {
        type: Number,
        required: false,
    },

    stats: {
        type: String,
        trim: true,
        required: false,
    },

    notes: {
        type: String,
        trim: true,
        required: false,
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

CharacterSchema.statics.toAPI = (doc) => ({
    title: doc.title,
    gamesystem: doc.gamesystem,
    settinginfo: doc.settinginfo,
});

CharacterSchema.statics.findByOwner = (ownerId, callback) => {
    const search = {
        owner: convertId(ownerId),
    };

    return CharacterModel.find(search).select('name level health stats notes').lean().exec(callback);
};

CharacterModel = mongoose.model('Character', CharacterSchema);

module.exports.CharacterModel = CharacterModel;
module.exports.CharacterSchema = CharacterSchema;
