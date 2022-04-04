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

export enum ConsumerType {
  house,
  plant,
}

export interface TableCellType {
  date: Date;
  consumption: number;
  price?: number | null;
  weather?: number | null;
  visible: boolean;
}

export interface TableDataType {
  id: number;
  name: string;
  type: ConsumerType;
  total: number;
  data: TableCellType[];
  visible: boolean;
}
