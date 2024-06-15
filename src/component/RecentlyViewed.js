import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { Link } from "react-router-dom";
import "../style/recentlyViewed.style.css";

const RecentlyViewed = () => {
    const dispatch = useDispatch();
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const { productList } = useSelector((state) => state.product);

    useEffect(() => {
        const takeOut = localStorage.getItem("Recently Viewed");
        if (takeOut) {
            setRecentlyViewed(JSON.parse(takeOut));
        }
    }, []);

    useEffect(() => {
        if (recentlyViewed.length > 0) {
            recentlyViewed.forEach((id) => {
                dispatch(productActions.getProductDetail(id));
            });
        }
    }, [dispatch, recentlyViewed]);

    return (
        <div className="recently-viewed-container">
            <h4>Recently Viewed</h4>
            {recentlyViewed.map((id) => {
                const product = productList.find((item) => item._id === id);
                return (
                    product && (
                        <div className="recently-viewed-item" key={id}>
                            <Link to={`/product/${id}`}>
                                <img src={product.image} alt={product.name} />
                                <p>{product.name}</p>
                            </Link>
                        </div>
                    )
                );
            })}
        </div>
    );
};

export default RecentlyViewed;
