import { Component, Inject, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TicketType } from '../../models/ticket.model';
import * as L from 'leaflet';

export interface TicketDialogData {
  title: string;
  description: string;
  type: TicketType;
  color: string;
  mapData?: {
    center: { lat: number; lng: number };
    zoom: number;
    pin?: { lat: number; lng: number };
  };
}

@Component({
  selector: 'app-ticket-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
  ],
  templateUrl: './ticket-dialog.html',
  styleUrl: './ticket-dialog.scss',
})
export class TicketDialog implements AfterViewInit, OnDestroy {
  ticketTypes: TicketType[] = ['User Story', 'Bug', 'Change', 'Gap', 'Technical', 'Map'];
  private map: L.Map | undefined;
  private marker: L.Marker | undefined;
  // Custom icon to avoid 404s
  private icon = L.divIcon({
      className: 'custom-pin',
      html: '<div style="background-color: red; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

  constructor(
    public dialogRef: MatDialogRef<TicketDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TicketDialogData,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (this.data.type === 'Map') {
      this.initMap();
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  onTypeChange(newType: TicketType) {
    if (newType === 'Map') {
      // Allow the view to update and render the map container
      setTimeout(() => {
        this.initMap();
      }, 0);
    } else {
       if (this.map) {
          this.map.remove();
          this.map = undefined;
       }
    }
  }

  private initMap(): void {
    if (this.map) {
      this.map.remove();
    }

    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    const defaultCenter: [number, number] = [51.505, -0.09];
    const center = this.data.mapData?.center
      ? [this.data.mapData.center.lat, this.data.mapData.center.lng] as [number, number]
      : defaultCenter;
    const zoom = this.data.mapData?.zoom || 13;

    this.map = L.map('map').setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    if (this.data.mapData?.pin) {
      this.marker = L.marker([this.data.mapData.pin.lat, this.data.mapData.pin.lng], { icon: this.icon }).addTo(this.map);
    }

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      if (!this.map) return;
      if (this.marker) {
        this.marker.remove();
      }
      this.marker = L.marker(e.latlng, { icon: this.icon }).addTo(this.map);
    });
  }

  save(): void {
    if (this.data.type === 'Map' && this.map) {
      const center = this.map.getCenter();
      const zoom = this.map.getZoom();
      const pin = this.marker ? this.marker.getLatLng() : undefined;

      this.data.mapData = {
        center: { lat: center.lat, lng: center.lng },
        zoom: zoom,
        pin: pin ? { lat: pin.lat, lng: pin.lng } : undefined
      };
    }
    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
