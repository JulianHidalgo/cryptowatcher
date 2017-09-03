// Compiled using marko@4.4.19 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    include_tag = marko_loadTag(require("marko/src/taglibs/core/include-tag")),
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out) {
  var data = input;

  out.w("<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><title>Dashboard</title><meta name=\"description\" content=\"Dashboard\"><meta name=\"author\" content=\"SitePoint\"><style type=\"text/css\">\n        body {\n          -webkit-font-smoothing: antialiased;\n          -moz-osx-font-smoothing: grayscale;\n          font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n          font-weight: 400;\n          overflow-x: hidden;\n          overflow-y: auto;\n        }\n      table {\n        width: 80%;\n        font-size: 34px;\n        text-align: right;\n        margin-left: auto;\n        margin-right: auto;\n        border-collapse: collapse;\n      }\n      h2 {\n        background-color: #686883;\n        color: white;\n        padding: 10px;\n        font-size: 30px;\n      }\n      th {\n        border-bottom: solid 1px gray;\n      }\n      tr:nth-child(even) {\n        background: #eee;\n      }\n      .align-left {\n        text-align: left;\n      }\n      .align-center {\n        text-align: center;\n      }\n  </style><!--[if lt IE 9]>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js\"></script>\n  <![endif]--></head><body>");

  component_globals_tag({}, out);

  include_tag({
      _target: input.content
    }, out);

  init_components_tag({}, out);

  await_reorderer_tag({}, out);

  out.w("</body></html>");
}

marko_template._ = render;

marko_template.meta = {
    tags: [
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/taglibs/core/include-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
