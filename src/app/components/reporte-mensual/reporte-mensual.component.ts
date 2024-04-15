import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  
  tipoDteList : string[] = ['Seleccione una opcion', 'Factura' , 'Comprobante Credito Fiscal']

  estadoList : string[] = ['Seleccione una opcion' , 'PROCESADO' , 'RECHAZADO', 'INVALIDADO', 'PENDIENTE']

  exTable: any;

  public getReporte : any;
  form = new FormGroup({
    n: new FormControl(''),
    fecha: new FormControl(''),
    estado: new FormControl(''),
    tipoDte: new FormControl('')
  });
  
  tab = document.createElement('div');
  
  constructor(private reportesService: ReportesService, private creedentialService: CreedentialsService) {} 

  table_def = [
    { title: 'Fecha', field: 'identificacion.fecEmi', width: 95 },
    { title: 'Corte', field: 'corte', width: 95 },
    { title: 'Clase de Documento', field: 'claseDocumento', width:170 },
    { title: 'Tipo de Documento', field: 'identificacion.tipoDte', width:170 },
    { title: 'Codigo de Generacion de DTE', field: 'codigoGeneracion', width: 280 },
    { title: 'Sello de Recibido', field: 'responseMH.selloRecibido', width: 320 },
    { title: 'Numero de Control', field: 'identificacion.numeroControl', width: 240 },
    { title: 'NIT', field: 'emisor.nit', width:120},
    { title: 'Nombre del Cliente', field: 'receptor.nombre',width: 255 },
    { title: 'Ventas Exentas', field: 'resumen.totalExenta', width:135 },
    { title: 'Ventas no Sujetas', field: 'resumen.totalNoSuj',width: 150 },
    { title: 'Ventas Gravadas Locales', field: 'resumen.totalGravada', width: 195 },
    { title: 'Debito Fiscal IVA 1%', field: 'resumen.ivaRete1' },
    { title: 'Ventas a Cuentas De Terceros no Domiciliados', field: 'ventasACuentaDeTercerosNoDomiciliados' },
    { title: 'Debito por Ventas a Cuentas de Terceros no Domiciliados', field: 'debitoPorVentasACuentasDeTercerosNoDomiciliados' },
    { title: 'Total de Ventas', field: 'resumen.totalPagar' },
    { title: 'IVA Percibido', field: 'resumen.totalIva' },
    { title: 'Numero de Anexo', field: 'numeroDeAnexo' },
    { title: 'Numero de Registro', field: 'numeroDeRegistro' },
    { title: 'Usuario', field: 'emisor.nombre' },
    { title: 'Estado', field: 'responseMH.estado' },
  ];

  ngOnInit(): void {
    this.renderReporteMensual();
  };


  renderReporteMensual(){
    this.reportesService.getReportesTableData().subscribe(
      reporte => {
        this.getReporte = reporte;
        
        if(this.getReporte.msg){
          //!IMPLEMENTAR BIEN EL MODAL LUEGO
          this.creedentialService.LogoutUser(this.getReporte.msg);
          return;
        }

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
    this.reportesService.postData(this.form.value).subscribe(response => {
    });
  }

  downloadReport(){
   this.exTable.download('xlsx',"data.xlsx")
  }

  downloadSelectedReport() {   

    this.exTable.setFilter("fecha", "=", "fecha")
    
  }

}
