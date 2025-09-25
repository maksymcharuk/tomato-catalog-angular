import { Component, ChangeDetectionStrategy } from '@angular/core';

import { LanguageSwitcher } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-bar',
  imports: [LanguageSwitcher],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AppBar {}
