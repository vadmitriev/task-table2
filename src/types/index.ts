interface HouseConsumption {
  Date: string;
  Consumption: number;
  Weather: number;
}

interface PlantConsumption {
  Date: string;
  Consumption: number;
  Price: number;
}

export type Consumption = HouseConsumption & PlantConsumption;

export interface Consumer {
  ConsumerId: number;
  Name: string;
  consumptions: Consumption[];
}

export interface Data {
  houses: Consumer[];
  plants: Consumer[];
}

type ConsumptionType = 'house' | 'plant';

export interface SimpleItem {
  id: number;
  name: string;
  type: ConsumptionType;
  consumptions: Consumption[];
}

export interface DateItem {
  date: string;
  id: number;
  name: string;
  type: ConsumptionType;
  price: number;
  consumption: number;
  weather: number;
}
