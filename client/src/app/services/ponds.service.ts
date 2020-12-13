import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Pond} from '../models/Ponds'

@Injectable({
  providedIn: 'root'
})
export class PondsService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {

  }

  getPonds(farmId: string){
     return this.http.get(`${this.API_URI}/ponds/${farmId}`);
  }

  getPond(farmId: string, pondId: string){
     return this.http.get(`${this.API_URI}/ponds/${farmId}/${pondId}`);
  }

  savePond(farmId: string, pond: Pond){
    //Making sure the size is sent as a number and not a string
    if (pond.size) pond.size=+pond.size;
    return this.http.post(`${this.API_URI}/ponds/${farmId}`, pond);
  }

  deletePond(farmId: string, pondId: string){
    return this.http.delete(`${this.API_URI}/ponds/${farmId}/${pondId}`);
  }

  updatePond(farmId: string|undefined, pondId: string, updatedPond: Pond){
    //Making sure the size is sent as a number and not a string
    if (updatedPond.size) updatedPond.size=+updatedPond.size;
    return this.http.put(`${this.API_URI}/ponds/${farmId}/${pondId}`, updatedPond);
  }
}
