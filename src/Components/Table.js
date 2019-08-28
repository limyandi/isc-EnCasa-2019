// import React from 'react';
// import MaterialTable from 'material-table';

// export default function MaterialTableDemo() {
// }
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
}));

const MyTable = props => {
  const classes = useStyles();

  const { data } = props;

  const MyTableHeader = () => {
    return (
      <TableHead>
        <TableRow>
          {Object.keys(data[0]).map(columnHeader => (
            <StyledTableCell>{columnHeader}</StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const MyTableBody = () => {
    return (
      <TableBody>
        {data.map(oneData => {
          return (
            <StyledTableRow>
              {/* {oneData.map(columnName => (
                <StyledTableCell align="right">
                  {oneData[columnName]}
                </StyledTableCell>
              ))} */}
              {Object.keys(oneData).map(key => {
                if (key === 'status') {
                  // if the status text is true or false (ternary operator)
                  const statusText = oneData[key]
                    ? 'Progressing'
                    : 'Unassigned';
                  return (
                    <StyledTableCell align="right">
                      {statusText}
                    </StyledTableCell>
                  );
                }
                return (
                  <StyledTableCell align="right">
                    {oneData[key]}
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>
          );
        })}
      </TableBody>
    );
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <MyTableHeader />
        <MyTableBody />
      </Table>
    </Paper>
  );
};

export default MyTable;
