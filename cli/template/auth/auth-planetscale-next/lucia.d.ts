/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./index").Auth;
  type DatabaseUserAttributes = {
    email: string;
  };
  type DatabaseSessionAttributes = {};
}
