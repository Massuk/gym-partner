import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import 'node_modules/slicknav/dist/jquery.slicknav.js';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(public route: ActivatedRoute) {

  }
  ngOnInit(): void {

    (function ($) {
      /*------------------
        Navigation

        (<any>$('.main-menu')).slicknav({
        appendTo: '.header-section',
        allowParentLinks: true,
      });

      --------------------*/

      /*------------------
        Background Set
      --------------------*/
      $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
      });

      /*------------------
        Accordions
      --------------------*/
      $('.panel-link').on('click', function (e) {
        $('.panel-link').removeClass('active');
        var $this = $(this);
        if (!$this.hasClass('active')) {
          $this.addClass('active');
        }
        e.preventDefault();
      });
    })(jQuery);
  }
}
