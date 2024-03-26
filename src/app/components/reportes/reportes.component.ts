import { AfterViewInit, Component } from '@angular/core';
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { Reporte } from '../../interfaces/reportes.interfaces';
import { ReportesService } from '../../services/reportes.service';

const personas = 
[
  {
    fistName: "",
    lastName: "",
    state: "",
    id: 0
  },
  {
    fistName: "",
    lastName: "",
    state: "",
    id: 1
  }
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
  constructor(private reportesService: ReportesService) {}

  public getReporte: Reporte[] = [
      {
      fistName: "",
      lastName: "",
      state: "",
      id: 0
    }
  ];

  ngOnInit() {
    this.reportesService.getReportesTableData().subscribe(
      reporte => {
        this.getReporte = reporte;
        console.log(this.getReporte);
      }
    );

    this.exTable = new Tabulator(this.tab, {
      height: 130,
      layout: 'fitColumns',
      columns: this.table_def,
      movableColumns: true,
      data: personas,
    });
    document.getElementById('ex-table-div')?.appendChild(this.tab);
  
  }

  downloadReport(){
   this.exTable.download('xlsx',"data.xlsx")
  }
  
  
  ngAfterViewInit() {
    this.exTable?.setData(personas);
  }
  
}
