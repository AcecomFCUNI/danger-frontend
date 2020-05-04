export const convertDate = (str) => {
  let month = "";
  let date = str.split("-");
  switch (date[1]) {
    case "01": {
      month = "Ene";
      break;
    }
    case "02": {
      month = "Feb";
      break;
    }
    case "03": {
      month = "Mar";
      break;
    }
    case "04": {
      month = "Abr";
      break;
    }
    case "05": {
      month = "May";
      break;
    }
    case "06": {
      month = "Jun";
      break;
    }
    case "07": {
      month = "Jul";
      break;
    }
    case "08": {
      month = "Ago";
      break;
    }
    case "09": {
      month = "Set";
      break;
    }
    case "10": {
      month = "Oct";
      break;
    }
    case "11": {
      month = "Nov";
      break;
    }
    case "12": {
      month = "Dic";
      break;
    }
    default:
      break;
  }
  return `${month}-${date[2]}`;
};

export const listOfDates = (dates) => {
  return dates.map((date) => convertDate(date));
};

export const formatNumber = (number) => {
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};
