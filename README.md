### Want to start with alt:V Fast?

---

This repo will do everything for you; including download the latest server files.
It's quite easy.

Here's what you do.

```
0. Open a command prompt in a folder.

1. Copy the URL

2. Type `git clone <url_goes_here>`

3. Wait for files to download.

4. Type `npm run update`.
   5.1. This can be used whenever you need to update your server files.
   5.2. Follow the instructions on screen.

5. Run `altv-server.exe` OR `./start.sh` if you're on linux.
   5.1. Try running these from console; it gives a better experience.
   5.2. Double Tip; Use VSCode's built in command line to run it by pressing `Ctrl + Shift + ``
   5.3. Press Ctrl + C to stop the server.
```

### Useful Links

[alt:V Getting Started Guide](https://wiki.altv.mp/Tutorial_Getting_Started)
[alt:V JS Tutorial Series](https://www.youtube.com/watch?v=sMWCcTv4kqY&list=PLBNRUifAMZ-MzLjb-lzOTJy-PyuN6ffgw)
[alt:V Natives Repo](https://natives.altv.mp)
[alt:V JS Docs](https://altmp.github.io/altv-typings/modules/_alt_server_.html)
[alt:V Wiki](http://wiki.altv.mp/)
[alt:V O:RP Resource](https://github.com/Stuyk/altV-Open-Roleplay-altLife-Official)
[alt:V Auto Complete for VSCode](https://marketplace.visualstudio.com/items?itemName=stuyk.atlv-complete)
[alt:V Attack and Defense](https://github.com/Stuyk/altV-Attack-Defense)

### Other Useful Info

Adding Typings Naturally to the Project:

1. Run the following where your package.json is.

```
npm i -D @altv/native-types
```

2. Replace current imports with these special imports.
   2.1 For Server:

```
/// <reference types="@altv/types" />
import * as alt from 'alt-server'
```

    2.2 For Client:

```
/// <reference types="@altv/types" />
import * as alt from 'alt-client'
```
