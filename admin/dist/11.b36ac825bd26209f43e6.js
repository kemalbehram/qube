(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{DlsV:function(e,t,s){"use strict";s.r(t);var n=s("mrSG"),i=s("CcnG"),a=s("Ip0R"),o=s("PSRr"),l=s("3EpR"),r=s("gbi4"),c=s("4GxJ"),d=s("SbLv"),u=s("sE5F"),p=s("AytR"),m=s("EVdn"),g=function(){function e(e,t,s,n,i){this.toastr=e,this.modalService=t,this.CommonService=s,this.cookieService=n,this.http=i,this.userrows=[],this.userlist=[],this.usertemp=[],this.limits=[{key:"10",value:10},{key:"25",value:25},{key:"50",value:50},{key:"100",value:100}],this.page={size:this.limits[0].value,totalElements:0,totalPages:0,pageNumber:0},this.defsort={dir:"desc",prop:"modifieddate"},this.defsearch="",this.loading=!1,this.rowLimits=this.limits,this.limit=this.limits[0].value,this.viewuserdt={},this.serviceHost=p.a.BackendHost,this.cmslist=[],this.table_loader=!1,this.createpairlist={},this.addcms={},this.view_result={},this.editcms={},this.edit_value={},this.bannersvalue={},this.dataLoader=!1,this.editorConfig={},this.cmsIndx=0,this.diseditcms=!0,this.currency_submitted=!1,this.submitted=!1,this.filesToUpload1=[],this.filesToUpload2=[],this.filename1="",this.filename2="",this.imageuploadprof=!1,this.CommonService.sessioncheck(),this.CommonService.ipcheck()}return e.prototype.reset=function(){document.getElementById("idssss").value=""},e.prototype.resets=function(){document.getElementById("id_proof").value=""},e.prototype.ngOnInit=function(){this.loadcms(),this.ckeConfig={allowedContent:!1,removeButtons:"Source,Save,NewPage,DocProps,Preview,Print,Templates,document,Set language",forcePasteAsPlainText:!0}},e.prototype.opencreatepairmodel=function(e){return n.b(this,void 0,void 0,function(){return n.e(this,function(t){return this.modalRef=this.modalService.open(e,{size:"lg"}),[2]})})},e.prototype.openviewmodel=function(e,t){this.modalRef=this.modalService.open(e,{size:"lg"}),this.view_result=t},e.prototype.openCMSmodel=function(e,t){this.modalRef=this.modalService.open(e,{size:"lg"}),this.edit_value=t},e.prototype.opendeletemodel=function(e,t){this.modalRef=this.modalService.open(e,{size:"lg"}),this.bannersvalue=t},e.prototype.delete_faq=function(e){var t=this;this.CommonService.requestData("admin/deletefaq",e).subscribe(function(e){t.toastr.successToastr(e.msg,"Success!"),t.loadcms(),t.modalRef.close()})},e.prototype.loadcms=function(){var e=this;this.table_loader=!0,this.dataLoader=!0;var t={page:this.page,sorting:this.defsort,search:this.defsearch};this.loading=!0,this.CommonService.requestData("admin/faqlist",t).subscribe(function(t){e.page.totalElements=t.faqcount,e.page.totalPages=e.page.totalElements/e.page.size,e.userlist=t.data,e.usertemp=e.userlist,e.userrows=e.userlist,e.loading=!1,e.table_loader=!1,e.dataLoader=!1})},e.prototype.loaduserlist=function(e,t,s){var n=this;this.loading=!0;var i={page:e,sorting:t,search:s};this.CommonService.requestData("admin/faqlist",i).subscribe(function(e){n.userlist=e.data,n.usertemp=n.userlist,n.userrows=n.userlist,n.loading=!1})},e.prototype.changeRowLimits=function(e){this.userlist=[],this.usertemp=this.userlist,this.userrows=this.userlist,this.page.size=+e.target.value,this.page.pageNumber=0,this.usertable.limit=e.target.value,this.loaduserlist(this.page,this.defsort,this.defsearch)},e.prototype.resetuserlist=function(){var e=this;this.limits=[{key:"10",value:10},{key:"25",value:25},{key:"50",value:50},{key:"100",value:100}],this.limit=this.limits[0].value,this.rowLimits=this.limits,this.page={size:this.limits[0].value,totalElements:0,totalPages:0,pageNumber:0},this.defsort={dir:"desc",prop:"createddate"},this.defsearch="";var t={page:this.page,sorting:this.defsort,search:this.defsearch};this.loading=!0,this.CommonService.requestData("admin/faqlist",t).subscribe(function(t){e.page.totalElements=t.faqcount,e.page.totalPages=e.page.totalElements/e.page.size,e.userlist=t.data,e.usertemp=e.userlist,e.userrows=e.userlist,e.loading=!1})},e.prototype.updateFilter=function(){var e=this;this.loading=!0;var t={page:this.page,sorting:this.defsort,search:this.defsearch};this.CommonService.requestData("admin/faqlist",t).subscribe(function(t){e.page.totalElements=t.faqcount,e.page.totalPages=e.page.totalElements/e.page.size,e.userlist=t.data,e.usertemp=e.userlist,e.userrows=e.userlist,e.loading=!1})},e.prototype.setPage=function(e){this.userlist=[],this.usertemp=this.userlist,this.userrows=this.userlist,this.page.pageNumber=e.offset,this.loaduserlist(this.page,this.defsort,this.defsearch)},e.prototype.onSort=function(e){this.page.pageNumber=0,this.defsort=e.sorts[0],this.loaduserlist(this.page,this.defsort,this.defsearch)},e.prototype.getDismissReason=function(e){return e===c.a.ESC?"by pressing ESC":e===c.a.BACKDROP_CLICK?"by clicking on a backdrop":"with: ${reason}"},e.prototype.changeeditcmsevent=function(e){var t=m("#cmspagetitle");t.val()?t.removeClass("has-error").addClass("has-success"):t.removeClass("has-success").addClass("has-error"),t.val()&&""!=this.editcms.pagecontent&&""!=this.editcms.content_title?this.diseditcms=!1:this.diseditcms=!0},e.prototype.onSubmitData=function(e){var t=this;this.CommonService.requestData("admin/insertfaq",this.addcms).subscribe(function(e){t.toastr.successToastr(e.msg,"Success!"),t.loadcms(),t.modalRef.close()})},e.prototype.saveEditCMS=function(){var e=this;this.CommonService.requestData("admin/editfaq",this.edit_value).subscribe(function(t){e.toastr.successToastr(t.msg,"Success!"),e.loadcms(),e.modalRef.close()})},e.prototype.cancelcms=function(){this.loaduserlist(this.page,this.defsort,this.defsearch)},e.prototype.fileChangeEvent=function(e,t){this.value=t,this.imageuploadprof=!1;var s=e.target.files[0].type;this.filepath=s,"image/jpeg"==s||"image/gif"==s||"image/jpg"==s||"image/png"==s?("image"==this.value&&(this.filename1=e.target.files[0].name,this.im=e.target.im,this.filesToUpload1=e.target.files),"imagesec"==this.value&&(this.filename2=e.target.files[0].name,this.im=e.target.im,this.filesToUpload2=e.target.files)):(this.toastr.errorToastr("Please choose a right file!","Error"),"image"==this.value&&(this.filename1="",this.im="",this.filesToUpload1=[]),this.reset(),"imagesec"==this.value&&(this.filename2="",this.im="",this.filesToUpload2=[]),this.resets())},e.ctorParameters=function(){return[{type:l.a},{type:c.b},{type:r.a},{type:d.a},{type:u.b}]},n.c([Object(i.nb)(o.a,{static:!1}),n.f("design:type",o.a)],e.prototype,"usertable",void 0),e=n.c([Object(i.n)({selector:"app-faq",template:s("ZYsH"),styles:[s("Fd/p")]}),n.f("design:paramtypes",[l.a,c.b,r.a,d.a,u.b])],e)}(),h=s("ZYCi"),b=[{path:"",component:g,data:{title:"faq"}}],f=function(){function e(){}return e=n.c([Object(i.K)({declarations:[],imports:[a.b,h.d.forChild(b)],exports:[h.d]})],e)}(),v=s("gIcY"),y=s("fH49");s.d(t,"FaqModule",function(){return x});var x=function(){function e(){}return e=n.c([Object(i.K)({declarations:[g],imports:[a.b,f,u.c,o.b,v.a,y.a]})],e)}()},"Fd/p":function(e,t){e.exports=".loaders:after {\n  position: absolute;\n  top: 0;\n  left: 15px;\n  right: 15px;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.1);\n  background-image: url('5.7b330de345c6ea75b4bb.gif');\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: 50px 50px;\n  content: \"\";\n}"},ZYsH:function(e,t){e.exports='<div class="card">\n    <div class="card-header" style="background-color:#2f353a;color:#33adff;">\n          <i class="fa fa-align-justify"></i> FAQ Management\n        </div>\n\n\n\x3c!-- <h4 style="padding-left: 425px;">Manage Users</h4> --\x3e\n<div class="tabcntcls" style=" -webkit-transition: all 1s ease;transition: all 1s ease;padding: 25px;">\n  <div class="row">\n    <div class="col-md-9 align-items-center" style="display: inline-flex;padding-left: 0px;">\n      <span>Display : </span>\n      <select (change)="changeRowLimits($event)" style="width: auto;background: transparent;height: 30px;margin-left: 5px;">\n          <option *ngFor="let limit of rowLimits" [value]="limit.value">{{limit.key}}</option>\n      </select>\n\n      <div class="input-group-btn" style="margin-left: 10px;">\n        <button class="btn btn-primary button-refresh" style="cursor:pointer;" type="submit"  (click)="resetuserlist()">\n           <i class="fa fa-refresh" aria-hidden="true"></i>\n        </button>\n      </div>\n\n    </div>\n    <div class="col-md-3 p-2">\n\n        <div class="input-group">\n          <input type="text" [(ngModel)]="defsearch" class="form-control" placeholder="Search" id="txtSearch" (keyup.enter)="updateFilter()"  \n          (keyfocus)="updateFilter()"/>\n          <div class="input-group-btn">\n            <button class="btn btn-primary" style="cursor:pointer;margin-left: -2px;" type="submit" (click)="updateFilter()">\n              <span class="fa fa-search"></span>\n            </button>\n          </div>\n        </div>\n\n    </div>\n  </div>\n\n   <div class="d-flex flex-row-reverse">\n      <div class="export_option">\n        <ul class="list-inline">\n          <li class="list-inline-item btn btn-primary" (click)="opencreatepairmodel(addfaqcontent)" style="cursor:pointer;margin-left: -2px;">\n            {{\'Add FAQ +\'}}\n          </li>\n        </ul>\n      </div>\n    </div>\n\n  <div class="table-responsive tab_top">\n    <ngx-datatable #usertable class="bootstrap table table-bordered table-striped mb-0 material" [ngClass]="{\'loaders\': dataLoader == true }"\n    [columnMode]="\'force\'"\n    [headerHeight]="30"\n    [footerHeight]="50"\n    [rowHeight]="\'auto\'" [(limit)]="limit" [rows]=\'userrows\' [externalPaging]="true"\n        [count]="page.totalElements"\n        [offset]="page.pageNumber"\n        [limit]="page.size"\n        [scrollbarH]="true"\n        (page)=\'setPage($event)\' [externalSorting]="true" (sort)="onSort($event)" [loadingIndicator]="loading">\n\n    <ngx-datatable-column name="SNO" [width]="50">\n      <ng-template let-rowIndex="rowIndex" let-row="row" ngx-datatable-cell-template>\n        \x3c!-- {{row.$$index + 1}} --\x3e\n        \x3c!-- {{rowIndex + 1}} --\x3e\n        {{(page.pageNumber*page.size)+(rowIndex + 1)}}\n      </ng-template>\n    </ngx-datatable-column>\n       <ngx-datatable-column name="Question">\n      <ng-template let-value="value" let-row="row" ngx-datatable-cell-template>\n        {{row.question}}\n      </ng-template>\n    </ngx-datatable-column>\n\n    \x3c!-- <ngx-datatable-column name="Answer">\n      <ng-template let-value="value" let-row="row" ngx-datatable-cell-template>\n        {{row.answer}}\n      </ng-template>\n    </ngx-datatable-column> --\x3e\n  <ngx-datatable-column name="Action" [resizeable]="false" prop="_id" >\n    <ng-template ngx-datatable-cell-template let-value="value" let-row="row">\n  <button class="btn btn-link mr-1 mb-1 cursorcls" (click)="openCMSmodel(cmscontent,row)" style="outline:none;" ngbTooltip="Edit">\n   <i class="fa fa-edit"></i> </button>\n    <button class="btn btn-link mr-1 mb-1 cursorcls" \n     (click)="openviewmodel(viewcontent,row)"  ngbTooltip="View">\n      <i class="fa fa-eye" style="color:blue"></i>\n    </button> \n      \n      <button class="btn btn-link mr-1 mb-1 cursorcls" \n     (click)="opendeletemodel(deletecontent,row)"  ngbTooltip="View">\n      <i class="fa fa-trash" style="color:blue"></i>\n    </button> \n   </ng-template>\n </ngx-datatable-column>\n   \n    </ngx-datatable>\n  </div>\n</div>\n</div>\n\x3c!----delete faq---\x3e\n<ng-template #deletecontent let-c="close" let-d="dismiss">\n    <div class="modal-body" id="actiondialog">\n      <h6>Are you sure to delete FAQ ?</h6>\n    </div>\n    <div class="modal-footer">\n      <button type="button" class="btn btn-success cursorcls"\n      (click)="delete_faq(bannersvalue);c(\'Close click\')">Yes</button>\n      <button type="button" style="cursor: pointer;\n      background-color:#d9dce0;" class="btn cursorcls"\n      (click)="c(\'Close click\')">No</button>\n    </div>\n    </ng-template>\n\n\x3c!----delete faq-----\x3e\n\n\x3c!----edit faq---\x3e\n<ng-template #cmscontent let-c="close" let-d="dismiss">\n    <div class="modal-header">\n      <h6 class="modal-title text-uppercase">Edit FAQ</h6>\n      <button type="button" class="close" aria-label="Close" (click)="cancelcms();d(\'Cross click\')"  ngbTooltip="Close">\n        <span aria-hidden="true">&times;</span>\n      </button>\n    </div>\n    <div class="modal-body">\n       <div class="form-group row" >\n        <label for="example-text-input" class="col-2 col-form-label">Question</label>\n        <div class="col-10">\n          <input type="text" id="cmspagetitle"  class="form-control" placeholder="Content Title"\n           [(ngModel)]="edit_value.question"  #question="ngModel" name="question" required />\n        </div>\n      </div>\n      <div class="form-group row">\n        <label for="example-text-input" class="col-2 col-form-label">Answer</label>\n        <div class="col-10">\n          <ckeditor  [(ngModel)]="edit_value.answer" #answer="ngModel" name="answer"\n          (ngModelChange)="changeeditcmsevent($event)" \n          [config]="ckeConfig" ></ckeditor>\n        </div>\n      </div>\n    </div>\n    <div class="modal-footer">\n      <button type="button" [disabled]="diseditcms" style="cursor:pointer;background-color:#30CE6A;" class="btn btn-info cursorcls" (click)="saveEditCMS();c(\'Close click\')">Submit</button>\n      <button type="button" style="cursor:pointer;" class="btn btn-secondary cursorcls" (click)="cancelcms();c(\'Close click\')">Close</button>\n    </div>\n</ng-template>\n\n\x3c!---edit faq end----\x3e\n \n \x3c!----view faq---\x3e\n <ng-template #viewcontent let-c="close" let-d="dismiss">\n    <div class="modal-header">\n      <h6 class="modal-title text-uppercase">View FAQ</h6>\n      <button type="button" class="close" aria-label="Close" (click)="cancelcms();d(\'Cross click\')"  ngbTooltip="Close">\n        <span aria-hidden="true">&times;</span>\n      </button>\n    </div>\n    <div class="modal-body">\n       <div class="form-group row" >\n        <label for="example-text-input" class="col-2 col-form-label">Question</label>\n        <div class="col-10">\n          <input type="text" style="cursor: not-allowed;" id="cmspagetitle"  class="form-control" placeholder="Content Title"\n           [(ngModel)]="view_result.question" disabled required />\n        </div>\n      </div>\n      <div class="form-group row">\n        <label for="example-text-input" class="col-2 col-form-label">Answer</label>\n        <div class="col-10">\n          <ckeditor name="editor1" style="cursor: not-allowed;"  [(ngModel)]="view_result.answer"\n          (ngModelChange)="changeeditcmsevent($event)" \n          [config]="ckeConfig" disabled></ckeditor>\n        </div>\n      </div>\n    </div>\n    \x3c!-- <div class="modal-footer">\n      <button type="button" [disabled]="diseditcms" style="cursor:pointer;background-color:#30CE6A;" class="btn btn-info cursorcls" (click)="saveEditCMS();c(\'Close click\')">Submit</button>\n      <button type="button" style="cursor:pointer;" class="btn btn-secondary cursorcls" (click)="cancelcms();c(\'Close click\')">Close</button>\n    </div> --\x3e\n</ng-template>\n\x3c!---view faq end----\x3e\n\n\x3c!----add faq--------\x3e\n<ng-template #addfaqcontent let-c="close" let-d="dismiss" >\n      <div class="modal-header">\n        <h6 class="modal-title text-uppercase" style="color:#eb7d34;"><b>Add FAQ</b></h6>\n        <button type="button" *ngIf="dataLoader" (click)="restrictclose()" class="close" aria-label="Close" ngbTooltip="Close">\n        <span aria-hidden="true">&times;</span>\n        </button>\n         <button type="button" *ngIf="!dataLoader" (click)="d(\'Cross click\')" class="close" aria-label="Close" ngbTooltip="Close">\n        <span aria-hidden="true">&times;</span>\n        </button>\n      </div>\n      <div class="modal-body"  [ngClass]="{\'loaders\': dataLoader == true }">\n        <div class="common-border">\n          <form  autocomplete="off" (ngSubmit)="onSubmitData(createpair_form)" #createpair_form="ngForm">\n            <div class="form-group row" >\n\t\t        <label for="example-text-input" class="col-2 col-form-label">Question</label>\n\t\t        <div class="col-10">\n\t\t          <input type="text" id="cmspagetitle"  class="form-control" placeholder="Content Title"\n\t\t           [(ngModel)]="addcms.question" #question="ngModel" name="question"  required />\n\t\t        </div>\n\t\t    </div>\n\n            <div class="form-group row">\n\t\t        <label for="example-text-input" class="col-2 col-form-label">Answer</label>\n\t\t        <div class="col-10">\n\t\t          <ckeditor  [(ngModel)]="addcms.answer" #answer="ngModel" name="answer" \n\t\t          (ngModelChange)="changeeditcmsevent($event)" \n\t\t          [config]="ckeConfig" ></ckeditor>\n\t\t        </div>\n\t\t     </div>\n            <div class="modal-footer">\n              <div> \n                <button type="submit" [disabled] =\'createpair_form.invalid\' style="cursor: pointer; background-color:#349eeb;" class="btn btn-info cursorcls" >Submit</button>\n                <button type="button"  style="cursor: pointer;background-color:#eb3d34" class="btn btn-secondary cursorcls" (click)="c(\'Close click\')" >Close</button>\n              </div> \n            </div>\n          </form>\n        </div>\n      </div>\n</ng-template>\n\n    \x3c!---add faq end-------\x3e'}}]);