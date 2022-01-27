export const sortData = (data) => {
  return [...data].sort((a, b) => b.cases - a.cases);
};
