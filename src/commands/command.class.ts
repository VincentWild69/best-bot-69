import { Bot as GrammyBot } from 'grammy';
import { MyContext } from '../context/context.interface';

export abstract class Command {
  constructor(protected bot: GrammyBot<MyContext>) {}

  abstract handle(): void;
}