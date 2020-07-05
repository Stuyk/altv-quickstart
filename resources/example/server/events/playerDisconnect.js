import alt from 'alt-server';
import chalk from 'chalk';

alt.log(chalk.greenBright('Loaded: events/playerDisconnect'));
alt.on('playerDisconnect', playerDisconnect);

function playerDisconnect(player) {
    if (!player || !player.valid) {
        return;
    }

    alt.log(`${player.name} has disconnected from the server.`);
}
