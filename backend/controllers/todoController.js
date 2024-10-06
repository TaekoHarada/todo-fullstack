import Todo from "../models/Todo.js";

// Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find(); // Retrieves all todos from the MongoDB collection
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title,
    });
    const savedTodo = await newTodo.save(); // Saves the new todo in the MongoDB collection
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id); // Deletes a todo by its ID
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed }, // Updates the 'completed' status
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
