import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt } from 'pdfmake-wrapper';

@Component({
  selector: 'app-generate-pdf',
  templateUrl: './generate-pdf.component.html',
  styleUrls: ['./generate-pdf.component.scss']
})
export class GeneratePdfComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  generatePDF() {
    const pdf = new PdfMakeWrapper();

    pdf.add(
      //aqui son definiciones por lo tanto puede ser txt, img, etc
      new Txt('Hola mundo').bold().italics().end
    );
    pdf.create().open();
  }

}
