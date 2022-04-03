import React, { useState } from 'react';
import {
  ConsumerType,
  TableCellType,
  TableDataType,
} from '@/types';

import {
  Box,
  Collapse,
  IconButton,
  Input,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Done,
  Edit,
  Cancel,
} from '@mui/icons-material';

interface InsideColumns {
  type: ConsumerType;
  columns: string[];
}

interface TableCellProps {
  row: TableDataType;
  columns: InsideColumns[];
}

interface CustomTableCellProps {
  row: any;
  name: string;
  onChange: (
    changeEvent: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement
    >,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => unknown;
  isEditMode: boolean;
}

// function descendingComparator<T>(
//   a: T,
//   b: T,
//   orderBy: keyof T,
// ) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }
//
// type Order = 'asc' | 'desc';
//
// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key,
// ): (
//   a: { [key in Key]: number | string },
//   b: { [key in Key]: number | string },
// ) => number {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }
//
// function stableSort<T>(
//   array: readonly T[],
//   comparator: (a: T, b: T) => number,
// ) {
//   const stabilizedThis = array.map(
//     (el, index) => [el, index] as [T, number],
//   );
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

const CollapsedRow: React.FC<TableCellProps> = ({
  row,
  columns,
}) => {
  const [open, setOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(true);

  // const handleRequestSort = (
  //   event: React.MouseEvent<unknown>,
  //   property: keyof TableCellType,
  // ) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  const MainRow = () => (
    <TableRow
      sx={{
        '& > *': { borderBottom: 'unset' },
      }}
    >
      <TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <KeyboardArrowUp />
          ) : (
            <KeyboardArrowDown />
          )}
        </IconButton>
      </TableCell>
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell component="th" scope="row">
        {row.type === ConsumerType.plant ? 'Завод' : 'Дом'}
      </TableCell>
      <TableCell component="th" scope="row">
        {row.total}
      </TableCell>
    </TableRow>
  );

  const Head = () => (
    <TableHead>
      {columns.map((col, idx) => {
        if (col.type !== row.type) return null;
        return (
          <TableRow key={idx}>
            <TableCell sx={{ width: 120 }} />
            {col.columns.map((name) => (
              <TableCell key={name}>{name}</TableCell>
            ))}
          </TableRow>
        );
      })}
    </TableHead>
  );

  const CustomTableCell: React.FC<CustomTableCellProps> = ({
    row,
    name,
    onChange,
    isEditMode,
  }) => {
    return (
      <TableCell>
        {isEditMode ? (
          <Input
            value={row[name]}
            name={name}
            onChange={(e) => onChange(e, row)}
          />
        ) : (
          row[name]
        )}
      </TableCell>
    );
  };

  const CustomTableRow = ({ item }: any) => {
    const [isEditMode, setEditMode] = useState(false);

    return (
      <TableRow key={item.date.toDateString()}>
        <TableCell>
          {isEditMode ? (
            <>
              <IconButton
                aria-label="done"
                onClick={() => setEditMode(false)}
              >
                <Done />
              </IconButton>
              <IconButton
                aria-label="revert"
                onClick={() => onRevert(row.id)}
              >
                <Cancel />
              </IconButton>
            </>
          ) : (
            <IconButton
              aria-label="delete"
              onClick={() => setEditMode(true)}
            >
              <Edit />
            </IconButton>
          )}
        </TableCell>
        <TableCell component="th" scope="row">
          {item.date.toLocaleDateString()}
        </TableCell>
        <CustomTableCell
          row={item}
          name="consumption"
          isEditMode={isEditMode}
          onChange={(e) => onChange(e, item)}
        />
        {/*<TableCell component="th" scope="row">*/}
        {/*  {item.consumption.toFixed(0)}*/}
        {/*</TableCell>*/}
        {item.weather && (
          <CustomTableCell
            row={item}
            name="weather"
            isEditMode={isEditMode}
            onChange={(e) => onChange(e, item)}
          />
          // <TableCell component="th" scope="row">
          //   {item.weather}
          // </TableCell>
        )}
        {item.price && (
          <CustomTableCell
            row={item}
            name="price"
            isEditMode={isEditMode}
            onChange={(e) => onChange(e, item)}
          />
          // <TableCell component="th" scope="row">
          //   {item.price}
          // </TableCell>
        )}
      </TableRow>
    );
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: any,
  ) => {
    console.log('event', e.target.value);
    console.log('row', row);
  };

  const onToggleEditMode = (id: number) => {
    console.log(id);
  };

  const onRevert = (id: number) => {
    console.log(id);
  };

  const Body = () => (
    <TableBody>
      {row.data.map((item, idx) => (
        <CustomTableRow
          key={item.date.toDateString()}
          item={item}
        />
      ))}
    </TableBody>
  );

  return (
    <>
      <MainRow />
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
              >
                Детальная информация
              </Typography>
              <MuiTable
                size="small"
                aria-label="inside table"
              >
                <Head />
                <Body />
              </MuiTable>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CollapsedRow;
