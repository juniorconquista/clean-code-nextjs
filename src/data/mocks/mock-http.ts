import * as faker from "@ngneat/falso";
import {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  HttpClient,
} from "@/data/protocols/http";

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.randUrl(),
  method: faker.rand(["get", "post", "put", "delete"]),
  body: faker.randJSON(),
  headers: faker.randJSON(),
});

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string;
  method?: string;
  body?: any;
  headers?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
    body: faker.randJSON() as R,
    message: faker.randPhrase(),
  };

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;
    this.headers = data.headers;
    return this.response;
  }
}
