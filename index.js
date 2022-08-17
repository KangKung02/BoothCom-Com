import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let restartProcessVar;
let playerName;
let playerScore = 0;
let Article = 1;

let QuestionListBasic = [
  { Question: "Paint เป็นโปรแกรมสำหรับอะไร", Choices: ["ต้ดต่อวิดีโอ", "วาดรูป", "ตัดต่อภาพ", "เล่นวิดีโอ"], Answers: "วาดรูป" },
  { Question: "Adobe Photoshop เป็นโปรแกรมสำหรับอะไร", Choices: ["ต้ดต่อวิดีโอ", "วาดรูป", "ตัดต่อภาพ", "เล่นวิดีโอ"], Answers: "ตัดต่อภาพ" },
  { Question: "Microsoft Power Point เป็นโปรแกรมสำหรับอะไร", Choices: ["ต้ดต่อวิดีโอ", "วาดรูป", "นำเสนอผลงาน", "ส่งข้อความ"], Answers: "นำเสนอผลงาน" },
  { Question: "ข้อใดไม่ใช่ Web Browser", Choices: ["Linux", "Google Chrome", "FireFox", "Microsoft Edge"], Answers: "Linux" },
  { Question: "ข้อใดไม่ใช่ Hard Ware", Choices: ["Key Board", "Mouse", "CPU", "Linux"], Answers: "Linux" },
];
let QuestionListMedium = [
  { Question: "ข้อในคือหน่วยประมาณผลกลาง ของคอมพิวเตอร์?", Choices: ["Ram", "Rom", "Cpu", "Hard Disk"], Answers: "Cpu" },
  { Question: "ในการประประมวลผลภาพ Graphics อุปกรณ์ชิ้นไหนทำงานได้ดีกว่า?", Choices: ["GPU", "CPU", "SSD", "Hard Disk"], Answers: "GPU" },
  { Question: "Rom ย่อมาจากอะไร?", Choices: ["Read Only Memory", "Random Only Remory", "Random Access Memory", "Read Access Memory"], Answers: "Read Only Memory" },
  { Question: "ข้อใดคือ ซอฟต์แวร์?", Choices: ["ครูสอนคอมพิวเตอร์", "ไวรัสคอมพิวเตอร์", "กล้องถ่ำยภำพดิจิตอล", "พนักงานคอมพิวเตอร์"], Answers: "ไวรัสคอมพิวเตอร์" },
  { Question: "ประเทศไหนคือเป้าหมายการโจมตี ของ Stuxnet", Choices: ["สหรัฐอเมริกา", "อิสราเอล", "ไทย", "อิหร่าน"], Answers: "อิหร่าน" },
  { Question: "ข้อใดคือ ความหมายของ Zero-day Exploit", Choices: ["วิธีการที่แฮกเกอร์โจมตีระบบ โดยอาศัยช่องโหว่ที่ไม่เคยถูกค้นพบมาก่อน", "วิธีการที่แฮกเกอร์โจมตีระบบ โดยไม่อาศัยช่องโหว่", "วิธีการที่ระบบโจมตีแฮกเกอร์", "ช่องโหว่ที่ถูกขายไปแล้ว"], Answers: "วิธีการที่แฮกเกอร์โจมตีระบบ โดยอาศัยช่องโหว่ที่ไม่เคยถูกค้นพบมาก่อน" },
];
let QuestionListHard = [
  { Question: "ข้อใดคือค่า ฐาน 2 ของเลขฐาน 2 642", Choices: ["1010000010", "1010100010", "1010000001", "1110001"], Answers: "1010000010" },
  { Question: "ข้อใดคือผลลัพธ์ ของการบวกของฐาน 2 1+1", Choices: ["0", "2", "10", "11"], Answers: "10" },
  { Question: "ข้อใดคือผลลัพธ์ ของการคูณของฐาน 2 1101 * 1011", Choices: ["11011011", "10001111", "1000001", "1111111"], Answers: "10001111" },
  { Question: "ในข้อมูล 1 Byte มีกี่ Bit", Choices: ["1", "4", "8", "16"], Answers: "8" },
  { Question: "ข้อใด คือ algorithm ของการ Hash", Choices: ["BASE64", "SHA256", "RSA", "LINUX"], Answers: "SHA256" },
  { Question: "ข้อใด คือ algorithm ของการ Encode", Choices: ["BASE64", "SHA256", "RSA", "LINUX"], Answers: "BASE64" },
  { Question: "ข้อใด คือ algorithm ของการ Encryption", Choices: ["BASE64", "SHA256", "RSA", "LINUX"], Answers: "RSA" },
  { Question: "ข้อใดคือ ภาษา Programming", Choices: ["HTML", "CSS", "JS", "JSON"], Answers: "JS" },
  { Question: "รหัส BCD-8421 มีกี่ Bit", Choices: ["1", "4", "8", "16"], Answers: "4" },
];


