import alt from 'alt-server';
import chalk from 'chalk';
import { randomPositionAround } from '../utility/vector';
import { DEFAULT_CONFIG } from '../configuration/config';

alt.log(chalk.greenBright('Loaded: events/playerConnect'));
alt.on('playerConnect', playerConnect);

function playerConnect(player) {
    alt.log(`${player.name} has connected to the server.`);
    alt.emitClient(player, 'chat:Init');
    const randomModelNumber = Math.floor(Math.random() * DEFAULT_CONFIG.RANDOM_PLAYER_MODELS.length);
    const randomModel = DEFAULT_CONFIG.RANDOM_PLAYER_MODELS[randomModelNumber];
    const randomPosition = randomPositionAround(DEFAULT_CONFIG.SPAWN, DEFAULT_CONFIG.SPAWN_RANGE);

    // Set Model, Set Spawn, Send Message
    player.model = randomModel;
    player.spawn(randomPosition.x, randomPosition.y, randomPosition.z, 0);
    player.send(`Welcome to the server!`);
}
