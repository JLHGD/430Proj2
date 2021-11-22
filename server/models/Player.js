
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let PlayerModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (playername) => _.escape(playername).trim();

const PlayerSchema = new mongoose.Schema({
    playername: {
        type: String,
        required: true,
        trim: true,
        set: setName,
    },

    charactername: {
        type: String,
        trim: true,
        required: true,
    },

    characterlevel: {
        type: Number,
        min: 0,
        required: false,
    },

    characterhealth: {
        type: Number,
        required: false,
    },

    characterstats: {
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

PlayerSchema.statics.toAPI = (doc) => ({
    title: doc.title,
    gamesystem: doc.gamesystem,
    settinginfo: doc.settinginfo,
});

PlayerSchema.statics.findByOwner = (ownerId, callback) => {
    const search = {
        owner: convertId(ownerId),
    };

    return PlayerModel.find(search).select('playername charactername characterlevel characterhealth characterstats notes').lean().exec(callback);
};

PlayerModel = mongoose.model('Player', PlayerSchema);

module.exports.PlayerModel = PlayerModel;
module.exports.PlayerSchema = PlayerSchema;
