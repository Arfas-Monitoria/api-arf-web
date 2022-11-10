import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardCommums {
  intervalTime = 4 * 1000;

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

  componentsColors = ['#16A085', '#E67E22', '#8E44AD']

  KPIs: { title: string, label: string }[] = [
    {
      title: 'CPUs com má performance',
      label: ''
    },
    {
      title: 'RAMs com má performance',
      label: ''
    },
    {
      title: 'HDDs com má performance',
      label: ''
    },
  ]
}
