import { Network } from "kumiyui";

// [NOTE]:
// You should never register a network hook inside the main() function below.
// Doing so means the website will likely send requests before your hook 
// can be registered.
//
// Therefore, register hooks outside the exported function. Additionally, 
// avoid executing any async/await operations before registering the network 
// hook. If you use async/await prematurely, the website might send requests 
// to the server while the userscript is paused waiting for your promise to resolve, 
// causing those requests to completely bypass your listener.
//
// TL;DR: Register hooks synchronously at the very top of your script execution.

// for toggle situation
let is_toggled = false;

// for logger
let network_logger = null;

// try to hook, before send to server
Network.register_network_hook("before", (req) => {
  // only run when toggled
  if (!is_toggled) return;

  // get url
  const url = req.args[0]; // window.fetch(url, metadata) (args[0] query the url in this case)
  
  // print every possible request url
  console.log(url);

  // drop network request before it send to the server (the meaning of keyword "before")
  if (url === "/telemetry")
    return false; // dropping the connection 

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

    // announce user that something has been modified
    if (network_logger !== null)
      network_logger.info("network request tampered!");
})

// use for modifying data
Network.register_network_hook("after", (req, res) => {
  // only run when toggled
  if (!is_toggled) return;

  // get url
  const url = req.args[0];
  const request_body = req.args[1];

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

  if (url === "/api/user/metadata") {
    // i want to get the metadata of a different user, not this current user
    request_body.userId = "different user id";

    // after this, please don't use "return", because it will breaks all "after" hook listeners.
    // just modify the data and the framework will capture the newly modified data.
  }
})

// note: please change "network_test" to your module name!!

// since we are using js, you should use jsdoc, so that autocomplete shows all functions of "logger" variable
/**
 * @param {object} options
 * @param {Logger} options.logger
 */
export const network_test = ({ logger }) =>{
  const main = (args, toggled) => {
    // set toggle status, so that network hooks know whether they should tamper data or not
    is_toggled = toggled

    console.log("status of network_test, is_toggled:", is_toggled)
  }

  // try to register logger globally for the network to use
  network_logger = logger;

  // also please avoid performing any async/await operation before return the command metadata
  // return command metadata
  return {
    // the name of the command (it appears as the text below when using the help command)
    command_name: "network test! (test the network hooking)",
    // the main/primary command
    command: "network_test",
    // aliases, you can use these key to trigger the command
    aliases: ["network", "netwtest"],
    // describe the purpose of the command
    description: "a small test on network hooking",
    // have toggler or not
    is_toggle: true,
    // this function will be called when user uses command or through userscript's menu
    callback_fn: main
  }
}