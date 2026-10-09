const main = (args) => {
  console.log("hello")
}

export default {
  // the main command
  command: "konnichiwa",
  // aliases, you can use these key to trigger the command
  alt_commands: ["hi", "konnichiwa"],
  // describe the purpose of the command
  description: "say konnichiwa",
  // have toggler or not
  is_toggle: false, // a command to say shouldn't have toggler
  // this function will be called when user uses command or through userscript's menu
  callback_fn: main
}