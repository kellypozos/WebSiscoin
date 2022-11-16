import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-editar-empresa2',
  templateUrl: './editar-empresa2.component.html',
  styleUrls: ['./editar-empresa2.component.scss']
})
export class EditarEmpresa2Component {

  options: FormGroup | undefined;
  tabs = ['First', 'Second', 'Third'];
  selected = new FormControl(0);

  asyncTabs: Observable<ExampleTab[]>;

  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background = '';

  public void(fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto'
    });
  }

  // For form validator
  email = new FormControl('', [Validators.required, Validators.email]);

  // Sufix and prefix
  hide = true;

  getErrorMessage(): any {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  constructor() {
    // tslint:disable-next-line: deprecation
    this.asyncTabs = Observable.create((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: 'First', content: 'Content 1' },
          { label: 'Second', content: 'Content 2' },
          { label: 'Third', content: 'Content 3' }
        ]);
      }, 1000);
    });
  }

  toggleBackground(): void {
    this.background = this.background ? '' : 'primary';
  }

  addLink(): void {
    this.links.push(`Link ${this.links.length + 1}`);
  }




}