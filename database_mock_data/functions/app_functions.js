import { getRandomNumberForIndex } from './utility_functions.js';

import fs from 'fs';
import { v1 as uuidv1 } from 'uuid';
import AWS from 'aws-sdk';
import chalk from 'chalk';

import { PATHS, JSON_NAME, UTF_FORMAT } from '../standards/fileInfo.js';
const { pathMockDataRet, pathServerDataRet } = PATHS;

export const generateIdArray = (numOfIds) => {
  return new Array(numOfIds).fill(null).map((item) => uuidv1());
};

export const returnRandomBoolean = () => {
  return Math.random() > 0.5 ? false : true;
};

export const returnRandomRank = (allRanks, tier) => {
  // tier should be 1, 2, 3
  let rank = '';
  if (!tier) {
    tier = 1;
  }
  if (tier === 1) {
    rank = allRanks[getRandomNumberForIndex(0, 2)];
  } else if (tier === 2) {
    rank = allRanks[getRandomNumberForIndex(3, 5)];
  } else if (tier === 3) {
    rank = allRanks[getRandomNumberForIndex(6, 8)];
  }
  return rank;
};

export const returnUnmarshalledArray = (parsedDynamoArray, tableName) => {
  let array = [];
  for (let item = 0; item < parsedDynamoArray[tableName].length; item += 1) {
    let temp = AWS.DynamoDB.Converter.unmarshall(parsedDynamoArray[tableName][item]['PutRequest']['Item']);
    array.push(temp);
  }
  // console.log('unmarshall: ', array);
  return JSON.stringify(array);
};

export const writeAndReadJSONFiles = (arrayofObjsForDynamo, tableName) => {
  if (arrayofObjsForDynamo.length > 25) {
    let count = 1;
    let currobjectKey = `${tableName}`;
    let currentObj = {};
    currentObj[currobjectKey] = [];
    for (let i = 0; i < arrayofObjsForDynamo.length; i += 1) {
      if (i !== 0 && i % 25 === 0) {
        console.log(i);
        // read and write files
        let filenameConcat = `${currobjectKey}${count}`;
        writeAndRead(currentObj, tableName, filenameConcat);
        // iterate count
        count += 1;
        // currobjectKey = `${tableName}${count}`;
        // then we need to make a new object
        currentObj[currobjectKey] = [];
      }
      // regardless of which count/number of object we are on, push a new item into the currentObj
      let tempObj = {
        PutRequest: {
          Item: arrayofObjsForDynamo[i],
        },
      };
      currentObj[currobjectKey].push(tempObj);
    }
    let filenameConcat = `${currobjectKey}${count}`;
    writeAndRead(currentObj, tableName, filenameConcat);
  } else {
    console.log('++++++++++++++++++++++++++++++++ lessons');
    let obj = {};
    obj[tableName] = [];
    for (let i = 0; i < arrayofObjsForDynamo.length; i += 1) {
      let tempObj = {
        PutRequest: {
          Item: arrayofObjsForDynamo[i],
        },
      };

      obj[tableName].push(tempObj);
    }
    //// write
    // writeAndRead(obj, tableName);
    writeAndRead(obj, tableName, tableName);
  }
};

export const writeAndRead = (obj, tableName, filename) => {
  console.log('         ');
  console.log(chalk.black.bgBlue(` (BELOW) Obj to JSON ${filename}`));
  console.log('         ');
  // console.log(chalk.bgRed(obj[filename].length));
  let JSONObj = JSON.stringify(obj);
  console.log('         ');
  console.log(chalk.black.bgGreen(` (BELOW) Dynamo Formatted Array - JSON ${filename}: Write to <Server_React -> db_fill> `));
  console.log('         ');
  console.log(JSONObj);
  // write
  // write to server directory - server react
  fs.writeFileSync(`${pathServerDataRet}${filename}.json`, JSONObj, `${UTF_FORMAT}`);

  // read out and parse file written - plus undo the Dynamo Junk
  let returnObj = returnUnmarshalledArray(JSON.parse(fs.readFileSync(`${pathServerDataRet}${filename}.json`, `${UTF_FORMAT}`)), tableName);
  console.log('         ');
  console.log(chalk.black.bgCyan(` (BELOW) Return Array - JS ${filename}: Write to Sandbox Mock Data and Data Return inside Current Project `));
  console.log('         ');
  console.log(returnObj);

  // write to the mock data return folder
  fs.writeFileSync(`${pathMockDataRet}${filename}.json`, returnObj, `${UTF_FORMAT}`);
  // write to the data return folder inside current project folder
  // fs.writeFileSync(`${pathCurrProjDataRet}${filename}.json`, returnObj, `${UTF_FORMAT}`);
};

const shouldLog = true;

export const returnLogWithSpace = (message, array) => {
  if (shouldLog) {
    console.log('         ');
    console.log(chalk.black.bgCyan(` ${message} `));
    console.log('         ');
    console.log(array);
  }
};

export const filterArrayWithQueue = (queueArr, arrToFilter) => {
  // for every item in the queueArr, we want to mutate arrToFilter
  queueArr.forEach((itemId) => {
    const itemIndex = arrToFilter.indexOf(itemId);
    // console.log('itemIndex', itemIndex);
    if (itemIndex !== -1) {
      arrToFilter = arrToFilter.filter((userId) => userId !== itemId);
    }
  });
  return arrToFilter;
};
// be careful with this, may need to duplicate the array (like categories, because it does mutate)
export const createArrayOfANumberOfIds = (allArray, num) => {
  let temp = [];
  for (let i = 0; i < num; i += 1) {
    // need a random id - so get
    let randIndex = getRandomNumberForIndex(allArray.length - 1, 0);
    let id = allArray[randIndex];
    temp.push(id);
    allArray.splice(randIndex, 1);
    // console.log(allArray.length);
  }
  return temp;
};

export const writeFileTo = (fileName, arr) => {
  fs.writeFileSync(fileName, JSON.stringify(arr), `${UTF_FORMAT}`);
};
