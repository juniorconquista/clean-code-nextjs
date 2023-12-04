import nextHeaders from "next/headers";
import * as faker from "@ngneat/falso";

import { CookiesAdapter } from "@/infra/cache";
import { mockNextHeaders } from "@/infra/mocks";

jest.mock("next/headers");

type SutTypes = {
  sut: CookiesAdapter;
  mockedNextHeaders: jest.Mocked<typeof nextHeaders>;
};

const makeSut = (): SutTypes => {
  const mockedNextHeaders = mockNextHeaders();
  const sut = new CookiesAdapter();
  return { sut, mockedNextHeaders };
};

describe("CookiesAdapter", () => {
  it("Should call cookies().set with correct values", async () => {
    const { sut, mockedNextHeaders } = makeSut();
    const key = faker.randDatabaseColumn();
    const value = faker.randJSON();

    sut.set(key, value);

    expect(mockedNextHeaders.cookies().set).toHaveBeenCalledWith(
      key,
      JSON.stringify(value),
      undefined
    );
  });

  it("Should call cookies().delete if value is null", async () => {
    const { sut, mockedNextHeaders } = makeSut();
    const key = faker.randDatabaseColumn();

    sut.set(key, undefined);
    expect(mockedNextHeaders.cookies().delete).toHaveBeenCalledWith(key);
  });

  it("Should call cookies().get with correct value", async () => {
    const { sut, mockedNextHeaders } = makeSut();
    const key = faker.randDatabaseColumn();
    const value = faker.randJSON();
    const getItemSpy = jest
      .spyOn(mockedNextHeaders.cookies(), "get")
      .mockReturnValueOnce({ name: key, value: JSON.stringify(value) });

    const obj = sut.get(key);

    expect(obj).toEqual(value);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });
});
