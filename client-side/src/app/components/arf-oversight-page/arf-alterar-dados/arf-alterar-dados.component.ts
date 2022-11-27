import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/services/API/usuarios.service';
import { azureBlobStorageService } from 'src/app/services/azureBlobStorage.service';

@Component({
  selector: 'app-arf-alterar-dados',
  templateUrl: './arf-alterar-dados.component.html',
  styleUrls: ['./arf-alterar-dados.component.scss']
})
export class ArfAlterarDadosComponent implements OnInit {
  error: string = '';
  password: string;
  confirmPassword: string;
  tel: string;
  id: string = sessionStorage.getItem('idUsuario')
  atualTel: string = sessionStorage.getItem('telefone')
  fadedOut = false;
  @ViewChild('imgRef') in_img: ElementRef;

  constructor(public blobService: azureBlobStorageService, private usuario: UsuariosService) { }

  ngOnInit() {
  }

  alterarDados() {
    this.usuario.alterarDados({
      idFuncionario: this.id,
      senha: this.password,
      telefone: this.tel
    }).subscribe({
      next: (response) => {

        this.enviarImage()
      }
    })
  }

  async enviarImage() {
    this.blobService.uploadImage(this.in_img).then(async (imgId) => {
      // pega o id do funcionario
      const idFuncionario = sessionStorage.getItem('idUsuario');

      // Pega o imgId antigo do funcionario
      const imgIdAntigo = sessionStorage.getItem('profileImgPath');

      // atualiza o imgId do funcionario
      await this.usuario.putProfileImgId(imgId, Number(idFuncionario))

      // deleta o imgId antigo do funcionario
      if (await this.blobService.imageExists(imgIdAntigo)) {
        this.blobService.deleteImage(imgIdAntigo)
      }

      // atualiza na tela a nova imagem do funcionario
      sessionStorage.setItem('profileImgPath', imgId);
    })
  }
}


