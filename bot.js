/**
 * Copyright 2017 Jewel Mahanta
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
 * IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// const _ = require("lodash/fp");
const { join } = require("path");
const { execFile } = require("child_process");
const Discord = require("discord.js");
const config = require("./config");


/* --- Mutables --- */
let pollTimer = 0;
let lastRes = "";
/* --- */


/* --- Utility Functions --- */
/**
 * Runs the purity CLI and gets the result/error
 * @returns {Promise}
 */
const getIP = function () {
    return new Promise((resolve, reject) => {
        execFile(join(__dirname, "purity.ip/purity.network.cli.exe"), (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            resolve(stdout);
        });
    });
};

const pollHALO = function () {
    pollTimer = setTimeout(async () => {
        try {
            const res = await getIP();
            if (lastRes !== res) {
                const [ip, port] = res.split("\r\n", 2);
                if (ip === "0.0.0.0") {
                    console.log(`>> setting status to Main Menu`);
                    setStatus(client, "Halo @ Main Menu");
                } else {
                    console.log(`>> setting status to ${ip}:${port}`);
                    setStatus(client, `Halo @ ${ip}:${port}`);
                }
            }
            lastRes = res;
        } catch (err) {
            console.error("error: Halo is not running. Start Halo and run this bot again.");
            stopTracking();
        }
        pollHALO();
    }, config.POLLING_INTERVAL);
};
/* --- */


/* --- Commands --- */
const setStatus = function (client, status) {
    client.user.setGame(status);
};

const startTracking = function () {
    console.log(`>> started tracking...`);
    pollHALO();
};

const stopTracking = function () {
    console.log(`>> stopped tracking...`);
    clearTimeout(pollTimer);
    setStatus(client, "");
    lastRes = "";
    process.exit(0);
};
/* --- */


/* --- Connection --- */
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    startTracking();
});

client.login(config.DISCORD_TOKEN);
/* --- */
