import React from "react";

const Checkout = props => {
    function routeChange() {
        props.history.push("/menu");
    }

    return (
        <div className="content">
            <div className="wrapper-1">
                <div className="wrapper-2">
                    <h1 className="awesome">Awesome !</h1>
                    <h4 className="thanks">Thank you! For trying this site.</h4>
                    <p className="words">
                        If you find some errors, please let me know by visiting{" "}
                        <a href="https://ariesta.ga">My Site</a> or take a peek
                        the source code at my{" "}
                        <a href="https://github.com/ariestaucky/iceDream">
                            Github
                        </a>
                        .
                    </p>

                    <button className="go-home" onClick={routeChange}>
                        go back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
