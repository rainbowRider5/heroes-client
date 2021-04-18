import typesAPI from "../../redux/slices/types/typesAPI";

describe("typesAPI", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Given the GET request", () => {
    const sampleTypes = [
      { id: "type1_id", name: "type1" },
      { id: "type2_id", name: "type2" },
    ];

    it("Then it should call axios.request with correct params", () => {
      const spy = jest
        .spyOn(require("axios"), "request")
        .mockImplementation(() => ({}));
      typesAPI.fetchTypes();
      expect(spy).toHaveBeenCalledWith({
        method: "GET",
        url: "/types",
      });
    });

    it("Then it should return correct response", () => {
      jest
        .spyOn(require("axios"), "request")
        .mockImplementation(() => ({ data: sampleTypes }));
      const response = typesAPI.fetchTypes();
      expect(response).toEqual({ data: sampleTypes });
    });
  });
});
