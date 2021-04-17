const express = require('express');
const app = express();
const uuid = require('uuid');
const Port = process.env.Port || 4000;
app.listen(Port, () => console.log(`Server started on port ${Port}`));
const fs = require('fs');

//Array for members

const json_read_members = fs.readFileSync('members.json', 'utf-8');
const members = JSON.parse (json_read_members);

// Body Parser 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Register Member
app.post('/api/register', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }
  members.push(newMember);
  const json_members = JSON.stringify(members);
  fs.writeFileSync('members.json', json_members, 'utf-8');
  res.send({ msg: "User registered"});

});


// Member Login  
app.put('/api/login', (req, res) => {
const found = members.some(members => 
 members.email === req.body.email && members.password === req.body.password
);
console.log(req.body.username);
console.log(found);
if (found) {
  res.status(200).json({ msg: "User found, login successful!" });
  }else {
  res.status(400).json({ msg: "User not Found" });
  } 
});

