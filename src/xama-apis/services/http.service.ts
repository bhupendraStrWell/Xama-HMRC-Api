import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService as AxiosHttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class HttpXamaService {
  constructor(private readonly http: AxiosHttpService) {}

  /**
   * Handles GET requests to an external API.
   * @param url The API endpoint.
   * @param params Optional query parameters.
   */
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    try {
      const response = await lastValueFrom(this.http.get<T>(url, { params }));
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Handles POST requests to an external API.
   * @param url The API endpoint.
   * @param data The payload to send.
   */
  async post<T>(url: string, data: Record<string, any>): Promise<T> {
    try {
      const response = await lastValueFrom(this.http.post<T>(url, data));
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Handles PUT requests to an external API.
   * @param url The API endpoint.
   * @param data The payload to update.
   */
  async put<T>(url: string, data: Record<string, any>): Promise<T> {
    try {
      const response = await lastValueFrom(this.http.put<T>(url, data));
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Handles DELETE requests to an external API.
   * @param url The API endpoint.
   */
  async delete<T>(url: string): Promise<T> {
    try {
      const response = await lastValueFrom(this.http.delete<T>(url));
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Handles errors from HTTP requests.
   * @param error The error object.
   */
  private handleError(error: any): never {
    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      error.response?.data?.message ||
      'An error occurred while making an HTTP request.';
    throw new HttpException(message, status);
  }
}
