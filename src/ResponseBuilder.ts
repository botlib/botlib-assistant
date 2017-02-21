import { Response } from './Response';

export class ResponseBuilder {
  constructor(protected conversationToken: string) {}

  sendText(text: string): Response {
    return {
      conversation_token: this.conversationToken,
      expect_user_response: false,
      final_response: {
        speech_response: {
          text_to_speech: text,
        },
      },
    };
  }
}
