import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ARFHomepageComponent } from './components/arf-homepage/arf-homepage.component';
import { ARFDashboardComponent } from './components/arf-dashboard/arf-dashboard.component';

const routes: Routes = [
  { path: '', component: ARFHomepageComponent },
  { path: 'dashboard', component: ARFDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
