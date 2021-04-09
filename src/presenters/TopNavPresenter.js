import React from "react";
import { TopNav } from "../components";
import { promiseNoData } from "../components";
import { CooperHewittSource } from "../model";
import { usePromise } from "./customHooks";

function TopNavPresenter(props) {
    // State
    const [focused, setFocused] = React.useState(false);
    const [mouseIn, setMouseIn] = React.useState(false);
    const [options, setOptions] = React.useState(["Account", "Logout"]);
    const [searchInput, setSearchInput] = React.useState("");
    const [promise, setPromise] = React.useState(null);

    // Effects
    React.useEffect(() => {
        setPromise(CooperHewittSource.searchObjects({}));
    }, []);

    const [data, setData, error, setError] = usePromise(promise);

    return (
        <div>
            <TopNav
                focused={focused}
                mouseIn={mouseIn}
                options={options}
                onSearch={(e) => {
                    setData("");
                    setPromise(CooperHewittSource.searchObjects(searchInput));
                    e.preventDefault();
                }}
                handleChange={(txt) => setSearchInput(txt)}
                handleInputFocus={() => setFocused(true)}
                handleInputBlur={() => setFocused(false)}
                handleAccountMouseEnter={() => setMouseIn(true)}
                handleAccountMouseLeave={() => setMouseIn(false)}
            />
            {promiseNoData(promise, data, error) ||
                props.model.saveResults(data)}
        </div>
    );
}

export default TopNavPresenter;
