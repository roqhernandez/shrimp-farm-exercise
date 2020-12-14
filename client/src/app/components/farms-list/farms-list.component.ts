import { Farm } from './../../models/Farms';
import { Component, OnInit } from '@angular/core';
import { FarmsService } from '../../services/farms.service';

@Component({
  selector: 'app-farms-list',
  templateUrl: './farms-list.component.html',
  styleUrls: ['./farms-list.component.css']
})

/This class is where most of e funcionality resides
export class FarmsListComponent implements OnInit {

  farms: any = [];

  constructor(private farmsService: FarmsService) { }

  ngOnInit(): void {
    //Making sure that the main view is up to date
   this.getFarms();
  }

  getFarms(){
    this.farmsService.getFarms().subscribe(
      res => {
        this.farms = res;
        this.farms.forEach((singleFarm: Farm) => {
          this.getFarmTotalSize(singleFarm);
        });
      },
      err => console.error(err)
    )
  }

  getFarmTotalSize(singleFarm:Farm){
    this.farmsService.getFarmTotalSize(singleFarm._id).subscribe(
      res => {
        singleFarm.totalSize = +res;
      },
      err => console.error(err)
    )
  }

  deleteFarm(id:string){
    console.log(id);
    this.farmsService.deleteFarm(id).subscribe(
      res => {
        console.log(res);
        this.getFarms();
      },
      err => console.log(err)
    );
  }
}
