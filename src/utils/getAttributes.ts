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
  "czechoslovakia",
];

export const getEuropean = (tmdb_countries: string | undefined) => {
  if (!tmdb_countries) return "";
  let european_count = 0;
  const countries = tmdb_countries.split(", ");

  for (const country of countries) {
    if (european_countries.includes(country.toLowerCase())) european_count++;
  }

  return european_count > countries.length / 2
    ? "European"
    : european_count < countries.length / 2
    ? "NonEuropean"
    : "";
};

export const getIndependent = (tmdb_companies: string | undefined) => {
  const keywords_independent = [
    "filmproduktion",
    "film",
    "films",
    "zespół filmowy",
    "produkcja",
    "filmowa",
    "entertainment",
    "entertainments",
    "filminstitut",
    "studio",
    "production",
    "productions",
    "pictures",
    "wff", // Wytwórnia Filmów Dokumentalnych i Fabularnych
    "wfdif", // Wytwórnia Filmów Dokumentalnych i Fabularnych
  ];
  const independent = [
    "fox 2000 pictures",
    "silver frame",
    "pisf",
    "d35",
    "hat trick productions",
  ];
  const dependent = [
    "canal+",
    "stopklatka",
    "studiocanal",
    "kino polska",
    "kino tv",
    "discovery",
    "natgeo",
    "orf",
    "zdf",
    "tvp",
    "telewizja polska",
    "20th television",
    "warner bros",
  ];

  if (!tmdb_companies) return "";

  const values = {
    dependent: false,
    independent: false,
  };

  const companies = tmdb_companies.split(", ");

  for (let index = 0; index < companies.length; index++) {
    const company = companies[index];

    dependent.forEach((dependent_copmany) => {
      if (company.toLowerCase().includes(dependent_copmany)) {
        values.dependent = true; // Check if company is DEPENDENT
        values.independent = false;
      }
    });

    if (values.independent || index === 0) {
      // If previous Company was INDEPENDENT, we continue check the next company, if not, our output will be empty or DEPENDENT
      values.independent = false;

      independent.forEach((independent_company) => {
        if (company.toLowerCase().includes(independent_company))
          values.independent = true; // Check if company is INDEPENDENT
      });

      if (!values.independent) {
        keywords_independent.forEach((keyword) => {
          if (company.toLowerCase().includes(keyword))
            values.independent = true;
        });
      }

      if (values.dependent) return "Dependent";
    }
  }

  if (values.dependent) return "Dependent";
  if (!values.independent) return ""; // If we don't know, whether company is DEPENDENT or INDEPENDENT, we return empty value
  return "Independent";
};
