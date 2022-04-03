import React, { useEffect, useState } from 'react';
import { Spinner, Table } from '@/components';
import useDataQuery from '@/hooks/useDataQuery';
import {
  Box,
  Card,
  Chip,
  Container,
  TextField,
  Typography,
} from '@mui/material';

import { Delete, Done } from '@mui/icons-material';

import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';

import {
  getMaxDate,
  getMinDate,
  transformDataForTable,
} from '@/utils/transformData';
import {
  ConsumerType,
  TableCellType,
  TableDataType,
} from '@/types';

import { PageStyle } from '@/pages/page.style';
import { calcTotal, isDateBetween } from '@/utils';

const localeMask = '__.__.____';

const MainPage = () => {
  const { isLoading, error, data } = useDataQuery(false);
  const [startDate, setStartDate] = useState<Date | null>(
    null,
  );
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [tableData, setTableData] = useState<
    TableDataType[] | null
  >(null);
  const [initTableData, setInitTableData] = useState<
    TableDataType[] | null
  >(null);

  const [consumerStatus, setConsumerStatus] = useState({
    [ConsumerType.house]: true,
    [ConsumerType.plant]: true,
  });

  if (isLoading || !data) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (!data.houses || !data.plants) return;

    setStartDate(getMinDate(data));
    setEndDate(getMaxDate(data));

    const formattedData = transformDataForTable(data);

    setTableData(formattedData);
    setInitTableData(formattedData);
  }, [data]);

  useEffect(() => {
    if (!initTableData || !startDate || !endDate) return;

    const newTableData = initTableData.filter(
      (item) => consumerStatus[item.type],
    );
    setTableData(filterByDate(newTableData));
  }, [consumerStatus, startDate, endDate]);

  const filterByDate = (oldData: TableDataType[]) => {
    if (!startDate || !endDate) return oldData;

    const newData: TableDataType[] = oldData.map((item) => {
      const newDataItem: any = item.data.filter(
        (dataItem) => {
          const isOk = isDateBetween(
            dataItem.date,
            startDate,
            endDate,
          );
          if (isOk) return dataItem;
        },
      );
      return {
        ...item,
        data: newDataItem,
        total: calcTotal(newDataItem, 'consumption', 0),
      };
    });
    return newData;
  };

  const handleStartDate = (newValue: Date | null) => {
    if (!newValue) return;
    if (endDate && newValue > endDate) return;
    setStartDate(newValue);
  };

  const handleEndDate = (newValue: Date | null) => {
    if (!newValue) return;
    if (startDate && newValue < startDate) return;
    setEndDate(newValue);
  };

  const handleConsumerTypeClick = (type: ConsumerType) => {
    const newStatus = !consumerStatus[type];
    setConsumerStatus({
      ...consumerStatus,
      [type]: newStatus,
    });
  };

  const consumers: { type: ConsumerType; text: string }[] =
    [
      {
        type: ConsumerType.house,
        text: 'Дом',
      },
      {
        type: ConsumerType.plant,
        text: 'Завод',
      },
    ];

  const columns = [
    'Название',
    'Тип',
    'Потребление за период',
  ];

  const insideColumns = [
    {
      type: ConsumerType.house,
      columns: ['Дата', 'Потребление', 'Погода'],
    },
    {
      type: ConsumerType.plant,
      columns: ['Дата', 'Потребление', 'Цена'],
    },
  ];

  const handleRowChange = () => {
    console.log('change');
  };

  return (
    <PageStyle>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        locale={ruLocale}
      >
        <Container maxWidth="xl">
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
                  onClick={() =>
                    handleConsumerTypeClick(consumer.type)
                  }
                  label={consumer.text}
                  color={
                    consumerStatus[consumer.type]
                      ? 'primary'
                      : 'default'
                  }
                  deleteIcon={
                    consumerStatus[consumer.type] ? (
                      <Done />
                    ) : (
                      <Delete />
                    )
                  }
                />
              ))}
            </Box>
          </Box>
          <Card>
            <Table
              rows={tableData}
              columns={columns}
              insideColumns={insideColumns}
              onRowChange={handleRowChange}
            />
          </Card>
        </Container>
      </LocalizationProvider>
    </PageStyle>
  );
};

export default MainPage;
