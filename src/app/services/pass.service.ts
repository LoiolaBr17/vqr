import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPass } from 'src/interfaces/IPass';
import { LCST_KEYS } from '../../../utils/constants/index';

interface DicionarioEventoSenhas {
  [key: number]: { [key: number]: IPass };
}

@Injectable({
  providedIn: 'root',
})
export class PassService {
  private initialCredentials: DicionarioEventoSenhas = JSON.parse(
    localStorage.getItem(LCST_KEYS.SENHAS) || '{}'
  );

  private Passes = new BehaviorSubject<DicionarioEventoSenhas>(
    this.initialCredentials
  );

  constructor() {}

  setPass(passData: Omit<IPass, 'id'>) {
    const eventoCorrenteId = Number(
      localStorage.getItem(LCST_KEYS.EVENTO_ATUAL)
    );

    const data: IPass = {
      ...passData,
      id: new Date().getTime(),
    };

    if (eventoCorrenteId) {
      const valueToSave = {
        [eventoCorrenteId]: {
          ...this.initialCredentials[eventoCorrenteId],
          [data.id]: data,
        },
      };
      Object.assign(this.initialCredentials, valueToSave);

      localStorage.setItem(
        LCST_KEYS.SENHAS,
        JSON.stringify(this.initialCredentials)
      );

      this.Passes.next(this.initialCredentials);
    }

    return data;
  }

  getPasses() {
    const eventoCorrenteId = Number(
      localStorage.getItem(LCST_KEYS.EVENTO_ATUAL)
    );

    return this.Passes.asObservable().pipe((dt: any) => {
       return dt[eventoCorrenteId] || {}
      });
  }
}
