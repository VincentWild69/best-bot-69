import { Bot } from 'grammy';
import { MyContext } from '../context/context.interface';

export abstract class Command {
  constructor(protected bot: Bot<MyContext>) {}

  abstract handle(): void;
}