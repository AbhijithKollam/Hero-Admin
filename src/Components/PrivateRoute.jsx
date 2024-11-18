import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = JSON.parse(localStorage.getItem('existingUser'));
    console.log(isAuthenticated, "is auth in private");

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <Element {...rest} />;
};

export default PrivateRoute;
