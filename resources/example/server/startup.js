/// <reference types="@altv/types-server" />
import alt from 'alt-server';
import chalk from 'chalk';

// alt:V Files to Load
// Commands
import './commands/respawn';
import './commands/utility';
import './commands/vehicle';
import './commands/weapon';

// Configuration Files
import './configuration/config';

// Events
import './events/playerConnect';
import './events/playerDeath';
import './events/playerDisconnect';

// Prototypes
import './prototypes/player';

// Systems
import './systems/chat';

// Utility
import './utility/array';
import './utility/vector';

alt.log(chalk.cyanBright('The resource has now started! PogChamp'));
