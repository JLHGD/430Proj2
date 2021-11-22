
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let CampaignModel = {};

const convertId = mongoose.Types.ObjectId;
const setTitle = (title) => _.escape(title).trim();

const CampaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        set: setTitle,
    },

    gamesystem: {
        type: String,
        trim: true,
        required: true,
    },

    settinginfo: {
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

CampaignSchema.statics.toAPI = (doc) => ({
    title: doc.title,
    gamesystem: doc.gamesystem,
    settinginfo: doc.settinginfo,
});

CampaignSchema.statics.findByOwner = (ownerId, callback) => {
    const search = {
        owner: convertId(ownerId),
    };

    return CampaignModel.find(search).select('title gamesystem settinginfo').lean().exec(callback);
};

CampaignModel = mongoose.model('Campaign', CampaignSchema);

module.exports.CampaignModel = CampaignModel;
module.exports.CampaignSchema = CampaignSchema;
