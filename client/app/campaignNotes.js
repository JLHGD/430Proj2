let popUpOpen = false;

const handleCampaign = (e) => {
    e.preventDefault();

    if($("#campaignTitle").val() == '' || $("#gameSystem").val() == '' || $("#settingInfo").val() == ''){
        handleError("All fields are required for campaign creation (Can be editted later)");
        return false;
    }

    sendAjax('POST', $("#newCampaignForm").attr("action"), $("#newCampaignForm").serialize(), function() {
        loadCampaignsFromServer();
    });

    return false;
};

const editCampaign = (e) => {
    e.preventDefault();

    sendAjax('POST', $("#editCampaignForm").attr("action"), $("#editCampaignForm").serialize(), function() {
        loadCampaignsFromServer();
    });
};

const EditCampaignForm = (props) => {
    <form id="editCampaignForm"
          onSubmit={editCampaign}
          name="editCampaignForm"
          action="/campaignNotes"
          method="POST"
          className="editCampaignForm"
    >

        <label htmlFor="title">Title: </label>
        <input id="campaignTitle" type="text" name="title" placeholder="Campaign Title"/>

        <label htmlFor="gamesystem">Game System: </label>
        <input id="gameSystem" type="text" name="gamesystem" placeholder="Game System"/>

        <label htmlFor="settinginfo">Setting Information: </label>
        <textarea id="settinginfo" name="settinginfo" form="editCampaignForm" placeholder="Setting Information"></textarea>

        <input type="hidden" name="_csrf" value={props.csrf}/>

        <input className="editCampaign" type="submit" value="Finish Editing" />
    </form>
};

const NewCampaignForm = (props) => {
    return (
        <form id="newCampaignForm"
              onSubmit={handleCampaign}
              name="newCampaignForm"
              action="/campaignNotes"
              method="POST"
              className="newCampaignForm"
        >

            <label htmlFor="title">Title: </label>
            <input id="campaignTitle" type="text" name="title" placeholder="Campaign Title"/>

            <label htmlFor="gamesystem">Game System: </label>
            <input id="gameSystem" type="text" name="gamesystem" placeholder="Game System"/>

            <label htmlFor="settinginfo">Setting Information: </label>
            <textarea id="settinginfo" name="settinginfo" form="newCampaignForm" placeholder="Setting Information"></textarea>

            <input type="hidden" name="_csrf" value={props.csrf}/>

            <input className="createCampaign" type="submit" value="Create" />
        </form>
    );
};


// Can add images to here with an image tag
////// COPY NewCampaignForm AND ADD IT TO HERE FOR THE EDIT BUTTON
///// at campaignNodes return div key...
const CampaignList = function(props) {
    if(props.campaigns.length === 0) {
        return (
            <div className="campaignList">
                <h3 className="emptyCampaign">No campaigns created</h3>
            </div>
        );
    }

    const campaignNodes = props.campaigns.map(function(campaign) {
        return (
            <div key={campaign._id} className="campaign">
                <h3 className="campaignTitle"> {campaign.title} </h3>
                <p className="campaignGameSystem"> Game System: {campaign.gamesystem} </p>
                <p className="campaignSettingInfo"> Setting Info: {campaign.settinginfo} </p>
                <button type="button" className="editCampaignButton">Edit</button>
            </div>
        );
    });

    return (
        <div className="campaignList">
            {campaignNodes}
        </div>
    );
};

const loadCampaignsFromServer = () => {
    sendAjax('GET', '/getCampaigns', null, (data) => {
        ReactDOM.render(
            <CampaignList campaigns={data.campaigns} />, document.querySelector("#campaigns")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <NewCampaignForm csrf={csrf} />, document.querySelector("#campaignNotes")
    );

    ReactDOM.render(
        <CampaignList campaigns={[]} />, document.querySelector("#campaigns")
    );

    loadCampaignsFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});
