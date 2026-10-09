import { Command } from "kumiyui";
import konnichiwa from "./modules/konnchiwa";
import network_test from "./modules/network_test";

[
  // command to test output
  konnichiwa,

  // test network hooking
  network_test
].forEach((command) => {
  Command(command);
})