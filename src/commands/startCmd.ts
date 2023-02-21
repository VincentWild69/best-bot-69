import { MyContext } from '../context/context.interface';
import { Command } from './command.class';
import { Bot } from 'grammy';

export class StartCmd extends Command {
  constructor(bot: Bot<MyContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command('start', async (ctx) => {
      // console.log('>>>>>>', ctx);yy
      ctx.session.pizzaCount += 2;
      await ctx.reply('greeting');
    });

    this.bot.command('hunger', async (ctx) => {
      ctx.session.pizzaCount += 10;
      const count = ctx.session.pizzaCount;
      await ctx.reply(`Your hunger level is ${count}!`);
    });

    this.bot.on('message', (ctx) => ctx.reply('Got another message!'));
  }
}