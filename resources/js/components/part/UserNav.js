import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Panel from "./Panel";

class UserNav extends Component {
    handleLogut(e) {
        e.preventDefault();

        axios.get("/api/logout").then(response => {
            if (response.data.message == "Successfully logged out.") {
                localStorage.removeItem("token");
                this.props.childProps.auth.userHasAuthenticated(
                    false,
                    null,
                    null
                );
                this.props.childProps.history.push("/");
            }
        });
    }

    render() {
        const { childProps } = this.props;

        return (
            <Fragment>
                {childProps.auth.isLogged == true ? (
                    <Panel
                        logout={this.handleLogut.bind(this)}
                        childprops={childProps}
                    />
                ) : (
                    <Fragment>
                        {childProps.click ? (
                            <ul className="navbar-nav side-navbar">
                                <li className="navbar-item">
                                    <Link
                                        className="nav-link"
                                        to="/menu"
                                        onClick={childProps.click}
                                    >
                                        Menu
                                    </Link>
                                </li>
                                <li className="navbar-item">
                                    <Link
                                        className="nav-link"
                                        to="/about"
                                        onClick={childProps.click}
                                    >
                                        About
                                    </Link>
                                </li>
                                <li className="navbar-item">
                                    <Link
                                        className="nav-link"
                                        to="/contact"
                                        onClick={childProps.click}
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <hr className="separator" />
                                <li className="navbar-item">
                                    <Link
                                        className="nav-link"
                                        to="/login"
                                        onClick={childProps.click}
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li className="navbar-item">
                                    <Link
                                        className="nav-link"
                                        to="/register"
                                        onClick={childProps.click}
                                    >
                                        Register
                                    </Link>
                                </li>
                            </ul>
                        ) : (
                            <Fragment>
                                <li className="navbar-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="navbar-item">
                                    <Link className="nav-link" to="/register">
                                        Register
                                    </Link>
                                </li>
                            </Fragment>
                        )}
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

export default UserNav;
