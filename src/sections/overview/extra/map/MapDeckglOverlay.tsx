import MapGL from 'react-map-gl';
import { useState } from 'react';
import DeckGL from '@deck.gl/react';
// components
import {
  MapControlScale,
  MapControlGeolocate,
  MapControlNavigation,
  MapControlFullscreen,
} from '../../../../components/map';
import { ArcLayer, RGBAColor } from 'deck.gl';

// ----------------------------------------------------------------------

export default function MapDeckglOverlay({ ...other }) {
  const [viewport, setViewport] = useState({
    longitude: -122.45,
    latitude: 37.78,
    zoom: 11,
    bearing: 0,
    pitch: 30,
  });

  return (
    <>
      <MapGL {...viewport} onViewportChange={setViewport} maxPitch={85} {...other}>
        <MapControlScale />
        <MapControlNavigation />
        <MapControlFullscreen />
        <MapControlGeolocate />

        <DeckGL
          viewState={viewport}
          layers={[
            new ArcLayer({
              data: [
                {
                  sourcePosition: [-122.41669, 37.7853],
                  targetPosition: [-122.45669, 37.781],
                },
              ],
              strokeWidth: 4,
              getSourceColor: () => [0, 0, 255] as RGBAColor,
              getTargetColor: () => [0, 255, 0] as RGBAColor,
            }),
          ]}
        />
      </MapGL>
    </>
  );
}
