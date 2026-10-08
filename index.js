import { Command, Network } from "kumiyui";

Command({
  "command": "konnichiwa",
  "alt_commands": ["hi", "konnichiwa"],
  "description": "say konnichiwa",
  "callback_fn": (args) => {
    console.log("hello");

    // network hooking
    Network.register_network_hook("before", (...args) => {
      if (args[0] === "/api/hello") {
        console.log("ok");
        return new Response(`{"ok": true}`, {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }
    })
  },
})