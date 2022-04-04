import React from 'react';
import { Input, TableCell } from '@mui/material';

interface CustomTableCellProps {
  row: any;
  name: string;
  onChange: (
    changeEvent: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement
    >,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  isEditMode: boolean;
}

const EditableCell: React.FC<CustomTableCellProps> = ({
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

export default EditableCell;
