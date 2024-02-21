export interface AccessToken {
  access_token: string;
  refresh_token?: string;
  created_at?: number;
  expires_in?: number;
  [key: string]: any;
}
