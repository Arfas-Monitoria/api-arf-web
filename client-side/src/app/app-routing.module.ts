import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ARFHomepageComponent } from './components/arf-homepage/arf-homepage.component';
import { ARFDashboardComponent } from './components/arf-dashboard/arf-dashboard.component';
import { ArfLoginComponent } from './components/arf-login/arf-login.component';
import { ArfCadastroComponent } from './components/arf-cadastro/arf-cadastro.component';

const routes: Routes = [
  { path: '', component: ARFHomepageComponent },
  { path: 'dashboard', component: ARFDashboardComponent },
  { path: 'cadastro', component: ArfCadastroComponent },
  { path: 'login', component: ArfLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
