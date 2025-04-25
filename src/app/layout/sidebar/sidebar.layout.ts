import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ImageModule } from 'primeng/image';
import { StyleClass } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { Menu, MenuModule } from 'primeng/menu';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { Event, NavigationEnd, Router, RouterEvent, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'sidebar-layout',
  templateUrl: 'sidebar.layout.html',
  styleUrls: ['sidebar.layout.css'],
  imports: [DrawerModule, CommonModule, ImageModule, DividerModule, Menu, MenuModule, RouterModule, ButtonModule ]
})

export class SidebarLayout implements OnInit {
  logoDrawer: string = "API TEST";
  items: MenuItem[] | undefined;
  baseImageUrl: string = '/images/app/';
  currentMenu: string | null | undefined = null;;
  isHovering: string = "";

  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.initializeMenuItems();

    this.router.events.pipe(
      filter((event: RouterEvent | Event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((event: NavigationEnd) => {
      console.log("event:", event.urlAfterRedirects);
      this.updateCurrentMenuFromRoute(event.urlAfterRedirects);
    })
  }

  initializeMenuItems(): void {
    this.items = [
      {
        label: 'Secure Data',
        items: [
            { id: '1', label: 'Basic', image: this.baseImageUrl + "shield.png", route: '/basic', command: (e) => this.onMenuChange(e) },
            { id: '2', label: 'หมอพร้อม', image: this.baseImageUrl + "mohpromt.png", route: '/mohpromt', command: (e) => this.onMenuChange(e) },
            { id: '3', label: 'หมอ กทม.', image: this.baseImageUrl + "bma.png", route: '/bma', command: (e) => this.onMenuChange(e) },
            { id: '4', label: 'Police Plus', image: this.baseImageUrl + "police.png", route: '/police', command: (e) => this.onMenuChange(e) },
            { id: '5', label: 'Chula', image: this.baseImageUrl + "chula.png", route: '/chula', command: (e) => this.onMenuChange(e) },
            { id: '6', label: 'HCIS', image: this.baseImageUrl + "hcis.png", route: '/hcis', command: (e) => this.onMenuChange(e) },
            { id: '7', label: 'Station Meet', image: this.baseImageUrl + "stationmeet.png", route: '/stationmeet', command: (e) => this.onMenuChange(e) },
            { id: '8', label: 'CBH', image: this.baseImageUrl + "cbh.png", route: '/cbh', command: (e) => this.onMenuChange(e) },
            { id: '9', label: 'CUH', image: this.baseImageUrl + "cuhplus.png", route: '/cuhplus', command: (e) => this.onMenuChange(e) },
            { id: '10', label: 'TUH 4 All', image: this.baseImageUrl + "tuh4all.png", route: '/tuh4all', command: (e) => this.onMenuChange(e) },
            { id: '11', label: 'BMA Station', image: this.baseImageUrl + "bma.png", route: '/bma_station', command: (e) => this.onMenuChange(e) },
        ]
      }
    ];
  }

  onMenuChange(event: MenuItemCommandEvent) {
    if (event.item) {
      this.currentMenu = event.item.id;
    }
  }

  mouseHovering(id: string) {
    this.isHovering = id;
  }
  
  mouseLeaving() {
    this.isHovering = "";
  }

  toHome() {
    this.currentMenu = null;
    this.router.navigate(['']);
  }

  updateCurrentMenuFromRoute(url: string): void {
    let foundMenuId: string | null = null;

    if (this.items && this.items.length > 0 && this.items[0].items) {
      const menuItems = this.items[0].items;
      const matchedItem = menuItems.find(item => item && item['route'] === url);

      if (matchedItem && matchedItem.id) {
        foundMenuId = matchedItem.id;
      }
    }

    if (this.currentMenu !== foundMenuId) {
      this.currentMenu = foundMenuId;
    }
  }
}
