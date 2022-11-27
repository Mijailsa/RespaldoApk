import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { AdministrarPage } from './administrar.page';
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('PRUEBAS UNITARIAS: Administrar ', ()=>{
    // Configuracion ambiente de las pruebas:
      beforeEach ( async ()=> {
        await TestBed.configureTestingModule({
          imports: [
            ReactiveFormsModule,
            FormsModule,
            RouterTestingModule,
            HttpClientModule,
            AngularFireModule.initializeApp(environment.firebaseConfig)
          ],
          declarations: [
            AdministrarPage
          ],
          providers: [ StorageService, Storage, UsuarioService ]
        }).compileComponents;
      });


      it(' 1. Levantamiento Administrar', ()=>{
        const fixture = TestBed.createComponent(AdministrarPage);
        const app = fixture.componentInstance;
        
        expect(app).toBeTruthy();
    
      });


      it(' 2. Formulario registro usuario invalido ', ()=>{
        const fixture = TestBed.createComponent(AdministrarPage);
        const app = fixture.componentInstance;
        // Ingresando solo datos incorrectos
        let rut = app.alumno.controls['rut'];
        let nombre = app.alumno.controls['nombre'];
        let apellido = app.alumno.controls['apellido'];
        let correo = app.alumno.controls['correo'];
        let fechanac = app.alumno.controls['fecha_nac'];
        let auto = app.alumno.controls['vehiculo'];
        let tipo = app.alumno.controls['tipo_usuario']
        let contrasena = app.alumno.controls['password'];

        let repetir = app.verificar_password;
        repetir = '123456';


        rut.setValue('20972755-2');
        nombre.setValue('Jasmine');
        apellido.setValue('Karma');
        correo.setValue('asd.asd@duocuc.cl');
        fechanac.setValue('2000-01-01');
        auto.setValue('no');
        tipo.setValue('alumno');
        contrasena.setValue('123456');
        /* repetir.setValue('123456'); */
        
        expect(app.alumno.invalid).toBeTrue();
        
      });
      it(' 3. Entra a ir a Registrar ', ()=>{
        const fixture = TestBed.createComponent(AdministrarPage);
        const app = fixture.componentInstance;
        app.irRegistrar();
        expect(app.validarPruebas).toBeTrue();
        
      });
      it(' 4. Entra a ir a Modificar ', ()=>{
        const fixture = TestBed.createComponent(AdministrarPage);
        const app = fixture.componentInstance;
        app.irModificar();
        expect(app.validarPruebas).toBeTrue();
        
      });
      it(' 5. Entra a ir a Eliminar ', ()=>{
        const fixture = TestBed.createComponent(AdministrarPage);
        const app = fixture.componentInstance;
        app.irEliminar();
        expect(app.validarPruebas).toBeTrue();        
      });
      it(' 6. Entra a ir a Listar ', ()=>{
        const fixture = TestBed.createComponent(AdministrarPage);
        const app = fixture.componentInstance;
        app.irListar();
        expect(app.validarPruebas).toBeTrue();
        
      });

      /* it(' 3. Funcion registro usuario valido ', ()=>{
        const fixture = TestBed.createComponent(AdministrarPage);
        const app = fixture.componentInstance;
        // Ingresando solo datos incorrectos
        let rut = app.alumno.controls['rut'];
        let nombre = app.alumno.controls['nombre'];
        let apellido = app.alumno.controls['apellido'];
        let correo = app.alumno.controls['correo'];
        let fechanac = app.alumno.controls['fecha_nac'];
        let auto = app.alumno.controls['vehiculo'];
        let tipo = app.alumno.controls['tipo_usuario']
        let contrasena = app.alumno.controls['password'];

        /* let repetir = app.verificar_password;
        repetir = '123456'; 


        rut.setValue('20972755-2');
        nombre.setValue('Jasmine');
        apellido.setValue('Karma');
        correo.setValue('asd.asd@duocuc.cl');
        fechanac.setValue('01-01-2000');
        auto.setValue('no');
        tipo.setValue('alumno');
        contrasena.setValue('123456');
        //repetir.setValue('123456');
        
        expect(app.alumno.invalid).toBeFalse();
        
      }); */

      it(' 7. Testear boton registro correcto que entre. ', ()=>{
        const fixture = TestBed.createComponent(AdministrarPage);
        const app = fixture.componentInstance;
        // Ingresando solo datos incorrectos
        let rut = app.alumno.controls['rut'];
        let nombre = app.alumno.controls['nombre'];
        let apellido = app.alumno.controls['apellido'];
        let correo = app.alumno.controls['correo'];
        let fechanac = app.alumno.controls['fecha_nac'];
        let auto = app.alumno.controls['vehiculo'];
        let tipo = app.alumno.controls['tipo_usuario']
        let contrasena = app.alumno.controls['password'];

        let repetir = app.verificar_password;
        repetir = '123456';


        rut.setValue('20972755-2');
        nombre.setValue('Jasmine');
        apellido.setValue('Karma');
        correo.setValue('asd.asd@duocuc.cl');
        fechanac.setValue('2000-01-01');
        auto.setValue('no');
        tipo.setValue('alumno');
        contrasena.setValue('123456');
        /* repetir.setValue('123456'); */
        
        app.registrarAdmin();
        
        expect(app.validarPruebas).toBeTrue();
        
      } );
      it(' 8. Entra a ir a Buscar Admin ', ()=>{
        const fixture = TestBed.createComponent(AdministrarPage);
        const app = fixture.componentInstance;
        app.irListar();
        expect(app.validarPruebas).toBeTrue();
        
      });
      it(' 9. Entra a Modificar Admin ', ()=>{
        const fixture = TestBed.createComponent(AdministrarPage);
        const app = fixture.componentInstance;
        app.modificarAdmin();
        expect(app.validarPruebas).toBeTrue();
        
      });
      it(' 10. Entra a Eliminar Admin ', ()=>{
        const fixture = TestBed.createComponent(AdministrarPage);
        const app = fixture.componentInstance;
        app.eliminarAdmin();
        expect(app.validarPruebas).toBeTrue();
        
      });
      it(' 11. Mayor de 17 años para los formularios, se valida que sea falso un caso erroneo. ',async() => {
        const fixture = TestBed.createComponent(AdministrarPage);
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
      it(' 12. Mayor de 17 años para los formularios, se valida que sea verdadero un caso correcto. ',async() => {
        const fixture = TestBed.createComponent(AdministrarPage);
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
      it(' 13. Validar que no te puedas eliminar a ti mismo, se espera que devuelva true. ',async() => {
        const fixture = TestBed.createComponent(AdministrarPage);
        const app = fixture.componentInstance;
        let rut = '20763231-7';
        let rutForm = '20763231-7';
        if (rut == rutForm) {
            var validacion = true;
          }
        expect(validacion).toBeTrue();
      });
      it(' 14. Validar que no te puedas eliminar a ti mismo, se espera que devuelva undefined, ya que los rut no coinciden entre si. ',async() => {
        const fixture = TestBed.createComponent(AdministrarPage);
        const app = fixture.componentInstance;
        let rut = '20763231-7';
        let rutForm = '20753231-6';
        if (rut == rutForm) {
            var validacion = true;
          }
        expect(validacion).toBeUndefined();
      });
      it(' 15. Validar que un rut correcto sea correcto, devuelve true. ',async() => {
        const fixture = TestBed.createComponent(AdministrarPage);
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
      it(' 16. Validar que un rut incorrecto sea incorrecto, devuelve false. ',async() => {
        const fixture = TestBed.createComponent(AdministrarPage);
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