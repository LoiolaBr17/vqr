import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import { ElementRef, ViewChild } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { eventItem } from 'src/interfaces/eventItem';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-password',
  templateUrl: './add-password.component.html',
  styleUrls: ['./add-password.component.scss']
})
export class AddPasswordComponent {
  options: number[] = [];
  priceOnePassword: number = 0;
  selectedPasswords: number[] = [];
  formPayment: { forma: string, value: any }[] = [];
  isOpen = false;
  info: any;

  @ViewChild('content', {static: false}) el!: ElementRef;

  constructor(
    private eventsService: EventsService,
  ) {

  }

  ngOnInit() {
    this.eventsService.getEventSelected().subscribe(
      (res) => {
        if (res.qtdSenhas) {
          this.options = Array.from({ length: res.qtdSenhas }, (_, i) => i + 1);
        }

        if (res.valueSenha) {
          this.priceOnePassword = res.valueSenha;
        }
      }
    );
  }

  openModal(f: any) {
    this.formPayment = [];

    if(f.value.dinheiro === true) {
      this.formPayment.push({forma: 'dinheiro', value: f.value.valor_dinheiro});
    }

    if(f.value.cartao === true) {
      this.formPayment.push({forma: 'cartão', value: f.value.valor_cartao});
    }

    if(f.value.cheque === true) {
      this.formPayment.push({forma: 'cartão', value: f.value.valor_cheque});
    }

    if(f.value.pix === true) {
      this.formPayment.push({forma: 'pix', value: f.value.valor_pix});
    }

    this.info = f.value;
    console.log(f.value)
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  selectPassword(password: any) {
    this.selectedPasswords.push(password);
  }

  removeSelectPassword(number: any) {
    const index = this.selectedPasswords.indexOf(number);
    if (index !== -1) {
      this.selectedPasswords.splice(index, 1);
    }
  }

  submitForm(f:any) {
    console.log(f.value)

    this.generatePdf();
  }

  generatePdf() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("ficha.pdf");
      }
    })
  }
}
