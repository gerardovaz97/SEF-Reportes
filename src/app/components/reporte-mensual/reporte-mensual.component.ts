import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {TabulatorFull as Tabulator} from 'tabulator-tables';

import { ReportesService } from '../../services/reportes.service';
import { CreedentialsService } from '../../services/creedentials.service';


@Component({
  selector: 'app-reporte-mensual',
  templateUrl: './reporte-mensual.component.html',
  styleUrl: './reporte-mensual.component.scss'
})
export class ReporteMensualComponent implements OnInit{
  
  exTable: any;

  public getReporte : any;
  form = new FormGroup({
    n: new FormControl('')
  });
  
  tab = document.createElement('div');
  
  constructor(private reportesService: ReportesService, private creedentialService: CreedentialsService) {} 

  table_def = [
    { title: 'Fecha', field: 'fecha', width: 95 },
    { title: 'Corte', field: 'corte', width: 95 },
    { title: 'Clase de Documento', field: 'claseDocumento', width:170 },
    { title: 'Tipo de Documento', field: 'tipoDocumento', width:170 },
    { title: 'Codigo de Generacion de DTE', field: 'codigoGeneracionDTE', width: 280 },
    { title: 'Sello de Recibido', field: 'selloRecibido', width: 320 },
    { title: 'Numero de Control', field: 'numeroControl', width: 240 },
    { title: 'NIT', field: 'NIT', width:120},
    { title: 'Nombre del Cliente', field: 'nombreCliente',width: 255 },
    { title: 'Ventas Exentas', field: 'ventasExentas', width:135 },
    { title: 'Ventas no Sujetas', field: 'ventasNoSujetas',width: 150 },
    { title: 'Ventas Gravadas Locales', field: 'ventasGravadasLocales', width: 195 },
    { title: 'Debito Fiscal IVA 1%', field: 'debitoFiscalIva' },
    { title: 'Ventas a Cuentas De Terceros no Domiciliados', field: 'ventasACuentaDeTercerosNoDomiciliados' },
    { title: 'Debito por Ventas a Cuentas de Terceros no Domiciliados', field: 'debitoPorVentasACuentasDeTercerosNoDomiciliados' },
    { title: 'Total de Ventas', field: 'totalVentas' },
    { title: 'IVA Percibido', field: 'IVAPercibido' },
    { title: 'Numero de Anexo', field: 'numeroDeAnexo' },
    { title: 'Numero de Registro', field: 'numeroDeRegistro' },
    { title: 'Usuario', field: 'usuario' },
    { title: 'Estado', field: 'estado' },

 
  ];

  ngOnInit(): void {
    this.renderReporteMensual();
    this.creedentialService.TokenValid();
  };

  renderReporteMensual(){
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
    });
  }

  downloadReport(){
   this.exTable.download('xlsx',"data.xlsx")
  }

  downloadSelectedReport() {   

    this.exTable.setFilter("fecha", "=", "fecha")
    
  }

}
