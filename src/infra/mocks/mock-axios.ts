import axios from "axios";
import * as faker from "@ngneat/falso";

export const mockHttpResponse = (data = faker.randJSON()) => ({
  data: data,
  status: faker.randNumber({ length: 3 }),
});

export const mockAxios = (
  data = faker.randJSON()
): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse(data));
  return mockedAxios;
};
