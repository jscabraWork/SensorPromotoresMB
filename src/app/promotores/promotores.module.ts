import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { promotoresRoutes } from './promotores.routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(promotoresRoutes)
  ]
})
export class PromotoresModule { }
