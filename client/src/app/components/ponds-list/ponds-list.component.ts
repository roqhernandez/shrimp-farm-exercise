import { Component, Input, OnInit } from '@angular/core';
import { Pond } from '../../models/Ponds';
import { FarmsService } from '../../services/farms.service';
import { PondsService } from '../../services/ponds.service';

@Component({
  selector: 'app-ponds-list',
  templateUrl: './ponds-list.component.html',
  styleUrls: ['./ponds-list.component.css']
})
export class PondsListComponent implements OnInit {

  @Input() ponds: any; //Pond[] | undefined;
  @Input() farm: any;

  constructor(private farmsService: FarmsService, private pondsService: PondsService) { }

  ngOnInit(): void {
  }

  deletePond(farm:any, pondId:string){

    let farmId = farm._id;

    this.pondsService.deletePond(farmId, pondId).subscribe(
      res => {
        this.pondsService.getPonds(farmId).subscribe(
          res => {
            this.ponds = res;
            var newTotalSize = 0;
            this.ponds.forEach((pond: { size: number; }) => {
              newTotalSize = newTotalSize + pond.size;
            });
            this.farm.totalSize = newTotalSize;
          },
          err => console.error(err)
        )
      },
      err => console.log(err)
    );

  }

}
