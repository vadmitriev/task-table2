import React from 'react';
import { Box, Chip, TextField, Typography } from '@mui/material';

import { DatePicker } from '@mui/lab';
import { Delete, Done } from '@mui/icons-material';
import { ConsumerType } from '@/types';

interface ControlPanelProps {
  startDate: Date | null;
  endDate: Date | null;
  handleStartDate: (value: Date | null) => void;
  handleEndDate: (value: Date | null) => void;
  consumers: { type: ConsumerType; text: string }[];
  handleConsumerTypeClick: (type: ConsumerType) => void;
  consumerStatus: { [key in ConsumerType]: boolean };
}

const localeMask = '__.__.____';

const ControlPanel: React.FC<ControlPanelProps> = ({
  startDate,
  endDate,
  handleStartDate,
  handleEndDate,
  consumers,
  handleConsumerTypeClick,
  consumerStatus,
}) => {
  return (
    <Box sx={{ mb: 4, pt: 4 }}>
      <Typography variant="h4">
        Данные по энергопотреблению
      </Typography>
      <Box sx={{ pb: 3, pt: 2 }}>
        <DatePicker
          label="Начальная дата"
          value={startDate}
          mask={localeMask}
          onChange={handleStartDate}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              sx={{ width: 200, mr: 2 }}
            />
          )}
        />
        <DatePicker
          label="Конечная дата"
          value={endDate}
          mask={localeMask}
          onChange={handleEndDate}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              sx={{ width: 200, mr: 2 }}
            />
          )}
        />
      </Box>
      <Box>
        <Typography
          sx={{
            display: 'inline-block',
            mr: 1,
            mb: 3,
          }}
        >
          Выбор потребителя:
        </Typography>
        {consumers.map((consumer) => (
          <Chip
            key={consumer.type}
            sx={{ mr: 1 }}
            onClick={() => handleConsumerTypeClick(consumer.type)}
            label={consumer.text}
            color={
              consumerStatus[consumer.type] ? 'primary' : 'default'
            }
            deleteIcon={
              consumerStatus[consumer.type] ? <Done /> : <Delete />
            }
          />
        ))}
      </Box>
    </Box>
  );
};

export default ControlPanel;
