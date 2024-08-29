export interface IDimensioni {
    altezza: string
    lunghezza: string
    peso: string
    volume_bagagliaio: string
}

export interface IMotore {
    alimentazione: string
    tipo: string
}

export interface IImmagini {
    colori: string[]
    vista_frontale: string
    vista_laterale: string
    vistas_posteriore: string
}

export interface IOptionals {
    nome: string
    opzioni: string[]
    prezzo: number
}

export interface IMacchina {
    marca: string //! @aliasalia
    descrizione: string
    dimensioni: IDimensioni
    immagini: IImmagini
    motore: IMotore
    nome_univoco: string
    optionals: IOptionals
    prezzo_base: number
}

export class Macchina {
    marca: string
    descrizione: string
    dimensioni: IDimensioni
    immagini: IImmagini
    motore: IMotore
    nome_univoco: string
    optionals: IOptionals
    prezzo_base: number

    constructor(car: IMacchina) {
        this.marca = car.marca
        this.descrizione = car.descrizione 
        this.dimensioni = car.dimensioni 
        this.immagini = car.immagini 
        this.motore = car.motore 
        this.nome_univoco = car.nome_univoco 
        this.optionals = car.optionals 
        this.prezzo_base = car.prezzo_base 
    }
}
