import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteDetailPageComponent } from './route-detail-page.component';

describe('RouteDetailPageComponent', () => {
  let component: RouteDetailPageComponent;
  let fixture: ComponentFixture<RouteDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
