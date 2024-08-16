// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Card, CardContent, CardActions, List, ListItem, ListItemText, IconButton, Grid } from '@mui/material';
import { Delete, CheckCircle } from '@mui/icons-material';
import api from '../api'; // Import the Axios instance

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [missedTasks, setMissedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskDueTime, setNewTaskDueTime] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks/all');
        setTasks(response.data);

        const missedResponse = await api.get('/tasks/missed');
        setMissedTasks(missedResponse.data);

        const completedResponse = await api.get('/tasks/completed');
        setCompletedTasks(completedResponse.data);

      } catch (error) {
        console.error('Failed to fetch tasks:', error.response?.data?.message || error.message);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    try {
      const newTask = {
        title: newTaskTitle,
        description: newTaskDescription,
        dueDate: newTaskDueDate,
        dueTime: newTaskDueTime
      };
      const response = await api.post('/tasks/add', newTask);
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskDueDate('');
      setNewTaskDueTime('');
    } catch (error) {
      console.error('Failed to add task:', error.response?.data?.message || error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/delete/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
      setMissedTasks(missedTasks.filter(task => task._id !== taskId));
      setCompletedTasks(completedTasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error.response?.data?.message || error.message);
    }
  };

  const handleMarkAsDone = async (taskId) => {
    try {
      const response = await api.patch(`/tasks/done/${taskId}`);
      setTasks(tasks.map(task => (task._id === taskId ? response.data : task)));
      setMissedTasks(missedTasks.map(task => (task._id === taskId ? response.data : task)));
      setCompletedTasks([...completedTasks, response.data]);
    } catch (error) {
      console.error('Failed to mark task as done:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" component="div" gutterBottom style={{ marginBottom: '20px', textAlign: 'center' }}>
        Welcome!
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Add New Task
              </Typography>
              <TextField
                margin="normal"
                fullWidth
                label="Title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                margin="normal"
                fullWidth
                type="date"
                label="Due Date"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
                style={{ marginBottom: '10px' }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                margin="normal"
                fullWidth
                type="time"
                label="Due Time"
                value={newTaskDueTime}
                onChange={(e) => setNewTaskDueTime(e.target.value)}
                style={{ marginBottom: '20px' }}
                InputLabelProps={{ shrink: true }}
              />
              <CardActions>
                <Button
                  onClick={handleAddTask}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Add Task
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                All Tasks
              </Typography>
              <List>
                {tasks.map(task => (
                  <ListItem key={task._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <ListItemText primary={task.title} secondary={task.description} />
                    <div>
                      <IconButton onClick={() => handleMarkAsDone(task._id)} disabled={task.completed}>
                        <CheckCircle color={task.completed ? 'disabled' : 'primary'} />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteTask(task._id)}>
                        <Delete color="error" />
                      </IconButton>
                    </div>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Missed Tasks
              </Typography>
              <List>
                {missedTasks.map(task => (
                  <ListItem key={task._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <ListItemText primary={task.title} secondary={task.description} />
                    <div>
                      <IconButton onClick={() => handleMarkAsDone(task._id)} disabled={task.completed}>
                        <CheckCircle color={task.completed ? 'disabled' : 'primary'} />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteTask(task._id)}>
                        <Delete color="error" />
                      </IconButton>
                    </div>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Completed Tasks
              </Typography>
              <List>
                {completedTasks.map(task => (
                  <ListItem key={task._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <ListItemText primary={task.title} secondary={task.description} />
                    <div>
                      <IconButton onClick={() => handleDeleteTask(task._id)}>
                        <Delete color="error" />
                      </IconButton>
                    </div>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default TaskList;
