import { Component, HostBinding, OnInit } from '@angular/core';

import { Pond } from '../../models/Ponds';
import { PondsService } from '../../services/ponds.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ponds-form',
  templateUrl: './ponds-form.component.html',
  styleUrls: ['./ponds-form.component.css']
})
export class PondsFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  farmId : string = '';
  pondId : string = '';

  pond: Pond =  {
    name: 'Unnamed',
    size: 0
  };

  editing: boolean = false;

  constructor(private pondsService: PondsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;

    if (params.farm_id) {
      this.farmId = params.farm_id;

      if (params.pond_id){
        this.pondId = params.pond_id;
        this.pondsService.getPond(params.farm_id, params.pond_id).subscribe(
          res => {
             this.pond = res;
             this.editing = true;
          },
          err => console.log(err)
        );
      }
    } else {
      console.log("Error obtaining pond");
    }

  }

  public updatePond(){

    this.pondsService.updatePond(this.farmId, this.pondId, this.pond).subscribe(
      res => {
        this.router.navigate(['/farms']);
      },
      err => console.log(err)
    )
  }

  public saveNewPond(){
    this.pondsService.savePond(this.farmId, this.pond).subscribe(
      res => {
        this.router.navigate(['/farms']);
      },
      err => console.log(err)
    )
  }
}
