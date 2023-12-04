import * as nextHeaders from "next/headers";
import * as faker from "@ngneat/falso";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

// export const mockHttpResponse = (data = faker.randJSON()) => ({
//   data: data,
//   status: faker.randNumber({ length: 3 }),
// });

export const mockNextHeaders = (
  data = faker.randJSON()
): jest.Mocked<typeof nextHeaders> => {
  const mockedNextHeaders = nextHeaders as jest.Mocked<typeof nextHeaders>;
  mockedNextHeaders.cookies.mockClear().mockReturnValue({
    ...mockedNextHeaders.cookies(),
    set: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
  });
  return mockedNextHeaders;
};
