// Compiled using marko@4.4.19 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    page_template = marko_loadTemplate(require.resolve("./page.marko")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_loadTag = marko_helpers.t,
    include_tag = marko_loadTag(require("marko/src/taglibs/core/include-tag"));

function render(input, out) {
  var data = input;

  include_tag({
      _target: page_template,
      title: "Dashboard",
      contentTitle: "Dashboard",
      content: {
          renderBody: function renderBody(out) {
            out.w("<h2>Balance</h2><table cellpadding=\"5\"><thead><tr><th class=\"align-left\">Currency</th><th>Balance</th><th>Last Price</th></tr></thead><tbody>");

            marko_forEach(data.balance, function(r) {
              out.w("<tr><td class=\"align-left\">" +
                marko_escapeXml(r.Currency) +
                "</td><td>" +
                marko_escapeXml(r.Balance.toFixed(8)) +
                "</td><td>" +
                marko_escapeXml(r.Last != null ? r.Last.toFixed(8) : "") +
                "</td></tr>");
            });

            out.w("</tbody></table><h2>Open Orders</h2><table cellpadding=\"5\"><thead><tr><th class=\"align-left\">Exchange</th><th class=\"align-center\">Order Type</th><th>Quantity</th><th>Limit</th></tr></thead><tbody>");

            marko_forEach(data.orders, function(r) {
              out.w("<tr><td class=\"align-left\">" +
                marko_escapeXml(r.Exchange) +
                "</td><td class=\"align-center\">" +
                marko_escapeXml(r.OrderType.replace("LIMIT_BUY", "Buy").replace("LIMIT_SELL", "Sell")) +
                "</td><td>" +
                marko_escapeXml(r.Quantity.toFixed(2)) +
                "</td><td>" +
                marko_escapeXml(r.Limit.toFixed(8)) +
                "</td></tr>");
            });

            out.w("</tbody></table><h2>Market History</h2><table cellpadding=\"5\"><thead><tr><th>Type</th><th>Quantity</th><th>Total</th><th>Price</th> </tr></thead><tbody>");

            marko_forEach(data.marketHistory.slice(0, 10), function(r) {
              out.w("<tr><td>" +
                marko_escapeXml(r.OrderType.replace("BUY", "Buy").replace("SELL", "Sell")) +
                "</td><td>" +
                marko_escapeXml(r.Quantity.toFixed(2)) +
                "</td><td>" +
                marko_escapeXml(r.Total.toFixed(8)) +
                "</td><td>" +
                marko_escapeXml(r.Price.toFixed(8)) +
                "</td></tr>");
            });

            out.w("</tbody></table><h2>Bids</h2><table cellpadding=\"5\"><thead><tr><th>Quantity</th><th>Rate</th></tr></thead><tbody>");

            marko_forEach(data.orderBook.buy.slice(0, 10), function(r) {
              out.w("<tr><td>" +
                marko_escapeXml(r.Quantity.toFixed(2)) +
                "</td><td>" +
                marko_escapeXml(r.Rate.toFixed(8)) +
                "</td></tr>");
            });

            out.w("</tbody></table><h2>Asks</h2><table cellpadding=\"5\"><thead><tr><th>Quantity</th><th>Rate</th></tr></thead><tbody>");

            marko_forEach(data.orderBook.sell.slice(0, 10), function(r) {
              out.w("<tr><td>" +
                marko_escapeXml(r.Quantity.toFixed(2)) +
                "</td><td>" +
                marko_escapeXml(r.Rate.toFixed(8)) +
                "</td></tr>");
            });

            out.w("</tbody></table><h2>Completed Orders</h2><table cellpadding=\"5\"><thead><tr><th class=\"align-left\">Exchange</th><th class=\"align-center\">Order Type</th><th>Quantity</th><th>Limit</th></tr></thead><tbody>");

            marko_forEach(data.historicOrders.slice(0, 10), function(r) {
              out.w("<tr><td class=\"align-left\">" +
                marko_escapeXml(r.Exchange) +
                "</td><td class=\"align-center\">" +
                marko_escapeXml(r.OrderType.replace("LIMIT_BUY", "Buy").replace("LIMIT_SELL", "Sell")) +
                "</td><td>" +
                marko_escapeXml(r.Quantity.toFixed(2)) +
                "</td><td>" +
                marko_escapeXml(r.Limit.toFixed(8)) +
                "</td></tr>");
            });

            out.w("</tbody></table>");
          }
        },
      [hasRenderBodyKey]: true
    }, out);
}

marko_template._ = render;

marko_template.meta = {
    tags: [
      "./page.marko",
      "marko/src/taglibs/core/include-tag"
    ]
  };
