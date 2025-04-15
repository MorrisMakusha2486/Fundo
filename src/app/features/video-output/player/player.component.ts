
import { Component, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  @Input() videoUrl!: string;
  @Input() title?: string;
  @Input() autoplay: boolean = false;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  
  @Output() videoEnded = new EventEmitter<void>();
  @Output() progressUpdate = new EventEmitter<number>();

  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  volume: number = 1;
  isFullscreen: boolean = false; // Added isFullscreen property
  
  onPlay(): void {
    this.isPlaying = true;
    this.videoPlayer.nativeElement.play();
  }

  onPause(): void {
    this.isPlaying = false;
    this.videoPlayer.nativeElement.pause();
  }

  onTimeUpdate(): void {
    const video = this.videoPlayer.nativeElement;
    this.currentTime = video.currentTime;
    this.duration = video.duration;
    this.progressUpdate.emit((this.currentTime / this.duration) * 100);
  }

  onVideoEnded(): void {
    this.isPlaying = false;
    this.videoEnded.emit();
  }

  seek(event: any): void {
    const video = this.videoPlayer.nativeElement;
    const seekPosition = (event.target.value / 100) * video.duration;
    video.currentTime = seekPosition;
  }

  adjustVolume(event: any): void {
    this.volume = event.target.value;
    this.videoPlayer.nativeElement.volume = this.volume;
  }

  toggleFullscreen(): void {
    const elem = this.videoPlayer.nativeElement as any; // Use 'any' for broader compatibility
    const doc = document as any; // Use 'any' for broader compatibility

    if (!this.isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
      this.isFullscreen = true;
    } else {
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.mozCancelFullScreen) { /* Firefox */
        doc.mozCancelFullScreen();
      } else if (doc.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) { /* IE/Edge */
        doc.msExitFullscreen();
      }
      this.isFullscreen = false;
    }
    // Consider adding event listeners for 'fullscreenchange' to update isFullscreen if user exits via ESC key
  }

  previousVideo(): void {
    // Implement previous video logic here
    console.log('Previous video clicked');
  }

  adjustPlaybackSpeed(event: any): void {
    this.videoPlayer.nativeElement.playbackRate = event.target.value;
  }

  nextVideo(): void {
    // Implement next video logic here
    console.log('Next video clicked');
  }
}
