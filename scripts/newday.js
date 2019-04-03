// Run functions when button is clicked

function newDay(cd, op) {
  
  console.log("New day");

  // Change countdown date depending on which button was pressed
  switch(op) {
    // Go to first day (2/15, 113 to go)
    case 0:
      cd = 113;
      break;
      
    // Go to previous day
    case 1:
      cd++;
      break;
      
    // Go to next day
    case 2:
      cd--;
      break;
      
    // Go to today
    default:
      var wedDate = new Date(2019, 5, 8);
      var today = new Date();
      cd = Math.ceil((wedDate - today) / 1000 / 60 / 60 / 24);
  }
  
  // Run xmlGet to reset page to new day
  xmlGet(cd);
  
  // Return the new countdown number
  return cd;
}
