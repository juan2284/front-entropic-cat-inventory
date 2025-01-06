const convertirACSV = (objArray: Object) => {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = '';

  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (let index in array[i]) {
      if (line !== '') line += ',';
      line += array[i][index];        
    }
  str += line + '\r\n';
  }
  return str;
};

export const exportCSVFile = (items: {}[], fileName: String) => {
  const jsonObject = JSON.stringify(items);
  const csv = convertirACSV(jsonObject);
  const exportName = fileName + '.csv' || 'export.csv';
  const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, exportName);
  } else {
    const link = document.createElement('A');
    if ((link as HTMLAnchorElement).download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', exportName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};