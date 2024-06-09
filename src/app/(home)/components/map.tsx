"use client";

import { useCallback, useEffect, useMemo, useState } from 'react'
// @ts-ignore
import { ControlledLayerProps, MapContainer, Rectangle, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { useEventHandlers } from '@react-leaflet/core'
import { Evented, Layer, LayerGroup, LeafletMouseEventHandlerFn, Map, Control } from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';

let DefaultIcon = L.icon({
  iconUrl: '/marker-icon.png',
});

L.Marker.prototype.options.icon = DefaultIcon;

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

const BOUNDS_STYLE = { weight: 1 }

interface MinimapBoundsProps {
  zoom: number;
  parentMap: Map;
}

const SearchControl = (props: any) => {
  const map = useMap();

  useEffect(() => {
    // @ts-ignore
    const searchControl = new GeoSearchControl({
      provider: props.provider,
      ...props,
    });

    map.addControl(searchControl);
    return () => { map.removeControl(searchControl) }
  }, [props]);

  return null;
};

function MinimapBounds({ parentMap, zoom }: MinimapBoundsProps) {
  const minimap = useMap()

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e: LeafletMouseEventHandlerFn['arguments']) => {
      parentMap.setView(e.latlng, parentMap.getZoom())
    },
    [parentMap],
  )
  useMapEvent('click', onClick)

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds())
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds())
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom)
  }, [minimap, parentMap, zoom])

  // Listen to events on the parent map
  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [])
  // @ts-ignore
  useEventHandlers({ instance: parentMap }, handlers)

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
}

interface MinimapControlProps {
  position: keyof typeof POSITION_CLASSES;
  zoom: number;
}

function MinimapControl({ position, zoom }: MinimapControlProps) {
  const parentMap = useMap()
  const mapZoom = zoom || 0

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    [],
  )

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  )
}

export default function LeafletMap() {
  const [isMounted, setIsMounted] = useState(false);
  const prov = new OpenStreetMapProvider();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && <MapContainer center={[51.505, -0.09]} zoom={6} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SearchControl
        provider={prov}
        showMarker={true}
        showPopup={true}
        // @ts-ignore
        popupFormat={({ query, result }) => result.label}
        maxMarkers={3}
        retainZoomLevel={false}
        animateZoom={true}
        autoClose={false}
        searchLabel={"Enter address, please"}
        keepResult={true}
      />
    </MapContainer>
  )
}