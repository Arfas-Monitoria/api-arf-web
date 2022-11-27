import { environment } from 'src/environments/environment';
import { ElementRef, Injectable } from '@angular/core';
import {
  BlobServiceClient,
  ContainerClient,
} from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class azureBlobStorageService {
  // Enter your storage account name
  storageName = environment.storageName;
  // container name
  containerName = environment.containerName;
  // container token
  sas = environment.sasContainerToken || '';

  private containerClient(): ContainerClient {
    return new BlobServiceClient(`https://${this.storageName}.blob.core.windows.net?${this.sas}`)
      .getContainerClient(this.containerName);
  }

  private async uploadBlob(content: Blob, name: string) {
    let blockBlobClient = this.containerClient().getBlockBlobClient(name);
    await blockBlobClient.uploadData(content, { blobHTTPHeaders: { blobContentType: content.type } })
      .then(() => {
        console.log('Imagem enviada com sucesso!')
      })
  }

  private async deleteBlob(name: string) {
    this.containerClient().deleteBlob(name).then(() => {
      console.log('Imagem antiga deletada com sucesso!')
    })
  }

  private async listBlobs(): Promise<string[]> {
    let result: string[] = []

    let blobs = this.containerClient().listBlobsFlat();

    for await (const blob of blobs) {
      result.push(blob.name)
    }

    return result;
  }

  public async uploadImage(in_img: ElementRef): Promise<string> {
    const content = in_img.nativeElement.files[0];
    const uniqueId = uuidv4()

    await this.uploadBlob(content, uniqueId)

    return uniqueId;
  }

  public deleteImage(name: string) {
    this.deleteBlob(name)
  }

  public async imageExists(name: string): Promise<boolean> {
    return (await this.listBlobs()).includes(name)
  }
}
