import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AdminDashboardPage {}
