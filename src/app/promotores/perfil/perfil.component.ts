import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/security/auth.service';
import { PromotoresDataService } from '../../service/data/promotores-data.service';
import { Usuario } from '../../models/usuario.model';
import { Promotor } from '../../models/promotor.model';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  
  usuario:any;
  promotor: Promotor = new Promotor();
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private promotoresDataService: PromotoresDataService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
  }


}
