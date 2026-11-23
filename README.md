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


## Strumenti RIDE V13

- Meteo itinerario: previsioni Open-Meteo per partenza, punto intermedio e arrivo, selezionando una data entro i prossimi 7 giorni.
- GPX: importazione di tracce GPX (track o route points) e download GPX del percorso selezionato. I percorsi importati restano nel browser/dispositivo.
- Luoghi lungo il percorso: ricerca OpenStreetMap/Overpass di carburante, officine, ristoro, panorami e parcheggi vicino alle tappe.
- Garage: chilometraggio moto e registro interventi con scadenze per data e chilometri.
- Sicurezza: checklist pre-partenza, contatto di emergenza e condivisione volontaria della posizione.
- Dati locali: le nuove informazioni sono memorizzate in localStorage sul dispositivo; non esiste ancora un backend condiviso né notifiche push per scadenze o posizione.
- Limiti: il meteo dipende dalla copertura Open-Meteo; la ricerca POI dipende dalla disponibilità dei server Overpass; la stima della durata è indicativa. RIDE non sostituisce un navigatore o un servizio di emergenza.
