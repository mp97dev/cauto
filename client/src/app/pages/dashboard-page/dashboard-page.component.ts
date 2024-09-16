import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from "@angular/material/table";
import { PreventiviService, Preventivo } from '../../services/preventivi.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ValutaUsatoComponent } from '../../components/valuta-usato/valuta-usato.component';
import { map, of, switchMap, tap } from 'rxjs';
import { AccontoComponent } from '../../components/acconto/acconto.component';
import { AuthService } from '../../services/auth.service';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import { MatExpansionModule } from '@angular/material/expansion';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Sede } from '../../services/sedi.service';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    MatTableModule,
    AsyncPipe,
    MatMenuModule,
    MatIconModule,
    DatePipe,
    MatExpansionModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatAutocompleteModule
  ],
  providers: [DatePipe],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements AfterViewInit{

  private ps = inject(PreventiviService)
  public data = this.ps.preventivi
  public user = inject(AuthService).user

  distinctClienti = this.ps.preventivi.pipe(
    map(preventivi => preventivi.map(p => p.utente)),
    map(clienti => [...new Set(clienti)])
  )

  distinctMarche = this.ps.preventivi.pipe(
    map(preventivi => preventivi.map(p => p.marca)),
    map(marche => [...new Set(marche)])
  )

  distinctSedi = this.ps.preventivi.pipe(
    map(preventivi => preventivi.map(p => p.luogo_ritiro.nome)),
    map(sedi => [...new Set(sedi)])
  ) 

  filter = new FormGroup({
    soloScaduti: new FormControl(true as boolean),
    usatoDaValutare: new FormControl(false as boolean),
    cliente: new FormControl(''),
    marca: new FormControl(''),
    sede: new FormControl('')
  })

  constructor(
    private dialog: MatDialog,
  ) {}

  preventivi = this.ps.preventivi

  displayColumns = [ 'utente', 'acconto', 'data_consegna', 'data_creazione', 'data_scadenza', 'marca', 'modello', 'prezzo_finale', 'sconto', 'preventivo']
  columns = [ ...this.displayColumns, 'usato', 'valutazione', 'action']

  dataSource = this.filter.valueChanges.pipe(
    switchMap(filters => {
      const scaduti = filters.soloScaduti
      const cliente = filters.cliente
      const marca = filters.marca
      const sede = filters.sede
      const usato = filters.usatoDaValutare

      return this.ps.preventivi.pipe(
        map(preventivi => {
          return preventivi.filter(p => scaduti ? new Date(p.data_scadenza) < new Date() : true)
        }),
        map(preventivi => {
          return preventivi.filter(p => (usato && p.usato) )
        }),
        map(preventivi => {
          return preventivi.filter(p => cliente ? p.utente.includes(cliente) : true)
        }),
        map(preventivi => {
          return preventivi.filter(p => marca ? p.marca.includes(marca) : true)
        }),
        map(preventivi => {
          return preventivi.filter(p => sede ? p.luogo_ritiro.nome.includes(sede) : true)
        })
      )
    })
  )

  ngAfterViewInit() {
    this.filter.get('soloScaduti')?.setValue(false)
  }
  


  elimina(p: Preventivo) {
    this.ps.deletePreventivo(p).subscribe()
  }

  valutaUsato(p: Preventivo) {
    const d = this.dialog.open(ValutaUsatoComponent, {data: p})
    d.afterClosed().pipe(
      switchMap(res => res ? this.ps.valutaUsato(p, res) : of(null))
    ).subscribe()
  }

  acconto(p: Preventivo) {
    const d = this.dialog.open(AccontoComponent, {data: p})
    d.afterClosed().pipe(
      switchMap(res => res ? this.ps.aggiungiAcconto(p, res) : of(null))
    ).subscribe()
  }


  esporta(preventivo: Preventivo) {
    const doc = new jsPDF();

    // Aggiungi un'intestazione
    doc.setFontSize(16);
    doc.text('Dettagli Preventivo', 14, 20);

    // Prepara i dati tabellari
    const rows = [
      ['Acconto', preventivo.acconto + ' €'],
      ['Data Consegna', preventivo.data_consegna ?? 'N/A'],
      ['Data Creazione', preventivo.data_creazione ?? 'N/A'],
      ['Data Scadenza', preventivo.data_scadenza ?? 'N/A'],
      ['ID', preventivo.id.toString()],
      ['Luogo Ritiro', preventivo.luogo_ritiro.nome],
      ['Marca Macchina', preventivo.marca],
      ['Modello Macchina', preventivo.modello],
      ['Prezzo Finale', preventivo.prezzo_finale + ' €'],
      ['Sconto', (preventivo.sconto ?? '0') + ' %'],
      ['Usato', preventivo.usato?.descrizione ?? 'N/A'],
      ['Utente', preventivo.utente]
    ];


    // Aggiungi una tabella
    autoTable(doc, {
      head: [[`Cauto | preventivo ${preventivo.id} - ${preventivo.utente} ${preventivo.prezzo_finale} €`, '']],
      body: rows
    });

    // Salva il PDF
    doc.save('preventivo.pdf');
  }
}
