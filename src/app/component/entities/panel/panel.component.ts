import { Component, HostListener, OnInit } from '@angular/core';
import { Gym } from 'src/app/model/gym';
import { GymDataService } from 'src/app/service/gym-data.service';
import { GymListComponent } from '../gym/gym-list/gym-list.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GymService } from 'src/app/service/gym.service';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  innerWidth: any;
  defaultGym: Gym | undefined;
  selectedGym: Gym | undefined;

  constructor(private gymDataService: GymDataService, private gS: GymService) {}

  ngOnInit(): void {
    this.selectedGym = this.gymDataService.getSelectedGym();
    this.innerWidth = window.innerWidth;
    console.log(this.selectedGym);
  }

  // ngOnInit(): void {
  //   this.innerWidth = window.innerWidth;
  //   this.gS.list().subscribe((data) => {
  //     if (this.selectedGym === undefined) {
  //       this.selectedGym = data[0];
  //       console.log(this.selectedGym);
  //     } else {
  //       const updatedGym = this.gymDataService.getSelectedGym();
  //       if (updatedGym) {
  //         this.selectedGym = updatedGym;
  //       }
  //     }
  //   });
  // }


  // Ajustes visuales
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  getClass() {
    return this.innerWidth < 925 ? 'row-md' : 'row';
  }
}
