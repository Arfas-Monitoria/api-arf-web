import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { azureBlobStorageService } from 'src/app/services/azureBlobStorage.service';

@Component({
  selector: 'arf-oversight-navbar',
  templateUrl: './arf-oversight-navbar.component.html',
  styleUrls: ['./arf-oversight-navbar.component.scss']
})
export class ArfOversightNavbarComponent implements OnInit {
  username: string;
  imgPath: string;
  pagina: string;
  abrirModal = false;
  rotaAtual: string

  constructor(private blobService: azureBlobStorageService, private route: Router) { }

  async ngOnInit() {
    this.username = sessionStorage.getItem('nomeFuncionario').split(' ').slice(0, 2).join(' ');
    this.pagina = sessionStorage.getItem('pagina')
    const imgId = sessionStorage.getItem('profileImgPath') || null;

    if (await this.blobService.imageExists(imgId)) {
      this.imgPath = environment.containerPath + sessionStorage.getItem('profileImgPath')
    } else {
      this.imgPath = 'assets/imagens/user.jpg'
    }

    this.rotaAtual = this.route.url.split('/')[2]

    this.route.events.subscribe(data => {
      if (data instanceof NavigationEnd) {
        console.log(data)
        this.rotaAtual = data.url.split('/')[2]
      }
    })
  }

  sair() {
    this.route.navigate(['/'])
    sessionStorage.clear();
  }

}
