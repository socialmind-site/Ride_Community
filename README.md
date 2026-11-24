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


## Pianificatore motociclistico V16/V17

- Pianificazione con profilo Valhalla `motorcycle` (beta), preferenze per curve, strade secondarie, autostrade, pedaggi e modalità Adventure.
- Ricerca località con fallback sequenziale: catalogo locale RIDE, Open-Meteo/GeoNames, Photon/OpenStreetMap e Nominatim/OpenStreetMap.
- Il fallback Nominatim è usato soltanto dopo l'invio del modulo, non come autocomplete, e applica una pausa minima di 1,1 secondi tra richieste nello stesso browser.
- Gli itinerari calcolati vengono conservati nella libreria personale e possono essere esportati in GPX.
- Le indicazioni sono supporto alla pianificazione, non navigazione turn-by-turn live. Controllare sempre segnaletica, divieti e accessi.
- I geocoder e il server Valhalla sono servizi pubblici esterni: possono applicare limiti, essere temporaneamente indisponibili o cambiare condizioni. Per un servizio commerciale stabile servirà un provider con SLA o un'infrastruttura dedicata.


## RIDE V18 — Route Intelligence e Garage

- Meteo orario lungo l'itinerario: selezione di data e ora di partenza; condizioni stimate a partenza, punto intermedio e arrivo usando il tempo di percorrenza stimato, con temperatura, probabilità e quantità di precipitazioni, vento, raffiche e visibilità.
- Profilo altimetrico: campionamento del tracciato fino a 90 coordinate tramite Open-Meteo Elevation API / Copernicus DEM GLO-90; stima di salita, discesa e quota massima. Le tracce GPX con quote valide usano i dati inclusi nel file.
- Analisi curve: indice indicativo di variazioni di direzione per 100 km, derivato dalla geometria della strada. Non è una classificazione ufficiale di difficoltà o sicurezza.
- Registro carburante: data, chilometraggio, litri, costo, distributore, pieno/parziale e note. Il consumo medio viene calcolato tra due pieni consecutivi e include eventuali rifornimenti parziali intermedi.
- Statistiche personali: chilometri dei ricordi collegati a itinerari, spesa carburante, spesa manutenzione, litri registrati e consumo medio.
- Tutti i nuovi dati sono salvati localmente e inclusi nel backup JSON. Non è stato aggiunto alcun backend.
- Le stime di meteo e altimetria dipendono da servizi pubblici esterni; le statistiche dipendono dall'accuratezza dei dati inseriti dall'utente.


## RIDE V19 — Modalità guida GPS locale

- Modalità guida in primo piano con geolocalizzazione del browser, velocità attuale e massima, distanza GPS accumulata e durata della sessione.
- La posizione del dispositivo viene visualizzata sulla mappa locale; il tracciamento non viene condiviso con altri utenti e si interrompe quando si esce dalla modalità o si chiude la pagina.
- Confronto della posizione con la geometria del percorso: avviso di allontanamento dal tracciato dopo più rilevazioni consecutive oltre la soglia indicativa di 180 m.
- Indicazione successiva disponibile per gli itinerari calcolati con Valhalla; le istruzioni vocali sono opzionali e richiedono supporto speechSynthesis del browser.
- Le sessioni concluse vengono salvate localmente con traccia GPS semplificata, distanza, durata e velocità media/massima; possono essere esportate in GPX e sono incluse nel backup JSON.
- Il GPS funziona solo con permesso esplicito e mentre la pagina è attiva. Non è un navigatore certificato, non esegue rerouting automatico e non garantisce tracking in background. Seguire sempre segnaletica e norme stradali.


## RIDE V20 — Pianificatore viaggi multi-giorno

- Creazione di viaggi personali con titolo, date, partenza, destinazione e note generali.
- Ogni viaggio contiene giornate separate con data, itinerario RIDE o GPX, punto di partenza, arrivo/pernottamento, orario, budget e note/soste.
- Riepilogo automatico di giornate, chilometri pianificati e budget stimato.
- Promemoria locali per le giornate di viaggio nei 14 giorni successivi.
- I viaggi sono salvati in locale e inclusi nel backup JSON; non vengono sincronizzati tra dispositivi.


