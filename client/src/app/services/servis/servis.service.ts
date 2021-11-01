import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Poljoprivrednik } from '../../models/poljoprivrednik';
import { Preduzece } from '../../models/preduzece';
import { Observable} from 'rxjs';
import { Narudzbina } from 'src/app/models/narudzbina';
import { Proizvod } from 'src/app/models/proizvod';
import { Sadnica } from 'src/app/models/sadnica';

@Injectable({
  providedIn: 'root'
})
export class ServisService {

  server: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getAllPolj(){
    return this.http.get<Poljoprivrednik[]>(this.server + 'admin/zahtevipo');
  }

  getAllPr(){
    return this.http.get<Preduzece[]>(this.server + 'admin/zahtevipr');
  }

  registerPo(p: Poljoprivrednik){
    return this.http.post<any>(this.server + 'poljoprivrednik/register', {ime: p.ime, prezime: p.prezime, korisnicko_ime: p.korisnicko_ime, lozinka: p.lozinka,
    datum: p.datum, mesto: p.mesto, telefon: p.telefon, email: p.email, approved: p.approved});
  }

  registerPr(p:Preduzece){
    return this.http.post<any>(this.server + 'preduzece/register', {pun_naziv: p.pun_naziv, skr_naziv: p.skr_naziv, lozinka: p.lozinka, datum: p.datum,
    mesto: p.mesto, email: p.email, approved: p.approved});
  }

  approvePo(ki:string){
    return this.http.put<any>(this.server + 'admin/prihvacenpo', {korisnicko_ime: ki});
  }

  approvePr(sn:string){
    return this.http.put<any>(this.server + 'admin/prihvacenopr', {skr_naziv: sn});
  }

  rejectPo(ki:string){
    return this.http.put<any>(this.server + 'admin/odbijenpo', {korisnicko_ime: ki});
  }

  rejectPr(sn:string){
    return this.http.put<any>(this.server + 'admin/odbijenopr', {skr_naziv: sn});
  }

  deletePo(ki:string){
    return this.http.delete<any>(this.server + 'admin/obrisipo/' + ki);
  }

  deletePr(sn:string){
    return this.http.delete<any>(this.server + 'admin/obrisipr/' + sn);
    
  }

  loginPo(ki:string, pass:string){
    return this.http.post<any>(this.server + 'poljoprivrednik/login', {korisnicko_ime: ki, lozinka: pass});
  }

  loginPr(sn:string, pass:string){
    return this.http.post<any>(this.server + 'preduzece/login',{skr_naziv:sn, lozinka:pass});
  }

  updatePo(p:Poljoprivrednik, oldKI:string){
    return this.http.put<any>(this.server +'admin/updatepo', {old_korisnicko_ime: oldKI, ime: p.ime, prezime: p.prezime, korisnicko_ime: p.korisnicko_ime, lozinka: p.lozinka,
      datum: p.datum, mesto: p.mesto, telefon: p.telefon, email: p.email, approved: p.approved});
  }

  updatePr(p:Preduzece, oldSN:string){
    return this.http.put<any>(this.server + 'admin/updatepr', {old_skr_naziv:oldSN, pun_naziv: p.pun_naziv, skr_naziv: p.skr_naziv, lozinka: p.lozinka, datum: p.datum,
      mesto: p.mesto, email: p.email, approved: p.approved});
  }

  getPo(ki:string){
    return this.http.get<any>(this.server + 'poljoprivrednik/' + ki);
  }

  getPr(sn:string){
    return this.http.get<any>(this.server + 'preduzece/' + sn);
  }

  changePassPo(ki:string, pass:string){
    return this.http.put<any>(this.server + 'poljoprivrednik/lozinka', {korisnicko_ime: ki, lozinka: pass});
  }

  changePassPr(sn:string, pass:string){
    return this.http.put<any>(this.server + 'preduzece/lozinka', {skr_naziv: sn, lozinka: pass});
  }

  addRasadnik(nz:string, mes:string, duz:number, sir:number, vl:string, sad:Sadnica[]){
    return this.http.post<any>(this.server + 'rasadnik/dodaj', {naziv:nz, mesto:mes, duzina:duz, sirina:sir, vlasnik:vl, sadnice:sad});
  }

  getAllRasByPolj(vl:string){
    return this.http.get<any>(this.server + 'rasadnik/dohvatisve/' + vl);
  }

  getRasadnik(nz:string, vl:string){
    return this.http.get<any>(this.server + 'rasadnik/dohvati/' + nz + vl);
  }

  addProizvod(p:Proizvod){
    return this.http.post<any>(this.server + 'proizvod/dodaj', {naziv:p.naziv, proizvodjac:p.proizvodjac, kolicina:p.kolicina, cena:p.cena, dani:p.dani, tip:p.tip});
  }

