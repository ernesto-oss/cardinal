/// <reference types="lucia-auth" />
declare namespace Lucia {
  type Auth = import('./index').Auth;
  type UserAttributes = {
    email: string;
  };
}