## RIDE V21 — Pianificatore multi-tappa

- Il pianificatore motociclistico supporta fino a cinque tappe intermedie ordinate tra partenza e destinazione.
- Le tappe possono essere aggiunte, rimosse e riordinate prima del calcolo.
- La ricerca di ogni tappa usa la catena di geocodifica locale / Open-Meteo / Photon / Nominatim già presente.
- Le coordinate vengono inviate a Valhalla come sequenza ordinata di località; il percorso risultante mantiene le manovre e la geometria per tutte le tratte.
- Le tappe e le coordinate sono conservate nel percorso personale e incluse nell'esportazione GPX e nel backup locale.
- Il servizio Valhalla pubblico non offre percorsi alternativi per richieste multipunto; in questo caso viene calcolato un unico itinerario per la sequenza selezionata.


## RIDE V22 — Confronto percorsi motociclistici

- Per itinerari A-to-B senza tappe intermedie il pianificatore può chiedere fino a due alternative a Valhalla.
- Le opzioni restituite vengono salvate come percorsi distinti nella libreria personale e confrontate per distanza, durata e profilo.
- Selezionando un'alternativa si aggiorna la mappa, il meteo, l'altimetria e le indicazioni per quel tracciato.
- Valhalla non supporta alternative automatiche per richieste con più di due località; quando sono presenti tappe intermedie viene calcolato un solo percorso.
- Il server pubblico può restituire meno alternative di quelle richieste o nessuna alternativa distinta.


## RIDE V23 — Esportazione viaggi multi-giorno

- Ogni viaggio pianificato può essere esportato come file GPX multi-traccia: una traccia separata per ciascuna giornata con un itinerario valido.
- Le geometrie stradali mancanti vengono richieste al motore di routing prima di comporre il file; se non sono disponibili, la giornata viene saltata e il numero di tracce esportate viene indicato all'utente.
- Il viaggio può essere esportato anche come file calendario `.ics`, con un evento per giornata, orario di partenza, itinerario, località, pernottamento e note.
- I file vengono generati localmente nel browser. Non è richiesto un backend.


## RIDE V24 — Preparazione viaggio, meteo e ricalcolo GPS

- Checklist bagagli e preparazione per ogni viaggio multi-giorno, con stato salvato per singolo viaggio e incluso nel backup JSON.
- Avvisi meteo indicativi lungo partenza, punto intermedio e arrivo: temporali, pioggia probabile, raffiche, vento sostenuto, visibilità ridotta, neve e temperature prossime allo zero con precipitazioni.
- Gli avvisi sono basati sui dati orari disponibili da Open-Meteo e non sostituiscono bollettini ufficiali o la valutazione delle condizioni stradali.
- Modalità guida: quando il GPS rileva per più aggiornamenti una posizione distante dal tracciato, compare un comando manuale per ricalcolare da posizione attuale verso le tappe non ancora raggiunte e la destinazione.
- Il ricalcolo non parte automaticamente: il motociclista deve fermarsi in sicurezza e richiederlo esplicitamente. Il nuovo tracciato viene salvato nella libreria personale.
- Nessun backend o servizio di posizione in background; GPS attivo solo mentre la modalità guida resta aperta.


## RIDE V25 — Modalità GPS con pausa e ripresa

- La modalità guida consente di mettere in pausa e riprendere il tracciamento GPS senza chiudere la sessione.
- Durante la pausa il watch GPS viene fermato, la velocità viene azzerata e la distanza non viene incrementata.
- Il tempo di viaggio e la velocità media escludono i periodi di pausa.
- Alla ripresa viene richiesto un nuovo fix GPS e non viene conteggiato il salto di posizione durante la pausa.
- Su browser compatibili RIDE richiede il Screen Wake Lock mentre il GPS è attivo, per ridurre lo spegnimento automatico dello schermo. Il lock viene rilasciato in pausa o a fine sessione e può essere riacquisito quando la pagina torna visibile.
- La sessione e le tracce restano locali; il GPS non viene registrato in background quando la pagina è chiusa. La compatibilità del Wake Lock dipende da browser, dispositivo e modalità di installazione.


## RIDE V26 — Smart Travel Planner

