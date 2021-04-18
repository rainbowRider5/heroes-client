import heroesAPI from "../../redux/slices/heroes/heroesAPI";

describe("heroesAPI", () => {
  const sampleHero = {
    id: "hero_id",
    avatar_url: "some_url",
    type: "type_id",
    full_name: `Full name`,
    description:
      "Full description about the hero, should be pretty long to test everything out",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Given the GET request", () => {
    const sampleHeroes = [
      {
        id: "hero1_id",
        avatar_url: "some1_url",
        type: "type1_id",
        full_name: `Full name1`,
        description:
          "Full description about the hero1, should be pretty long to test everything out",
      },
      {
        id: "hero2_id",
        avatar_url: "some2_url",
        type: "type2_id",
        full_name: `Full name2`,
        description:
          "Full description about the hero2, should be pretty long to test everything out",
      },
    ];
    it("Then it should call axios.request with correct params", () => {
      const spy = jest
        .spyOn(require("axios"), "request")
        .mockImplementation(() => ({}));
      heroesAPI.fetchHeroes(1, 2);
      expect(spy).toHaveBeenCalledWith({
        method: "GET",
        params: {
          first: 1,
          skip: 2,
        },
        url: "/heroes",
      });
    });

    it("Then it should return correct response", () => {
      jest
        .spyOn(require("axios"), "request")
        .mockImplementation(() => ({ data: sampleHeroes }));
      const response = heroesAPI.fetchHeroes(1, 2);
      expect(response).toEqual({ data: sampleHeroes });
    });
  });

  describe("Given the POST request", () => {
    it("Then it should call axios.request with correct params", () => {
      const spy = jest
        .spyOn(require("axios"), "request")
        .mockImplementation(() => ({}));
      heroesAPI.addHero(sampleHero);
      expect(spy).toHaveBeenCalledWith({
        method: "POST",
        data: {
          ...sampleHero,
        },
        url: "/heroes",
      });
    });
    it("Then it should return correct response", () => {
      const correctReponse = {
        ...sampleHero,
        type: { id: "type_id", name: "type_name" },
      };
      jest
        .spyOn(require("axios"), "request")
        .mockImplementation(() => ({ data: correctReponse }));
      const response = heroesAPI.addHero(sampleHero);
      expect(response).toEqual({ data: correctReponse });
    });
  });

  describe("Given the DELETE request", () => {
    it("Then it should call axios.request with correct params", () => {
      const spy = jest
        .spyOn(require("axios"), "request")
        .mockImplementation(() => ({}));
      heroesAPI.removeHero(sampleHero.id);
      expect(spy).toHaveBeenCalledWith({
        method: "DELETE",
        url: `/heroes/${sampleHero.id}`,
      });
    });
    it("Then it should return correct response", () => {
      const correctReponse = {
        avatar_url: sampleHero.avatar_url,
        description: sampleHero.description,
        full_name: sampleHero.full_name,
        id: sampleHero.id,
      };
      jest
        .spyOn(require("axios"), "request")
        .mockImplementation(() => ({ data: correctReponse }));
      const response = heroesAPI.removeHero(sampleHero);
      expect(response).toEqual({ data: correctReponse });
    });
  });
});
