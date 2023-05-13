import { Component } from '@angular/core';

import { IPass } from 'src/interfaces/IPass';
import { Location } from '@angular/common';
import { PaymentService } from './../../services/payment.service';

@Component({
  selector: 'app-list-pass',
  templateUrl: './list-pass.component.html',
  styleUrls: ['./list-pass.component.scss']
})
export class ListPassComponent {
  pass: { [key: string]: IPass } = {};
  passFilter: { [key: string]: IPass } = {};
  searchText = '';
  senhas_todas_filtro = false;
  senhas_vendidas_filtro = false;
  senhas_livres_filtro = false;

  constructor(
    private location: Location,
    private paymentService: PaymentService,
  ) {}

  ngOnInit() {
    this.pass = {
      '12345': {
        id: 12121212,
        disponivel: false,
        nome: 1,
        infos: {
          vaqueiro: 'marcos',
          cavalo: 'tulio',
        }
      },
      '54444': {
        id: 123213213,
        disponivel: false,
        nome: 2,
        infos: {
          vaqueiro: 'marcos',
          cavalo: 'tulio',
        }
      },
      '11112': {
        id: 234234,
        disponivel: true,
        nome: 3,
        infos: null
      },
      '23432432': {
        id: 234234,
        disponivel: true,
        nome: 4,
        infos: null
      },
      '111342312': {
        id: 234,
        disponivel: true,
        nome: 5,
        infos: null
      },
      '32423432': {
        id: 12322342313213,
        disponivel: true,
        nome: 6,
        infos: null
      },
      '1111234322': {
        id: 23432432,
        disponivel: true,
        nome: 7,
        infos: null
      },
      '1111324322': {
        id: 2423432423,
        disponivel: true,
        nome: 8,
        infos: null
      },
    }
    this.passFilter = this.pass;
    this.filtrarSenhas()
  }

  voltar() {
    this.location.back();
  }

  filtrarSenhas() {
    this.senhas_todas_filtro = false;
    this.senhas_vendidas_filtro = false;
    this.senhas_livres_filtro = false;

    if(this.searchText === ''){
      this.passFilter = this.pass;
      return;
    }

    let data: { [key: string]: IPass } = {}
    
    for (let key of Object.keys(this.pass)) {
      console.log(`${key}: ${this.pass[key].nome}`);
      if(this.pass[key].nome.toString() === this.searchText) {
        data[key] = this.pass[key]
      }
    }

    this.passFilter =  data;
  }

  toggleFilter(valor: any) {
    console.log(valor)
    if( valor === 'senhas_todas_filtro'){
      this.senhas_vendidas_filtro = false;
      this.senhas_livres_filtro = false;
      this.applyFilterPassAll();
    }

    if( valor === 'senhas_vendidas_filtro'){
      this.senhas_todas_filtro = false;
      this.senhas_livres_filtro = false;
      this.applyFilterPassSold();
    }

    if( valor === 'senhas_livres_filtro'){
      this.senhas_todas_filtro = false;
      this.senhas_vendidas_filtro = false;
      this.applyFilterPassFree();
    }
  }

  applyFilterPassAll() {
    this.passFilter = this.pass;
    this.searchText = '';
  }

  applyFilterPassSold() {
    let data: { [key: string]: IPass } = {}
    
    for (let key of Object.keys(this.pass)) {
      console.log(`${key}: ${this.pass[key].nome}`);
      if(this.pass[key].disponivel.toString() === 'false') {
        data[key] = this.pass[key]
      }
    }

    this.passFilter =  data;
  }

  applyFilterPassFree() {
    let data: { [key: string]: IPass } = {}
    
    for (let key of Object.keys(this.pass)) {
      console.log(`${key}: ${this.pass[key].nome}`);
      if(this.pass[key].disponivel.toString() === 'true') {
        data[key] = this.pass[key]
      }
    }

    this.passFilter =  data;    
  }
}
