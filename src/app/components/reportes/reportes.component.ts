import { Component, OnInit } from '@angular/core';
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { Reporte } from '../../interfaces/reportes.interfaces';
import { ReportesService } from '../../services/reportes.service';
import { FormGroup, FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CreedentialsService } from '../../services/creedentials.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent implements OnInit{
  exTable: any;

  ejTable:any;

  filterParam: string = '';

  public getReporte : any;
  
  public getReporteDiario: any;
  
  public customDate : string = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  
  seleccionado : string = "Seleccione una opcion";
  
  verSeleccion: string = ""
  
  estadoList : string[] = ['Seleccione una opcion' , 'PROCESADO' , 'RECHAZADO', 'INVALIDADO', 'PENDIENTE']

  form2= new FormGroup({
    fecha: new FormControl(this.customDate)
  });
  
  form3= new FormGroup({
    estado: new FormControl("")
  });
  
  tab2 = document.createElement('div')

  table_diario_def = [
    { title: 'Fecha', field: 'identificacion.fecEmi' },
    { title: 'Codigo de Generacion de DTE', field: 'codigoGeneracion'},
    { title: 'Tipo de Documento', field: 'identificacion.tipoDte' },
    { title: 'Sello de Recibido', field: 'responseMH.selloRecibido' },
    { title: 'Estado', field: 'responseMH.estado' },
  ];
   
  constructor(private reportesService: ReportesService, private creedentialService: CreedentialsService) {}  
  

  ngOnInit() {    

    this.renderReporteDiario()
    this.creedentialService.TokenValid();
   
  }

  downloadSelectedReport() {   
    this.renderReporteDiario()
    
  }
  
  renderReporteDiario(){
    let fecha = this.form2.value
    this.reportesService.getReporteDiarioTableData(fecha).subscribe(
      reporte => {
        this.getReporte = reporte;        

        this.ejTable = new Tabulator(this.tab2, {
          height: 400,
          layout: 'fitColumns',
          columns: this.table_diario_def,
          movableColumns: true,
          pagination:true,
          paginationMode: "local",
          paginationSize:100,
          paginationSizeSelector:[100, 250, 400, 500],
          paginationCounter:"rows",
          selectableRows: true,
          data: this.getReporte,
        });

        console.log(this.getReporte);
        

        document.getElementById('ex-table-diario-div')?.appendChild(this.tab2);
      } 
    )
  }

  sleccionado(){
    this.verSeleccion = this.seleccionado

    if(this.verSeleccion != "Seleccione una opcion" ){
        this.ejTable.setFilter("responseMH.estado", "=", this.verSeleccion)
    } else {
        this.renderReporteDiario()
    }
  }
  
}
