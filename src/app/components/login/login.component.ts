import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';

// import { BlockUIModule } from 'ng-block-ui';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @BlockUI() blockUI: NgBlockUI;
  loginForm!: FormGroup;
  displayModalForgotPass = false;
  emailInInput = '';
  loading = false;
  submitted = false;
  authenticationService: any;
  blockUI: any;
  formBuilder: any;

  constructor(
    private router: Router,
  ) { }



  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  };



  get f() { return this.loginForm.controls; }

onSubmit(){
  if (this.displayModalForgotPass) return

    this.submitted = true;


    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    console.log("antes del servicio",this.f?.['username'].value, this.f?.['password'].value);
    this.authenticationService.login(this.f?.['username'].value, this.f?.['password'].value)
      .pipe(first())
      .subscribe(
        (        data: any) => {
          this.router.navigate(['/home']);
        },
        (        error: any) => {
          console.log('error: ', JSON.stringify(error, null, 2));
          this.loading = false;
          Swal.fire({
            title: 'Error in login',
            html: `Your user or password has been wrong<br><br>`,
            icon: 'error'
          });
          // this.alertService.error(error);
        },
        () => {
          this.router.navigate(['/home']);
          this.loading = false;
        });
}


evaluateEmail() {
  const email = this.emailInInput;
  console.log(email);
  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  console.log(validEmail);
  if (validEmail) {
    this.sendRequestRecoverPassword(email);
  } else {
    Swal.fire({
      title: 'Email no valido',
      html: `Debe ingresar una cuenta de correo electrónico válida`,
      icon: 'warning'
    });
  }
}


sendRequestRecoverPassword(email: string) {
  this.blockUI.start("Validando...");
  this.authenticationService.sendRequestRecoverPassword(email).subscribe((res: any) => {
    console.log(res);
    this.blockUI.stop();
    if (res.email === email) {
      this.displayModalForgotPass = false;
      Swal.fire({
        title: 'Envio exitoso',
        html: `La contraseña ha sido enviada al correo <b>${email}</b>`,
        icon: 'success'
      });
    } else {
      Swal.fire({
        title: 'Error al generar la contraseña',
        html: `Error en la respuesta del servicio. <b>Por favor comuníquese con el administrador.</b>`,
        icon: 'error'
      });
    }
  },
    (    err: { error: any; }) => {
      console.log(err);
      this.blockUI.stop();
      Swal.fire({
        title: 'Error al generar la contraseña',
        html: `${err.error} <br><br> <b>Por favor comuníquese con el administrador.</b>`,
        icon: 'error'
      });
    },
    () => {
      this.blockUI.stop();
    })
}





}

