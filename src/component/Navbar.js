import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faLock,
  faBars,
  faBox,
  faSearch,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { SearchOption } from './SearchOption';
import { userActions } from "../action/userAction";
import { cartActions } from "../action/cartAction";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const { cartItemQty } = useSelector((state) => state.cart);
  const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showSearchOptBox, setShowSearchOptBox] = useState(true);
  const menuList = [
    "전체",
    "Top",
    "Dress",
    "Pants",
  ];
  let [width, setWidth] = useState(0);
  let navigate = useNavigate();

  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    category: query.get("category") || "",
    name: query.get("name") || "",
    priceMin: query.get("priceMin") || 0,
    priceMax: query.get("priceMax") || 0,
    soldOut: query.get("soldOut") || false,
  }); //검색 조건들을 저장하는 객체

  const initSearchQuery = () => {
    setSearchQuery({
      category: query.get("category") || "",
      name: query.get("name") || "",
      priceMin: query.get("priceMin") || 0,
      priceMax: query.get("priceMax") || 0,
      soldOut: query.get("soldOut") || false,
    })
  };

  useEffect(() => {
    //검색어나 페이지가 바뀌면 url바꿔주기 (검색어또는 페이지가 바뀜 => url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기)
    if(searchQuery.category === "" || searchQuery.category === "전체")
      delete searchQuery.category
    if(searchQuery.name === "")
      delete searchQuery.name
    if(searchQuery.priceMin === 0)
      delete searchQuery.priceMin
    if(searchQuery.priceMax === 0)
      delete searchQuery.priceMax
    if(searchQuery.soldOut === false)
      delete searchQuery.soldOut
    
    const params = new URLSearchParams(searchQuery);
    const _query = params.toString();
    navigate("?" + _query);
  }, [searchQuery]);

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      setSearchQuery({...searchQuery, name: event.target.value});
      // if (event.target.value === "") {
      //   return navigate("/");
      // }
      // navigate(`?name=${event.target.value}`);
    }
  };

  const logout = () => {
    dispatch(userActions.logout());
  };

  const shoppingBagClick = () => {
    if(!user)
      return navigate('/login');
    navigate("/cart");
  }

  return (
    <div>
      {showSearchBox && (
        <div className="display-space-between mobile-search-box w-100">
          <div className="search display-space-between w-100">
            <div>
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
              <input
                type="text"
                placeholder="제품검색"
                // onKeyPress={onCheckEnter}
                onKeyDown={onCheckEnter}
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
            <button key={index} onClick={() => setSearchQuery({...searchQuery, category: menu.toLowerCase()})}>{menu}</button>
          ))}
        </div>
      </div>

      <div className="nav-header">
        <div className="burger-menu" style={{cursor: "pointer"}}onClick={() => setWidth(200)}>
          <FontAwesomeIcon icon={faBars} />
           {"  분류"}
        </div>

        <div>
          <div className="display-flex">
            {user && user.level === "admin" && (
              <div onClick={() => navigate('/admin/product?page=1')} className="nav-icon">
                <FontAwesomeIcon icon={faLock} />
                {!isMobile && (
                  <span style={{ cursor: "pointer" }}>관리자 Page</span>
                )}
              </div>
            )}

            |

            {user ? (
              <div onClick={logout} className="nav-icon">
                <FontAwesomeIcon icon={faUser} />
                {!isMobile && (
                  <span style={{ cursor: "pointer" }}>로그아웃</span>
                )}
              </div>
            ) : (
              <div onClick={() => navigate("/login")} className="nav-icon">
                <FontAwesomeIcon icon={faUser} />
                {!isMobile && <span style={{ cursor: "pointer" }}>로그인</span>}
              </div>
            )}

            |

            <div onClick={() => shoppingBagClick()} className="nav-icon">
              <FontAwesomeIcon icon={faShoppingBag} />
              {!isMobile && (
                <span style={{ cursor: "pointer" }}>{`쇼핑백(${
                  cartItemQty || 0
                })`}</span>
              )}
            </div>

            |

            <div
              onClick={() => navigate("/account/purchase")}
              className="nav-icon"
            >
              <FontAwesomeIcon icon={faBox} />
              {!isMobile && <span style={{ cursor: "pointer" }}>내 주문</span>}
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

      <SearchOption
        isMobile={isMobile}
        menuList={menuList}
        onCheckEnter={onCheckEnter}
        showSearchOptBox={showSearchOptBox}
        setShowSearchOptBox={setShowSearchOptBox}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

    </div>
  );
};

export default Navbar;
