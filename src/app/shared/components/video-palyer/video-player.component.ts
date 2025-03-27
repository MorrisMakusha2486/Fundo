import { Component, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent {
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
    const video = this.videoPlayer.nativeElement;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  }
}
