import 'express-session';

declare module 'express-session' {
  interface SessionData {
    oauth2Token?: any;
    caller?: string;
  }
}
