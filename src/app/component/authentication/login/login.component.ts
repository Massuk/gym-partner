import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtRequest } from 'src/app/model/jwtRequest';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  message: string = '';
  idUser: number = 0;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: ['', [Validators.required]],
    });
  }

  login() {
    let request = new JwtRequest();
    request.username = this.email.value;
    request.password = this.password.value;
    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        sessionStorage.setItem('username', request.username);
        this.router.navigate(['/dashboard/gyms']);
      },
      (error) => {
        console.log(error); // Imprimir el error en la consola
          this.showErrorLoginToast();
      }
    );
  }
  showErrorLoginToast() {
    this.toastr.error('Credenciales vacias o incorrectas', 'No se pudo iniciar sesión 🥱', {
      timeOut: 3500,
      positionClass: 'toast-bottom-center'
    });
  }
}
