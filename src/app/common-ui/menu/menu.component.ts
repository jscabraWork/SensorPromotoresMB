import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { HardcodedAutheticationService } from '../../service/security/hardcoded-authetication.service';



@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})

export class MenuComponent implements OnInit {
  isCollapsed = false;
  isMobile = false;
  idPromotor: string = '';
  
  navItems: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() { 
    this.checkScreenSize();
  
    this.route.parent?.params.subscribe(params => {
      this.idPromotor = params['idPromotor'];
      
      // Configurar las rutas con el ID del promotor
      this.navItems = [
        { route: `/promotor/${this.idPromotor}/eventos`, icon: 'assets/vector/menu/eventos.png', label: 'Eventos' },
        { route: `/promotor/${this.idPromotor}/historial`, icon: 'assets/vector/menu/history.svg', label: 'Historial' },
        { route: `/promotor/${this.idPromotor}/perfil`, icon: 'assets/vector/menu/user.svg', label: 'Perfil' },
        { route: '/logout', icon: 'assets/vector/menu/logout.svg', label: 'Cerrar Sesión', isLogout: true }
      ];
    });

  }


  @HostListener('window:resize') onResize() { this.checkScreenSize(); }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) this.isCollapsed = true;
  }

  toggleSidebar() { this.isCollapsed = !this.isCollapsed; }
  closeSidebar() { if (this.isMobile) this.isCollapsed = true; }
}
