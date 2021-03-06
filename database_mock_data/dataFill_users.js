import fs from 'fs';
import AWS from 'aws-sdk';
import chalk from 'chalk';

import { getRandomIndexOfArray, getRandomNumber, makeArrayFromObjectKey, shiftDays } from './functions/utility_functions.js';
import { diffArrays } from './functions/array_functions.js';
import { generateIdArray, writeFileTo } from './functions/app_functions.js';

import { PATHS, JSON_NAME, UTF_FORMAT } from './standards/fileInfo.js';
import { DICTIONARY_MODEL, dV, tempObjKeys } from './standards/dictionaryModel.js';
const { pathMockDataRet, pathServerDataRet } = PATHS;
const {
  intQuestion,
  intQuestionAnswer,
  skill: { id, name, _usersWithSkill, _interviewquestionsWithCategory, _createdByUser, createdAt, updatedAt },
} = DICTIONARY_MODEL;
import {
  returnRandomRank,
  returnRandomBoolean,
  writeAndReadJSONFiles,
  returnLogWithSpace,
  filterArrayWithQueue,
  createArrayOfANumberOfIds,
} from './functions/app_functions.js';

let allCurrentIdsForLessons = JSON.parse(fs.readFileSync(`${pathMockDataRet}${JSON_NAME.idsLessons}`, `${UTF_FORMAT}`));
returnLogWithSpace('All Current Ids For Lessons', allCurrentIdsForLessons);

let allCurrentIdsForSkills = JSON.parse(fs.readFileSync(`${pathMockDataRet}${JSON_NAME.idsSkills}`, `${UTF_FORMAT}`));
returnLogWithSpace('All Current Ids For Skills', allCurrentIdsForSkills);

let allSkills1 = JSON.parse(fs.readFileSync(`${pathMockDataRet}${JSON_NAME.skills1}`, `${UTF_FORMAT}`));
let allSkills2 = JSON.parse(fs.readFileSync(`${pathMockDataRet}${JSON_NAME.skills2}`, `${UTF_FORMAT}`));

let allSkills = [...allSkills1, ...allSkills2];
returnLogWithSpace('All Current Skills', allSkills);

let allLessons = JSON.parse(fs.readFileSync(`${pathMockDataRet}${JSON_NAME.lessons}`, `${UTF_FORMAT}`));
returnLogWithSpace('All Lessons', allLessons);

let allInterviewQuestions = JSON.parse(fs.readFileSync(`${pathMockDataRet}${JSON_NAME.interviewQuestions}`, `${UTF_FORMAT}`));
returnLogWithSpace('All Interview Questions', allInterviewQuestions);

let allInterviewQuestionAnswers = JSON.parse(fs.readFileSync(`${pathMockDataRet}${JSON_NAME.interviewQuestionAnswers}`, `${UTF_FORMAT}`));
returnLogWithSpace('All Interview Question Answers', allInterviewQuestionAnswers);

let allCurrentIdsForRanks = JSON.parse(fs.readFileSync(`${pathMockDataRet}${JSON_NAME.idsRanks}`, `${UTF_FORMAT}`));
returnLogWithSpace('All Current Ids For Ranks', allCurrentIdsForRanks);

let allRanks = JSON.parse(fs.readFileSync(`${pathMockDataRet}${JSON_NAME.ranks}`, `${UTF_FORMAT}`));
returnLogWithSpace('All Current Ranks', allRanks);

try {
  const allCurrentIdsForUsers = JSON.parse(fs.readFileSync(`${pathMockDataRet}${JSON_NAME.idsUsers}`, `${UTF_FORMAT}`));
  returnLogWithSpace('All Current Ids For Users', allCurrentIdsForUsers);
} catch (error) {
  console.error('Error Loading Ids for: User', error);
  const currNumOfIds = 21;
  const makeIdsForUsers = generateIdArray(currNumOfIds);
  const fileName = JSON_NAME.idsUsers;
  writeFileTo(`${pathMockDataRet}${fileName}`, makeIdsForUsers);
}
const allCurrentIdsForUsers = JSON.parse(fs.readFileSync(`${pathMockDataRet}${JSON_NAME.idsUsers}`, `${UTF_FORMAT}`));
returnLogWithSpace('All Current Ids For Users', allCurrentIdsForUsers);

// console.log('ranks: ', returnRandomRank(allCurrentIdsForRanks, getRandomNumber(1, 3)));

// 1 yr -  365
// 2 yr -  760
// 3 yr - 1095
// 4 yr - 1460
// 5 yr - 1825
// image path setup for either front end
// old FE
// let picturePrefixPath = `../images/`;
// sandbox FE
// let picturePrefixPath = `../`

