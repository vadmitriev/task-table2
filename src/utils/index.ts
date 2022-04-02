export const dateDiffInDays = (
  day1: Date,
  day2: Date
): number => {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(
    day1.getFullYear(),
    day1.getMonth(),
    day1.getDate()
  );
  const utc2 = Date.UTC(
    day2.getFullYear(),
    day2.getMonth(),
    day2.getDate()
  );

  return Math.floor((utc2 - utc1) / MS_PER_DAY);
};

export const insert = (
  arr: any,
  index: number,
  newItem: any
) => {
  return [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index)
  ];
};
