import { Component, OnInit } from '@angular/core';

interface Option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

ngOnInit(): void {

}

  options: Option[] = [
    {value: 'Dueño de gimnasio', viewValue: 'Soy dueño de un gimnasio'},
    {value: 'Entrenador', viewValue: 'Soy entrenador'},
    {value: 'Nutricionista', viewValue: 'Soy nutricionista'},
  ];
}
