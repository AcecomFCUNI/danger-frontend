import React, { useState, useEffect, useRef, useContext } from "react";
import mapboxgl from "mapbox-gl";

import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import RegionsContext from "../context/RegionsContext";

mapboxgl.accessToken = process.env.REACT_APP_TOKEN;

const useStyles = makeStyles((theme) => ({
  mapView: {
    width: "100vw",
    height: "100vh",
    zIndex: 10,
  },
  mapOverlay: {
    zIndex: 15,
    position: "fixed",
    top: 0,
    left: 0,
    marginTop: "10px",
    marginLeft: "10px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "20px",
      marginRight: "20px",
      right: 0,
      bottom: 0,
      left: "auto",
      top: "auto",
    },
  },
}));

const MapViewTablet = () => {
  const regions = useContext(RegionsContext);
  const classes = useStyles();
  const [regionProperties, setRegionProperties] = useState(null);
  const refMapContainer = useRef(null);
  const initialCenterDesktop = {
    lng: -74.9057793,
    lat: -8.8352268,
    zoom: 4.7,
    bounds: [
      [-85.3525390625, -22.43134015636061],
      [-64.8525390625, 5.484768018141262],
    ],
  };

  // get data from my data and RestAPI in one object
  const getRegionProperties = (regionName) => {
    return regions.filter((region) => region.name === regionName)[0];
  };

  const createFlatMapDesktop = (reference) => {
    const map = new mapboxgl.Map({
      container: reference.current,
      style: "mapbox://styles/mapbox/light-v10?optimize=true",
      center: [initialCenterDesktop.lng, initialCenterDesktop.lat],
      zoom: initialCenterDesktop.zoom,
      attributionControl: false,
      maxBounds: initialCenterDesktop.bounds,
      maxZoom: 11,
    });

    // map.addControl(new mapboxgl.AttributionControl(), "bottom-left");
    map.dragRotate.disable();
    map.keyboard.disable();
    map.touchZoomRotate.disableRotation();

    return map;
  };

  const loadFeaturesToMap = (reference) => {
    const map = createFlatMapDesktop(reference);
    let hoveredRegionId = null;
    map.on("load", () => {
      loadGeoJSONFile(
        map,
        "https://raw.githubusercontent.com/BryanVe/regions-peru-geojson/master/peruRegions.geojson"
      );

      loadLayersToMap(map);

      map.on("mousemove", "region-fills", (e) => {
        if (e.features.length > 0) {
          if (hoveredRegionId) {
            map.setFeatureState(
              { source: "regions", id: hoveredRegionId },
              { hover: false }
            );
          }
          hoveredRegionId = e.features[0].id;

          setRegionProperties(
            getRegionProperties(e.features[0].properties.name)
          );

          map.setFeatureState(
            { source: "regions", id: hoveredRegionId },
            { hover: true }
          );
        }
      });

      map.on("mouseleave", "region-fills", () => {
        if (hoveredRegionId) {
          map.setFeatureState(
            { source: "regions", id: hoveredRegionId },
            { hover: false }
          );
        }

        hoveredRegionId = null;
        map.getCanvas().style.cursor = "";
        setRegionProperties(null);
      });
    });
  };

  const loadGeoJSONFile = (map, urlToGeoJSON) => {
    map.addSource("regions", {
      type: "geojson",
      data: urlToGeoJSON,
    });
  };

  const loadLayersToMap = (map) => {
    // layer that fills regions
    map.addLayer({
      id: "region-fills",
      type: "fill",
      source: "regions",
      layout: {},
      paint: {
        "fill-color": "rgb(173, 173, 173)",
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          0.5,
          0.2,
        ],
      },
    });

    // layer that contains region borders
    map.addLayer({
      id: "region-borders",
      type: "line",
      source: "regions",
      layout: {},
      paint: {
        "line-color": "rgb(173, 173, 173)",
        "line-width": 2,
      },
    });
  };

  useEffect(() => {
    loadFeaturesToMap(refMapContainer);
  }, []);

  return (
    <React.Fragment>
      <div ref={refMapContainer} className={classes.mapView}>
        {regionProperties ? (
          <Card className={classes.mapOverlay}>
            <CardContent>
              <Typography
                style={{ fontWeight: "bold" }}
                variant="h6"
                className="notranslate"
              >
                {regionProperties.name}
              </Typography>
              <Typography variant="subtitle1" className="notranslate">
                Población: {String(regionProperties.totalPopulation)}
              </Typography>
              <Typography variant="subtitle1" className="notranslate">
                Casos confirmados: {String(regionProperties.totalCases)}
              </Typography>
              <Typography variant="subtitle1" className="notranslate">
                Fallecidos: {String(regionProperties.totalDeaths)}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Card className={classes.mapOverlay}>
            <CardContent>
              <Typography style={{ fontWeight: "bold" }} variant="subtitle1">
                Coloque el cursor sobre una región :)
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
    </React.Fragment>
  );
};

export default MapViewTablet;
