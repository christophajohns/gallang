import React from "react";
import { CSSTransition } from "react-transition-group";
import * as Icon from "react-bootstrap-icons";
import {
    HeaderWrapper,
    Logo,
    SearchWrapper,
    NavSearch,
    AccountWrapper,
    Account,
    AccountOptionsWrapper,
    Option,
    LogoWrapper,
    ControlsWrapper,
} from "./style";

function TopNav(props) {
    const {
        focused,
        mouseIn,
        options,
        onSearch,
        handleChange,
        handleInputFocus,
        handleInputBlur,
        handleAccountMouseEnter,
        handleAccountMouseLeave,
    } = props;

    return (
        <div>
            <HeaderWrapper>
                <LogoWrapper>
                    <Logo>Gallang</Logo>
                </LogoWrapper>

                <ControlsWrapper>
                    <SearchWrapper>
                        {/* <CSSTransition
                    in={focused}
                    timeout={200}
                    className="slide"
                > */}
                        <form onSubmit={onSearch}>
                            <NavSearch
                                // className={focused ? 'focused' : ''}
                                // onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                onChange={(e) => handleChange(e.target.value)}
                            />
                            <Icon.Search></Icon.Search>
                        </form>

                        {/* </CSSTransition> */}
                    </SearchWrapper>
                    <AccountWrapper onMouseEnter={handleAccountMouseEnter}>
                        <Account>G</Account>
                        {
                            <AccountOptionsWrapper
                                // show = {mouseIn}
                                onMouseLeave={handleAccountMouseLeave}
                            >
                                {options.map((option) => {
                                    return (
                                        <Option key={option}>{option}</Option>
                                    );
                                })}
                            </AccountOptionsWrapper>
                        }
                    </AccountWrapper>
                </ControlsWrapper>
            </HeaderWrapper>
        </div>
    );
}

export default TopNav;
