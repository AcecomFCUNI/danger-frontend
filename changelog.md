# Acecom Covid 19

## Version 1.0.0

- Initialize project.

## Version 1.1.0

- Updated:
  - Included [`puppeteer`](https://github.com/puppeteer/puppeteer) in order to scrape the [web page](https://www.worldometers.info/coronavirus/country/peru/) that reports Covid-19 cases from Peru.
  - Changed the main `post` request to a `get` one.

## Version 1.2.0

- Updated:
  - The last [web pag](https://www.worldometers.info/coronavirus/country/peru/) has been replaced for a [new one](https://app.powerbi.com/view?r=eyJrIjoiNGQ2MjA0NzktMTY2NC00NzJmLWE5NGUtODJiZTIwZmY1YzFkIiwidCI6Ijc5MDVjMWZjLTkzM2MtNDUyYS04YjgzLWIyZTU2NDU1ZDE2YSIsImMiOjR9).
  - Now, a response is sended as follows (in case of success):
    ```json
    {
      "success": true,
      "error": false,
      "message": {
        "cities": [
          {
            "name": "city_name",
            "cases": 100,
            "deaths": 20
          }
        ]
      }
    }
    ```
    In case of error:
    ```json
    {
      "success": "false",
      "error": "true",
      "message": "Error while loading the data"
    }
    ```
  - Three functions has been added in order to clean the data and send it to the frontend.
  - The command to run the server has changed from `yarn start` to `yarn service`.

## Version 1.3.0

- Updated:
  - There wasn't necessary to scrape this [page](https://app.powerbi.com/view?r=eyJrIjoiNGQ2MjA0NzktMTY2NC00NzJmLWE5NGUtODJiZTIwZmY1YzFkIiwidCI6Ijc5MDVjMWZjLTkzM2MtNDUyYS04YjgzLWIyZTU2NDU1ZDE2YSIsImMiOjR9), now the information has been gotten from this [API](https://geocatmin.ingemmet.gob.pe/arcgis/rest/services/COVIT_PERU_REGION/MapServer/0/query?f=json&where=FECHA%20BETWEEN%20timestamp%20%272020-04-05%2000%3A00%3A00%27%20AND%20timestamp%20%272020-04-05%2023%3A59%3A59%27&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=CONFIRMADOS%20desc&outSR=102100).
  - [`puppeteer`](https://github.com/puppeteer/puppeteer) is not used anymore, instead [`axios`](https://github.com/axios/axios) is used to perform a a `GET` request to the API mentioned before.
  - Finally, there was a little modification to the response, in case of success:
    ```json
    {
      "success": true,
      "error": false,
      "message": {
        "departments": [
          {
            "name": "department_name",
            "cases": 100,
            "deaths": 20
          }
        ],
        "totalData": {
          "totalCases": 174,
          "totalDiscarded": 169,
          "totalRecovered": 91,
          "totalDeaths": 7
        }
      }
    }
    ```

## Version 1.4.0

- Updated:
  - All the data from de Covid 19 in Peru was stored in the database of the project.
  - A `get` and `post` for the **`/covid/peru/`** endpoint was implemented.
    - The `post` method is used to get the data from the API and then store it to the database.
    - The `get` method is used to get date-specific data depending of date, so it must be called as **`/covid/peru/:date`**.
  - Changed location of `gitignore` file.

## Version 1.4.1

- Updated:
  - Allow request from everywhere.

## Version 2.0.0

- Added:
  - Frontend branch.
    - Created React App with [`create-react-app`](https://github.com/facebook/create-react-app).
    - [`axios`](https://github.com/axios/axios) was added in order to make [`http`](https://nodejs.org/api/http.html) requests to the backend endpoints.
    - [`material-ui`](https://github.com/mui-org/material-ui) was added in order to stylize the app components.
    - [`mapbox-gl`](https://github.com/mapbox/mapbox-gl-js) was added in order to implement a Peru map using a geojson file.
    - [`chart.js`](https://github.com/chartjs/Chart.js) was added in order to make statistic charts using Peru data that reports Covid-19 cases.

## Version 2.0.1

- Updated:
  - Minor changes.

## Version 2.0.1a

- HotFix:
  - 'Access-Control-Allow-Headers' repaired.

## Version 2.0.1b

- HotFix:
  - Date repaired.

## Version 2.1.0

- Updated:
  - Added a function that gets `currentDate`.

## Version 2.2.0

- Updated:
  - Added a spinning loader.
- Fixed:
  - Map card information repaired.

## Version 2.3.0

- Updated:
  - AppBar was customized.
  - Appbar input field shows all regions.
  - Button with the Peru icon displays total data.
  - Data per region can be displayed.
  - Cases per region are sorted in descending order.
- Fixed:
  - Map viewport for any device repaired.

## Version 2.4.0

- Updated:
  - Appbar input field already works.
  - The endpoints have been updated to post method.

## Version 2.4.0a

- Hotfix:
  - Deaths field repaired.

## Version 2.5.0

- Updated:
  - Added custom colors.
  - Added an search input field to sidebar.
  - In desktop mode the bottom drawer shows info and statistics by date of each region. In mobile mode the dropdown section does the same thing.

## Version 2.5.0a

- Hotfix:
  - Statistic charts repaired.

## Version 2.5.0b

- Hotfix:
  - Accent marks added to the regions.

## Version 2.6.0

- Updated:
  - Added bar charts for cases, deaths, recovered and discarded
  - Added Acecom favicon.

## Version 2.6.1

- Updated:
  - Source of currentDate was changed.

## Version 2.7.0

- Updated:
  - Dependencies.

## Version 2.8.0

- Updated:
  - Dependencies.
