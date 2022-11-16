import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ThirdLevelComponent } from './third-level/third-level.component';
import { MultiRoutes } from './multi-dd.routing';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(MultiRoutes)
  ],
  declarations: [ThirdLevelComponent]
})
export class MultiModule { }
