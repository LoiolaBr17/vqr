import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { EventsService } from 'src/app/services/events.service';
import { PaymentService } from 'src/app/services/payment.service';
import { IEventItem } from 'src/interfaces/IEventItem';
import { LCST_KEYS } from './../../../../utils/constants/index';
import { PassService } from './../../services/pass.service';

@Component({
  selector: 'app-add-pass',
  templateUrl: './add-pass.component.html',
  styleUrls: ['./add-pass.component.scss'],
})
export class AddPassComponent {
  options: any[] = [];
  evento: IEventItem = {} as IEventItem;

  precoPadraoSenha: string = '';
  selectedPass: any = 0;

  formPayment: { forma: string; value: any }[] = [];
  isOpen = false;
  info: any;

  @ViewChild('content', { static: false }) el!: ElementRef;

  constructor(
    private eventsService: EventsService,
    private passService: PassService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    const eventoId = Number(localStorage.getItem(LCST_KEYS.EVENTO_ATUAL));
    this.eventsService.getEventSelected().subscribe((evento) => {
      this.evento = evento[eventoId];

      this.passService.getPasses().subscribe((eventosSenhas) => {
        const senhas = eventosSenhas[this.evento.id];
        const senhaJaCadastradas = Object.values(senhas).map(({ nome }) =>
          Number(nome)
        );

        this.options = Array.from(
          { length: this.evento.qtdSenhas },
          (_, i) => ({
            nome: i + 1,
            disponivel: !senhaJaCadastradas.includes(i + 1),
          })
        );
      });

      if (this.evento.valueSenha) {
        this.precoPadraoSenha = String(this.evento.valueSenha);
      }
    });
  }

  openModal(f: any) {
    this.formPayment = [];

    if (f.value.dinheiro === true) {
      this.formPayment.push({
        forma: 'dinheiro',
        value: f.value.valor_dinheiro,
      });
    }

    if (f.value.cartao === true) {
      this.formPayment.push({ forma: 'cartão', value: f.value.valor_cartao });
    }

    if (f.value.cheque === true) {
      this.formPayment.push({ forma: 'cartão', value: f.value.valor_cheque });
    }

    if (f.value.pix === true) {
      this.formPayment.push({ forma: 'pix', value: f.value.valor_pix });
    }

    this.info = f.value;
    console.log(f.value);
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  selectPassword(pass: any) {
    if (pass.disponivel) this.selectedPass = pass;
  }

  submitForm(f: any) {
    const { valor_dinheiro, valor_pix, valor_cartao, valor_cheque, ...infos } =
      this.info;

    const pass = this.passService.setPass({
      disponivel: true,
      nome: this.selectedPass.nome,
      infos,
    });

    if (valor_dinheiro) {
      this.paymentService.setPayment(pass.id, {
        tipo: 'dinheiro',
        valor: valor_dinheiro,
      });
    }

    if (valor_dinheiro) {
      this.paymentService.setPayment(pass.id, {
        tipo: 'cheque',
        valor: valor_cheque,
      });
    }

    if (valor_dinheiro) {
      this.paymentService.setPayment(pass.id, {
        tipo: 'pix',
        valor: valor_pix,
      });
    }

    if (valor_dinheiro) {
      this.paymentService.setPayment(pass.id, {
        tipo: 'cartao',
        valor: valor_cartao,
      });
    }

    this.generatePdf();
  }

  generatePdf() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('ficha.pdf');
      },
    });
  }
}
