import { FormGroup } from "@angular/forms";
import { IOptionals, Macchina } from "./macchina.model";

export class Preventivo {
    usato?: Macchina
    private marca: string
    private modello: string
    private optionals: IOptionals[]


    constructor(usato?: Macchina, preventivo?: { marca: string, modello: string, optionals: IOptionals[]} ) {
        this.usato = usato
        this.marca = preventivo?.marca ?? ''
        this.modello = preventivo?.modello ?? ''
        this.optionals = preventivo?.optionals ?? []
    }

    toPreventivo() {
        return {
            marca: this.marca,
            macchina_modello: this.modello,
            optionals: this.optionals,
            usato: this.usato
        }
    }

    addUsato(car: Macchina) {
        this.usato = car
    }
}