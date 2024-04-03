import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-image',
  template:  `      
    <img 
      [src]="source"
      [style]="styles"
      class="img-fluid">
  `,
  styleUrl: './image.component.scss'
})
export class ImageComponent {

  @Input() public source?:string;
  @Input() public styles?:string;
}
