import { AfterViewInit, Component } from '@angular/core';
import {TabulatorFull as Tabulator} from 'tabulator-tables';



const persons = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    state: 'Ohio',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Doe',
    state: 'Iowa',
  },
  {
    id: '3',
    firstName: 'Bill',
    lastName: 'Great',
    state: 'Hawaii',
  },
  {
    id: '4',
    firstName: 'Ted',
    lastName: 'Adventure',
    state: 'Arizona',
  },
];
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent implements AfterViewInit{
  exTable: any;
  filterParam: string = '';

  tab = document.createElement('div');

  table_def = [
    { title: 'Id', field: 'id' },
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'Location', field: 'state' },
  ];
  constructor() {}

  ngOnInit() {
    this.exTable = new Tabulator(this.tab, {
      height: 130,
      layout: 'fitColumns',
      columns: this.table_def,
      movableColumns: true,
      data: persons,
    });
    document.getElementById('ex-table-div')?.appendChild(this.tab);
  
  }

  downloadReport(){
   this.exTable.download('xlsx',"data.xlsx")
  }
  
  
  ngAfterViewInit() {
    this.exTable?.setData(persons);
  }
  
}
