"use client";

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { PasswordModal } from './password-modal';
import { toast } from '@/components/ui/use-toast';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Marker {
  id: string;
  lat: number;
  lng: number;
}

interface AddMarkerToClickProps {
  onMarkerAdd: (lat: number, lng: number) => void;
}

function AddMarkerToClick({ onMarkerAdd }: AddMarkerToClickProps) {
  useMapEvents({
    click(e) {
      onMarkerAdd(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}

export default function MyLeafletMap() {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [tempMarkerPosition, setTempMarkerPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    async function fetchMarkers() {
      try {
        const response = await fetch('/api/markers');
        if (!response.ok) throw new Error('Failed to fetch markers');
        const data = await response.json();
        setMarkers(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load markers",
          variant: "destructive",
        });
      }
    }
    fetchMarkers();
  }, []);

  const handleMarkerAdd = (lat: number, lng: number) => {
    setTempMarkerPosition([lat, lng]);
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = async (password: string) => {
    if (!tempMarkerPosition) return;

    try {
      const response = await fetch('/api/markers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: tempMarkerPosition[0],
          lng: tempMarkerPosition[1],
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid password');
      }

      const newMarker = await response.json();
      setMarkers([...markers, newMarker]);
      toast({
        title: "Success",
        description: "Marker added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive",
      });
    } finally {
      setShowPasswordModal(false);
      setTempMarkerPosition(null);
    }
  };

  return (
    <>
      <MapContainer
        center={[20, 0]}
        zoom={1}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
          />
        ))}
        <AddMarkerToClick onMarkerAdd={handleMarkerAdd} />
      </MapContainer>

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setTempMarkerPosition(null);
        }}
        onSubmit={handlePasswordSubmit}
      />
    </>
  );
}