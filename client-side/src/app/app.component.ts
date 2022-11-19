import { environment } from 'src/environments/environment';
import { UsuariosService } from './services/API/usuarios.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { azureBlobStorageService } from './services/azureBlobStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // @ViewChild('imgRef') in_img: ElementRef;
  // profileImg: string;

  // constructor(public blobService: azureBlobStorageService, private userService: UsuariosService) { }

  // enviarImage() {
  //   this.blobService.uploadImage(this.in_img).then(async (imgId) => {
  //     // pega o id do funcionario
  //     const idFuncionario = 1;

  //     // Pega o imgId antigo do funcionario
  //     const imgIdAntigo = '0b535a04-84fc-4f5c-b597-7bf34f4758a1';

  //     // atualiza o imgId do funcionario
  //     await this.userService.putProfileImgId(imgId, idFuncionario)

  //     // deleta o imgId antigo do funcionario
  //     this.blobService.deleteImage(imgIdAntigo, () => console.log('imagem antiga deletada'))

  //     // atualiza na tela a nova imagem do funcionario
  //     this.profileImg = environment.containerPath + imgId;
  //   })
  // }
}
