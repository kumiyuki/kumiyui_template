import { Command, Logger } from "kumiyui";
import { konnichiwa } from "./modules/konnchiwa";
import { network_test } from "./modules/network_test";

// create a logger
const logger = new Logger({
  name: "kumiyui_template",
  level: Logger.LEVELS.info, // default level
  output_timestamp: true, // (optional) you don't need to define this if you don't want to output timestamp
});

// note: avoid doing any async/await operation before registering all commands!!
[
  // command to test output
  // logger.child creates a child logger
  konnichiwa({ logger: logger.child("hello") }),

  // test network hooking
  network_test({ logger: logger.child("network_test") })
].forEach((command) => {
  Command(command);
})