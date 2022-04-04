import React, { useEffect, useState } from 'react';
import { Spinner, Table } from '@/components';
import useDataQuery from '@/hooks/useDataQuery';
import { Card, Container } from '@mui/material';

import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';

import {
  getMaxDate,
  getMinDate,
  transformDataForTable,
} from '@/utils/transformData';
import { ConsumerType, TableCellType, TableDataType } from '@/types';

import { PageStyle } from '@/pages/page.style';
import { calcTotal, isDateBetween } from '@/utils';
import ControlPanel from '@/pages/MainPage/components/ControlPanel';

const MainPage = () => {
  const { isLoading, error, data } = useDataQuery(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [tableData, setTableData] = useState<TableDataType[] | null>(
    null,
  );

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
  }, [data]);

  useEffect(() => {
    if (!tableData || !startDate || !endDate) return;

    const newTableData = tableData.map((item) => {
      item.visible = consumerStatus[item.type];
      return item;
    });
    setTableData(filterByDate(newTableData));
  }, [consumerStatus, startDate, endDate]);

  const filterByDate = (oldData: TableDataType[]) => {
    if (!startDate || !endDate) {
      return oldData;
    }

    const newData: TableDataType[] = oldData.map((item) => {
      const newDataItem: any = item.data.map((dataItem) => {
        dataItem.visible = isDateBetween(
          dataItem.date,
          startDate,
          endDate,
        );
        return dataItem;
      });

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
    setConsumerStatus({
      ...consumerStatus,
      [type]: !consumerStatus[type],
    });
  };

  const consumers: { type: ConsumerType; text: string }[] = [
    {
      type: ConsumerType.house,
      text: 'Дом',
    },
    {
      type: ConsumerType.plant,
      text: 'Завод',
    },
  ];

  const columns = ['Название', 'Тип', 'Потребление за период'];

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

  const handleRowChange = (
    id: number,
    index: number,
    newItem: TableCellType,
  ) => {
    if (!tableData) return;

    const newTableData = tableData.map((dataItem) => {
      if (dataItem.id === id) {
        dataItem.data[index] = { ...newItem };
      }
      return dataItem;
    });

    setTableData(newTableData);
  };

  return (
    <PageStyle>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        locale={ruLocale}
      >
        <Container maxWidth="xl">
          <ControlPanel
            consumers={consumers}
            startDate={startDate}
            endDate={endDate}
            handleStartDate={handleStartDate}
            handleEndDate={handleEndDate}
            handleConsumerTypeClick={handleConsumerTypeClick}
            consumerStatus={consumerStatus}
          />
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
