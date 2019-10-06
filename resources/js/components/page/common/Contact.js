import React from "react";

const Contact = props => {
    function routeChange() {
        props.history.goBack();
    }

    return (
        <div className="content">
            <div className="wrapper-1">
                <div className="wrapper-2">
                    <h1 className="awesome">CONTACT</h1>
                    <h4 className="thanks">"Contact Person"</h4>
                    <p className="words">Thank You</p>
                    <p className="words">
                        Please visit <a href="https://ariesta.ga">My Site</a> to
                        contact me
                    </p>

                    <button className="go-home" onClick={routeChange}>
                        go back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Contact;