const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

function swithArray(Arr) {
  let newArray = [];
  let length = Arr.length
  for (let i = 0; i < length; i++) {
      let randomValue = Arr[getRandomInt(0, Arr.length - 1)];
      newArray.push(randomValue);
      var index = Arr.indexOf(randomValue);
      if (index !== -1) {
          Arr.splice(index, 1);
      };
  };
  return newArray;
}

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
      "โฮ้ โฮ้ อยากวัดความรู้คอมพิวเตอร์อย่างงั้นรึ! \nแน่จริงก็เข้ามาสิ!\n"
    );
  
    await sleep();
    rainbowTitle.stop();
  
    console.log(`
      ${chalk.bgBlue("วิธีเล่น")} 
      โจทย์จะถูกสุ่มขึ้นมาจากระดับ Basic -> Medium -> Hard
      รูปแบบการให้คะแนน:
          ${chalk.bgGreenBright("Basic ข้อละ 1 คะแนน")}
          ${chalk.bgGreen("Medium ข้อละ 1.5 คะแนน")}
          ${chalk.bgYellowBright("Hard ข้อละ 1.75 คะแนน")}

      ${chalk.bgBlue("มาเริ่มเกมกันเถอะ!")}
  
    `);
}

async function restartProcess() {
  restartProcessVar = true;
  playerName;
  playerScore = 0;
  Article = 1;
  
  const answers = await inquirer.prompt({
    name: "response",
    type: "confirm",
    message: `ต้องการเริ่มใหม่ใช่หรือไม่?`
  });

  QuestionListBasic = [
    { Question: "Paint เป็นโปรแกรมสำหรับอะไร", Choices: ["ต้ดต่อวิดีโอ", "วาดรูป", "ตัดต่อภาพ", "เล่นวิดีโอ"], Answers: "วาดรูป" },
    { Question: "Adobe Photoshop เป็นโปรแกรมสำหรับอะไร", Choices: ["ต้ดต่อวิดีโอ", "วาดรูป", "ตัดต่อภาพ", "เล่นวิดีโอ"], Answers: "ตัดต่อภาพ" },
    { Question: "Microsoft Power Point เป็นโปรแกรมสำหรับอะไร", Choices: ["ต้ดต่อวิดีโอ", "วาดรูป", "นำเสนอผลงาน", "ส่งข้อความ"], Answers: "นำเสนอผลงาน" },
    { Question: "ข้อใดไม่ใช่ Web Browser", Choices: ["Linux", "Google Chrome", "FireFox", "Microsoft Edge"], Answers: "Linux" },
    { Question: "ข้อใดไม่ใช่ Hard Ware", Choices: ["Key Board", "Mouse", "CPU", "Linux"], Answers: "Linux" },
  ];
  QuestionListMedium = [
    { Question: "ข้อในคือหน่วยประมาณผลกลาง ของคอมพิวเตอร์?", Choices: ["Ram", "Rom", "Cpu", "Hard Disk"], Answers: "Cpu" },
    { Question: "ในการประประมวลผลภาพ Graphics อุปกรณ์ชิ้นไหนทำงานได้ดีกว่า?", Choices: ["GPU", "CPU", "SSD", "Hard Disk"], Answers: "GPU" },
    { Question: "Rom ย่อมาจากอะไร?", Choices: ["Read Only Memory", "Random Only Remory", "Random Access Memory", "Read Access Memory"], Answers: "Read Only Memory" },
    { Question: "ข้อใดคือ ซอฟต์แวร์?", Choices: ["ครูสอนคอมพิวเตอร์", "ไวรัสคอมพิวเตอร์", "กล้องถ่ำยภำพดิจิตอล", "พนักงานคอมพิวเตอร์"], Answers: "ไวรัสคอมพิวเตอร์" },
    { Question: "ประเทศไหนคือเป้าหมายการโจมตี ของ Stuxnet", Choices: ["สหรัฐอเมริกา", "อิสราเอล", "ไทย", "อิหร่าน"], Answers: "อิหร่าน" },
    { Question: "ข้อใดคือ ความหมายของ Zero-day Exploit", Choices: ["วิธีการที่แฮกเกอร์โจมตีระบบ โดยอาศัยช่องโหว่ที่ไม่เคยถูกค้นพบมาก่อน", "วิธีการที่แฮกเกอร์โจมตีระบบ โดยไม่อาศัยช่องโหว่", "วิธีการที่ระบบโจมตีแฮกเกอร์", "ช่องโหว่ที่ถูกขายไปแล้ว"], Answers: "วิธีการที่แฮกเกอร์โจมตีระบบ โดยอาศัยช่องโหว่ที่ไม่เคยถูกค้นพบมาก่อน" },
  ];  
  if (!answers.response) { console.log("ไม่ละ จงอยู่กับ Loop นรกนี้ไปซะ!") };
  const spinner = createSpinner('กำลังเริ่มต้นเกมใหม่ อีกครั้ง...').start();
  await sleep();
  spinner.success({ text: "เสร็จสิ้น" });
  restartProcessVar = false;
  await sleep();
  console.clear();
  startGame();
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "response",
    type: "input",
    message: "คุณชื่ออะไร?",
    default() { return "นิรนาม"}
  });

  playerName = answers.response;
  await sleep();
  let spinner = createSpinner('กำลังลงทะเบียน...').start();
  await sleep();
  await spinner.success({ text : `ลงทะเบียนเสร็จสิ้น! ขอให้โชคดี!` });
};

