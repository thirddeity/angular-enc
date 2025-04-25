import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { SidebarLayout } from "./sidebar/sidebar.layout";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, ButtonModule, SidebarLayout, RouterOutlet],
  templateUrl: './app.layout.html',
})

export class AppLayout {
  constructor() {}
}