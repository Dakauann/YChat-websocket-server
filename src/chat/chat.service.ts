import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ChatService {
  constructor() {}

  async getToken() {
    const request = await fetch(`https://dakauann.kinde.com/oauth2/token`, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.KINDE_CLIENT_ID,
        client_secret: process.env.KINDE_CLIENT_SECRET,
      }),
    });
    const tokenJson = await request.json();

    return tokenJson as {
      access_token: string;
      expires_in: number;
      token_type: string;
    };
  }
  async getUser() {
    const response = await axios.get(
      'https://dakauann.kinde.com/api/v1/users',
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + (await this.getToken()).access_token,
        },
      },
    );

    console.log(response.data);
  }
}
