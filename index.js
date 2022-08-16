import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let restartProcessVar;
let playerName;
let playerScore = 0;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
      "โฮ้ โฮ้ อยากวัดความรู้คณิตศาสตร์อย่างงั้นรึ! \nแน่จริงก็เข้ามาสิ!\n"
    );
  
    await sleep();
    rainbowTitle.stop();
  
    console.log(`
      ${chalk.bgBlue("วิธีเล่น")} 
      โจทย์จะถูกสุ่มขึ้นมาจากระดับ ง่าย -> ปานกลาง -> ยาก -> ยากมาก -> ไม่ใช่มนุษย์
      ถ้าทำโจทย์ระดับไม่ใช่มนุษย์สำเร็จ รางวัลโนเบล ก็อาจจะไม่ไกลเกินเอื้อม!
      รูปแบบการให้คะแนน:
          ${chalk.bgGreenBright("ข้อ 1-6  ข้อละ 1 คะแนน")}
          ${chalk.bgGreen("ข้อ 7-9  ข้อละ 2 คะแนน")}
          ${chalk.bgYellowBright("ข้อ 9-12  ข้อละ 3 คะแนน")}
          ${chalk.bgYellow("ข้อ 13-15 ข้อละ 5 คะแนน")}

      ${chalk.bgBlue("มาเริ่มเกมกันเถอะ!")}
  
    `);
}

async function restartProcess() {
  restartProcessVar = true;
  playerName;
  playerScore = 0;

  const answers = await inquirer.prompt({
    name: "response",
    type: "confirm",
    message: `ต้องการเริ่มใหม่ใช่หรือไม่?`
  });

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
    // console.log(chalk.green(`ชัยชนะที่ได้มาด้วยความพยายาม นั้นสำคัญกว่าใด และใช่ Millennium Prize Problems รอให้คุณแก้อยู่!`));
  });
  await sleep(5000);
  restartProcess();
};

async function handleAnswer(isCorrect, countAddPoint) {
  const spinner = createSpinner('กำลังตรวจสอบคำตอบ...').start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `เป็นคำตอบที่ถูกต้องแล้วครับ!` });
    playerScore = playerScore + countAddPoint;
    await inquirer.prompt({
      name: "response",
      message: `คุณ ${playerName} คุณต้องการไปต่อใช่หรือไม่`,
      type: "confirm"
    }).then((answers) => {
      if (!answers.response) {
        spinner.success({ text: `คะแนนของคุณ ${playerName} ตอนนี้คือ ${playerScore} โอกาสหน้าเชิญใหม่นะครับ.` })
        restartProcess();
      }
    })
  } else {
    spinner.error({ text: `คำตอบยังไม่ถูกต้องนะครับ คุณ ${playerName} คะแนนสูงสุดของคุณคือ ${playerScore} โอกาสหน้าลองใหม่!` });
    restartProcess();
  }
};


async function Question_Basic() {
  if (restartProcessVar) return;
  let QuestionList = [
    { Question: "ข้อในคือหน่วยประมาณผลกลาง ของคอมพิวเตอร์", Choices: ["Ram", "Rom", "Cpu", "Hard Disk"], Answers: "Cpu" },
    { Question: "ในการประประมวลผลภาพ Graphics อุปกรณ์ชิ้นไหนทำงานได้ดีกว่า", Choices: ["GPU", "CPU", "SSD", "Hard Disk"], Answers: "GPU" },
  ]
  let RandomQuestion = QuestionList[getRandomInt(0, QuestionList.length - 1)];

  const answers = await inquirer.prompt({
    name: "response",
    type: "list",
    choices: RandomQuestion.Choices,
    message: `ข้อที่ X). ${RandomQuestion.Question} 
    คำตอบ :`
  });

  return handleAnswer(answers.response == RandomQuestion.Answers, 3);
};




async function startGame() {
  await welcome();
  await askName();
  await Question_Number_1();
  await Question_Number_2();
  await Question_Number_3();
  await Question_Number_4();
  await Question_Number_5();
  await Question_Number_6();
  await Question_Number_7();
  await Question_Number_8();
  await Question_Number_9();
  await Question_Number_10();
  await Question_Number_11();
  await Question_Number_12();
  await Question_Number_13();
  await Question_Number_14();
  await winner();
};

startGame();