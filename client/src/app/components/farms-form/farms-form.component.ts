import { Component, HostBinding, OnInit } from '@angular/core';
import { Farm } from '../../models/Farms';
import { FarmsService } from '../../services/farms.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-farms-form',
  templateUrl: './farms-form.component.html',
  styleUrls: ['./farms-form.component.css']
})
export class FarmsFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  //Default values for farm object
  farm: Farm = {
    name: '',
    totalSize: 0
  };

  editing: boolean = false;

  constructor(private farmsService: FarmsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;

    if (params.id){
      this.farmsService.getFarm(params.id).subscribe(
        res => {
           this.farm = res;
           this.editing = true;
        },
        err => console.log(err)
      );
    }
  }

  public updateFarm(){
    this.farmsService.updateFarm(this.farm._id, this.farm).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/farms']);
      },
      err => console.log(err)
    )
  }

  public saveNewFarm(){
    this.farmsService.saveFarm(this.farm).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/farms']);
      },
      err => console.log(err)
    )
  }

}
