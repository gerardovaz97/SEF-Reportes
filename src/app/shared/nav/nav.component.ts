import { Component } from '@angular/core';

@Component({
  selector: 'shared-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  protected usr_nombre?: string = "Damaya";

}
