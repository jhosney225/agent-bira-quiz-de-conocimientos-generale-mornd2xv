```javascript
const readline = require('readline');

// Crear interfaz de lectura
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Base de datos de preguntas
const quizzes = [
  {
    id: 1,
    question: '¿Cuál es la capital de Francia?',
    options: ['a) Londres', 'b) París', 'c) Berlín', 'd) Madrid'],
    correctAnswer: 'b'
  },
  {
    id: 2,
    question: '¿En qué año llegó el ser humano a la luna?',
    options: ['a) 1965', 'b) 1969', 'c) 1971', 'd) 1973'],
    correctAnswer: 'b'
  },
  {
    id: 3,
    question: '¿Cuál es el planeta más grande del sistema solar?',
    options: ['a) Saturno', 'b) Neptuno', 'c) Júpiter', 'd) Urano'],
    correctAnswer: 'c'
  },
  {
    id: 4,
    question: '¿Quién escribió "Don Quijote"?',
    options: ['a) Jorge Luis Borges', 'b) Federico García Lorca', 'c) Miguel de Cervantes', 'd) Gabriel García Márquez'],
    correctAnswer: 'c'
  },
  {
    id: 5,
    question: '¿Cuál es el río más largo del mundo?',
    options: ['a) Amazonas', 'b) Nilo', 'c) Yangtsé', 'd) Misisipi'],
    correctAnswer: 'b'
  },
  {
    id: 6,
    question: '¿En qué continente se encuentra Australia?',
    options: ['a) Asia', 'b) Oceanía', 'c) América', 'd) Europa'],
    correctAnswer: 'b'
  },
  {
    id: 7,
    question: '¿Cuántos lados tiene un hexágono?',
    options: ['a) 5', 'b) 6', 'c) 7', 'd) 8'],
    correctAnswer: 'b'
  },
  {
    id: 8,
    question: '¿Cuál es el elemento químico con símbolo Au?',
    options: ['a) Plata', 'b) Aluminio', 'c) Oro', 'd) Cobre'],
    correctAnswer: 'c'
  }
];

// Clase Quiz para manejar la lógica
class QuizGame {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.answers = [];
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  hasNextQuestion() {
    return this.currentQuestionIndex < this.questions.length;
  }

  submitAnswer(answer) {
    const currentQuestion = this.getCurrentQuestion();
    const isCorrect = answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    
    if (isCorrect) {
      this.score++;
    }
    
    this.answers.push({
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      userAnswer: answer.toLowerCase(),
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: isCorrect
    });
    
    this.currentQuestionIndex++;
    return isCorrect;
  }

  getResults() {
    const totalQuestions = this.questions.length;
    const percentage = (this.score / totalQuestions) * 100;
    
    return {
      score: this.score,
      totalQuestions: totalQuestions,
      percentage: percentage.toFixed(2),
      answers: this.answers
    };
  }
}

// Función para hacer pregunta y obtener respuesta
function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Función principal del juego
async function main() {
  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║       ¡Bienvenido al QUIZ DE CONOCIMIENTOS!    ║');
  console.log('║                                                ║');
  console.log('║  Responde todas las preguntas correctamente    ║');
  console.log('║  para obtener una buena puntuación.            ║');
  console.log('╚════════════════════════════════════════════════╝\n');

  const game = new QuizGame(quizzes);

  while (game.hasNextQuestion()) {
    const currentQuestion = game.getCurrentQuestion();
    const questionNumber = game.currentQuestionIndex + 1;
    
    console.log(`\n━━━ Pregunta ${questionNumber} de ${game.questions.length} ━━━`);
    console.log(`\n${currentQuestion.question}\n`);
    
    currentQuestion.options.forEach((option) => {
      console.log(`  ${option}`);
    });

    let userAnswer = '';
    let isValidAnswer = false;

    while (!isValidAnswer) {
      userAnswer = await askQuestion(rl, '\nTu respuesta (a/b/c/d): ');
      if (['a', 'b', 'c', 'd'].includes(userAnswer.toLowerCase())) {
        isValidAnswer = true;
      } else {
        console.log('❌ Respuesta inválida. Por favor, ingresa a, b, c o d.');
      }
    }

    const isCorrect = game.submitAnswer(userAnswer);
    if (isCorrect