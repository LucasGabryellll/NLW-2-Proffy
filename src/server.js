// dados
const proffys = [
  {
    name: "Diego Fernades",
    avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
    whatsapp: "89221453",
    bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhasexplosões",
    subject: "Química",
    cost: "20",
    weekday: [0],
    time_from: [720],
    time_to: [1220],
  },

  {
    name: "Lucas Gabryel",
    avatar: "https://avatars3.githubusercontent.com/u/55465916?s=460&u=521cc897e3686f7e346ef43eb44285a976bf3cd5&v=4",
    whatsapp: "87586214",
    bio: "Entusiasta das melhores tecnologias de matemática avançada.<br><br>Apaixonado por calculos e números,e por mudar a vida das pessoas encontrando o X da equação. Mais de 200.000 pessoas já passaram por uma das minhas fórmulas.",
    subject: "Matemática",
    cost: "20",
    weekday: [1],
    time_from: [720],
    time_to: [1220],
  }
];

const subjects = [
  "Artes",
  "Biologia",
  "Ciências",
  "Educação física",
  "Física",
  "Geografia",
  "História",
  "Matemática",
  "Português",
  "Química",
];

const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

// funcionalidades
function getSubject(subjectNumber) {
  const position = +subjectNumber - 1;
  return subjects[position];
};

function pageLanding(req, res) {
  return res.render("index.html");
};

function pageStudy(req, res) {
  const filters = req.query;
  return res.render("study.html", { proffys, filters, subjects, weekdays });
};

function pageGiveClasses(req, res) {
  const data = req.query;

  const isNotEmpty = Object.keys(data).length > 0;
  // add date a lista proffys
  if (isNotEmpty) {
    data.subject = getSubject(data.subject);

    proffys.push(data);

    return res.redirect("/study");
  };

  return res.render("give-classes.html", { subjects, weekdays });
};

// servidor
const express = require('express');
const server = express();

//configurar nunjuncks (template engine)
const nunjucks = require('nunjucks');

nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});

// configurar arquivos estáticos (css, scripts, images)
server.use(express.static("public"))
  // rotas da aplicação
  .get("/", pageLanding)
  .get("/study", pageStudy)
  .get("/give-classes", pageGiveClasses)

  .listen(5500);