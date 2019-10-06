import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Panel = props => {
    if (props.childprops.auth.user.role == "admin") {
        return (
            <Fragment>
                {props.childprops.click ? (
                    <ul className="navbar-nav side-navbar">
                        <li className="navbar-item">
                            <Link
                                className="nav-link"
                                to="/product"
                                onClick={props.childprops.click}
                            >
                                Product
                            </Link>
                            <Link
                                className="nav-link"
                                to={"/admin"}
                                onClick={props.childprops.click}
                            >
                                Admin Panel
                            </Link>
                            <hr className="separator" />
                            <a
                                href=""
                                className="nav-link"
                                onClick={props.logout}
                            >
                                Logout
                            </a>
                        </li>
                    </ul>
                ) : (
                    <Fragment>
                        <li className="navbar-item">
                            <Link className="nav-link" to="/product">
                                Product
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="nav-link" to={"/admin"}>
                                Admin Panel
                            </Link>
                        </li>
                        <li className="navbar-item dropdown">
                            <a
                                className="nav-link no-padding"
                                href="#"
                                id="dropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <span>
                                    {props.childprops.auth.user.name}{" "}
                                    <i className="fas fa-caret-down"></i>
                                </span>
                            </a>
                            <div
                                className="dropdown-menu dropdown-menu-right"
                                aria-labelledby="dropdownMenuLink"
                            >
                                <a className="nav-link dropdown-link" href="#">
                                    Action
                                </a>
                                <a className="nav-link dropdown-link" href="#">
                                    Another action
                                </a>
                                <a className="nav-link dropdown-link" href="#">
                                    Something else here
                                </a>
                                <hr className="separator drpdwn" />
                                <a
                                    href="#"
                                    className="nav-link dropdown-link"
                                    onClick={props.logout}
                                >
                                    Logout
                                </a>
                            </div>
                        </li>
                    </Fragment>
                )}
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                {props.childprops.click ? (
                    <ul className="navbar-nav side-navbar">
                        <li className="navbar-item">
                            <Link
                                className="nav-link"
                                to="/menu"
                                onClick={props.childprops.click}
                            >
                                Menu
                            </Link>
                            <Link
                                className="nav-link"
                                to="#"
                                onClick={props.childprops.click}
                            >
                                Profile
                            </Link>
                            <Link
                                className="nav-link"
                                to="#"
                                onClick={props.childprops.click}
                            >
                                History
                            </Link>
                            <hr className="separator" />
                            <Link
                                className="nav-link"
                                to="/about"
                                onClick={props.childprops.click}
                            >
                                About
                            </Link>
                            <Link
                                className="nav-link"
                                to="/contact"
                                onClick={props.childprops.click}
                            >
                                Contact
                            </Link>
                            <a
                                href=""
                                className="nav-link"
                                onClick={props.logout}
                            >
                                Logout
                            </a>
                        </li>
                    </ul>
                ) : (
                    <Fragment>
                        <li className="navbar-item dropdown">
                            <a
                                className="nav-link no-padding"
                                href="#"
                                id="dropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <span>
                                    {props.childprops.auth.user.name}{" "}
                                    <i className="fas fa-caret-down"></i>
                                </span>
                            </a>
                            <div
                                className="dropdown-menu dropdown-menu-right"
                                aria-labelledby="dropdownMenuLink"
                            >
                                <Link className="nav-link dropdown-link" to="#">
                                    Profile
                                </Link>
                                <Link className="nav-link dropdown-link" to="#">
                                    History
                                </Link>
                                <hr className="separator drpdwn" />
                                <a
                                    href="#"
                                    className="nav-link dropdown-link"
                                    onClick={props.logout}
                                >
                                    Logout
                                </a>
                            </div>
                        </li>
                    </Fragment>
                )}
            </Fragment>
        );
    }
};

export default Panel;
