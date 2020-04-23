import { registerCmd } from '../systems/chat';
import { HASH_BY_NAME } from '../gamedata/weapons';

registerCmd('weapon', '/weapon <name> | Summon a weapon by name.', summonWeapon);
registerCmd('wep', '/wep <name> | Summon a weapon by name.', summonWeapon);
registerCmd('addwep', '/addwep <name> | Summon a weapon by name.', summonWeapon);

function summonWeapon(player, args) {
    if (!args || !args[0]) {
        player.send(`/weapon <name>`);
        return;
    }

    const weaponName = args[0];
    if (!Object.keys(HASH_BY_NAME).includes(weaponName)) {
        player.send(`{FF0000}${args[0]} is not a valid weapon.`);
        return;
    }

    player.giveWeapon(HASH_BY_NAME[weaponName], 999, true);
}
