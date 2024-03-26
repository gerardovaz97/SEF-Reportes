import { Component, OnInit } from '@angular/core';

const regexdui = /^[0-9]{8}-[0-9]$/;
const regexnit = /^[0-9]{4}-[0-9]/;

@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit{

  ngOnInit(): void {
    
  }
  
  

}
