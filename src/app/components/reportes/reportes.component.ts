import { Component, OnInit } from '@angular/core';
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
    { title: 'Fecha', field: 'fecha' },
    { title: 'Corte', field: 'corte' },
    { title: 'Clase de Documento', field: 'claseDocumento' },
    { title: 'Tipo de Documento', field: 'tipoDocumento' },
    { title: 'Codigo de Generacion de DTE', field: 'codigoGeneracionDTE' },
    { title: 'Sello de Recibido', field: 'selloRecibido' },
    { title: 'Numero de Control', field: 'numeroControl' },
    { title: 'NIT', field: 'NIT' },
    { title: 'Nombre del Cliente', field: 'nombreCliente' },
    { title: 'Ventas Exentas', field: 'ventasExentas' },
    { title: 'Ventas no Sujetas', field: 'ventasNoSujetas' },
    { title: 'Ventas Gravadas Locales', field: 'ventasGravadasLocales' },
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
    console.log(this.getReporte);
    
  }
  
  
}
