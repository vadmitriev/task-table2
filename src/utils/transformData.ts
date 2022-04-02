import { Data } from '@/types';
import { dateDiffInDays, insert } from '@/utils/index';

export const transformDataForLineChart = (
  data: Data | undefined
) => {
  const weathers =
    data?.houses.length &&
    data?.houses[0].consumptions
      .sort((a, b) => a.Weather - b.Weather)
      .map((c) => c.Weather.toFixed(0));

  const prices =
    data?.plants.length &&
    data?.plants[0].consumptions.map((c) =>
      c.Price.toFixed(0)
    );

  const houses = data?.houses.map((house) => ({
    name: house.Name,
    data: house.consumptions
      .sort((a, b) => a.Weather - b.Weather)
      .map((c) => c.Consumption.toFixed(0))
  }));

  const plants = data?.plants.map((plant) => ({
    name: plant.Name,
    data: plant.consumptions
      .sort((a, b) => a.Price - b.Price)
      .map((c) => c.Consumption.toFixed(0)),

    price: plant.consumptions
      .sort((a, b) => a.Price - b.Price)
      .map((c) => c.Price),
    date: plant.consumptions
      .sort((a, b) => a.Price - b.Price)
      .map((c) => c.Date)
  }));

  return {
    weathers,
    prices,
    houses,
    plants
  };
};

export const transformDataForAreaChart = (
  data: Data | undefined
) => {
  let datesMap = new Map<string, number>();
  const dates = data?.plants[0].consumptions.map(
    (c, idx) => {
      datesMap.set(c.Date, idx);
      return c.Date;
    }
  );

  let series: { name: string; data: number[] }[] = [];
  data?.plants.forEach((plant) => {
    series.push({
      name: plant.Name,
      data: plant.consumptions.map((c) => c.Consumption)
    });
  });

  data?.houses.forEach((house, idx, arr) => {
    datesMap.forEach((value, key) => {
      const dateExists = house.consumptions.find(
        (c) => c.Date === key
      );
      if (!dateExists) {
        house.consumptions.push({
          Date: key,
          Price: 0,
          Weather: 0,
          Consumption: 0
        });
      }
    });
    series.push({
      name: house.Name,
      data: house.consumptions
        .sort(
          (a, b) => Date.parse(a.Date) - Date.parse(b.Date)
        )
        .map((c) => c.Consumption)
    });
  });

  return {
    dates,
    series
  };
};
