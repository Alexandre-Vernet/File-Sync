import { Component, Input } from '@angular/core';
import { FileWithId } from '../file';

@Component({
    selector: 'app-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent {

    @Input() file: FileWithId;

    audio: HTMLAudioElement = new Audio();
    private isPlaying = false;

    constructor() {
    }

    play(file: FileWithId): void {
        console.log('play');
        if (!this.audio.src || this.audio.src !== file.url) {
            this.audio.src = file.url;
            this.audio.load();
        }
        this.audio.play();
        this.isPlaying = true;
    }

    pause(): void {
        console.log('pause');
        this.audio.pause();
        this.isPlaying = false;
    }

    resume(): void {
        console.log('resume');
        this.audio.play();
        this.isPlaying = true;
    }

    stop(): void {
        console.log('stop');
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
    }

    seek($event: Event): void {
        console.log('seek');
        this.audio.currentTime = ($event.target as HTMLInputElement).valueAsNumber;
    }
}
