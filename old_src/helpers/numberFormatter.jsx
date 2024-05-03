const numberFormatter = (num) => {
  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const formatted =
      parseFloat((num / found.threshold).toFixed(2)) + found.suffix;
    return formatted;
  }

  return `${num}`;
};

export default numberFormatter;
