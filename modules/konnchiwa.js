// please change "konnichiwa" to your module name!!
import { Logger, store, Hook } from "kumiyui";

// since we are using js, you should use jsdoc, so that autocomplete shows all functions of "logger" variable
/**
 * @param {object} options
 * @param {Logger} options.logger
 */
export const konnichiwa = ({ logger }) =>{
  const main = (args) => {
    // print simple data to the log
    logger.info("ok");
    logger.debug("hi"); // should be ignored by default, because logger's level is set to "info"
    logger.warn("hello");
    logger.error("konnichiwa", "hi", 1);

    // local database
    const said_hello = store.get("said_hello_data", "not yet exist"); // if said_hello_data doesn't exist in the database, it returns "not yet exist" (the next argument)
    store.set("said_hello_data", "ok, said hello!");

    // let's hook some simple things
    Hook.hook({
      obj: window,
      prop: "isNaN",
      new_value: (value) => true, // ignores it, everything is NaN now!!!
      options: {
        // mask the hook, so that some websites with basic hook detections
        // doesn't know that this function is hooked
        mask_hook: true,
        // block website from overwriting your hook
        block_overwrite: true
      }
    })

    // as for the hook_mask...
    // this one: Hook.hook_masker()
    // it's already in the Hook.hook({}) function, where you can mask the hook with optioins.mask_hook
  }

  return {
    // the name of the command (it appears as the text below when using the help command)
    command_name: "konnichiwa (greeting in japanese)",
    // the main/primary command
    command: "konnichiwa",
    // aliases, you can use these key to trigger the command
    aliases: ["hi", "konnichiwa"],
    // describe the purpose of the command
    description: "say konnichiwa",
    // have toggler or not
    is_toggle: false, // a command to say shouldn't have toggler
    // this function will be called when user uses command or through userscript's menu
    callback_fn: main
  }
}