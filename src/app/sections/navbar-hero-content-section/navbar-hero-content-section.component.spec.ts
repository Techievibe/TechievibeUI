import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarHeroContentSectionComponent } from './navbar-hero-content-section.component';

describe('NavbarHeroContentSectionComponent', () => {
  let component: NavbarHeroContentSectionComponent;
  let fixture: ComponentFixture<NavbarHeroContentSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarHeroContentSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarHeroContentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
