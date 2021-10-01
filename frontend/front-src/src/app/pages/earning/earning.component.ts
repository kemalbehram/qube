import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { CommonService } from 'src/app/common/services/common/common.service';
import { DataService } from 'src/app/common/services/api/data.service';
import { AuthmetamaskService } from 'src/app/common/services/metamask/auth/authmetamask.service';
import { CommonMetamaskService } from 'src/app/common/services/metamask/common/common-metamask.service';

import { CommonContractService } from 'src/app/common/services/metamask/common-contract/common-contract.service';
import { StakeService } from 'src/app/common/services/metamask/stake/stake.service';
import { UichangeService } from 'src/app/common/services/common/uichange.service';

	// contract details
	import { ContractDetails } from "src/assets/files/contract";
	import { RouterAbi } from "src/assets/files/router_abi";
	import { TokenAbi } from "src/assets/files/token_abi";
	import { PairAbi } from "src/assets/files/pair_abi";
	import { StakeAbi } from "src/assets/files/stake_abi";
	
// contract details

declare let window: any;
let min_percentage      = 0.5;

@Component({
  selector: 'app-earning',
  templateUrl: './earning.component.html',
  styleUrls: ['./earning.component.scss']
})
export class EarningComponent implements OnInit {
	  login                       = false;
    depositpage_show            = false;
    farminglist_show            = true;
	  public farm_fullpair_data: any    = [];

    //POP UP
    show_stake_button=false;
    stake_value={
    "stake_pair_balance":0.0000,
    "unstake_pair_balance":0.000
    };
    //POP UP
  	constructor(private dataservice:DataService,private commonmetamaskservice:CommonMetamaskService,private commoncontractservice:CommonContractService,private commonservice:CommonService,public router: Router,public stakeservice: StakeService,private authmetamaskservice:AuthmetamaskService,private uichange:UichangeService) { }

  	async ngOnInit() {
  	 	await this.sleep(1000);
      let address_value = localStorage.getItem("account");
      if(address_value){
        this.commonservice.metaDetails.isLogin = true;
      }else{
        this.commonservice.metaDetails.isLogin = false;
      }
      setTimeout(()=>{
        if ( this.commonservice.metaDetails.account == null ) {
          this.commonservice.metaDetails.isLogin = false;
        } else {
          this.commonservice.metaDetails.isLogin = true;
        }
        this.getfarmpair();
      }, 2000);
  	}

    // login wallet
    loginmetamask(){
      this.commonservice.showWalletList.emit(true);
      return;
    }
    // login wallet


  	async checkChainId(){
	    this.authmetamaskservice.checkChainId().then(async(result)=>{
	      if(result.status) {} else {
	         this.commonservice.alertmessage("error",result.message);
	        this.router.navigate(['']);
	      }
	    }).catch((error)=>{
	       this.commonservice.alertmessage("error",error);
	    });
  	}

    async getfarmpair(){
      this.checkChainId();
      let address_value = localStorage.getItem("account");
      if(address_value){
        this.uichange.changebackground(); 
      }
	    let url = 'farming/getPooledPairs';
	    await this.dataservice.getUrl(url).subscribe(async(resData:any) => {
	      let get_stakepairdata      = resData.data;
	      get_stakepairdata.map(async (items)=>{
          await this.stakeservice.GetStakedbalance(items.rewardedaddress,StakeAbi,this.commonservice.metaDetails.account,items.pair_address).then(async(result)=>{
            // console.log(result,"Inittttttttttttttttttttttttttttttt")
	          if(result.status) {
	            let decimals      = 18;
	            if(decimals == 18) {
	              items.total_deposit = result.balance;
	            } else {
	              let decimal         = Math.pow(10, decimals);
	              items.total_deposit = result.rawbalance / decimal;
	            }            
	          } else {
              this.commonservice.alertmessage("error",result.message);
	          }
	          this.uichange.clearbackground(); 
	        }).catch((error)=>{
            this.commonservice.alertmessage("error",error);
	        });

          await this.stakeservice.GetRewardamount(items.rewardedaddress,StakeAbi,this.commonservice.metaDetails.account,items.pair_address).then(async(result)=>{
            if(result.status) {
              let decimals      = 18;
              if(decimals == 18) {
                items.rewardAmount = result.balance;
              } else {
                let decimal         = Math.pow(10, decimals);
                items.rewardAmount = result.rawbalance / decimal;
              }
            } else {
              this.commonservice.alertmessage("error",result.message);
            }
            this.uichange.clearbackground(); 
          }).catch((error)=>{
            this.commonservice.alertmessage("error",error);
          });
          console.clear();
          return items;
        });
        this.farm_fullpair_data     = get_stakepairdata;
      });
    }

