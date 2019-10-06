import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import UserNav from "./UserNav";

const SideDraw = props => {
    let sideDrawerClass = "side-drawer";
    if (props.show) {
        sideDrawerClass = "side-drawer open";
    }
    return (
        <Fragment>
            <nav className={sideDrawerClass}>
                <div className="closebtn">
                    <i className="fas fa-times" onClick={props.click}></i>
                </div>
                <UserNav childProps={props} />
            </nav>
        </Fragment>
    );
};

export default withRouter(SideDraw);
