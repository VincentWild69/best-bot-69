import { Bot as GrammyBot, session } from 'grammy';
import { Command } from './commands/command.class';
import { IConfigService } from './config/config.interface';
import { ConfigService } from './config/config.service';
import { MyContext, ISessionData } from './context/context.interface';
import { StartCmd } from './commands/startCmd';
import { generateUpdateMiddleware } from 'telegraf-middleware-console-time';

export class MyBot {
  bot: GrammyBot<MyContext>;
  commands: Command[] = [];

  constructor(private readonly configService: IConfigService) {
    this.bot = new GrammyBot<MyContext>(this.configService.get('BOT_TOKEN'));
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
    this.commands = [
      new StartCmd(this.bot),
    ];
    for (const command of this.commands) {
      command.handle();
    }
    this.bot.catch(error => console.error(error));
    this.bot.start().then(() => {
      console.log(`@${this.bot.botInfo.username} is running...`);
    });
  }
}

const bot = new MyBot(new ConfigService());
bot.init();