import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateParkingPage } from './create-parking.page';

describe('CreateParkingPage', () => {
  let component: CreateParkingPage;
  let fixture: ComponentFixture<CreateParkingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateParkingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateParkingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
