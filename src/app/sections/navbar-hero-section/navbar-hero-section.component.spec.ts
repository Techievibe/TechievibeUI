import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarHeroSectionComponent } from './navbar-hero-section.component';

describe('NavbarHeroSectionComponent', () => {
  let component: NavbarHeroSectionComponent;
  let fixture: ComponentFixture<NavbarHeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarHeroSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarHeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
