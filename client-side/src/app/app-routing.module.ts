import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArfCadastroComponent } from './components/arf-cadastro/arf-cadastro.component'
import { ARFHomepageComponent } from './components/arf-homepage/arf-homepage.component';
import { ArfLoginComponent } from './components/arf-login/arf-login.component';
import { ArfOversightPageComponent } from './components/arf-oversight-page/arf-oversight-page.component';

const routes: Routes = [
  { path: '', component: ARFHomepageComponent },
  { path: 'oversight', component: ArfOversightPageComponent },
  { path: 'login', component: ArfLoginComponent },
  { path: 'cadastro', component: ArfCadastroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
