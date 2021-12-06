let popUpOpen = false;

const handleSession = (e) => {
    e.preventDefault();

    if($("#sessionTitle").val() == '' || $("#number").val() == '' || $("#notes").val() == ''){
        handleError("All fields are required for session creation (Can be editted later)");
        return false;
    }

    sendAjax('POST', $("#newSessionForm").attr("action"), $("#newSessionForm").serialize(), function() {
        loadSessionsFromServer();
    });

    return false;
};

const editSession = (e) => {
    e.preventDefault();

    sendAjax('POST', $("#editSessionForm").attr("action"), $("#editSessionForm").serialize(), function() {
        loadSessionsFromServer();
    });
};

const EditSessionForm = (props) => {
    <form id="editSessionForm"
          onSubmit={editSession}
          name="editSessionForm"
          action="/sessionNotes"
          method="POST"
          className="editSessionForm"
    >

        <label htmlFor="title">Title: </label>
        <input id="sessionTitle" type="text" name="title" placeholder="Session Title"/>

        <label htmlFor="number">Session Number: </label>
        <input id="number" type="text" name="number" placeholder="Number"/>

        <label htmlFor="notes">Notes: </label>
        <textarea id="notes" name="notes" form="editSessionForm" placeholder="Notes"></textarea>

        <input type="hidden" name="_csrf" value={props.csrf}/>

        <input className="editSession" type="submit" value="Finish Editing" />
    </form>
};

const NewSessionForm = (props) => {
    return (
        <form id="newSessionForm"
              onSubmit={handleSession}
              name="newSessionForm"
              action="/sessionNotes"
              method="POST"
              className="newSessionForm"
        >

            <label htmlFor="title">Title: </label>
            <input id="sessionTitle" type="text" name="title" placeholder="Session Title"/>

            <label htmlFor="number">Session Number: </label>
            <input id="number" type="text" name="number" placeholder="Number"/>

            <label htmlFor="notes">Notes: </label>
            <textarea id="notes" name="notes" form="editSessionForm" placeholder="Notes"></textarea>

            <input type="hidden" name="_csrf" value={props.csrf}/>

            <input className="createSession" type="submit" value="Finish Editing" />
        </form>
    );
};


// Can add images to here with an image tag
////// COPY NewSessionForm AND ADD IT TO HERE FOR THE EDIT BUTTON
///// at sessionNodes return div key...
const SessionList = function(props) {
    if(props.sessions.length === 0) {
        return (
            <div className="sessionList">
                <h3 className="emptySession">No sessions created</h3>
            </div>
        );
    }

    const sessionNodes = props.sessions.map(function(session) {
        return (
            <div key={session._id} className="session">
                <h3 className="sessionTitle"> {session.title} </h3>
                <p className="sessionGameSystem"> Game System: {session.gamesystem} </p>
                <p className="sessionSettingInfo"> Setting Info: {session.settinginfo} </p>
                <button type="button" className="editSessionButton">Edit</button>
            </div>
        );
    });

    return (
        <div className="sessionList">
            {sessionNodes}
        </div>
    );
};

const loadSessionsFromServer = () => {
    sendAjax('GET', '/getSessions', null, (data) => {
        ReactDOM.render(
            <SessionList sessions={data.sessions} />, document.querySelector("#items")
        );
    });
};

const renderSessions = function(csrf) {
    ReactDOM.render(
        <NewSessionForm csrf={csrf} />, document.querySelector("#notes")
    );

    ReactDOM.render(
        <SessionList sessions={[]} />, document.querySelector("#items")
    );

    loadSessionsFromServer();
};
