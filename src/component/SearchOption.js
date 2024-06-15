import React, { useEffect, useState } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from 'react-router';

export const SearchOption = ({isMobile, menuList, onCheckEnter, showSearchOptBox, setShowSearchOptBox, searchQuery ,setSearchQuery}) => {
    const [checkboxes, setCheckboxes] = useState([false, false, false, false]);
    const [soldOutCheck, setSoldOutCheck] = useState(false);

    const handleCheckboxChange = (event, index) => {
        const { checked } = event.target;
        const updatedCheckBox = [...checkboxes];
        updatedCheckBox[index] = checked
        setCheckboxes(updatedCheckBox);

        if(checked)
        {
            switch(index)
            {
                case 0:
                    return setSearchQuery({...searchQuery,  priceMax: 1});
                case 1:
                    return setSearchQuery({...searchQuery, priceMin: 1, priceMax: 3}); 
                case 2:
                    return setSearchQuery({...searchQuery, priceMin: 3, priceMax: 5}); 
                case 3:
                    return setSearchQuery({...searchQuery, priceMin: 5, priceMax: 99}); 
            }
        }else setSearchQuery({...searchQuery, priceMin: 0, priceMax: 0});
    };

    const handlesoldOutChange = (event) => {
        const { checked } = event.target;

        setSoldOutCheck(checked);

        if(checked)
            return setSearchQuery({...searchQuery,  soldOut: true});
        else setSearchQuery({...searchQuery, soldOut: false});
    };

    const searchOption_init = () => {
        const updatedCheckBox = checkboxes.map(() => false);
        setCheckboxes(updatedCheckBox);
        setSoldOutCheck(false);
        setSearchQuery({category: "", name: "",priceMin: 0, priceMax: 0, soldOut: false});
    }

    const location = useLocation();
    if(location.pathname !== '/')
    {
        return <></>;
    }
 
    return (
        <div>
            <div className="nav-menu-area">
            <ul className="menu">
            {menuList.map((menu, index) => (
                <li key={index} style={{cursor: "pointer"}} onClick={() => setSearchQuery({...searchQuery, category: menu.toLowerCase()})}>
                    {`|  ${menu}  |`}
                </li>
            ))}
            </ul>
        
            {!isMobile && ( // admin페이지에서 같은 search-box스타일을 쓰고있음 그래서 여기서 서치박스 안보이는것 처리를 해줌
            <div className="landing-search-box ">
                <Container>
                    <Row><Col md={3}>
                        <div style={{cursor: "pointer"}} onClick={searchOption_init}>검색 조건 초기화</div>
                    </Col>
                    <Col md={8}>
                    <div className="search-box ">
                    <FontAwesomeIcon icon={faSearch} />
                    <input
                    type="text"
                    placeholder="제품검색"
                    onKeyDown={onCheckEnter}
                />
                    </div>
                    
                    </Col></Row>
                    
                </Container>
                
                
            </div>
            )}
        </div>

        <div className="nav-menu-area">
            <div className="landing-search-boxOpt"
                onClick={()=> setShowSearchOptBox(!showSearchOptBox)}
                style={{ cursor: "pointer" }}
            >
                {showSearchOptBox ? "상세 검색 옵션 닫기 ↑" : "상세 검색 옵션 열기 ↓"}
            </div>
        </div>
        
        {showSearchOptBox &&
        <div className="menu-serchOpt-Box">
            <Container>
                <Row>
                    <Col md={3}>
                        <label style={{marginLeft: "20px"}}>
                            <input
                                type="checkbox"
                                checked={checkboxes[0]}
                                disabled={checkboxes.includes(true) & !checkboxes[0]}
                                onChange={(event)=> handleCheckboxChange(event, 0)}
                            />
                             ~ 1만원
                        </label>
                    </Col>
                    <Col md={3}>
                        <label>
                            <input
                                type="checkbox"
                                checked={checkboxes[1]}
                                disabled={checkboxes.includes(true) & !checkboxes[1]}
                                onChange={(event)=> handleCheckboxChange(event, 1)}
                            />
                            1만원 ~ 3만원
                        </label>
                    </Col>
                    <Col md={3}>
                        <label>
                            <input
                                type="checkbox"
                                checked={checkboxes[2]}
                                disabled={checkboxes.includes(true) & !checkboxes[2]}
                                onChange={(event)=> handleCheckboxChange(event, 2)}
                            />
                            3만원 ~ 5만원
                        </label>
                    </Col>
                    <Col md={2}>
                        <label>
                            <input
                                type="checkbox"
                                checked={checkboxes[3]}
                                disabled={checkboxes.includes(true) & !checkboxes[3]}
                                onChange={(event)=> handleCheckboxChange(event, 3)}
                            />
                            5만원 ~
                        </label>
                    </Col>
                </Row>
                <Row>
                    <div style={{marginLeft: "20px"}}>
                        <label>
                            <input
                                type="checkbox"
                                checked={soldOutCheck}
                                onChange={handlesoldOutChange}
                            />
                            품절 상품 보지 않기
                        </label>
                    </div>
                </Row>
            </Container>
        </div>
        }
    </div>
  )
}
