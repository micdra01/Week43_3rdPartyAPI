import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {FormControl} from "@angular/forms";
import {
  Address,
  AddressAPIJsonResponseModel,
  CountriesAPIJsonResponseModel,
  CurrencyConverterAPIJsonResponseModel
} from "../models";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  results: Address[] = [];
  addressField = new FormControl('');
  convertedCurrencyCode: string = "";
  convertedCurrencyValue: number = 0;
  salesPrice: number = 100;

  constructor(private http: HttpClient) {
    this.http = http;
  }

  async handleSearchForAddress() {
    if (this.addressField.value?.length! < 3) return;
    const baseUrl = "http://localhost:5000/api/address";
    const params: any = {
      text: this.addressField.value,
    }
    const call = this.http.get<AddressAPIJsonResponseModel>(baseUrl, {params: params});
    const result = await firstValueFrom<AddressAPIJsonResponseModel>(call);
    this.results = result.results;

    if (this.results.length == 1) {
      this.handleConvertCurrencies(result.results[0])
    }
  }

  async handleFindCurrency(address: Address) {
    const baseUrl = "https://restcountries.com/v3.1/alpha/";
    const countryCode = address.country_code;

    const call = this.http.get<CountriesAPIJsonResponseModel[]>(baseUrl + countryCode);
    const result = await firstValueFrom<CountriesAPIJsonResponseModel[]>(call);
    return Object.keys(result[0].currencies)[0];
  }

  async handleConvertCurrencies(address: Address) {
    const baseUrl = "https://api.freecurrencyapi.com/v1/latest";
    const params : any = {
      base_currency: "DKK",
      currencies: await this.handleFindCurrency(address),
      apikey: "fca_live_kYEaRX8Cis1mBa4RncUr9YvZBiXT1XTyoS2ShPD6"
    };

    const call = this.http.get<CurrencyConverterAPIJsonResponseModel>(baseUrl, {params: params});
    const result = await firstValueFrom<CurrencyConverterAPIJsonResponseModel>(call);

    this.convertedCurrencyCode = Object.keys(result.data)[0];
    this.convertedCurrencyValue = Number.parseFloat(Object.values(result.data)[0] + "") * this.salesPrice;
  }
}