- Estimatore per giornata di autonomia e carburante basato su distanza dell'itinerario, consumo medio registrato nel garage (se disponibile), capacità serbatoio, livello iniziale, riserva e prezzo al litro.
- Suggerimento prudenziale del numero di rifornimenti: applica un margine di sicurezza alla percorrenza stimata e non presume che il serbatoio venga utilizzato fino alla riserva.
- Ricerca di distributori, ristoranti/caffè e strutture ricettive lungo la geometria del percorso tramite OpenStreetMap / Overpass; risultati apribili su Google Maps e salvabili nella giornata.
- Budget giornaliero modificabile per carburante, pasti, pernottamento, pedaggi e altre spese; riepilogo aggregato per l'intero viaggio.
- I valori di consumo e serbatoio iniziali sono stime modificabili; il consumo del registro carburante viene preferito quando esiste un dato valido. Nessun dato viene inviato a un backend.
- La ricerca POI dipende dai server pubblici Overpass e dalla completezza di OpenStreetMap. Disponibilità, orari, prezzi, aperture e prenotazioni devono essere verificati direttamente con le attività.
- L'autonomia è una stima, non una garanzia: pianificare margine aggiuntivo e rifornire prima della riserva, considerando traffico, stile di guida, carico, meteo e dislivello.

## RIDE V27 — Salvataggio e visualizzazione soste del viaggio

- Corretto il flusso di aggiunta delle soste: dopo il salvataggio la scheda del viaggio si aggiorna immediatamente senza chiudere il dettaglio.
- Le soste selezionate (distributori, ristoranti e alloggi) vengono mostrate in una sezione dedicata della giornata, con collegamento alla mappa e comando per rimuoverle.
- Le selezioni e i risultati della ricerca restano associati alla singola giornata e vengono riproposti quando il viaggio viene riaperto.
- I risultati già aggiunti mostrano lo stato “Aggiunta” per evitare inserimenti duplicati; il conteggio dei distributori salvati viene riallineato alle selezioni effettive.
- Il dettaglio del budget e i riepiloghi vengono aggiornati dopo modifiche a carburante e spese.
- Aggiornata la cache PWA alla release V27 per distribuire il modulo corretto anche sui dispositivi che avevano memorizzato V26.

## RIDE V28 — Mappa interattiva del viaggio

- Nel dettaglio di ogni viaggio è disponibile una mappa MapLibre dedicata con i tracciati delle singole giornate.
- Filtro “Tutto il viaggio” o selezione di una singola giornata; ogni giornata usa un colore distinto.
- Le soste salvate (carburante, ristoro e pernottamento) vengono proiettate sul tracciato e ordinate in base alla distanza progressiva dalla partenza.
- I marker mostrano categoria e sequenza (giornata.numero); selezionandoli si apre una scheda con nome, categoria, distanza indicativa e collegamento a Google Maps.
- L'elenco sottostante riporta lo stesso ordine delle soste. La mappa si aggiorna dopo aggiunte e rimozioni senza perdere il filtro attivo.
- Se il routing stradale non è disponibile, la mappa usa i punti noti del catalogo come geometria approssimativa e lo segnala. La proiezione e l'ordine sono indicativi in questo caso.
- La cartografia richiede connessione Internet; i dati del viaggio restano locali.

## RIDE V29 — Stabilità mappa del viaggio

- Inizializzazione della mappa interattiva resa a istanza singola: le mutazioni del dettaglio non possono avviare più mappe concorrenti.
- La mappa viene inizializzata solo dopo che il contenuto del dettaglio viaggio è pronto e il contenitore è presente nel layout.
- Resize e adattamento del tracciato vengono eseguiti dopo il rendering del modal, evitando inizializzazioni su contenitori ancora nascosti o a dimensione zero.
- Gli errori di caricamento cartografico non interrompono il dettaglio del viaggio: l'elenco delle soste resta disponibile e viene mostrato un messaggio di fallback.
- Aggiornata la cache PWA alla V29.
- Fix aggiuntivo V29.1: la chiusura del modal invalida anche le inizializzazioni pendenti; una mappa precedente non può cancellare lo stato di una nuova apertura dello stesso viaggio.
