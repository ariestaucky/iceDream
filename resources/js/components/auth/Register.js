import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            loading: false,
            errors: []
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.length >= 8 &&
            this.state.username.length >= 3
        );
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        const { history } = this.props;

        this.setState({ loading: true });

        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        axios
            .post("/api/register", data)
            .then(response => {
                if (
                    response.data ==
                    "Something went wrong. Please try again in a moment"
                ) {
                    this.setState({
                        errors: response.data,
                        loading: false
                    });
                } else {
                    localStorage.setItem("token", response.data.token);
                    window.axios.defaults.headers.common["Authorization"] =
                        "Bearer " + localStorage.getItem("token");
                    this.props.childProps.childProps.userHasAuthenticated(
                        true,
                        response.data.token,
                        response.data.user
                    );
                    this.setState({ loading: false });
                    // redirect
                    if (response.data.user.role == "admin") {
                        history.push("/admin");
                    } else {
                        history.goBack();
                    }
                }
            })
            .catch(error => {
                console.log(error.response);
                this.setState({ loading: false });
                if (error.response.status == 422) {
                    this.setState({
                        errors: error.response.data.errors["email"]
                    });
                } else if (error.response.status == 500) {
                    this.setState({
                        errors: "Server error. Please try again in a moment"
                    });
                }
            });
    }

    renderError() {
        if (this.state.errors != []) {
            return (
                <span className="error-feedback">
                    <strong>{this.state.errors}</strong>
                </span>
            );
        } else {
            return;
        }
    }

    render() {
        return (
            <div className="container h-100 top-space">
                <div className="d-flex justify-content-center h-100">
                    <div className="user_card">
                        <div className="d-flex justify-content-center">
                            <div className="brand_logo_container">
                                <img
                                    src="https://res.cloudinary.com/teepublic/image/private/s--TrW_L0q---/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_c62b29,e_outline:48/co_c62b29,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1501534186/production/designs/1779893_1.jpg"
                                    className="brand_logo"
                                    alt="Logo"
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center form_container">
                            <form onSubmit={this.handleRegister}>
                                {this.renderError()}
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <i className="fas fa-user"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="form-control input_user"
                                        value={this.state.username}
                                        onChange={this.handleFieldChange}
                                        placeholder="username at least 3 char"
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        className="form-control input_user"
                                        value={this.state.email}
                                        onChange={this.handleFieldChange}
                                        placeholder="email"
                                    />
                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <i className="fas fa-key"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="form-control input_pass"
                                        value={this.state.password}
                                        onChange={this.handleFieldChange}
                                        placeholder="password minimum 8"
                                    />
                                </div>

                                <div className="mt-3 login_container">
                                    {this.state.loading ? (
                                        <button
                                            type="button"
                                            name="button"
                                            className="btn login_btn"
                                            disabled="disabled"
                                        >
                                            <i className="fas fa-spinner fa-pulse load-circle"></i>{" "}
                                            <p className="load-process">
                                                Processing...
                                            </p>
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            name="button"
                                            className="btn login_btn"
                                            disabled={!this.validateForm()}
                                        >
                                            Register
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                        <div className="mt-4">
                            <div className="d-flex justify-content-center links">
                                Already have an account?{" "}
                                <Link to="/login" className="ml-2">
                                    Log In
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
