import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoOutputSheqigComponent } from './video-output-sheqig.component';

describe('VideoOutputSheqigComponent', () => {
  let component: VideoOutputSheqigComponent;
  let fixture: ComponentFixture<VideoOutputSheqigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoOutputSheqigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoOutputSheqigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
