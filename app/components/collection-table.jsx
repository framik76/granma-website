import {title} from "change-case";
import {autobind} from "core-decorators";
import * as ui from "material-ui";
import {is, partial} from "ramda";
import React, {Component, PropTypes} from "react";

import Icon from "components/icon";
import * as AppPropTypes from "lib/app-prop-types";
import * as colors from "lib/colors";

export default class CollectionTable extends Component {

    static propTypes = {
        addButtonText: PropTypes.string,
        collection: AppPropTypes.collection,
        columns: PropTypes.array.isRequired,
        elementKeyProperty: PropTypes.string.isRequired,
        isDisplayableRowCheckbox: PropTypes.bool,
        onAdd: PropTypes.func,
        onlyOne: PropTypes.bool
    };

    static defaultProps = {
        addButtonText: "Aggiungi"
    };

    renderHeaderCell (column) {
        const isString = is(String, column);
        column === "idUnivoco" ? column = "partitaIva" : column = column;
        return (
            <ui.TableHeaderColumn key={isString ? column : column.propertyName}>
                {isString ? title(column) : column.getHeaderContent(column.propertyName)}
            </ui.TableHeaderColumn>
        );
    }

    @autobind
    renderHeader () {
        const {columns} = this.props;
        return (
            <ui.TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <ui.TableRow>
                    {columns.map(this.renderHeaderCell)}
                </ui.TableRow>
            </ui.TableHeader>
        );
    }

    renderBodyCell (element, column) {
        const isString = is(String, column);
        return (
            <ui.TableRowColumn key={isString ? column : column.propertyName}>
                {
                    isString ?
                    element[column] :
                    column.getCellContent(element[column.propertyName])
                }
            </ui.TableRowColumn>
        );
    }

    @autobind
    renderBodyRow (element) {
        const {columns, elementKeyProperty} = this.props;
        return (
            <ui.TableRow key={element[elementKeyProperty]}>
                {columns.map(partial(this.renderBodyCell, [element]))}
            </ui.TableRow>
        );
    }

    renderBody () {
        const {collection: {elements}, onlyOne, isDisplayableRowCheckbox} = this.props;
        return (
            <ui.TableBody displayRowCheckbox={isDisplayableRowCheckbox}>
                {onlyOne ? elements.slice(0, 1).map(this.renderBodyRow) : elements.map(this.renderBodyRow)}
            </ui.TableBody>
        );
    }

    renderFooter () {
        const {addButtonText, onAdd} = this.props;
        return typeof onAdd !== "undefined" ? (
            <ui.TableFooter adjustForCheckbox={false} displaySelectAll={false}>
                <ui.TableRow>
                    <ui.TableRowColumn
                        style={{
                            paddingBottom: "15px",
                            textAlign: "right"
                        }}
                    >
                        <ui.FlatButton
                            label={addButtonText}
                            onTouchTap={onAdd}
                            style={{color: colors.teal500}}
                        />
                    </ui.TableRowColumn>
                </ui.TableRow>
            </ui.TableFooter>
        ) : null;
    }

    renderError () {
        const {collection: {fetchError}} = this.props;
        return fetchError ? (
            <div style={{textAlign: "center", padding: "30px"}}>
                <Icon
                    color={colors.red500}
                    icon="error_outline"
                    style={{fontSize: "48px"}}
                />
                <p>{fetchError.message}</p>
            </div>
        ) : null;
    }

    renderSpinner () {
        const {collection: {isFetching}} = this.props;
        return isFetching ? (
            <div style={{textAlign: "center", padding: "30px"}}>
                <p>{"Caricamento"}</p>
                <ui.CircularProgress mode="indeterminate" />
            </div>
        ) : null;
    }

    renderTable () {
        const {collection: {isFetching, fetchError}} = this.props;
        return !isFetching && !fetchError ? (
            <ui.Table>
                {this.renderHeader()}
                {this.renderBody()}
                {this.renderFooter()}
            </ui.Table>
        ) : null;
    }

    render () {
        return (
            <div>
                {this.renderSpinner()}
                {this.renderTable()}
                {this.renderError()}
            </div>
        );
    }

}
