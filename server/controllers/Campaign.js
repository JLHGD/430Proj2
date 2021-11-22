const models = require('../models');

const Campaign = models.Campaign;

const campaignPage = (req, res) => {
    Campaign.CampaignModel.findByOwner(req.session.account._id, (err, docs) => {
        if(err){
            console.log(err);
            return res.status(400).json({error: 'An error occured'});
        }

        return res.render('app', {csrfToken: req.csrfToken(), campaigns: docs});
    });
}

const makeCampaign = (req, res) => {
    if(!req.body.title || !req.body.gamesystem || !req.body.settinginfo){
        return res.status(400).json({error: 'Title, Game System, and Setting Info are all required'});
    }

    const campaignData = {
        title: req.body.title,
        gamesystem: req.body.gamesystem,
        settinginfo: req.body.settinginfo,
        owner: req.session.account._id,
    };

    const newCampaign = new Campaign.CampaignModel(campaignData);

    const campaignPromise = newCampaign.save();

    campaignPromise.then(() => res.json({redirect: '/campaignNotes'}));

    campaignPromise.catch((err) => {
        console.log(err);
        if(err.code === 11000){
            return res.status(400).json({error: 'Campaign already exists.'});
        }

        return res.status(400).json({error: 'An error occured'});
    });

    return campaignPromise;
}

const getCampaigns = (request, response) => {
    const req = request;
    const res = response;

    return Campaign.CampaignModel.findByOwner(req.session.account._id, (err, docs) => {
        if(err) {
            console.log(err);
            return res.status(400).json({error: 'An error ocurred'});
        }

        return res.json({campaigns: docs});
    });
};

module.exports.campaignPage = campaignPage;
module.exports.getCampaigns = getCampaigns;
module.exports.makeCampaign = makeCampaign;
