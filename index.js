const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

//Middleware que verifica se o projeto com id informado existe
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }

  return next();
}

//Middleware que mostra no console o número de requisições
function countRequest(req, res, next) {
  console.count("Número de requisições");

  return next();
}

server.use(countRequest);

//Criando um project
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

//Adiciona uma nova tasks
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

//Listar projects e tarefas dos projects
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//Altera o title do project através do id
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

//Alterar o título do projeto com o id
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

//Deleta um project
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectId = projects.findIndex(p => p.id == id);

  projects.splice(projectId, 1);

  return res.send("Sucess deleted project!");
});

server.listen(3000);