async function winner() {
  if (restartProcessVar) return;
  figlet(`Congrats!, ${playerName} You Win This Game!`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + '\n')
    console.log(chalk.green(`ชัยชนะที่ได้มาด้วยความพยายามนั้น... อา~ ช่างมันเถอะ ขี้เกียจคิดแล้ว`));
  });
  await sleep(5000);
  restartProcess();
};

async function handleAnswer(isCorrect, countAddPoint,) {
  const spinner = createSpinner('กำลังตรวจสอบคำตอบ...').start();
  await sleep();
  let Returning;
  if (isCorrect) {
    playerScore = playerScore + countAddPoint;
    Article = Article + 1;
    spinner.success({ text: `เป็นคำตอบที่ถูกต้องแล้วครับ!, ตอนนี้คะแนนของคูณคือ ${playerScore}` });
    await inquirer.prompt({
      name: "response",
      message: `คุณ ${playerName} คุณต้องการไปต่อใช่หรือไม่`,
      type: "confirm"
    }).then((answers) => {
      if (!answers.response) {
        spinner.success({ text: `คะแนนของคุณ ${playerName} ตอนนี้คือ ${playerScore} โอกาสหน้าเชิญใหม่นะครับ.` })
        restartProcess();
      } else {
        Returning = true;
      };
    })
  } else {
    spinner.error({ text: `คำตอบยังไม่ถูกต้องนะครับ คุณ ${playerName} คะแนนสูงสุดของคุณคือ ${playerScore} โอกาสหน้าลองใหม่!` });
    restartProcess();
  }
  return Returning;
};

async function Question_Basic() {
  if (restartProcessVar) return;

  let RandomQuestion = QuestionListBasic[getRandomInt(0, QuestionListBasic.length - 1)];

  const answers = await inquirer.prompt({
    name: "response",
    type: "list",
    choices: swithArray(RandomQuestion.Choices),
    message: `ข้อที่ ${Article}). ${RandomQuestion.Question} ${chalk.green("(Basic)")}
    คำตอบ :`
  });

  var index = QuestionListBasic.indexOf(RandomQuestion);
  if (index !== -1) {
      QuestionListBasic.splice(index, 1);
  };
  return handleAnswer(answers.response == RandomQuestion.Answers, 1);
};


async function Question_Medium() {
  if (restartProcessVar) return;
  let RandomQuestion = QuestionListMedium[getRandomInt(0, QuestionListMedium.length - 1)];

  const answers = await inquirer.prompt({
    name: "response",
    type: "list",
    choices: swithArray(RandomQuestion.Choices),
    
    message: `ข้อที่ ${Article}). ${RandomQuestion.Question} ${chalk.redBright("(Medium)")}
    คำตอบ :`
  });

  var index = QuestionListMedium.indexOf(RandomQuestion);
  if (index !== -1) {
    QuestionListMedium.splice(index, 1);
  };
  return handleAnswer(answers.response == RandomQuestion.Answers, 1.5);
};

async function Question_Hard() {
  if (restartProcessVar) return;
  let RandomQuestion = QuestionListHard[getRandomInt(0, QuestionListHard.length - 1)];

  const answers = await inquirer.prompt({
    name: "response",
    type: "list",
    choices: swithArray(RandomQuestion.Choices),
    message: `ข้อที่ ${Article}). ${RandomQuestion.Question} ${chalk.red("(Hard)")}
    คำตอบ :`
  });

  var index = QuestionListHard.indexOf(RandomQuestion);
  if (index !== -1) {
    QuestionListHard.splice(index, 1);
  };
  return handleAnswer(answers.response == RandomQuestion.Answers, 1.5);
};




async function startGame() {
  await welcome();
  await askName();
  for (let i = 0; i < 5; i++) {
    if (!await Question_Basic()) return;
  };
  for (let i = 0; i < 5; i++) {
    if (!await Question_Medium()) return;
  };
  for (let i = 0; i < 5; i++) {
    if (!await Question_Hard()) return;
  };

  await winner();
};

startGame();