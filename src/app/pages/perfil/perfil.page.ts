import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';
import { ToastController } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  /* Variables Validar Pruebas */
  validarPruebas: any;

/* Variables page */
  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService, private storage: StorageService,
    private toastController: ToastController, private home : HomePage, private fireStore: FireService) { }
    selectedFiles: FileList;
  url : any;
  rut: any;
  imagen_id: any;
  sesion: any = [];
  default: any = undefined;
  verificar_password: any;
  alumno = new FormGroup({
    id: new FormControl(''),
    rut: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    correo: new FormControl('', [Validators.email, Validators.required, Validators.pattern('[0-9a-zA-Z](\.[_a-z0-9-]+)+@duocuc.cl')]),
    fecha_nac: new FormControl('', Validators.required),
    auto: new FormControl('', Validators.required),
    vehiculo: new FormControl('undefined'),
    password: new FormControl('', [Validators.required,
    Validators.minLength(6),
    Validators.maxLength(18)]),
    tipo_usuario: new FormControl('', Validators.required)
  });

  carro = new FormGroup(
    {
      patente: new FormControl('',[Validators.required, Validators.maxLength(6), Validators.minLength(5)]),
      pasajeros: new FormControl('',[Validators.required,Validators.min(1),Validators.pattern("[0-9]{1,9}")]),
      modelo: new FormControl('',[Validators.required]),
      marca: new FormControl('',[Validators.required]),
      imagen: new FormControl(''),
      dueno: new FormControl(this.sesion.rut),
      anio: new FormControl('',[Validators.pattern('[0-9]{4}'),Validators.min(1)])
    }
  );
  KEY = "usuarios";
  async ngOnInit() {
    let rut = await this.route.snapshot.paramMap.get('rut');
    this.imagen_id = rut;
    console.log(rut)
    let id = await this.route.snapshot.paramMap.get('id');
    await this.fireStore.getDato(this.KEY, id).subscribe(
      (response: any) => {
        this.sesion = response.data();
      }
    );
    /*  await this.sesion = this.storage.getDato(this.KEY, 'rut'); */
  }

  valorPerfil(num) {
    var numero = num;
    if (numero == 1) {
      this.validarPruebas = 1;
      this.default = 1;
    }
    else if (numero == 2) {
      this.validarPruebas = 2;
      this.default = 2;
    }
    else if (numero == 3) {
      this.validarPruebas = 3;
      this.default = 3;
    }
    else {
      this.validarPruebas = 0;
      this.default = undefined;
    }
  }
  async modificar(num) {
    if (num == 1) {
      this.validarPruebas = 1;
      const now = new Date();
      let anioActual = now.getFullYear();
      const nacUsuario = new Date(this.alumno.controls.fecha_nac.value);
      let edadUsuario = nacUsuario.getFullYear();
      let resta = anioActual - edadUsuario;
      if (resta < 17) {
        var alerta = "¡MAYOR DE 17 AÑOS!";
        await this.toastError(alerta);
        this.validarPruebas = false;
        return;

      }
      if (this.alumno.controls.password.value != this.verificar_password) {
        var alerta = "¡CONTRASEÑAS NO COINCIDEN!";
        await this.toastError(alerta);
        this.validarPruebas = false;
        return;
      }
      this.alumno.controls.id.setValue(this.sesion.id);
      this.alumno.controls.vehiculo.setValue('undefined');
      this.alumno.controls.rut.setValue(this.sesion.rut);
      await this.storage.actualizar(this.KEY, this.alumno.value);
      this.alumno.reset();

      var alerta = "Perfil modificado";
      await this.toastError(alerta);
      return true;
    }
    else if (num == 2) {

      await this.newImageUpload()
      console.log('esta cosita de aca es la url ' +this.url)
     /* this.url = this.newImageUpload(this.carro.controls.imagen) */
    await this.carro.controls.imagen.setValue(this.url)

      this.sesion.vehiculo = this.carro.value;
      
      
      await this.storage.actualizar(this.KEY, this.sesion);
      /* var cambio = this.sesion.rut;
      this.sesion = await this.storage.getDato(this.KEY, cambio); */


      await this.fireStore.getDato(this.KEY, this.sesion.id).subscribe(
        (response: any) => {
          this.sesion = response.data();
        }
      );
      this.default = 4;
      await this.home.recargar(this.sesion.rut);
      var alerta = "Auto agregado.";
      await this.toastError(alerta);
    }

  }
  async toastError(alerta) {
    const toast = await this.toastController.create({
      message: alerta,
      duration: 3000
    });
    toast.present();

  }
  async chargeHome(){
    this.validarPruebas = true;
    await this.home.ngOnInit();
  }

    /* archivo seleccionado */
selectFile(event): void {
  this.selectedFiles = event.target.files;
  console.log('Funciono :D')
}

async newImageUpload() {
 
  const path ='auto'
  const name = this.imagen_id
  const file = this.selectedFiles.item(0);
  
  console.log(file)
  this.url = await this.fireStore.cargarImagen(file,path,name)
 
 
}

/* upload(): void {
  const file = this.selectedFiles.item(0);
  this.selectedFiles = undefined;

  this.currentFileUpload = new FileUpload(file);
  this.fireStore.cargarImagen (this.currentFileUpload).subscribe(
    percentage => {
      this.percentage = Math.round(percentage);
    },
    error => {
      console.log(error);
    }
  );
} */
}
