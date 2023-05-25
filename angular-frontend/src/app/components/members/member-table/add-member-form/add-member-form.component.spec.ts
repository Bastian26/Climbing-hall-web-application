import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { AddMemberFormComponent } from './add-member-form.component';

describe('AddMemberFormComponent', () => {
  let component: AddMemberFormComponent;
  let fixture: ComponentFixture<AddMemberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot(provideMockStore) ],
      declarations: [ AddMemberFormComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
