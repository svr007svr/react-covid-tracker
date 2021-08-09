export function sortData(data){
  const sortedData = [...data];

  return sortedData.sort ((a, b) => a.cases > b.cases);
};
