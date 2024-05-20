- PAGINA LOGIN
	- ruoli: 
		- visitatore
			-> configurare macchina + chiedere preventivo
		- impiegati
			-> gestire valutazione usato
			-> dopo pagamento, avvisare se l'auto è pronta
		- segreteria
			-> inserimento macchine

- PAGINA CONFIGURAZIONE (VENDITA)
	- modelli raggruppati per marca:
		- nome univoco
		- descrizione
		- dimensioni (altezza, lunghezza, pesp, vol. bagagliaio)
		- motore + alimentazione (benzina, diesel, etc.)
		- immagini (div. punti di vista e colori)
		- possibili optional
			- colore
			- ruota di scorta
			- ruotino di scorta
			- vetri oscurati
			- interni in pelle
			- ruote con dimensione maggiore
		- sconto (cambia mensilmente, aggiunto quando viene calcolato il preventivo)
		- se acquisto -> luogo di ritiro
					- nome
					- indirizzo
					- ordini
	- valutazione usato 
		-> preventivo gestito dal personale

	
- PAGINA SEGRETERIA
	- aggiunta nuovi modelli
	- visualizzazione sedi (?)

- PAGINA IMPIEGATI
	- gestione valutazione usato
	- avvisare auto pronta, post pagamento
	
	
!!!!!!
	-> !!! per il preventivo e par valutare l'usato bisogna essere registrati !!!
	-> preventivo può essere pdf
	-> preventivi memorizzati x 20 gg, entro la data si può pagare acconto
		-> data consegna = 1 mese + (10 gg x n. optional) 
		
DATI DA SALVARE:
	- macchine:
		- modelli raggruppati per marca:
			- nome univoco
			- descrizione
			- dimensioni (altezza, lunghezza, pesp, vol. bagagliaio)
			- motore + alimentazione (benzina, diesel, etc.)
			- immagini (div. punti di vista e colori)
			- possibili optional
				- colore
				- ruota di scorta
				- ruotino di scorta
				- vetri oscurati
				- interni in pelle
				- ruote con dimensione maggiore
	- sedi:
		- nome
		- indirizzo
		- ordini
	- preventivi
		- modello
		- optional scelti
		- valutazione usato 
			si -> preventivo gestito dal personale
			no -> continua
		- sconto
		- acquisto
			si -> luogo ritiro -> data consegna
			no -> sta in memoria x 20gg
	