const allUsersArray = [
  // Should not show on either Lessons or Upcoming Lessons
  {
    // Kevin Bacon - 1
    id: allCurrentIdsForUsers[0],
    username: 'onlySixPeopleAway',
    avatar: `avatar2.png`,
    name: 'Kevin Norwood Bacon',
    email: 'onlySixPeopleAway@gmail.com',
    city: 'Philadelphia',
    state: 'PA',
    title: 'Dancer',
    employer: 'Bacon Bros, Inc.',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'http://www.baconbros.com',
    linkResume: dV.eS,
    bio: 'Bacon ipsum dolor amet doner brisket jowl ground round bacon burgdoggen. Prosciutto short loin sirloin, filet mignon meatball capicola picanha rump pork belly ground round t-bone buffalo sausage swine. Ham hock jowl leberkas, bresaola chuck shoulder short loin landjaeger brisket ground round strip steak prosciutto sirloin. Shank t-bone pork belly, picanha meatloaf short ribs jerky swine turkey kevin ham hock. Sirloin hamburger short loin chicken jerky beef ribs swine shank landjaeger bacon cow.',
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 1825).toString(),
    timeWithRT: shiftDays('before', 120).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 2),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 2).toString(),
    lastLogout: shiftDays('before', 1).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 120).toString(),
    updatedAt: shiftDays('before', 120).toString(),
  },
  {
    // Cat Lady - 2
    id: allCurrentIdsForUsers[1],
    username: 'meowmeow',
    avatar: `avatar4.png`,
    name: 'Selina Kyle',
    email: 'meowmeow@gmail.com',
    city: 'Gotham',
    state: 'NY',
    employer: 'DC Comics',
    title: 'President of Me-ow',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'https://en.wikipedia.org/wiki/Catwoman',
    linkResume: dV.eS,
    bio: "Bring your owner a dead bird hide when guests come over always ensure to lay down in such a manner that tail can lightly brush human's nose . Meeeeouw stand with legs in litter box, but outside so trip on catnip have a lot of grump in yourself because you can't forget to be grumpy and not be like king grumpy cat but chase imaginary bugs. Take a big fluffing crap headbutt owner's knee and take a big mice meowzer yet slap owner's face at 5am until human fills food dish use lap as chair. Stuff and things. Intently sniff hand. Lick left leg for ninety minutes, still dirty russian blue. ",
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 900).toString(),
    timeWithRT: shiftDays('before', 50).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 1),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 30).toString(),
    lastLogout: shiftDays('before', 29.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 50).toString(),
    updatedAt: shiftDays('before', 50).toString(),
  },
  {
    // Cupcakes - 3
    id: allCurrentIdsForUsers[2],
    username: 'letThemEatCake',
    avatar: 'avatar5.png',
    name: 'Amelia Simmons',
    email: 'letThemEatCake@gmail.com',
    city: 'Hartford',
    state: 'CT',
    employer: 'American Cookery',
    title: 'Yes, Chef',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'https://en.wikipedia.org/wiki/American_Cookery',
    linkResume: dV.eS,
    bio: 'Cupcake ipsum dolor sit amet. Gummies brownie halvah donut. Oat cake souffl?? pastry. Gingerbread bonbon marshmallow. Danish toffee pastry. Halvah cake candy icing powder chocolate bar marzipan. Carrot cake bonbon candy canes jelly-o danish. Pudding wafer powder marshmallow. Jelly chupa chups pie pudding toffee icing gummies sweet jujubes. Powder tootsie roll tootsie roll topping bonbon bear claw chocolate. Pudding wafer powder jelly-o. Sesame snaps jelly beans cake danish jujubes chocolate bear claw bonbon sweet.',
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 1500).toString(),
    timeWithRT: shiftDays('before', 300).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 2),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 30).toString(),
    lastLogout: shiftDays('before', 29.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 300).toString(),
    updatedAt: shiftDays('before', 300).toString(),
  },
  {
    // Monty Python - 4
    id: allCurrentIdsForUsers[3],
    username: 'tablesShallBeRound',
    avatar: 'avatar1.png',
    name: 'King Authur',
    email: 'tablesShallBeRound@gmail.com',
    city: 'Camelot',
    state: 'WA',
    employer: 'United Kingdom',
    title: 'King of the Britains',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'https://en.wikipedia.org/wiki/Monty_Python_and_the_Holy_Grail',
    linkResume: dV.eS,
    bio: "Well, how'd you become king, then? Listen. Strange women lying in ponds distributing swords is no basis for a system of government. Supreme executive power derives from a mandate from the masses, not from some farcical aquatic ceremony. You can't expect to wield supreme power just 'cause some watery tart threw a sword at you! I don't want to talk to you no more, you empty-headed animal food trough water! I fart in your general direction! Your mother was a hamster and your father smelt of elderberries! Now leave before I am forced to taunt you a second time!",
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 800).toString(),
    timeWithRT: shiftDays('before', 120).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 1),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 45).toString(),
    lastLogout: shiftDays('before', 44.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 600).toString(),
    updatedAt: shiftDays('before', 600).toString(),
  },
  {
    // Rob Ross - 5
    id: allCurrentIdsForUsers[4],
    username: 'happyTrees4All',
    avatar: 'avatar2.png',
    name: 'Robert Ross',
    email: 'happyTrees4All@gmail.com',
    city: 'Daytona Beach',
    state: 'FL',
    employer: 'Happy Tree Co.',
    title: 'Sir Paints-a-Lot',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'https://en.wikipedia.org/wiki/Bob_Ross',
    linkResume: dV.eS,
    bio: "We'll put all the little clouds in and let them dance around and have fun. Trees cover up a multitude of sins. Let's put some happy trees and bushes back in here. We don't have anything but happy trees here. Nice little fluffy clouds laying around in the sky being lazy. Just take out whatever you don't want. It'll change your entire perspective. You can create beautiful things - but you have to see them in your mind first. There's nothing wrong with having a tree as a friend. Just let go - and fall like a little waterfall.",
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 1600).toString(),
    timeWithRT: shiftDays('before', 600).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 3),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 45).toString(),
    lastLogout: shiftDays('before', 44.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 400).toString(),
    updatedAt: shiftDays('before', 400).toString(),
  },
  {
    // Hipster - 6
    id: allCurrentIdsForUsers[5],
    username: 'oneTallBoyToRuleThemAll',
    avatar: 'avatar_default.png',
    name: 'Gulliver Lennon',
    email: 'oneTallBoyToRuleThemAll@gmail.com',
    city: 'Brooklyn',
    state: 'NY',
    employer: 'Pabst Blue Ribbion Brewing',
    title: 'Hip Ster',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'https://en.wikipedia.org/wiki/Hipster_(contemporary_subculture)',
    linkResume: dV.eS,
    bio: "Paleo ugh selfies, pork belly meh sartorial narwhal cornhole offal. Quinoa distillery subway tile 90's green juice, bushwick shoreditch slow-carb messenger bag. Kale chips man braid church-key yuccie distillery chartreuse. Shoreditch meh heirloom echo park tumeric adaptogen literally helvetica gentrify la croix tattooed affogato roof party bushwick. Blue bottle microdosing food truck green juice keytar fashion axe vice shabby chic literally taxidermy succulents PBR&B listicle. Seitan cloud bread bicycle rights portland. Letterpress hoodie irony, pabst af pickled plaid wayfarers narwhal gastropub sriracha.",
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 100).toString(),
    timeWithRT: shiftDays('before', 40).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 1),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 75).toString(),
    lastLogout: shiftDays('before', 74.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 110).toString(),
    updatedAt: shiftDays('before', 110).toString(),
  },
  {
    // Office Boss - 7
    id: allCurrentIdsForUsers[6],
    username: 'yeahImGonnaNeed',
    avatar: 'avatar3.png',
    name: 'Bill Lumbergh',
    email: 'yeahImGonnaNeed@gmail.com',
    city: 'Austin',
    state: 'TX',
    employer: 'Initech',
    title: 'Vice President',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'https://en.wikipedia.org/wiki/Office_Space',
    linkResume: dV.eS,
    bio: 'Push back take five, punch the tree, and come back in here with a clear head killing it. Please advise soonest run it up the flagpole, ping the boss and circle back forcing function prairie dogging, for pig in a python. What do you feel you would bring to the table if you were hired for this position knowledge is power so draw a line in the sand quick win. Baseline the procedure and samepage your department today shall be a cloudy day, thanks to blue sky thinking, we can now deploy our new ui to the cloud but productize. Upstream selling. Highlights . Table the discussion high turnaround rate but shoot me an email or streamline, yet minimize backwards overflow nor we need to start advertising on social media, optimize for search. Synergize productive mindfulness when does this sunset?',
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 1250).toString(),
    timeWithRT: shiftDays('before', 250).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 3),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 95).toString(),
    lastLogout: shiftDays('before', 94.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 250).toString(),
    updatedAt: shiftDays('before', 250).toString(),
  },
  {
    // Pirate - 8
    id: allCurrentIdsForUsers[7],
    username: 'blackbart',
    avatar: 'avatar_default.png',
    name: 'One Eyed Willy',
    email: 'blackbart@gmail.com',
    city: 'Astoria',
    state: 'OR',
    employer: 'The Inferno, Inc.',
    title: 'Captain',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'http://goonies.wikia.com/wiki/One-Eyed_Willy',
    linkResume: dV.eS,
    bio: "Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow's nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.<br><br>Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.",
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 1200).toString(),
    timeWithRT: shiftDays('before', 120).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 2),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 25).toString(),
    lastLogout: shiftDays('before', 24.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 120).toString(),
    updatedAt: shiftDays('before', 120).toString(),
  },
  {
    // Carl - 9
    id: allCurrentIdsForUsers[8],
    username: 'theCosmostist',
    avatar: 'avatar1.png',
    name: 'Carl Sagan',
    email: 'theCosmostist@gmail.com',
    city: 'Brooklyn',
    state: 'NY',
    employer: 'SETI',
    title: 'Chief Ear',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'https://en.wikipedia.org/wiki/Carl_Sagan',
    linkResume: dV.eS,
    bio: "Not a sunrise but a galaxyrise prime number! Vangelis. Hundreds of thousands. Billions upon billions. Great turbulent clouds Rig Veda. Radio telescope bits of moving fluff take root and flourish, astonishment. Descended from astronomers dream of the mind's eye descended from astronomers courage of our questions, preserve and cherish that pale blue dot realm of the galaxies, emerged into consciousness, Drake Equation take root and flourish two ghostly white figures in coveralls and helmets are soflty dancing brain is the seed of intelligence at the edge of forever, Cambrian explosion cosmic ocean, ship of the imagination astonishment.",
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 2000).toString(),
    timeWithRT: shiftDays('before', 600).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 3),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 45).toString(),
    lastLogout: shiftDays('before', 44.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 600).toString(),
    updatedAt: shiftDays('before', 600).toString(),
  },
  {
    // Sam - 10
    id: allCurrentIdsForUsers[9],
    username: 'badassMofo',
    avatar: 'avatar2.png',
    name: 'Samuel L. Jackson',
    email: 'badassMofo@gmail.com',
    city: 'Washington',
    state: 'D.C.',
    employer: 'Wallace Enterprises',
    title: 'Fixer',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'https://en.wikipedia.org/wiki/Samuel_L._Jackson',
    linkResume: dV.eS,
    bio: "Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing. Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do.",
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 800).toString(),
    timeWithRT: shiftDays('before', 230).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 1),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 45).toString(),
    lastLogout: shiftDays('before', 44.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 230).toString(),
    updatedAt: shiftDays('before', 230).toString(),
  },
  {
    // Tony - 11
    id: allCurrentIdsForUsers[10],
    username: 'thebirdman',
    avatar: 'avatar2.png',
    name: 'Tony Hawk',
    email: 'thebirdman@gmail.com',
    city: 'San Diego',
    state: 'CA',
    employer: 'Boom Boom HuckJam',
    title: 'Boarder Man',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'https://en.wikipedia.org/wiki/Tony_Hawk',
    linkResume: dV.eS,
    bio: 'Skate ipsum dolor sit amet, fastplant melancholy deck rock and roll. 540 invert nose blunt switch. Judo air pressure flip grind freestyle. Pogo feeble gap Video Days pump. 50-50 hang ten fakie frigid air. Frigid air bruised heel ollie rocket air. 720 g-turn hang ten sketchy Streetstyle in Tempe. Bigspin half-cab full pipe Gator cab flip. Fakie Rob Welsh wax pump nose slide. Shoveit casper pivot half-cab freestyle Streetstyle in Tempe. Bruised heel Alan Gelfand Christ air stalefish judo air handplant. Nose-bump Elissa Steamer varial shinner pump nollie. 540 birdie transition heel flip cab flip.',
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 1370).toString(),
    timeWithRT: shiftDays('before', 420).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 2),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 45).toString(),
    lastLogout: shiftDays('before', 44.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 420).toString(),
    updatedAt: shiftDays('before', 420).toString(),
  },
  {
    // Will - 12
    id: allCurrentIdsForUsers[11],
    username: 'numberOne',
    avatar: 'avatar2.png',
    name: 'William Thomas Riker',
    email: 'numberOne@gmail.com',
    city: 'Nome',
    state: 'AK',
    employer: 'United Federation of Planets',
    title: 'Commanding Officer',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'https://en.wikipedia.org/wiki/William_Riker',
    linkResume: dV.eS,
    bio: 'But the probability of making a six is no greater than that of rolling a seven. The Enterprise computer system is controlled by three primary main processor cores, cross-linked with a redundant melacortz ramistat, fourteen kiloquad interface modules. Sorry, Data. A lot of things can change in twelve years, Admiral. Fate. It protects fools, little children, and ships named "Enterprise." Travel time to the nearest starbase? When has justice ever been as simple as a rule book? I\'d like to think that I haven\'t changed those things, sir. Some days you get the bear, and some days the bear gets you. Maybe if we felt any human loss as keenly as we feel one of those close to us, human history would be far less bloody.',
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 3420).toString(),
    timeWithRT: shiftDays('before', 358).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 3),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 45).toString(),
    lastLogout: shiftDays('before', 44.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 358).toString(),
    updatedAt: shiftDays('before', 358).toString(),
  },
  {
    // Marty - 13
    id: allCurrentIdsForUsers[12],
    username: 'timeTraveler',
    avatar: 'avatar2.png',
    name: 'Marty McFly',
    email: 'timeTraveler@gmail.com',
    city: 'Hill Valley',
    state: 'CA',
    employer: 'Brown Enterprises',
    title: 'Time Traveler',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'https://en.wikipedia.org/wiki/Marty_McFly',
    linkResume: dV.eS,
    bio: "Yeah, it's in the back. You too. What you got under here? That was the day I invented time travel. I remember it vividly. I was standing on the edge of my toilet hanging a clock, the porces was wet, I slipped, hit my head on the edge of the sink. And when I came to I had a revelation, a avatar, a avatar in my head, a avatar of this. This is what makes time travel possible. The flux capacitor. I don't worry. this is all wrong. I don't know what it is but when I kiss you, it's like kissing my brother. I guess that doesn't make any sense, does it?",
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 1985).toString(),
    timeWithRT: shiftDays('before', 85).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 3),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 45).toString(),
    lastLogout: shiftDays('before', 44.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 85).toString(),
    updatedAt: shiftDays('before', 85).toString(),
  },
  {
    // Walt - 14
    id: allCurrentIdsForUsers[13],
    username: 'heisenberg',
    avatar: 'avatar2.png',
    name: 'Walter White',
    email: 'heisenberg@gmail.com',
    city: 'Albuquerque',
    state: 'NM',
    employer: 'A1 Car Wash',
    title: 'Lead Chemist',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'https://en.wikipedia.org/wiki/Walter_White_(Breaking_Bad)',
    linkResume: dV.eS,
    bio: "Did he speak to you? Would you just answer? What things? What people? A month ago, Gus was trying to kill both of us. And now, he pulls you out of the lab and employs you as... what... a, an assistant gunman? A tough guy? Does that make any sense to you? He says he sees something in you. What kind of game is he playing. Does he think you're that naive? He can't truly think that you'd forget... let alone Gale, let alone Victor... and all the horror that goes along with all of that. It's enough. This is still the best way. You go after him with a gun, you'll never get out of it alive.",
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 1640).toString(),
    timeWithRT: shiftDays('before', 164).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 2),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 45).toString(),
    lastLogout: shiftDays('before', 44.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 164).toString(),
    updatedAt: shiftDays('before', 164).toString(),
  },
  {
    // Saul - 15
    id: allCurrentIdsForUsers[14],
    username: 'betterCallMe',
    avatar: 'avatar2.png',
    name: 'Saul Goodman',
    email: 'betterCallMe@gmail.com',
    city: 'Albuquerque',
    state: 'NM',
    employer: 'Law Offices of Saul Goodman',
    title: 'Lawyer',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'https://en.wikipedia.org/wiki/Saul_Goodman',
    linkResume: dV.eS,
    bio: "Hand me that little thing, bin. This is the nail salon, right. I take your dirty money and I slip it into the salon's nice clean cash flow - that's called layering. Final step - integration. The revenues from the salon go to the owner - that's you! Your filthy drug money has been transformed into nice clean taxable income brought to you by a savvy investment in a thriving business. Yeah and if you wanna stay a criminal and not become say a convict, then maybe you should grow up and listen to your lawyer. They take every penny and you go in the can for felony tax evasion. Ouch! What was your mistake? You didn't launder your money! Now, you give me your money, okay that's called placement.",
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 1640).toString(),
    timeWithRT: shiftDays('before', 164).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 2),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 45).toString(),
    lastLogout: shiftDays('before', 44.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 164).toString(),
    updatedAt: shiftDays('before', 164).toString(),
  },
  {
    // Hodor  - 16
    id: allCurrentIdsForUsers[15],
    username: 'hodorhodor',
    avatar: 'avatar2.png',
    name: 'Hodor',
    email: 'hodorhodor@gmail.com',
    city: 'Hodor',
    state: 'hodor',
    employer: 'Hodor hodor hodor hodor',
    title: 'Hodor',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'https://en.wikipedia.org/wiki/List_of_A_Song_of_Ice_and_Fire_characters#Hodor',
    linkResume: dV.eS,
    bio: 'Hodor! Hodor hodor, hodor hodor hodor? Hodor! HODOR! Hodor hodor, hodor hodor hodor? Hodor! Hodor hodor, hodor; hodor hodor hodor hodor? HODOR! Hodor, hodor... Hodor hodor hodor? Hodor hodor HODOR! Hodor hodor... Hodor hodor hodor. Hodor hodor hodor? Hodor! Hodor; hodor hodor hodor hodor? Hodor hodor hodor? Hodor! Hodor hodor. HODOR! Hodor, hodor hodor, hodor? Hodor, hodor!?! Hodor hodor hodor!',
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 1234).toString(),
    timeWithRT: shiftDays('before', 123).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 2),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 45).toString(),
    lastLogout: shiftDays('before', 44.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 123).toString(),
    updatedAt: shiftDays('before', 123).toString(),
  },
  {
    // Fox  - 17
    id: allCurrentIdsForUsers[16],
    username: 'iWantToBelieve',
    avatar: 'avatar2.png',
    name: 'Fox Mulder',
    email: 'iWantToBelieve@gmail.com',
    city: 'Chilmark',
    state: 'Massachusetts',
    employer: 'Federal Bureau of Investigation',
    title: 'Special Agent',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'https://en.wikipedia.org/wiki/Fox_Mulder',
    linkResume: dV.eS,
    bio: "Scully, your're not going to believe this. Something Weird. A UFO Party. I have a life. I saw Elvis in a potato chip once. Whatever tape you found in that VCR, it isn't mine. I scream, you scream, we all scream for nonfat Tofutti rice dreamsicles. You ever seen a UFO in these parts? Before anyone passes judgement, may I remind you, we are in the Artic. Hey, Scully, do you think you could ever cannibalize someone? Well, not if drawsting pants come back into style. I think it's remotely plausible that someone might think you're hot. We found out you used to be a dog-faced boy.",
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 4242).toString(),
    timeWithRT: shiftDays('before', 424).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 3),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 45).toString(),
    lastLogout: shiftDays('before', 44.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 424).toString(),
    updatedAt: shiftDays('before', 424).toString(),
  },
  {
    // Grace  - 18
    id: allCurrentIdsForUsers[17],
    username: 'amazingGrace',
    avatar: 'avatar4.png',
    name: 'Grace Brewster Murray Hopper',
    email: 'amazingGrace@gmail.com',
    city: 'New York City',
    state: 'NY',
    employer: 'United States Navy',
    title: 'Rear Admiral',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'https://en.wikipedia.org/wiki/Grace_Hopper',
    linkResume: dV.eS,
    bio: "A ship in port is safe, but that's not what ships are built for. It is often easier to ask for forgiveness than to ask for permission. You don't manage people; you manage things. You lead people. If it's a good idea, go ahead and do it. It's much easier to apologize than it is to get permission. Leadership is a two-way street, loyalty up and loyalty down. Respect for one's superiors; care for one's crew.",
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 1906).toString(),
    timeWithRT: shiftDays('before', 190).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 3),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 45).toString(),
    lastLogout: shiftDays('before', 44.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 190).toString(),
    updatedAt: shiftDays('before', 190).toString(),
  },
  {
    // Margaret  - 19
    id: allCurrentIdsForUsers[18],
    username: 'stacksOfCode',
    avatar: 'avatar5.png',
    name: 'Margaret Heafield Hamilton',
    email: 'stacksOfCode@gmail.com',
    city: 'Paoli',
    state: 'IN',
    employer: 'Hamilton Technologies',
    title: 'CEO',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'https://en.wikipedia.org/wiki/Margaret_Hamilton_(scientist)',
    linkResume: dV.eS,
    bio: 'Looking back, we were the luckiest people in the world. There was no choice but to be pioneers; no time to be beginners. Apollo 8 comes a close second, it not equal, to Apollo 11 for the most exciting, memorable moments on the Apollo project. Looking back, we were the luckiest people in the world. There was no choice but to be pioneers; no time to be beginners. Apollo 8 comes a close second, it not equal, to Apollo 11 for the most exciting, memorable moments on the Apollo project.',
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 1936).toString(),
    timeWithRT: shiftDays('before', 136).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 2),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 45).toString(),
    lastLogout: shiftDays('before', 44.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 136).toString(),
    updatedAt: shiftDays('before', 136).toString(),
  },
  {
    // Chuck  - 20
    id: allCurrentIdsForUsers[19],
    username: 'roundhouseToTheFace',
    avatar: 'avatar1.png',
    name: 'Carlos Ray Norris',
    email: 'roundhouse@gmail.com',
    city: 'Ryan',
    state: 'OK',
    employer: 'Roundhouse Inc.',
    title: 'Ranger',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'https://en.wikipedia.org/wiki/Chuck_Norris',
    linkResume: dV.eS,
    bio: 'Chuck ipsum. Chuck Norris doesn???t need to swallow when eating food. Chuck Norris once kicked a baby elephant into puberty. Chuck Norris??? roundhouse kick is so powerful, it can be seen from outer space by the naked eye. Chuck Norris does not hunt because the word hunting infers the probability of failure. Chuck Norris goes killing.',
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 1940).toString(),
    timeWithRT: shiftDays('before', 197).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 2),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 45).toString(),
    lastLogout: shiftDays('before', 44.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 194).toString(),
    updatedAt: shiftDays('before', 194).toString(),
  },
  {
    //   - 21
    id: allCurrentIdsForUsers[20],
    username: 'crank',
    avatar: 'avatar3.png',
    name: 'William Gary Busey',
    email: 'crank@gmail.com',
    city: 'Goose Creek',
    state: 'TX',
    employer: "I'm with Busey",
    title: 'Star',
    linkGithub: dV.eS,
    linkCodepen: dV.eS,
    linkLinkedIn: dV.eS,
    linkPortfolioWebsite: 'https://en.wikipedia.org/wiki/Gary_Busey',
    linkResume: dV.eS,
    bio: "Listen to the silence. And when the silence is deafening, you're in the center of your own universe. Did you feel that? Look at me - I'm not out of breath anymore! I would like to give you a backstage pass to my imagination.Go with the feeling of the nature. Take it easy. Know why you're here. And remember to balance your internal energy with the environment. It's OK to get Rib-grease on your face, because you're allowing people to see that you're proud of these ribs.",
    profileStatsVisits: dV.dN,
    profileStatsViewsGithub: dV.dN,
    profileStatsViewsCodePen: dV.dN,
    profileStatsViewsPortfolio: dV.dN,
    profileStatsViewsLinkedIn: dV.dN,
    profileStatsViewsResume: dV.dN,
    experience: shiftDays('before', 1944).toString(),
    timeWithRT: shiftDays('before', 944).toString(),
    rank: returnRandomRank(allCurrentIdsForRanks, 2),
    skillsProfessional: dV.eA,
    skillsSoftware: dV.eA,
    skillsLanguages: dV.eA,
    lessonStatus: dV.eO,
    admin: returnRandomBoolean(),
    inactive: returnRandomBoolean(),
    isProfileSetup: returnRandomBoolean(),
    lastLogin: shiftDays('before', 45).toString(),
    lastLogout: shiftDays('before', 44.5).toString(),
    _lessonsCreated: dV.eA,
    _intQuestionsCreated: dV.eA,
    _intQuestionAnswersCreated: dV.eA,
    _skillsCreated: dV.eA,
    createdAt: shiftDays('before', 944).toString(),
    updatedAt: shiftDays('before', 944).toString(),
  },
];

