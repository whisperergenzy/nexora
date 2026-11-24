            if (connection === "open") {
                global._nexoraStarting = false;
                if (global.sock === sock) global.sockReady = true;

                require("./lib/scheduler").start(sock);
                
                const owner = sock.user.id.split(":")[0];

                const ownerDB = require("./lib/owner");

                const data = ownerDB.get();

                if (!data || data.botOwner !== owner) {
                    ownerDB.set(owner);
                }
