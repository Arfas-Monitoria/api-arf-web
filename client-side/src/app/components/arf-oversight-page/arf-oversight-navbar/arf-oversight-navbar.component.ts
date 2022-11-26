import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'arf-oversight-navbar',
  templateUrl: './arf-oversight-navbar.component.html',
  styleUrls: ['./arf-oversight-navbar.component.scss']
})
export class ArfOversightNavbarComponent implements OnInit {
  username: string;
  imgPath: string;
  pagina: string;

  constructor() { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('nomeFuncionario').split(' ').slice(0, 2).join(' ');
    this.imgPath = environment.containerPath + sessionStorage.getItem('profileImgPath')
    this.pagina = sessionStorage.getItem('pagina')

    if (sessionStorage.getItem('profileImgPath') == 'null') {
      this.imgPath = 'assets/imagens/user.jpg'
    }
  }

  limparStorage() {
    sessionStorage.clear();
  }

}
