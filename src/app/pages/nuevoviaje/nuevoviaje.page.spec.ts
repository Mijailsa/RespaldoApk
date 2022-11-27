/* import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { StorageService } from "src/app/services/storage.service";
import { environment } from "src/environments/environment";
import { HomePageModule } from "../home/home.module";
import { HomePage } from "../home/home.page";

import { NuevoviajePage } from "./nuevoviaje.page";


describe('PRUEBAS UNITARIAS: Nuevo viaje ', ()=>{
// Configuracion ambiente de las pruebas:
  beforeEach ( async ()=> {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        HttpClientModule,
        HomePageModule,
      ],
      declarations: [
        NuevoviajePage,
        HomePage
      ],
      providers: [ 
        StorageService,
        Storage,
        HomePage ],
    }).compileComponents;
  });
  it(' 1. Levantamiento nuevo viaje ', ()=>{
    const fixture = TestBed.createComponent(NuevoviajePage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();

  });
}); */