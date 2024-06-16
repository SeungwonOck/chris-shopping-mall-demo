import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faBox,
  faSearch,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import { Button } from 'react-bootstrap';
import { productActions } from '../action/productAction';

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const { cartItemQty } = useSelector((state) => state.cart);
  const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [query, setQUery] = useSearchParams();
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");
  const name = query.get("name");
  const menuList = [
    "All",
    "Women",
    "Men",
    "Baby",
    "Kids",
    "Sports",
    "Sustainability",
  ];
  let [width, setWidth] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (!searchParams.has("name")) {
      setInputValue("");
    }
  }, [location]);

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        return navigate("/");
      }
      navigate(`?name=${event.target.value}`);
    }
  };

  const handleCategory = (menu) => {
    navigate("/");
    const menuLowerCase = menu ? menu.toLowerCase() : null;
    dispatch(productActions.getProductList({name}, menuLowerCase))
  }

  const logout = () => {
    dispatch(userActions.logout());
    navigate("/");
  };
  return (
    <div>
      {showSearchBox && (
        <div className="display-space-between mobile-search-box w-100">
          <div className="search display-space-between w-100">
            <div>
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
              <input
                type="text"
                placeholder="Product Search"
                onKeyPress={onCheckEnter}
              />
            </div>
            <button
              className="closebtn"
              onClick={() => setShowSearchBox(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <div className="side-menu" style={{ width: width }}>
        <button className="closebtn" onClick={() => setWidth(0)}>
          &times;
        </button>

        <div className="side-menu-list" id="menu-list">
          {menuList.map((menu, index) => (
            <button
              key={index}
              onClick={() => {
                setWidth(0)
                handleCategory(menu)
              }}
            >{menu}
            </button>
          ))}
        </div>
      </div>
      {user && user.level === "admin" && (
        <div className="link-area">
          <Button
            variant="dark"
            onClick={() => { navigate("/admin/product?page=1") }}
            >
            Admin page
          </Button>
        </div>
      )}
      <div className="nav-header">
        <div className="burger-menu hide">
          <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
        </div>

        <div>
          <div className="display-flex">
            {user ? (
              <div onClick={logout} className="nav-icon">
                <FontAwesomeIcon icon={faUser} />
                {!isMobile && (
                  <span style={{ cursor: "pointer" }}>Logout</span>
                )}
              </div>
            ) : (
              <div onClick={() => navigate("/login")} className="nav-icon">
                <FontAwesomeIcon icon={faUser} />
                {!isMobile && <span style={{ cursor: "pointer" }}>Login</span>}
              </div>
            )}
            <div onClick={() => navigate("/cart")} className="nav-icon">
              <FontAwesomeIcon icon={faShoppingBag} />
              {!isMobile &&(
                <span style={{ cursor: "pointer" }}>{`Cart(${
                  user && cartItemQty ? cartItemQty : 0
                })`}</span>
              )}
            </div>
            <div
              onClick={() => navigate("/account/purchase")}
              className="nav-icon"
            >
              <FontAwesomeIcon icon={faBox} />
              {!isMobile && <span style={{ cursor: "pointer" }}>My Order</span>}
            </div>
            {isMobile && (
              <div className="nav-icon" onClick={() => setShowSearchBox(true)}>
                <FontAwesomeIcon icon={faSearch} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="nav-logo">
        <Link to="/">
          <img width={100} src="/image/hm-logo.png" alt="hm-logo.png" />
        </Link>
      </div>
      <div className="nav-menu-area">
        <ul className="menu">
          {menuList.map((menu, index) => (
            <li key={index}>
              <a onClick={() => handleCategory(menu)}>{menu}</a>
            </li>
          ))}
        </ul>
        {!isMobile && (
          <div className="search-box landing-search-box ">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="Product Search"
              onKeyPress={onCheckEnter}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
