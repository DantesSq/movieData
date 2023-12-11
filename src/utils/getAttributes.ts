const european_countries = [
  "albania",
  "germany",
  "poland",
  "andorra",
  "greece",
  "portugal",
  "armenia",
  "hungary",
  "romania",
  "austria",
  "iceland",
  "russia",
  "azerbaijan",
  "ireland",
  "san marino",
  "belgium",
  "italy",
  "serbia",
  "bosnia and herzegovina",
  "latvia",
  "slovakia",
  "bulgaria",
  "liechtenstein",
  "slovenia",
  "croatia",
  "lithuania",
  "spain",
  "cyprus",
  "luxembourg",
  "sweden",
  "czech republic",
  "malta",
  "switzerland",
  "denmark",
  "moldova",
  "the former yugoslav republic of macedonia",
  "estonia",
  "montenegro",
  "turkey",
  "finland",
  "monaco",
  "ukraine",
  "france",
  "netherlands",
  "united kingdom",
  "georgia",
  "norway",
];

export const getEuropean = (tmdb_countries: string | undefined) => {
  if (!tmdb_countries) return "";
  let european_count = 0;
  const countries = tmdb_countries.split(", ");

  for (const country of countries) {
    if (european_countries.includes(country.toLowerCase())) european_count++;
    console.log(country, european_count);
  }

  return european_count > countries.length / 2
    ? "European"
    : european_count < countries.length / 2
    ? "NonEuropean"
    : "";
};
