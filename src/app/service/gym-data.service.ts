import { Injectable } from '@angular/core';
import { Gym } from '../model/gym';

@Injectable({
  providedIn: 'root'
})
export class GymDataService {
  private selectedRadioValue: string | undefined;
  private selectedGym: Gym | undefined;

  constructor() { }

  setSelectedRadioValue(value: string) {
    this.selectedRadioValue = value;
  }

  setSelectedGym(gym: Gym) {
    this.selectedGym = gym;
  }

  getSelectedGym(): Gym | undefined {
    return this.selectedGym;
  }
}
