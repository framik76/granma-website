import {PropTypes} from "react";

export const collection = PropTypes.shape({
    elements: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchError: PropTypes.any
});

export const auth = PropTypes.shape({
    loggingIn: PropTypes.bool.isRequired,
    loginError: PropTypes.any,
    loginAuth: PropTypes.any
});
