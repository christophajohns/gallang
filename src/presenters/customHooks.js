import React from "react";
import { useLocation } from "react-router-dom";
import { AuthenticationModel } from "../model";

/**
 * Custom hook to provide a presenter with access to a model property (including the observer patterns)
 * @param {GallangModel} model - The main application model
 * @param {string} propertyName - A model property (e.g. recentlyViewedImageIDs)
 * @returns Value of accessed property
 */
function useModelProperty(model, propertyName) {
    // custom hook
    const [value, setValue] = React.useState(model[propertyName]);
    React.useEffect(
        function () {
            function obs() {
                setValue(model[propertyName]);
            }
            model.addObserver(obs);
            return function () {
                model.removeObserver(obs);
            };
        },
        [model, propertyName]
    ); // though model never changes
    return value;
}

/**
 * Custom hook to provide standardized access to data and error for a promise
 * @param {Promise} promise - Promise to be resolved into data or error
 * @returns Array of state (data, error) and setters (setData, setError)
 */
function usePromise(promise) {
    // custom hook
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const promiseData = await promise;
                setData(promiseData);
            } catch (promiseError) {
                setError(promiseError);
            }
        }
        fetchData();
    }, [promise]);

    return [data, setData, error, setError];
}

/** Custom hook to access search specification (e.g search query string) from the URL at the /search route */
function useURLSearchParams() {
    return new URLSearchParams(useLocation().search); // ".search" means it will only work at the /search route
}

/**
 * Custom hook to access the current user from the authentication model
 * @param {boolean} [returnJSON = false] - Flag whether to return firebase.auth.User or JSON object
 */
function useCurrentUser(returnJSON = false) {
    const [currentUser, setCurrentUser] = React.useState(
        returnJSON && AuthenticationModel.currentUser
            ? AuthenticationModel.currentUser.toJSON()
            : AuthenticationModel.currentUser
    );

    // Subscribe to changes in the authentication model on creation
    React.useEffect(() => {
        const unsubscribeFromAuthState = AuthenticationModel.onIdTokenChanged(
            (user) => {
                if (user) setCurrentUser(returnJSON ? user.toJSON() : user);
            }
        );
        return unsubscribeFromAuthState; // unsubscribe on teardown
    }, [returnJSON]);

    return currentUser;
}

export { useModelProperty, usePromise, useURLSearchParams, useCurrentUser };
