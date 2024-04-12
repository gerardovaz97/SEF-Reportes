import { Component, EventEmitter, Output } from '@angular/core';
import { CreedentialsService } from '../../services/creedentials.service';

@Component({
  selector: 'shared-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  protected usr_nombre?: string = "Damaya";

  constructor(){}

  @Output()
  public logoutPress = new EventEmitter<boolean>();

  emitLogoutPress():void{
    this.logoutPress.emit(true);
  }
}
