const setup = function(csrf) {
    switch(window.location.pathname){
        case '/campaignNotes':
            renderCampaigns(csrf);
            break;
        case '/characterNotes':
            renderCharacters(csrf);
            break;
        case '/playerNotes':
            renderPlayers(csrf);
            break;
        case '/miscNotes':
            renderMisc(csrf);
            break;
        case '/sessionNotes':
            renderSessions(csrf);
            break;
        case '/changePass':
            renderChangePass(csrf);
            break;
        default:
            renderCampaigns(csrf);
    }
    renderAds(csrf);
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});
