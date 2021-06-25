import fs from 'fs';
import AWS from 'aws-sdk';
import chalk from 'chalk';

import { getRandomIndexOfArray, getRandomNumber, shiftDays, whenIsNextSaturdayNoon } from './functions/utility_functions.js';
import { generateIdArray, writeFileTo } from './functions/app_functions.js';

import { PATHS, JSON_NAME, UTF_FORMAT } from './standards/fileInfo.js';
const { pathMockDataRet, pathServerDataRet } = PATHS;
import { DICTIONARY_MODEL } from './standards/dictionaryModel.js';

// dm
const {
  user: { id, avatar, name, title },
} = DICTIONARY_MODEL;

import { writeAndReadJSONFiles, returnLogWithSpace } from './functions/app_functions.js';

const allCurrentIdsForUsers = JSON.parse(fs.readFileSync(`${pathMockDataRet}${JSON_NAME.idsUsers}`, `${UTF_FORMAT}`));
// returnLogWithSpace('All Current Ids For Users', allCurrentIdsForUsers);

const allUsers = JSON.parse(fs.readFileSync(`${pathMockDataRet}${JSON_NAME.users}`, `${UTF_FORMAT}`));
// // returnLogWithSpace('All Current Users', allUsers);

// 10 ids
try {
  const allCurrentIdsForHomeScreenQuotes = JSON.parse(fs.readFileSync(`${pathMockDataRet}${JSON_NAME.idsHomeScreenQuotes}`, `${UTF_FORMAT}`));
} catch (error) {
  console.error('Error Loading Ids for: HSQ', error);
  const currNumOfIds = 10;
  const makeIdsForHSQ = generateIdArray(currNumOfIds);
  const fileName = JSON_NAME.idsHomeScreenQuotes;
  writeFileTo(`${pathMockDataRet}${fileName}`, makeIdsForHSQ);
}

const allCurrentIdsForHomeScreenQuotes = JSON.parse(fs.readFileSync(`${pathMockDataRet}${JSON_NAME.idsHomeScreenQuotes}`, `${UTF_FORMAT}`));

// have all users and userIds

// these are the properties we'll need to append to the object
// ['id', '9cdd7120-8ed0-11e8-b260-d5e4455e16bd'],
// ['avatar', `avatar2.png`],
// ['name', 'Kevin Norwood Bacon'],
// ['title', 'Dancer'],

