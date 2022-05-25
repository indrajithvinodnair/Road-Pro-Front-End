import react from 'react';

// function to get current date


 export  function GetCurrentDate() {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}${"/"}${month}${"/"}${year}`;
  }

  