import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from "./landing/landing.component";
import { DraftingComponent } from "./drafting/drafting.component";

const appRoutes: Routes = [
    {
        path: '',
        component: LandingComponent
    },
    {
      path: 'test',
      component: HomeComponent
    },
    {
      path: 'draft/:id',
      component: DraftingComponent
    }


];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
