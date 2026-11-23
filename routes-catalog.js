// RIDE curated route catalog — route suggestions and province index.
// Routes are editorial suggestions; road geometry is requested at runtime from OSRM.
// Province list follows the current Italian administrative province / metropolitan city names.
window.RIDE_PROVINCES = [
  {
    "region": "Abruzzo",
    "name": "L'Aquila"
  },
  {
    "region": "Abruzzo",
    "name": "Chieti"
  },
  {
    "region": "Abruzzo",
    "name": "Pescara"
  },
  {
    "region": "Abruzzo",
    "name": "Teramo"
  },
  {
    "region": "Basilicata",
    "name": "Matera"
  },
  {
    "region": "Basilicata",
    "name": "Potenza"
  },
  {
    "region": "Calabria",
    "name": "Catanzaro"
  },
  {
    "region": "Calabria",
    "name": "Cosenza"
  },
  {
    "region": "Calabria",
    "name": "Crotone"
  },
  {
    "region": "Calabria",
    "name": "Reggio Calabria"
  },
  {
    "region": "Calabria",
    "name": "Vibo Valentia"
  },
  {
    "region": "Campania",
    "name": "Avellino"
  },
  {
    "region": "Campania",
    "name": "Benevento"
  },
  {
    "region": "Campania",
    "name": "Caserta"
  },
  {
    "region": "Campania",
    "name": "Napoli"
  },
  {
    "region": "Campania",
    "name": "Salerno"
  },
  {
    "region": "Emilia-Romagna",
    "name": "Bologna"
  },
  {
    "region": "Emilia-Romagna",
    "name": "Ferrara"
  },
  {
    "region": "Emilia-Romagna",
    "name": "Forlì-Cesena"
  },
  {
    "region": "Emilia-Romagna",
    "name": "Modena"
  },
  {
    "region": "Emilia-Romagna",
    "name": "Parma"
  },
  {
    "region": "Emilia-Romagna",
    "name": "Piacenza"
  },
  {
    "region": "Emilia-Romagna",
    "name": "Ravenna"
  },
  {
    "region": "Emilia-Romagna",
    "name": "Reggio Emilia"
  },
  {
    "region": "Emilia-Romagna",
    "name": "Rimini"
  },
  {
    "region": "Friuli-Venezia Giulia",
    "name": "Gorizia"
  },
  {
    "region": "Friuli-Venezia Giulia",
    "name": "Pordenone"
  },
  {
    "region": "Friuli-Venezia Giulia",
    "name": "Trieste"
  },
  {
    "region": "Friuli-Venezia Giulia",
    "name": "Udine"
  },
  {
    "region": "Lazio",
    "name": "Frosinone"
  },
  {
    "region": "Lazio",
    "name": "Latina"
  },
  {
    "region": "Lazio",
    "name": "Rieti"
  },
  {
    "region": "Lazio",
    "name": "Roma"
  },
  {
    "region": "Lazio",
    "name": "Viterbo"
  },
  {
    "region": "Liguria",
    "name": "Genova"
  },
  {
    "region": "Liguria",
    "name": "Imperia"
  },
  {
    "region": "Liguria",
    "name": "La Spezia"
  },
  {
    "region": "Liguria",
    "name": "Savona"
  },
  {
    "region": "Lombardia",
    "name": "Bergamo"
  },
  {
    "region": "Lombardia",
    "name": "Brescia"
  },
  {
    "region": "Lombardia",
    "name": "Como"
  },
  {
    "region": "Lombardia",
    "name": "Cremona"
  },
  {
    "region": "Lombardia",
    "name": "Lecco"
  },
  {
    "region": "Lombardia",
    "name": "Lodi"
  },
  {
    "region": "Lombardia",
    "name": "Mantova"
  },
  {
    "region": "Lombardia",
    "name": "Milano"
  },
  {
    "region": "Lombardia",
    "name": "Monza e Brianza"
  },
  {
    "region": "Lombardia",
    "name": "Pavia"
  },
  {
    "region": "Lombardia",
    "name": "Sondrio"
  },
  {
    "region": "Lombardia",
    "name": "Varese"
  },
  {
    "region": "Marche",
    "name": "Ancona"
  },
  {
    "region": "Marche",
    "name": "Ascoli Piceno"
  },
  {
    "region": "Marche",
    "name": "Fermo"
  },
  {
    "region": "Marche",
    "name": "Macerata"
  },
  {
    "region": "Marche",
    "name": "Pesaro e Urbino"
  },
  {
    "region": "Molise",
    "name": "Campobasso"
  },
  {
    "region": "Molise",
    "name": "Isernia"
  },
  {
    "region": "Piemonte",
    "name": "Alessandria"
  },
  {
    "region": "Piemonte",
    "name": "Asti"
  },
  {
    "region": "Piemonte",
    "name": "Biella"
  },
  {
    "region": "Piemonte",
    "name": "Cuneo"
  },
  {
    "region": "Piemonte",
    "name": "Novara"
  },
  {
    "region": "Piemonte",
    "name": "Torino"
  },
  {
    "region": "Piemonte",
    "name": "Verbano-Cusio-Ossola"
  },
  {
    "region": "Piemonte",
    "name": "Vercelli"
  },
  {
    "region": "Puglia",
    "name": "Bari"
  },
  {
    "region": "Puglia",
    "name": "Barletta-Andria-Trani"
  },
  {
    "region": "Puglia",
    "name": "Brindisi"
  },
  {
    "region": "Puglia",
    "name": "Foggia"
  },
  {
    "region": "Puglia",
    "name": "Lecce"
  },
  {
    "region": "Puglia",
    "name": "Taranto"
  },
  {
    "region": "Sardegna",
    "name": "Cagliari"
  },
  {
    "region": "Sardegna",
    "name": "Nuoro"
  },
  {
    "region": "Sardegna",
    "name": "Oristano"
  },
  {
    "region": "Sardegna",
    "name": "Sassari"
  },
  {
    "region": "Sardegna",
    "name": "Sud Sardegna"
  },
  {
    "region": "Sicilia",
    "name": "Agrigento"
  },
  {
    "region": "Sicilia",
    "name": "Caltanissetta"
  },
  {
    "region": "Sicilia",
    "name": "Catania"
  },
  {
    "region": "Sicilia",
    "name": "Enna"
  },
  {
    "region": "Sicilia",
    "name": "Messina"
  },
  {
    "region": "Sicilia",
    "name": "Palermo"
  },
  {
    "region": "Sicilia",
    "name": "Ragusa"
  },
  {
    "region": "Sicilia",
    "name": "Siracusa"
  },
  {
    "region": "Sicilia",
    "name": "Trapani"
  },
  {
    "region": "Toscana",
    "name": "Arezzo"
  },
  {
    "region": "Toscana",
    "name": "Firenze"
  },
  {
    "region": "Toscana",
    "name": "Grosseto"
  },
  {
    "region": "Toscana",
    "name": "Livorno"
  },
  {
    "region": "Toscana",
    "name": "Lucca"
  },
  {
    "region": "Toscana",
    "name": "Massa-Carrara"
  },
  {
    "region": "Toscana",
    "name": "Pisa"
  },
  {
    "region": "Toscana",
    "name": "Pistoia"
  },
  {
    "region": "Toscana",
    "name": "Prato"
  },
  {
    "region": "Toscana",
    "name": "Siena"
  },
  {
    "region": "Trentino-Alto Adige",
    "name": "Bolzano"
  },
  {
    "region": "Trentino-Alto Adige",
    "name": "Trento"
  },
  {
    "region": "Umbria",
    "name": "Perugia"
  },
  {
    "region": "Umbria",
    "name": "Terni"
  },
  {
    "region": "Valle d'Aosta",
    "name": "Aosta"
  },
  {
    "region": "Veneto",
    "name": "Belluno"
  },
  {
    "region": "Veneto",
    "name": "Padova"
  },
  {
    "region": "Veneto",
    "name": "Rovigo"
  },
  {
    "region": "Veneto",
    "name": "Treviso"
  },
  {
    "region": "Veneto",
    "name": "Venezia"
  },
  {
    "region": "Veneto",
    "name": "Verona"
  },
  {
    "region": "Veneto",
    "name": "Vicenza"
  }
];
window.RIDE_EXTRA_ROUTES = [
  {
    "id": "manghen",
    "name": "Passo Manghen e Valsugana",
    "region": "TRENTINO-ALTO ADIGE",
    "regionName": "Trentino-Alto Adige",
    "regions": [
      "Trentino-Alto Adige"
    ],
    "province": "Trento",
    "provinces": [
      "Trento"
    ],
    "area": "Trento",
    "short": "Tra laghi, boschi e uno dei passi più amati del Trentino.",
    "distance": 71,
    "duration": "1 h 15 min",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Trento",
        46.07,
        11.121,
        194
      ],
      [
        "Levico Terme",
        46.012,
        11.302,
        506
      ],
      [
        "Borgo Valsugana",
        46.052,
        11.456,
        386
      ],
      [
        "Passo Manghen",
        46.17,
        11.433,
        2047
      ],
      [
        "Molina di Fiemme",
        46.28,
        11.438,
        810
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "valdinon",
    "name": "Val di Non e Passo della Mendola",
    "region": "TRENTINO-ALTO ADIGE",
    "regionName": "Trentino-Alto Adige",
    "regions": [
      "Trentino-Alto Adige"
    ],
    "province": "Trento",
    "provinces": [
      "Trento",
      "Bolzano"
    ],
    "area": "Trento · Bolzano",
    "short": "Un giro tra meleti, canyon, laghi e curve panoramiche.",
    "distance": 66,
    "duration": "1 h 15 min",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Mezzolombardo",
        46.214,
        11.096,
        204
      ],
      [
        "Cles",
        46.364,
        11.033,
        658
      ],
      [
        "Lago di Santa Giustina",
        46.38,
        11.03,
        530
      ],
      [
        "Fondo",
        46.438,
        11.137,
        982
      ],
      [
        "Passo della Mendola",
        46.414,
        11.212,
        1363
      ],
      [
        "Bolzano",
        46.498,
        11.354,
        262
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "giovo",
    "name": "Passo Giovo e Val Passiria",
    "region": "TRENTINO-ALTO ADIGE",
    "regionName": "Trentino-Alto Adige",
    "regions": [
      "Trentino-Alto Adige"
    ],
    "province": "Bolzano",
    "provinces": [
      "Bolzano"
    ],
    "area": "Bolzano",
    "short": "Salita alpina, tornanti e vallate altoatesine.",
    "distance": 77,
    "duration": "2 h ",
    "level": "Impegnativo",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Vipiteno",
        46.894,
        11.432,
        948
      ],
      [
        "Passo Giovo",
        46.832,
        11.319,
        2094
      ],
      [
        "San Leonardo in Passiria",
        46.813,
        11.246,
        689
      ],
      [
        "Merano",
        46.669,
        11.16,
        325
      ],
      [
        "Bolzano",
        46.498,
        11.354,
        262
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "gardena",
    "name": "Val Gardena e Passo Gardena",
    "region": "TRENTINO-ALTO ADIGE / VENETO",
    "regionName": "Trentino-Alto Adige",
    "regions": [
      "Trentino-Alto Adige",
      "Veneto"
    ],
    "province": "Bolzano",
    "provinces": [
      "Bolzano",
      "Trento",
      "Belluno"
    ],
    "area": "Bolzano · Trento · Belluno",
    "short": "Un classico dolomitico tra Ortisei, Gardena e i panorami del Sella.",
    "distance": 73,
    "duration": "1 h 30 min",
    "level": "Intermedio",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Bolzano",
        46.498,
        11.354,
        262
      ],
      [
        "Ortisei",
        46.575,
        11.671,
        1236
      ],
      [
        "Passo Gardena",
        46.55,
        11.805,
        2121
      ],
      [
        "Corvara",
        46.551,
        11.872,
        1568
      ],
      [
        "Arabba",
        46.498,
        11.874,
        1602
      ],
      [
        "Canazei",
        46.477,
        11.771,
        1465
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "giau",
    "name": "Passo Giau e Cadore",
    "region": "VENETO",
    "regionName": "Veneto",
    "regions": [
      "Veneto"
    ],
    "province": "Belluno",
    "provinces": [
      "Belluno"
    ],
    "area": "Belluno",
    "short": "Un anello panoramico tra Cortina, il Giau e i borghi del Cadore.",
    "distance": 53,
    "duration": "1 h 30 min",
    "level": "Impegnativo",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Cortina d'Ampezzo",
        46.54,
        12.135,
        1211
      ],
      [
        "Passo Giau",
        46.483,
        12.052,
        2236
      ],
      [
        "Selva di Cadore",
        46.452,
        12.062,
        1330
      ],
      [
        "Alleghe",
        46.41,
        12.022,
        979
      ],
      [
        "Passo Falzarego",
        46.519,
        12.008,
        2105
      ],
      [
        "Cortina d'Ampezzo",
        46.54,
        12.135,
        1211
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "asiago",
    "name": "Altopiano di Asiago e Monte Grappa",
    "region": "VENETO",
    "regionName": "Veneto",
    "regions": [
      "Veneto"
    ],
    "province": "Vicenza",
    "provinces": [
      "Vicenza",
      "Treviso",
      "Belluno"
    ],
    "area": "Vicenza · Treviso · Belluno",
    "short": "Altopiani, boschi e strade panoramiche ai piedi del Grappa.",
    "distance": 108,
    "duration": "2 h ",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Bassano del Grappa",
        45.767,
        11.735,
        129
      ],
      [
        "Asiago",
        45.875,
        11.509,
        1001
      ],
      [
        "Enego",
        45.941,
        11.638,
        750
      ],
      [
        "Seren del Grappa",
        45.994,
        11.861,
        385
      ],
      [
        "Possagno",
        45.858,
        11.873,
        276
      ],
      [
        "Bassano del Grappa",
        45.767,
        11.735,
        129
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "lessinia",
    "name": "Lessinia e Monti Lessini",
    "region": "VENETO",
    "regionName": "Veneto",
    "regions": [
      "Veneto"
    ],
    "province": "Verona",
    "provinces": [
      "Verona"
    ],
    "area": "Verona",
    "short": "Curve tra pascoli, malghe e piccoli paesi della Lessinia.",
    "distance": 80,
    "duration": "1 h 30 min",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/garda-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Verona",
        45.439,
        10.993,
        59
      ],
      [
        "Grezzana",
        45.518,
        11.017,
        169
      ],
      [
        "Bosco Chiesanuova",
        45.623,
        11.034,
        1106
      ],
      [
        "Erbezzo",
        45.64,
        11.002,
        1118
      ],
      [
        "Passo Fittanze",
        45.704,
        10.994,
        1399
      ],
      [
        "Verona",
        45.439,
        10.993,
        59
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "prosecco",
    "name": "Colline del Prosecco",
    "region": "VENETO",
    "regionName": "Veneto",
    "regions": [
      "Veneto"
    ],
    "province": "Treviso",
    "provinces": [
      "Treviso"
    ],
    "area": "Treviso",
    "short": "Un giro morbido tra vigneti, borghi e colline patrimonio UNESCO.",
    "distance": 103,
    "duration": "1 h 60 min",
    "level": "Facile",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/toscana-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Conegliano",
        45.887,
        12.299,
        72
      ],
      [
        "Follina",
        45.954,
        12.12,
        191
      ],
      [
        "Valdobbiadene",
        45.9,
        11.999,
        253
      ],
      [
        "Asolo",
        45.791,
        11.911,
        190
      ],
      [
        "Vittorio Veneto",
        45.985,
        12.299,
        138
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "euganei",
    "name": "Anello dei Colli Euganei",
    "region": "VENETO",
    "regionName": "Veneto",
    "regions": [
      "Veneto"
    ],
    "province": "Padova",
    "provinces": [
      "Padova"
    ],
    "area": "Padova",
    "short": "Curve collinari, ville storiche e borghi ai piedi dei Colli Euganei.",
    "distance": 83,
    "duration": "1 h 30 min",
    "level": "Facile",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/toscana-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Padova",
        45.407,
        11.877,
        12
      ],
      [
        "Teolo",
        45.364,
        11.675,
        175
      ],
      [
        "Arquà Petrarca",
        45.269,
        11.721,
        80
      ],
      [
        "Este",
        45.225,
        11.657,
        15
      ],
      [
        "Monselice",
        45.24,
        11.75,
        9
      ],
      [
        "Padova",
        45.407,
        11.877,
        12
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "carnia",
    "name": "Carnia e Sauris",
    "region": "FRIULI-VENEZIA GIULIA",
    "regionName": "Friuli-Venezia Giulia",
    "regions": [
      "Friuli-Venezia Giulia"
    ],
    "province": "Udine",
    "provinces": [
      "Udine"
    ],
    "area": "Udine",
    "short": "Un viaggio tra vallate friulane, laghi e strade di montagna.",
    "distance": 93,
    "duration": "2 h ",
    "level": "Intermedio",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Tolmezzo",
        46.404,
        13.018,
        323
      ],
      [
        "Ampezzo",
        46.417,
        12.795,
        560
      ],
      [
        "Sauris",
        46.466,
        12.687,
        1212
      ],
      [
        "Forni di Sopra",
        46.42,
        12.578,
        907
      ],
      [
        "Villa Santina",
        46.414,
        12.925,
        363
      ],
      [
        "Tolmezzo",
        46.404,
        13.018,
        323
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "piancavallo",
    "name": "Piancavallo e Lago di Barcis",
    "region": "FRIULI-VENEZIA GIULIA",
    "regionName": "Friuli-Venezia Giulia",
    "regions": [
      "Friuli-Venezia Giulia"
    ],
    "province": "Pordenone",
    "provinces": [
      "Pordenone"
    ],
    "area": "Pordenone",
    "short": "Salita panoramica verso Piancavallo e discesa tra le acque di Barcis.",
    "distance": 78,
    "duration": "1 h 30 min",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Pordenone",
        45.963,
        12.656,
        24
      ],
      [
        "Aviano",
        46.071,
        12.59,
        159
      ],
      [
        "Piancavallo",
        46.109,
        12.52,
        1280
      ],
      [
        "Barcis",
        46.19,
        12.56,
        409
      ],
      [
        "Montereale Valcellina",
        46.153,
        12.66,
        317
      ],
      [
        "Pordenone",
        45.963,
        12.656,
        24
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "carso",
    "name": "Carso tra Trieste e Gorizia",
    "region": "FRIULI-VENEZIA GIULIA",
    "regionName": "Friuli-Venezia Giulia",
    "regions": [
      "Friuli-Venezia Giulia"
    ],
    "province": "Trieste",
    "provinces": [
      "Trieste",
      "Gorizia"
    ],
    "area": "Trieste · Gorizia",
    "short": "Un percorso tra altipiano carsico, osmize e panorami sul golfo.",
    "distance": 103,
    "duration": "1 h 60 min",
    "level": "Facile",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/garda-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Trieste",
        45.649,
        13.776,
        2
      ],
      [
        "Duino",
        45.773,
        13.604,
        20
      ],
      [
        "Monfalcone",
        45.804,
        13.533,
        7
      ],
      [
        "Gorizia",
        45.941,
        13.621,
        84
      ],
      [
        "Opicina",
        45.681,
        13.789,
        329
      ],
      [
        "Trieste",
        45.649,
        13.776,
        2
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "idro",
    "name": "Lago d'Idro e Valle Sabbia",
    "region": "LOMBARDIA / TRENTINO-ALTO ADIGE",
    "regionName": "Lombardia",
    "regions": [
      "Lombardia",
      "Trentino-Alto Adige"
    ],
    "province": "Brescia",
    "provinces": [
      "Brescia",
      "Trento"
    ],
    "area": "Brescia · Trento",
    "short": "Un itinerario tra il lago d'Idro, la Valle Sabbia e le montagne bresciane.",
    "distance": 89,
    "duration": "1 h 45 min",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/garda-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Salò",
        45.606,
        10.522,
        65
      ],
      [
        "Vestone",
        45.708,
        10.399,
        318
      ],
      [
        "Lago d'Idro",
        45.757,
        10.483,
        368
      ],
      [
        "Bagolino",
        45.822,
        10.462,
        778
      ],
      [
        "Storo",
        45.849,
        10.58,
        409
      ],
      [
        "Salò",
        45.606,
        10.522,
        65
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "spluga",
    "name": "Passo dello Spluga",
    "region": "LOMBARDIA",
    "regionName": "Lombardia",
    "regions": [
      "Lombardia"
    ],
    "province": "Sondrio",
    "provinces": [
      "Sondrio"
    ],
    "area": "Sondrio",
    "short": "Una salita alpina tra Chiavenna, Madesimo e il valico dello Spluga.",
    "distance": 56,
    "duration": "1 h 30 min",
    "level": "Impegnativo",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Chiavenna",
        46.321,
        9.398,
        333
      ],
      [
        "Campodolcino",
        46.404,
        9.353,
        1071
      ],
      [
        "Madesimo",
        46.434,
        9.357,
        1550
      ],
      [
        "Passo dello Spluga",
        46.505,
        9.331,
        2114
      ],
      [
        "Chiavenna",
        46.321,
        9.398,
        333
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "taleggio",
    "name": "Val Taleggio e San Pellegrino",
    "region": "LOMBARDIA",
    "regionName": "Lombardia",
    "regions": [
      "Lombardia"
    ],
    "province": "Bergamo",
    "provinces": [
      "Bergamo",
      "Lecco"
    ],
    "area": "Bergamo · Lecco",
    "short": "Strade sinuose tra borghi, ponti e vallate della bergamasca.",
    "distance": 77,
    "duration": "1 h 45 min",
    "level": "Intermedio",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Bergamo",
        45.698,
        9.677,
        249
      ],
      [
        "San Pellegrino Terme",
        45.839,
        9.666,
        358
      ],
      [
        "Taleggio",
        45.898,
        9.565,
        758
      ],
      [
        "Vedeseta",
        45.914,
        9.542,
        795
      ],
      [
        "Rota d'Imagna",
        45.825,
        9.501,
        700
      ],
      [
        "Bergamo",
        45.698,
        9.677,
        249
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "lario",
    "name": "Il ramo del Lago di Como",
    "region": "LOMBARDIA",
    "regionName": "Lombardia",
    "regions": [
      "Lombardia"
    ],
    "province": "Como",
    "provinces": [
      "Como",
      "Lecco"
    ],
    "area": "Como · Lecco",
    "short": "Un giro tra Como, Bellagio, Varenna e i panorami del Lario.",
    "distance": 94,
    "duration": "1 h 45 min",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/garda-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Como",
        45.808,
        9.085,
        201
      ],
      [
        "Bellagio",
        45.987,
        9.261,
        229
      ],
      [
        "Varenna",
        46.011,
        9.284,
        220
      ],
      [
        "Lecco",
        45.856,
        9.397,
        214
      ],
      [
        "Como",
        45.808,
        9.085,
        201
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "oltrepo",
    "name": "Oltrepò Pavese e Passo del Penice",
    "region": "LOMBARDIA / EMILIA-ROMAGNA",
    "regionName": "Lombardia",
    "regions": [
      "Lombardia",
      "Emilia-Romagna"
    ],
    "province": "Pavia",
    "provinces": [
      "Pavia",
      "Piacenza"
    ],
    "area": "Pavia · Piacenza",
    "short": "Colline, vigneti e curve appenniniche tra Lombardia ed Emilia.",
    "distance": 142,
    "duration": "2 h 45 min",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/toscana-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Pavia",
        45.185,
        9.158,
        77
      ],
      [
        "Casteggio",
        45.01,
        9.126,
        90
      ],
      [
        "Varzi",
        44.819,
        9.197,
        416
      ],
      [
        "Passo del Penice",
        44.79,
        9.26,
        1149
      ],
      [
        "Bobbio",
        44.77,
        9.386,
        272
      ],
      [
        "Pavia",
        45.185,
        9.158,
        77
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "lombarda",
    "name": "Colle della Lombarda",
    "region": "PIEMONTE",
    "regionName": "Piemonte",
    "regions": [
      "Piemonte"
    ],
    "province": "Cuneo",
    "provinces": [
      "Cuneo"
    ],
    "area": "Cuneo",
    "short": "Un valico d'alta quota tra le Alpi Marittime e la Valle Stura.",
    "distance": 59,
    "duration": "1 h 30 min",
    "level": "Impegnativo",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Cuneo",
        44.384,
        7.542,
        534
      ],
      [
        "Demonte",
        44.315,
        7.299,
        780
      ],
      [
        "Vinadio",
        44.307,
        7.174,
        904
      ],
      [
        "Colle della Lombarda",
        44.201,
        7.149,
        2350
      ],
      [
        "Isola 2000",
        44.186,
        7.157,
        2000
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "finestre",
    "name": "Colle delle Finestre e Sestriere",
    "region": "PIEMONTE",
    "regionName": "Piemonte",
    "regions": [
      "Piemonte"
    ],
    "province": "Torino",
    "provinces": [
      "Torino"
    ],
    "area": "Torino",
    "short": "Una grande salita alpina tra Val di Susa, Finestre e Sestriere.",
    "distance": 44,
    "duration": "1 h 15 min",
    "level": "Impegnativo",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Susa",
        45.137,
        7.055,
        503
      ],
      [
        "Meana di Susa",
        45.124,
        7.057,
        681
      ],
      [
        "Colle delle Finestre",
        45.062,
        7.058,
        2176
      ],
      [
        "Sestriere",
        44.958,
        6.878,
        2035
      ],
      [
        "Cesana Torinese",
        44.952,
        6.792,
        1354
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "zegna",
    "name": "Panoramica Zegna",
    "region": "PIEMONTE",
    "regionName": "Piemonte",
    "regions": [
      "Piemonte"
    ],
    "province": "Biella",
    "provinces": [
      "Biella"
    ],
    "area": "Biella",
    "short": "Un balcone panoramico tra boschi e montagne biellesi.",
    "distance": 53,
    "duration": "1 h ",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Biella",
        45.562,
        8.058,
        420
      ],
      [
        "Trivero",
        45.65,
        8.172,
        739
      ],
      [
        "Bielmonte",
        45.681,
        8.087,
        1518
      ],
      [
        "Oropa",
        45.63,
        7.982,
        1180
      ],
      [
        "Biella",
        45.562,
        8.058,
        420
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "maggiore",
    "name": "Lago Maggiore e Mottarone",
    "region": "PIEMONTE",
    "regionName": "Piemonte",
    "regions": [
      "Piemonte"
    ],
    "province": "Verbano-Cusio-Ossola",
    "provinces": [
      "Verbano-Cusio-Ossola",
      "Novara"
    ],
    "area": "Verbano-Cusio-Ossola · Novara",
    "short": "Un giro tra il lago, Stresa e la salita panoramica al Mottarone.",
    "distance": 55,
    "duration": "1 h ",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/garda-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Verbania",
        45.929,
        8.555,
        197
      ],
      [
        "Stresa",
        45.884,
        8.539,
        200
      ],
      [
        "Mottarone",
        45.879,
        8.49,
        1491
      ],
      [
        "Omegna",
        45.876,
        8.407,
        295
      ],
      [
        "Orta San Giulio",
        45.799,
        8.418,
        294
      ],
      [
        "Verbania",
        45.929,
        8.555,
        197
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "langhe",
    "name": "Langhe e Roero",
    "region": "PIEMONTE",
    "regionName": "Piemonte",
    "regions": [
      "Piemonte"
    ],
    "province": "Cuneo",
    "provinces": [
      "Cuneo",
      "Asti",
      "Alessandria"
    ],
    "area": "Cuneo · Asti · Alessandria",
    "short": "Un itinerario tra colline, castelli e strade del vino piemontese.",
    "distance": 97,
    "duration": "1 h 45 min",
    "level": "Facile",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/toscana-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Alba",
        44.7,
        8.035,
        172
      ],
      [
        "Barolo",
        44.61,
        7.942,
        301
      ],
      [
        "La Morra",
        44.638,
        7.934,
        513
      ],
      [
        "Monforte d'Alba",
        44.582,
        7.968,
        480
      ],
      [
        "Canelli",
        44.721,
        8.29,
        167
      ],
      [
        "Asti",
        44.9,
        8.206,
        123
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "bracco",
    "name": "Passo del Bracco e Golfo del Tigullio",
    "region": "LIGURIA",
    "regionName": "Liguria",
    "regions": [
      "Liguria"
    ],
    "province": "Genova",
    "provinces": [
      "Genova",
      "La Spezia"
    ],
    "area": "Genova · La Spezia",
    "short": "Costa ligure e strade dell'entroterra tra Sestri Levante e Levanto.",
    "distance": 71,
    "duration": "1 h 30 min",
    "level": "Intermedio",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/garda-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Chiavari",
        44.317,
        9.322,
        5
      ],
      [
        "Sestri Levante",
        44.273,
        9.396,
        10
      ],
      [
        "Passo del Bracco",
        44.255,
        9.535,
        615
      ],
      [
        "Moneglia",
        44.239,
        9.49,
        4
      ],
      [
        "Levanto",
        44.17,
        9.612,
        3
      ],
      [
        "La Spezia",
        44.103,
        9.824,
        3
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "nava",
    "name": "Colle di Nava e Valle Arroscia",
    "region": "LIGURIA",
    "regionName": "Liguria",
    "regions": [
      "Liguria"
    ],
    "province": "Imperia",
    "provinces": [
      "Imperia",
      "Savona"
    ],
    "area": "Imperia · Savona",
    "short": "Un percorso tra uliveti, borghi liguri e valichi dell'entroterra.",
    "distance": 107,
    "duration": "2 h ",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/garda-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Imperia",
        43.889,
        8.039,
        10
      ],
      [
        "Pieve di Teco",
        44.049,
        7.916,
        240
      ],
      [
        "Colle di Nava",
        44.075,
        7.932,
        941
      ],
      [
        "Ormea",
        44.154,
        7.925,
        736
      ],
      [
        "Albenga",
        44.049,
        8.215,
        5
      ],
      [
        "Imperia",
        43.889,
        8.039,
        10
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "muraglione",
    "name": "Passo del Muraglione",
    "region": "EMILIA-ROMAGNA / TOSCANA",
    "regionName": "Emilia-Romagna",
    "regions": [
      "Emilia-Romagna",
      "Toscana"
    ],
    "province": "Forlì-Cesena",
    "provinces": [
      "Forlì-Cesena",
      "Firenze"
    ],
    "area": "Forlì-Cesena · Firenze",
    "short": "Un classico appenninico tra Romagna e Mugello, tra boschi e tornanti.",
    "distance": 150,
    "duration": "3 h 15 min",
    "level": "Intermedio",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/toscana-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Forlì",
        44.223,
        12.052,
        34
      ],
      [
        "San Benedetto in Alpe",
        44.034,
        11.704,
        495
      ],
      [
        "Passo del Muraglione",
        43.957,
        11.659,
        907
      ],
      [
        "San Godenzo",
        43.926,
        11.617,
        404
      ],
      [
        "Dicomano",
        43.892,
        11.522,
        162
      ],
      [
        "Forlì",
        44.223,
        12.052,
        34
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "raticosa",
    "name": "Passo della Raticosa e della Futa",
    "region": "EMILIA-ROMAGNA / TOSCANA",
    "regionName": "Emilia-Romagna",
    "regions": [
      "Emilia-Romagna",
      "Toscana"
    ],
    "province": "Bologna",
    "provinces": [
      "Bologna",
      "Firenze"
    ],
    "area": "Bologna · Firenze",
    "short": "Due valichi storici tra le curve dell'Appennino tosco-emiliano.",
    "distance": 132,
    "duration": "2 h 60 min",
    "level": "Intermedio",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/toscana-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Bologna",
        44.494,
        11.343,
        54
      ],
      [
        "Loiano",
        44.267,
        11.323,
        714
      ],
      [
        "Passo della Raticosa",
        44.111,
        11.322,
        968
      ],
      [
        "Firenzuola",
        44.119,
        11.379,
        422
      ],
      [
        "Passo della Futa",
        44.104,
        11.273,
        903
      ],
      [
        "Bologna",
        44.494,
        11.343,
        54
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "cisa",
    "name": "Passo della Cisa e Lunigiana",
    "region": "EMILIA-ROMAGNA / TOSCANA",
    "regionName": "Emilia-Romagna",
    "regions": [
      "Emilia-Romagna",
      "Toscana"
    ],
    "province": "Parma",
    "provinces": [
      "Parma",
      "Massa-Carrara"
    ],
    "area": "Parma · Massa-Carrara",
    "short": "Un collegamento appenninico tra Parma, il valico della Cisa e Pontremoli.",
    "distance": 82,
    "duration": "1 h 45 min",
    "level": "Intermedio",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/toscana-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Parma",
        44.802,
        10.328,
        55
      ],
      [
        "Fornovo di Taro",
        44.692,
        10.101,
        158
      ],
      [
        "Berceto",
        44.509,
        9.991,
        852
      ],
      [
        "Passo della Cisa",
        44.472,
        9.923,
        1041
      ],
      [
        "Pontremoli",
        44.375,
        9.879,
        236
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "trebbia",
    "name": "Val Trebbia e Bobbio",
    "region": "EMILIA-ROMAGNA / LIGURIA",
    "regionName": "Emilia-Romagna",
    "regions": [
      "Emilia-Romagna",
      "Liguria"
    ],
    "province": "Piacenza",
    "provinces": [
      "Piacenza",
      "Genova"
    ],
    "area": "Piacenza · Genova",
    "short": "La valle del Trebbia tra gole, curve e borghi appenninici.",
    "distance": 149,
    "duration": "3 h 15 min",
    "level": "Intermedio",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/toscana-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Piacenza",
        45.052,
        9.693,
        61
      ],
      [
        "Rivergaro",
        44.911,
        9.596,
        140
      ],
      [
        "Bobbio",
        44.77,
        9.386,
        272
      ],
      [
        "Marsaglia",
        44.713,
        9.388,
        520
      ],
      [
        "Ottone",
        44.625,
        9.332,
        510
      ],
      [
        "Piacenza",
        45.052,
        9.693,
        61
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "sanleo",
    "name": "San Leo e Valmarecchia",
    "region": "EMILIA-ROMAGNA",
    "regionName": "Emilia-Romagna",
    "regions": [
      "Emilia-Romagna"
    ],
    "province": "Rimini",
    "provinces": [
      "Rimini",
      "Forlì-Cesena"
    ],
    "area": "Rimini · Forlì-Cesena",
    "short": "Un giro tra rocche, colline e borghi dell'entroterra romagnolo.",
    "distance": 98,
    "duration": "1 h 60 min",
    "level": "Facile",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/toscana-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Rimini",
        44.06,
        12.565,
        5
      ],
      [
        "Verucchio",
        43.984,
        12.422,
        296
      ],
      [
        "San Leo",
        43.896,
        12.344,
        589
      ],
      [
        "Pennabilli",
        43.818,
        12.266,
        629
      ],
      [
        "Novafeltria",
        43.895,
        12.289,
        275
      ],
      [
        "Rimini",
        44.06,
        12.565,
        5
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "abetone",
    "name": "Abetone e Appennino Modenese",
    "region": "EMILIA-ROMAGNA / TOSCANA",
    "regionName": "Emilia-Romagna",
    "regions": [
      "Emilia-Romagna",
      "Toscana"
    ],
    "province": "Modena",
    "provinces": [
      "Modena",
      "Pistoia",
      "Lucca"
    ],
    "area": "Modena · Pistoia · Lucca",
    "short": "Un itinerario montano tra Sestola, Abetone e foreste appenniniche.",
    "distance": 163,
    "duration": "3 h 30 min",
    "level": "Intermedio",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Modena",
        44.647,
        10.925,
        34
      ],
      [
        "Pavullo nel Frignano",
        44.333,
        10.834,
        682
      ],
      [
        "Sestola",
        44.23,
        10.773,
        1020
      ],
      [
        "Abetone",
        44.145,
        10.664,
        1388
      ],
      [
        "Pievepelago",
        44.205,
        10.616,
        781
      ],
      [
        "Modena",
        44.647,
        10.925,
        34
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "garfagnana",
    "name": "Garfagnana e Alpi Apuane",
    "region": "TOSCANA",
    "regionName": "Toscana",
    "regions": [
      "Toscana"
    ],
    "province": "Lucca",
    "provinces": [
      "Lucca",
      "Massa-Carrara"
    ],
    "area": "Lucca · Massa-Carrara",
    "short": "Curve e borghi tra il Serchio, la Garfagnana e le Apuane.",
    "distance": 95,
    "duration": "1 h 45 min",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/toscana-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Lucca",
        43.843,
        10.507,
        19
      ],
      [
        "Borgo a Mozzano",
        43.98,
        10.545,
        97
      ],
      [
        "Barga",
        44.074,
        10.481,
        410
      ],
      [
        "Castelnuovo di Garfagnana",
        44.109,
        10.412,
        270
      ],
      [
        "Passo dei Carpinelli",
        44.186,
        10.22,
        842
      ],
      [
        "Aulla",
        44.217,
        9.969,
        64
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "casentino",
    "name": "Casentino e Valico di Viamaggio",
    "region": "TOSCANA",
    "regionName": "Toscana",
    "regions": [
      "Toscana"
    ],
    "province": "Arezzo",
    "provinces": [
      "Arezzo",
      "Firenze"
    ],
    "area": "Arezzo · Firenze",
    "short": "Un giro tra foreste, pievi e passi dell'Appennino aretino.",
    "distance": 90,
    "duration": "1 h 45 min",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/toscana-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Arezzo",
        43.463,
        11.879,
        296
      ],
      [
        "Bibbiena",
        43.696,
        11.819,
        425
      ],
      [
        "Poppi",
        43.722,
        11.766,
        437
      ],
      [
        "Chiusi della Verna",
        43.698,
        11.936,
        954
      ],
      [
        "Pieve Santo Stefano",
        43.67,
        12.042,
        432
      ],
      [
        "Sansepolcro",
        43.57,
        12.138,
        330
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "maremma",
    "name": "Maremma e Costa degli Etruschi",
    "region": "TOSCANA",
    "regionName": "Toscana",
    "regions": [
      "Toscana"
    ],
    "province": "Grosseto",
    "provinces": [
      "Grosseto",
      "Livorno"
    ],
    "area": "Grosseto · Livorno",
    "short": "Paesaggi di mare e colline tra Bolgheri, Castagneto e la Maremma.",
    "distance": 117,
    "duration": "2 h 15 min",
    "level": "Facile",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/toscana-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Grosseto",
        42.763,
        11.113,
        10
      ],
      [
        "Castiglione della Pescaia",
        42.763,
        10.881,
        3
      ],
      [
        "Follonica",
        42.925,
        10.761,
        4
      ],
      [
        "Castagneto Carducci",
        43.16,
        10.612,
        194
      ],
      [
        "Bolgheri",
        43.236,
        10.618,
        111
      ],
      [
        "Cecina",
        43.312,
        10.518,
        15
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "furlo",
    "name": "San Bartolo e Gola del Furlo",
    "region": "MARCHE",
    "regionName": "Marche",
    "regions": [
      "Marche"
    ],
    "province": "Pesaro e Urbino",
    "provinces": [
      "Pesaro e Urbino"
    ],
    "area": "Pesaro e Urbino",
    "short": "Dal mare di Pesaro alle curve della gola del Furlo e dell'entroterra.",
    "distance": 123,
    "duration": "2 h 15 min",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/garda-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Pesaro",
        43.91,
        12.914,
        11
      ],
      [
        "Fiorenzuola di Focara",
        43.957,
        12.784,
        180
      ],
      [
        "Urbino",
        43.726,
        12.636,
        451
      ],
      [
        "Gola del Furlo",
        43.651,
        12.722,
        190
      ],
      [
        "Acqualagna",
        43.624,
        12.673,
        204
      ],
      [
        "Pesaro",
        43.91,
        12.914,
        11
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "conero",
    "name": "Riviera del Conero",
    "region": "MARCHE",
    "regionName": "Marche",
    "regions": [
      "Marche"
    ],
    "province": "Ancona",
    "provinces": [
      "Ancona"
    ],
    "area": "Ancona",
    "short": "Un giro tra il mare del Conero, Sirolo, Numana e le colline marchigiane.",
    "distance": 57,
    "duration": "1 h ",
    "level": "Facile",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/garda-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Ancona",
        43.615,
        13.518,
        16
      ],
      [
        "Portonovo",
        43.55,
        13.57,
        3
      ],
      [
        "Sirolo",
        43.522,
        13.613,
        125
      ],
      [
        "Numana",
        43.51,
        13.621,
        5
      ],
      [
        "Loreto",
        43.439,
        13.61,
        127
      ],
      [
        "Ancona",
        43.615,
        13.518,
        16
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "sibillini",
    "name": "Monti Sibillini e Piana di Castelluccio",
    "region": "MARCHE",
    "regionName": "Marche",
    "regions": [
      "Marche"
    ],
    "province": "Macerata",
    "provinces": [
      "Macerata",
      "Ascoli Piceno"
    ],
    "area": "Macerata · Ascoli Piceno",
    "short": "Strade di montagna tra altopiani, borghi e panorami dei Sibillini.",
    "distance": 133,
    "duration": "3 h 30 min",
    "level": "Impegnativo",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Macerata",
        43.3,
        13.453,
        315
      ],
      [
        "Sarnano",
        43.034,
        13.3,
        539
      ],
      [
        "Lago di Fiastra",
        43.036,
        13.164,
        640
      ],
      [
        "Castelluccio di Norcia",
        42.828,
        13.206,
        1452
      ],
      [
        "Arquata del Tronto",
        42.773,
        13.296,
        777
      ],
      [
        "Ascoli Piceno",
        42.854,
        13.575,
        154
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "castelluccio",
    "name": "Castelluccio e Piana di Norcia",
    "region": "UMBRIA / MARCHE",
    "regionName": "Umbria",
    "regions": [
      "Umbria",
      "Marche"
    ],
    "province": "Perugia",
    "provinces": [
      "Perugia",
      "Ascoli Piceno"
    ],
    "area": "Perugia · Ascoli Piceno",
    "short": "Un anello tra Norcia, la piana e i panorami dei Monti Sibillini.",
    "distance": 48,
    "duration": "1 h ",
    "level": "Intermedio",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Norcia",
        42.793,
        13.096,
        604
      ],
      [
        "Castelluccio di Norcia",
        42.828,
        13.206,
        1452
      ],
      [
        "Forca di Presta",
        42.784,
        13.251,
        1536
      ],
      [
        "Arquata del Tronto",
        42.773,
        13.296,
        777
      ],
      [
        "Norcia",
        42.793,
        13.096,
        604
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "valnerina",
    "name": "Valnerina e Cascata delle Marmore",
    "region": "UMBRIA",
    "regionName": "Umbria",
    "regions": [
      "Umbria"
    ],
    "province": "Terni",
    "provinces": [
      "Terni",
      "Perugia"
    ],
    "area": "Terni · Perugia",
    "short": "Un percorso tra gole, borghi medievali e la cascata delle Marmore.",
    "distance": 125,
    "duration": "2 h 30 min",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/toscana-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Terni",
        42.563,
        12.643,
        130
      ],
      [
        "Cascata delle Marmore",
        42.553,
        12.712,
        165
      ],
      [
        "Ferentillo",
        42.62,
        12.788,
        260
      ],
      [
        "Scheggino",
        42.713,
        12.831,
        281
      ],
      [
        "Norcia",
        42.793,
        13.096,
        604
      ],
      [
        "Terni",
        42.563,
        12.643,
        130
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "castelli",
    "name": "Castelli Romani e Lago Albano",
    "region": "LAZIO",
    "regionName": "Lazio",
    "regions": [
      "Lazio"
    ],
    "province": "Roma",
    "provinces": [
      "Roma"
    ],
    "area": "Roma",
    "short": "Un giro collinare tra borghi, laghi vulcanici e panorami sui Castelli.",
    "distance": 75,
    "duration": "1 h 30 min",
    "level": "Facile",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/toscana-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Roma",
        41.903,
        12.496,
        21
      ],
      [
        "Frascati",
        41.808,
        12.68,
        320
      ],
      [
        "Rocca di Papa",
        41.765,
        12.705,
        680
      ],
      [
        "Nemi",
        41.721,
        12.718,
        521
      ],
      [
        "Castel Gandolfo",
        41.746,
        12.65,
        426
      ],
      [
        "Roma",
        41.903,
        12.496,
        21
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "terminillo",
    "name": "Terminillo e Valle del Velino",
    "region": "LAZIO",
    "regionName": "Lazio",
    "regions": [
      "Lazio"
    ],
    "province": "Rieti",
    "provinces": [
      "Rieti"
    ],
    "area": "Rieti",
    "short": "Una salita panoramica verso il Terminillo tra boschi e vallate.",
    "distance": 62,
    "duration": "1 h 30 min",
    "level": "Intermedio",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Rieti",
        42.404,
        12.862,
        405
      ],
      [
        "Cantalice",
        42.466,
        12.902,
        660
      ],
      [
        "Pian de' Valli",
        42.462,
        12.995,
        1620
      ],
      [
        "Terminillo",
        42.475,
        12.997,
        1900
      ],
      [
        "Leonessa",
        42.565,
        12.961,
        969
      ],
      [
        "Rieti",
        42.404,
        12.862,
        405
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "tuscia",
    "name": "Tuscia e Lago di Bolsena",
    "region": "LAZIO",
    "regionName": "Lazio",
    "regions": [
      "Lazio"
    ],
    "province": "Viterbo",
    "provinces": [
      "Viterbo"
    ],
    "area": "Viterbo",
    "short": "Un viaggio tra borghi etruschi, strade tranquille e il lago vulcanico.",
    "distance": 78,
    "duration": "1 h 30 min",
    "level": "Facile",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/toscana-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Viterbo",
        42.418,
        12.108,
        326
      ],
      [
        "Montefiascone",
        42.541,
        12.034,
        590
      ],
      [
        "Bolsena",
        42.644,
        11.985,
        350
      ],
      [
        "Civita di Bagnoregio",
        42.627,
        12.088,
        443
      ],
      [
        "Viterbo",
        42.418,
        12.108,
        326
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "campo",
    "name": "Campo Imperatore e Gran Sasso",
    "region": "ABRUZZO",
    "regionName": "Abruzzo",
    "regions": [
      "Abruzzo"
    ],
    "province": "L'Aquila",
    "provinces": [
      "L'Aquila",
      "Teramo"
    ],
    "area": "L'Aquila · Teramo",
    "short": "Altopiani aperti e grandi panorami nel cuore del Gran Sasso.",
    "distance": 81,
    "duration": "2 h 15 min",
    "level": "Impegnativo",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "L'Aquila",
        42.35,
        13.399,
        714
      ],
      [
        "Assergi",
        42.427,
        13.499,
        867
      ],
      [
        "Campo Imperatore",
        42.444,
        13.558,
        2130
      ],
      [
        "Castel del Monte",
        42.365,
        13.728,
        1346
      ],
      [
        "Santo Stefano di Sessanio",
        42.344,
        13.646,
        1251
      ],
      [
        "L'Aquila",
        42.35,
        13.399,
        714
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "trabocchi",
    "name": "Costa dei Trabocchi",
    "region": "ABRUZZO",
    "regionName": "Abruzzo",
    "regions": [
      "Abruzzo"
    ],
    "province": "Chieti",
    "provinces": [
      "Chieti",
      "Pescara"
    ],
    "area": "Chieti · Pescara",
    "short": "Un itinerario costiero tra spiagge, trabocchi e borghi marinari.",
    "distance": 75,
    "duration": "1 h 30 min",
    "level": "Facile",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/garda-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Pescara",
        42.461,
        14.216,
        4
      ],
      [
        "Francavilla al Mare",
        42.422,
        14.282,
        3
      ],
      [
        "Ortona",
        42.351,
        14.403,
        72
      ],
      [
        "San Vito Chietino",
        42.3,
        14.444,
        122
      ],
      [
        "Fossacesia",
        42.247,
        14.484,
        140
      ],
      [
        "Vasto",
        42.111,
        14.709,
        144
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "maiella",
    "name": "Maiella e Passo Lanciano",
    "region": "ABRUZZO",
    "regionName": "Abruzzo",
    "regions": [
      "Abruzzo"
    ],
    "province": "Pescara",
    "provinces": [
      "Pescara",
      "Chieti"
    ],
    "area": "Pescara · Chieti",
    "short": "Curve appenniniche tra borghi, boschi e le pendici della Maiella.",
    "distance": 103,
    "duration": "2 h 15 min",
    "level": "Intermedio",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Pescara",
        42.461,
        14.216,
        4
      ],
      [
        "Manoppello",
        42.258,
        14.059,
        217
      ],
      [
        "Roccamorice",
        42.212,
        14.028,
        520
      ],
      [
        "Passo Lanciano",
        42.184,
        14.094,
        1306
      ],
      [
        "Guardiagrele",
        42.193,
        14.219,
        576
      ],
      [
        "Pescara",
        42.461,
        14.216,
        4
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "matese",
    "name": "Matese e Alto Molise",
    "region": "MOLISE / CAMPANIA",
    "regionName": "Molise",
    "regions": [
      "Molise",
      "Campania"
    ],
    "province": "Campobasso",
    "provinces": [
      "Campobasso",
      "Isernia",
      "Caserta"
    ],
    "area": "Campobasso · Isernia · Caserta",
    "short": "Un giro tra altopiani, laghi e borghi dell'Appennino molisano.",
    "distance": 143,
    "duration": "2 h 45 min",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Campobasso",
        41.56,
        14.662,
        701
      ],
      [
        "Bojano",
        41.486,
        14.471,
        482
      ],
      [
        "Lago del Matese",
        41.458,
        14.407,
        1011
      ],
      [
        "Isernia",
        41.596,
        14.233,
        423
      ],
      [
        "Agnone",
        41.809,
        14.376,
        830
      ],
      [
        "Campobasso",
        41.56,
        14.662,
        701
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "cilento",
    "name": "Cilento e Costa degli Infreschi",
    "region": "CAMPANIA",
    "regionName": "Campania",
    "regions": [
      "Campania"
    ],
    "province": "Salerno",
    "provinces": [
      "Salerno"
    ],
    "area": "Salerno",
    "short": "Un itinerario tra borghi, baie e strade panoramiche del Cilento.",
    "distance": 130,
    "duration": "2 h 30 min",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/garda-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Salerno",
        40.682,
        14.768,
        4
      ],
      [
        "Paestum",
        40.42,
        15.005,
        15
      ],
      [
        "Agropoli",
        40.35,
        14.99,
        24
      ],
      [
        "Castellabate",
        40.282,
        14.951,
        280
      ],
      [
        "Acciaroli",
        40.181,
        15.027,
        5
      ],
      [
        "Marina di Camerota",
        40.032,
        15.373,
        5
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "irpinia",
    "name": "Irpinia e Sannio",
    "region": "CAMPANIA",
    "regionName": "Campania",
    "regions": [
      "Campania"
    ],
    "province": "Avellino",
    "provinces": [
      "Avellino",
      "Benevento"
    ],
    "area": "Avellino · Benevento",
    "short": "Curve nell'entroterra campano tra boschi, borghi e alture.",
    "distance": 153,
    "duration": "2 h 60 min",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/toscana-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Avellino",
        40.914,
        14.791,
        348
      ],
      [
        "Laceno",
        40.809,
        15.108,
        1050
      ],
      [
        "Montella",
        40.844,
        15.032,
        560
      ],
      [
        "Sant'Angelo dei Lombardi",
        40.929,
        15.177,
        870
      ],
      [
        "Benevento",
        41.13,
        14.782,
        135
      ],
      [
        "Avellino",
        40.914,
        14.791,
        348
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "gargano",
    "name": "Gargano e Foresta Umbra",
    "region": "PUGLIA",
    "regionName": "Puglia",
    "regions": [
      "Puglia"
    ],
    "province": "Foggia",
    "provinces": [
      "Foggia"
    ],
    "area": "Foggia",
    "short": "Un giro tra costa, foresta e borghi del promontorio garganico.",
    "distance": 129,
    "duration": "2 h 30 min",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/garda-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Manfredonia",
        41.631,
        15.914,
        5
      ],
      [
        "Monte Sant'Angelo",
        41.707,
        15.956,
        796
      ],
      [
        "Foresta Umbra",
        41.823,
        15.9,
        800
      ],
      [
        "Vieste",
        41.882,
        16.176,
        43
      ],
      [
        "Peschici",
        41.947,
        16.012,
        90
      ],
      [
        "Manfredonia",
        41.631,
        15.914,
        5
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "itria",
    "name": "Valle d'Itria e Murgia",
    "region": "PUGLIA",
    "regionName": "Puglia",
    "regions": [
      "Puglia"
    ],
    "province": "Bari",
    "provinces": [
      "Bari",
      "Taranto",
      "Brindisi"
    ],
    "area": "Bari · Taranto · Brindisi",
    "short": "Trulli, masserie e strade tra ulivi e borghi bianchi.",
    "distance": 112,
    "duration": "2 h 15 min",
    "level": "Facile",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/toscana-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Bari",
        41.125,
        16.866,
        5
      ],
      [
        "Alberobello",
        40.783,
        17.237,
        428
      ],
      [
        "Locorotondo",
        40.756,
        17.326,
        410
      ],
      [
        "Martina Franca",
        40.704,
        17.338,
        431
      ],
      [
        "Cisternino",
        40.743,
        17.426,
        394
      ],
      [
        "Ostuni",
        40.729,
        17.577,
        218
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "salento",
    "name": "Salento e Costa Adriatica",
    "region": "PUGLIA",
    "regionName": "Puglia",
    "regions": [
      "Puglia"
    ],
    "province": "Lecce",
    "provinces": [
      "Lecce",
      "Brindisi"
    ],
    "area": "Lecce · Brindisi",
    "short": "Un giro tra Lecce, Otranto, Santa Maria di Leuca e il mare del Salento.",
    "distance": 204,
    "duration": "3 h 60 min",
    "level": "Facile",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/garda-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Lecce",
        40.352,
        18.174,
        49
      ],
      [
        "Otranto",
        40.144,
        18.491,
        15
      ],
      [
        "Santa Cesarea Terme",
        40.038,
        18.456,
        25
      ],
      [
        "Santa Maria di Leuca",
        39.799,
        18.358,
        5
      ],
      [
        "Gallipoli",
        40.055,
        17.992,
        12
      ],
      [
        "Lecce",
        40.352,
        18.174,
        49
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "dolomiti-lucane",
    "name": "Dolomiti Lucane e Castelmezzano",
    "region": "BASILICATA",
    "regionName": "Basilicata",
    "regions": [
      "Basilicata"
    ],
    "province": "Potenza",
    "provinces": [
      "Potenza"
    ],
    "area": "Potenza",
    "short": "Strade tra guglie rocciose, borghi arroccati e paesaggi lucani.",
    "distance": 107,
    "duration": "2 h ",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Potenza",
        40.64,
        15.805,
        819
      ],
      [
        "Pietrapertosa",
        40.519,
        16.063,
        1088
      ],
      [
        "Castelmezzano",
        40.529,
        16.045,
        750
      ],
      [
        "Accettura",
        40.49,
        16.157,
        770
      ],
      [
        "Tricarico",
        40.617,
        16.145,
        698
      ],
      [
        "Potenza",
        40.64,
        15.805,
        819
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "matera",
    "name": "Matera e Murgia",
    "region": "BASILICATA",
    "regionName": "Basilicata",
    "regions": [
      "Basilicata"
    ],
    "province": "Matera",
    "provinces": [
      "Matera"
    ],
    "area": "Matera",
    "short": "Un giro tra gravine, altopiani e paesaggi rupestri della Murgia.",
    "distance": 114,
    "duration": "2 h 15 min",
    "level": "Facile",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/toscana-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Matera",
        40.666,
        16.604,
        401
      ],
      [
        "Montescaglioso",
        40.55,
        16.665,
        365
      ],
      [
        "Miglionico",
        40.568,
        16.501,
        461
      ],
      [
        "Gravina in Puglia",
        40.817,
        16.417,
        338
      ],
      [
        "Altamura",
        40.826,
        16.552,
        467
      ],
      [
        "Matera",
        40.666,
        16.604,
        401
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "sila",
    "name": "Sila Grande e Lago Cecita",
    "region": "CALABRIA",
    "regionName": "Calabria",
    "regions": [
      "Calabria"
    ],
    "province": "Cosenza",
    "provinces": [
      "Cosenza",
      "Catanzaro"
    ],
    "area": "Cosenza · Catanzaro",
    "short": "Un anello tra boschi, laghi e altopiani della Sila.",
    "distance": 113,
    "duration": "2 h 15 min",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Cosenza",
        39.298,
        16.253,
        238
      ],
      [
        "Camigliatello Silano",
        39.337,
        16.441,
        1272
      ],
      [
        "Lago Cecita",
        39.325,
        16.5,
        1143
      ],
      [
        "Lorica",
        39.243,
        16.511,
        1314
      ],
      [
        "San Giovanni in Fiore",
        39.263,
        16.697,
        1049
      ],
      [
        "Cosenza",
        39.298,
        16.253,
        238
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "dei",
    "name": "Costa degli Dei e Serre",
    "region": "CALABRIA",
    "regionName": "Calabria",
    "regions": [
      "Calabria"
    ],
    "province": "Vibo Valentia",
    "provinces": [
      "Vibo Valentia",
      "Catanzaro"
    ],
    "area": "Vibo Valentia · Catanzaro",
    "short": "Mare cristallino, promontori e strade collinari della Calabria tirrenica.",
    "distance": 129,
    "duration": "2 h 30 min",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/garda-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Vibo Valentia",
        38.676,
        16.101,
        476
      ],
      [
        "Tropea",
        38.676,
        15.898,
        61
      ],
      [
        "Capo Vaticano",
        38.625,
        15.849,
        124
      ],
      [
        "Serra San Bruno",
        38.575,
        16.327,
        790
      ],
      [
        "Pizzo",
        38.735,
        16.162,
        44
      ],
      [
        "Vibo Valentia",
        38.676,
        16.101,
        476
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "aspromonte",
    "name": "Aspromonte e Gambarie",
    "region": "CALABRIA",
    "regionName": "Calabria",
    "regions": [
      "Calabria"
    ],
    "province": "Reggio Calabria",
    "provinces": [
      "Reggio Calabria"
    ],
    "area": "Reggio Calabria",
    "short": "Una salita tra boschi, crinali e panorami sullo Stretto.",
    "distance": 84,
    "duration": "2 h 15 min",
    "level": "Impegnativo",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Reggio Calabria",
        38.111,
        15.647,
        31
      ],
      [
        "Gambarie",
        38.168,
        15.835,
        1311
      ],
      [
        "Santo Stefano in Aspromonte",
        38.165,
        15.788,
        714
      ],
      [
        "Montalto",
        38.177,
        15.884,
        1956
      ],
      [
        "Scilla",
        38.251,
        15.719,
        22
      ],
      [
        "Reggio Calabria",
        38.111,
        15.647,
        31
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "etna",
    "name": "Etna e Taormina",
    "region": "SICILIA",
    "regionName": "Sicilia",
    "regions": [
      "Sicilia"
    ],
    "province": "Catania",
    "provinces": [
      "Catania",
      "Messina"
    ],
    "area": "Catania · Messina",
    "short": "Un itinerario vulcanico tra paesi etnei, crateri e costa ionica.",
    "distance": 129,
    "duration": "2 h 45 min",
    "level": "Intermedio",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Catania",
        37.507,
        15.083,
        7
      ],
      [
        "Nicolosi",
        37.617,
        15.027,
        698
      ],
      [
        "Rifugio Sapienza",
        37.7,
        15,
        1910
      ],
      [
        "Linguaglossa",
        37.843,
        15.14,
        550
      ],
      [
        "Taormina",
        37.851,
        15.286,
        204
      ],
      [
        "Catania",
        37.507,
        15.083,
        7
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "madonie",
    "name": "Madonie e Nebrodi",
    "region": "SICILIA",
    "regionName": "Sicilia",
    "regions": [
      "Sicilia"
    ],
    "province": "Palermo",
    "provinces": [
      "Palermo",
      "Enna",
      "Messina"
    ],
    "area": "Palermo · Enna · Messina",
    "short": "Curve tra parchi naturali, borghi e montagne della Sicilia settentrionale.",
    "distance": 280,
    "duration": "6 h 15 min",
    "level": "Intermedio",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Palermo",
        38.115,
        13.362,
        14
      ],
      [
        "Cefalù",
        38.039,
        14.022,
        16
      ],
      [
        "Petralia Soprana",
        37.799,
        14.108,
        1147
      ],
      [
        "Gangi",
        37.795,
        14.206,
        1011
      ],
      [
        "Nicosia",
        37.748,
        14.397,
        724
      ],
      [
        "Palermo",
        38.115,
        13.362,
        14
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "iblei",
    "name": "Val di Noto e Monti Iblei",
    "region": "SICILIA",
    "regionName": "Sicilia",
    "regions": [
      "Sicilia"
    ],
    "province": "Ragusa",
    "provinces": [
      "Ragusa",
      "Siracusa"
    ],
    "area": "Ragusa · Siracusa",
    "short": "Un percorso tra città barocche, canyon e altopiani degli Iblei.",
    "distance": 178,
    "duration": "3 h 30 min",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/toscana-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Siracusa",
        37.075,
        15.286,
        17
      ],
      [
        "Noto",
        36.891,
        15.07,
        152
      ],
      [
        "Palazzolo Acreide",
        37.063,
        14.904,
        670
      ],
      [
        "Ragusa",
        36.926,
        14.725,
        502
      ],
      [
        "Modica",
        36.858,
        14.76,
        296
      ],
      [
        "Siracusa",
        37.075,
        15.286,
        17
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "erice",
    "name": "Erice e Saline di Trapani",
    "region": "SICILIA",
    "regionName": "Sicilia",
    "regions": [
      "Sicilia"
    ],
    "province": "Trapani",
    "provinces": [
      "Trapani"
    ],
    "area": "Trapani",
    "short": "Un giro tra il borgo medievale di Erice, le saline e la costa occidentale.",
    "distance": 142,
    "duration": "2 h 45 min",
    "level": "Facile",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/garda-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Trapani",
        38.018,
        12.537,
        3
      ],
      [
        "Erice",
        38.038,
        12.587,
        751
      ],
      [
        "San Vito Lo Capo",
        38.174,
        12.734,
        6
      ],
      [
        "Riserva dello Zingaro",
        38.086,
        12.806,
        30
      ],
      [
        "Marsala",
        37.799,
        12.436,
        3
      ],
      [
        "Trapani",
        38.018,
        12.537,
        3
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "ss125",
    "name": "SS125 Orientale Sarda",
    "region": "SARDEGNA",
    "regionName": "Sardegna",
    "regions": [
      "Sardegna"
    ],
    "province": "Nuoro",
    "provinces": [
      "Nuoro",
      "Sud Sardegna"
    ],
    "area": "Nuoro · Sud Sardegna",
    "short": "Una delle strade più note della Sardegna tra montagne e costa orientale.",
    "distance": 191,
    "duration": "4 h 15 min",
    "level": "Intermedio",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/garda-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Dorgali",
        40.292,
        9.588,
        456
      ],
      [
        "Baunei",
        40.034,
        9.664,
        480
      ],
      [
        "Cala Gonone",
        40.215,
        9.632,
        5
      ],
      [
        "Tortolì",
        39.926,
        9.657,
        13
      ],
      [
        "Ulassai",
        39.811,
        9.497,
        775
      ],
      [
        "Muravera",
        39.419,
        9.576,
        10
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "sud-sardegna",
    "name": "Costa del Sud e Chia",
    "region": "SARDEGNA",
    "regionName": "Sardegna",
    "regions": [
      "Sardegna"
    ],
    "province": "Cagliari",
    "provinces": [
      "Cagliari",
      "Sud Sardegna"
    ],
    "area": "Cagliari · Sud Sardegna",
    "short": "Un itinerario tra spiagge, scogliere e panorami della costa meridionale.",
    "distance": 188,
    "duration": "3 h 30 min",
    "level": "Facile",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/garda-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Cagliari",
        39.223,
        9.121,
        6
      ],
      [
        "Pula",
        39.009,
        9.01,
        10
      ],
      [
        "Chia",
        38.904,
        8.877,
        10
      ],
      [
        "Teulada",
        38.967,
        8.772,
        50
      ],
      [
        "Sant'Antioco",
        39.047,
        8.457,
        7
      ],
      [
        "Cagliari",
        39.223,
        9.121,
        6
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "sinis",
    "name": "Penisola del Sinis e Costa Verde",
    "region": "SARDEGNA",
    "regionName": "Sardegna",
    "regions": [
      "Sardegna"
    ],
    "province": "Oristano",
    "provinces": [
      "Oristano",
      "Sud Sardegna"
    ],
    "area": "Oristano · Sud Sardegna",
    "short": "Mare, stagni e paesaggi selvaggi nella Sardegna occidentale.",
    "distance": 148,
    "duration": "2 h 45 min",
    "level": "Turistico",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/garda-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Oristano",
        39.906,
        8.591,
        10
      ],
      [
        "Cabras",
        39.929,
        8.532,
        6
      ],
      [
        "San Giovanni di Sinis",
        39.872,
        8.441,
        5
      ],
      [
        "Arbus",
        39.526,
        8.599,
        314
      ],
      [
        "Piscinas",
        39.535,
        8.454,
        5
      ],
      [
        "Oristano",
        39.906,
        8.591,
        10
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  },
  {
    "id": "gran-san-bernardo",
    "name": "Gran San Bernardo e Valle del Gran San Bernardo",
    "region": "VALLE D'AOSTA",
    "regionName": "Valle d'Aosta",
    "regions": [
      "Valle d'Aosta"
    ],
    "province": "Aosta",
    "provinces": [
      "Aosta"
    ],
    "area": "Aosta",
    "short": "Un itinerario alpino tra Aosta, Etroubles e il valico del Gran San Bernardo.",
    "distance": 52,
    "duration": "1 h 15 min",
    "level": "Impegnativo",
    "rating": "Nuovo",
    "reviews": 0,
    "photo": "./assets/dolomites-road.webp",
    "tag": "Road Trip consigliato",
    "stops": [
      [
        "Aosta",
        45.737,
        7.32,
        583
      ],
      [
        "Etroubles",
        45.821,
        7.23,
        1270
      ],
      [
        "Saint-Rhémy-en-Bosses",
        45.821,
        7.182,
        1521
      ],
      [
        "Colle del Gran San Bernardo",
        45.869,
        7.17,
        2469
      ],
      [
        "Aosta",
        45.737,
        7.32,
        583
      ]
    ],
    "notes": "Itinerario suggerito per la community RIDE. Le tappe sono punti di riferimento e la geometria viene calcolata sulle strade quando il servizio è disponibile. Verifica sempre apertura dei passi, ordinanze, meteo, traffico, ZTL e condizioni del fondo stradale prima di partire."
  }
];
