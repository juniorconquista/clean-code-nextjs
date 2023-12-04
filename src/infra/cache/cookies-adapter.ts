import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { SetStorage, GetStorage } from "@/data/protocols/cache";

export class CookiesAdapter implements SetStorage, GetStorage {
  set(
    key: string,
    value?: object | string,
    options?: Partial<ResponseCookie>
  ): void {
    if (value) {
      cookies().set(key, JSON.stringify(value), options);
    } else {
      cookies().delete(key);
    }
  }

  get<T = unknown>(key: string): T {
    return JSON.parse(`${cookies().get(key)?.value}`);
  }
}
