import React, {Component, PropTypes} from "react";

export default class Spacer extends Component {

    static propTypes = {
        direction: PropTypes.oneOf(["h", "v"]).isRequired,
        size: PropTypes.number.isRequired
    }

    renderH () {
        return (
            <span
                style={{
                    display: "inline-block",
                    width: this.props.size + "px"
                }}
            />
        );
    }

    renderV () {
        return (
            <div
                style={{
                    width: "100%",
                    height: this.props.size + "px"
                }}
            />
        );
    }

    render () {
        return this[`render${this.props.direction.toUpperCase()}`]();
    }

}
