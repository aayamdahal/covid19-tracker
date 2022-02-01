import { Circle } from "react-leaflet";

export function numberWithCommas(cases) {
  return cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const caseTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 400,
  },
};

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={caseTypeColors[casesType].hex}
      fillColor={caseTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={Math.sqrt(2) * 18}
    ></Circle>
  ));
