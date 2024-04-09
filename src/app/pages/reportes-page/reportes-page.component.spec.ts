import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesPageComponent } from './reportes-page.component';

describe('ReportesPageComponent', () => {
  let component: ReportesPageComponent;
  let fixture: ComponentFixture<ReportesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
