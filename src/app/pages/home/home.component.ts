import { Component, inject, signal, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { AuthService } from "../../core/services/auth.service"
import { Router } from "@angular/router"
import { TabsComponent } from "../../shared/components/tabs/tabs.component";
import { SummaryComponent } from "../../shared/components/summary/summary.component"
import { User } from "../../core/interfaces/user.interface"

@Component({
  selector: "app-home",
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  imports: [CommonModule, TabsComponent, SummaryComponent],
})

export class HomeComponent implements OnInit {
  private authService = inject(AuthService)
  private router = inject(Router)

  currentUser = signal<User | null>(null)

  ngOnInit() {
    this.currentUser.set(this.authService.getUserData())
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
