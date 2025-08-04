export interface AirportTerminal {
  name: string;
  displayName: string;
  country: string;
  state: string;
  city: string;
  keywords: string[];
  postcode: string;
  latitude: number;
  longitude: number;
  priority: number;
}

export interface Airport {
  name: string;
  code: string;
  keywords: string[];
  terminals: AirportTerminal[];
}

export const UK_AIRPORTS: Airport[] = [
  {
    name: "Heathrow",
    code: "LHR",
    keywords: ["heathrow", "heathrow airport", "lhr"],
    terminals: [
      {
        name: "heathrow_t1",
        displayName: "Heathrow Terminal 1",
        keywords: [
          "terminal 1",
          "terminal one",
          "t1",
          "heathrow terminal one",
          "heathrow terminal 1",
          "heathrow t1",
        ],
        postcode: "TW6 1AP",
        country: "United Kingdom",
        state: "England",
        city: "London",
        latitude: 51.4733,
        longitude: -0.4553,
        priority: 1,
      },
      {
        name: "heathrow_t2",
        displayName: "Heathrow Terminal 2",
        keywords: [
          "terminal 2",
          "terminal two",
          "t2",
          "heathrow terminal two",
          "heathrow terminal 2",
          "heathrow t2",
        ],
        postcode: "TW6 1EW",
        country: "United Kingdom",
        state: "England",
        city: "London",
        latitude: 51.4719,
        longitude: -0.4543,
        priority: 2,
      },
      {
        name: "heathrow_t3",
        displayName: "Heathrow Terminal 3",
        keywords: [
          "terminal 3",
          "terminal three",
          "t3",
          "heathrow terminal three",
          "heathrow terminal 3",
          "heathrow t3",
        ],
        postcode: "TW6 1QG",
        country: "United Kingdom",
        state: "England",
        city: "London",
        latitude: 51.47,
        longitude: -0.4543,
        priority: 3,
      },
      {
        name: "heathrow_t4",
        displayName: "Heathrow Terminal 4",
        keywords: [
          "terminal 4",
          "terminal four",
          "t4",
          "heathrow terminal four",
          "heathrow terminal 4",
          "heathrow t4",
        ],
        postcode: "TW6 3XA",
        country: "United Kingdom",
        state: "England",
        city: "London",
        latitude: 51.4591,
        longitude: -0.4454,
        priority: 4,
      },
      {
        name: "heathrow_t5",
        displayName: "Heathrow Terminal 5",
        keywords: [
          "terminal 5",
          "terminal five",
          "t5",
          "heathrow terminal five",
          "heathrow terminal 5",
          "heathrow t5",
        ],
        postcode: "TW6 2GA",
        country: "United Kingdom",
        state: "England",
        city: "London",
        latitude: 51.4722,
        longitude: -0.4911,
        priority: 5,
      },
    ],
  },
  {
    name: "Gatwick",
    code: "LGW",
    keywords: ["gatwick", "gatwick airport", "lgw"],
    terminals: [
      {
        name: "gatwick_north",
        displayName: "Gatwick North Terminal",
        keywords: [
          "north terminal",
          "gatwick north",
          "gatwick north terminal",
          "north",
          "terminal north",
        ],
        postcode: "RH6 0PJ",
        country: "United Kingdom",
        state: "England",
        city: "London",
        latitude: 51.1617,
        longitude: -0.1781,
        priority: 1,
      },
      {
        name: "gatwick_south",
        displayName: "Gatwick South Terminal",
        keywords: [
          "south terminal",
          "gatwick south",
          "gatwick south terminal",
          "south",
          "terminal south",
        ],
        postcode: "RH6 0NP",
        country: "United Kingdom",
        state: "England",
        city: "London",
        latitude: 51.1537,
        longitude: -0.1821,
        priority: 2,
      },
    ],
  },
  {
    name: "Stansted",
    code: "STN",
    keywords: ["stansted", "stansted airport", "stn"],
    terminals: [
      {
        name: "stansted_main",
        displayName: "Stansted Terminal",
        keywords: [
          "stansted terminal",
          "stansted",
          "terminal",
          "main terminal",
        ],
        postcode: "CM24 1QW",
        country: "United Kingdom",
        state: "England",
        city: "London",
        latitude: 51.8894,
        longitude: 0.2625,
        priority: 1,
      },
    ],
  },
  {
    name: "Luton",
    code: "LTN",
    keywords: ["luton", "luton airport", "ltn"],
    terminals: [
      {
        name: "luton_main",
        displayName: "Luton Terminal",
        keywords: ["luton terminal", "luton", "terminal", "main terminal"],
        postcode: "LU2 9LY",
        country: "United Kingdom",
        state: "England",
        city: "London",
        latitude: 51.8747,
        longitude: -0.3683,
        priority: 1,
      },
    ],
  },
  {
    name: "Manchester",
    code: "MAN",
    keywords: ["manchester", "manchester airport", "man"],
    terminals: [
      {
        name: "manchester_t1",
        displayName: "Manchester Terminal 1",
        keywords: [
          "terminal 1",
          "terminal one",
          "t1",
          "manchester terminal one",
          "manchester terminal 1",
          "manchester t1",
        ],
        postcode: "M90 1QX",
        country: "United Kingdom",
        state: "England",
        city: "Manchester",
        latitude: 53.355,
        longitude: -2.273,
        priority: 1,
      },
      {
        name: "manchester_t2",
        displayName: "Manchester Terminal 2",
        keywords: [
          "terminal 2",
          "terminal two",
          "t2",
          "manchester terminal two",
          "manchester terminal 2",
          "manchester t2",
        ],
        postcode: "M90 4HL",
        country: "United Kingdom",
        state: "England",
        city: "Manchester",
        latitude: 53.3655,
        longitude: -2.272,
        priority: 2,
      },
      {
        name: "manchester_t3",
        displayName: "Manchester Terminal 3",
        keywords: [
          "terminal 3",
          "terminal three",
          "t3",
          "manchester terminal three",
          "manchester terminal 3",
          "manchester t3",
        ],
        postcode: "M90 3RA",
        country: "United Kingdom",
        state: "England",
        city: "Manchester",
        latitude: 53.3636,
        longitude: -2.2699,
        priority: 3,
      },
    ],
  },
  {
    name: "Birmingham",
    code: "BHX",
    keywords: ["birmingham", "birmingham airport", "bhx"],
    terminals: [
      {
        name: "birmingham_main",
        displayName: "Birmingham Terminal",
        keywords: [
          "birmingham terminal",
          "birmingham",
          "terminal",
          "main terminal",
        ],
        postcode: "B26 3QJ",
        country: "United Kingdom",
        state: "England",
        city: "Birmingham",
        latitude: 52.4522,
        longitude: -1.748,
        priority: 1,
      },
    ],
  },
  {
    name: "Edinburgh",
    code: "EDI",
    keywords: ["edinburgh", "edinburgh airport", "edi"],
    terminals: [
      {
        name: "edinburgh_main",
        displayName: "Edinburgh Terminal",
        keywords: [
          "edinburgh terminal",
          "edinburgh",
          "terminal",
          "main terminal",
        ],
        postcode: "EH12 9DN",
        country: "United Kingdom",
        state: "Scotland",
        city: "Edinburgh",
        latitude: 55.95,
        longitude: -3.3725,
        priority: 1,
      },
    ],
  },
  {
    name: "Glasgow",
    code: "GLA",
    keywords: ["glasgow", "glasgow airport", "gla"],
    terminals: [
      {
        name: "glasgow_main",
        displayName: "Glasgow Terminal",
        keywords: ["glasgow terminal", "glasgow", "terminal", "main terminal"],
        postcode: "PA3 2SW",
        country: "United Kingdom",
        state: "Scotland",
        city: "Glasgow",
        latitude: 55.8697,
        longitude: -4.4331,
        priority: 1,
      },
    ],
  },
  {
    name: "Bristol",
    code: "BRS",
    keywords: ["bristol", "bristol airport", "brs"],
    terminals: [
      {
        name: "bristol_main",
        displayName: "Bristol Terminal",
        keywords: ["bristol terminal", "bristol", "terminal", "main terminal"],
        postcode: "BS48 3DY",
        country: "United Kingdom",
        state: "England",
        city: "Bristol",
        latitude: 51.3827,
        longitude: -2.7191,
        priority: 1,
      },
    ],
  },
  {
    name: "Newcastle",
    code: "NCL",
    keywords: ["newcastle", "newcastle airport", "ncl"],
    terminals: [
      {
        name: "newcastle_main",
        displayName: "Newcastle Terminal",
        keywords: [
          "newcastle terminal",
          "newcastle",
          "terminal",
          "main terminal",
        ],
        postcode: "NE13 8BZ",
        country: "United Kingdom",
        state: "England",
        city: "Newcastle upon Tyne",
        latitude: 55.0375,
        longitude: -1.6917,
        priority: 1,
      },
    ],
  },
  {
    name: "Liverpool",
    code: "LPL",
    keywords: ["liverpool", "liverpool airport", "lpl", "john lennon"],
    terminals: [
      {
        name: "liverpool_main",
        displayName: "Liverpool John Lennon Airport Terminal",
        keywords: [
          "liverpool terminal",
          "liverpool",
          "terminal",
          "main terminal",
          "john lennon terminal",
        ],
        postcode: "L24 1YD",
        country: "United Kingdom",
        state: "England",
        city: "Liverpool",
        latitude: 53.3378,
        longitude: -2.8545,
        priority: 1,
      },
    ],
  },
  {
    name: "Leeds Bradford",
    code: "LBA",
    keywords: [
      "leeds",
      "bradford",
      "leeds bradford",
      "leeds bradford airport",
      "lba",
    ],
    terminals: [
      {
        name: "leeds_bradford_main",
        displayName: "Leeds Bradford Airport Terminal",
        keywords: [
          "leeds bradford terminal",
          "leeds terminal",
          "bradford terminal",
          "terminal",
        ],
        postcode: "LS19 7TU",
        country: "United Kingdom",
        state: "England",
        city: "Leeds",
        latitude: 53.8659,
        longitude: -1.6606,
        priority: 1,
      },
    ],
  },
  {
    name: "London City",
    code: "LCY",
    keywords: [
      "london city",
      "lcy",
      "london city airport",
      "docklands airport",
      "city airport",
    ],
    terminals: [
      {
        name: "london_city_main",
        displayName: "London City Airport Terminal",
        keywords: [
          "london city terminal",
          "lcy terminal",
          "city terminal",
          "terminal",
        ],
        postcode: "E16 2PX",
        country: "United Kingdom",
        state: "England",
        city: "London",
        latitude: 51.5048,
        longitude: 0.0495,
        priority: 1,
      },
    ],
  },
];

