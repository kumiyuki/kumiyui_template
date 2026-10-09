import { Network } from "kumiyui";

const main = (args) => {
  // try to hook, before send to server
  Network.register_network_hook("before", (req) => {
    const url = req.args[0]; // window.fetch(url, metadata) (args[0] query the url in this case)

    // drop network request before it send to the server (the meaning of keyword "before")
    if (url === "/telemetry")
      return false; // block the request to the server by return false

    // fake response from server (you might not need to send request to server if data is preditable)
    if (url === "/is_desktop")
      return {
        status: 200,
        statusText: "OK",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "is_desktop": true
        })
      }
    
    // dealing with url-encoded query string parameters
    if (url === "/url_encoded_login")
      return {
        status: 400,
        statusText: "Bad Request",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "success=false&use_modern_login_method=true" // sample response
      }
  })

  // use for modifying data
  Network.register_network_hook("after", (req, res) => {
    const url = req.args[0];

    if (url === "/api/user") {
      const res_body = res.json();

      // change to a different user privilege
      res_body.role = "root";

      // return back data to the client
      return new Response(res_body, {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  })
}

export default {
  // the main command
  command: "network_test",
  // aliases, you can use these key to trigger the command
  alt_commands: ["network", "netwtest"],
  // describe the purpose of the command
  description: "a small test on network hooking",
  // have toggler or not
  is_toggle: false, // a command to say shouldn't have toggler
  // this function will be called when user uses command or through userscript's menu
  callback_fn: main
}