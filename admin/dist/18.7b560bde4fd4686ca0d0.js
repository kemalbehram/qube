(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{"5iAg":function(t,e,n){"use strict";n.r(e);var s=n("mrSG"),i=n("CcnG"),a=n("Ip0R"),o=n("ZYCi"),r=n("PSRr"),l=n("3EpR"),p=n("gbi4"),c=n("4GxJ"),d=n("SbLv"),u=n("sE5F"),h=n("RH9n"),g=n("AytR"),m=function(){function t(t,e,n,s,i,a){this.socket=t,this.toastr=e,this.modalService=n,this.CommonService=s,this.cookieService=i,this.http=a,this.userrows=[],this.userlist=[],this.usertemp=[],this.limits=[{key:"10",value:10},{key:"25",value:25},{key:"50",value:50},{key:"100",value:100}],this.page={size:this.limits[0].value,totalElements:0,totalPages:0,pageNumber:0},this.defsort={dir:"desc",prop:"created_date"},this.defsearch="",this.loading=!1,this.rowLimits=this.limits,this.limit=this.limits[0].value,this.viewuserdt={},this.serviceHost=g.a.BackendHost,this.exchangelist={},this.deposit={},this.environment=g.a,this.textcnt=["Please upload","Please upload","Please upload"],this.with_otp=!1;var o=localStorage.srchval;null==o||""==o?this.defsearch="":"user_count"==o?this.defsearch="":"activated_user"==o?this.defsearch="active":"inactive_user"==o?this.defsearch="deactive":"pending_kyc"==o&&(this.defsearch="In progress")}return t.prototype.ngOnInit=function(){this.CommonService.sessioncheck(),this.CommonService.ipcheck(),this.loadcurrency()},t.prototype.userwholelist=function(){this.CommonService.getData("deposit/depositlist").subscribe(function(t){for(var e=0;e<t.data.length;e++);})},t.prototype.userwholelist1=function(){this.CommonService.getData("deposit/depositlist").subscribe(function(t){for(var e=0;e<t.data.length;e++);})},t.prototype.loadcurrency=function(){var t=this,e={page:this.page,sorting:this.defsort,search:this.defsearch};this.loading=!0,this.CommonService.requestData("deposit/depositlist",e).subscribe(function(e){localStorage.removeItem("srchval"),t.page.totalElements=e.holderscount,t.page.totalPages=t.page.totalElements/t.page.size,t.userlist=e.data,t.usertemp=t.userlist,t.userrows=t.userlist,t.loading=!1})},t.prototype.loaduserlist=function(t,e,n){var s=this;this.loading=!0;var i={page:t,sorting:e,search:n};this.CommonService.requestData("deposit/depositlist",i).subscribe(function(t){s.userlist=t.data,s.usertemp=s.userlist,s.userrows=s.userlist,s.loading=!1})},t.prototype.changeRowLimits=function(t){this.CommonService.sessioncheck(),this.userlist=[],this.usertemp=this.userlist,this.userrows=this.userlist,this.page.size=+t.target.value,this.page.pageNumber=0,this.usertable.limit=t.target.value,this.loaduserlist(this.page,this.defsort,this.defsearch)},t.prototype.resetuserlist=function(){var t=this;this.CommonService.sessioncheck(),this.limits=[{key:"10",value:10},{key:"25",value:25},{key:"50",value:50},{key:"100",value:100}],this.limit=this.limits[0].value,this.rowLimits=this.limits,this.page={size:this.limits[0].value,totalElements:0,totalPages:0,pageNumber:0},this.defsort={dir:"desc",prop:"created_date"},this.defsearch="";var e={page:this.page,sorting:this.defsort,search:this.defsearch};this.loading=!0,this.CommonService.requestData("deposit/depositlist",e).subscribe(function(e){t.page.totalElements=e.holderscount,t.page.totalPages=t.page.totalElements/t.page.size,t.userlist=e.data,t.usertemp=t.userlist,t.userrows=t.userlist,t.loading=!1})},t.prototype.updateFilter=function(){var t=this;this.CommonService.sessioncheck(),this.loading=!0;var e={page:this.page,sorting:this.defsort,search:this.defsearch};this.CommonService.requestData("deposit/depositlist",e).subscribe(function(e){t.page.totalElements=e.holderscount,t.page.totalPages=t.page.totalElements/t.page.size,t.userlist=e.data,t.usertemp=t.userlist,t.userrows=t.userlist,t.loading=!1})},t.prototype.setPage=function(t){this.userlist=[],this.usertemp=this.userlist,this.userrows=this.userlist,this.page.pageNumber=t.offset,this.loaduserlist(this.page,this.defsort,this.defsearch)},t.prototype.onSort=function(t){this.page.pageNumber=0,this.defsort=t.sorts[0],this.loaduserlist(this.page,this.defsort,this.defsearch)},t.ctorParameters=function(){return[{type:h.a},{type:l.a},{type:c.b},{type:p.a},{type:d.a},{type:u.b}]},s.c([Object(i.nb)(r.a,{static:!1}),s.f("design:type",r.a)],t.prototype,"usertable",void 0),t=s.c([Object(i.n)({selector:"app-usermanage",template:n("9vis"),styles:[n("ERuz")]}),s.f("design:paramtypes",[h.a,l.a,c.b,p.a,d.a,u.b])],t)}(),b=[{path:"",component:m,data:{title:"usermanage"}}],f=function(){function t(){}return t=s.c([Object(i.K)({declarations:[],imports:[a.b,o.d.forChild(b)],exports:[o.d]})],t)}(),x=n("gIcY");n.d(e,"UsermanageModule",function(){return v});var v=function(){function t(){}return t=s.c([Object(i.K)({declarations:[m],imports:[a.b,f,x.a,r.b]})],t)}()},"9vis":function(t,e){t.exports='<div class="card">\n    <div class="card-header" style="background-color:#2f353a;color:#33adff;">\n      <i class="fa fa-align-justify"></i> Stake History\n    </div>\n\n\n\x3c!-- <h4 style="padding-left: 425px;">Manage Users</h4> --\x3e\n  <div class="tabcntcls" style=" -webkit-transition: all 1s ease;transition: all 1s ease;padding: 25px;">\n    <div class="row col-md-12">\n      <div class="col-md-4 mob-user-manage" style="display: inline-flex;padding-left: 0px;">\n        <span style="line-height: 28px;">Display : </span>\n        <select (change)="changeRowLimits($event)" style="width: auto;background: transparent;height: 30px;margin-left: 5px;">\n            <option *ngFor="let limit of rowLimits" [value]="limit.value">{{limit.key}}</option>\n        </select>\n        <div class="input-group-btn" style="margin-left: 10px;">\n          <button class="btn btn-primary button-refresh" style="cursor:pointer;" type="submit"  (click)="resetuserlist()">\n             <i class="fa fa-refresh" aria-hidden="true"></i>\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <div class="table-responsive tab_top">\n      <ngx-datatable #usertable class="bootstrap table table-bordered table-striped mb-0 material"\n        [columnMode]="\'force\'"\n        [headerHeight]="30"\n        [footerHeight]="50"\n        [rowHeight]="\'auto\'" [(limit)]="limit" [rows]=\'userrows\' [externalPaging]="true"\n        [count]="page.totalElements"\n        [offset]="page.pageNumber"\n        [limit]="page.size"\n        [scrollbarH]="true"\n        (page)=\'setPage($event)\' [externalSorting]="true" (sort)="onSort($event)" [loadingIndicator]="loading">\n\n        <ngx-datatable-column name="S.No" [width]="50">\n          <ng-template let-rowIndex="rowIndex" let-row="row" ngx-datatable-cell-template>\n            \x3c!-- {{row.$$index + 1}} --\x3e\n            \x3c!-- {{rowIndex + 1}} --\x3e\n            {{(page.pageNumber*page.size)+(rowIndex + 1)}}\n          </ng-template>\n        </ngx-datatable-column>\n        <ngx-datatable-column name="User Address">\n          <ng-template let-value="value" let-row="row" ngx-datatable-cell-template>\n            {{row.userAddress}}\n          </ng-template>\n        </ngx-datatable-column>\n        <ngx-datatable-column name="Pair">\n          <ng-template let-value="value" let-row="row" ngx-datatable-cell-template>\n            {{row.pair}}\n          </ng-template>\n        </ngx-datatable-column>\n        <ngx-datatable-column name="Amount">\n          <ng-template let-value="value" let-row="row" ngx-datatable-cell-template>\n            {{row.amount}}\n          </ng-template>\n        </ngx-datatable-column>\n        <ngx-datatable-column name="Transaction Hash">\n          <ng-template let-value="value" let-row="row" ngx-datatable-cell-template>\n            <a href="https://testnet.bscscan.com/tx/{{row.txId}}" target="_blank">{{row.txId}}</a>\n          </ng-template>\n        </ngx-datatable-column>\n        <ngx-datatable-column name="Created At" prop="createddate">\n          <ng-template let-value="value" let-row="row" ngx-datatable-cell-template>\n            <span class="brkwrdcls">{{row.created_date | date:\'medium\'}}</span>\n          </ng-template>\n        </ngx-datatable-column>\n      </ngx-datatable>\n    </div>\n  </div>\n</div>\n'},ERuz:function(t,e){t.exports='.switch {\n  position: relative;\n  display: inline-block;\n  width: 60px;\n  height: 34px;\n}\n\n.switch input {\n  display: none;\n}\n\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  transition: 0.4s;\n}\n\n.slider:before {\n  position: absolute;\n  content: "";\n  height: 26px;\n  width: 26px;\n  left: 4px;\n  bottom: 4px;\n  background-color: white;\n  transition: 0.4s;\n}\n\ninput:checked + .slider {\n  background-color: #2196F3;\n}\n\ninput:focus + .slider {\n  box-shadow: 0 0 1px #2196F3;\n}\n\ninput:checked + .slider:before {\n  -webkit-transform: translateX(26px);\n  transform: translateX(26px);\n}\n\n.slider.round {\n  border-radius: 34px;\n}\n\n.slider.round:before {\n  border-radius: 50%;\n}\n\n.on {\n  display: none;\n}\n\n.on, .off {\n  color: white;\n  position: absolute;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  top: 50%;\n  left: 50%;\n  font-size: 12px;\n  font-family: Verdana, sans-serif;\n}\n\ninput:checked + .slider .on {\n  display: block;\n}\n\ninput:checked + .slider .off {\n  display: none;\n}\n\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 90px;\n  height: 34px;\n}\n\n.switch input {\n  display: none;\n}\n\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ca2222;\n  transition: 0.4s;\n}\n\n.slider:before {\n  position: absolute;\n  content: "";\n  height: 26px;\n  width: 26px;\n  left: 4px;\n  bottom: 4px;\n  background-color: white;\n  transition: 0.4s;\n}\n\ninput:checked + .slider {\n  background-color: #2ab934;\n}\n\ninput:focus + .slider {\n  box-shadow: 0 0 1px #2196F3;\n}\n\ninput:checked + .slider:before {\n  -webkit-transform: translateX(55px);\n  transform: translateX(55px);\n}\n\n.switch2 {\n  position: relative;\n  display: inline-block;\n  width: 30px;\n  height: 17px;\n}\n\n.switch2 input {\n  display: none;\n}\n\n.slider2 {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  transition: 0.4s;\n}\n\n.slider2:before {\n  position: absolute;\n  content: "";\n  height: 13px;\n  width: 13px;\n  left: 2px;\n  bottom: 2px;\n  background-color: white;\n  transition: 0.4s;\n}\n\ninput:checked + .slider2 {\n  background-color: #2196F3;\n}\n\ninput:focus + .slider2 {\n  box-shadow: 0 0 1px #2196F3;\n}\n\ninput:checked + .slider2:before {\n  -webkit-transform: translateX(26px);\n  transform: translateX(26px);\n}\n\n.slider2.round {\n  border-radius: 17px;\n}\n\n.slider2.round:before {\n  border-radius: 50%;\n}\n\n.on {\n  display: none;\n}\n\n.on, .off {\n  color: white;\n  position: absolute;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  top: 50%;\n  left: 50%;\n  font-size: 12px;\n  font-family: Verdana, sans-serif;\n}\n\ninput:checked + .slider2 .on {\n  display: block;\n}\n\ninput:checked + .slider2 .off {\n  display: none;\n}\n\n.switch2 {\n  position: relative;\n  display: inline-block;\n  width: 45px;\n  height: 17px;\n}\n\n.switch2 input {\n  display: none;\n}\n\n.slider2 {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ca2222;\n  transition: 0.4s;\n}\n\n.slider2:before {\n  position: absolute;\n  content: "";\n  height: 13px;\n  width: 13px;\n  left: 2px;\n  bottom: 2px;\n  background-color: white;\n  transition: 0.4s;\n}\n\ninput:checked + .slider2 {\n  background-color: #2ab934;\n}\n\ninput:focus + .slider2 {\n  box-shadow: 0 0 1px #2196F3;\n}\n\ninput:checked + .slider2:before {\n  -webkit-transform: translateX(26px);\n  transform: translateX(26px);\n}\n\n.modal-body .reason label {\n  font-weight: 600;\n}\n\n.modal-body .reason input {\n  margin-right: 10px;\n}'}}]);