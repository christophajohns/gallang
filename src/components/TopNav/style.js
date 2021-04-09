import styled from "styled-components";

export const HeaderWrapper = styled.div`
    /* position: relative; */
    width: 100%;
    height: 55px;
    line-height: 55px;
    background-color: #fff;
    border-bottom: 2px;
    display: flex;
`;

export const LogoWrapper = styled.div`
    margin-left: 33%;
    width: 33%;
`;

export const ControlsWrapper = styled.div`
    display: flex;
    width: 33%;
`;

export const Logo = styled.div`
    position: relative;
    font-family: cursive;
    font-size: 30px;
    font-weight: bold;
    font-style: normal;
    text-align: center;
    text-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
    line-height: inherit;
    -webkit-font-smoothing: antialiased;
`;

export const SearchWrapper = styled.div`
    display: flex;
    margin-left: auto;

    .zoom {
        position: absolute;
        right: 30px;
        bottom: 6px;
        width: 30px;
        line-height: 30px;
        border-radius: 50%;
        text-align: center;
        &.focused {
            background: #777;
        }
    }
    & > form {
        display: flex;
    }
    & > form > * {
        margin-top: auto;
        margin-bottom: auto;
    }
`;

export const NavSearch = styled.input.attrs({
    placeholder: "Search",
})`
    position: relative;
    height: 32px;
    padding: 0 30px 0 20px;
    margin-right: 10px;
    box-sizing: border-box;
    border: none;
    outline: none;
    border-radius: 20px;
    background: #eee;
    font-size: 12px;
    color: #666;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
    :hover {
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }
    &::placeholder {
        color: #999;
    }
    &:focus {
        width: 200px;
        transition: width 0.1s ease-in-out;
    }
    &:not(:focus) {
        width: 150px;
        transition: width 0.1s ease-in-out;
    }
    &.slide-enter {
        width: 200px;
        transition: all 0.2s ease-out;
    }
    &.slide-enter-active {
        width: 250px;
    }
    &.slide-exit {
        transition: all 0.2s ease-out;
    }
    &.slide-exit-active {
        width: 200px;
    }
`;

export const AccountOptionsWrapper = styled.div`
    /* position: absolute; */
    margin: auto;
    margin-top: 5px;
    width: 70px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 0 0 10px 10px;
    box-sizing: border-box;
    z-index: 2;
`;

export const AccountWrapper = styled.div`
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 20px;
    margin-top: 10px;
    min-width: 70px;
    display: flex;
    flex-direction: column;
    & > ${AccountOptionsWrapper} {
        display: none;
    }
    &:hover > ${AccountOptionsWrapper} {
        display: block;
    }
`;

export const Account = styled.div`
    /* position: relative; */
    margin: auto;

    height: 36px;
    width: 36px;
    line-height: 32px;
    font-family: Georgia, "Times New Roman", Times, serif;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    border-radius: 50%;
    border: 2px solid #4c4c4c;
    text-align: center;
    cursor: pointer;
    -webkit-font-smoothing: antialiased;
`;

export const Option = styled.div`
    display: block;
    line-height: 15px;
    text-align: center;
    padding-bottom: 5px;
    margin-top: 10px;
    margin-bottom: 5px;
    margin-right: 3px;
    margin-left: 3px;
    font-size: 12px;
    color: #969696;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    :hover {
        font-weight: bold;
        text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    }
    z-index: 2;
`;