  getProizvodi(){
    return this.http.get<any>(this.server + 'proizvod/dohvatisve');
  }

  getProizvodiFromPreduzece(name:string){
    return this.http.get<any>(this.server + 'proizvod/dohvati/' + name);
  }
  getProizvod(proizvodjac:string, name:string){
    return this.http.get<any>(this.server + 'proizvod/dohvati/' + proizvodjac + '/' + name);
  }

  addNarudzbina(n:Narudzbina){
    return this.http.post<any>(this.server + 'narudzbina/dodaj', {poljoprivrednik:n.poljoprivrednik, preduzece:n.preduzece, status:n.status, num:n.num,
      datum:n.datum, proizvodi:n.proizvodi});
  }

  umanjiKolicinu(name: string, pr:string, n:number){
    return this.http.put<any>(this.server + 'proizvod/umanji', {naziv:name, proizvodjac:pr, num:n});
  }

  uvecajKolicinu(name: string, pr:string, n:number){
    return this.http.put<any>(this.server + 'proizvod/uvecaj', {naziv:name, proizvodjac:pr, num:n});
  }

  getAllNarudzbinePolj(ki:string){
    return this.http.get<any>(this.server + 'narudzbina/dohvatiPo/' + ki);
  }

  getAllNarudzbinePred(pr:string){
    return this.http.get<any>(this.server + 'narudzbina/dohvatiPr/' + pr);
  }

  getAllNarudzbinePredNC(pr:string){
    return this.http.get<any>(this.server + 'narudzbina/dohvatiNC/' + pr);
  }

  deleteNarudzbina(num:number){
    return this.http.delete<any>(this.server + 'narudzbina/obrisi/' + num);
  }

  changeStatus(n:number, s:string){
    return this.http.put<any>(this.server + 'narudzbina/status', {num:n, status:s});
  }

  nextNum(){
    return this.http.get<any>(this.server + 'narudzbina/dohvatiSledNum');
  }

  changeKuriri(sn:string, k:number[]){
    return this.http.put<any>(this.server + 'preduzece/kuriri', {skr_naziv:sn, kuriri:k});
  }

  dodajUMagacin(na:string, po:string, pr:string, k:number, t:string, d:number){
    return this.http.post<any>(this.server + 'magacin/dodaj', {naziv:na, poljoprivrednik:po, proizvodjac:pr, kolicina:k, tip:t, dani:d});
  }

  dohvatiIzMagacina(po:string){
    return this.http.get<any>(this.server + 'magacin/dohvati/' + po);
  }

  updateRasadnik(n:string, polj:string, t:number, v:number){
    return this.http.put<any>(this.server + 'rasadnik/update', {vlasnik:polj, naziv:n, temperatura:t, voda:v});
  }

  getSadnice(po:string){
    return this.http.get<any>(this.server + 'magacin/dohvatiSadnice/' + po);
  }

  getPreparati(po:string){
    return this.http.get<any>(this.server + 'magacin/dohvatiPreparate/' + po);
  }

  dodajRasadnik(po:string, na:string, sad:Sadnica[], za:number, sl:number){
    return this.http.put<any>(this.server + 'rasadnik/dodajSadnicu',{vlasnik:po, naziv:na, sadnice:sad, zauzeto:za, slobodno:sl});
  }

  primeniPreparat(po:string, na:string, sad:Sadnica[]){
    return this.http.put<any>(this.server + 'rasadnik/primeniPreparat',{vlasnik:po, naziv:na, sadnice:sad});
  }

  umanjiKolicinuSadnice(po:string, pr:string, na:string){
    return this.http.put<any>(this.server + 'magacin/umanji', {poljoprivrednik:po, proizvodjac:pr, naziv:na});
  }

  obrisiUMagacinu(po:string, pr:string, na:string){
    return this.http.delete<any>(this.server + 'magacin/obrisi/' + po + '/' + pr + '/' + na);
  }

  obrisiRasadnik(po:string){
    return this.http.delete<any>(this.server + 'rasadnik/obrisi/'+ po);
  }

  obrisiPoljMagacin(po:string){
    return this.http.delete<any>(this.server + 'magacin/obrisiPo/'+po);
  }

  obrisiPoljNarudzbine(po:string){
    return this.http.delete<any>(this.server + 'narudzbina/obrisiPo/'+po);
  }

  obrisiProizvodeProizvodjaca(pr:string){
    return this.http.delete<any>(this.server + 'proizvod/obrisi/'+pr);
  }
  obrisiNarudzbineProizvodjaca(pr:string){
    return this.http.delete<any>(this.server + 'narudzbina/obrisiPr/'+pr);
  }
}