import alt from 'alt-server';
import { registerCmd } from '../systems/chat';
import { getForwardVectorServer } from '../utility/vector';

registerCmd('vehicle', '/vehicle <name> | Summons a vehicle in front of a player.', handleAddVehicle);

function handleAddVehicle(player, args) {
    if (!args || !args[0]) {
        player.send(`/vehicle <name>`);
        return;
    }

    if (player.lastVehicle && player.lastVehicle.valid) {
        player.lastVehicle.destroy();
    }

    const vehicleName = args[0];
    const fwdVector = getForwardVectorServer(player.rot);
    const positionInFront = {
        x: player.pos.x + fwdVector.x * 4,
        y: player.pos.y + fwdVector.y * 4,
        z: player.pos.z
    };

    try {
        player.lastVehicle = new alt.Vehicle(
            vehicleName,
            positionInFront.x,
            positionInFront.y,
            positionInFront.z,
            0,
            0,
            0
        );

        player.send(`{00FF00}${vehicleName} was successfully spawned.`);
    } catch (err) {
        player.send(`{FF0000}${vehicleName} is not a valid vehicle name.`);
    }
}
