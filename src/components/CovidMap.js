import React from 'react';
import {
  MapContainer as LeafletMap,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';
import './map.css';
function CovidMap({center, zoom}) {
  console.log (center);
  console.log (zoom);
  return (
    <div className="map">

      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="	https://{s}.tile.openstreetmap.org/${z}/${x}/${y}.png"
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={[center.lat, center.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

      </LeafletMap>

    </div>
  );
}

export default CovidMap;
