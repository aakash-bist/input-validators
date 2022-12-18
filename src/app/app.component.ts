import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formControlName: FormControl = new FormControl('');
  minLength = 1;
  maxLength = 50;
  placeholder: string = `Between ${this.minLength} & ${this.maxLength}`;
  pattern = '';
}
