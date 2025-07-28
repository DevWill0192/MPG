import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabStateService {
  private activeTabSubject = new BehaviorSubject<number>(0);
  public activeTab$ = this.activeTabSubject.asObservable();

  setActiveTab(index: number) {
    this.activeTabSubject.next(index);
  }

  getActiveTab(): number {
    return this.activeTabSubject.value;
  }
}
