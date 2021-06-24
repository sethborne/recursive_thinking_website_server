

export const makeArrayFromObjectKey = (array, key) => {
  // console.log(array);
  let tempArray = [];
  for (let i = 0; i < array.length; i += 1) {
    tempArray.push(array[i][key]);
  }
  return tempArray;
};

// getRandomIndex of Array should always accept the full array length...don't sub...
export const getRandomIndexOfArray = (arrayLength, min) => {
  // console.log(arrayLength);
  let randomIndex = getRandomNumberForIndex(arrayLength, min);
  return randomIndex;
};

export const getRandomNumberForIndex = (max, min) => {
  if (!min) {
    min = 0;
  }
  max = max - 1;
  let randomNumberIndex = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumberIndex;
};

export const getRandomNumber = (max, min) => {
  if (!min) {
    min = 0;
  }
  let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
};

export const getArrayOfValuesAtAVariableLength = (array, maxValsInArray, minValsInArray) => {};

// if you are using this - you should have already used makeArrayFromObjectKey
export const getArrayOfValuesAtAFixedLength = (array, maxValsInArray) => {
  let returnArray = [];
  for (let i = 0; i < maxValsInArray; i += 1) {
    let index = getRandomIndexOfArray(array.length);
    let tempUserId = array[index];
    returnArray.push(tempUserId);
    array = array.filter((item) => item !== tempUserId);
  }
  // console.log('ret: ', returnArray);
  return returnArray;
};



export const shiftDays = (timeShiftText, increment) => {
  let currentTime = new Date();
  let shiftedDate = new Date();
  if (timeShiftText === 'before') {
    shiftedDate.setDate(currentTime.getDate() - increment);
  } else if (timeShiftText === 'after') {
    shiftedDate.setDate(currentTime.getDate() + increment);
  } else {
    console.log('Bonk @ shiftDays Function');
  }
  return shiftedDate;
};

export const whenIsNextSaturdayNoon = (optionalDate) => {
  let referenceDay;
  // If no date is entered as an argument, function will create a current timestamp to find the next Saturday
  if (!optionalDate) {
    referenceDay = Date.now();
  }
  // First checks to see if the user submitted date argument is valid. If it isn't it will return an error message. If it is, the function will use that date to find next Saturday. The date needs to be converted to milliseconds first
  else {
    let checkBadDate = Date.parse(optionalDate);
    if (isNaN(checkBadDate) == true) {
      return 'Error, please check your date';
    }
    let dateConversion = new Date(optionalDate);
    referenceDay = dateConversion.getTime();
  }
  let millisecondsPerDay = 86400000;
  // Gets the day of the week for the entered date (user submitted or default)
  let dayOfWeek = new Date(referenceDay).getDay();
  // Takes the day of the week, adds (in milliseconds) x days to get the date of the upcoming Saturday. Can delete the day variables, I left them in to help read the getDay output (Sunday=0, Saturday=6)
  switch (dayOfWeek) {
    case 0:
      day = 'Sunday';
      upcomingSaturday = new Date(referenceDay + 6 * millisecondsPerDay);
      break;
    case 1:
      day = 'Monday';
      upcomingSaturday = new Date(referenceDay + 5 * millisecondsPerDay);
      break;
    case 2:
      day = 'Tuesday';
      upcomingSaturday = new Date(referenceDay + 4 * millisecondsPerDay);
      break;
    case 3:
      day = 'Wednesday';
      upcomingSaturday = new Date(referenceDay + 3 * millisecondsPerDay);
      break;
    case 4:
      day = 'Thursday';
      upcomingSaturday = new Date(referenceDay + 2 * millisecondsPerDay);
      break;
    case 5:
      day = 'Friday';
      upcomingSaturday = new Date(referenceDay + 1 * millisecondsPerDay);
      break;
    case 6:
      day = 'Saturday';
      // Checks to see if it is past noon already on Saturday. If so, returns the following Saturday
      if (new Date(referenceDay).getHours() === 12) {
        console.log('move day');
        upcomingSaturday = new Date(referenceDay + 7 * millisecondsPerDay);
      } else {
        console.log('do not move day');
        upcomingSaturday = new Date(referenceDay + 0 * millisecondsPerDay);
      }
  }
  // Splits the date output up for the return statement
  // console.log('upcomingSaturday', upcomingSaturday)
  // convert back to date object so can use methods
  upcomingSaturday = new Date(upcomingSaturday);
  // sets time (no matter what it is, to noon)
  // upcomingSaturday.setHours(12, 00, 00, 00);
  upcomingSaturday.setHours(12, 0o3, 0o3, 0o3);
  // console.log(typeof upcomingSaturday)

  return upcomingSaturday;
};

// module.exports = {
//   makeArrayFromObjectKey: makeArrayFromObjectKey,
//   getRandomIndexOfArray: getRandomIndexOfArray,
//   getRandomNumberForIndex: getRandomNumberForIndex,
//   getRandomNumber: getRandomNumber,
//   getArrayOfValuesAtAVariableLength: getArrayOfValuesAtAVariableLength,
//   getArrayOfValuesAtAFixedLength: getArrayOfValuesAtAFixedLength,
//   shiftDays: shiftDays,
//   whenIsNextSaturdayNoon: whenIsNextSaturdayNoon,
// };
