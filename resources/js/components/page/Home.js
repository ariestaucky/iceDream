import { Link } from "react-router-dom";
import React, { Component } from "react";

class Home extends Component {
    render() {
        return (
            <div className="flex-center position-ref bg">
                <div className="content">
                    <div className="row">
                        <div className="col-xl-9 mx-auto mt-5">
                            <h1 className="mb-5 text-white">IceDREAM</h1>
                        </div>
                        <div className="col-xl-12 mx-auto order-now my-padding">
                            <Link to="/menu">Order Now!</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
