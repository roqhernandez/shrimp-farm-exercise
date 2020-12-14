import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Farm} from '../models/Farms'

@Injectable({
  providedIn: 'root'
})
export class FarmsService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {

  }
  //Each of this methods simply takes the call and touches the end-point necessary in the API
  getFarms(){
     return this.http.get(`${this.API_URI}/farms`);
  }

  getFarm(id: string){
     return this.http.get(`${this.API_URI}/farms/${id}`);
  }

  getFarmTotalSize(id: string|undefined){
    return this.http.get(`${this.API_URI}/farms/get-total-size/${id}`);
  }

  saveFarm(farm: Farm){
    return this.http.post(`${this.API_URI}/farms`, farm);
  }

  deleteFarm(id: string){
    return this.http.delete(`${this.API_URI}/farms/${id}`);
  }

  updateFarm(id: string|undefined, updatedFarm: Farm){
    return this.http.put(`${this.API_URI}/farms/${id}`, updatedFarm);
  }
}
