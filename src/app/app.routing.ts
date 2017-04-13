import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from "./landing/landing.component";
import { DraftingComponent } from "./drafting/drafting.component";
import { AboutComponent } from "./about/about.component";
import { HistoryComponent } from "./history/history.component";
import { DraftEndComponent } from './draft-end/draft-end.component';

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
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
      path: 'history',
      component: HistoryComponent
    },
    {
      path: 'draft/draft-end/:id',
      component: DraftEndComponent
    }


];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
