import { JSX } from "react";

export interface WeatherInfo {
  text: string;
  icon: JSX.Element;
}
const Sun = (
  <svg
    className="w-8 h-8 text-yellow-400"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="5" />
  </svg>
);

const Cloud = (
  <svg
    className="w-8 h-8 text-slate-300"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M19 18H7a4 4 0 010-8 5 5 0 019.6-1.4A4 4 0 1119 18z" />
  </svg>
);

const Rain = (
  <svg
    className="w-8 h-8 text-sky-400"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M7 18l1 2M12 18l1 2M17 18l1 2" />
  </svg>
);

export function getWeatherDetails(code: number): WeatherInfo {

switch(code){

case 0:
return{
text:"Clear Sky",
icon:Sun
}

case 1:
case 2:
case 3:
return{
text:"Cloudy",
icon:Cloud
}

case 51:
case 53:
case 55:
case 61:
case 63:
case 65:
return{
text:"Rain",
icon:Rain
}

default:
return{
text:"Unknown",
icon:Cloud
}

}

}