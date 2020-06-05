import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLeads, deleteLead } from '../../actions/leads'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

export class Leads extends Component {

  static PropTypes = {
    leads: PropTypes.array.isRequired,
    getLeads: PropTypes.func.isRequired, // goot practice
    deleteLeads: PropTypes.func.isRequired,
  }
  
  componentDidMount() {
    this.props.getLeads();
  }
  
  render() {
    const tableStyle = { 
      table: {
        minWidth: 650,
      } 
    }

    return (
      <TableContainer component={Paper}>
        <Table className={tableStyle.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>name</TableCell>
              <TableCell>email</TableCell>
              <TableCell>message</TableCell>
              <TableCell>del</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell component="th" scope="row">{lead.id}</TableCell>
                <TableCell align="right">{lead.name}</TableCell>
                <TableCell align="right">{lead.email}</TableCell>
                <TableCell align="right">{lead.message}</TableCell>
                <TableCell align="right">
                  <Button 
                    size="small"
                    variant="outlined" 
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={this.props.deleteLead.bind(this, lead.id)}
                  >
                    {" "}
                    Borra
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

const mapStateToProps = state => ({
  leads: state.leads.leads
});

export default connect(
  mapStateToProps,
  { getLeads, deleteLead }
)(Leads);