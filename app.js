const Employee = require('./lib/Employee.js')
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer.js");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let team = []
function Menu() {
  inquirer.prompt([
    {
    type: 'list',
    name: 'Menu',
    message: 'What would you like to do?',
    choices: ['Create Manager', 'Create Engineer', 'Create Employee', 'Create Intern', 'Finish Team']
    }
  ])
    .then(({ menu })=>{
      if (menu === 'Create Manager') {
       function manager() {
         inquirer.prompt([
           {
             type: 'input',
             name: 'name',
             message: "What is the manager's name"
            },
            {
              type: 'input',
              name: 'id',
              message: 'What is the id number of the manager?'
            },
            {
              type: 'input',
              name: 'email',
              message: 'What is the email of the manager?'
            },
            {
              type: 'input',
              name: 'officeNumber',
              message: 'What is the office number of the manager?'
            },
          ])
          .then(({ name, id, email, officeNumber })=>{
            team.push(new Manager(name, id, email, officeNumber))
          })
          Menu()
          .catch(err => console.log(err))
        }
        } else if (menu === 'Create Engineer') {
          function engineer(){
          inquirer.prompt([
            {
              type: 'input',
              name: 'name',
              message: "What is the engineer's name"
            },
            {
              type: 'input',
            name: 'id',
            message: 'What is the id number of the engineer?'
          },
          {
            // nice
            type: 'input',
            name: 'email',
            message: 'What is the email of the engineer?'
          },
          {
            type: 'input',
            name: 'github',
            message: 'What is the github account of the engineer?'
          },
        ])
          .then(({ name, id, email, github })=>{
            team.push(new Engineer(name, id, email, github))
          })
        Menu()
          .catch(err => console.log(err))
        }
        }
      else if (menu === 'Create Employee') {
        function employee(){
        inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: "What is the employee's name"
          },
          {
            type: 'input',
            name: 'id',
            message: 'What is the id number of the employee?'
          },
          {
            type: 'input',
            name: 'email',
            message: 'What is the email of the employee?'
          },
        ])
          .then(({ name, id, email })=>{
            team.push(new Employee(name, id, email))
          })
        Menu()
          .catch(err => console.log(err))
        }
        }
      else if (menu === 'Create Intern') {
        function intern(){
        inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: "What is the intern's name"
          },
          {
            type: 'input',
            name: 'id',
            message: 'What is the id number of the intern?'
          },
          {
            type: 'input',
            name: 'email',
            message: 'What is the email of the intern?'
          },
          {
            type:'input',
            name:'school',
            message:'Which school does the intern attend?'
          }
        ])
          .then(({ name, id, email, school})=>{
            team.push(new Intern(name, id, email, school))
          })
        Menu()
          .catch(err => console.log(err))
        }
        }

      else if (menu === 'Finish Team') {
        function Finish(){
        inquirer.prompt([
          {
            type: 'list',
            name: 'finish',
            choices: ['Yes', 'No'],
            message: 'Are you sure you want to finish and create the html for your team?'
          }
        ])
          .then(({ finish })=>{
            if (finish === 'Yes') {
              fs.writeFile(path.join(__dirname, 'output', 'team.html'))
            } else if (finish === 'No') {
              Menu()
            }
          })
          .catch(err => console.log(err))
        }
        }
    })
    .catch(err => console.log(err))
}

Menu()


  // After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
