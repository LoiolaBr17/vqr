import { Component } from '@angular/core';

import { IPass } from 'src/interfaces/IPass';

@Component({
  selector: 'app-list-pass',
  templateUrl: './list-pass.component.html',
  styleUrls: ['./list-pass.component.scss']
})
export class ListPassComponent {
  pass: { [key: string]: IPass } = {}

  constructor() {}

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
  }
}
