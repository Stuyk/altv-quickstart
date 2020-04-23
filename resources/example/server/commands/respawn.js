import { registerCmd } from '../systems/chat';
import { DEFAULT_CONFIG } from '../configuration/config';
import { randomPositionAround } from '../utility/vector';

registerCmd('respawn', '/respawn | Respawn the player at spawn.', handleRespawn);
registerCmd('spawn', '/spawn | Respawn the player at spawn.', handleRespawn);

function handleRespawn(player) {
    const randomPosition = randomPositionAround(DEFAULT_CONFIG.SPAWN, DEFAULT_CONFIG.SPAWN_RANGE);
    player.spawn(randomPosition.x, randomPosition.y, randomPosition.z, 0);
    player.send(`You were respawned.`);
}
