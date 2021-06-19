import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IListaFilmes } from '../Models/ilista-filmes';

@Injectable({
  providedIn: 'root',
})
export class FilmeService {
  private UrlApi = environment.Url;
  private KeyApi = environment.Key;
  private Liguagem = environment.Lingua;
  private RegiaoLocal = environment.Regiao;

  constructor(
    private http: HttpClient,
    public toastController: ToastController
  ) {}
  
  buscarFilmes(busca: string, tipo: string): Observable<IListaFilmes> {
    //const url = `${this.UrlApi}search/${tipo}/${this.KeyApi}&language=${this.Liguagem}&region=${this.RegiaoLocal}&query=${busca}`;
    const url = `${this.UrlApi}${tipo}/550?api_key=${this.KeyApi}`;
    return this.http.get<IListaFilmes>(url).pipe(
      map((retorno) => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }

  async exibirErro(erro) {
    const toast = await this.toastController.create({
      message: 'Erro ao consultar a API!',
      duration: 2000,
      color: 'danger',
      position: 'middle',
    });
    toast.present();
    return null;
  }
}
