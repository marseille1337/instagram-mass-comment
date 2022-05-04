const { createCursor } = require('ghost-cursor-playwright')
const cluster = require('cluster')
const axios = require('axios')
const { firefox } = require('playwright')
const prompt = require('prompt-sync')({ sigint: true })
fs = require('fs');

var sent = 0;

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

process.title = 'IG Booster | Comments Sent: '+sent;

intro = 
` 
██▓  ▄████     ▄▄▄▄    ▒█████   ▒█████    ██████ ▄▄▄█████▓▓█████  ██▀███  
▓██▒ ██▒ ▀█▒   ▓█████▄ ▒██▒  ██▒▒██▒  ██▒▒██    ▒ ▓  ██▒ ▓▒▓█   ▀ ▓██ ▒ ██▒
▒██▒▒██░▄▄▄░   ▒██▒ ▄██▒██░  ██▒▒██░  ██▒░ ▓██▄   ▒ ▓██░ ▒░▒███   ▓██ ░▄█ ▒
░██░░▓█  ██▓   ▒██░█▀  ▒██   ██░▒██   ██░  ▒   ██▒░ ▓██▓ ░ ▒▓█  ▄ ▒██▀▀█▄  
░██░░▒▓███▀▒   ░▓█  ▀█▓░ ████▓▒░░ ████▓▒░▒██████▒▒  ▒██▒ ░ ░▒████▒░██▓ ▒██▒
░▓   ░▒   ▒    ░▒▓███▀▒░ ▒░▒░▒░ ░ ▒░▒░▒░ ▒ ▒▓▒ ▒ ░  ▒ ░░   ░░ ▒░ ░░ ▒▓ ░▒▓░
 ▒ ░  ░   ░    ▒░▒   ░   ░ ▒ ▒░   ░ ▒ ▒░ ░ ░▒  ░ ░    ░     ░ ░  ░  ░▒ ░ ▒░
 ▒ ░░ ░   ░     ░    ░ ░ ░ ░ ▒  ░ ░ ░ ▒  ░  ░  ░    ░         ░     ░░   ░ 
 ░        ░     ░          ░ ░      ░ ░        ░              ░  ░   ░     
                     ░                                                     
                                             
      https://github.com/marseille1337/instagram-mass-comment/

`

;(async () => {
    if(cluster.isMaster) {
        console.clear()
        console.log('\x1b[35m%s\x1b[0m', (intro));
        var threads = parseInt(prompt('\x1b[35mIG Booster | Threads -> \x1b[0m'))
        for (var i = 0; i < threads; i++) {
            cluster.fork()
        }
    } else {
        await booster()
    }

})()

async function booster() {

    const browser = await firefox.launch({ headless: false }) //You can set to "true", then it won't show the browser
    var page = await browser.newPage()
    const cursor = await createCursor(page)

    await page.goto('Instagram post link'); #Paste your post link
    await page.click('text=Allow essential and optional cookies');
    console.log('\x1b[35mIG Booster | Accepted the cookies')
    await sleep(5000);
    console.log('\x1b[35mIG Booster | Logging in')
    await page.fill('[aria-label="Phone number, username, or email"]', 'Instagram username or email'); //Paste your account email / username
    await page.fill('[aria-label="Password"]', 'Instagram password'); //Paste your account password
    await page.click('text=Log In');
    console.log('\x1b[35mIG Booster | Logged in!')
    await page.click('text=Not Now');
    await page.click('[data-testid="post-comment-text-area"]');
    await page.fill('[data-testid="post-comment-text-area"]', "Your comment / @massMention"); //Paste here your comment
    await page.click('[data-testid="post-comment-input-button"]');
    console.log('\x1b[35mIG Booster | Succesfully commented')
    process.send({ created: "+1" })
}
