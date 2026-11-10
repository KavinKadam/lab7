import passport from "passport";
import { PassportStrategy } from "../interfaces";

export default class PassportConfig {
  // registers the strategies right away so nobody can forget
  constructor(strategies: PassportStrategy[]) {
    this.addStrategies(strategies);
  }

  // loops the list and hands each strategy to passport by name
  private addStrategies(strategies: PassportStrategy[]): void {
    strategies.forEach((passportStrategy: PassportStrategy) => {
      passport.use(passportStrategy.name, passportStrategy.strategy);
    });
  }
}
