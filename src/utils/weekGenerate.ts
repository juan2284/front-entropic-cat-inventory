import { chartDate, formatDate } from "@/utils/dateFormatter";

export function weekGenerate() {
  const date = new Date();
  let week: string[] = [];
  let labels: string[] = [];
  for (let i = 0; i < 7; i++) {
    const oneDay = 1 * 24 * 60 * 60 * 1000;
    const day = date.getTime() - (i * oneDay);
    const formatedDate = formatDate(new Date(day).toISOString());
    const labelDate = chartDate(new Date(day).toISOString());
    week.unshift(formatedDate);
    labels.unshift(labelDate);
  }

  return {week, labels};
}