import { Request } from './Request';
import { Response } from './Response';
import { ResponseBuilder } from './ResponseBuilder';

export class Action {
  async execute(req: Request): Promise<Response> {
    const res = new ResponseBuilder(req.conversation.conversation_token);
    return res.sendText('Hello Report IO!');
  }
}
