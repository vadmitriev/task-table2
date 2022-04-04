import React, { useEffect, useState } from 'react';
import { ConsumerType, TableCellType, TableDataType } from '@/types';

import {
  Box,
  Collapse,
  IconButton,
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
} from '@mui/icons-material';

import EditableRow from '@/components/Table/EditableRow';

interface InsideColumns {
  type: ConsumerType;
  columns: string[];
}

interface TableCellProps {
  row: TableDataType;
  columns: InsideColumns[];
  onChange: (id: number, index: number, item: TableCellType) => void;
}

const CollapsedRow: React.FC<TableCellProps> = ({
  row,
  columns,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [changedRow, setChangedRow] = useState(row);

  useEffect(() => {
    if (row) {
      setChangedRow(row);
    }
  }, [row]);

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
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
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

  const onDone = (id: number, index: number, item: TableCellType) => {
    onChange(id, index, item);
  };

  const Body = () => (
    <TableBody>
      {changedRow &&
        changedRow.visible &&
        changedRow.data.map(
          (item, idx) =>
            item.visible && (
              <EditableRow
                key={item.date.toDateString()}
                item={item}
                onDone={(newItem) =>
                  onDone(changedRow.id, idx, newItem)
                }
              />
            ),
        )}
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
              <Typography variant="h6" gutterBottom component="div">
                Детальная информация
              </Typography>
              <MuiTable size="small" aria-label="inside table">
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