  // onclick event
    rawpair_balance:any;
    pair_balance:any;
    reward_amount:any;
    rawreward_amount:any;
    rawstaked_balane:any;
    staked_balane:any;
    selected_stake_pair:any = [];

    async showdeposit_page(selpair){
      this.depositpage_show = true;
      this.farminglist_show = false;
      this.selected_stake_pair = selpair;
      await this.stakeservice.GetStakedbalance(selpair.rewardedaddress,StakeAbi,this.commonservice.metaDetails.account,selpair.pair_address).then(async(result)=>{
        if(result.status) {
          this.staked_balane     = result.balance;
          this.rawstaked_balane  = result.rawbalance;
        } else {
          this.staked_balane = 0.0000;
          this.commonservice.alertmessage("error",result.message);
        }
      }).catch((error)=>{
        this.commonservice.alertmessage("error",error);
        this.staked_balane = 0.0000;
      });

      // get reward amount
      await this.stakeservice.GetRewardamount(selpair.rewardedaddress,StakeAbi,this.commonservice.metaDetails.account,selpair.pair_address).then(async(result)=>{
        if(result.status) {
        	this.reward_amount = result.balance;
          this.rawreward_amount = result.rawbalance;
        } else {
          this.reward_amount = 0.0000;
          this.commonservice.alertmessage("error",result.message);
        }
      }).catch((error)=>{
        this.commonservice.alertmessage("error",error);
        this.reward_amount = 0.0000;
      })
          
      // get reward token balance  
      await this.commoncontractservice.GetTokenbalance(selpair.pair_address,PairAbi,this.commonservice.metaDetails.account).then(async(result)=>{
        if(result.status) {
        	// console.log(result,"cccccccccccccccccccccccccccccccccccc")
          this.pair_balance     = result.balance;
          this.rawpair_balance  = result.rawbalance;
        } else {
          this.pair_balance = 0.0000;
          this.commonservice.alertmessage("error",result.message);
        }
      }).catch((error)=>{
        this.commonservice.alertmessage("error",error);
        this.pair_balance = 0.0000;
      });
      // button check 
      this.button_check();
    }

   

    show_stake              = true;
    show_unstake            = true;
    show_harvest            = true;
    stakebutton_loading     = false;
    unstakebutton_loading   = false;
    harvestbutton_loading   = false;

    // Approve Stake section

    async Approve_stake(){
      this.uichange.changebackground();
      this.stakebutton_loading = true;
      let pair_address  = this.selected_stake_pair.pair_address;
      let spender       = this.selected_stake_pair.rewardedaddress; // spender contract addres

      await this.commonmetamaskservice.ApproveFunction(pair_address,PairAbi,spender,this.rawpair_balance,this.commonservice.metaDetails.account).then(async(result)=>{
        if(result.status) {
          this.commonservice.alertmessage("success","Approved Successfully");
          this.stake();
        } else {
          this.commonservice.alertmessage("error",result.message);
          setTimeout(()=>{location.reload();},2000);
        }
      }).catch((error)=>{
          this.commonservice.alertmessage("error",error);
          setTimeout(()=>{location.reload();},2000);
      });
    }

    // Approve Stake section


    // stake section

      async stake(){
          let pair_address  = this.selected_stake_pair.pair_address;
          let spender       = this.selected_stake_pair.rewardedaddress;

          //Staked amount
          let amount        = this.stake_value.stake_pair_balance;
          amount            = window.web3.utils.toWei(amount.toString(), 'ether');

          await this.stakeservice.StakeFunction(this.selected_stake_pair.rewardedaddress,StakeAbi,amount,this.commonservice.metaDetails.account,pair_address).then(async(result)=>{
            if(result.status) {
              this.commonservice.alertmessage("success","Stake Successfully");
              this.depositInsert(this.pair_balance, result.result);
                this.uichange.clearbackground();
                setTimeout(()=>{
                  this.stakebutton_loading = false;
                  location.reload();
                }, 2000);
            } else {
              this.commonservice.alertmessage("error",result.message);
              setTimeout(()=>{
                location.reload();
                this.stakebutton_loading = false;
              },2000);
            }
          }).catch((error)=>{
              this.commonservice.alertmessage("error",error);
              setTimeout(()=>{
                location.reload();
                this.stakebutton_loading = false;
              },2000);
          });
      }
      // stake section

      //Deposit

      transaction_id:any;
      async depositInsert(amount, result){
        let depositData = {
          userAddress   : this.commonservice.metaDetails.account,
          poolId        : this.selected_stake_pair._id,
          pairAddress   : this.selected_stake_pair.pair_address,
          rewardAddress : this.selected_stake_pair.rewardedaddress,
          txId          : result.transactionHash,
          status        : "Completed",
          amount        : amount
        }
        this.transaction_id = result.transactionHash;
        await this.dataservice.postUrl('deposit/createDeposit',depositData).subscribe((res:any)=>{
          console.log(res,'result of depositeinsertion');
        })
      }

