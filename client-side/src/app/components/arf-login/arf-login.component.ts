import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/API/usuarios.service';

@Component({
  selector: 'app-arf-login',
  templateUrl: './arf-login.component.html',
  styleUrls: ['./arf-login.component.scss',],
  encapsulation: ViewEncapsulation.None,
})
export class ArfLoginComponent implements OnInit {
  email: string;
  senha: string;

  constructor(
    private usuarioService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  autenticar() {

  }
}
