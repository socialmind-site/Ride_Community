# RIDE — Motorcycle Community

Demo web app mobile-first per trovare compagni di viaggio, esplorare itinerari e organizzare uscite in moto.

## Pubblicazione

Il sito viene pubblicato automaticamente su GitHub Pages a ogni push su `main`, tramite `.github/workflows/deploy.yml`.

## Mappa

- Cartografia stradale: OpenStreetMap.
- Satellite e rilievo: Esri World Imagery / World Terrain.
- Percorsi: OSRM demo server, quando disponibile.
- Collegamento al navigatore: Google Maps.

Le mappe e il calcolo dei percorsi richiedono una connessione Internet. La mappa passa alla cartografia stradale se il layer satellitare non è disponibile.

## Stato della demo

Profili, gruppi, chat, partecipazioni e preferiti sono dimostrativi e vengono salvati localmente nel browser. Non sono ancora collegati a un backend condiviso, autenticazione o utenti reali.
