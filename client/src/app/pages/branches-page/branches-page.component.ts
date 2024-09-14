import { Component } from '@angular/core';
import { Sede, SediService } from '../../services/sedi.service';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AggiungiSedeComponent } from '../../components/aggiungi-sede/aggiungi-sede.component';

@Component({
  selector: 'app-branches-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './branches-page.component.html',
  styleUrl: './branches-page.component.scss'
})
export class BranchesPageComponent {

  displayedColumns = ['nome', 'indirizzo', 'action'];

  constructor(
    public ss: SediService,
    private dialog: MatDialog
  ) {}

  elimina(sede: Sede) {
    this.ss.deleteSede(sede).subscribe()
  }

  aggiungi() {
    const a = this.dialog.open(AggiungiSedeComponent)
    a.afterClosed().subscribe(res => {
      if(!res) return;
      this.ss.aggiungiSede(res).subscribe()
      this.ss.updateSedi()
    })
  }
}
