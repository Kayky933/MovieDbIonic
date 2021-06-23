import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DadosService } from 'src/service/dados.service';
import { IFilmeModel } from '../Models/ifilme-model';
import { IListaFilmes } from '../Models/ilista-filmes';
import { FilmeService } from '../Services/filme.service';
import { GeneroService } from '../Services/genero.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  titulo = 'Filmes APP';

  listaFilmes: IListaFilmes;

  generos: ''[] = [];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public filmeService: FilmeService,
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

  buscarFilmes(evento: any) {
    console.log(evento.target.value);
    const busca = evento.target.value;
    if (busca && busca.trim() !== '') {
      this.filmeService.getFilms(busca, 'movie').subscribe((dados) => {
        console.log(dados);
        this.listaFilmes = dados;
      });
    }
  }

  exibirFilme(filme: IFilmeModel) {
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
