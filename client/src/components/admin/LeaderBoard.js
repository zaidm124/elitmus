import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

const columns = [
  // { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'rank', label: 'Rank',align:"left", minWidth: 100 },
  { id: 'username', label: 'Username',align:"left", minWidth: 100 },
  {
    id: 'rounds',
    label: 'Number of Rounds Completed',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'time',
    label: 'Total Time Taken ',
    minWidth: 100,
    align: 'center',
  },
];

function createData( rank,username, rounds, time) {
  return {  rank,username, rounds, time };
}

export default function LeaderBoard() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows,setRows]=React.useState([]);

  React.useEffect(()=>{

    axios.get("https://tasty-gold-turtleneck.cyclic.app/admin/leaderboard",{}).then((res)=>{
      if(res.data.success){
        const r=[];
        
        res.data.leaderboard.map((element,i)=>{
          r.push(
            createData(i+1,element.username,element.rounds,element.time)
            )
          })
          
          
          setRows(r);
        }
      })
    },[])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
    <h1 style={{color:"black"}}>Leaderboard</h1>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}