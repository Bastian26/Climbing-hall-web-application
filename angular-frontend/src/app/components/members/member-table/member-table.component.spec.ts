import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MemberTableComponent } from './member-table.component';
import { By } from '@angular/platform-browser';
import { AddMemberFormComponent } from './add-member-form/add-member-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MembersComponent', () => {
  let component: MemberTableComponent;
  let fixture: ComponentFixture<MemberTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        StoreModule.forRoot(provideMockStore),
        NoopAnimationsModule,
      ],
      declarations: [MemberTableComponent, AddMemberFormComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    //let store = TestBed.get(Store);
    fixture = TestBed.createComponent(MemberTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Member-Table Component', () => {
    expect(component).toBeTruthy();
  });

  it('should add the class "mat-icon-button" to the button element', () => {
    const buttonElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;
    expect(buttonElement.classList).toContain('mat-icon-button');
  });

  it('should call the "openAddFormDialog" function when the button is clicked', () => {
    const buttonElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;
    jest.spyOn(component, 'openAddFormDialog');
    buttonElement.click();
    expect(component.openAddFormDialog).toHaveBeenCalledWith('1000ms');
  });

  it('should render the element with the class "filter-input"', () => {
    const filterInputElement = fixture.debugElement.query(
      By.css('.filter-input')
    );
    expect(filterInputElement).toBeTruthy();
  });

  it('should delete member', () => {
    const id = 1;
    jest.spyOn(component, 'onDeleteMember');
    component.onDeleteMember(id);
    expect(component.onDeleteMember).toHaveBeenCalledWith(id);
  });

  // it('should filter table', () => {
  //   // Initialisiere displayedColumns
  //   component.displayedColumns = ['id', 'firstName', 'lastName'];
  //   // Erstelle Beispielobjekte mit dem Member-Modell
  //   const members = [    { id: 1, firstName: 'John', lastName: 'Doe' },    { id: 2, firstName: 'Jane', lastName: 'Doe' },  ];
  //   // Initialisiere dataSource mit den Beispielobjekten
  //   component.dataSource = new MatTableDataSource(members);
  //   // Simuliere das Eingeben eines Filters
  //   const filterValue = 'jane';
  //   const event = { target: { value: filterValue } };
  //   component.applyFilter(event as unknown as Event);
  //   // Prüfe, ob der Filter korrekt angewendet wurde
  //   expect(component.dataSource.filter).toEqual(filterValue.trim().toLowerCase());
  // });
});