export const findAirportTerminals = (query: string): AirportTerminal[] => {
  const normalizedQuery = query.toLowerCase().trim();
  const matchedTerminals: AirportTerminal[] = [];
  const seenTerminals = new Set<string>();

  // Check each airport
  UK_AIRPORTS.forEach((airport) => {
    // Check if query matches airport keywords
    const airportMatches = airport.keywords.some((keyword) =>
      normalizedQuery.includes(keyword.toLowerCase())
    );

    if (airportMatches) {
      airport.terminals.forEach((terminal) => {
        // Check if query matches terminal keywords
        const terminalMatches = terminal.keywords.some((keyword) =>
          normalizedQuery.includes(keyword.toLowerCase())
        );

        if (!seenTerminals.has(terminal.name)) {
          seenTerminals.add(terminal.name);

          if (terminalMatches) {
            // Exact terminal match - high priority
            matchedTerminals.push({
              ...terminal,
              priority: terminal.priority,
            });
          } else if (airportMatches && normalizedQuery.length >= 3) {
            // General airport match - lower priority
            matchedTerminals.push({
              ...terminal,
              priority: terminal.priority + 10,
            });
          }
        }
      });
    }
  });

  // Sort by priority (lower number = higher priority)
  return matchedTerminals.sort((a, b) => a.priority - b.priority);
};

export const isAirportQuery = (query: string): boolean => {
  const normalizedQuery = query.toLowerCase().trim();

  // Check if query contains any airport or terminal keywords
  const airportKeywords = ["airport", "terminal"];
  const hasGeneralKeywords = airportKeywords.some((keyword) =>
    normalizedQuery.includes(keyword)
  );

  // Check if query matches any specific airport
  const hasSpecificAirport = UK_AIRPORTS.some((airport) =>
    airport.keywords.some((keyword) =>
      normalizedQuery.includes(keyword.toLowerCase())
    )
  );

  return hasGeneralKeywords || hasSpecificAirport;
};
