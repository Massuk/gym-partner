import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'node_modules/slicknav/dist/jquery.slicknav.js';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  ngOnInit(): void {
    console.log();

    ('use strict');

    $(window).on('load', function () {
      /*------------------
        Preloader
      --------------------*/
      $('.loader').fadeOut();
      $('#preloder').delay(400).fadeOut('slow');
    });

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

      /*------------------
		      Circle progress
	      --------------------*/
      $('.circle-progress').each(function () {
        var cpvalue = $(this).data('cpvalue');
        var cpcolor = $(this).data('cpcolor');
        var cptitle = $(this).data('cptitle');
        var cpid = $(this).data('cpid');

        $(this).append(
          '<div class="' +
            cpid +
            '"></div><div class="progress-info"><h2>' +
            cpvalue +
            '%</h2><p>' +
            cptitle +
            '</p></div>'
        );
      });
    })(jQuery);
  }
}
