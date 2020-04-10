import React, { useState, useEffect, useRef, useContext } from "react";
import mapboxgl from "mapbox-gl";

import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import RegionsContext from "../context/RegionsContext";

mapboxgl.accessToken = process.env.REACT_APP_TOKEN;

const useStyles = makeStyles((theme) => ({
  test: {
    backgroundColor: "white",
    position: "fixed",
    zIndex: "3",
    left: "0",
    top: "0",
    marginLeft: "20px",
    marginTop: "20px",
  },
  mapView: {
    width: "100vw",
    height: "100vh",
  },
  mapOverlay: {
    position: "fixed",
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
  // const isMobile = false;
  const regions = useContext(RegionsContext);
  const classes = useStyles();
  const [regionProperties, setRegionProperties] = useState(null);
  const refMapContainer = useRef(null);

  const initialCenterDesktop = {
    lng: -74.9057793,
    lat: -8.8352268,
    zoom: 4.3,
    bounds: [
      [-87.0556640625, -22.43134015636061],
      [-56.33789062499999, 5.441022303717974],
    ],
  };

  // const initialCenterMobile = {
  //   lng: -74.9057793,
  //   lat: -8.8352268,
  //   zoom: 4.3,
  //   bounds: [
  //     [-87.0556640625, -22.43134015636061],
  //     [-56.33789062499999, 5.441022303717974],
  //   ],
  // };

  // get data from my data and RestAPI in one object
  const getRegionProperties = (regionName) => {
    return regions.filter((region) => region.name === regionName)[0];
  };

  const createFlatMapDesktop = (reference) => {
    const map = new mapboxgl.Map({
      container: reference.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [initialCenterDesktop.lng, initialCenterDesktop.lat],
      zoom: initialCenterDesktop.zoom,
      attributionControl: false,
      maxBounds: initialCenterDesktop.bounds,
    });

    // map.addControl(new mapboxgl.AttributionControl(), "bottom-left");
    map.dragRotate.disable();
    map.keyboard.disable();
    map.touchZoomRotate.disableRotation();

    return map;
  };

  // const createFlatMapMobile = (reference) => {
  //   const map = new mapboxgl.Map({
  //     container: reference.current,
  //     style: "mapbox://styles/mapbox/light-v10",
  //     center: [initialCenterMobile.lng, initialCenterMobile.lat],
  //     zoom: initialCenterMobile.zoom,
  //     attributionControl: false,
  //   });

  //   // map.addControl(new mapboxgl.AttributionControl(), "bottom-left");
  //   map.dragRotate.disable();
  //   map.keyboard.disable();
  //   map.touchZoomRotate.disableRotation();

  //   return map;
  // };

  const loadFeaturesToMap = (reference) => {
    // let map;
    // if (isMobile) {
    //   map = createFlatMapMobile(reference);
    // } else {
    //   map = createFlatMapDesktop(reference);
    // }
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
                Población: {String(regionProperties.population)}
              </Typography>
              <Typography variant="subtitle1" className="notranslate">
                Casos confirmados: {String(regionProperties.cases)}
              </Typography>
              <Typography variant="subtitle1" className="notranslate">
                Fallecidos: {String(regionProperties.deaths)}
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
}
