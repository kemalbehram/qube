(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"3gzX":function(e,t){e.exports='<div class="card">\n    <div class="card-header" style="background-color:#2f353a;color:#33adff;">\n          <i class="fa fa-align-justify"></i> Detached Pool History\n        </div>\n\n\n\x3c!-- <h4 style="padding-left: 425px;">Manage Users</h4> --\x3e\n<div class="tabcntcls" style=" -webkit-transition: all 1s ease;transition: all 1s ease;padding: 25px;">\n  <div class="row ">\n    <div class="col-md-9 align-items-center" style="display: inline-flex;">\n      <span>Display : </span>\n      <select (change)="changeRowLimits($event)" style="width: auto;background: transparent;height: 30px;margin-left: 5px;">\n          <option *ngFor="let limit of rowLimits" [value]="limit.value">{{limit.key}}</option>\n      </select>\n\n      <div class="input-group-btn" style="margin-left: 10px;">\n        <button class="btn btn-primary button-refresh" style="cursor:pointer;" type="submit"  (click)="resetuserlist()">\n           <i class="fa fa-refresh" aria-hidden="true"></i>\n        </button>\n      </div>\n\n    </div>\n    <div class="col-md-3 p-2">\n\n        <div class="input-group">\n          <input type="text" [(ngModel)]="defsearch" class="form-control" placeholder="Search" id="txtSearch" (keyup.enter)="updateFilter()"  \n          (keyfocus)="updateFilter()"/>\n          <div class="input-group-btn">\n            <button class="btn btn-primary" style="cursor:pointer;margin-left: -2px;" type="submit" (click)="updateFilter()">\n              <span class="fa fa-search"></span>\n            </button>\n          </div>\n        </div>\n\n    </div>\n  </div>\n\n  <div class="table-responsive tab_top">\n    <ngx-datatable #usertable class="bootstrap table table-bordered table-striped mb-0 material" [ngClass]="{\'table-loaders\': table_loader == true }"\n\n    [columnMode]="\'force\'"\n    [headerHeight]="30"\n    [footerHeight]="50"\n    [rowHeight]="\'auto\'" [(limit)]="limit" [rows]=\'userrows\' [externalPaging]="true"\n        [count]="page.totalElements"\n        [offset]="page.pageNumber"\n        [limit]="page.size"\n        [scrollbarH]="true"\n        (page)=\'setPage($event)\' [externalSorting]="true" (sort)="onSort($event)" [loadingIndicator]="loading">\n\n    <ngx-datatable-column name="S.No" [width]="50">\n      <ng-template let-rowIndex="rowIndex" let-row="row" ngx-datatable-cell-template>\n        \x3c!-- {{row.$$index + 1}} --\x3e\n        \x3c!-- {{rowIndex + 1}} --\x3e\n        {{(page.pageNumber*page.size)+(rowIndex + 1)}}\n      </ng-template>\n    </ngx-datatable-column>\n\n\n    <ngx-datatable-column name="Pair">\n      <ng-template let-value="value" let-row="row" ngx-datatable-cell-template>\n        {{row.pair}}\n      </ng-template>\n    </ngx-datatable-column>\n    <ngx-datatable-column name="User Address">\n      <ng-template let-value="value" let-row="row" ngx-datatable-cell-template>\n        {{row.user_address}}\n      </ng-template>\n    </ngx-datatable-column>\n    \n    <ngx-datatable-column name="Removed %">\n      <ng-template let-value="value" let-row="row" ngx-datatable-cell-template>\n        {{row.percentage}}\n      </ng-template>\n    </ngx-datatable-column> \n\n    <ngx-datatable-column name="Removed Pool Balance" [width]="180">\n      <ng-template let-value="value" let-row="row" ngx-datatable-cell-template>\n        {{row.balance}}\n      </ng-template>\n    </ngx-datatable-column>\n\n    \x3c!-- <ngx-datatable-column name="Removed Pool Balance">\n      <ng-template let-value="value" let-row="row" ngx-datatablsse-cell-template>\n        {{row.balance}}\n      </ng-template>\n    </ngx-datatable-column> --\x3e\n\n    <ngx-datatable-column name="Txn Id" [width]="100">\n      <ng-template let-value="value" let-row="row" ngx-datatable-cell-template>\n        <a href="https://testnet.bscscan.com/tx/{{row.tx_id}}" target="_blank">{{row.tx_id}}</a>\n      </ng-template>\n    </ngx-datatable-column>\n    \n    <ngx-datatable-column name="Status">\n      <ng-template let-value="value" let-row="row" ngx-datatable-cell-template>\n        {{row.status}}\n      </ng-template>\n    </ngx-datatable-column>\n\n    <ngx-datatable-column name="Created At">\n      <ng-template let-value="value" let-row="row" ngx-datatable-cell-template>\n        {{row.created_date |date:\'medium\'}}\n      </ng-template>\n    </ngx-datatable-column>\n  \n    </ngx-datatable>\n  </div>\n</div>\n</div>\n<ng-template #cmscontent let-c="close" let-d="dismiss">\n    <div class="modal-header">\n      <h6 class="modal-title text-uppercase">Edit Cms</h6>\n      <button type="button" class="close" aria-label="Close" (click)="cancelcms();d(\'Cross click\')"  ngbTooltip="Close">\n        <span aria-hidden="true">&times;</span>\n      </button>\n    </div>\n    <div class="modal-body">\n      <div class="form-group row">\n        <label for="example-text-input" class="col-3 col-form-label">Page Title</label>\n        <div class="col-9">\n          <input type="text" id="cmspagetitle" style="cursor:not-allowed;" class="form-control" placeholder="Page Title"\n           [(ngModel)]="editcms.title" required (change)="changeeditcmsevent($event)" disabled="true" />\n        </div>\n      </div>\n      <div class="form-group row">\n        <label for="example-text-input" class="col-3 col-form-label">Page Content</label>\n        <div class="col-9">\n          <ckeditor name="editor1" [(ngModel)]="editcms.pagecontent"\n          (ngModelChange)="changeeditcmsevent($event)" \n          [config]="ckeConfig" ></ckeditor>\n        </div>\n      </div>\n\n    </div>\n    <div class="modal-footer">\n      <button type="button" [disabled]="diseditcms" style="cursor:pointer;background-color:#30CE6A;" class="btn btn-info cursorcls" (click)="saveEditCMS();c(\'Close click\')">Submit</button>\n      <button type="button" style="cursor:pointer;" class="btn btn-secondary cursorcls" (click)="cancelcms();c(\'Close click\')">Close</button>\n    </div>\n</ng-template>\n \x3c!-- <div class="col-md-9 mb-4"> --\x3e\n \x3c!-- <tabset>\n      <tab heading="Home Page Content">\n      <div class="card">\n      <div class="card-header">\n      <strong>General Settings</strong> \n      </div>\n      <div class="card-body">\n      1. Firat.\n      </div>\n      <div class="card-footer" style="text-align: center;">\n      </div>\n      </div>\n      </tab>\n        <tab heading="Profile">\n          2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n        </tab>\n        <tab heading="Messages">\n          3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n        </tab>\n      </tabset> --\x3e\n    \x3c!-- </div> --\x3e'},Y09I:function(e,t,a){"use strict";a.r(t);var s=a("mrSG"),n=a("CcnG"),i=a("Ip0R"),l=a("ZYCi"),o=a("PSRr"),r=a("3EpR"),c=a("gbi4"),d=a("4GxJ"),u=a("SbLv"),p=a("sE5F"),m=a("AytR"),g=a("EVdn"),h=function(){function e(e,t,a,s,n){this.toastr=e,this.modalService=t,this.CommonService=a,this.cookieService=s,this.http=n,this.userrows=[],this.userlist=[],this.usertemp=[],this.limits=[{key:"10",value:10},{key:"25",value:25},{key:"50",value:50},{key:"100",value:100}],this.page={size:this.limits[0].value,totalElements:0,totalPages:0,pageNumber:0},this.defsort={dir:"desc",prop:"created_date"},this.defsearch="",this.loading=!1,this.rowLimits=this.limits,this.limit=this.limits[0].value,this.viewuserdt={},this.serviceHost=m.a.BackendHost,this.cmslist=[],this.table_loader=!1,this.editorConfig={},this.editcms={title:"",pagecontent:"",pagekey:""},this.cmsIndx=0,this.diseditcms=!0,this.CommonService.sessioncheck(),this.CommonService.ipcheck(),this.loadcms()}return e.prototype.ngOnInit=function(){this.ckeConfig={allowedContent:!1,removeButtons:"Source,Save,NewPage,DocProps,Preview,Print,Templates,document,Set language",forcePasteAsPlainText:!0}},e.prototype.loadcms=function(){var e=this;this.table_loader=!0;var t={page:this.page,sorting:this.defsort,search:this.defsearch};this.loading=!0,this.CommonService.requestData("pool/remove_poollist",t).subscribe(function(t){e.page.totalElements=t.totalCount,e.page.totalPages=e.page.totalElements/e.page.size,e.userlist=t.data,e.usertemp=e.userlist,e.userrows=e.userlist,e.loading=!1,e.table_loader=!1})},e.prototype.loaduserlist=function(e,t,a){var s=this;this.loading=!0;var n={page:e,sorting:t,search:a};this.CommonService.requestData("pool/remove_poollist",n).subscribe(function(e){s.userlist=e.data,s.usertemp=s.userlist,s.userrows=s.userlist,s.loading=!1})},e.prototype.changeRowLimits=function(e){this.userlist=[],this.usertemp=this.userlist,this.userrows=this.userlist,this.page.size=+e.target.value,this.page.pageNumber=0,this.usertable.limit=e.target.value,this.loaduserlist(this.page,this.defsort,this.defsearch)},e.prototype.resetuserlist=function(){var e=this;this.limits=[{key:"10",value:10},{key:"25",value:25},{key:"50",value:50},{key:"100",value:100}],this.limit=this.limits[0].value,this.rowLimits=this.limits,this.page={size:this.limits[0].value,totalElements:0,totalPages:0,pageNumber:0},this.defsort={dir:"desc",prop:"created_date"},this.defsearch="";var t={page:this.page,sorting:this.defsort,search:this.defsearch};this.loading=!0,this.CommonService.requestData("pool/remove_poollist",t).subscribe(function(t){e.page.totalElements=t.totalCount,e.page.totalPages=e.page.totalElements/e.page.size,e.userlist=t.data,e.usertemp=e.userlist,e.userrows=e.userlist,e.loading=!1})},e.prototype.updateFilter=function(){var e=this;this.loading=!0;var t={page:this.page,sorting:this.defsort,search:this.defsearch};this.CommonService.requestData("pool/remove_poollist",t).subscribe(function(t){e.page.totalElements=t.totalCount,e.page.totalPages=e.page.totalElements/e.page.size,e.userlist=t.data,e.usertemp=e.userlist,e.userrows=e.userlist,e.loading=!1})},e.prototype.setPage=function(e){this.userlist=[],this.usertemp=this.userlist,this.userrows=this.userlist,this.page.pageNumber=e.offset,this.loaduserlist(this.page,this.defsort,this.defsearch)},e.prototype.onSort=function(e){this.page.pageNumber=0,this.defsort=e.sorts[0],this.loaduserlist(this.page,this.defsort,this.defsearch)},e.prototype.openCMSmodel=function(e,t){var a=this,s=this.userlist.filter(function(e){return-1!==e._id.indexOf(t)||!t});this.editcms=s[0],this.cmsIndx=this.userlist.indexOf(this.userrows.filter(function(e){return e._id==t})[0]),this.modalRef=this.modalService.open(e,{size:"lg"}),this.modalRef.result.then(function(e){a.closeResult="Closed with: "+e},function(e){a.closeResult="Dismissed "+a.getDismissReason(e)}),this.diseditcms=!1},e.prototype.getDismissReason=function(e){return e===d.a.ESC?"by pressing ESC":e===d.a.BACKDROP_CLICK?"by clicking on a backdrop":"with: ${reason}"},e.prototype.changeeditcmsevent=function(e){var t=g("#cmspagetitle");t.val()?t.removeClass("has-error").addClass("has-success"):(t.removeClass("has-success").addClass("has-error"),e.preventDefault()),t.val()&&""!=this.editcms.pagecontent?this.diseditcms=!1:this.diseditcms=!0},e.prototype.saveEditCMS=function(){var e=this,t=this.editcms.pagecontent.replace(/&nbsp; /g,"").replace(/&nbsp;/g,"").replace("<p>","").replace("</p>","").replace(/ /g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">");""==(t=t.toString()).trim()?(this.toastr.errorToastr("Please give a proper answer!","Error"),this.editcms.pagecontent=""):this.CommonService.requestData("admin/editcms",this.editcms).subscribe(function(t){e.userlist[e.cmsIndx]=t.data[0],e.userrows=e.userlist,e.toastr.successToastr("CMS details are Updated!","Success"),e.modalRef.close()})},e.prototype.cancelcms=function(){this.loaduserlist(this.page,this.defsort,this.defsearch)},e.ctorParameters=function(){return[{type:r.a},{type:d.b},{type:c.a},{type:u.a},{type:p.b}]},s.c([Object(n.nb)(o.a,{static:!1}),s.f("design:type",o.a)],e.prototype,"usertable",void 0),e=s.c([Object(n.n)({selector:"app-cms",template:a("3gzX"),styles:[a("wPQz")]}),s.f("design:paramtypes",[r.a,d.b,c.a,u.a,p.b])],e)}(),b=[{path:"",component:h,data:{title:"cms"}}],v=function(){function e(){}return e=s.c([Object(n.K)({declarations:[],imports:[i.b,l.d.forChild(b)],exports:[l.d]})],e)}(),f=a("gIcY"),x=a("fH49"),w=a("YAQW");a.d(t,"CmsModule",function(){return y});var y=function(){function e(){}return e=s.c([Object(n.K)({declarations:[h],imports:[i.b,v,o.b,f.a,x.a,w.a]})],e)}()},wPQz:function(e,t){e.exports=".table-loaders:after {\n  position: absolute;\n  top: 0;\n  left: 15px;\n  right: 15px;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.1);\n  background-image: url('5.7b330de345c6ea75b4bb.gif');\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: 50px 50px;\n  content: \"\";\n}"}}]);