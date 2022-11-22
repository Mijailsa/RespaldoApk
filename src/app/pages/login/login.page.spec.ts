import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { LoginPage } from './login.page';

 

describe("PRUEBA UNITARIAS: home", ()=>{
  //configurar nuestro ambiente de pruebas:
  beforeEach( async ()=>{
  await TestBed.configureTestingModule({
  imports: [
  ReactiveFormsModule,
  FormsModule,
  AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  declarations: [
  LoginPage
  ]
  }).compileComponents();
});

it('1.Levantar la pagina Login',()=>{
  const fixture = TestBed.createComponent(LoginPage);
  const app = fixture.componentInstance;

  expect(app).toBeTruthy();

});
it('2. Ingreso de credenciales incorrecto', ()=>{
const fixture = TestBed.createComponent(LoginPage)
const app = fixture.componentInstance; 

let rut= app.rut

})
});
  
