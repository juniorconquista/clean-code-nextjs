import * as faker from "@ngneat/falso";

import { RequiredFieldValidation } from "@/validation/validators";
import { RequiredFieldError } from "@/validation/errors";

const makeSut = (field: string): RequiredFieldValidation =>
  new RequiredFieldValidation(field);

describe("RequiredFieldValidation", () => {
  it("Should return error if field is empty", async () => {
    const field = faker.randDatabaseColumn();
    const sut = makeSut(field);

    const error = await sut.validate({ [field]: "" });

    expect(error).toEqual(new RequiredFieldError());
  });

  it("Should return falsy if field is not empty", async () => {
    const field = faker.randDatabaseColumn();
    const sut = makeSut(field);

    const error = await sut.validate({ [field]: faker.randWord() });

    expect(error).toBeFalsy();
  });
});
