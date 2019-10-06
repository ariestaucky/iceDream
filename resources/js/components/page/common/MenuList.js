import React from "react";
import { Link } from "react-router-dom";

const MenuList = props => {
    const { product } = props;

    return (
        <div className="col-lg-4 col-sm-6 portfolio-item">
            <img className="card-img-top" src={product.image} />

            <Link to={"/menu/" + product.id} data-featherlight={product.image}>
                <h2>{product.product}</h2>
            </Link>
        </div>
    );
};

export default MenuList;
