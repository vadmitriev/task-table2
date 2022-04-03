import React from 'react';

import {
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { ConsumerType, TableDataType } from '@/types';

import Row from './TableRow';

interface InsideColumns {
  type: ConsumerType;
  columns: string[];
}

interface TableProps {
  rows: TableDataType[] | null;
  columns: string[];
  insideColumns: InsideColumns[];
  onRowChange: () => void;
}

const Table: React.FC<TableProps> = ({
  rows,
  columns,
  insideColumns,
  onRowChange,
}) => {
  if (!rows) return null;
  return (
    <TableContainer component={Paper}>
      <MuiTable aria-label="collapsible table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map((col) => (
              <TableCell key={col}>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row) => (
              <Row
                key={row.id}
                row={row}
                columns={insideColumns}
              />
            ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
