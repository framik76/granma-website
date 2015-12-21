import {FontIcon} from "material-ui";
import React, {Component, PropTypes} from "react";

export default class Icon extends Component {

    static propTypes = {
        className: PropTypes.string,
        icon: PropTypes.string.isRequired
    }

    static defaultProps = {
        className: ""
    }

    render () {
        const {icon, ...props} = this.props;
        return (
            <FontIcon
                {...props}
                className="material-icons"
            >
                {icon}
            </FontIcon>
        );
    }

}
