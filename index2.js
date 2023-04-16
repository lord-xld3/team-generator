//#region RUN PROGRAM
    const fs = require("fs");
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const member_array = [] // member_array is an array of team member objects
    const member_types = [] // member_types is an array of objects that contain the member type and an array of prompts

    // for each member you want to add, use memberProperties(member type, [prompts...])
    // the prompt is also the identifier used in the HTML template
    memberProperties("Team Manager",["Name:","ID:","Email:","Office Number:"])
    memberProperties("Engineer",["Name:","ID:","Email:","GitHub Username:"])
    memberProperties("Intern",["Name:","ID:","Email:","School:"])

    /* Using functions here is just faster to type than adding a new object to the array every time you want to add a new member type
    for example, we could do this instead:

        memberTypeArray = [
            {
                member: "Team Manager",
                props: ["Name:","ID:","Email:","Office Number:"]
            }
            {
                member: "Engineer",
                props: ["Name:","ID:","Email:","GitHub Username:"]
            }
            ...etc
        ]
    */

    var selection_prompt = "" // This prompt allows the user to select which member type to add
    initPrompt() // This function initializes the member type selection prompt
    showPrompt(selection_prompt) // This function shows the member type selection prompt
//#endregion

// Create each member type
function memberProperties(member,args) {
    member_typeObject = {
        member: member,
        props: args
    }
    member_types.push(member_typeObject)
}

// This function initializes the member type selection prompt
function initPrompt() {
    for (let i=0; i<member_types.length; i++) {
        selection_prompt += `${i+1}) Add a ${member_types[i].member}\n`
    }
    selection_prompt += `${member_types.length+1}) Finish\n>>`
}

// This function shows the member type selection prompt
function showPrompt(prompt) {
    rl.question(prompt, function(select_new) {
        if (select_new==member_types.length+1 || select_new>member_types.length+1 || select_new<1 || select_new=="") {
            rl.close()
        } else {
            add_member(member_types[select_new-1].member)
        }
    });
}

function add_member(member) {
    // We already know the member here, but we need the member type to get the prompts
    for (let i=0; i<member_types.length; i++) {
        if (member==member_types[i].member) {
            let memberData = {
                member: member,
                data: []
            }
            // Show prompts to add member data
            recursive_prompt(memberData,i,0)
        }
    }
}

function recursive_prompt(memberData,i,j) {
    // Make sure prompt does not go out of bounds
    if (j<member_types[i].props.length) {
        rl.question(member_types[i].props[j], function(data) {
            memberData.data.push(data)
            // Manual iteration, can't use a for loop
            j++
            recursive_prompt(memberData,i,j)
        });
    } else if (memberData!="") {
        member_array.push(memberData)
        // Because we are using recursion and cannot escape, we need to empty the data after use
        memberData = ""
        // It will call this function, but it can't do it until the recursion is done
        showPrompt(selection_prompt)
    }
}


// This function is called when the user is done adding members
rl.on("close", function() {
    let body = ""
    // Starting simple, loop through each member you added
    for (let i=0; i<member_array.length; i++) {
        // Now find the type of member you are working with
        let member = member_array[i]
        for (let j=0; j<member_types.length; j++) {
            if (member.member==member_types[j].member) {
                let data = ""
                // Get the properties of this member type
                for (let k=0; k<member_types[j].props.length; k++) {
                    // Create a paragraph for each property
                    data += `
            <p>${member_types[j].props[k]} ${member.data[k]}</p>`
                }
                // Create a card for each member
                body += `
        <div class="card">
            <h2>${member.member}</h2>${data}
        </div>`
            }
        }
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
        <header>My Team</header>${body}
    </body>
    </html>`

    // Write to file
    fs.writeFile("index.html", html, function(err) {
        if (err) console.log(err);
    });
    console.log("HTML file generated!");
});