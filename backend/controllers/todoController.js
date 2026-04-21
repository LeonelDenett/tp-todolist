const Todo = require('../models/todo');

// Liste toutes les tâches
exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.findAll({ order: [['createdAt', 'DESC']] });
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

// Récupère une tâche par ID
exports.getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

// Crée une nouvelle tâche
exports.createTodo = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Le titre est obligatoire' });
    }
    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({ error: 'Priorité invalide' });
    }
    const todo = await Todo.create({
      title,
      description,
      priority: priority || 'medium',
      dueDate
    });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

// Modifie une tâche
exports.updateTodo = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({ error: 'Priorité invalide' });
    }
    if (title !== undefined && !title) {
      return res.status(400).json({ error: 'Le titre est obligatoire' });
    }
    await todo.update({
      title: title !== undefined ? title : todo.title,
      description: description !== undefined ? description : todo.description,
      priority: priority !== undefined ? priority : todo.priority,
      dueDate: dueDate !== undefined ? dueDate : todo.dueDate,
      completed: completed !== undefined ? completed : todo.completed
    });
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

// Supprime une tâche
exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
    await todo.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// Marque une tâche comme terminée ou non
exports.toggleCompleted = async (req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    next(err);
  }
};
