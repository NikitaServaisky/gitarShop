//definition routes
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

//get all users
router.get('/', (req, res) => {
  //read file from directory
  const usersJSON = fs.readFileSync(path.join(__dirname, '../data', 'users.json'));
  // console.log(usersJSON);

  //parses data from file
  const users = JSON.parse(usersJSON);
  // console.log(users);

  //response
  res.status(200).json({ data: users, message: 'Successfully' });
});

//get one user by id
router.get('/:id', (req, res) => {
  //read file from directory
  const usersJSON = fs.readFileSync(path.join(__dirname, '../data', 'users.json'));
  // console.log(usersJSON);

  //parse data from file
  const users = JSON.parse(usersJSON);
  // console.log(users);

  //send id params from object
  const id = req.params.id;

  //find one user by id
  const user = users.find((user) => user.id.toString() === id);
  // console.log(user);
  // console.log(id);

  res.status(200).json({ data: user, message: 'Successfully' });
});

//create new user
router.post('/', (req, res) => {
  //send setings from front
  const { name, age } = req.body;

  //read file
  const usersJSON = fs.readFileSync(path.join(__dirname, '../data', 'users.json'));

  //parsing json
  const users = JSON.parse(usersJSON);

  //create new id
  const date = new Date();
  const id = date.getMilliseconds().toString();

  //create user object
  const newUser = {
    id,
    name,
    age,
  };
  //push new object to database
  users.push(newUser);
  fs.writeFileSync(path.join(__dirname, '../data', 'users.json'), JSON.stringify(users));

  //response from server
  res.status(201).json({
    data: newUser,
    message: 'Created Successfully!',
  });
});

//editing user
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  //read and parse JSON file
  const usersFilePath = path.join(__dirname, '../data', 'users.json');
  const usersJSON = fs.readFileSync(usersFilePath, 'utf-8');
  const users = JSON.parse(usersJSON);

  //get user by id
  const userIndex = users.findIndex((user) => user.id.toString() === id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
  }
  
  //update user
  const updateUser = {
    ...users[userIndex],
    ...updates,
  };

  users[userIndex] = updateUser;

  //write update users list back to file
  fs.writeFileSync(usersFilePath, JSON.stringify(users));

  res.status(200).json({
    data: updateUser,
    message: 'Updated Successfully!',
  })
})

module.exports = router;
