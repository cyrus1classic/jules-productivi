import { Component, Input, inject, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { BoardService } from '../../services/board';
import { Ticket as TicketModel } from '../../models/ticket.model';
import { TicketDialog } from '../ticket-dialog/ticket-dialog';
import * as L from 'leaflet';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
  ],
  templateUrl: './ticket.html',
  styleUrl: './ticket.scss',
})
export class Ticket implements AfterViewInit, OnDestroy {
  @Input({ required: true }) ticket!: TicketModel;
  @Input({ required: true }) columnId!: string;

  boardService = inject(BoardService);
  dialog = inject(MatDialog);

  private map: L.Map | undefined;
  // Custom icon to avoid 404s
  private icon = L.divIcon({
      className: 'custom-pin',
      html: '<div style="background-color: red; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white;"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

  ngAfterViewInit(): void {
    if (this.ticket.type === 'Map') {
      this.initMap();
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    const mapId = 'map-' + this.ticket.id;
    // Check if element exists
    if (!document.getElementById(mapId)) return;

    if (this.map) {
      this.map.remove();
    }

    const center: [number, number] = this.ticket.mapData?.center
      ? [this.ticket.mapData.center.lat, this.ticket.mapData.center.lng] as [number, number]
      : [51.505, -0.09];
    const zoom = this.ticket.mapData?.zoom || 13;

    this.map = L.map(mapId, {
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      attributionControl: false
    });

    this.map.setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);

    if (this.ticket.mapData?.pin) {
      L.marker([this.ticket.mapData.pin.lat, this.ticket.mapData.pin.lng], { icon: this.icon }).addTo(this.map);
    }
  }

  editTicket() {
    const dialogRef = this.dialog.open(TicketDialog, {
      width: '400px',
      data: {
        title: this.ticket.title,
        description: this.ticket.description,
        type: this.ticket.type,
        color: this.ticket.color,
        mapData: this.ticket.mapData
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardService.updateTicket(this.columnId, this.ticket.id, result);
        // Re-init map if updated
        setTimeout(() => {
           if (this.ticket.type === 'Map') {
               this.initMap();
           } else if (this.map) {
               this.map.remove();
               this.map = undefined;
           }
        }, 100);
      }
    });
  }

  deleteTicket() {
    this.boardService.deleteTicket(this.columnId, this.ticket.id);
  }
}
