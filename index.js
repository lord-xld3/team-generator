const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function add_member(member){
    rl.question(`${member} name:`, function(name) {
        rl.question(`${member} ID:`, function(id) {
            rl.question(`${member} email:`, function(email) {
                if (member=="Engineer") {
                    var option_prompt = `${member} GitHub Username:`
                } else if (member=="Intern") {
                    var option_prompt = `${member} school:`
                } else {
                    var option_prompt = `${member} office number:`
                }
                rl.question(`${option_prompt}`, function(option) {
                    let mem_object = {
                        member: member,
                        name: name,
                        id: id,
                        email: email,
                        option: option,
                    }
                    mem_array.push(mem_object)
                    rl.question("1) Add an engineer\n2) Add an intern\n3) Finish\n", function(select_new) {
                        if (select_new=="3" || "") {
                            rl.close()
                            end()
                        } else if (select_new=="1") {
                            add_member("Engineer")
                        } else {
                            add_member("Intern")
                        }
                    });
                });
            });
        });
    });
}

const mem_array = []
add_member("Team Manager")


function end() {
    for (let i=0; i<mem_array.length; i++) {
        console.log(mem_array[i])
    }
    process.exit(0);
};