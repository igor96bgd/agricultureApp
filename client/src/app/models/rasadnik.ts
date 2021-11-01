import { Sadnica } from './sadnica';

export class Rasadnik{
    naziv: string;
    mesto: string;
    duzina: number;
    sirina: number;
    br_zauzeto: number;
    br_slobodno: number;
    voda:number;
    temperatura:number;
    vlasnik:string;
    sadnice : Sadnica[]=[];
}