// Installation
const DELAY_TIME = 200, // 200ms
    KEY_EFFECT = [
        32, // space
        13, // enter
    ];

let teams = [ 'arsenal', 'barca', 'chelsea', 'dortmund', 'liverpool', 'mu', 'psg', 'real', 'fc-bayern', 'juventus', 'inter-milan', 'ac-milan', 'ajax-amsterdam'], 
    numberOfplayers = 2, btnPlay = document.getElementById('btn-play'),
    memoryUsedDOM = document.getElementById('memory-used'),
    activeSoundDom = document.getElementById('active_sound'),
    slowOrFastOfSound = 'slow_down';

window.timeoutStack = [];

// Render View
renderTeams(teams, numberOfplayers);

// Register Events
btnPlay.addEventListener('click', (e) => {
    doRoll();
});

document.addEventListener('keydown', function(e){ 
    if (KEY_EFFECT.includes(e.keyCode)) {
        btnPlay.classList.add('active');
    }
});

document.addEventListener('keyup', function(e){ 
    if (KEY_EFFECT.includes(e.keyCode)) {
        btnPlay.classList.remove('active');
    }
});

document.addEventListener('keyup', function (e) {    
    if (KEY_EFFECT.includes(e.keyCode)) {
        console.log('Do roll! + key code: ' + e.keyCode);
        console.log(e);
        doRoll();
    }
});


function renderTeams (teams, numberOfplayers) {
    for (let playerI = 1; playerI <= numberOfplayers; playerI++) {
        let player = `player-${playerI}`,
            playerDOM = document.getElementById(player),
            card = '';
    
        teams.forEach((team, index) => {
            let customStyle = '';

            if (['juventus', 'fc-bayern', 'inter-milan', 'ac-milan'].includes(team)) customStyle = 'background: white';

            card += `
            <div class="team__fc" data-${player}-index="${index}" data-team="${team}" style="${customStyle}">
                <img src="./img-teams/${team}.png" alt="">
            </div>
                `;
    
            playerDOM.innerHTML = card;
        });
    }
}

function doRoll () {
    // Refesh
    clearTimeoutStack();
        
    document.querySelectorAll('.team__fc.active').forEach(function (teamFC) {
        teamFC.classList.remove('active');
    });

    roll('player-1');
    window.timeoutStack.push(setTimeout(function () {
        roll('player-2');
    }, 150));
}

function roll(player) {
    let numberOfRolls = Math.floor((Math.random() * teams.length)) + 20,
        previousDOM = null,
        banner = document.getElementById(player + '-banner');

        console.log(player);

    for (let i = 0; i < numberOfRolls; i++) {
        let teamIndex = Math.floor((Math.random() * teams.length)),
            teamFC = document.querySelectorAll(`[data-${player}-index='${teamIndex}']`),
            timeOut = i * DELAY_TIME;

            // @Todo feature slow down here
            // console.log('Time out default', timeOut);

            // if (slowOrFastOfSound === 'slow_down') {
            //     timeOut = timeOut + DELAY_TIME * i;
            //     console.log('Time out slowdown', timeOut);
            // }

            window.timeoutStack.push(
                setTimeout(()=>{      
                    // Check sound active then play sound
                    if (activeSoundDom.checked) playSound("./sounds/ting.mp3");
  
                    // Remove active for previous roll
                    if (previousDOM !== null) previousDOM.classList.remove('active');
                    // Add class active for rolling now
                    teamFC[0].classList.add("active");

                    // Set for previous DOM
                    previousDOM = teamFC[0];

                    // Set display text
                    banner.innerText = teamFC[0].getAttribute('data-team').toUpperCase();
                }, 
                timeOut)
        );
    }
}

function playSound(src) {
    let sound = document.createElement('audio'); 

    sound.src = src;
    sound.play();
}

function getMemoryUsedInMB (log = false) {
    let memory = 'Memory used: ' + (window.performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(3) + 'MB';

    if (log) console.log(memory);

    return memory;
}

function clearTimeoutStack() {
    window.timeoutStack.forEach((timeoutStack)=> {
        clearTimeout(timeoutStack);
    });
}