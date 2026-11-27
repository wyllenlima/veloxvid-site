/* VeloxVid — a versão publicada do aplicativo, num lugar só.
   Carregado por index.html e conta.html. Para trocar de versão, veja o
   HANDOFF.md, seção "Trocar a versão do aplicativo".

   Regra: só aponte para uma versão cuja release no GitHub tenha o arquivo
   VeloxVid-Setup.exe (o instalador completo, anexado à mão). As versões
   1.0.73 e 1.0.74, por exemplo, não têm. Por isso a versão é fixa, e não
   ".../releases/latest/...".

   Sem JavaScript, os botões de download levam à lista de versões no GitHub
   (o href escrito no HTML) e a linha de versão e tamanho não aparece. */
(function () {
  'use strict';

  var RELEASE = 'v1.0.76';            // a tag da release no GitHub
  var SIZE    = 'cerca de 380 MB';    // tamanho do VeloxVid-Setup.exe dessa release

  var URL = 'https://github.com/wyllenlima/VeloxVid-releases/releases/download/' + RELEASE + '/VeloxVid-Setup.exe';

  window.VELOXVID_RELEASE = { version: RELEASE, size: SIZE, url: URL };

  function each(selector, fn) {
    var list = document.querySelectorAll(selector);
    for (var i = 0; i < list.length; i++) fn(list[i]);
  }

  function apply() {
    each('[data-download]', function (a) { a.href = URL; });
    each('[data-release="version"]', function (el) { el.textContent = RELEASE; });
    each('[data-release="size"]', function (el) { el.textContent = SIZE; });
    each('.release-info', function (el) { el.hidden = false; });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
