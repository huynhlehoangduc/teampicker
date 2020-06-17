class Game {

    constructor () {
        this.DELAY_TIME = 200; // 200ms
        this.KEY_EFFECT = [
            32, // space
            13, // enter
        ];

        this.teams = [ 'arsenal', 'barca', 'chelsea', 'dortmund', 'liverpool', 'mu', 'psg', 'real', 'fc-bayern', 'juventus', 'inter-milan', 'ac-milan', 'ajax-ams'];

        this.numberOfplayers = 2; 
        
        this.btnPlay = document.getElementById('btn-play');

        this.activeSoundDom = document.getElementById('active_sound');
   
        this.timeoutStack = [];

        this.slowOrFastOfSound = 'slow_down';
    }

    renderTeams () {
        for (let playerI = 1; playerI <= this.numberOfplayers; playerI++) {
            let player = `player-${playerI}`,
                playerDOM = document.getElementById(player),
                card = '';
        
            this.teams.forEach((team, index) => {
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
    
    doRoll () {
        // Refesh
        this.clearTimeoutStack();
            
        document.querySelectorAll('.team__fc.active').forEach(function (teamFC) {
            teamFC.classList.remove('active');
        });
    
        this.roll('player-1');
        this.timeoutStack.push(setTimeout(() => {
            this.roll('player-2');
        }, 150));
    }
    
    roll(player) {
        let numberOfRolls = Math.floor((Math.random() * this.teams.length)) + 20,
            previousDOM = null;
    
        for (let i = 0; i < numberOfRolls; i++) {
            let teamIndex = Math.floor((Math.random() * this.teams.length)),
                teamFC = document.querySelectorAll(`[data-${player}-index='${teamIndex}']`),
                timeOut = i * this.DELAY_TIME,
                banner = document.getElementById(player + '-banner');;
    
                /* @Todo feature slow down here
                console.log('Time out default', timeOut);
    
                if (slowOrFastOfSound === 'slow_down') {
                    timeOut = timeOut + DELAY_TIME * i;
                    console.log('Time out slowdown', timeOut);
                }*/
    
                this.timeoutStack.push(
                    setTimeout(()=>{      
                        // Check sound active then play sound
                        if (this.activeSoundDom.checked) this.playSound("./sounds/ting.mp3");
      
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
    
    playSound(src) {
        let sound = document.createElement('audio'); 
    
        sound.src = src;
        sound.play();
    }
    
    getMemoryUsedInMB (log = false) {
        let memory = 'Memory used: ' + (window.performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(3) + 'MB';
    
        if (log) console.log(memory);
    
        return memory;
    }
    
    clearTimeoutStack() {
        this.timeoutStack.forEach((timeoutStack)=> {
            clearTimeout(timeoutStack);
        });
    }

    run() {
        // Render View
        this.renderTeams();

        // Register Events
        this.btnPlay.addEventListener('click', (e) => {
            this.doRoll();
        });

        document.addEventListener('keydown', (e) => { 
            if (KEY_EFFECT.includes(e.keyCode)) {
                this.btnPlay.classList.add('active');
            }
        });

        document.addEventListener('keyup', (e) => { 
            if (KEY_EFFECT.includes(e.keyCode)) {
                this.btnPlay.classList.remove('active');
            }
        });

        document.addEventListener('keyup', (e) => {    
            if (KEY_EFFECT.includes(e.keyCode)) {
                this.doRoll();
            }
        });
    }
}