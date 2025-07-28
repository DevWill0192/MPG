// tabs.component.ts
import { Component, Input, TemplateRef, ContentChild, AfterContentInit, Output, EventEmitter, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabStateService } from '../../../core/services/tab-state.service';
import { MyTemplateContext } from '../../../core/interfaces/user.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements AfterContentInit {
  @Input() tabs: string[] = [];
  @Output() activeTabChange = new EventEmitter<number>();
  activeTab = 0;

  @ContentChild('tabContent', { static: true }) tabContentTpl!: TemplateRef<MyTemplateContext>;

tabStateService = inject(TabStateService);


  ngAfterContentInit() {
    console.log('TabContent template:', this.tabContentTpl);
  }

  setActiveTab(index: number) {
    this.activeTab = index;
    this.activeTabChange.emit(index);
    this.tabStateService.setActiveTab(index);
  }
}
