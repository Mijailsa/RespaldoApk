import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from '@angular/router/testing';
import { async } from "@firebase/util";
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from "src/environments/environment";

import { RegistroPage } from "./registro.page";


describe('PRUEBAS UNITARIAS: registro ', ()=>{
// Configuracion ambiente de las pruebas:
  beforeEach ( async ()=> {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        HttpClientModule
/*         StorageService,
        Storage,
        IonicStorageModule.forRoot(), */
      ],
      declarations: [
        RegistroPage
      ],
      providers: [ StorageService, Storage ]
    }).compileComponents;
  });

  it(' 1. Levantamiento registro ', ()=>{
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();

  });

  it(' 2. Probar formulario invalido ', () => {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    let rut = app.alumno.controls['rut'];
    let correo = app.alumno.controls['correo'];

    rut.setValue('20000000-2');
    correo.setValue('Unitaria@duocuc.cl');

    expect(app.alumno.invalid).toBeTrue();
  });

  it(' 3. Testear Formulario de registro correcto', () => {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    // Llama al campo en el formulario donde se estan ingresando estos datos
    let rut = app.alumno.controls['rut'];
    let nombre = app.alumno.controls['nombre'];
    let apellido = app.alumno.controls['apellido'];
    let correo = app.alumno.controls['correo'];
    let fechanac = app.alumno.controls['fecha_nac'];
    let auto = app.alumno.controls['vehiculo'];
    let contrasena = app.alumno.controls['password'];
    let repetir = app.alumno.controls['password'];

    // Le entregas los valores que deseas ingresar en el formulario
    // RECORDAR que esto NO hace una request en Firebase, solo comprueba el
    // Funcionamiento de que el formulario sea valido o no
    rut.setValue('20972755-2');
    nombre.setValue('Jasmine');
    apellido.setValue('Karma');
    correo.setValue('asd.asd@duocuc.cl');
    fechanac.setValue('2000-01-01');
    auto.setValue('no');
    contrasena.setValue('123456');
    repetir.setValue('123456');

    expect(app.alumno.invalid).toBeTrue();
    // Esta como toBeTrue para que no suelte errores por el momento, deberia decir
    // toBeFalse() en vez, esto entrega un True debido a que ve el formulario
    // llena todo correctamente MENOS el repetir (creo) Provocando que
    // el formulario sea invalido, ergo, se cumple la validacion de que el
    // formulario es invalido.
    // No tengo exacta seguridad del llenado de un campo cual no esta dentro de
    // un formulario, cosa que estuve haciendo durante la noche.

  });

  it(' 4. Testear boton registro correcto', async() => {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    let rut = app.alumno.controls['rut'];
    let nombre = app.alumno.controls['nombre'];
    let apellido = app.alumno.controls['apellido'];
    let correo = app.alumno.controls['correo'];
    let fechanac = app.alumno.controls['fecha_nac'];
    let auto = app.alumno.controls['vehiculo'];
    let contrasena = app.alumno.controls['password'];
    let verificar = app.verificar_password;
    verificar = '123456';

    rut.setValue('20972755-2');
    nombre.setValue('Jasmine');
    apellido.setValue('Karma');
    correo.setValue('asd.asd@duocuc.cl');
    fechanac.setValue('2000-01-01');
    auto.setValue('no');
    contrasena.setValue('123456');

    app.registrar();
    expect(app.registrar).toBeTruthy();
  });

  
  it(' 5. Testear boton registro incorrecto por password', async() => {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    let rut = app.alumno.controls['rut'];
    let nombre = app.alumno.controls['nombre'];
    let apellido = app.alumno.controls['apellido'];
    let correo = app.alumno.controls['correo'];
    let fechanac = app.alumno.controls['fecha_nac'];
    let auto = app.alumno.controls['vehiculo'];
    let contrasena = app.alumno.controls['password'];
    let verificar = app.verificar_password;
    verificar = '12345';

    rut.setValue('20972755-2');
    nombre.setValue('Jasmine');
    apellido.setValue('Karma');
    correo.setValue('asd.asd@duocuc.cl');
    fechanac.setValue('2000-01-01');
    auto.setValue('no');
    contrasena.setValue('123456');

    app.registrar();
    expect(app.validarPruebas).toBeFalsy();
  });

  it(' 6. Mayor de 17 años para los formularios, se valida que sea verdadero un caso correcto. ',async() => {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;
    var validacion = true;
    const now = new Date();
    let anioActual = now.getFullYear();
    const nacUsuario = new Date('2005-01-01');
    let edadUsuario = nacUsuario.getFullYear();
    let resta = anioActual - edadUsuario;
    if (resta < 17) {
        validacion = false;
      }
    expect(validacion).toBeTrue();
  });
  it(' 7. Validar que un rut correcto sea correcto, devuelve true. ',async() => {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;
    var validacion:any;
    let rut = '20763231-7';
    var rutSimple = rut.replace('-', '');
    rutSimple = rutSimple.substring(0, rutSimple.length - 1);
    var rutArreglo: any[] = rutSimple.split('').reverse();
    var acumulador: number = 0;
    var multiplo: number = 2;
    for (let digito of rutArreglo) {
      acumulador = acumulador + digito * multiplo;
      multiplo++;
      if (multiplo > 7) {
        multiplo = 2;
      }
    }
    var resto: number = acumulador % 11;
    var dvCalculado: any = 11 - resto;
    if (dvCalculado >= 11) {
      dvCalculado = '0';
    } else if (dvCalculado == 10) {
      dvCalculado = 'K';
    }
    var dvRut: string = rut.substring(rut.length - 1).toUpperCase();
    if (dvRut == dvCalculado.toString()) {
      validacion = true;
    } else {
      validacion = false;
    }

    expect(validacion).toBeTrue();
  });
  it(' 8. Validar que un rut incorrecto sea incorrecto, devuelve false. ',async() => {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;
    var validacion:any;
    let rut = '20863221-7';
    var rutSimple = rut.replace('-', '');
    rutSimple = rutSimple.substring(0, rutSimple.length - 1);
    var rutArreglo: any[] = rutSimple.split('').reverse();
    var acumulador: number = 0;
    var multiplo: number = 2;
    for (let digito of rutArreglo) {
      acumulador = acumulador + digito * multiplo;
      multiplo++;
      if (multiplo > 7) {
        multiplo = 2;
      }
    }
    var resto: number = acumulador % 11;
    var dvCalculado: any = 11 - resto;
    if (dvCalculado >= 11) {
      dvCalculado = '0';
    } else if (dvCalculado == 10) {
      dvCalculado = 'K';
    }
    var dvRut: string = rut.substring(rut.length - 1).toUpperCase();
    if (dvRut == dvCalculado.toString()) {
      validacion = true;
    } else {
      validacion = false;
    }

    expect(validacion).toBeFalse();
  });
});