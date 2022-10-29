import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { ObserversModule } from '@angular/cdk/observers';
import { PortalModule } from '@angular/cdk/portal';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
const MATERIAL_MODULES = [
MatButtonModule,
MatButtonToggleModule,
MatCardModule,
MatTableModule,
MatFormFieldModule,
MatIconModule,
MatInputModule,
MatListModule,
MatMenuModule,
MatPaginatorModule,
MatSortModule,
OverlayModule,
PortalModule,
BidiModule,
A11yModule,
MatCommonModule,
ObserversModule
];
@NgModule({
imports: MATERIAL_MODULES,
declarations: [],
exports: MATERIAL_MODULES,
})
export class MaterialModule { }