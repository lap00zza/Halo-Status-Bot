# Halo Status Bot
A simple bot for [Discord](https://discordapp.com) that sets which Halo CE server you are playing in as your status. A special thanks to [@yumiris](https://github.com/yumiris) for providing the the IP address retrieval component of the Purity Library.

## Steps
```bash
$ git clone https://github.com/lap00zza/Halo-Status-Bot.git
$ cd Halo Status Bot

# Edit "config.sample.js" and rename it to "config.js"
$ vim config.sample.js
$ mv config.sample.js config.js

# Run the bot
$ node bot.js
```

## Commands
Commands                  | Explanation
--------------------------|------------
`!ping`                   | PONG!!!
`!status YOUR_STATUS_TEXT`| To manually set your status
`!start`                  | To start tracking your Halo server
`!stop`                   | To stop tracking your Halo server

## License
[MIT](https://github.com/lap00zza/Halo-Status-Bot/blob/master/LICENSE)

Copyright (c) 2017 Jewel Mahanta
