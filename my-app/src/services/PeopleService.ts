export class PeopleService {
  static API_URL = "https://swapi.dev";

  static async fetchPeople(page?: string): Promise<FetchPeopleResponse | null> {
    try {
      const response = await fetch(page ? page : `${this.API_URL}/api/people`);
      const { results, previous, next } = await response.json();
      return {
        data: results,
        nextPage: next,
        previousPage: previous,
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

export interface FetchPeopleResponse {
  data: Person[];
  nextPage?: string;
  previousPage?: string;
}

export interface Person {
  name: string;
}
