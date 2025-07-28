import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { ActiviesEntriesService } from './services/activies-entries.service';
import { TabStateService } from './services/tab-state.service';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    ActiviesEntriesService,
    TabStateService,
    AuthGuard,
    PublicGuard
  ],
  exports: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
