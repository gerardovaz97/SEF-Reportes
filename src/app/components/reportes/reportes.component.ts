import { AfterViewInit, Component, OnInit } from '@angular/core';
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { Reporte } from '../../interfaces/reportes.interfaces';
import { ReportesService } from '../../services/reportes.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent implements OnInit{
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
  
  form = new FormGroup({
    n: new FormControl('')
  })

  ngOnInit() {  

    this.reportesService.getReportesTableData().subscribe(
      reporte => {
        this.getReporte = reporte;
  

        this.exTable = new Tabulator(this.tab, {
          height: 400,
          layout: 'fitColumns',
          columns: this.table_def,
          movableColumns: true,
          pagination:true,
          paginationMode: "local",
          paginationSize:100,
          paginationSizeSelector:[100, 250, 400, 500],
          paginationCounter:"rows",
          selectableRows: true,
          data: this.getReporte,
        });
        document.getElementById('ex-table-div')?.appendChild(this.tab);
      } 
    );
  }

  onSubmit(){
    const n = this.form.value;
    this.reportesService.postData(n).subscribe(response => {
      console.log('respuesta de la api:', response);
    });
  }

  downloadReport(){
   this.exTable.download('xlsx',"data.xlsx")
  }

  downloadSelectedReport() {
    
    
  }
  
  
}
