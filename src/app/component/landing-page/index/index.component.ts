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

    /*------------------
      Preloader
    --------------------*/
    console.log('Preloader started');
    $('.loader').fadeOut();
    $('#preloder').delay(400).fadeOut('slow', function() {
      console.log('Preloader finished');
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


    /*------------------
      Page Loaded Handler
    --------------------*/
    $(document).ready(function() {
      console.log('Page loaded completely');
    });

    /*------------------
      Error Handler for Window Load
    --------------------*/
    $(window).on('load', function () {
      if (document.readyState !== "complete") {
        console.error("Error: Page did not fully load.");
        // add your error message here
      }
    });
  }
}
