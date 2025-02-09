import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class PlaidService {
  private apiUrl = 'http://localhost:5000'; // Pointing to your Node.js server

  constructor() {}

  async createPublicToken() {
    const response = await axios.post(`${this.apiUrl}/createPublicToken`);
    return response.data.public_token;
  }

  async exchangePublicToken(publicToken: string) {
    const response = await axios.post(`${this.apiUrl}/exchangePublicToken`, {
      public_token: publicToken,
    });
    return response.data.access_token;
  }

  async getTransactions(startDate: string, endDate: string, accessToken: string) {
    const response = await axios.post(`${this.apiUrl}/getTransactions`, {
      startDate,
      endDate,
      accessToken,
    });
    return response.data;
  }
}
