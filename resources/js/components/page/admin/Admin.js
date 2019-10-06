import React, { Component } from "react";

export default class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        const Id = this.props.match.params.id;

        axios.get(`/api/user`).then(response => {
            this.setState({
                user: response.data
            });
        });
    }

    render() {
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header"> Admin Panel </div>
                            <div className="card-body">
                                <h1>
                                    Hello,
                                    <i>{this.state.user.name}</i>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
