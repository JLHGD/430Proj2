let popUpOpen = false;

const handleMisc = (e) => {
    e.preventDefault();

    if($("#miscTitle").val() == '' || $("#gameSystem").val() == '' || $("#settingInfo").val() == ''){
        handleError("All fields are required for misc creation (Can be editted later)");
        return false;
    }

    sendAjax('POST', $("#newMiscForm").attr("action"), $("#newMiscForm").serialize(), function() {
        loadMiscFromServer();
    });

    return false;
};

const editMisc = (e) => {
    e.preventDefault();

    sendAjax('POST', $("#editMiscForm").attr("action"), $("#editMiscForm").serialize(), function() {
        loadMiscFromServer();
    });
};

const EditMiscForm = (props) => {
    <form id="editMiscForm"
          onSubmit={editMisc}
          name="editMiscForm"
          action="/miscNotes"
          method="POST"
          className="editMiscForm"
    >

        <label htmlFor="title">Title: </label>
        <input id="miscTitle" type="text" name="title" placeholder="Misc Title"/>

        <label htmlFor="gamesystem">Game System: </label>
        <input id="gameSystem" type="text" name="gamesystem" placeholder="Game System"/>

        <label htmlFor="settinginfo">Setting Information: </label>
        <textarea id="settinginfo" name="settinginfo" form="editMiscForm" placeholder="Setting Information"></textarea>

        <input type="hidden" name="_csrf" value={props.csrf}/>

        <input className="editMisc" type="submit" value="Finish Editing" />
    </form>
};

const NewMiscForm = (props) => {
    return (
        <form id="newMiscForm"
              onSubmit={handleMisc}
              name="newMiscForm"
              action="/miscNotes"
              method="POST"
              className="newMiscForm"
        >

            <label htmlFor="title">Title: </label>
            <input id="miscTitle" type="text" name="title" placeholder="Misc Title"/>

            <label htmlFor="gamesystem">Game System: </label>
            <input id="gameSystem" type="text" name="gamesystem" placeholder="Game System"/>

            <label htmlFor="settinginfo">Setting Information: </label>
            <textarea id="settinginfo" name="settinginfo" form="newMiscForm" placeholder="Setting Information"></textarea>

            <input type="hidden" name="_csrf" value={props.csrf}/>

            <input className="createMisc" type="submit" value="Create" />
        </form>
    );
};


// Can add images to here with an image tag
////// COPY NewForm AND ADD IT TO HERE FOR THE EDIT BUTTON
///// at Nodes return div key...
const MiscList = function(props) {
    if(props.miscNotes.length === 0) {
        return (
            <div className="miscList">
                <h3 className="emptyMisc">No misc notes created</h3>
            </div>
        );
    }

    const miscNodes = props.miscNotes.map(function(misc) {
        return (
            <div key={misc._id} className="misc">
                <h3 className="miscTitle"> {misc.title} </h3>
                <p className="miscGameSystem"> Game System: {misc.gamesystem} </p>
                <p className="miscSettingInfo"> Setting Info: {misc.settinginfo} </p>
                <button type="button" className="editMiscButton">Edit</button>
            </div>
        );
    });

    return (
        <div className="miscList">
            {miscNodes}
        </div>
    );
};

const loadMiscFromServer = () => {
    sendAjax('GET', '/getMisc', null, (data) => {
        ReactDOM.render(
            <MiscList miscNotes={data.miscNotes} />, document.querySelector("#miscsNotes")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <NewMiscForm csrf={csrf} />, document.querySelector("#miscNotesForm")
    );

    ReactDOM.render(
        <CMiscList miscNotes={[]} />, document.querySelector("#miscsNotes")
    );

    loadMiscFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});
