export type ResponseUserPermission =
  'NAME' |
  'DEVICE_PRECISE_LOCATION' |
  'DEVIC_COARSE_LOCATION';

export interface ResponseExpectedIntent {
  // The ID of the assistant-provided intent.
  intent: string;

  input_value_spec: {
    // Specified in order to request the user's permission to access profile and
    // device information. The opt_context string provides TTS explaining why the
    // agent needs to request permission.
    permission_value_spec: {
      opt_context: string;
      permissions: ResponseUserPermission[];
    };
  };
};

export interface ResponseInputPrompt {
  // A single prompt that asks the user to provide an input.
  initial_prompts: ResponseSpeechResponse[];

  // Up to three prompts that are used to re-ask the user when there is no input
  // from user.
  // (For example, "I'm sorry, I didn't hear you. Can you repeat that please?")
  no_input_prompts: ResponseSpeechResponse[];
}

export interface ResponseSpeechResponseText {
  // Plain text of the speech output; for example, "where do you want to go?"
  // (The value of this property can contain only ASCII characters.)
  // You can specify either text_to_speech or ssml, but not both.
  text_to_speech: string;
}

export interface ResponseSpeechResponseSSML {
  // Structured spoken response to the user.
  // (The value of this property can contain only ASCII characters.)
  // You can specify either text_to_speech or ssml, but not both.
  // The string can include SSML markup. For more information, see SSML.
  ssml: string;
}

export type ResponseSpeechResponse = ResponseSpeechResponseText | ResponseSpeechResponseSSML;

// The expected_inputs object enables the action to request input from the user
// by matching one of a set of specified possible_intents.
export interface ResponseExpectedInputs {
  // The customized prompt that asks the user for input.
  input_prompt: ResponseInputPrompt;

  // A list of intents that can be used to fulfill the input.
  possible_intents: ResponseExpectedIntent[];
}

export interface ResponseBase {
  // A serialized opaque_token for any session object that your action
  // wants Assistant to circulate back.
  conversation_token: string;
}

export interface ResponseExpectingUserResponse extends ResponseBase {
  // Indicates whether the agent is expecting a response from the user.
  // This is true when the dialog is ongoing; false when the dialog is done.
  expect_user_response: true;

  // Lists inputs that the action requires in the next response.
  // (NOTE: Only 1 ExpectedInput is currently allowed.)
  expected_inputs: ResponseExpectedInputs[];
}

export interface ResponseNotExpectingUserResponse extends ResponseBase {
  // Indicates whether the agent is expecting a response from the user.
  // This is true when the dialog is ongoing; false when the dialog is done.
  expect_user_response: false;

  // The response only when there are no ResponseExpectedInputs and
  // expect_user_response is false.
  final_response: {
    speech_response: ResponseSpeechResponse;
  };
}

// Root-level objects of the agent's response.
export type Response = ResponseExpectingUserResponse | ResponseNotExpectingUserResponse;
