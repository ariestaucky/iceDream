import React from "react";
import { withRouter } from "react-router-dom";

const Footer = props => {
    if (props.location.pathname == "/cart")
        return (
            <footer className="text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-lg-9 col-xl-9">
                            <div className="row">
                                <div className="col-md-6 col-lg-6 col-xl-6 mx-auto">
                                    <h5>Informations</h5>
                                    <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25" />
                                    <ul className="list-unstyled">
                                        <li>
                                            <a href="">About</a>
                                        </li>
                                        <li>
                                            <a href="">Privacy</a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-md-6 col-lg-6 col-xl-6 mx-auto">
                                    <h5>Others links</h5>
                                    <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25" />
                                    <ul className="list-unstyled">
                                        <li>
                                            <a href="">Medsos</a>
                                        </li>
                                        <li>
                                            <a href="">Artikel</a>
                                        </li>
                                        <li>
                                            <a href="">Quizion</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3">
                            <h5>Contact</h5>
                            <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25" />
                            <ul className="list-unstyled">
                                <li>
                                    <i className="fa fa-home mr-2"></i> Ariesta
                                    Ucky
                                </li>
                                <li>
                                    <i className="fa fa-envelope mr-2"></i>
                                    ariestaucky@gmail.com
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 copyright mt-3">
                            <p className="float-left">
                                <a href="#top">Back to top</a>
                            </p>
                            <p className="text-right text-muted">
                                created with <i className="fa fa-heart"></i> by
                                <a href="https://ariesta.ga">
                                    <i>ariesta</i>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    else return null;
};

export default withRouter(Footer);
