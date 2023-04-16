const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// INITIALIZATION
// member_array is an array of team member objects
// team manager only needs to be added once
const member_array = []
add_member("Team Manager")

// Handles all user input
function add_member(member) {
    rl.question(`${member} name?\n>>`, function(name) {
        rl.question(`${member} ID?\n>>`, function(id) {
            rl.question(`${member} email?\n>>`, function(email) {
                // Setup for final prompt
                    let option_prompt = (member=="Intern") ? `${member} school?\n>>`
                    : (member=="Engineer") ? `${member} GitHub Username?\n>>`
                    
                    // This is the Team Manager
                    : `${member} office number?\n>>` 
                
                // Final prompt
                rl.question(`${option_prompt}`, function(option) {
                    let member_object = {
                        member: member,
                        name: name,
                        id: id,
                        email: email,
                        option: option,
                    }
                    member_array.push(member_object)
                    rl.question("1) Add an engineer\n2) Add an intern\n3) Finish\n>>", function(select_new) {
                        (select_new=="1") ? add_member("Engineer") 
                        : (select_new=="2") ? add_member("Intern")
                        // All other options will be treated as "Finish"
                        : rl.close()
                    });
                });
            });
        });
    });
}

// This function is called when the user is done adding members
rl.on("close", function() {
    let body = ""
    // Loop through each member object in the array
    for (let i=0; i<member_array.length; i++) {
        // Engineer
        body += (member_array[i].member=="Engineer") ? `<div class="card">
            <h2>${member_array[i].name} - ${member_array[i].member} 🕶</h2>
            <p>ID: ${member_array[i].id}</p>
            <p>Email: ${member_array[i].email}</p>
            <p>GitHub: ${member_array[i].option}</p>
        </div>
        `
        // Intern
        : (member_array[i].member=="Intern") ? `<div class="card">
            <h2>${member_array[i].name} - ${member_array[i].member} 🎓</h2>
            <p>ID: ${member_array[i].id}</p>
            <p>Email: ${member_array[i].email}</p>
            <p>School: ${member_array[i].option}</p>
        </div>
        `
        // Team Manager
        : `<div class="card">
            <h2>${member_array[i].name} - ${member_array[i].member} ☕</h2>
            <p>ID: ${member_array[i].id}</p>
            <p>Email: ${member_array[i].email}</p>
            <p>Office Number: ${member_array[i].option}</p>
        </div>
        `
    }
    
    // HTML template
    let html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Team</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <header>My Team</header>
        ${body}
    </body>
    </html>`

    // Write to file
    fs.writeFile("index.html", html, function(err) {
        if (err) console.log(err);
    });
    console.log("HTML file generated!");
});