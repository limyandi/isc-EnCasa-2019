// import React from 'react';
// import MaterialTable from 'material-table';

// export default function MaterialTableDemo() {
// }
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import MyButton from './Button';

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
    // width: '100%',
    display: 'inline-block'
    // marginTop: theme.spacing(3),
    // overflowX: 'auto'
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 200,
    maxWidth: 1000
  }
}));

const MyTable = props => {
  const classes = useStyles();

  // either just pass in data directly or pass in table header and table body from parents
  const {
    data,
    addable,
    addOnClick,
    tableHeader,
    tableBody,
    rowOnClick,
    size
  } = props;

  const MyTableHeader = () => {
    return (
      <TableHead>
        <TableRow>
          {Object.keys(data[0]).map(columnHeader => (
            <StyledTableCell style={{ textTransform: 'capitalize' }}>
              {columnHeader}
            </StyledTableCell>
          ))}
          {addable && <StyledTableCell>Action</StyledTableCell>}
        </TableRow>
      </TableHead>
    );
  };

  const MyTableBody = () => {
    return (
      <TableBody>
        {data.map(oneData => {
          return (
            <StyledTableRow
              onClick={
                rowOnClick
                  ? () => rowOnClick(oneData.ID)
                  : () => console.log('no click function')
              }
            >
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
                    <StyledTableCell align="left">{statusText}</StyledTableCell>
                  );
                }
                return (
                  <StyledTableCell align="left">{oneData[key]}</StyledTableCell>
                );
              })}
              {addable && (
                <MyButton onClick={() => addOnClick(oneData)}>Add</MyButton>
              )}
            </StyledTableRow>
          );
        })}
      </TableBody>
    );
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size={size}>
          {!tableHeader && <MyTableHeader />}
          {tableHeader && (
            <TableHead>
              <TableRow>
                {tableHeader.map(columnHeader => (
                  <StyledTableCell>{columnHeader}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          {!tableBody && <MyTableBody />}
          {tableBody && (
            <TableBody>
              {tableBody.map(oneData => {
                return (
                  <StyledTableCell align="right">
                    {Object.values(oneData)}
                  </StyledTableCell>
                );
              })}
            </TableBody>
          )}
        </Table>
      </Paper>
    </div>
  );
};

MyTable.defaultProps = {
  size: 'small'
};

export default MyTable;
