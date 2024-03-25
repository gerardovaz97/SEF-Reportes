import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {TabulatorFull as Tabulator} from 'tabulator-tables'

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent implements OnChanges{
  
  @Input() tableData: any[] = [ 
      {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
      {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
      {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
      {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
      {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
  ];
  @Input() columnNames: any[] = [];
  @Input() height: string = '311px';

  tab = document.createElement('div');

  ngOnChanges(changes: SimpleChanges): void {
    this.drawTable();
  }
  private drawTable(): void {
    new Tabulator(this.tab, {
      data: this.tableData,
      reactiveData:true, 
      columns: this.columnNames,
      layout: 'fitData',
      height: this.height
    });
    document.getElementById('my-tabular-table')?.appendChild(this.tab);
  }
}
