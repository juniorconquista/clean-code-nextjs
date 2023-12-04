import * as faker from "@ngneat/falso";

import { MinLengthValidation } from "@/validation/validators";
import { InvalidFieldError } from "@/validation/errors";

const makeSut = (field: string): MinLengthValidation =>
  new MinLengthValidation(field, 5);

describe("MinLengthValidation", () => {
  it("Should return error if value is invalid", async () => {
    const field = faker.randDatabaseColumn();
    const sut = makeSut(field);
    const error = await sut.validate({
      [field]: `${faker.randNumber({ max: 4 })}`,
    });

    expect(error).toEqual(new InvalidFieldError());
  });

  it("Should return falsy if value is valid", async () => {
    const field = faker.randDatabaseColumn();
    const sut = makeSut(field);

    const error = await sut.validate({
      [field]: `${faker.randNumber({ min: 6 })}`,
    });

    expect(error).toBeFalsy();
  });

  it("Should return falsy if field does not exists in schema", async () => {
    const sut = makeSut("any_field");

    const error = await sut.validate({
      invalidField: `${faker.randNumber({ min: 4 })}`,
    });

    expect(error).toBeFalsy();
  });
});
