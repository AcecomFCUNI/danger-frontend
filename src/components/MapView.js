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
  },
  mapOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    marginTop: "10px",
    marginLeft: "10px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "73px",
      marginLeft: "0",
      marginRight: "10px",
      right: 0,
      left: "auto",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "65px",
      marginLeft: "0",
      marginRight: "10px",
      right: 0,
      left: "auto",
    },
  },
}));

export default function MapView() {
  const regions = useContext(RegionsContext);
  const classes = useStyles();

  const refMapContainer = useRef(null);
  const [regionProperties, setRegionProperties] = useState(null);
  const initialCenter = {
    lng: -74.9057793,
    lat: -8.8352268,
    zoom: 4.3,
  };

  // get data from my data and RestAPI in one object
  const getRegionProperties = (regionName) => {
    return regions.filter((region) => region.name === regionName)[0];
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: refMapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [initialCenter.lng, initialCenter.lat],
      zoom: initialCenter.zoom,
      attributionControl: false,
      maxZoom: 7.5,
      minZoom: 4.3,
    });
    map.addControl(
      new mapboxgl.AttributionControl({
        compact: true,
      })
    );
    // map.scrollZoom.disable();
    // map.dragPan.disable();
    map.touchZoomRotate.disable();
    map.dragRotate.disable();
    map.touchZoomRotate.disable();
    map.keyboard.disable();
    map.doubleClickZoom.disable();

    let hoveredRegionId = null;

    map.on("load", function () {
      map.addSource("regions", {
        type: "geojson",
        data:
          "https://raw.githubusercontent.com/BryanVe/regions-peru-geojson/master/peruRegions.geojson",
      });

      // The feature-state dependent fill-opacity expression will render the hover effect
      // when a feature's hover state is set to true.
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

      map.on("mousemove", "region-fills", function (e) {
        map.getCanvas().style.cursor = "pointer";

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

      map.on("mouseleave", "region-fills", function () {
        if (hoveredRegionId) {
          map.setFeatureState(
            { source: "regions", id: hoveredRegionId },
            { hover: false }
          );
        }

        hoveredRegionId = null;
        setRegionProperties(null);
        map.getCanvas().style.cursor = "";
      });
    });
  }, []);

  return (
    <div ref={refMapContainer} className={classes.mapView}>
      <Card className={classes.mapOverlay}>
        {regionProperties ? (
          <CardContent>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              {regionProperties.name}
            </Typography>
            <Typography>Población: {regionProperties.population}</Typography>
            <Typography>Casos confirmados: {regionProperties.cases}</Typography>
            <Typography>Fallecidos: {regionProperties.deaths}</Typography>
          </CardContent>
        ) : (
          <CardContent>
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              Coloque el cursor sobre una región :)
            </Typography>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
