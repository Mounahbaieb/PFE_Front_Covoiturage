import { Conducteur } from "./Conducteur";
import { EtatAnnonce } from "./EtatAnnonce";

export interface Annonce {
    id: string;
    nbrPlaceDispo: number;
    lieuDeDepart: string;
    lieuDesti: string;
    dateDepart: string;
    timeDepart: string;
    tarif: string;
    bagage: boolean;
    climatisation: boolean;
    fumeur: boolean;
    etat: EtatAnnonce;
    conducteurId?: string; 
    voitureId?: string; // clé étrangère
}
