const quizData = [
  {
    type: "qcm",
    question: "Qui a créé le système Unix ?",
    choices: [
      "Linus Torvalds",
      "Richard Stallman",
      "Ken Thompson et Dennis Ritchie",
      "Bill Gates"
    ],
    correct: 2
  },
  {
    type: "qcm",
    question: "Que signifie SSH ?",
    choices: [
      "Secure Shell",
      "Simple Shell",
      "Superuser Shell",
      "Server Shell"
    ],
    correct: 0
  },
  {
    type: "qcm",
    question: "Quelle commande permet de créer un nouvel utilisateur ?",
    choices: [
      "adduser",
      "useradd",
      "createuser",
      "newuser"
    ],
    correct: 1
  },
  {
    type: "qcm",
    question: "Que permet une ACL ?",
    choices: [
      "Gérer uniquement les droits du propriétaire",
      "Ajouter des permissions précises à plusieurs utilisateurs ou groupes",
      "Supprimer un utilisateur",
      "Modifier le mot de passe"
    ],
    correct: 1
  },
  {
    type: "qcm",
    question: "Quel protocole est utilisé pour centraliser l’authentification dans un annuaire ?",
    choices: [
      "FTP",
      "LDAP",
      "SMTP",
      "RADIUS"
    ],
    correct: 1
  },
  {
    type: "qcm",
    question: "Quelle commande permet d’afficher les logs système ?",
    choices: [
      "syslog",
      "logread",
      "journalctl",
      "logshow"
    ],
    correct: 2
  },
  {
    type: "qcm",
    question: "Qu’est-ce qu’un pare-feu ?",
    choices: [
      "Un logiciel antivirus",
      "Un filtre réseau qui contrôle le trafic",
      "Un gestionnaire d’utilisateurs",
      "Un système de fichiers"
    ],
    correct: 1
  },
  {
    type: "qcm",
    question: "Quel est le principe de moindre privilège ?",
    choices: [
      "Donner tous les droits à l’utilisateur",
      "Donner le moins de droits possible pour limiter les risques",
      "Utiliser uniquement le compte root",
      "Interdire l’accès SSH"
    ],
    correct: 1
  },
  {
    type: "qcm",
    question: "Quelle commande sert à modifier les permissions classiques ?",
    choices: [
      "chmod",
      "chown",
      "setfacl",
      "passwd"
    ],
    correct: 0
  },
  {
    type: "qcm",
    question: "Quelle distribution est orientée pentesting ?",
    choices: [
      "Debian",
      "Kali Linux",
      "Kaisen Linux",
      "Arch Linux"
    ],
    correct: 1
  },
  // Questions ouvertes
  {
    type: "open",
    question: "Explique brièvement ce qu'est un VPN.",
    acceptableAnswers: [
      /réseau privé virtuel/i,
      /connexion sécurisée/i,
      /tunnel/i
    ]
  },
  {
    type: "open",
    question: "Nomme deux créateurs importants liés à Unix, GNU, et Linux.",
    acceptableAnswers: [
      /ken thompson/i,
      /dennis ritchie/i,
      /richard stallman/i,
      /linus torvalds/i
    ]
  },
  {
    type: "open",
    question: "À quoi sert le protocole RADIUS ?",
    acceptableAnswers: [
      /authentification/i,
      /contrôle d’accès/i,
      /gestion des utilisateurs distants/i
    ]
  },
  {
    type: "open",
    question: "Donne la commande Linux pour afficher les ACL d'un fichier.",
    acceptableAnswers: [
      /getfacl/i
    ]
  },
  {
    type: "open",
    question: "Qu’est-ce que le principe de moindre privilège ?",
    acceptableAnswers: [
      /donner le minimum de droits nécessaires/i,
      /limiter les droits des utilisateurs/i,
      /réduire les risques de sécurité/i
    ]
  }
];

const quizContainer = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const submitBtn = document.getElementById('submit');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const resultEl = document.getElementById('result');
const form = document.getElementById('choices');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // bloque la soumission du formulaire et le rechargement de la page
});

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  clearChoices();
  feedbackEl.textContent = '';
  const currentQ = quizData[currentQuestionIndex];
  questionEl.textContent = `${currentQuestionIndex + 1}. ${currentQ.question}`;
  scoreEl.textContent = `Score actuel : ${score} / ${quizData.length}`;

  if (currentQ.type === "qcm") {
    currentQ.choices.forEach((choice, idx) => {
      const label = document.createElement('label');
      label.classList.add('choice-label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'choice';
      input.value = idx;
      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      choicesEl.appendChild(label);
    });
  } else if (currentQ.type === "open") {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'openAnswer';
    input.name = 'openAnswer';
    input.placeholder = "Tape ta réponse ici...";
    input.autocomplete = "off";
    choicesEl.appendChild(input);
  }
}

function clearChoices() {
  while (choicesEl.firstChild) {
    choicesEl.removeChild(choicesEl.firstChild);
  }
}

submitBtn.addEventListener('click', () => {
  const currentQ = quizData[currentQuestionIndex];
  let correctAnswer = false;

  if (currentQ.type === "qcm") {
    const selected = document.querySelector('input[name="choice"]:checked');
    if (!selected) {
      alert('Merci de sélectionner une réponse.');
      return;
    }
    const answer = parseInt(selected.value);
    if (answer === currentQ.correct) {
      correctAnswer = true;
      score++;
    }
  } else if (currentQ.type === "open") {
    const userAnswer = document.getElementById('openAnswer').value.trim();
    if (!userAnswer) {
      alert('Merci de saisir une réponse.');
      return;
    }
    correctAnswer = currentQ.acceptableAnswers.some(regex => regex.test(userAnswer));
    if (correctAnswer) score++;
  }

  if (correctAnswer) {
    feedbackEl.textContent = "Bonne réponse ! 🎉";
    feedbackEl.style.color = "green";
  } else {
    feedbackEl.textContent = "Mauvaise réponse 😕";
    feedbackEl.style.color = "red";
  }

  // On bloque le bouton et la saisie jusqu'à la prochaine question
  submitBtn.disabled = true;
  if (currentQ.type === "qcm") {
    document.querySelectorAll('input[name="choice"]').forEach(i => i.disabled = true);
  } else {
    document.getElementById('openAnswer').disabled = true;
  }

  // Passage à la question suivante au bout de 2 secondes
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      submitBtn.disabled = false;
      loadQuestion();
    } else {
      showResult();
    }
  }, 2000);
});

function showResult() {
  quizContainer.style.display = 'none';
  const percent = Math.round((score / quizData.length) * 100);
  resultEl.innerHTML = `<h2>Quiz terminé !</h2>
    <p>Votre score final : ${score} / ${quizData.length} (${percent}%)</p>
    <button id="restartBtn">Recommencer</button>`;
  document.getElementById('restartBtn').addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    resultEl.innerHTML = '';
    quizContainer.style.display = 'block';
    submitBtn.disabled = false;
    loadQuestion();
  });
}

// Initialisation du quiz
loadQuestion();
