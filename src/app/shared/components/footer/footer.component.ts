import { Component, EventEmitter, Output, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabStateService } from '../../../core/services/tab-state.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, CommonModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit, OnDestroy {
  private tabStateService = inject(TabStateService);

  @Output() activeTabChange = new EventEmitter<number>();

  // Propiedad para detectar qué tab está activo
  activeTabIndex = 0;
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    // Suscribirse a los cambios del tab activo
    this.subscription.add(
      this.tabStateService.activeTab$.subscribe(index => {
        this.activeTabIndex = index;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onTabChange(index: number) {
    this.activeTabIndex = index;
    this.activeTabChange.emit(index);
  }
}
