import { Command, store, Network } from "kumiyui";

Command({
  "command": "konnichiwa",
  "alt_commands": ["hi", "konnichiwa"],
  "description": "say konnichiwa",
  "is_toggle": false, // a command to say shouldn't have toggler
  "callback_fn": (args, toggled) => {
    console.log("hello", args);
    console.log("toggled?", toggled);

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

    // storage
    // note: requires "grant": ["GM_setValue", "GM_getValue"] (in package.json)
    const data = store.get("data") ?? "";

    // validate data
    const valid_data = Network.is_json(data);
    console.log(valid_data);

    // update storage
    store.set("data", `{"ok": true}`);
  },
})