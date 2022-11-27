import { TestBed, ComponentFixture, waitForAsync } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from '@angular/router/testing';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { StorageService } from 'src/app/services/storage.service';
import { PerfilPage } from "./perfil.page";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "src/environments/environment";
import { HttpClientModule } from "@angular/common/http";
import { HomePage } from "../home/home.page";



describe('PRUEBAS UNITARIAS: Perfil ', ()=>{
// Configuracion ambiente de las pruebas:
  beforeEach ( async ()=> {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        HttpClientModule,
        
      ],
      declarations: [
        PerfilPage
      ],
      providers: [ StorageService, Storage, HomePage ]
    }).compileComponents;
  });
  it(' 1. Levantamiento perfil ', ()=>{
    const fixture = TestBed.createComponent(PerfilPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();

  });


  it(' 2. Testear recargar de HomePage, qué el método se seleccione', async() => {
    const fixture = TestBed.createComponent(PerfilPage);
    const app = fixture.componentInstance;
    app.chargeHome();
    expect(app.validarPruebas).toBeTrue();
  });



  it(' 3. Testear entrar en modificar perfil usuario. ', async() => {
    const fixture = TestBed.createComponent(PerfilPage);
    const app = fixture.componentInstance;
    app.modificar(1);
    expect(app.validarPruebas).toBeGreaterThan(0);
  });
  
  it(' 4. Testear que las contraseñas se deban si o si repetir en formulario usuario modificar.', async() => {
    const fixture = TestBed.createComponent(PerfilPage);
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
    if(verificar != contrasena){
        var validacion = false;
    }
    app.modificar(1);
    expect(validacion).toBeFalse();
  });
  it(' 5. Testear que la edad sea mayor que 17', async() => {
    const fixture = TestBed.createComponent(PerfilPage);
    const app = fixture.componentInstance;

    const now = new Date();
    let anioActual = now.getFullYear();
    const nacUsuario = new Date('2009-01-01');
    let edadUsuario = nacUsuario.getFullYear();
    let resta = anioActual - edadUsuario;
    if (resta < 17) {
        var validacion = false;
      }
    expect(validacion).toBeFalse();
  });
  it(' 6. Testear que la edad pueda ser mayor o igual que 17', async() => {
    const fixture = TestBed.createComponent(PerfilPage);
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
  

  it(' 7. Probar formulario de auto invalido ', () => {
    const fixture = TestBed.createComponent(PerfilPage);
    const app = fixture.componentInstance;

    let patente = app.carro.controls['patente'];
    let pasajeros = app.carro.controls['pasajeros'];
    let modelo = app.carro.controls['modelo'];
    let marca = app.carro.controls['marca'];
    /* let imagen = app.carro.controls['imagen']; */
    let ano = app.carro.controls['anio'];

    patente.setValue('WXAS42');
    pasajeros.setValue('4');
    modelo.setValue('Toyota');
    marca.setValue('Marca');
    ano.setValue('200');

    expect(app.carro.invalid).toBeTrue();
  });

  it(' 8. Probar formulario de auto valido ', () => {
    const fixture = TestBed.createComponent(PerfilPage);
    const app = fixture.componentInstance;

    let patente = app.carro.controls['patente'];
    let pasajeros = app.carro.controls['pasajeros'];
    let modelo = app.carro.controls['modelo'];
    let marca = app.carro.controls['marca'];
    let imagen = app.carro.controls['imagen'];
    let ano = app.carro.controls['anio'];

    patente.setValue('WXAS42');
    pasajeros.setValue('4');
    modelo.setValue('Toyota');
    marca.setValue('Marca');
    ano.setValue('2000');

    expect(app.carro.invalid).toBeFalse();
  });

  it(' 9. Probar boton agregar que NO AGREGUE en auto valido ', () => {
    const fixture = TestBed.createComponent(PerfilPage);
    const app = fixture.componentInstance;

    let patente = app.carro.controls['patente'];
    let pasajeros = app.carro.controls['pasajeros'];
    let modelo = app.carro.controls['modelo'];
    let marca = app.carro.controls['marca'];
    let imagen = app.carro.controls['imagen'];
    let ano = app.carro.controls['anio'];

    patente.setValue('WXAS42');
    pasajeros.setValue('4');
    modelo.setValue('Toyota');
    marca.setValue('Marca');
    ano.setValue('2000');

    expect(app.carro.invalid).toBeFalse();
  });

  /* it(' 10. Probar boton agregar que SI AGREGUE en auto valido ', () => {
    const fixture = TestBed.createComponent(PerfilPage);
    const app = fixture.componentInstance;

    let patente = app.carro.controls['patente'];
    let pasajeros = app.carro.controls['pasajeros'];
    let modelo = app.carro.controls['modelo'];
    let marca = app.carro.controls['marca'];
    let imagen = app.carro.controls['imagen'];
    let ano = app.carro.controls['anio'];

    patente.setValue('WXAS42');
    pasajeros.setValue('4');
    modelo.setValue('Toyota');
    marca.setValue('Marca');
    ano.setValue('2000');

    expect(app.carro.invalid).toBeFalse();

    app.;
    expect(app).toBeFalsy();
  }); */
  
  it(' 10. Validar que voy a misDatos ', ()=>{
    const fixture = TestBed.createComponent(PerfilPage);
    const app = fixture.componentInstance;
    app.valorPerfil(0);
    expect(app.validarPruebas).toBeLessThan(1);
    
  });
  it(' 11. Validar que voy a modificarDatos ', ()=>{
    const fixture = TestBed.createComponent(PerfilPage);
    const app = fixture.componentInstance;
    app.valorPerfil(1);
    expect(app.validarPruebas).toBeLessThan(2);
    
  });
  it(' 12. Validar que voy a agregarAuto ', ()=>{
    const fixture = TestBed.createComponent(PerfilPage);
    const app = fixture.componentInstance;
    app.valorPerfil(2);
    expect(app.validarPruebas).toBeLessThan(3);        
  });
  it(' 13. Validar que voy a misViajes ', ()=>{
    const fixture = TestBed.createComponent(PerfilPage);
    const app = fixture.componentInstance;
    app.valorPerfil(3);
    expect(app.validarPruebas).toBeLessThan(4);
    
  });


}); 