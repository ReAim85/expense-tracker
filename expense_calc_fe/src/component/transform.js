export default function transformData(rawData) {
  const grouped = {};

  rawData.forEach((item) => {
    const dateKey = item.date;
    const amount = parseFloat(item.Amount) || 0;

    if (!grouped[dateKey]) {
      grouped[dateKey] = 0;
    }

    grouped[dateKey] += amount;
  });

  const result = Object.entries(grouped)
    .map(([dateStr, totalAmount]) => ({
      x: new Date(dateStr),
      y: totalAmount,
    }))
    .sort((a, b) => a.x - b.x);

  return result;
}
