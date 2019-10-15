import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Header from "./part/Header";
import SideDraw from "./part/Sidebar";
import Backdrop from "./part/Backdrop";
import Footer from "./part/Footer";
import CartButton from "./_config/CartButton";
import Routes from "./_config/Routes";

export default class Layouts extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            isLogged: false,
            cart: 0,
            token: localStorage.getItem("token") || null,
            sideDrawOpen: false
        };
    }

    // componentDidMount() {
    //     let cart = localStorage.getItem("cart");
    //     if (this.state.token !== null) {
    //         axios
    //             .post("/api/check")
    //             .then(response => {
    //                 this.userHasAuthenticated(
    //                     true,
    //                     response.data.token,
    //                     response.data.user
    //                 );
    //                 localStorage.setItem("token", response.data.token);
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //                 localStorage.removeItem("token");
    //                 // this.setState({
    //                 //     errors: error.response.data.errors
    //                 // });
    //             });
    //     } else if (cart) {
    //         console.log("mount");
    //         const shooping = JSON.parse(cart);
    //         var count = Object.keys(shooping).length;
    //         this.shooping_cart(count);
    //     } else {
    //         return;
    //     }
    // }

    drawerToggleClickedHandler = () => {
        this.setState(prevState => {
            return { sideDrawOpen: !prevState.sideDrawOpen };
        });
    };

    backDropClickedHandler = () => {
        this.setState({ sideDrawOpen: false });
    };

    shooping_cart = count => {
        this.setState({ cart: count });
    };

    userHasAuthenticated = (authenticated, token, user) => {
        this.setState({
            isLogged: authenticated,
            token: token,
            user: user
        });
    };

    render() {
        let backDrop;

        const childProps = {
            user: this.state.user,
            isLogged: this.state.isLogged,
            shooping_cart: this.shooping_cart,
            cart: this.state.cart,
            token: this.state.token,
            userHasAuthenticated: this.userHasAuthenticated,
            drawerToggleClickedHandler: this.drawerToggleClickedHandler
        };

        if (this.state.sideDrawOpen) {
            backDrop = <Backdrop click={this.backDropClickedHandler} />;
        }

        return (
            <BrowserRouter>
                <SideDraw
                    show={this.state.sideDrawOpen}
                    click={this.backDropClickedHandler}
                    auth={childProps}
                />
                {backDrop}
                <main className="mybg">
                    <Header auth={childProps} />
                    <section id="photos">
                        <Routes childProps={childProps} />
                        <CartButton auth={childProps} />
                    </section>
                    <Footer />
                </main>
            </BrowserRouter>
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(<Layouts />, document.getElementById("app"));
}
