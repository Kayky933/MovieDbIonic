import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DadosService } from 'src/service/dados.service';
import { IListaSeries } from '../Models/ilista-series';
import { ISerieModel } from '../Models/iserie-model';
import { GeneroService } from '../Services/genero.service';
import { SeriesService } from '../Services/series.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  titulo = 'Filmes APP';

  seresLista: IListaSeries;

  generos: ''[] = [];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public serieService: SeriesService,
    public generoService: GeneroService,
    public route: Router,
    public dadosService: DadosService
  ) {}

  ngOnInit() {
    this.generoService.buscarGeneros().subscribe((dados) => {
      console.log('Generos: ', dados.genres);
      dados.genres.forEach((genero) => {
        this.generos[genero.name] = genero.id;
      });
      this.dadosService.guardarDados('generos', this.generos);
    });
  }

  buscarSeries(evento: any) {
    console.log(evento.target.value);
    const busca = evento.target.value;
    if (busca && busca.trim() !== '') {
      this.serieService.getSeries(busca, 'tv').subscribe((dados) => {
        console.log(dados);
        this.seresLista = dados;
      });
    }
  }

  exibirFilme(filme: ISerieModel) {
    this.route.navigateByUrl('/dados-filme');
  }

  async exibirAlertaFavorito() {
    const alert = await this.alertController.create({
      header: 'Alerta !',
      message: 'Deseja realmente favoritar o filme',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'SIM, Favoritar!',
          handler: () => {
            this.apresentarToast();
          },
        },
      ],
    });

    await alert.present();
  }

  async apresentarToast() {
    const toast = await this.toastController.create({
      message: 'Filme adicionado aos favoritos.',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

}
