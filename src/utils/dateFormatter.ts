export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
  return formatter.format(date);
};

export const chartDate = (isoString: string): string => {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'numeric'
  });
  return formatter.format(date);
};