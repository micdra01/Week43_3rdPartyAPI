import { Component } from '@angular/core';
import {search} from "ionicons/icons";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  results: Address[] = [];
  addressField = new FormControl('');

  constructor(private http: HttpClient) {
    this.http = http;
  }
  async handleSearchForAddress() {
    if (this.addressField.value?.length! < 3) return;
    const address = "https://api.geoapify.com/v1/geocode/autocomplete?";
    const params: any = {
      text: this.addressField.value,
      format: "json",
      apiKey: "9fccd0ed6f96423fb3863c334f2c0138"
    }
    const call = this.http.get<AddressAPIJsonResponseModel>(address, {params: params});
    const result = await firstValueFrom<AddressAPIJsonResponseModel>(call);
    this.results = result.results;
  }
}

export interface AddressAPIJsonResponseModel {
  results: Address[]
}

export interface Address {
  datasource: Datasource
  name?: string
  country: string
  country_code: string
  state: string
  county?: string
  city?: string
  hamlet?: string
  lon: number
  lat: number
  suburb?: string
  formatted: string
  address_line1: string
  address_line2: string
  category: string
  timezone: Timezone
  plus_code: string
  result_type: string
  rank: Rank
  place_id: string
  bbox: Bbox
  region?: string
  plus_code_short?: string
  postcode?: string
  village?: string
  state_code?: string
  county_code?: string
}

export interface Datasource {
  sourcename: string
  attribution: string
  license: string
  url: string
}

export interface Timezone {
  name: string
  offset_STD: string
  offset_STD_seconds: number
  offset_DST: string
  offset_DST_seconds: number
  abbreviation_STD: string
  abbreviation_DST: string
}

export interface Rank {
  importance: number
  confidence: number
  confidence_city_level?: number
  match_type: string
}

export interface Bbox {
  lon1: number
  lat1: number
  lon2: number
  lat2: number
}

export interface Query {
  text: string
  parsed: Parsed
}

export interface Parsed {
  city: string
  expected_type: string
}