const allHomeScreenQuotesArray = [
  {
    id: allCurrentIdsForHomeScreenQuotes[0],
    avatar: allUsers[0][avatar],
    name: allUsers[0][name],
    title: allUsers[0][title],
    isInQuotes: true,
    isInCarousel: false,
    quote:
      'Bacon ipsum dolor amet porchetta bacon shank, tri-tip pancetta ground round sausage t-bone. Venison bacon short ribs pastrami. Porchetta jerky doner frankfurter beef ribs. Spare ribs tail cupim t-bone kevin ribeye alcatra shankle bacon meatball bresaola.',
    createdAt: new Date('2018-06-14T12:00:00Z').toString(),
    updatedAt: new Date('2018-07-14T12:00:00Z').toString(),
    _createdByUser: allUsers[0][id],
  },
  {
    id: allCurrentIdsForHomeScreenQuotes[1],
    // id: allUsers[1],
    avatar: allUsers[1][avatar],
    name: allUsers[1][name],
    title: allUsers[1][title],
    isInQuotes: true,
    isInCarousel: false,
    quote:
      'My left donut is missing, as is my right run outside as soon as door open for eat and than sleep on your face and then cats take over the world. Drool i could on this if i had the energy instead of drinking water from the cat bowl, make sure to steal water from the toilet yet cough hairball on conveniently placed pants so attack feet. What a cat-trophy!',
    createdAt: new Date('2018-06-16T12:00:00Z').toString(),
    updatedAt: new Date('2018-07-16T12:00:00Z').toString(),
    _createdByUser: allUsers[1][id],
  },
  {
    id: allCurrentIdsForHomeScreenQuotes[2],
    // id: allUsers[4],
    avatar: allUsers[4][avatar],
    name: allUsers[4][name],
    title: allUsers[4][title],
    isInQuotes: true,
    isInCarousel: false,
    quote:
      "You could sit here for weeks with your one hair brush trying to do that - or you could do it with one stroke with an almighty brush. Now let's put some happy little clouds in here. You're meant to have fun in life. Maybe there was an old trapper that lived out here and maybe one day he went to check his beaver traps, and maybe he fell into the river and drowned.",
    createdAt: new Date('2018-06-18T12:00:00Z').toString(),
    updatedAt: new Date('2018-07-18T12:00:00Z').toString(),
    _createdByUser: allUsers[4][id],
  },
  {
    id: allCurrentIdsForHomeScreenQuotes[3],
    // id: allUsers[7],
    avatar: allUsers[7][avatar],
    name: allUsers[7][name],
    title: allUsers[7][title],
    isInQuotes: false,
    isInCarousel: true,
    quote:
      "Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to. Trysail Sail ho Corsair red ensign hulk smartly boom jib rum gangway. Case shot Shiver me timbers gangplank crack Jennys tea cup ballast Blimey lee snow crow's nest rutters. Fluke jib scourge of the seven seas boatswain schooner gaff booty Jack Tar transom spirits.",
    createdAt: new Date('2018-06-20T12:00:00Z').toString(),
    updatedAt: new Date('2018-07-20T12:00:00Z').toString(),
    _createdByUser: allUsers[7][id],
  },
  {
    id: allCurrentIdsForHomeScreenQuotes[4],
    // id: allUsers[9],
    avatar: allUsers[9][avatar],
    name: allUsers[9][name],
    title: allUsers[9][title],
    isInQuotes: false,
    isInCarousel: true,
    quote:
      "Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.",
    createdAt: new Date('2018-06-22T12:00:00Z').toString(),
    updatedAt: new Date('2018-07-22T12:00:00Z').toString(),
    _createdByUser: allUsers[9][id],
  },
  {
    id: allCurrentIdsForHomeScreenQuotes[5],
    // id: allUsers[11],
    avatar: allUsers[11][avatar],
    name: allUsers[11][name],
    title: allUsers[11][title],
    isInQuotes: false,
    isInCarousel: true,
    quote:
      "I think you've let your personal feelings cloud your judgement. Why don't we just give everybody a promotion and call it a night - 'Commander'? Yesterday I did not know how to eat gagh. Sure. You'd be surprised how far a hug goes with Geordi, or Worf. Your shields were failing, sir. About four years. I got tired of hearing how young I looked. Besides, you look good in a dress.",
    createdAt: new Date('2018-06-24T12:00:00Z').toString(),
    updatedAt: new Date('2018-07-24T12:00:00Z').toString(),
    _createdByUser: allUsers[11][id],
  },
  {
    id: allCurrentIdsForHomeScreenQuotes[6],
    // id: allUsers[13],
    avatar: allUsers[13][avatar],
    name: allUsers[13][name],
    title: allUsers[13][title],
    isInQuotes: false,
    isInCarousel: true,
    quote:
      "We're both adults. I can't pretend I don't know that person is you. I want there to be no confusion. I know I owe you my life. And more than that, I respect the strategy. In your position, I would have done the same. One issue, which troubles me, I don't know what happens when our three-month contract ends. You know why I do this. I want security for my family.",
    createdAt: new Date('2018-06-26T12:00:00Z').toString(),
    updatedAt: new Date('2018-07-26T12:00:00Z').toString(),
    _createdByUser: allUsers[13][id],
  },
  {
    id: allCurrentIdsForHomeScreenQuotes[7],
    // id: allUsers[15],
    avatar: allUsers[15][avatar],
    name: allUsers[15][name],
    title: allUsers[15][title],
    isInQuotes: false,
    isInCarousel: true,
    quote:
      'Hodor, hodor... Hodor hodor hodor. Hodor hodor hodor? Hodor! Hodor; hodor hodor hodor hodor? Hodor hodor hodor? Hodor! Hodor hodor. HODOR! Hodor, hodor hodor, hodor? Hodor! Hodor hodor, hodor hodor hodor? Hodor! HODOR!',
    createdAt: new Date('2018-06-28T12:00:00Z').toString(),
    updatedAt: new Date('2018-07-28T12:00:00Z').toString(),
    _createdByUser: allUsers[15][id],
  },
  {
    id: allCurrentIdsForHomeScreenQuotes[8],
    // id: allUsers[16],
    avatar: allUsers[16][avatar],
    name: allUsers[16][name],
    title: allUsers[16][title],
    isInQuotes: false,
    isInCarousel: true,
    quote:
      "We found out you used to be a dog-faced boy. I scream, you scream, we all scream for nonfat Tofutti rice dreamsicles. You ever seen a UFO in these parts? Scully, you're not going to believe this. Something Weird. A UFO Party. I have a life. I saw Elvis in a potato chip once. Whatever tape you found in that VCR, it isn't mine.",
    createdAt: new Date('2018-06-30T12:00:00Z').toString(),
    updatedAt: new Date('2018-07-30T12:00:00Z').toString(),
    _createdByUser: allUsers[16][id],
  },
  {
    id: allCurrentIdsForHomeScreenQuotes[9],
    // id: allUsers[19],
    avatar: allUsers[19][avatar],
    name: allUsers[19][name],
    title: allUsers[19][title],
    isInQuotes: false,
    isInCarousel: false,
    quote:
      "When Chuck Norris does a pushup, he isn't lifting himself up, he's pushing the Earth down, Contrary to popular belief, America is not a democracy, it is a Chucktatorship The chief export of Chuck Norris is Pain Chuck Norris doesn't read books. He stares them down until he gets the information he wants.",
    createdAt: new Date('2018-07-02T12:00:00Z').toString(),
    updatedAt: new Date('2018-08-02T12:00:00Z').toString(),
    _createdByUser: allUsers[19][id],
  },
];

if (allCurrentIdsForHomeScreenQuotes.length < allHomeScreenQuotesArray.length) {
  // console.log(allCurrentIdsForRanks.length, allRanksArray.length);
  console.error(
    chalk.bgRed(
      ' ERROR: ',
      'Length of Id Array does not Match DataStructure - Please fix: ',
      '#ids: ',
      allCurrentIdsForLessons.length,
      '|| DS: ',
      allLessonsArray.length
    )
  );
  // return;
} else {
  // console.log('allHomeScreenQuotes', allHomeScreenQuotesArray);
  // no cross reference, so can just save out.
}

returnLogWithSpace('All HSQ Arr - JS', allHomeScreenQuotesArray);
const formatForDynamo = allHomeScreenQuotesArray.map((obj) => AWS.DynamoDB.Converter.marshall(obj));
returnLogWithSpace('All HSQ Arr - Dynamo', formatForDynamo);

const fileName = JSON_NAME.homeScreenQuotes.split('.')[0];
writeAndReadJSONFiles(formatForDynamo, fileName);
