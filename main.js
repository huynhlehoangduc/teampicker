let teams = [
    'arsenan', 'barca', 'chelsea', 'dortmund', 'liverpool', 'mu', 'psg', 'real'
], numberOfplayers = 2, btnPlay = document.getElementById('btn-play');

renderTeams(teams, numberOfplayers);

btnPlay.addEventListener('click', () => {
    // Refesh
    document.querySelectorAll('.team__fc.active').forEach(function (teamFC) {
        teamFC.classList.remove('active');
    });

    roll('player-1');
    roll('player-2');
});

function renderTeams (teams, numberOfplayers) {
    for (let playerI = 1; playerI <= numberOfplayers; playerI++) {
        let player = `player-${playerI}`,
            playerDOM = document.getElementById(player),
            card = '';
    
        teams.forEach((team, index) => {
            card += `
            <div class="team__fc" data-${player}-index="${index}" data-team="${team}">
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

        setTimeout(()=>{        
            if (previousDOM !== null) {
                previousDOM.classList.remove('active');
            }

            teamFC[0].classList.add("active");
            previousDOM = teamFC[0];
            banner.innerText = teamFC[0].getAttribute('data-team').toUpperCase();
        }, i * 200);
    }
}