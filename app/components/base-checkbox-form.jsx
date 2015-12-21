import {Checkbox} from "material-ui";
import React, {Component, PropTypes} from "react";
import {map} from "lodash";

export default class BaseCheckboxForm extends Component {

    constructor (props, context) {
        super(props, context);
        this.store = context.store;
    }

    static propTypes = {
        fields: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.array.isRequired
    }

    onCheck (e, field) {
        return () => {
            const {onChange, value} = this.props;
            for (var i=0; i<value.length; i++) {
                if (value[i].payload === field.payload) {
                    value[i].value = !value[i].value;
                }
            }
            onChange(value);
        };
    }

    render () {
        const {fields} = this.props;
        return (
            <div>
                {map(fields, field =>
                    <Checkbox
                        label={field.text}
                        name={field.payload}
                        onCheck={this.onCheck(this, field)}
                        value={field.value}
                        {...field}
                    />
                    )
                }
            </div>
        );
    }
}
