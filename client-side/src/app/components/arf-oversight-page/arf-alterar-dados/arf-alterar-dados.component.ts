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
  pass: string = '';
  password: string;
  confirmPassword: string;
  abrirModal = false;
  isLoading = false;
  tel: string;
  id: string = sessionStorage.getItem('idUsuario')
  atualTel: string = sessionStorage.getItem('telefone')
  fadedOut = false;
  @ViewChild('imgRef') in_img: ElementRef;

  constructor(public blobService: azureBlobStorageService, private usuario: UsuariosService) { }

  ngOnInit() {
  }

  alterarDados() {

    this.error = '';
    this.pass = '';
    if (this.password != undefined && this.confirmPassword != undefined && this.tel != undefined) {
      if (this.tel.length == 11 || this.tel.length == 0) {
        if (this.password == this.confirmPassword) {
          this.isLoading = true

          this.usuario.alterarDados({
            idFuncionario: this.id,
            senha: this.password,
            telefone: this.tel
          }).subscribe({
            next: async response => {
              await this.enviarImage()
              this.isLoading = false;
              this.abrirModal = true
            },
            error: (error) => {
              this.error = 'Erro ao alterar os dados!'
            }
          })
        } else {
          this.error = 'As senhas precisam ser identicas!'
        }
      } else {
        this.error = 'O Telefone está incorreto!'
      }
    } else {
      this.error = 'Preencha todos os campos!'
    }
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
