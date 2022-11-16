
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';




@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        DemoMaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [

    ]
})
export class TablesModule { }
