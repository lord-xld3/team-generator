const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Member {
    constructor(member) {
        this.member = member;
        this.name = null;
        this.id = null;
        this.email = null;
        this.option = null;
    }

    addMemberDetails() {
        rl.question(`${this.member} name:`, (name) => {
            rl.question(`${this.member} ID:`, (id) => {
                rl.question(`${this.member} email:`, (email) => {
                    let optionPrompt;
                    if (this.member === "Engineer") {
                        optionPrompt = `${this.member} GitHub Username:`;
                    } else if (this.member === "Intern") {
                        optionPrompt = `${this.member} school:`;
                    } else {
                        optionPrompt = `${this.member} office number:`;
                    }

                    rl.question(`${optionPrompt}`, (option) => {
                        this.name = name;
                        this.id = id;
                        this.email = email;
                        this.option = option;
                        memArray.push(this); // Store member object in memArray
                        rl.question("1) Add an engineer\n2) Add an intern\n3) Finish\n", (selectNew) => {
                            if (selectNew === "3" || selectNew === "") {
                                this.end();
                            } else if (selectNew === "1") {
                                this.addMember("Engineer");
                            } else {
                                this.addMember("Intern");
                            }
                        });
                    });
                });
            });
        });
    }

    addMember(member) {
        const newMember = new Member(member);
        newMember.addMemberDetails();
    }

    end() {
        rl.close();
        for (let i = 0; i < memArray.length; i++) {
            console.log(memArray[i]);
        }
        process.exit(0);
    }
}

const memArray = [];
const teamManager = new Member("Team Manager");
teamManager.addMemberDetails();