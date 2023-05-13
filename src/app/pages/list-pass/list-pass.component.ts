import { Component } from '@angular/core';
import { LCST_KEYS } from './../../../../utils/constants/index';

import { Location } from '@angular/common';
import { EventsService } from 'src/app/services/events.service';
import { PassService } from 'src/app/services/pass.service';
import { IPass } from 'src/interfaces/IPass';
import { PaymentService } from './../../services/payment.service';

@Component({
  selector: 'app-list-pass',
  templateUrl: './list-pass.component.html',
  styleUrls: ['./list-pass.component.scss'],
})
export class ListPassComponent {
  eventoCorrenteId = Number(localStorage.getItem(LCST_KEYS.EVENTO_ATUAL));

  pass: { [key: string]: IPass } = {};
  passFilter: { [key: string]: IPass } = {};
  searchText = '';
  senhas_todas_filtro = false;
  senhas_vendidas_filtro = false;
  senhas_livres_filtro = false;

  constructor(
    private location: Location,
    private paymentService: PaymentService,
    private eventsService: EventsService,
    private passService: PassService
  ) {}

  ngOnInit() {
    this.passService.getPasses().subscribe((dt) => {
      this.pass = dt[this.eventoCorrenteId] || {};
      this.passFilter = this.pass;
    });
    this.filtrarSenhas();
  }

  voltar() {
    this.location.back();
  }

  filtrarSenhas() {
    this.senhas_todas_filtro = false;
    this.senhas_vendidas_filtro = false;
    this.senhas_livres_filtro = false;

    if (this.searchText === '') {
      this.passFilter = this.pass;
      return;
    }

    let data: { [key: string]: IPass } = {};

    for (let key of Object.keys(this.pass)) {
      console.log(`${key}: ${this.pass[key].nome}`);
      if (this.pass[key].nome.toString() === this.searchText) {
        data[key] = this.pass[key];
      }
    }

    this.passFilter = data;
  }

  toggleFilter(valor: any) {
    console.log(valor);
    if (valor === 'senhas_todas_filtro') {
      this.senhas_vendidas_filtro = false;
      this.senhas_livres_filtro = false;
      this.applyFilterPassAll();
    }

    if (valor === 'senhas_vendidas_filtro') {
      this.senhas_todas_filtro = false;
      this.senhas_livres_filtro = false;
      this.applyFilterPassSold();
    }

    if (valor === 'senhas_livres_filtro') {
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
    let data: { [key: string]: IPass } = {};

    for (let key of Object.keys(this.pass)) {
      console.log(`${key}: ${this.pass[key].nome}`);
      if (this.pass[key].disponivel.toString() === 'false') {
        data[key] = this.pass[key];
      }
    }

    this.passFilter = data;
  }

  applyFilterPassFree() {
    let data: { [key: string]: IPass } = {};

    for (let key of Object.keys(this.pass)) {
      console.log(`${key}: ${this.pass[key].nome}`);
      if (this.pass[key].disponivel.toString() === 'true') {
        data[key] = this.pass[key];
      }
    }

    this.passFilter = data;
  }
}
