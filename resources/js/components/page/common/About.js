import React from "react";

const About = props => {
    function routeChange() {
        props.history.goBack();
    }

    return (
        <div className="content">
            <div className="wrapper-1">
                <div className="wrapper-2">
                    <h1 className="awesome">ABOUT</h1>
                    <h4 className="thanks">"About this site"</h4>
                    <p className="words">This is just a project site</p>
                    <p className="words">
                        Created using React as front-end and Laravel as
                        back-end. Visit my{" "}
                        <a href="https://github.com/ariestaucky/iceDream">
                            Github
                        </a>{" "}
                        to see the source code
                    </p>
                    <br />
                    <p className="words">Sincerely,</p>
                    <p className="words">Ariesta Ucky.</p>

                    <button className="go-home" onClick={routeChange}>
                        go back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;
