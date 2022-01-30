export function numberWithCommas(cases) {
  return cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
