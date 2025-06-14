import { Cache } from "./pokecache.js";
import https from 'https';

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private readonly cache = new Cache(1000 * 60 * 60 * 24);
  
    constructor() {}

    async fetch<T>(url: string): Promise<T> {
        const cached = this.cache.get<T>(url);
        
        if (cached) {
          console.log('Cache hit', url)
          return cached;
        }
        try {

          const agent = new https.Agent({
            secureProtocol: 'TLSv1_2_method', // Force TLS 1.2
          });

          const res = await fetch(url, {
            method: 'GET',
            // @ts-ignore
            agent: agent,
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          this.cache.add(url, data);
          return data;
        } catch (err) {
          console.error('Fetch error', err)
          throw err;
        }
    }
  
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
      const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`;
      const data = await this.fetch<ShallowLocations>(url);
      return data;
    }
  
    async fetchLocation(locationName: string): Promise<Location> {
      const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
      const data = await this.fetch<Location>(url);
      const location : Location = data;
      return location;
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
    encounter_method_rates: {
      encounter_method: {
        name: string;
        url: string;
      };
      version_details: {
        rate: number;
        version: {
          name: string;
          url: string;
        };
      }[];
    }[];
    game_index: number;
    id: number;
    location: {
      name: string;
      url: string;
    };
    name: string;
    names: {
      language: {
        name: string;
        url: string;
      };
      name: string;
    }[];
    pokemon_encounters: {
      pokemon: {
        name: string;
        url: string;
      };
      version_details: {
        encounter_details: {
          chance: number;
          condition_values: any[];
          max_level: number;
          method: {
            name: string;
            url: string;
          };
          min_level: number;
        }[];
        max_chance: number;
        version: {
          name: string;
          url: string;
        };
      }[];
    }[];
  };