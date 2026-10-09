# Lagerstyringssystem

Dette prosjektet er et enkelt system for å holde oversikt over produkter og lagerbeholdning. Her kan du legge til og slette produkter, søke og filtrere i produktlisten, og se hvor mange varer og hvilken total verdi lageret har. Produktene lagres i nettleseren, slik at de fortsatt er der neste gang du åpner nettsiden sånn at du må ikke gjøre alt på nytt hele tiden.

## Hva lagerstyringssystemet gjør
Dette systemet er en enkel lagerstyringsapplikasjon som lar brukeren legge inn produkter, se dem i en oversikt, filtrere etter kategori, søke etter produktnavn og få en samlet visning av lagerstatus. Systemet viser pris, antall og status for hvert produkt, og gjør det mulig å slette produkter som ikke lenger er relevante.

## Hvilke teknologier jeg har brukt
- HTML for innhold og struktur
- CSS for styling og positioning
- JavaScript for interactions
- localStorage i nettleseren for lagring av data

## Hvordan man starter nettsiden
På VSC:
1. Gå til prosjektets mappe.
2. Åpne filen `index.html` med "show preview" eller "Go live"

På Github:
1. 
2. 
3. 

## Hvilke funksjoner som er implementert
- Legg til nye produkter med navn, kategori, pris og antall
- Vis alle produkter i en tabell
- Søk etter produkter ved navnet dems
- Filtrer produkter etter kategori
- Vis total antall og samlet lagerverdi
- Slett produkter fra lageret
- Lagre data i nettleseren slik at alt beholdes ved oppstart
- Hindrer at brukeren sletter siste produkt, slik at listen alltid har innhold

## Hvilke tester jeg har gjennomført
Jeg har testet følgende:
- At man kan legge til et nytt produkt i listen
- At produktet vises med riktig informasjon i tabellen
- At søket fungerer og filtrerer riktig
- At filteret for kategori fungerer
- At sletting av produkt fungerer
- At data lagres i localStorage og fortsatt er tilgjengelig etter sideoppdatering
- At systemet ikke lar brukeren slette siste produkt

## Hvilke feil jeg fant, og hvordan jeg rettet dem
Jeg fant flere problemer under utviklingen og rettet dem:

1. Listen var tom ved oppstart
   - Årsak: produktdata var hardkodet, men ikke riktig koblet til visningen.
   - Løsning: jeg la inn en trygg innlesingsfunksjon som henter produkter fra localStorage, og hvis det ikke finnes noe, fyller den med standardprodukter.

2. Det var ikke mulig å legge til nye produkter
   - Årsak: form-handlingen var enten ikke koblet til riktig logikk eller ikke complete.
   - Løsning: jeg la til en submit-håndterer som leser inn feltene, oppretter et nytt produkt og oppdaterer listen.

3. Data ble ikke lagret
   - Årsak: produktlisten ble ikke sendt til localStorage.
   - Løsning: jeg implementerte `saveProducts()` som lagrer array'en i nettleseren, og `loadProducts()` som leser den tilbake ved oppstart.

4. Det kunne oppstå tom liste ved sletting
   - Årsak: ingenting hindret sletting av siste produkt.
   - Løsning: jeg la inn en kontroll som stopper slettingen hvis det bare er ett produkt igjen.

5. Feil i visning av informasjon
   - Årsak: tabellen og beregningene fungerte ikke alltid helt som forventet.
   - Løsning: jeg forbedret render-funksjonen slik at den oppdaterer hele tabellen riktig og regner ut totalsummer på nytt etter endringer.

## Oppsummering
Dette prosjektet er et fungerende lagerstyringssystem som gjør det mulig å administrere produkter på en enkel og brukervennlig måte. Den har både funksjonalitet for innlegging, filtrering, søk, sletting og lagring, og det er gjort tester for å sikre at systemet fungerer som forventet.