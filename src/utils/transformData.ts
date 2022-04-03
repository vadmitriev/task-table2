import {
  Consumer,
  ConsumerType,
  Data,
  TableCellType,
  TableDataType,
} from '@/types';
import { calcTotal } from '@/utils/index';

export const transformDataForLineChart = (data: Data) => {
  const { houses, plants } = data;

  const weathers = houses[0].consumptions.map((c) =>
    c.Weather.toFixed(0),
  );

  const prices = plants[0].consumptions.map((c) =>
    c.Price.toFixed(0),
  );

  const housesData = houses.map((house) => ({
    name: house.Name,
    data: house.consumptions.map((c) =>
      c.Consumption.toFixed(0),
    ),
  }));

  const plantsData = plants.map((plant) => ({
    name: plant.Name,
    data: plant.consumptions.map((c) =>
      c.Consumption.toFixed(0),
    ),

    price: plant.consumptions.map((c) => c.Price),
    date: plant.consumptions.map((c) => c.Date),
  }));

  return {
    weathers,
    prices,
    houses: housesData,
    plants: plantsData,
  };
};

export const transformDataForAreaChart = (data: Data) => {
  const { plants, houses } = data;

  let datesMap = new Map<string, number>();
  const dates = plants[0].consumptions.map((c, idx) => {
    datesMap.set(c.Date, idx);
    return new Date(
      Date.parse(c.Date),
    ).toLocaleDateString();
  });

  let series: {
    name: string;
    data: number[];
  }[] = [];

  plants.forEach((plant) => {
    series.push({
      name: plant.Name,
      data: plant.consumptions.map((c) => c.Consumption),
    });
  });

  houses.forEach((house, idx, arr) => {
    datesMap.forEach((value, key) => {
      const dateExists = house.consumptions.find(
        (c) => c.Date === key,
      );
      if (!dateExists) {
        house.consumptions.push({
          Date: key,
          Price: 0,
          Weather: 0,
          Consumption: 0,
        });
      }
    });
    series.push({
      name: house.Name,
      data: house.consumptions.map((c) => c.Consumption),
    });
  });

  return {
    dates,
    series,
  };
};

const extractDates = (data: Data): Map<Date, string> => {
  const { houses, plants } = data;

  let datesMap = new Map<Date, string>();

  const addDatesToMap = (arr: Consumer[]) => {
    arr.forEach((item) => {
      item.consumptions.map((c) => {
        const date = new Date(Date.parse(c.Date));
        if (!datesMap.has(date)) {
          datesMap.set(date, c.Date);
        }
      });
    });
  };

  addDatesToMap(houses);
  addDatesToMap(plants);

  return datesMap;
};

export const getMinDate = (data: Data) => {
  const datesMap = extractDates(data);
  return [...datesMap.keys()].sort(
    (a, b) => a.getTime() - b.getTime(),
  )[0];
};

export const getMaxDate = (data: Data) => {
  const datesMap = extractDates(data);
  return [...datesMap.keys()].sort(
    (a, b) => b.getTime() - a.getTime(),
  )[0];
};

export const transformDataForTable = (
  data: Data,
): TableDataType[] => {
  const { houses, plants } = data;

  const result: TableDataType[] = [];

  const formTableData = (
    arr: Consumer[],
    type: ConsumerType,
  ) => {
    arr.forEach((consumer) => {
      const dataArray: TableCellType[] =
        consumer.consumptions.map((c) => ({
          date: new Date(Date.parse(c.Date)),
          consumption: c.Consumption,
          weather:
            type === ConsumerType.house ? c.Weather : null,
          price:
            type === ConsumerType.plant ? c.Price : null,
        }));

      const item = {
        type,
        id: consumer.ConsumerId,
        name: consumer.Name,
        data: dataArray,
        total: calcTotal(dataArray, 'consumption', 0),
      };

      result.push(item);
      // const item: TableDataType = {
      //   type,
      //   id: consumer.ConsumerId,
      //   name: consumer.Name,
      //   data: {
      //     dates: [],
      //     consumptions: [],
      //     prices: type === ConsumerType.plant ? [] : null,
      //     weathers: type === ConsumerType.house ? [] : null,
      //   },
      // };
      //
      // consumer.consumptions.forEach((c) => {
      //   item.data.dates.push(new Date(Date.parse(c.Date)));
      //   item.data.consumptions.push(c.Consumption);
      //
      //   if (type === ConsumerType.plant) {
      //     item.data.prices?.push(c.Price);
      //   }
      //   if (type === ConsumerType.house) {
      //     item.data.weathers?.push(c.Weather);
      //   }
      // });
    });
  };

  formTableData(houses, ConsumerType.house);
  formTableData(plants, ConsumerType.plant);

  return result;
};
