import { Context, SessionFlavor } from 'grammy';

export interface ISessionData {
  pizzaCount: number,
}

export type MyContext = Context & SessionFlavor<ISessionData>;
