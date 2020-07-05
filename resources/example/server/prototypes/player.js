import alt from 'alt-server';

/**
 * This is how you properly extend player functionality within the resource.
 * Prototyping is super simple but super useful.
 */

alt.Player.prototype.send = function send(msg) {
    alt.emitClient(this, 'chat:Send', msg);
};

alt.Player.prototype.emit = function emit(emitRoute, ...args) {
    alt.emitClient(this, emitRoute, ...args);
};
