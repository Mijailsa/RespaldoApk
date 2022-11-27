import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { Error404Page } from './error404.page';

describe('PRUEBAS UNITARIAS: Error404', ()=>{
    beforeEach ( ()=> {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
                RouterTestingModule
            ],
            declarations: [
                Error404Page
            ],
        }).compileComponents;
    });
    it(' 1. Levantamiento error404', ()=> {
        const fixture = TestBed.createComponent(Error404Page);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
})