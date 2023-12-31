class DateFormatter{

  formatDateIntoHumanReadableFormat(timestamp){
    if(!timestamp)
      return

    const date = new Date(timestamp)
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : `0${month}`;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : `0${day}`;

    let minutes = date.getMinutes().toString();
    minutes = minutes.length > 1 ? minutes : `0${minutes}`;


    return `${day}/${month}/${year} ${date.getHours()}:${minutes}`;
  }
}

const dateFormatter = new DateFormatter()

export default dateFormatter
