import React, { Component } from "react";
import MenuDetailList from "./MenuDetailList";
import Loading from "../../_config/Loading";

class MenuDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            items: [],
            loading: true
        };
    }

    componentDidMount() {
        const productId = this.props.match.params.id;

        axios.get(`/api/product/${productId}`).then(response => {
            this.setState({
                items: response.data.product,
                menus: response.data.items,
                loading: false
            });
        });
    }

    render() {
        const { menus, items, loading } = this.state;
        const { shooping_cart } = this.props.childProps.childProps;
        return (
            <section className="about-area pt-60">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 mb-60">
                            <div className="section-title text-center">
                                <p>Famous for good food</p>
                                <h4>{items.product}</h4>
                            </div>
                        </div>
                    </div>
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="row">
                            {menus == ""
                                ? "No available menu"
                                : menus.map((menu, index) => (
                                      <MenuDetailList
                                          cart={shooping_cart}
                                          menu={menu}
                                          key={index}
                                      />
                                  ))}
                        </div>
                    )}
                </div>
            </section>
        );
    }
}

export default MenuDetail;
