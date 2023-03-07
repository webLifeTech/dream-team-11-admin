import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/service/global.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public gs: GlobalService
  ) { }

  ngOnInit(): void {
  }

  sideBar() {
    if ($('#mysidebar').is(':visible')) {
      $('#mysidebar').animate({
        width: 'toggle'
      });
      $('.maincontent').css(
        'paddingLeft', '30px',
      );
    } else {
      $('#mysidebar').animate({
        width: 'toggle'
      });
      $('.maincontent').css(
        'paddingLeft', '180px',
      );
    }
  }

}
