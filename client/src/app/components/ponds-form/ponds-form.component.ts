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
    name: '',
    size: 0
  };

  errorMsg = '';

  editing: boolean = false;

  constructor(private pondsService: PondsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  /**
   * Initialization
   */
  ngOnInit(): void {
    //Get the params to determine if we are updating or creating
    const params = this.activatedRoute.snapshot.params;

    //Within the logic of ponds, we are always going to have a farm_id
    if (params.farm_id) {
      this.farmId = params.farm_id;

      //If we have a pond_id we are updating
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

  /**
   * Updating an existing pond within a farm object
   */
  public updatePond(){

    this.pondsService.updatePond(this.farmId, this.pondId, this.pond).subscribe(
      res => {
        this.router.navigate(['/farms']);
      },
      err => {
        //TODO: This error handling should be done everywhere
        //      but for now the only error we care about is duplicate names
        this.errorMsg = err.error.errorMsg;
        console.log(err.error.errorMsg);
      }
    )
  }

  /**
   * Insert a new pond object inside a farm object
   */
  public saveNewPond(){
    this.pondsService.savePond(this.farmId, this.pond).subscribe(
      res => {
        this.router.navigate(['/farms']);
      },
      err => {
        //Expect this for duplicate names
        this.errorMsg = err.error.errorMsg;
        console.log(err.error.errorMsg);
      }
    )
  }
}
