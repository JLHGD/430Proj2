const handleCampaign = (e) => {
    e.preventDefault();

    if($("#oldPass").val() == '' || $("#newPass").val() == '' || $("#newPassVerif").val() == ''){
        handleError("All fields are required to change password");
        return false;
    }

    sendAjax('POST', $("#changePassForm").attr("action"), $("#changePassForm").serialize(), redirect);

    return false;
};

const ChangePassForm = (props) => {
    return (
        <form id="changePassForm"
              onSubmit={handleCampaign}
              name="changePassForm"
              action="/changePass"
              method="POST"
              className="changePassForm"
        >

            <label htmlFor="oldPass">Old Password: </label>
            <input id="oldPass" type="password" name="oldPass" placeholder="Old Pass"/>

            <label htmlFor="newPass">New Password: </label>
            <input id="newPass" type="password" name="newPass" placeholder="New Pass"/>

            <label htmlFor="newPassVerif">Re-type New Password: </label>
            <input id="newPassVerif" type="password" name="newPassVerif" placeholder="Type New Pass Again"/>

            <input type="hidden" name="_csrf" value={props.csrf}/>

            <input className="changePassword" type="submit" value="Change Password" />
        </form>
    );
};

const renderChangePass = function(csrf){
    ReactDOM.render(
        <ChangePassForm csrf={csrf} />, document.querySelector("#notes")
    );
};
