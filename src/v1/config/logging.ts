/* eslint-disable @typescript-eslint/no-unsafe-call */
import chalk from 'chalk';

//custom error and info logging to the console.
//Classes of color for different console message

export default class Logging {
  public static log = (arg: unknown) => this.info(arg);

  public static info = (arg: unknown) =>
    console.log(
      chalk.blue(`[${new Date().toISOString()}] [info]`),
      typeof arg === 'string' ? chalk.blueBright(arg) : arg,
  );

  public static warn = (arg: unknown) =>
    console.log(
      chalk.yellow(`[${new Date().toLocaleString()}] [info]`),
      typeof arg === 'string' ? chalk.yellowBright(arg) : arg,
    );

  public static error = (arg: unknown) =>
    console.log(
      chalk.red(`[${new Date().toLocaleString()}] [info]`),
      typeof arg === 'string' ? chalk.redBright(arg) : arg,
    );
}
