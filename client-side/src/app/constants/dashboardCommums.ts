import { Injectable } from '@angular/core';
import { IDepartamento, IUserData } from 'src/app/interface/comum';

@Injectable({
  providedIn: 'root'
})
export class DashboardCommums {
  intervalTime = 1 * 1000;

  colors: string[] = [
    "#16a0ff",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857"]

  departamentos: IDepartamento[] = [
    {
      nome: 'Infraestrutura',
      checked: false,
    },
    {
      nome: 'Consultoria',
      checked: false,
    },
    {
      nome: 'Comercial',
      checked: false,
    },
    {
      nome: 'Recepção',
      checked: false,
    },
    {
      nome: 'Call Center',
      checked: false,
    },
    {
      nome: 'T.I.',
      checked: false,
    },
  ]

  usersData: { usuario: string, departamento: string }[] = [
    {
      usuario: 'Ricardo Alberto',
      departamento: 'Infraestrutura'
    },
    {
      usuario: 'Luiz Henrique',
      departamento: 'Infraestrutura'
    },
    {
      usuario: 'Lucia Ferreira',
      departamento: 'Infraestrutura'
    },
    {
      usuario: 'Déssia Lima',
      departamento: 'Consultoria'
    },
    {
      usuario: 'Lucas Augusto',
      departamento: 'Consultoria'
    },
    {
      usuario: 'Letícia da Silva',
      departamento: 'Consultoria'
    },
    {
      usuario: 'Caique Carvalho',
      departamento: 'T.I'
    },
    {
      usuario: 'Heloisa Brito',
      departamento: 'T.I'
    },
    {
      usuario: 'Vinicius Roman',
      departamento: 'T.I'
    },
    {
      usuario: 'Gabriel Martins',
      departamento: 'T.I'
    },
    {
      usuario: 'Felipe Queiroz',
      departamento: 'T.I'
    },
    {
      usuario: 'icaro Menezes',
      departamento: 'T.I'
    },
    {
      usuario: 'Ricardo Alberto',
      departamento: 'Comercial'
    },
    {
      usuario: 'Joao Menezes',
      departamento: 'Comercial'
    },
    {
      usuario: 'Rita Sung',
      departamento: 'Comercial'
    },
    {
      usuario: 'Bruno Lee',
      departamento: 'Call Center'
    },
    {
      usuario: 'Julia Freitas',
      departamento: 'Call Center'
    },
  ]
}
