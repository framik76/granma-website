import {autobind} from "core-decorators";
import {CircularProgress, FlatButton, Dialog, IconButton, Paper, RaisedButton, Table,
    TableHeader, TableBody, TableHeaderColumn, TableRow, TableRowColumn, TextField} from "material-ui";
import {last} from "ramda";
import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {replaceState} from "redux-router";
import {isEmpty} from "ramda";

import * as searchActions from "actions/search";
import * as commercialistiActions from "actions/commercialisti";
import * as AppPropTypes from "lib/app-prop-types";
import Icon from "components/icon";
import InviteForm from "components/invite-form";
import * as colors from "lib/colors";

const styles = {
    searchBox: {
        margin  : "10px",
        width   : "50%"
    },
    buttonsFooter: {
        textAlign: "right"
    }
};

function mapStateToProps ({auth, searchResults, router}) {
    return {
        auth,
        searchResults,
        router
    };
}

function mapDispatchToProps (dispatch) {
    return {
        ...bindActionCreators(searchActions, dispatch),
        ...bindActionCreators(commercialistiActions, dispatch),
        goToResults: (path) => {
            dispatch(replaceState(null, path + "/list"));
        },
        goToInvite: (path) => {
            dispatch(searchActions.addInviteReset());
            dispatch(replaceState(null, path + "/invite"));
        },
        goToSetCommercialista: (path) => {
            dispatch(replaceState(null, path + "/ricerca/new"));
        }
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Ricerca extends Component {

  static propTypes = {
      addInvite: PropTypes.func.isRequired,
      auth: PropTypes.object.isRequired,
      commercialisti: AppPropTypes.collection,
      fetchRicerca: PropTypes.func.isRequired,
      goToInvite: PropTypes.func.isRequired,
      goToResults: PropTypes.func.isRequired,
      goToSetCommercialista: PropTypes.func.isRequired,
      router: PropTypes.object.isRequired,
      searchResults: AppPropTypes.collection,
      setCommercialistaReset: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired
  }

  @autobind
  setCommercialista () {
      const {goToSetCommercialista, searchResults} = this.props;
      var path = this.props.router.location.pathname;
      const i = path.indexOf("/", 1);
      if (i > 1) {
          path = path.substring(0, i);
      }

      this.props.setCommercialistaReset(searchResults.elements.codiceFiscale, searchResults.elements.ragioneSociale);
      goToSetCommercialista(path);
  }

  @autobind
  doSearch (e) {
      if (e.target.id === "txtSearch" && e.key !== "Enter") {
          return;
      }
      const partitaIva = this.refs.partitaIva.getValue();
      this.props.fetchRicerca(this.props.auth.loginAuth, partitaIva);
      this.goToResults();
  }

  @autobind
  openInviteDialog () {
      this.goToInvite();
  }

  @autobind
  goToResults () {
      const {goToResults} = this.props;
      var path = this.props.router.location.pathname;
      const i = path.indexOf("/", 1);
      if (i > 1) {
          path = path.substring(0, i);
      }
      goToResults(path);
  }

  @autobind
  goToInvite () {
      const {goToInvite} = this.props;
      var path = this.props.router.location.pathname;
      const i = path.indexOf("/", 1);
      if (i > 1) {
          path = path.substring(0, i);
      }
      goToInvite(path);
  }

  @autobind
  handleSubmit (invito) {
      const {addInvite} = this.props;
      addInvite(this.props.auth.loginAuth, this.props.auth.loggedUser.idAzienda, invito);
  }

  renderTable (partitaIva, codiceFiscale, ragioneSociale) {
      const path = this.props.router.location.pathname;
      return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} enableSelectAll={false}>
          <TableRow>
            <TableHeaderColumn>{"Partita Iva"}</TableHeaderColumn>
            <TableHeaderColumn>{"Codice Fiscale"}</TableHeaderColumn>
            <TableHeaderColumn>{"Ragione Sociale"}</TableHeaderColumn>
            <TableHeaderColumn style={path.indexOf("/ricerca") >= 0 ? {display: "none"} : {display: "block"}}>{""}</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
            <TableRow>
                <TableRowColumn>{partitaIva}</TableRowColumn>
                <TableRowColumn>{codiceFiscale}</TableRowColumn>
                <TableRowColumn>{ragioneSociale}</TableRowColumn>
                <TableRowColumn style={path.indexOf("/ricerca") >= 0 ? {display: "none"} : {display: "block"}} tooltip="scegli come commercialista">
                    <IconButton iconClassName="material-icons" id="btSetCommercialista" onClick={this.setCommercialista}>
                            {"assignment_ind"}
                    </IconButton>
                </TableRowColumn>
            </TableRow>
        </TableBody>
      </Table>
    );
  }

  renderError (error) {
      return (
          <div>
              <div style={{margin: "10px"}}>
                  {error.message}
              </div>
          </div>
      );
  }

  renderInvite () {
      return (
            <div>
                <div style={{margin: "10px"}}>
                  {"La ricerca non ha dato risultati, tuttavia puoi invitare l'azienda ad accreditarsi al servizio"}
                </div>
                <RaisedButton backgroundColor={colors.teal500} disabled={true} label="Invita" onClick={this.openInviteDialog}
                    secondary={true}
                    style={{margin: "10px"}}
                />
            </div>
            );
  }

  renderResults () {
      const {searchResults, router: {routes}} = this.props;

      if (searchResults.fetchError != null) {
          this.renderError(searchResults.fetchError);
      }

      if (last(routes).name === "ricerca-list" || last(routes).name === "servizi-commercialista") {
          return isEmpty(searchResults.elements) ?
             this.renderInvite()
             : this.renderTable(searchResults.elements[0].partitaIva, searchResults.elements[0].codiceFiscale, searchResults.elements[0].ragioneSociale);
      } else {
          return null;
      }
  }

  renderInviteForm () {
      const {searchResults} = this.props;
      const renderForm = (
          !searchResults.isInviting &&
          !searchResults.lastInvited &&
          !searchResults.inviteError
      );
      return renderForm ? (
          <div>
              {"Inserisci l'indirizzo email dell'azienda che vuoi invitare, riceverà un invito per accreditarsi al servizio."}
              <InviteForm
                  formKey="invite"
                  onCancel={this.goToResults}
                  onSubmit={this.handleSubmit}
              />
          </div>
      ) : null;
  }

  renderInviteWaiting () {
      const {searchResults} = this.props;
      return searchResults.isInviting ? (
          <div style={{textAlign: "center", padding: "30px"}}>
              <CircularProgress mode="indeterminate" />
          </div>
      ) : null;
  }

  renderInviteError () {
      const {searchResults} = this.props;
      return searchResults.inviteError ? (
          <div style={{textAlign: "center", padding: "30px"}}>
              <Icon
                  color={colors.red500}
                  icon="error_outline"
                  style={{fontSize: "48px"}}
              />
              <p>
                  {"Errore durante l'invio dell'invito"}
              </p>
              <FlatButton label="Chiudi" onClick={this.goToResults} secondary={true} />
          </div>
      ) : null;
  }

  renderInviteSuccess () {
      const {searchResults} = this.props;
      return searchResults.lastInvited ? (
          <div style={{textAlign: "center", padding: "30px"}}>
              <Icon
                  color={colors.green500}
                  icon="done"
                  style={{fontSize: "48px"}}
              />
              <p>
                  {`
                      È stata inviata una mail di invito a
                      ${searchResults.lastInvited.email}
                  `}
              </p>
              <FlatButton label="Chiudi" onClick={this.goToResults} secondary={true} />
          </div>
      ) : null;
  }

  renderInviteDialog () {
      const {router: {routes}} = this.props;
      return (last(routes).name === "ricerca-invite" || last(routes).name === "servizi-commercialista-invite") ? (
          <Dialog
              modal={true}
              openImmediately={true}
              title="Invita ad accreditarsi"
          >
              {this.renderInviteForm()}
              {this.renderInviteWaiting()}
              {this.renderInviteError()}
              {this.renderInviteSuccess()}
          </Dialog>
      ) : null;
  }

    render () {
        const {title} = this.props;
        return (
            <div style={{padding: "30px"}}>
                <p>
                    <b>{title}</b>
                </p>
                <Paper>
                    <TextField hintText="inserisci la partita iva" id="txtSearch" onKeyPress={this.doSearch} ref="partitaIva"
                        style={styles.searchBox}
                    />
                    <IconButton iconClassName="material-icons" id="btSearch" onClick={this.doSearch} tooltip="cerca">
                        {"search"}
                    </IconButton>
                {this.renderResults()}
                {this.renderInviteDialog()}
                </Paper>
            </div>
        );
    }

}
