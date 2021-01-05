const Discord = require("discord.js");
const client = new Discord.Client();
let poll = false;
let cur_channel = "";
let pollarr = [];
let polladd = "";
let pollhasvoted = [];
let hasvoted = false;
let votearr = [];
let vote;
let tovote;
let end = false;
let a;
let maxarr = []
let b;
let c;
let d;
let chosen;
let title;
key = "!"
let owner;
//Enter your bot login info (token) here
let login_info;
function swap(arr, pos1, pos2){
    //1, 2, 3
    let tmp = arr[pos1];
    arr[pos1] = arr[pos2]
    arr[pos2] = tmp
}
client.once('ready', ()=> {
    let poll = false;
    console.log("Activated");
})
client.on("message", (msg) => {
    let content = msg.content;
    let clist = content.split("");
    if(poll){
        if(content.includes("!vote:") && !pollhasvoted.includes(msg.author.id) && !content.includes("Here are")){
            try{
            pollhasvoted.push(msg.author.id);
            clist1 = content.split(":");
            vote = clist1[1];
            vote = parseInt(vote)
            tovote = pollarr[vote];
            tovote.votes += 1;
            }
            catch{
                //pass
            }
            
           
            
        }
        if(content.includes("!create") && !content.includes("poll has")){
                //pollarr.splice(0,1)
                
                msg.channel.send("Here are your options. Type the number of your option in the chat to vote for it using '!vote:'.")
                for(i in pollarr){
                    msg.channel.send(`${i}:${pollarr[i].name}`)
                }
            }
        }
        if(content == "!close" && msg.author.id == owner  && !content.includes("poll has been activated")){
        try{
            for(i=0; i<pollarr.length; i++){
                maxarr.push(pollarr[i].votes)
            }
            chosen = Math.max.apply(null, maxarr);

            let chosenind = 0;
            for(i=0; i<pollarr.length; i++){
                if(chosen == pollarr[i].votes){
                    chosenind = i
                    break
                }
            }
            msg.channel.send(`You chose ${pollarr[chosenind].name} with ${pollarr[chosenind].votes} votes!`)
        }
        catch (Error){
            console.log("Error")
        }         
        }
        if(content.includes("!new:") && !content.includes("poll has") && owner == msg.author.id){
            user = msg.author.id;
            clist1 = content.split(":");
            polladd = {
                "name":clist1[1],
                "votes":0
            }
            pollarr.push(polladd);

        }
    if(clist.includes("!")){
        if(content == "!info"){
            msg.channel.send("Welcome to DisPoll! This program allows you to add a poll to a discord server. To create a new poll, type in the chat, '!poll:{your poll name}'");
            cur_channel = msg.channel;
            
        }
        if(content.includes("!poll:") && !content.includes('Welcome to DisPoll')){
            owner = msg.author.id
            title1 = content.split(":")
            title = title1[1]
            msg.channel.send(`${title} poll has been activated. Send in your first poll option using the format '!new:{your poll option here}'. Type '!create' to finish the poll and let people vote. Once people have voted type '!close' to close the poll.`)
            poll = true;
            cur_channel = msg.channel;
        }
    }
})


client.login(login_info)

