import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { v4 } from 'uuid';
import { FireService } from 'src/app/services/fire.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  /* VARIABLES PARA PRUEBAS */
  validarPruebas: any;




  alumno = new FormGroup({
    id: new FormControl(''),
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{7,8}-[0-9kK]{1}')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    correo: new FormControl('', [Validators.email, Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duoc|duocuc|profesor.duoc).(cl)')]),
    fecha_nac: new FormControl('', Validators.required),
    auto: new FormControl('', Validators.required),
    vehiculo: new FormControl('undefined'),
    password: new FormControl('', [Validators.required,
    Validators.minLength(6),
    Validators.maxLength(18)/* ,Validators.pattern('^?=.(*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,18}$') */
    ]),
    tipo_usuario: new FormControl('alumno')
  });
  /*   validarPass= this.alumno.reset();
   */
  KEY: any = "usuarios";
  validar_correo: any
  verificar_password: string;
  alert: any;
  datos: any = [];
  constructor(private usuarioService: UsuarioService, private router: Router,
    private storage: StorageService,
    private toastcontroller: ToastController,
    private fireStore: FireService,private loading: LoadingController) { }

  async ngOnInit() {
    await this.fireStore.getDatos("usuarios").subscribe(
      data => {
        for (let usuario of data) {
          let usu = usuario.payload.doc.data();
          usu['id'] = usuario.payload.doc.id;
          this.datos.push(usu);
          this.datos.forEach(element => {
            console.log("rut: "+element.rut+" nombre: "+element.nombre);
          });
        }
      }
    );
    await this.esperaEvento();
  }

  async registrar() {
    let existe = await this.datos.find(usu => usu['rut'] == this.alumno.controls.rut.value);
    let correoNotRepeat = await this.datos.find(usu => usu['correo'] == this.alumno.controls.correo.value);
    const now = new Date();
    let anioActual = now.getFullYear();
    const nacUsuario = new Date(this.alumno.controls.fecha_nac.value);
    let edadUsuario = nacUsuario.getFullYear();
    let resta = anioActual - edadUsuario;
    /*alert(anioActual);*/
    if (!this.usuarioService.validarRut(this.alumno.controls.rut.value)) {
      this.alert = '¡RUT INCORRECTO!';
      await this.toastError(this.alert);
      this.validarPruebas = false;
      return;
    }
    if (resta < 17) {
      this.alert = '¡MAYOR DE 17 AÑOS!';
      await this.toastError(this.alert);
      this.validarPruebas = false;
      return;
    }
    if (this.alumno.controls.password.value != this.verificar_password) {
      this.alert = '¡CONTRASEÑAS NO COINCIDEN!';
      await this.toastError(this.alert);
      this.validarPruebas = false;
      return;
    }
    if(correoNotRepeat != undefined){
      this.alert = '¡EL CORREO YA EXISTE!';
      await this.toastError(this.alert);
      this.validarPruebas = false;
      return;
    }
    this.alumno.controls.id.setValue(v4());


    var guardar = await this.storage.agregar(this.KEY, this.alumno.value, existe);

    if (guardar == true) {
      /*correo = this.usuarioService.obtenerUsuario(this.alumno.controls.rut.value); Para otra version */
      this.alumno.reset();
      /* this.verificar_password ='' ; */
      this.alert = '¡USUARIO REGISTRADO!';
      await this.toastError(this.alert);
      this.router.navigate(['/login']);

    }
    else {
      this.alert = '¡USUARIO YA EXISTE!'
      await this.toastError(this.alert);
      this.router.navigate(['/registro']);
    }

  }
  async toastError(alerta) {
    const toast = await this.toastcontroller.create({
      message: alerta,
      duration: 3000
    });
    toast.present();
  }
  async esperaEvento(){
    const cargando = await this.loading.create(
      {
        message: 'Cargando...',
        duration: 3000
      }
    );
    cargando.present();
  }
}


