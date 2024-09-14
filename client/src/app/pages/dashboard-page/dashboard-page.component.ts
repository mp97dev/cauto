import { Component, inject } from '@angular/core';
import { MatTableModule } from "@angular/material/table";
import { PreventiviService, Preventivo } from '../../services/preventivi.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ValutaUsatoComponent } from '../../components/valuta-usato/valuta-usato.component';
import { of, switchMap } from 'rxjs';
import { AccontoComponent } from '../../components/acconto/acconto.component';
import { AuthService } from '../../services/auth.service';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    MatTableModule,
    AsyncPipe,
    MatMenuModule,
    MatIconModule,
    DatePipe
  ],
  providers: [DatePipe],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

  private ps = inject(PreventiviService)
  public data = this.ps.preventivi
  public user = inject(AuthService).user


  constructor(
    private dialog: MatDialog,
    private datePipe: DatePipe
  ) {}

  preventivi = this.ps.preventivi

  displayColumns = [ 'utente', 'acconto', 'data_consegna', 'data_creazione', 'data_scadenza', 'macchina_marca', 'macchina_modello', 'prezzo_finale', 'sconto']
  columns = [ ...this.displayColumns, 'action']

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
      ['Acconto', preventivo.acconto.toFixed(2)],
      ['Data Consegna', this.datePipe.transform(preventivo.data_consegna )?? 'N/A'],
      ['Data Creazione', this.datePipe.transform(preventivo.data_creazione)],
      ['Data Scadenza', this.datePipe.transform(preventivo.data_scadenza)],
      ['ID', preventivo.id.toString()],
      ['Luogo Ritiro', preventivo.luogo_ritiro.sede],
      ['Marca Macchina', preventivo.macchina_marca],
      ['Modello Macchina', preventivo.macchina_modello],
      ['Prezzo Finale', preventivo.prezzo_finale.toFixed(2)],
      ['Sconto', preventivo.sconto?.toFixed(2) ?? 'N/A'],
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

  private formatKey(key: string): string {
    // Converti il formato delle chiavi in modo leggibile (es. "data_consegna" -> "Data Consegna")
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }

}
