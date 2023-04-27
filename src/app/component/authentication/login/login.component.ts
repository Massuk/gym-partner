import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, private router: Router) {
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
}

// ../../../../assets/avatar.jpg
