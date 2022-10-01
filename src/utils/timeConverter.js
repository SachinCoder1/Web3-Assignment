export const timeConverter = (date) => {
    var a = new Date(date);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
  //   year = year.slice(0,2);
    var month = months[a.getMonth()];
    var date = a.getDate() < 10 ? "0" + a.getDate() : a.getDate();
    var time = date + " " + month;
    // console.log("Time of ", UNIX_timestamp, "is ", time);
    return time;
  };