import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Owner } from 'src/app/model/owner';
import { ToastrService } from 'ngx-toastr';
import { OwnerService } from 'src/app/service/owner.service';
//import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  owner: Owner = new Owner();
  plainPassword = this.form.value['password'];
  saltRounds = 10;

  constructor(
    private oS: OwnerService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      cellphone: new FormControl('', Validators.required),
    });
  }

  insert(): void {
    this.owner.idUser = this.form.value['id'];
    this.owner.name = this.form.value['name'];
    this.owner.lastname = this.form.value['lastname'];
    this.owner.email = this.form.value['email'];
    this.owner.password = this.form.value['password'];
    this.owner.birthDate = this.form.value['birthdate'];
    this.owner.gender = this.form.value['gender'];
    this.owner.cellphone = this.form.value['cellphone'];
    this.owner.status = true;

    if (this.form.valid) {
      this.oS.insert(this.owner).subscribe((data) => {
        this.oS.list().subscribe((data) => {
          this.oS.setList(data);
        });
      });
      this.showSuccessfullyRegisterToast();
      this.router.navigate(['auth/login']);
    }
  }

  showSuccessfullyRegisterToast() {
    this.toastr.success(
      '¡Ahora puedes iniciar sesión!',
      'Registro exitoso 😎',
      { timeOut: 2500, positionClass: 'toast-bottom-right' }
    );
  }
}
