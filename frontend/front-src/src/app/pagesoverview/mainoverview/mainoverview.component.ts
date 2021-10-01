import { Component, OnInit ,ViewChild} from '@angular/core';
import { DataService } from 'src/app/common/services/api/data.service';
import { UichangeService } from 'src/app/common/services/common/uichange.service';

@Component({
  selector: 'app-mainoverview',
  templateUrl: './mainoverview.component.html',
  styleUrls: ['./mainoverview.component.scss']
})
export class MainoverviewComponent implements OnInit {
  secOpen:Boolean=false;
  coins:any=[];
  PairsArr:any=[];
  currencyHistory={};
  constructor(public uichange:UichangeService,private dataservice:DataService) { }

  ngOnInit() {
    this.GetfromLocal();
  }

  sideSec(value){
  if(value=="open"){this.secOpen=true;}else{this.secOpen=false;}
   
  }

  async getcoinDetail(){
    this.coins.map(val=>{
    var obj1={
      "currency":val
    }
    this.dataservice.postUrl('accounts/getCoinDept',obj1).subscribe(async(resData:any) => {
        if(resData.status) {
          let resPoolData   = resData.data;
          this.currencyHistory  = resPoolData;
        }else{
          this.currencyHistory  = {};
        }
    });
  });
}

GetfromLocal(){
  this.coins = JSON.parse(localStorage.getItem("CoinFAv"));
  this.PairsArr = JSON.parse(localStorage.getItem("PairFAv"));
}

Favsection(sec){
    let array = this.coins
    let inDex = array.indexOf(sec)
    array.splice(inDex,1)
    localStorage.setItem("CoinFAv", JSON.stringify(array));
    this.coins =array;
}

FavsectionPair(sec){
    let array = this.PairsArr
    let inDex = array.indexOf(sec)
    array.splice(inDex,1)
    localStorage.setItem("PairFAv", JSON.stringify(array));
    this.PairsArr =array;
}


}
