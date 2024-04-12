import { Component } from '@angular/core';
import { CreedentialsService } from '../../services/creedentials.service';

@Component({
  selector: 'app-reportes-page',
  templateUrl: './reportes-page.component.html',
  styleUrl: './reportes-page.component.scss'
})
export class ReportesPageComponent{

  constructor(private creedentialService: CreedentialsService){}

  public pressModal?: boolean;

  logoutPress(click: boolean){
    this.pressModal = click;
  }
  onLogout(){
    this.creedentialService.LogoutUser();
  }
}
