const ChangingAdvertisement = (props) => {
        if(window.location.pathname === '/campaignNotes'){
            return (<a href="https://www.google.com/"><img src="assets/img/ad1.png" alt="Advertisement 1"/></a>);
        }
        else if(window.location.pathname === '/playerNotes'){
            return (<a href="https://www.google.com/"><img src="assets/img/ad2.png" alt="Advertisement 2"/></a>);
        }
        else{
            return (<a href="https://www.google.com/"><img src="assets/img/ad3.png" alt="Advertisement 3"/></a>);
        }
};

const renderAds = function(csrf){
    ReactDOM.render(
        <ChangingAdvertisement csrf={csrf} />, document.querySelector("#ads")
    );
};
