import { Component, OnInit } from '@angular/core';
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { Reporte } from '../../interfaces/reportes.interfaces';
import { ReportesService } from '../../services/reportes.service';
import { FormGroup, FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent implements OnInit{
  exTable: any;
  ejTable:any;
  filterParam: string = '';

  tab = document.createElement('div');
  tab2 = document.createElement('div')

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

  table_diario_def = [
    { title: 'Fecha', field: 'fecha' },
    { title: 'Codigo de Generacion de DTE', field: 'codigoGeneracionDTE'},
    { title: 'Tipo de Documento', field: 'tipoDocumento' },
    { title: 'Sello de Recibido', field: 'selloRecibido' },
    { title: 'Estado', field: 'estado' },
  ];
   
  constructor(private reportesService: ReportesService) {}
  
  public getReporte : any;
  public getReporteDiario: any;
  public customDate : string = formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
  seleccionado : string = "Seleccione una opcion";
  verSeleccion: string = ""
  
  
  form = new FormGroup({
    n: new FormControl('')
  });

  form2= new FormGroup({
    fecha: new FormControl(this.customDate)
  });

  form3= new FormGroup({
    estado: new FormControl("")
  });

  ngOnInit() {    
    this.renderReporteMensual()
    
    this.renderReporteDiario()
   
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

    const fecha = this.form2.value.fecha

    this.renderReporteDiario()

    this.exTable.setFilter("fecha", "=", fecha)
    
  }
  

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
        this.ejTable.setFilter("estado", "=", this.verSeleccion)
    } else {
        this.renderReporteDiario()
    }
  }
  
}
