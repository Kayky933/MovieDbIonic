import { Injectable } from '@angular/core';
import { IListaGenero } from '../Models/igenero-model';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private UrlApi = environment.Url;
  private KeyApi = environment.Key;

  constructor(private http: HttpClient, public toastController: ToastController) { }

  buscarGeneros():Observable<IListaGenero>{
    const url = `${this.UrlApi}movie/550?api_key=${this.KeyApi}`;

       return this.http.get<IListaGenero>(url).pipe(
        map(retorno => retorno),
        catchError(erro => this.exibirErro(erro))
      );
  }

  async exibirErro(erro) {
    const toast = await this.toastController.create({
      message: 'Erro ao consultar a API!',
      duration: 2000,
      color: 'danger',
      position: 'middle'
    });
    toast.present();
    return null;
  }
}
