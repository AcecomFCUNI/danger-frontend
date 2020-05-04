export const populationByRegion = [
  {
    name: "AMAZONAS",
    totalPopulation: 375993,
  },
  {
    name: "ANCASH",
    totalPopulation: 1063459,
  },
  {
    name: "APURIMAC",
    totalPopulation: 404190,
  },
  {
    name: "AREQUIPA",
    totalPopulation: 1152303,
  },
  {
    name: "AYACUCHO",
    totalPopulation: 612489,
  },
  {
    name: "CAJAMARCA",
    totalPopulation: 1387809,
  },
  {
    name: "CALLAO",
    totalPopulation: 879679,
  },
  {
    name: "CUSCO",
    totalPopulation: 1171403,
  },
  {
    name: "HUANCAVELICA",
    totalPopulation: 454797,
  },
  {
    name: "HUANUCO",
    totalPopulation: 762223,
  },
  {
    name: "ICA",
    totalPopulation: 711932,
  },
  {
    name: "JUNIN",
    totalPopulation: 1225474,
  },
  {
    name: "LA LIBERTAD",
    totalPopulation: 1617050,
  },
  {
    name: "LAMBAYEQUE",
    totalPopulation: 1112868,
  },
  {
    name: "LIMA",
    totalPopulation: 8442409,
  },
  {
    name: "LORETO",
    totalPopulation: 891732,
  },
  {
    name: "MADRE DE DIOS",
    totalPopulation: 109555,
  },
  {
    name: "MOQUEGUA",
    totalPopulation: 161533,
  },
  {
    name: "PASCO",
    totalPopulation: 280449,
  },
  {
    name: "PIURA",
    totalPopulation: 1676315,
  },
  {
    name: "PUNO",
    totalPopulation: 1268441,
  },
  {
    name: "SAN MARTIN",
    totalPopulation: 728808,
  },
  {
    name: "TACNA",
    totalPopulation: 288781,
  },
  {
    name: "TUMBES",
    totalPopulation: 200306,
  },
  {
    name: "UCAYALI",
    totalPopulation: 432159,
  },
];

export const addPopulationToData = (regions) => {
  return populationByRegion.map((region) => {
    return {
      ...region,
      // default data
      totalCases: 0,
      totalDeaths: 0,

      // overwrite default with API data
      ...regions.filter((department) => department.name === region.name)[0],
    };
  });
};
