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

  private async uploadBlob(content: Blob, name: string, client: ContainerClient) {
    let blockBlobClient = client.getBlockBlobClient(name);
    await blockBlobClient.uploadData(content, { blobHTTPHeaders: { blobContentType: content.type } })
  }

  private deleteBlob(name: string, client: ContainerClient, handler: () => void) {
    client.deleteBlob(name).then(() => {
      handler()
    })
  }

  public async uploadImage(in_img: ElementRef): Promise<string> {
    const content = in_img.nativeElement.files[0];
    const uniqueId = uuidv4()

    await this.uploadBlob(content, uniqueId, this.containerClient())

    return uniqueId;
  }

  public deleteImage(name: string, handler: () => void) {
    this.deleteBlob(name, this.containerClient(), handler)
  }
}
