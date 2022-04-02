export const randomNum = () =>
  Math.floor(Math.random() * (235 - 52 + 1) + 52);

export const randomRGB = () =>
  `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

export const RGBAFromRGB = (rgb: string, alpha: number) => {
  const [r, g, b] = rgb
    .replace('rgb(', '')
    .replace(')', '')
    .trim()
    .split(',');

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
