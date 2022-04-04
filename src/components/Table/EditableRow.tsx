import React, { useState } from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { Cancel, Done, Edit } from '@mui/icons-material';

import EditableCell from './EditableCell';
import { TableCellType } from '@/types';

interface EditableRowProps {
  item: TableCellType;
  onDone: (item: TableCellType) => void;
}

const EditableRow: React.FC<EditableRowProps> = ({
  item,
  onDone,
}) => {
  const [isEditMode, setEditMode] = useState(false);
  const [changedData, setChangedData] = useState(item);
  const [initData] = useState(item);

  const handleDone = () => {
    setEditMode(false);
    onDone(changedData);
  };

  const handleCancel = () => {
    setChangedData(initData);
    setEditMode(false);
  };

  const handleChange = (newValue: string | number, key: string) => {
    const newItem = { ...changedData, [key]: newValue };
    setChangedData(newItem);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      handleDone();
    }
  };

  return (
    <TableRow
      key={changedData.date.toDateString()}
      onKeyUp={handleKeyUp}
    >
      <TableCell>
        {isEditMode ? (
          <>
            <IconButton aria-label="done" onClick={handleDone}>
              <Done />
            </IconButton>
            <IconButton aria-label="revert" onClick={handleCancel}>
              <Cancel />
            </IconButton>
          </>
        ) : (
          <IconButton aria-label="delete" onClick={handleEdit}>
            <Edit />
          </IconButton>
        )}
      </TableCell>
      <TableCell component="th" scope="row">
        {changedData.date.toLocaleDateString()}
      </TableCell>
      <EditableCell
        row={changedData}
        name="consumption"
        isEditMode={isEditMode}
        onChange={(e) => handleChange(e.target.value, 'consumption')}
      />
      {changedData.weather && (
        <EditableCell
          row={changedData}
          name="weather"
          isEditMode={isEditMode}
          onChange={(e) => handleChange(e.target.value, 'weather')}
        />
      )}
      {changedData.price && (
        <EditableCell
          row={changedData}
          name="price"
          isEditMode={isEditMode}
          onChange={(e) => handleChange(e.target.value, 'price')}
        />
      )}
    </TableRow>
  );
};

export default EditableRow;
