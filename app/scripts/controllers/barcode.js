'use strict';

angular.module('barcodeApp')
  .controller('BarcodeCtrl', function ($scope, $http, $location) {

    $scope.rotates = [
      { value: 'N', label: '0' },
      { value: 'R', label: '90' },
      { value: 'L', label: '-90' },
      { value: 'I', label: '180' }
    ];

    $scope.scales = [1,2,3,4,5,6,7,8];

    $scope.text = '(01)03612345678904|(11)990102';
    $scope.type = null;
    $scope.scale = {
      width : 2,
      height : 2
    };
    $scope.rotate = $scope.rotates[0];
    $scope.backgroundcolor = '00000000';
    $scope.barcolor = '00000000';

    $scope.update = function() {
      if(!this.type) {
        return '';
      }

      var src = $location.protocol() + '://' + $location.host();
      if($location.port() != 80)
        src += ':' + $location.port();
      src += '/barcode/?';
      src += 'text=' + window.escape(this.text);
      src += '&bcid=' + (this.type.sym || 'code128');
      src += '&wscale=' + (this.scale.width || 2);
      src += '&hscale=' + (this.scale.height || 2);
      src += '&rotate=' + (this.rotate.value || 'N');

      if(this.alttext)
        src += '&alttext=' + window.escape(this.alttext);
      else if(this.includetext)
        src += '&alttext=' + window.escape(this.text);

      if(this.barcolor !== '00000000')
        src += '&barcolor=' + (this.barcolor);
      if(this.backgroundcolor !== '00000000')
        src += '&backgroundcolor=' + (this.backgroundcolor);

      // Sample options value
      // segments=4
      // custinfoenc=character
      // inkspread=-0.25
      // ccversion=c
      // cccolumns=4
      // format=full
      // version=B
      // eclevel=M

      [
        'width',
        'height',
        'rows',
        'columns',
        'segments',
        'inkspread',
        'ccversion',
        'cccolumns',
        'format',
        'version',
        'eclevel'
      ].forEach(function(option) {
        if(this[option])
          src += '&' + option + '=' + this[option];
      }, this);

      // Boolean Options
      [
        'parsefnc',
        'includetext',
        'guardwhitespace',
        'includecheckintext',
        'showborder',
        'includecheck',
        'numeric'
      ].forEach(function(option) {
        if(this[option])
          src += '&' + option;
      }, this);

      this.url = src;

      return src;
    }

    $http.get('/barcode/types').success(function(symdesc) {
      $scope.types = symdesc;
      if(!$scope.type) {
        var i = 0;
        for(i = 0;i < symdesc.length;i++) {
          var desc = symdesc[i];
          if(desc.sym === 'code128') {
            $scope.type = desc;
            break;
          }
        }
      }
    });
  });
