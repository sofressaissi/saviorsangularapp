import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Collect } from '../models/Collect';
import { CollectService } from '../shared/collect.service';

@Component({
  selector: 'app-collects-displayed',
  templateUrl: './collects-displayed.component.html',
  styleUrls: ['./collects-displayed.component.css']
})
export class CollectsDisplayedComponent implements OnInit {

  allCollects: any;
  totalRecords: number;
  page: number=1;
  collectNameToSearch: string;
  dataCollectGot: Collect[];
  nomCollect: string = '';
  desCollect: string;
  fondCollect: number;
  howMany: number;
  categoryC: string;
  urlIMG: string = '';
  addedBy: string;
  idC: number;


  constructor(private collectService: CollectService, public router: Router) { }

  showDetails(id, nC, dC, fC, hM, cC, urlI, aB) {
    this.idC = id;
    this.nomCollect = nC;
    this.desCollect = dC;
    this.fondCollect = fC;
    this.howMany = hM;
    this.categoryC = cC;
    this.urlIMG = urlI;
    this.addedBy = aB;
  }

  searchByCollectName() {
    if (this.collectNameToSearch !== "") {
    this.dataCollectGot = this.dataCollectGot.filter(res => {
      return res.nomC.toLocaleLowerCase().match(this.collectNameToSearch.toLocaleLowerCase());
    })
  } else {
    this.ngOnInit();
  }
  }

  ngOnInit(): void {
    this.collectService.getMyCollects().subscribe(cols => {
      this.allCollects = cols;
      this.dataCollectGot = this.allCollects;
    })
  }

}
