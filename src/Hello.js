/**
  * Hello - The modal component for developers
  *
  * @copyright Creative Commons
  * @website https://github.com/maclovin/hellomodal
  * @license MIT
  */

if (typeof jss != 'object') {
  !function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jss=e()}}(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){
  module.exports=require("./lib/index")},{"./lib/index":4}],2:[function(require,module,exports){"use strict";var plugins=require("./plugins");var uid=0;var toString=Object.prototype.toString;function Rule(selector,style,options){if(typeof selector=="object"){options=style;style=selector;selector=null}this.id=Rule.uid++;this.options=options||{};if(this.options.named==null)this.options.named=true;if(selector){this.selector=selector;this.isAtRule=selector[0]=="@"}else{this.isAtRule=false;this.className=Rule.NAMESPACE_PREFIX+"-"+this.id;this.selector="."+this.className}this.style=style;this.CSSRule=null;this.rules=null;if(this.isAtRule&&this.style)this.extractAtRules()}module.exports=Rule;Rule.NAMESPACE_PREFIX="jss";Rule.INDENTATION="  ";Rule.uid=0;Rule.prototype.prop=function(name,value){if(value!=null){if(!this.style)this.style={};this.style[name]=value;if(this.CSSRule)this.CSSRule.style[name]=value;return this}if(this.style)value=this.style[name];if(value==null&&this.CSSRule){value=this.CSSRule.style[name];this.style[name]=value}return value};Rule.prototype.addChild=function(selector,style,options){if(!this.children)this.children={};this.children[selector]={style:style,options:options};return this};Rule.prototype.extractAtRules=function(){if(!this.rules)this.rules={};for(var name in this.style){var style=this.style[name];if(typeof style=="string")break;var selector=this.options.named?undefined:name;var rule=this.rules[name]=new Rule(selector,style,this.options);plugins.run(rule);delete this.style[name]}return this};Rule.prototype.applyTo=function(element){for(var prop in this.style){var value=this.style[prop];if(toString.call(value)=="[object Array]"){for(var i=0;i<value.length;i++){element.style[prop]=value[i]}}else{element.style[prop]=value}}return this};Rule.prototype.toString=function(options){var style=this.style;if(this.isAtRule&&!this.style&&!this.rules)return this.selector+";";if(!options)options={};if(options.indentationLevel==null)options.indentationLevel=0;var str=indent(options.indentationLevel,this.selector+" {");for(var prop in style){var value=style[prop];if(toString.call(value)=="[object Array]"){for(var i=0;i<value.length;i++){str+="\n"+indent(options.indentationLevel+1,prop+": "+value[i]+";")}}else{str+="\n"+indent(options.indentationLevel+1,prop+": "+value+";")}}for(var name in this.rules){var ruleStr=this.rules[name].toString({indentationLevel:options.indentationLevel+1});str+="\n"+indent(options.indentationLevel,ruleStr)}str+="\n"+indent(options.indentationLevel,"}");return str};Rule.prototype.toJSON=function(){var style={};for(var prop in this.style){var value=this.style[prop];var type=typeof value;if(type=="string"||type=="number"){style[prop]=value}}return style};function indent(level,str){var indentStr="";for(var i=0;i<level;i++)indentStr+=Rule.INDENTATION;return indentStr+str}},{"./plugins":5}],3:[function(require,module,exports){"use strict";var Rule=require("./Rule");var plugins=require("./plugins");function StyleSheet(rules,options){this.options=options||{};if(this.options.named==null)this.options.named=true;this.element=null;this.attached=false;this.media=this.options.media;this.type=this.options.type;this.title=this.options.title;this.rules={};this.classes={};this.deployed=false;this.linked=false;if(typeof document!="undefined"){this.element=this.createElement()}for(var key in rules){this.createRules(key,rules[key])}}StyleSheet.ATTRIBUTES=["title","type","media"];module.exports=StyleSheet;StyleSheet.prototype.attach=function(){if(this.attached)return this;if(!this.deployed){this.deploy();this.deployed=true}document.head.appendChild(this.element);if(!this.linked&&this.options.link){this.link();this.linked=true}this.attached=true;return this};StyleSheet.prototype.detach=function(){if(!this.attached)return this;this.element.parentNode.removeChild(this.element);this.attached=false;return this};StyleSheet.prototype.deploy=function(){this.element.innerHTML="\n"+this.toString()+"\n";return this};StyleSheet.prototype.link=function(){var CSSRuleList=this.element.sheet.cssRules;var rules=this.rules;for(var i=0;i<CSSRuleList.length;i++){var CSSRule=CSSRuleList[i];var rule=rules[CSSRule.selectorText];if(rule)rule.CSSRule=CSSRule}return this};StyleSheet.prototype.addRule=function(key,style){var rules=this.createRules(key,style);if(this.deployed){var sheet=this.element.sheet;for(var i=0;i<rules.length;i++){var nextIndex=sheet.cssRules.length;var rule=rules[i];sheet.insertRule(rule.toString(),nextIndex);if(this.options.link)rule.CSSRule=sheet.cssRules[nextIndex]}}else{this.deploy()}return rules};StyleSheet.prototype.addRules=function(rules){for(var key in rules){this.addRule(key,rules[key])}return this};StyleSheet.prototype.getRule=function(key){return this.rules[key]};StyleSheet.prototype.toString=function(){var str="";var rules=this.rules;var stringified={};for(var key in rules){var rule=rules[key];if(stringified[rule.id])continue;if(str)str+="\n";str+=rules[key].toString();stringified[rule.id]=true}return str};StyleSheet.prototype.createRules=function(key,style,options){var rules=[];var selector,name;if(!options)options={};var named=this.options.named;if(options.named!=null)named=options.named;if(named)name=key;else selector=key;var rule=new Rule(selector,style,{sheet:this,named:named,name:name});rules.push(rule);this.rules[rule.selector]=rule;if(name){this.rules[name]=rule;this.classes[name]=rule.className}plugins.run(rule);for(key in rule.children){rules.push(this.createRules(key,rule.children[key].style,rule.children[key].options))}return rules};StyleSheet.prototype.createElement=function(){var element=document.createElement("style");StyleSheet.ATTRIBUTES.forEach(function(name){if(this[name])element.setAttribute(name,this[name])},this);return element}},{"./Rule":2,"./plugins":5}],4:[function(require,module,exports){"use strict";var StyleSheet=require("./StyleSheet");var Rule=require("./Rule");exports.StyleSheet=StyleSheet;exports.Rule=Rule;exports.plugins=require("./plugins");exports.createStyleSheet=function(rules,named,attributes){return new StyleSheet(rules,named,attributes)};exports.createRule=function(selector,style){var rule=new Rule(selector,style);exports.plugins.run(rule);return rule};exports.use=exports.plugins.use},{"./Rule":2,"./StyleSheet":3,"./plugins":5}],5:[function(require,module,exports){"use strict";exports.registry=[];exports.use=function(fn){exports.registry.push(fn)};exports.run=function(rule){for(var i=0;i<exports.registry.length;i++){exports.registry[i](rule)}}},{}]},{},[1])(1)});
}

