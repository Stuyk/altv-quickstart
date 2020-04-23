import * as alt from 'alt';
import chalk from 'chalk';

alt.log(chalk.greenBright('Loaded: events/playerDisconnect'));
alt.on('playerDisconnect', playerDisconnect);

function playerDisconnect(player) {
    if (!player || !player.valid) {
        return;
    }

    alt.log(`${player.name} has disconnected from the server.`);
}
