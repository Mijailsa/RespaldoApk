import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { FireService } from 'src/app/services/fire.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';
import { LoginPage } from './login.page'; 

describe("PRUEBA UNITARIAS: Login", ()=>{
  //configurar nuestro ambiente de pruebas:
    beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        HttpClientModule
  
      ],
      declarations: [
        LoginPage, 
      ],
        providers: [ StorageService, Storage ]
  }).compileComponents();
});

it('1.Levantar la pagina Login',()=>{
  const fixture = TestBed.createComponent(LoginPage);
  const app = fixture.componentInstance;

  expect(app).toBeTruthy();

});

it('2. Ingreso de credenciales incorrectas', ()=>{
const fixture = TestBed.createComponent(LoginPage)
const app = fixture.componentInstance; 

let rut = app.rut;
let pass = app.password;
rut = '20763231-7';
pass = '230920329023';
app.login();
expect(app.validarPruebas).toBeFalsy();

});

it('3. Ingreso de credenciales correctas', async()=>{
  const fixture = TestBed.createComponent(LoginPage)
  const app = fixture.componentInstance; 
  
  let rut = app.rut;
  let pass = app.password;
  let key = app.KEY;
  key = 'usuarios';
  rut = '20763231-7';
  pass = 'Ut-9]KSrDZEBNIY1=J%e';
  let storage:Storage;
  let myStorage: StorageService;
  
  app.ngOnInit();
  let objectValidar = app.objectValidar;
  objectValidar.find(usu => usu.rut == rut && usu.password == pass);
  app.login();
  expect(app.objectValidar).toBeDefined();
  });
  
}); 
