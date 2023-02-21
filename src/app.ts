import { Bot, session } from 'grammy';
import { Command } from './commands/command.class';
import { IConfigService } from './config/config.interface';
import { ConfigService } from './config/config.service';
import { MyContext, ISessionData } from './context/context.interface';
import { StartCmd } from './commands/startCmd';
import { generateUpdateMiddleware } from 'telegraf-middleware-console-time';

export class MyBot {
  bot: Bot<MyContext>;
  commands: Command[] = [];

  constructor(private readonly configService: IConfigService) {
    this.bot = new Bot<MyContext>(this.configService.get('TOKEN'));
    this.bot.use(session({ initial: this.initialSessionData }));
    if (this.configService.get('NODE_ENV') !== 'production') {
      this.bot.use(generateUpdateMiddleware());
    }
  }

  initialSessionData(): ISessionData {
    return {
      pizzaCount: 0
    };
  }

  init() {
    this.commands = [new StartCmd(this.bot)];
    for (const command of this.commands) {
      command.handle();
    }
    this.bot.start();
  }
}

const bot = new MyBot(new ConfigService());
bot.init();