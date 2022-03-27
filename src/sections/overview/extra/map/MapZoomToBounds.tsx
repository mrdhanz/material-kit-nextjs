import bbox from '@turf/bbox';
import { useState } from 'react';
import MapGL, { LinearInterpolator, MapEvent, WebMercatorViewport } from 'react-map-gl';
// _mock_
import MAP_STYLE from '../../../../_mock/map/map-style-basic-v8.json';
// components
import {
  MapControlScale,
  MapControlGeolocate,
  MapControlNavigation,
  MapControlFullscreen,
} from '../../../../components/map';
import { WebMercatorViewportOptions } from '@math.gl/web-mercator/src/web-mercator-viewport';

// ----------------------------------------------------------------------
interface MAPSTYLEProps {
  [key: string]: any;
}
let mapStyle: MAPSTYLEProps = {
  ...MAP_STYLE,
  sources: { ...MAP_STYLE.sources },
  layers: MAP_STYLE.layers.slice(),
};

mapStyle.sources['sf-neighborhoods'] = {
  type: 'geojson',
  data: 'https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/feature-example-sf.json',
};

mapStyle.layers.push(
  {
    id: 'sf-neighborhoods-fill',
    source: 'sf-neighborhoods',
    type: 'fill',
    paint: {
      'fill-outline-color': '#0040c8',
      'fill-color': '#fff',
      'fill-opacity': 0,
    },
  },
  {
    id: 'sf-neighborhoods-outline',
    source: 'sf-neighborhoods',
    type: 'line',
    paint: {
      'line-width': 2,
      'line-color': '#0080ef',
    },
  }
);

// ----------------------------------------------------------------------

export default function MapZoomToBounds({ ...other }) {
  const [viewport, setViewport] = useState<WebMercatorViewportOptions>({
    latitude: 37.78,
    longitude: -122.4,
    zoom: 11,
    bearing: 0,
    pitch: 0,
    height: 250,
    width: 250,
  } as WebMercatorViewportOptions);

  const onClick = (event: MapEvent) => {
    const feature = event.features?.[0];
    if (feature) {
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);
      const viewports = new WebMercatorViewport(viewport);
      const { longitude, latitude, zoom } = viewports.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 40 }
      );
      setViewport({
        longitude,
        latitude,
        zoom,
        height: viewport.height,
        width: viewport.width,
        position: [event.lngLat[0], event.lngLat[1]],
      });
    }
  };

  return (
    <>
      <MapGL
        {...viewport}
        mapStyle={mapStyle}
        onViewportChange={setViewport}
        onClick={onClick}
        interactiveLayerIds={['sf-neighborhoods-fill']}
        {...other}
      >
        <MapControlScale />
        <MapControlNavigation />
        <MapControlFullscreen />
        <MapControlGeolocate />
      </MapGL>
    </>
  );
}
