import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from "src/environments/environment";
import { RecuperarPage } from "./recuperar.page";


describe('PRUEBAS UNITARIAS: recuperar ', ()=>{
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
        RecuperarPage
      ]
    }).compileComponents;
  });
  it(' 1. Levantamiento recuperar ', ()=>{
    const fixture = TestBed.createComponent(RecuperarPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();

  });
});