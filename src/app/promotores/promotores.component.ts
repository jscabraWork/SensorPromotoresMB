import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../common-ui/menu/menu.component';

@Component({
  selector: 'app-promotores',
  standalone: true,
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './promotores.component.html',
  styleUrl: './promotores.component.scss'
})
export class PromotoresComponent {

}