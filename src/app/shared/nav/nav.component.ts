import { Component } from '@angular/core';
import { CreedentialsService } from '../../services/creedentials.service';

@Component({
  selector: 'shared-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  protected usr_nombre?: string = "Damaya";

  constructor( public creedentialService: CreedentialsService){}

  onLogout(){
    this.creedentialService.LogoutUser();
  }
}
