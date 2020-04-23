let chatOpened = false;
let buffer = [];
let currentBufferIndex = -1;
let timeout = null;
let messagesBlock = null;
let msgListBlock = null;
let msgInputBlock = null;
let msgInputLine = null;

if (window.alt === undefined) {
    window.alt = {
        emit: () => {},
        on: () => {}
    };
}

function colorify(text) {
    let matches = [];
    let m = null;
    let curPos = 0;

    if (!text) {
        return;
    }

    do {
        m = /\{[A-Fa-f0-9]{3}\}|\{[A-Fa-f0-9]{6}\}/g.exec(text.substr(curPos));

        if (!m) {
            break;
        }

        matches.push({
            found: m[0],
            index: m['index'] + curPos
        });

        curPos = curPos + m['index'] + m[0].length;
    } while (m != null);

    if (matches.length > 0) {
        text += '</font>';

        for (let i = matches.length - 1; i >= 0; --i) {
            let color = matches[i].found.substring(1, matches[i].found.length - 1);
            let insertHtml = (i != 0 ? '</font>' : '') + '<font color="#' + color + '">';
            text =
                text.slice(0, matches[i].index) +
                insertHtml +
                text.slice(matches[i].index + matches[i].found.length, text.length);
        }
    }

    return text;
}

function checkOverflow() {
    if (messagesBlock.clientHeight > msgListBlock.clientHeight) {
        if (!msgListBlock.classList.contains('overflowed')) {
            msgListBlock.classList.add('overflowed');
        }
    } else if (msgListBlock.classList.contains('overflowed')) {
        msgListBlock.classList.remove('overflowed');
    }
}

function openChat(insertSlash) {
    clearTimeout(timeout);

    if (!chatOpened) {
        document.querySelector('.chatbox').classList.add('active');

        if (insertSlash) {
            msgInputLine.value = '/';
        }

        msgInputBlock.style.display = 'block';
        msgInputBlock.style.opacity = 1;
        msgInputLine.focus();

        chatOpened = true;
    }
}

function closeChat() {
    if (chatOpened) {
        document.querySelector('.chatbox').classList.remove('active');

        msgInputLine.blur();
        msgInputBlock.style.display = 'none';

        chatOpened = false;
    }
}

window.addEventListener('load', () => {
    messagesBlock = document.querySelector('.messages');
    msgListBlock = document.querySelector('.msglist');
    msgInputBlock = document.querySelector('.msginput');
    msgInputLine = document.querySelector('.msginput input');

    document.querySelector('#message').addEventListener('submit', e => {
        e.preventDefault();

        alt.emit('chatmessage', msgInputLine.value);

        saveBuffer();
        closeChat();

        msgInputLine.value = '';
    });

    msgInputLine.addEventListener('keydown', e => {
        if (e.keyCode === 9) {
            e.preventDefault();
        } else if (e.keyCode == 40) {
            e.preventDefault();

            if (currentBufferIndex > 0) {
                loadBuffer(--currentBufferIndex);
            } else if (currentBufferIndex == 0) {
                currentBufferIndex = -1;
                msgInputLine.value = '';
            }
        } else if (e.keyCode == 38) {
            e.preventDefault();

            if (currentBufferIndex < buffer.length - 1) {
                loadBuffer(++currentBufferIndex);
            }
        }
    });

    alt.emit('chatloaded');
});

function saveBuffer() {
    if (buffer.length > 100) {
        buffer.pop();
    }

    buffer.unshift(msgInputLine.value);
    currentBufferIndex = -1;
}

function loadBuffer(idx) {
    msgInputLine.value = buffer[idx];
}

function highlightChat() {
    msgListBlock.scrollTo({
        left: 0,
        top: msgListBlock.scrollHeight,
        behaviour: 'smooth'
    });

    document.querySelector('.chatbox').classList.add('active');

    clearTimeout(timeout);
    timeout = setTimeout(() => document.querySelector('.chatbox').classList.remove('active'), 4000);
}

function appendMessage(text) {
    if (text.includes('{') && text.includes('}')) {
        text = colorify(text);
    }

    if (messagesBlock.children.length > 100) {
        messagesBlock.removeChild(messagesBlock.children[0]);
    }

    const msg = document.createElement('p');
    msg.innerHTML = text;
    messagesBlock.appendChild(msg);

    checkOverflow();
    highlightChat();
}

alt.on('appendMessage', text => appendMessage(text));
alt.on('openChat', openChat);
alt.on('closeChat', closeChat);
