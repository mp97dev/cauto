import { Component } from '@angular/core';
import { MatTableModule } from "@angular/material/table";
import { PreventiviService, Preventivo } from '../../services/preventivi.service';
import { AsyncPipe } from '@angular/common';
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ValutaUsatoComponent } from '../../components/valuta-usato/valuta-usato.component';
import { of, switchMap } from 'rxjs';
import { AccontoComponent } from '../../components/acconto/acconto.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    MatTableModule,
    AsyncPipe,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

  constructor(
    public ps: PreventiviService,
    private dialog: MatDialog
  ) {}

  columns = [ 'utente', 'acconto', 'data_consegna', 'data_creazione', 'data_scadenza', 'macchina_marca', 'macchina_modello', 'prezzo_finale', 'sconto', 'action']
  displayColumns = [ 'utente', 'acconto', 'data_consegna', 'data_creazione', 'data_scadenza', 'macchina_marca', 'macchina_modello', 'prezzo_finale', 'sconto']

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

}
