import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { Authentication } from "@/domain/usecases";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAuthentication.Model>
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as Authentication.Model;
      case HttpStatusCode.created:
        return httpResponse.body as Authentication.Model;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError(httpResponse.message);
      default:
        throw new UnexpectedError(httpResponse.message);
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = Authentication.Model;
}
