import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
const routes : Routes = [
  {
    path : "",
    component : MainComponent,

    children : [
      {
        path : '',
        loadChildren : 'src/app/pages/home/home.module#HomeModule'
      },
      {
        path : 'pool',
        loadChildren : 'src/app/pages/pool/pool.module#PoolModule'
      },
      {
        path : 'swap',
        loadChildren : 'src/app/pages/swap/swap.module#SwapModule'
      },
      {
        path : 'earning',
        loadChildren : 'src/app/pages/earning/earning.module#EarningModule'
      },
      {
        path : 'nft',
        loadChildren : 'src/app/pages/nft/nft.module#NftModule'
      },
      {
        path : 'nftdetails',
        loadChildren : 'src/app/pages/nftdetails/nftdetails.module#NftdetailsModule'
      },
      {
        path : 'artists',
        loadChildren : 'src/app/pages/artists/artists.module#ArtistsModule'
      },
      {
        path : 'artdetails',
        loadChildren : 'src/app/pages/artdetails/artdetails.module#ArtdetailsModule'
      },
      {
        path : 'gamification',
        loadChildren : 'src/app/pages/gamification/gamification.module#GamificationModule'
      },
      {
        path : 'launchpad',
        loadChildren : 'src/app/pages/launchpad/launchpad.module#LaunchpadModule'
      },
      {
        path : 'launchpaddetails',
        loadChildren : 'src/app/pages/launchpaddetails/launchpaddetails.module#LaunchpaddetailsModule'
      },
    ]
  }
]
@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeaderModule,
    FooterModule
  ]
})
export class PagesModule { }
