import { Circle, Popup } from "react-leaflet";

export function numberWithCommas(cases) {
  return cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const caseTypeColors = {
  cases: {
    hex: "#ff8a8a",
  },
};

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={caseTypeColors[casesType].hex}
      fillColor={caseTypeColors[casesType].hex}
      fillOpacity={0.5}
      radius={
        country[casesType] >= 40750500
          ? Math.sqrt(country[casesType]) * 150
          : Math.sqrt(country[casesType]) * 50
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{
              backgroundImage: `url(${country.countryInfo.flag})`,
            }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-case">
            Cases: {numberWithCommas(country.cases)}
          </div>
          <div className="info-recovered">
            Recovered: {numberWithCommas(country.recovered)}{" "}
          </div>
          <div className="info-death">
            Deaths: {numberWithCommas(country.deaths)}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
