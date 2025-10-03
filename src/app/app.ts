import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppStore } from './store/app.store';

// import { AppBar } from './components/app-bar/app-bar.component';

@Component({
  selector: 'app',
  imports: [
    RouterOutlet,
    // AppBar
  ],
  providers: [AppStore],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class App {}
