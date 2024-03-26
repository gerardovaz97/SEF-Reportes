import { AfterViewInit, Component } from '@angular/core';
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { Reporte } from '../../interfaces/reportes.interfaces';
import { ReportesService } from '../../services/reportes.service';


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
  
  public getReporte : any;

  ngOnInit() {

    this.reportesService.getReportesTableData().subscribe(
      reporte => {
        this.getReporte = reporte;
  
        console.log(reporte);
        
        this.exTable?.setData(reporte);

        this.exTable = new Tabulator(this.tab, {
          height: 400,
          layout: 'fitColumns',
          columns: this.table_def,
          movableColumns: true,
          data: this.getReporte,
        });
        document.getElementById('ex-table-div')?.appendChild(this.tab);
      } 
    );
  }

  downloadReport(){
   this.exTable.download('xlsx',"data.xlsx")
  }

  ngAfterViewInit() {
    console.log(this.getReporte); 
  }
}
