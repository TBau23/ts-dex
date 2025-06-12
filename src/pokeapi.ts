


export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
  
    constructor() {}
  
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
      const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`;
      const res = await fetch(url);
      const data = await res.json();
      return {
        count: data.count,
        next: data.next,
        previous: data.previous,
        results: data.results,
      }
    }
  
    async fetchLocation(locationName: string): Promise<Location> {
      const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
      const res = await fetch(url);
      const data = await res.json();
      return {
        name: data.name,
        url: data.url,
      }
    }
  }
  
  export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string;
        url: string;
    }[];
  };
  
  export type Location = {
    name: string;
    url: string;
  };