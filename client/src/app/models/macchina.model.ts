export interface Car {
    descrizione: string;
    dimensioni: {
        altezza: number;
        lunghezza: number;
        larghezza: number;
        peso: number;
        volume_bagagliaio: number;
    };
    immagini: {
        colori: string[];
        vista_frontale: string;
        vista_laterale: string;
        vista_posteriore: string;
    };
    motore: {
        alimentazione: string;
        tipo: string;
    };
    modello: string;
    optionals: Optional[];
    prezzo_base: number;
    sconto: number;
}

export interface Optional {
    nome: string;
    opzioni: string[];
    prezzo: number;
}

export interface CarBrand {
    [brand: string]: Car[];
}

export interface FlattenBrandCars extends Car{
    marca: string
}