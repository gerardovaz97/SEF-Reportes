import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangepassComponent } from "../components/changepass/changepass.component";
import { ReportesComponent } from "../components/reportes/reportes.component";

export const rutas: Routes = [
    {
        path:'dte-reportes',
        component: ReportesComponent,
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