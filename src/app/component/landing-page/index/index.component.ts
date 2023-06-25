import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import 'node_modules/slicknav/dist/jquery.slicknav.js';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

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
        console.log(bg); // Verifica si bg contiene la ruta correcta
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