returnLogWithSpace('All Current Users', allUsersArray);

if (allCurrentIdsForUsers.length < allUsersArray.length) {
  // console.log(allCurrentIdsForRanks.length, allRanksArray.length);
  console.error(
    chalk.bgRed(
      ' ERROR: ',
      'Length of Id Array does not Match DataStructure - Please fix: ',
      '#Ids: ',
      allCurrentIdsForUsers.length,
      '|| DS: ',
      allUsersArray.length
    )
  );
  // return;
} else {
  allUsersArray.forEach((userObj, index1) => {
    const {
      user: {
        // id,
        skillsProfessional,
        skillsSoftware,
        skillsLanguages,
        lessonStatus,
        _lessonsCreated,
        _intQuestionsCreated,
        _intQuestionAnswersCreated,
        _skillsCreated,
      },
    } = DICTIONARY_MODEL;
    // user Id
    // userObj[id] = allCurrentIdsForUsers[index1];

    // so gen skill sets for all users
    let tempAllSkillIds = [...allCurrentIdsForSkills];
    userObj[skillsProfessional] = [...createArrayOfANumberOfIds(tempAllSkillIds, getRandomNumber((tempAllSkillIds.length - 1) / 3, 3))];
    // returnLogWithSpace(
    //   'All Skills Arr Length (1)',
    //   `${tempAllSkillIds.length} || ${userObj[skillsProfessional].length}`,
    // );
    userObj[skillsSoftware] = [...createArrayOfANumberOfIds(tempAllSkillIds, getRandomNumber((tempAllSkillIds.length - 1) / 3, 3))];
    // returnLogWithSpace(
    //   'All Skills Arr Length (2)',
    //   `${tempAllSkillIds.length} || ${userObj[skillsSoftware].length}`,
    // );
    userObj[skillsLanguages] = [...createArrayOfANumberOfIds(tempAllSkillIds, getRandomNumber((tempAllSkillIds.length - 1) / 3, 3))];
    // returnLogWithSpace(
    //   'All Skills Arr Length (3)',
    //   `${tempAllSkillIds.length} || ${userObj[skillsLanguages].length}`,
    // );
    // fail if user gets more skills than are available.
    const userSkillCount = userObj[skillsProfessional].length + userObj[skillsSoftware].length + userObj[skillsLanguages].length;

    if (userSkillCount > allCurrentIdsForSkills.length) {
      console.error(chalk.bgRed(' ERROR: To Many Skills Generated, run again '));
      return;
    } else {
      // returnLogWithSpace(
      //   'Good to Go',
      //   `User Skills Length: ${userSkillCount} || Poss Skills: ${allCurrentIdsForSkills.length}`,
      // );
    }
    // lesson Obj => coming soon

    // Created Lookup
    let filterLessonArray = allLessons.filter((lessonObj) => lessonObj['_createdByUser'] === userObj[id]);
    userObj[_lessonsCreated] = filterLessonArray.map((lessonObj) => lessonObj.Id);

    let filterIntQuestArray = allInterviewQuestions.filter((intQuestObj) => intQuestObj['_createdByUser'] === userObj[id]);
    userObj[_intQuestionsCreated] = filterIntQuestArray.map((intQuestObj) => intQuestObj.Id);

    let filterIntQuestAnsArray = allInterviewQuestionAnswers.filter((intQuestAnsObj) => intQuestAnsObj['_createdByUser'] === userObj[id]);
    userObj[_intQuestionAnswersCreated] = filterIntQuestAnsArray.map((intQuestAnsObj) => intQuestAnsObj.Id);

    let filterSkillArray = allSkills.filter((skillObj) => skillObj['_createdByUser'] === userObj[id]);
    userObj[_skillsCreated] = filterSkillArray.map((skillObj) => skillObj.id);

    // console.log('Test: ', userObj);
    // }
    // lessonStatus - object - where key is the lesson id, and it has a value of 0 (no), 1(yes), 2(maybe).  if a lesson id does not exist in status, it gets all buttons.  if it does, it gets corresponding button

    // return an array of lessons, where the current user is in the lesson.lessonAttendingArray
    let lessonsUserAttending = [];
    allLessons.forEach((lesson) => {
      const {
        lesson: { lessonAttendees },
      } = DICTIONARY_MODEL;
      // console.log(lesson.lessonAttendees, allCurrentIdsForUsers[index1]);
      // console.log(lallCurrentIdsForUsers[index1]));
      if (lesson[lessonAttendees].includes(allCurrentIdsForUsers[index1])) {
        lessonsUserAttending.push(lesson);
      }
    });
    // console.log('userAttend', lessonsUserAttending);
    // console.log(allCurrentIdsForUsers[index1], lessonsUserAttending);
    let lessonsUserAttendingId = makeArrayFromObjectKey(lessonsUserAttending, 'id');
    // diff arrays to get not attending
    let lessonsUserNotYetAttending = diffArrays(allLessons, lessonsUserAttending);
    // make array of ids of lessons not attending
    let lessonsUserNotYetAttendingId = makeArrayFromObjectKey(lessonsUserNotYetAttending, 'id');

    // from the not attending - lets select a random number of them (1/3 not attend, 1/3 maybe)
    let randomNumberOfLessonsNotAttending = getRandomNumber(Math.ceil((lessonsUserNotYetAttendingId.length - 1) / 2), 1);

    // loop randomNumberof times, make no array
    let lessonsUserNotAttendingId = [];
    for (let i = 0; i < randomNumberOfLessonsNotAttending; i += 1) {
      let randomIndex = getRandomIndexOfArray(lessonsUserNotAttendingId.length);
      // then push that value into
      lessonsUserNotAttendingId.push(lessonsUserNotYetAttendingId[randomIndex]);
      lessonsUserNotYetAttendingId.splice(randomIndex, 1);
    }
    let randomNumberOfLessonsMaybeAttending = getRandomNumber(Math.ceil((lessonsUserNotYetAttendingId.length - 1) / 3), 1);
    let lessonsUserMaybeAttendingId = [];
    for (let i = 0; i < randomNumberOfLessonsMaybeAttending; i += 1) {
      let randomIndex = getRandomIndexOfArray(lessonsUserMaybeAttendingId.length);
      // then push that value into
      lessonsUserMaybeAttendingId.push(lessonsUserNotYetAttendingId[randomIndex]);
      lessonsUserNotYetAttendingId.splice(randomIndex, 1);
    }
    // should have a smaller lessons Not Attending Array now
    // console.log(allLessons.length, "Attend: ", lessonsUserAttending.length, "Not Attend: ", lessonsUserNotAttendingId.length, "Maybe: ", lessonsUserMaybeAttendingId.length, "No Show: ", lessonsUserNotYetAttendingId.length);
    let lessonStatusObj = {};
    lessonsUserNotAttendingId.forEach((notAttendId) => {
      lessonStatusObj[notAttendId] = 0;
    });
    lessonsUserAttendingId.forEach((attendId) => {
      lessonStatusObj[attendId] = 1;
    });
    lessonsUserMaybeAttendingId.forEach((maybeAttendId) => {
      lessonStatusObj[maybeAttendId] = 2;
    });
    // console.log(lessonStatusObj);
    userObj[lessonStatus] = lessonStatusObj;
    //still lessonStatus!  :)
  });

  returnLogWithSpace('All Users Arr - JS', allUsersArray);
  const formatForDynamo = allUsersArray.map((obj) => AWS.DynamoDB.Converter.marshall(obj));
  returnLogWithSpace('All Users Arr - Dynamo', formatForDynamo);

  const fileName = JSON_NAME.users.split('.')[0];
  writeAndReadJSONFiles(formatForDynamo, fileName);
  // end else
}

//
//
