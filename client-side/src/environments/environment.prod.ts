import { IEnvironment } from "src/app/interface/comum";

export const environment: IEnvironment = {
  production: true,
  API_PATH: 'https://arfas-oversight.azurewebsites.net',
  storageName: "arfashubstorage",
  containerName: "profile-pics",
  containerPath: `https://arfashubstorage.blob.core.windows.net/profile-pics/`,
  connectionString: "DefaultEndpointsProtocol=https;AccountName=arfashubstorage;AccountKey=m7Sue05XnQt+orZqtpUeS0bWZRpuWDVeZAkvWK+K8hTl+lwDjZKZ8tJ6nHNFGnvUmt6sa2Bs51aV+AStkVAMTw==;EndpointSuffix=core.windows.net",
  sasContainerToken: "sp=racwdlme&st=2022-11-19T16:15:47Z&se=2023-01-02T00:15:47Z&sv=2021-06-08&sr=c&sig=nUT9pIWqslfJeC4TObQZkU1JQt%2FUHrMZIfoI%2FKrMmCc%3D",
};
