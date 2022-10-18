import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbVisualizerComponent } from './orb-visualizer.component';

describe('OrbVisualizerComponent', () => {
  let component: OrbVisualizerComponent;
  let fixture: ComponentFixture<OrbVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrbVisualizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrbVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
