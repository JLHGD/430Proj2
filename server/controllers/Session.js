const models = require('../models');

const Session = models.Session;

const sessionPage = (req, res) => {
    Session.SessionModel.findByOwner(req.session.account._id, (err, docs) => {
        if(err){
            console.log(err);
            return res.status(400).json({error: 'An error occured'});
        }

        return res.render('app', {csrfToken: req.csrfToken(), sessions: docs});
    });
}

const makeSession = (req, res) => {
    if(!req.body.title || !req.body.sessionnumber || !req.body.notes){
        return res.status(400).json({error: 'Title, Session Number, and Notes are all required'});
    }

    const sessionData = {
        title: req.body.title,
        sessionnumber: req.body.sessionnumber,
        notes: req.body.notes,
        owner: req.session.account._id,
    };

    const newSession = new Session.SessionModel(sessionData);

    const sessionPromise = newSession.save();

    sessionPromise.then(() => res.json({redirect: '/sessionNotes'}));

    sessionPromise.catch((err) => {
        console.log(err);
        if(err.code === 11000){
            return res.status(400).json({error: 'Session already exists.'});
        }

        return res.status(400).json({error: 'An error occured'});
    });

    return sessionPromise;
}

const getSessions = (request, response) => {
    const req = request;
    const res = response;

    return Session.SessionModel.findByOwner(req.session.account._id, (err, docs) => {
        if(err) {
            console.log(err);
            return res.status(400).json({error: 'An error ocurred'});
        }

        return res.json({sessions: docs});
    });
};

module.exports.sessionPage = sessionPage;
module.exports.getSessions = getSessions;
module.exports.makeSession = makeSession;
