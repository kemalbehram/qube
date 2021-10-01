import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/common/services/common/common.service';
import { UichangeService } from 'src/app/common/services/common/uichange.service';
import { DataService } from 'src/app/common/services/api/data.service';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  scrollbarOptions = { axis: 'x', theme: 'light-thin' };
  show:any=false;
  banner:any=[];

  constructor(private commonservice:CommonService,private uichangeservice:UichangeService,private dataservice:DataService,private mScrollbarService: MalihuScrollbarService) { }

  ngOnInit() {  
      this.bannerData();  

      $(".hot-stake-slider").slick({
        //infinite: true,
        autoplay:false,
        arrows:true,
        responsive: [{
            breakpoint: 2000,
            settings: {
              slidesToShow: 4,
              slidesToScroll:1,
              slidesPerRow:1,              
              //infinite: true,
            },
            
          },{
      
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
            }
        
          },
          {
      
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
            }
        
          },{
      
            breakpoint: 767,
            settings: "unslick" // destroys slick
        
          }]
        });

        $(".hot-artworks-slider").slick({
          //infinite: true,
          autoplay:false,
          arrows:true,
          responsive: [{
              breakpoint: 2000,
              settings: {
                slidesToShow: 4,
                slidesToScroll:1,
                slidesPerRow:1,
                adaptiveHeight:true,
                //infinite: true,
              },
              
            },{
        
              breakpoint: 1200,
              settings: {
                slidesToShow: 4,
              }
          
            },
            {
        
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
              }
          
            },{
        
              breakpoint: 767,
              settings: "unslick" // destroys slick
          
            }]
          });

          $(".projects-airdrops-slider").slick({
            //infinite: true,
            autoplay:false,
            arrows:true,
            responsive: [{
                breakpoint: 2000,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll:1,
                  slidesPerRow:1,
                  adaptiveHeight:true,
                  //infinite: true,
                },
                
              },{
          
                breakpoint: 1200,
                settings: {
                  slidesToShow: 3,
                }
            
              },
              {
          
                breakpoint: 991,
                settings: {
                  slidesToShow: 2,
                }
            
              },{
          
                breakpoint: 767,
                settings: "unslick" // destroys slick
            
              }]
            });
  }

  bannerData() {
    this.uichangeservice.changebackground();
    this.dataservice.getUrl('cms/getbanner').subscribe((result:any)=>{
        this.banner=result.data;
        if(this.banner.length > 0){
          setTimeout( ()=>{
            this.initCarousel();
            this.show=true;
            this.uichangeservice.clearbackground();
          });
        }
    });
  }

  initCarousel(){
     $(".slider").slick({      
      infinite: false,
      autoplay:true,
      responsive: [{
          breakpoint: 2000,
          settings: {
            slidesToShow: 1,
            infinite: true,
            dots: true
          }
        }, {
      
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            dots: true
          }
      
        }, {
      
          breakpoint: 300,
          settings: "unslick" // destroys slick
      
        }]
      });
  }

}
