import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportesPageComponent } from "../pages/reportes-page/reportes-page.component";

const routes: Routes = [
    {
        path:'dte-reportes',
        component: ReportesPageComponent,
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SEFReportesRoutingModule {}