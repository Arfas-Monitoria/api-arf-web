import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ARFHomepageComponent } from './components/arf-homepage/arf-homepage.component';
import { ArfOversightPageComponent } from './components/arf-oversight-page/arf-oversight-page.component';

const routes: Routes = [
  { path: '', component: ARFHomepageComponent },
  { path: 'oversight', component: ArfOversightPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
