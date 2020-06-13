const DELAY_TIME = 200; // 200ms

let teams = [ 'arsenan', 'barca', 'chelsea', 'dortmund', 'liverpool', 'mu', 'psg', 'real', 'fc-bayern', 'juventus'], 
    numberOfplayers = 2, btnPlay = document.getElementById('btn-play'),
    memoryUsedDOM = document.getElementById('memory-used');

window.timeoutStack = [];

renderTeams(teams, numberOfplayers);

setInterval(() => {
    memoryUsedDOM.innerText = getMemoryUsedInMB();
}, 200);

btnPlay.addEventListener('click', () => {
    // Refesh
    clearTimeoutStack();
    
    document.querySelectorAll('.team__fc.active').forEach(function (teamFC) {
        teamFC.classList.remove('active');
    });

    roll('player-1');
    setTimeout(function () {
        roll('player-2');
    }, 150);
});

function renderTeams (teams, numberOfplayers) {
    for (let playerI = 1; playerI <= numberOfplayers; playerI++) {
        let player = `player-${playerI}`,
            playerDOM = document.getElementById(player),
            card = '';
    
        teams.forEach((team, index) => {
            let customStyle = '';

            if (['juventus', 'fc-bayern'].includes(team)) customStyle = 'background: white';

            card += `
            <div class="team__fc" data-${player}-index="${index}" data-team="${team}" style="${customStyle}">
                <img src="./img-teams/${team}.png" alt="">
            </div>
                `;
    
            playerDOM.innerHTML = card;
        });
    }
}

function roll(player) {
    let number = Math.floor((Math.random() * 20)) + teams.length,
        previousDOM = null,
        banner = document.getElementById(player + '-banner');

    for (let i = 0; i < number; i++) {
        let teamIndex = i % teams.length,
            teamFC = document.querySelectorAll(`[data-${player}-index='${teamIndex}']`);

            window.timeoutStack.push(
                setTimeout(()=>{        
                    if (previousDOM !== null) {
                        previousDOM.classList.remove('active');
                    }

                    playSound("./sounds/ting.mp3");

                    teamFC[0].classList.add("active");
                    previousDOM = teamFC[0];
                    banner.innerText = teamFC[0].getAttribute('data-team').toUpperCase();
                }, i * DELAY_TIME)
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