      //Deposit


      //POPUP Max section
      stake_max(){
        this.stake_value.stake_pair_balance=this.pair_balance;
      }

      unstake_max(){
        this.stake_value.unstake_pair_balance=this.reward_amount;
      }
      
      //POPUP Max section

      // button check 
      async button_check(){
        // stake button
        if(this.pair_balance > 0){
            this.show_stake = true;
        }else{
            console.log("button_check else ----->");
            this.show_stake = false;
        }
        // harvest button
        if(this.reward_amount > 0){
            this.show_harvest = true;
        }else{
            this.show_harvest = false;
        }
        // unstake button
        if(this.selected_stake_pair.total_deposit > 0){
            this.show_unstake = true;
        }else{
            this.show_unstake = false;
        }
      }

      // unstake section

    	async unstake(){
        this.unstakebutton_loading  = true;
        this.uichange.changebackground();
        let Amount = this.rawstaked_balane;
        // unstake function call
          await this.stakeservice.UnstakeFunction(this.selected_stake_pair.rewardedaddress,StakeAbi,this.commonservice.metaDetails.account,this.selected_stake_pair.pair_address,Amount).then(async(result)=>{
            if(result.status) {
              this.commonservice.alertmessage("success","Unstake Successfully");
              this.withdrawInsert(result.result);
                this.uichange.clearbackground();
                setTimeout(()=>{
                  this.unstakebutton_loading  = false;
                  location.reload();
                }, 2000);
            } else {
              this.commonservice.alertmessage("error",result.message);
              setTimeout(()=>{
                location.reload();
                this.unstakebutton_loading  = false;
              },2000);
            }
          }).catch((error)=>{
              this.commonservice.alertmessage("error",error);
              setTimeout(()=>{
                location.reload();
                this.unstakebutton_loading  = false;
              },2000);
          });
	        // unstake function call
      	}

        async withdrawInsert(result){
	        let withdrawData = {
	          userAddress   : this.commonservice.metaDetails.account,
	          poolId        : this.selected_stake_pair._id,
	          pairAddress   : this.selected_stake_pair.pair_address,
	          txId          : result.transactionHash,
	          amount        : this.rawstaked_balane
	        }
        
	        await this.dataservice.postUrl('withdraw/createwithdraw',withdrawData).subscribe((res:any)=>{
	          // console.log(res,'result of withdrawDatainsertion');
	        });
      	}
    	// unstake section

      // harvest section
      async harvest(){
        this.harvestbutton_loading  = true;
        this.uichange.changebackground();
        
        // unstake function call
          await this.stakeservice.HarvestFunction(this.selected_stake_pair.rewardedaddress,StakeAbi,this.commonservice.metaDetails.account,this.selected_stake_pair.pair_address).then(async(result)=>{
            if(result.status) {
              this.commonservice.alertmessage("success","Harvest Successfully");
              this.harvestInsert(result.result);
                await this.uichange.clearbackground();
                setTimeout(()=>{
                  this.harvestbutton_loading  = false;
                  location.reload();
                }, 2000);
            } else {
              this.commonservice.alertmessage("error",result.message);
              setTimeout(()=>{
                location.reload();
                this.harvestbutton_loading  = false;
              },2000);
            }
          }).catch((error)=>{
              this.commonservice.alertmessage("error",error);
              setTimeout(()=>{
                location.reload();
                this.harvestbutton_loading  = false;
              },2000);
          });
        // unstake function call
      }

      async harvestInsert(result){
          let harveestData = {
            userAddress   : this.commonservice.metaDetails.account,
            poolId        : this.selected_stake_pair._id,
            pairAddress   : this.selected_stake_pair.pair_address,
            txId          : result.transactionHash,
            amount        : this.reward_amount,
          }
          await this.dataservice.postUrl('harvest/createHarvest',harveestData).subscribe((res:any)=>{
            // console.log(res,'result of harvestinsertion');
          });
      }
    // harvest section

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    Cancel(){
      this.stake_value.stake_pair_balance=0.0000
    }

    pricecal(method){
      if(method=="Staking"){
        if(this.pair_balance<this.stake_value.stake_pair_balance){
          this.stake_value.stake_pair_balance = 0
          this.show_stake_button       = false;
        }else{
          this.show_stake_button       = true;
        }
      }
    }

    show_Staking(){
      this.farminglist_show=true;
      this.depositpage_show=false;
    }

}
