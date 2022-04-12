export const calcTotal = (
  arr: any[],
  key: string,
  round: number = 0,
) => {
  const total = arr.reduce(
    (acc, item) => (item[key] ? acc + Number(item[key]) : null),
    0,
  );
  return (
    Math.round(total * Math.pow(10, round)) / Math.pow(10, round)
  );
};

export const isDateBetween = (
  currentDate: Date,
  startDate: Date,
  endDate: Date,
): boolean => {
  return (
    currentDate.getTime() >= startDate.getTime() &&
    currentDate.getTime() <= endDate.getTime()
  );
};
