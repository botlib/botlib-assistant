export interface RequestArgument {
  // Name of the payload in the query.
  name: string;

  // raw text value for the argument.
  raw_text: string;

  // Specified when the user input had a $SchemaOrg_Number argument.
  int_value: number;

  // Specified when the user input had a $SchemaOrg_YesNo argument.
  bool_value: number;

  // Specified when the user input had a $SchemaOrg_Text argument.
  text_value: string;

  // Specified when the user input had a $SchemaOrg_Date argument
  date_value: {
    year: number;
    month: number;
    day: number;
  };

  // Specified when the user input had a $SchemaOrg_Time argument.
  time_value: {
    hours: number;
    minutes: number;
    seconds: number;
    nanos: number;
  };

  // Specified when the user input had a $SchemaOrg_Place argument.
  location_value: RequestLocation;
}

// The conversationobject defines session data about the ongoing conversation.
export interface RequestConversation {
  // Unique ID for the multi-step conversation, it's assigned for the first step,
  // after that it remains the same for subsequent user's queries until the
  // conversation is terminated.
  conversation_id: string;

  // Indicates the current stage of the dialog's life cycle, such as whether it's
  // a new dialog, or an active dialog.
  type: 'TYPE_UNSPECIFIED' | 'NEW' | 'ACTIVE' | 'EXPIRED' | 'ARCHIVED';

  // Opaque token specified by the action endpoint in a previous response; mainly
  // used by the agent to maintain the current conversation state.
  conversation_token: string;
}

// The device object contains information about the device through which the
// conversation is taking place.
export interface RequestDevice {
  // Representation of the device location.
  // [Requires permission: DEVICE_PRECISE_LOCATION or DEVICE_COARSE_LOCATION]
  location: RequestLocation;
}

// The inputs object contains useful data about the request.
// The input could be the query semantics for the initial query, or the
// assistant-provided response for developer required input.
// (Currently, only one expected input is supported.)
export interface RequestInput {
  // Indicates the user's intent; will be one of the possible_intents
  // specified in the developer request.
  intent: string;

  // Raw input transcription from each turn of conversation in the dialog
  // that resulted from the previous expected input.
  raw_inputs: RequestRawInput[];

  // Semantically annotated values extracted from the user's inputs.
  arguments: RequestArgument[];
}

export interface RequestLocation {
  coordinates: {
    // The device's latitude, in degrees. It must be in the range [-90.0, +90.0].
    // [Requires permission: DEVICE_PRECISE_LOCATION]
    latitude: number;

    // The device's longitude, in degrees. It must be in the range [-180.0, +180.0].
    // [Requires permission: DEVICE_PRECISE_LOCATION]
    longitude: number;
  };

  // The device's display address;
  // for example "1600 Amphitheatre Pkwy, Mountain View, CA 94043".
  // [Requires permission: DEVICE_PRECISE_LOCATION]
  formatted_address: string;

  // The city in which the device is located.
  // [Requires permission: DEVICE_PRECISE_LOCATION or DEVICE_COARSE_LOCATION]
  city: string;

  // The ZIP code in which the device is located.
  // [Requires permission: DEVICE_PRECISE_LOCATION or DEVICE_COARSE_LOCATION]
  zip_code: string;
}

export interface RequestRawInput {
  create_time: {
    // Represents seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z.
    // Must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive.
    seconds: number;

    // Non-negative fractions of a second at nanosecond resolution.
    // Negative second values with fractions must still have non-negative nanos
    // values that count forward in time. Must be from 0 to 999,999,999 inclusive.
    nanos: number;
  };

  // Indicates the kind of input: a typed query, a voice query, or unspecified.
  input_type: 'UNSPECIFIC_INPUT_TYPE' | 'TOUCH' | 'VOICE';

  // Keyboard input or spoken input from end user.
  query: string;
}

// Stores user's personal info.
// It's accessible only after user grants the permission to the agent.
export interface RequestUserProfile {
  // The user's first name as specified in their Google account.
  // [Requires permission: NAME]
  given_name: string;

  // The user's last name as specified in their Google account.
  // Note that this field could be empty.
  // [Requires permission: NAME]
  family_name: string;

  // The user's full name as specified in their Google account.
  // [Requires permission: NAME]
  display_name: string;
}

// The user object contains information about the user.
export interface RequestUser {
  // A random string identifier for the Google user.
  // The user_id can be used to track a user across multiple sessions and devices.
  // NOTE: Users can reset their user_id at any time. Do not use this field as a
  // key to store valuable information about the user, use account linking instead.
  user_id: string;

  // Information about the user.
  // This object will only be available in the request after requesting and being
  // granted user's consent to share.
  profile: RequestUserProfile;

  // A unique OAuth2 token that identifies the user in your system.
  // Only available if Account Linking configuration is defined in the Action Package
  // and the user links their account.
  access_token: string;
}

// The root-level objects of the request body.
export interface Request {
  // Describes the user that initiated this conversation.
  user: RequestUser;

  // Information associated with the device from which the conversation was initiated.
  device: RequestDevice;

  // Holds session data like the conversation ID and token.
  conversation: RequestConversation;

  // List of inputs corresponding to developer-required expected input.
  // The input could be the query semantics for initial query,
  // or assistant-provided response for developer required input.
  // We ensure 1:1 mapping for all the required inputs from developer.
  // Note that currently only one expected input is supported.
  inputs: RequestInput[];
}
