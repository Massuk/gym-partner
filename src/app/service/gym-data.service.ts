import { Injectable } from '@angular/core';
import { Gym } from '../model/gym';

@Injectable({
  providedIn: 'root',
})
export class GymDataService {
  private selectedRadioValue: number = 0;
  private selectedGym: Gym = new Gym();
  radioButtonSelected: boolean = false;

  constructor() {}

  setSelectedRadioValue(value: number) {
    this.selectedRadioValue = value;
  }

  getSelectedRadioValue(): number {
    return this.selectedRadioValue;
  }

  setSelectedGym(gym: Gym) {
    this.selectedGym = gym;
  }

  getSelectedGym(): Gym {
    return this.selectedGym;
  }
}
