import alt from 'alt-server';

let commands = {};

alt.onClient('chat:Send', chatSend);

/**
 * Register commands for players to use.
 * @param  {string} commandName
 * @param  {string} description
 * @param  {Function} callback
 */
export function registerCmd(commandName, description, callback) {
    commandName = commandName.toLowerCase();
    if (commands[commandName] !== undefined) {
        alt.logError(`Failed to register command /${commandName}, already registered`);
        return;
    }

    commands[commandName] = {
        callback,
        description
    };
}

function invokeCmd(player, commandName, args) {
    commandName = commandName.toLowerCase();
    if (!commands[commandName]) {
        player.send(`{FF0000} Unknown command /${commandName}`);
        return;
    }

    const callback = commands[commandName].callback;
    if (typeof callback !== 'function') {
        player.send(`{FF0000} Unknown command /${commandName}`);
        return;
    }

    callback(player, args);
}

function chatSend(player, msg) {
    if (msg[0] === '/') {
        alt.log(`[Command] ${player.name} ${msg}`);
        msg = msg.trim().slice(1);

        if (msg.length > 0) {
            let args = msg.split(' ');
            let commandName = args.shift();
            invokeCmd(player, commandName, args);
        }
        return;
    }

    msg = msg.trim();
    if (msg.length <= 0) {
        return;
    }

    alt.log(`[Message] ${player.name}: ${msg}`);

    // Cleanse Message
    msg = msg
        .replace(/</g, '&lt;')
        .replace(/'/g, '&#39')
        .replace(/"/g, '&#34');

    alt.emitClient(null, 'chat:Send', `${player.name} says: ${msg}`);
}
