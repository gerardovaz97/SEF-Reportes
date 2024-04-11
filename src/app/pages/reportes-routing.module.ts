import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangepassComponent } from "../components/changepass/changepass.component";
import { ReportesComponent } from "../components/reportes/reportes.component";
import { ReporteMensualComponent} from "../components/reporte-mensual/reporte-mensual.component";

export const rutas: Routes = [
    {
        path: '',
        component:ReportesComponent
    },
    {
        path:'reportes-diarios',
        component: ReportesComponent,
    },
    {
        path: 'reportes-mensuales',
        component: ReporteMensualComponent,
    },
    {
        path: 'changepass',
        component: ChangepassComponent,
    }
]
@NgModule({
    imports: [RouterModule.forChild(rutas)],
    exports: [RouterModule]
})
export class SEFReportesRoutingModule {}