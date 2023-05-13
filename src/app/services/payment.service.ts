import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPayment } from 'src/interfaces/IPayment';
import { LCST_KEYS } from 'utils/constants';

interface DicionarioSenhaPagamentos {
  [key: number]: { [key: number]: IPayment };
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private initialCredentials = JSON.parse(
    localStorage.getItem(LCST_KEYS.PAGAMENTOS) || '{}'
  ) as DicionarioSenhaPagamentos;

  private Payments = new BehaviorSubject<DicionarioSenhaPagamentos>(
    this.initialCredentials
  );

  constructor() {}

  setPayment(passId: number, passData: Omit<IPayment, 'id'>) {
    const data: IPayment = {
      ...passData,
      id: new Date().getTime(),
    };

    this.initialCredentials[passId][data.id] = data;

    localStorage.setItem(
      LCST_KEYS.PAGAMENTOS,
      JSON.stringify(this.initialCredentials)
    );

    this.Payments.next(this.initialCredentials);
  }

  getPayments(passId: number) {
    this.Payments.asObservable().pipe((dt: any) => dt[passId]);
  }
}