var Hello = function (options) {
    var elem =  options.element, sheet;

    if (typeof options.element !== 'object')
        elem = $('#' + options.element);

    elem.hide();

    return {
        show: function () {
          var modalWidth, modalHeight, modalBodyHeight, headerSheet, footerSheet, bodySheet, backgroundSheet;

          modalWidth =  options.width || parseFloat($('body').css('width')) / 2;
          modalHeight = options.height  || parseFloat(elem.css('height'));

          if (options.full == true) {
            modalWidth = parseFloat($(window).width()) - 60;
            modalHeight = parseFloat($(window).height()) - 60;
          }

          sheet = jss.createStyleSheet({
            myModal: {
              background: 'white',
              position: 'fixed',
              width: modalWidth + 'px',
              height: modalHeight + 'px',
              top: '50%',
              left: '50%',
              'margin-left':  '-' + parseFloat(modalWidth) / 2 + 'px',
              'margin-top': '-' + parseFloat(modalHeight) / 2 + 'px',
              'z-index': '99999',
              'outline': 'none'
            }
          }).attach();
          elem.addClass(sheet.classes.myModal);

          headerSheet = jss.createStyleSheet({
            '.hello-header': {
              margin: '20px 20px 10px'
            }
          }, {named: false}).attach();

          if (options.height) {
            footerSheet = jss.createStyleSheet({
              '.hello-footer': {
                  margin: '10px 20px 20px',
                  position: 'absolute',
                  bottom: '0px'
              }
            }, {named: false}).attach();
          } else {
            footerSheet = jss.createStyleSheet({
              '.hello-footer': {
                  margin: '10px 20px 20px'
              }
            }, {named: false}).attach();
          }

          modalBodyHeight = parseFloat(modalHeight) - 120;

          if ($('.' + sheet.classes.myModal +' .hello-footer').length == 0) {
            modalBodyHeight = parseFloat(modalHeight) - 50;
          }

          if ($('.' + sheet.classes.myModal +' .hello-header').length == 0) {
            modalBodyHeight = parseFloat(modalHeight) - 50;
          }

          bodySheet = jss.createStyleSheet({
            '.hello-body': {
                margin: '20px',
                'overflow-y': 'scroll',
                height: modalBodyHeight + 'px'
            }
          }, {named: false}).attach();

          backgroundSheet = jss.createStyleSheet({
            '.hello-shadow': {
                background: 'rgba(0, 0, 0, 0.5)',
                position: 'fixed',
                top: '0px',
                left: '0px',
                width: '100%',
                height: '100%'
            }
          }, {named: false}).attach();

          if (options.animation) {
            elem.fadeIn();
          } else {
            elem.show();
          }

          $('.' + sheet.classes.myModal + ' .hello-close').click(function (){
            if (options.close && typeof options.close == 'function') {
                options.close();
            }

            if (options.animation) {
              elem.fadeOut();
              $('.hello-shadow').fadeOut();
              return;
            }
            elem.hide();
            $('.hello-shadow').hide();
          });

          if (options.shadow) {
            elem.after('<div class="hello-shadow"></div>');
          }

          if (options.submit && typeof options.submit == 'function') {
            $('.' + sheet.classes.myModal + ' .hello-submit').click(options.submit);
          }

          if (options.ajax || typeof options.ajax == 'string') {
            $.get(options.ajax, function(response) {
              $('.' + sheet.classes.myModal + ' .hello-body').html(response);
            });
          }

          if (options.load && typeof options.load == 'function') {
            options.load();
          }

          return;
        },
        hide: function () {
          if (options.animation) {
            $('.hello-shadow').fadeOut();
            elem.fadeOut();
            sheet.detach();
            return;
          }

          $('.hello-shadow').hide();
          elem.hide();
          sheet.detach();
          return;
        }
    };
};
