"use strict";

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e3) { throw _e3; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e4) { didErr = true; err = _e4; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * bibtex-tidy v1.8.5
 * https://github.com/FlamingTempura/bibtex-tidy
 *
 * DO NOT EDIT THIS FILE. This file is automatically generated
 * using `npm run build`. Edit files in './src' then rebuild.
 **/
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;

  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };

  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {
      exports: {}
    }).exports, mod), mod.exports;
  };

  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = value => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };

      var rejected = value => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };

      var step = x => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);

      step((generator = generator.apply(__this, __arguments)).next());
    });
  }; // node_modules/@codemirror/state/dist/index.js


  function textLength(text) {
    var length = -1;

    var _iterator = _createForOfIteratorHelper(text),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var line = _step.value;
        length += line.length + 1;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return length;
  }

  function appendText(text, target) {
    var from = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var to = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1e9;

    for (var pos = 0, _i = 0, first = true; _i < text.length && pos <= to; _i++) {
      var line = text[_i],
          end = pos + line.length;

      if (end >= from) {
        if (end > to) line = line.slice(0, to - pos);
        if (pos < from) line = line.slice(from - pos);

        if (first) {
          target[target.length - 1] += line;
          first = false;
        } else target.push(line);
      }

      pos = end + 1;
    }

    return target;
  }

  function sliceText(text, from, to) {
    return appendText(text, [""], from, to);
  }

  function isExtendingChar(code) {
    for (var _i2 = 1; _i2 < extend.length; _i2 += 2) {
      if (extend[_i2] > code) return extend[_i2 - 1] <= code;
    }

    return false;
  }

  function isRegionalIndicator(code) {
    return code >= 127462 && code <= 127487;
  }

  function findClusterBreak(str, pos) {
    var forward = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var includeExtending = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    return (forward ? nextClusterBreak : prevClusterBreak)(str, pos, includeExtending);
  }

  function nextClusterBreak(str, pos, includeExtending) {
    if (pos == str.length) return pos;
    if (pos && surrogateLow(str.charCodeAt(pos)) && surrogateHigh(str.charCodeAt(pos - 1))) pos--;
    var prev = codePointAt(str, pos);
    pos += codePointSize(prev);

    while (pos < str.length) {
      var next = codePointAt(str, pos);

      if (prev == ZWJ || next == ZWJ || includeExtending && isExtendingChar(next)) {
        pos += codePointSize(next);
        prev = next;
      } else if (isRegionalIndicator(next)) {
        var countBefore = 0,
            _i3 = pos - 2;

        while (_i3 >= 0 && isRegionalIndicator(codePointAt(str, _i3))) {
          countBefore++;
          _i3 -= 2;
        }

        if (countBefore % 2 == 0) break;else pos += 2;
      } else {
        break;
      }
    }

    return pos;
  }

  function prevClusterBreak(str, pos, includeExtending) {
    while (pos > 0) {
      var found = nextClusterBreak(str, pos - 2, includeExtending);
      if (found < pos) return found;
      pos--;
    }

    return 0;
  }

  function surrogateLow(ch) {
    return ch >= 56320 && ch < 57344;
  }

  function surrogateHigh(ch) {
    return ch >= 55296 && ch < 56320;
  }

  function codePointAt(str, pos) {
    var code0 = str.charCodeAt(pos);
    if (!surrogateHigh(code0) || pos + 1 == str.length) return code0;
    var code1 = str.charCodeAt(pos + 1);
    if (!surrogateLow(code1)) return code0;
    return (code0 - 55296 << 10) + (code1 - 56320) + 65536;
  }

  function fromCodePoint(code) {
    if (code <= 65535) return String.fromCharCode(code);
    code -= 65536;
    return String.fromCharCode((code >> 10) + 55296, (code & 1023) + 56320);
  }

  function codePointSize(code) {
    return code < 65536 ? 1 : 2;
  }

  function addSection(sections, len, ins) {
    var forceJoin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (len == 0 && ins <= 0) return;
    var last = sections.length - 2;
    if (last >= 0 && ins <= 0 && ins == sections[last + 1]) sections[last] += len;else if (len == 0 && sections[last] == 0) sections[last + 1] += ins;else if (forceJoin) {
      sections[last] += len;
      sections[last + 1] += ins;
    } else sections.push(len, ins);
  }

  function addInsert(values, sections, value) {
    if (value.length == 0) return;
    var index = sections.length - 2 >> 1;

    if (index < values.length) {
      values[values.length - 1] = values[values.length - 1].append(value);
    } else {
      while (values.length < index) {
        values.push(Text.empty);
      }

      values.push(value);
    }
  }

  function iterChanges(desc, f, individual) {
    var inserted = desc.inserted;

    for (var posA = 0, posB = 0, _i4 = 0; _i4 < desc.sections.length;) {
      var len = desc.sections[_i4++],
          ins = desc.sections[_i4++];

      if (ins < 0) {
        posA += len;
        posB += len;
      } else {
        var endA = posA,
            endB = posB,
            text = Text.empty;

        for (;;) {
          endA += len;
          endB += ins;
          if (ins && inserted) text = text.append(inserted[_i4 - 2 >> 1]);
          if (individual || _i4 == desc.sections.length || desc.sections[_i4 + 1] < 0) break;
          len = desc.sections[_i4++];
          ins = desc.sections[_i4++];
        }

        f(posA, endA, posB, endB, text);
        posA = endA;
        posB = endB;
      }
    }
  }

  function mapSet(setA, setB, before) {
    var mkSet = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var sections = [],
        insert2 = mkSet ? [] : null;
    var a = new SectionIter(setA),
        b = new SectionIter(setB);

    for (var posA = 0, posB = 0;;) {
      if (a.ins == -1) {
        posA += a.len;
        a.next();
      } else if (b.ins == -1 && posB < posA) {
        var skip = Math.min(b.len, posA - posB);
        b.forward(skip);
        addSection(sections, skip, -1);
        posB += skip;
      } else if (b.ins >= 0 && (a.done || posB < posA || posB == posA && (b.len < a.len || b.len == a.len && !before))) {
        addSection(sections, b.ins, -1);

        while (posA > posB && !a.done && posA + a.len < posB + b.len) {
          posA += a.len;
          a.next();
        }

        posB += b.len;
        b.next();
      } else if (a.ins >= 0) {
        var len = 0,
            end = posA + a.len;

        for (;;) {
          if (b.ins >= 0 && posB > posA && posB + b.len < end) {
            len += b.ins;
            posB += b.len;
            b.next();
          } else if (b.ins == -1 && posB < end) {
            var _skip = Math.min(b.len, end - posB);

            len += _skip;
            b.forward(_skip);
            posB += _skip;
          } else {
            break;
          }
        }

        addSection(sections, len, a.ins);
        if (insert2) addInsert(insert2, sections, a.text);
        posA = end;
        a.next();
      } else if (a.done && b.done) {
        return insert2 ? ChangeSet.createSet(sections, insert2) : ChangeDesc.create(sections);
      } else {
        throw new Error("Mismatched change set lengths");
      }
    }
  }

  function composeSets(setA, setB) {
    var mkSet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var sections = [];
    var insert2 = mkSet ? [] : null;
    var a = new SectionIter(setA),
        b = new SectionIter(setB);

    for (var open = false;;) {
      if (a.done && b.done) {
        return insert2 ? ChangeSet.createSet(sections, insert2) : ChangeDesc.create(sections);
      } else if (a.ins == 0) {
        addSection(sections, a.len, 0, open);
        a.next();
      } else if (b.len == 0 && !b.done) {
        addSection(sections, 0, b.ins, open);
        if (insert2) addInsert(insert2, sections, b.text);
        b.next();
      } else if (a.done || b.done) {
        throw new Error("Mismatched change set lengths");
      } else {
        var len = Math.min(a.len2, b.len),
            sectionLen = sections.length;

        if (a.ins == -1) {
          var insB = b.ins == -1 ? -1 : b.off ? 0 : b.ins;
          addSection(sections, len, insB, open);
          if (insert2 && insB) addInsert(insert2, sections, b.text);
        } else if (b.ins == -1) {
          addSection(sections, a.off ? 0 : a.len, len, open);
          if (insert2) addInsert(insert2, sections, a.textBit(len));
        } else {
          addSection(sections, a.off ? 0 : a.len, b.off ? 0 : b.ins, open);
          if (insert2 && !b.off) addInsert(insert2, sections, b.text);
        }

        open = (a.ins > len || b.ins >= 0 && b.len > len) && (open || sections.length > sectionLen);
        a.forward2(len);
        b.forward(len);
      }
    }
  }

  function checkSelection(selection, docLength) {
    var _iterator2 = _createForOfIteratorHelper(selection.ranges),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var range = _step2.value;
        if (range.to > docLength) throw new RangeError("Selection points outside of document");
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  function sameArray(a, b) {
    return a == b || a.length == b.length && a.every((e, i) => e === b[i]);
  }

  function compareArray(a, b, compare2) {
    if (a.length != b.length) return false;

    for (var _i5 = 0; _i5 < a.length; _i5++) {
      if (!compare2(a[_i5], b[_i5])) return false;
    }

    return true;
  }

  function ensureAll(state, addrs) {
    var changed = false;

    var _iterator3 = _createForOfIteratorHelper(addrs),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var addr = _step3.value;
        if (ensureAddr(state, addr) & 1) changed = true;
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    return changed;
  }

  function dynamicFacetSlot(addresses, facet, providers) {
    var providerAddrs = providers.map(p => addresses[p.id]);
    var providerTypes = providers.map(p => p.type);
    var dynamic = providerAddrs.filter(p => !(p & 1));
    var idx = addresses[facet.id] >> 1;

    function get(state) {
      var values = [];

      for (var _i6 = 0; _i6 < providerAddrs.length; _i6++) {
        var value = getAddr(state, providerAddrs[_i6]);

        if (providerTypes[_i6] == 2) {
          var _iterator4 = _createForOfIteratorHelper(value),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var val = _step4.value;
              values.push(val);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        } else values.push(value);
      }

      return facet.combine(values);
    }

    return {
      create(state) {
        var _iterator5 = _createForOfIteratorHelper(providerAddrs),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var addr = _step5.value;
            ensureAddr(state, addr);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        state.values[idx] = get(state);
        return 1;
      },

      update(state, tr) {
        if (!ensureAll(state, dynamic)) return 0;
        var value = get(state);
        if (facet.compare(value, state.values[idx])) return 0;
        state.values[idx] = value;
        return 1;
      },

      reconfigure(state, oldState) {
        var depChanged = ensureAll(state, providerAddrs);
        var oldProviders = oldState.config.facets[facet.id],
            oldValue = oldState.facet(facet);

        if (oldProviders && !depChanged && sameArray(providers, oldProviders)) {
          state.values[idx] = oldValue;
          return 0;
        }

        var value = get(state);

        if (facet.compare(value, oldValue)) {
          state.values[idx] = oldValue;
          return 0;
        }

        state.values[idx] = value;
        return 1;
      }

    };
  }

  function prec(value) {
    return ext => new PrecExtension(ext, value);
  }

  function flatten(extension, compartments, newCompartments) {
    var result = [[], [], [], [], []];
    var seen = /* @__PURE__ */new Map();

    function inner(ext, prec2) {
      var known = seen.get(ext);

      if (known != null) {
        if (known <= prec2) return;
        var found = result[known].indexOf(ext);
        if (found > -1) result[known].splice(found, 1);
        if (ext instanceof CompartmentInstance) newCompartments.delete(ext.compartment);
      }

      seen.set(ext, prec2);

      if (Array.isArray(ext)) {
        var _iterator6 = _createForOfIteratorHelper(ext),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var e = _step6.value;
            inner(e, prec2);
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      } else if (ext instanceof CompartmentInstance) {
        if (newCompartments.has(ext.compartment)) throw new RangeError("Duplicate use of compartment in extensions");
        var content2 = compartments.get(ext.compartment) || ext.inner;
        newCompartments.set(ext.compartment, content2);
        inner(content2, prec2);
      } else if (ext instanceof PrecExtension) {
        inner(ext.inner, ext.prec);
      } else if (ext instanceof StateField) {
        result[prec2].push(ext);
        if (ext.provides) inner(ext.provides, prec2);
      } else if (ext instanceof FacetProvider) {
        result[prec2].push(ext);
        if (ext.facet.extensions) inner(ext.facet.extensions, prec2);
      } else {
        var _content = ext.extension;
        if (!_content) throw new Error("Unrecognized extension value in extension set (".concat(ext, "). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks."));
        inner(_content, prec2);
      }
    }

    inner(extension, Prec_.default);
    return result.reduce((a, b) => a.concat(b));
  }

  function ensureAddr(state, addr) {
    if (addr & 1) return 2;
    var idx = addr >> 1;
    var status = state.status[idx];
    if (status == 4) throw new Error("Cyclic dependency between fields and/or facets");
    if (status & 2) return status;
    state.status[idx] = 4;
    var changed = state.computeSlot(state, state.config.dynamicSlots[idx]);
    return state.status[idx] = 2 | changed;
  }

  function getAddr(state, addr) {
    return addr & 1 ? state.config.staticValues[addr >> 1] : state.values[addr >> 1];
  }

  function joinRanges(a, b) {
    var result = [];

    for (var iA = 0, iB = 0;;) {
      var from = void 0,
          to = void 0;

      if (iA < a.length && (iB == b.length || b[iB] >= a[iA])) {
        from = a[iA++];
        to = a[iA++];
      } else if (iB < b.length) {
        from = b[iB++];
        to = b[iB++];
      } else return result;

      if (!result.length || result[result.length - 1] < from) result.push(from, to);else if (result[result.length - 1] < to) result[result.length - 1] = to;
    }
  }

  function mergeTransaction(a, b, sequential) {
    var _a2;

    var mapForA, mapForB, changes;

    if (sequential) {
      mapForA = b.changes;
      mapForB = ChangeSet.empty(b.changes.length);
      changes = a.changes.compose(b.changes);
    } else {
      mapForA = b.changes.map(a.changes);
      mapForB = a.changes.mapDesc(b.changes, true);
      changes = a.changes.compose(mapForA);
    }

    return {
      changes,
      selection: b.selection ? b.selection.map(mapForB) : (_a2 = a.selection) === null || _a2 === void 0 ? void 0 : _a2.map(mapForA),
      effects: StateEffect.mapEffects(a.effects, mapForA).concat(StateEffect.mapEffects(b.effects, mapForB)),
      annotations: a.annotations.length ? a.annotations.concat(b.annotations) : b.annotations,
      scrollIntoView: a.scrollIntoView || b.scrollIntoView
    };
  }

  function resolveTransactionInner(state, spec, docSize) {
    var sel = spec.selection,
        annotations = asArray(spec.annotations);
    if (spec.userEvent) annotations = annotations.concat(Transaction.userEvent.of(spec.userEvent));
    return {
      changes: spec.changes instanceof ChangeSet ? spec.changes : ChangeSet.of(spec.changes || [], docSize, state.facet(lineSeparator)),
      selection: sel && (sel instanceof EditorSelection ? sel : EditorSelection.single(sel.anchor, sel.head)),
      effects: asArray(spec.effects),
      annotations,
      scrollIntoView: !!spec.scrollIntoView
    };
  }

  function resolveTransaction(state, specs, filter) {
    var s = resolveTransactionInner(state, specs.length ? specs[0] : {}, state.doc.length);
    if (specs.length && specs[0].filter === false) filter = false;

    for (var _i7 = 1; _i7 < specs.length; _i7++) {
      if (specs[_i7].filter === false) filter = false;
      var seq = !!specs[_i7].sequential;
      s = mergeTransaction(s, resolveTransactionInner(state, specs[_i7], seq ? s.changes.newLength : state.doc.length), seq);
    }

    var tr = Transaction.create(state, s.changes, s.selection, s.effects, s.annotations, s.scrollIntoView);
    return extendTransaction(filter ? filterTransaction(tr) : tr);
  }

  function filterTransaction(tr) {
    var state = tr.startState;
    var result = true;

    var _iterator7 = _createForOfIteratorHelper(state.facet(changeFilter)),
        _step7;

    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var filter = _step7.value;
        var value = filter(tr);

        if (value === false) {
          result = false;
          break;
        }

        if (Array.isArray(value)) result = result === true ? value : joinRanges(result, value);
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }

    if (result !== true) {
      var changes, back;

      if (result === false) {
        back = tr.changes.invertedDesc;
        changes = ChangeSet.empty(state.doc.length);
      } else {
        var filtered = tr.changes.filter(result);
        changes = filtered.changes;
        back = filtered.filtered.invertedDesc;
      }

      tr = Transaction.create(state, changes, tr.selection && tr.selection.map(back), StateEffect.mapEffects(tr.effects, back), tr.annotations, tr.scrollIntoView);
    }

    var filters = state.facet(transactionFilter);

    for (var _i8 = filters.length - 1; _i8 >= 0; _i8--) {
      var _filtered = filters[_i8](tr);

      if (_filtered instanceof Transaction) tr = _filtered;else if (Array.isArray(_filtered) && _filtered.length == 1 && _filtered[0] instanceof Transaction) tr = _filtered[0];else tr = resolveTransaction(state, asArray(_filtered), false);
    }

    return tr;
  }

  function extendTransaction(tr) {
    var state = tr.startState,
        extenders = state.facet(transactionExtender),
        spec = tr;

    for (var _i9 = extenders.length - 1; _i9 >= 0; _i9--) {
      var extension = extenders[_i9](tr);

      if (extension && Object.keys(extension).length) spec = mergeTransaction(tr, resolveTransactionInner(state, extension, tr.changes.newLength), true);
    }

    return spec == tr ? tr : Transaction.create(state, tr.changes, tr.selection, spec.effects, spec.annotations, spec.scrollIntoView);
  }

  function asArray(value) {
    return value == null ? none : Array.isArray(value) ? value : [value];
  }

  function hasWordChar(str) {
    if (wordChar) return wordChar.test(str);

    for (var _i10 = 0; _i10 < str.length; _i10++) {
      var ch = str[_i10];
      if (/\w/.test(ch) || ch > "\x80" && (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch))) return true;
    }

    return false;
  }

  function makeCategorizer(wordChars) {
    return char => {
      if (!/\S/.test(char)) return CharCategory.Space;
      if (hasWordChar(char)) return CharCategory.Word;

      for (var _i11 = 0; _i11 < wordChars.length; _i11++) {
        if (char.indexOf(wordChars[_i11]) > -1) return CharCategory.Word;
      }

      return CharCategory.Other;
    };
  }

  function combineConfig(configs, defaults3) {
    var combine = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var result = {};

    var _iterator8 = _createForOfIteratorHelper(configs),
        _step8;

    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var config2 = _step8.value;

        for (var _i12 = 0, _Object$keys = Object.keys(config2); _i12 < _Object$keys.length; _i12++) {
          var _key = _Object$keys[_i12];
          var value = config2[_key],
              current = result[_key];
          if (current === void 0) result[_key] = value;else if (current === value || value === void 0) ;else if (Object.hasOwnProperty.call(combine, _key)) result[_key] = combine[_key](current, value);else throw new Error("Config merge conflict for field " + _key);
        }
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }

    for (var key in defaults3) {
      if (result[key] === void 0) result[key] = defaults3[key];
    }

    return result;
  }

  function cmpRange(a, b) {
    return a.from - b.from || a.value.startSide - b.value.startSide;
  }

  function lazySort(ranges) {
    if (ranges.length > 1) for (var prev = ranges[0], _i13 = 1; _i13 < ranges.length; _i13++) {
      var cur2 = ranges[_i13];
      if (cmpRange(prev, cur2) > 0) return ranges.slice().sort(cmpRange);
      prev = cur2;
    }
    return ranges;
  }

  function findSharedChunks(a, b, textDiff) {
    var inA = /* @__PURE__ */new Map();

    var _iterator9 = _createForOfIteratorHelper(a),
        _step9;

    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var set = _step9.value;

        for (var _i14 = 0; _i14 < set.chunk.length; _i14++) {
          if (set.chunk[_i14].maxPoint <= 0) inA.set(set.chunk[_i14], set.chunkPos[_i14]);
        }
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }

    var shared = /* @__PURE__ */new Set();

    var _iterator10 = _createForOfIteratorHelper(b),
        _step10;

    try {
      for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
        var _set = _step10.value;

        for (var _i15 = 0; _i15 < _set.chunk.length; _i15++) {
          var known = inA.get(_set.chunk[_i15]);
          if (known != null && (textDiff ? textDiff.mapPos(known) : known) == _set.chunkPos[_i15] && !(textDiff === null || textDiff === void 0 ? void 0 : textDiff.touchesRange(known, known + _set.chunk[_i15].length))) shared.add(_set.chunk[_i15]);
        }
      }
    } catch (err) {
      _iterator10.e(err);
    } finally {
      _iterator10.f();
    }

    return shared;
  }

  function heapBubble(heap, index) {
    for (var cur2 = heap[index];;) {
      var childIndex = (index << 1) + 1;
      if (childIndex >= heap.length) break;
      var child = heap[childIndex];

      if (childIndex + 1 < heap.length && child.compare(heap[childIndex + 1]) >= 0) {
        child = heap[childIndex + 1];
        childIndex++;
      }

      if (cur2.compare(child) < 0) break;
      heap[childIndex] = cur2;
      heap[index] = child;
      index = childIndex;
    }
  }

  function compare(a, startA, b, startB, length, comparator) {
    a.goto(startA);
    b.goto(startB);
    var endB = startB + length;
    var pos = startB,
        dPos = startB - startA;

    for (;;) {
      var diff = a.to + dPos - b.to || a.endSide - b.endSide;
      var end = diff < 0 ? a.to + dPos : b.to,
          clipEnd = Math.min(end, endB);

      if (a.point || b.point) {
        if (!(a.point && b.point && (a.point == b.point || a.point.eq(b.point)) && sameValues(a.activeForPoint(a.to + dPos), b.activeForPoint(b.to)))) comparator.comparePoint(pos, clipEnd, a.point, b.point);
      } else {
        if (clipEnd > pos && !sameValues(a.active, b.active)) comparator.compareRange(pos, clipEnd, a.active, b.active);
      }

      if (end > endB) break;
      pos = end;
      if (diff <= 0) a.next();
      if (diff >= 0) b.next();
    }
  }

  function sameValues(a, b) {
    if (a.length != b.length) return false;

    for (var _i16 = 0; _i16 < a.length; _i16++) {
      if (a[_i16] != b[_i16] && !a[_i16].eq(b[_i16])) return false;
    }

    return true;
  }

  function remove(array, index) {
    for (var _i17 = index, e = array.length - 1; _i17 < e; _i17++) {
      array[_i17] = array[_i17 + 1];
    }

    array.pop();
  }

  function insert(array, index, value) {
    for (var _i18 = array.length - 1; _i18 >= index; _i18--) {
      array[_i18 + 1] = array[_i18];
    }

    array[index] = value;
  }

  function findMinIndex(value, array) {
    var found = -1,
        foundPos = 1e9;

    for (var _i19 = 0; _i19 < array.length; _i19++) {
      if ((array[_i19] - foundPos || value[_i19].endSide - value[found].endSide) < 0) {
        found = _i19;
        foundPos = array[_i19];
      }
    }

    return found;
  }

  function countColumn(string2, tabSize) {
    var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : string2.length;
    var n = 0;

    for (var _i20 = 0; _i20 < to;) {
      if (string2.charCodeAt(_i20) == 9) {
        n += tabSize - n % tabSize;
        _i20++;
      } else {
        n++;
        _i20 = findClusterBreak(string2, _i20);
      }
    }

    return n;
  }

  function findColumn(string2, col, tabSize, strict) {
    for (var _i21 = 0, n = 0;;) {
      if (n >= col) return _i21;
      if (_i21 == string2.length) break;
      n += string2.charCodeAt(_i21) == 9 ? tabSize - n % tabSize : 1;
      _i21 = findClusterBreak(string2, _i21);
    }

    return strict === true ? -1 : string2.length;
  }

  var Text, TextLeaf, TextNode, RawTextCursor, PartialTextCursor, LineCursor, Line, extend, ZWJ, DefaultSplit, MapMode, ChangeDesc, ChangeSet, SectionIter, SelectionRange, EditorSelection, nextID, Facet, FacetProvider, initField, StateField, Prec_, Prec, PrecExtension, Compartment, CompartmentInstance, Configuration, languageData, allowMultipleSelections, lineSeparator, changeFilter, transactionFilter, transactionExtender, readOnly, Annotation, AnnotationType, StateEffectType, StateEffect, Transaction, none, CharCategory, nonASCIISingleCaseWordChar, wordChar, EditorState, RangeValue, Range, Chunk, RangeSet, RangeSetBuilder, LayerCursor, HeapCursor, SpanCursor;

  var init_dist = __esm({
    "node_modules/@codemirror/state/dist/index.js"() {
      Text = class {
        constructor() {}

        lineAt(pos) {
          if (pos < 0 || pos > this.length) throw new RangeError("Invalid position ".concat(pos, " in document of length ").concat(this.length));
          return this.lineInner(pos, false, 1, 0);
        }

        line(n) {
          if (n < 1 || n > this.lines) throw new RangeError("Invalid line number ".concat(n, " in ").concat(this.lines, "-line document"));
          return this.lineInner(n, true, 1, 0);
        }

        replace(from, to, text) {
          var parts = [];
          this.decompose(0, from, parts, 2);
          if (text.length) text.decompose(0, text.length, parts, 1 | 2);
          this.decompose(to, this.length, parts, 1);
          return TextNode.from(parts, this.length - (to - from) + text.length);
        }

        append(other) {
          return this.replace(this.length, this.length, other);
        }

        slice(from) {
          var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.length;
          var parts = [];
          this.decompose(from, to, parts, 0);
          return TextNode.from(parts, to - from);
        }

        eq(other) {
          if (other == this) return true;
          if (other.length != this.length || other.lines != this.lines) return false;
          var start = this.scanIdentical(other, 1),
              end = this.length - this.scanIdentical(other, -1);
          var a = new RawTextCursor(this),
              b = new RawTextCursor(other);

          for (var skip = start, pos = start;;) {
            a.next(skip);
            b.next(skip);
            skip = 0;
            if (a.lineBreak != b.lineBreak || a.done != b.done || a.value != b.value) return false;
            pos += a.value.length;
            if (a.done || pos >= end) return true;
          }
        }

        iter() {
          var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
          return new RawTextCursor(this, dir);
        }

        iterRange(from) {
          var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.length;
          return new PartialTextCursor(this, from, to);
        }

        iterLines(from, to) {
          var inner;

          if (from == null) {
            inner = this.iter();
          } else {
            if (to == null) to = this.lines + 1;
            var start = this.line(from).from;
            inner = this.iterRange(start, Math.max(start, to == this.lines + 1 ? this.length : to <= 1 ? 0 : this.line(to - 1).to));
          }

          return new LineCursor(inner);
        }

        toString() {
          return this.sliceString(0);
        }

        toJSON() {
          var lines = [];
          this.flatten(lines);
          return lines;
        }

        static of(text) {
          if (text.length == 0) throw new RangeError("A document must have at least one line");
          if (text.length == 1 && !text[0]) return Text.empty;
          return text.length <= 32 ? new TextLeaf(text) : TextNode.from(TextLeaf.split(text, []));
        }

      };
      TextLeaf = class extends Text {
        constructor(text) {
          var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : textLength(text);
          super();
          this.text = text;
          this.length = length;
        }

        get lines() {
          return this.text.length;
        }

        get children() {
          return null;
        }

        lineInner(target, isLine, line, offset) {
          for (var _i22 = 0;; _i22++) {
            var string2 = this.text[_i22],
                end = offset + string2.length;
            if ((isLine ? line : end) >= target) return new Line(offset, end, line, string2);
            offset = end + 1;
            line++;
          }
        }

        decompose(from, to, target, open) {
          var text = from <= 0 && to >= this.length ? this : new TextLeaf(sliceText(this.text, from, to), Math.min(to, this.length) - Math.max(0, from));

          if (open & 1) {
            var prev = target.pop();
            var joined = appendText(text.text, prev.text.slice(), 0, text.length);

            if (joined.length <= 32) {
              target.push(new TextLeaf(joined, prev.length + text.length));
            } else {
              var mid = joined.length >> 1;
              target.push(new TextLeaf(joined.slice(0, mid)), new TextLeaf(joined.slice(mid)));
            }
          } else {
            target.push(text);
          }
        }

        replace(from, to, text) {
          if (!(text instanceof TextLeaf)) return super.replace(from, to, text);
          var lines = appendText(this.text, appendText(text.text, sliceText(this.text, 0, from)), to);
          var newLen = this.length + text.length - (to - from);
          if (lines.length <= 32) return new TextLeaf(lines, newLen);
          return TextNode.from(TextLeaf.split(lines, []), newLen);
        }

        sliceString(from) {
          var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.length;
          var lineSep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "\n";
          var result = "";

          for (var pos = 0, _i23 = 0; pos <= to && _i23 < this.text.length; _i23++) {
            var line = this.text[_i23],
                end = pos + line.length;
            if (pos > from && _i23) result += lineSep;
            if (from < end && to > pos) result += line.slice(Math.max(0, from - pos), to - pos);
            pos = end + 1;
          }

          return result;
        }

        flatten(target) {
          var _iterator11 = _createForOfIteratorHelper(this.text),
              _step11;

          try {
            for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
              var line = _step11.value;
              target.push(line);
            }
          } catch (err) {
            _iterator11.e(err);
          } finally {
            _iterator11.f();
          }
        }

        scanIdentical() {
          return 0;
        }

        static split(text, target) {
          var part = [],
              len = -1;

          var _iterator12 = _createForOfIteratorHelper(text),
              _step12;

          try {
            for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
              var line = _step12.value;
              part.push(line);
              len += line.length + 1;

              if (part.length == 32) {
                target.push(new TextLeaf(part, len));
                part = [];
                len = -1;
              }
            }
          } catch (err) {
            _iterator12.e(err);
          } finally {
            _iterator12.f();
          }

          if (len > -1) target.push(new TextLeaf(part, len));
          return target;
        }

      };
      TextNode = class extends Text {
        constructor(children, length) {
          super();
          this.children = children;
          this.length = length;
          this.lines = 0;

          var _iterator13 = _createForOfIteratorHelper(children),
              _step13;

          try {
            for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
              var child = _step13.value;
              this.lines += child.lines;
            }
          } catch (err) {
            _iterator13.e(err);
          } finally {
            _iterator13.f();
          }
        }

        lineInner(target, isLine, line, offset) {
          for (var _i24 = 0;; _i24++) {
            var child = this.children[_i24],
                end = offset + child.length,
                endLine = line + child.lines - 1;
            if ((isLine ? endLine : end) >= target) return child.lineInner(target, isLine, line, offset);
            offset = end + 1;
            line = endLine + 1;
          }
        }

        decompose(from, to, target, open) {
          for (var _i25 = 0, pos = 0; pos <= to && _i25 < this.children.length; _i25++) {
            var child = this.children[_i25],
                end = pos + child.length;

            if (from <= end && to >= pos) {
              var childOpen = open & ((pos <= from ? 1 : 0) | (end >= to ? 2 : 0));
              if (pos >= from && end <= to && !childOpen) target.push(child);else child.decompose(from - pos, to - pos, target, childOpen);
            }

            pos = end + 1;
          }
        }

        replace(from, to, text) {
          if (text.lines < this.lines) for (var _i26 = 0, pos = 0; _i26 < this.children.length; _i26++) {
            var child = this.children[_i26],
                end = pos + child.length;

            if (from >= pos && to <= end) {
              var updated = child.replace(from - pos, to - pos, text);
              var totalLines = this.lines - child.lines + updated.lines;

              if (updated.lines < totalLines >> 5 - 1 && updated.lines > totalLines >> 5 + 1) {
                var copy = this.children.slice();
                copy[_i26] = updated;
                return new TextNode(copy, this.length - (to - from) + text.length);
              }

              return super.replace(pos, end, updated);
            }

            pos = end + 1;
          }
          return super.replace(from, to, text);
        }

        sliceString(from) {
          var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.length;
          var lineSep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "\n";
          var result = "";

          for (var _i27 = 0, pos = 0; _i27 < this.children.length && pos <= to; _i27++) {
            var child = this.children[_i27],
                end = pos + child.length;
            if (pos > from && _i27) result += lineSep;
            if (from < end && to > pos) result += child.sliceString(from - pos, to - pos, lineSep);
            pos = end + 1;
          }

          return result;
        }

        flatten(target) {
          var _iterator14 = _createForOfIteratorHelper(this.children),
              _step14;

          try {
            for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
              var child = _step14.value;
              child.flatten(target);
            }
          } catch (err) {
            _iterator14.e(err);
          } finally {
            _iterator14.f();
          }
        }

        scanIdentical(other, dir) {
          if (!(other instanceof TextNode)) return 0;
          var length = 0;

          var _ref = dir > 0 ? [0, 0, this.children.length, other.children.length] : [this.children.length - 1, other.children.length - 1, -1, -1],
              _ref2 = _slicedToArray(_ref, 4),
              iA = _ref2[0],
              iB = _ref2[1],
              eA = _ref2[2],
              eB = _ref2[3];

          for (;; iA += dir, iB += dir) {
            if (iA == eA || iB == eB) return length;
            var chA = this.children[iA],
                chB = other.children[iB];
            if (chA != chB) return length + chA.scanIdentical(chB, dir);
            length += chA.length + 1;
          }
        }

        static from(children) {
          var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : children.reduce((l, ch) => l + ch.length + 1, -1);
          var lines = 0;

          var _iterator15 = _createForOfIteratorHelper(children),
              _step15;

          try {
            for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
              var _ch = _step15.value;
              lines += _ch.lines;
            }
          } catch (err) {
            _iterator15.e(err);
          } finally {
            _iterator15.f();
          }

          if (lines < 32) {
            var flat = [];

            var _iterator16 = _createForOfIteratorHelper(children),
                _step16;

            try {
              for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
                var ch = _step16.value;
                ch.flatten(flat);
              }
            } catch (err) {
              _iterator16.e(err);
            } finally {
              _iterator16.f();
            }

            return new TextLeaf(flat, length);
          }

          var chunk = Math.max(32, lines >> 5),
              maxChunk = chunk << 1,
              minChunk = chunk >> 1;
          var chunked = [],
              currentLines = 0,
              currentLen = -1,
              currentChunk = [];

          function add2(child) {
            var last;

            if (child.lines > maxChunk && child instanceof TextNode) {
              var _iterator17 = _createForOfIteratorHelper(child.children),
                  _step17;

              try {
                for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
                  var node = _step17.value;
                  add2(node);
                }
              } catch (err) {
                _iterator17.e(err);
              } finally {
                _iterator17.f();
              }
            } else if (child.lines > minChunk && (currentLines > minChunk || !currentLines)) {
              flush();
              chunked.push(child);
            } else if (child instanceof TextLeaf && currentLines && (last = currentChunk[currentChunk.length - 1]) instanceof TextLeaf && child.lines + last.lines <= 32) {
              currentLines += child.lines;
              currentLen += child.length + 1;
              currentChunk[currentChunk.length - 1] = new TextLeaf(last.text.concat(child.text), last.length + 1 + child.length);
            } else {
              if (currentLines + child.lines > chunk) flush();
              currentLines += child.lines;
              currentLen += child.length + 1;
              currentChunk.push(child);
            }
          }

          function flush() {
            if (currentLines == 0) return;
            chunked.push(currentChunk.length == 1 ? currentChunk[0] : TextNode.from(currentChunk, currentLen));
            currentLen = -1;
            currentLines = currentChunk.length = 0;
          }

          var _iterator18 = _createForOfIteratorHelper(children),
              _step18;

          try {
            for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
              var child = _step18.value;
              add2(child);
            }
          } catch (err) {
            _iterator18.e(err);
          } finally {
            _iterator18.f();
          }

          flush();
          return chunked.length == 1 ? chunked[0] : new TextNode(chunked, length);
        }

      };
      Text.empty = /* @__PURE__ */new TextLeaf([""], 0);
      RawTextCursor = class {
        constructor(text) {
          var dir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
          this.dir = dir;
          this.done = false;
          this.lineBreak = false;
          this.value = "";
          this.nodes = [text];
          this.offsets = [dir > 0 ? 1 : (text instanceof TextLeaf ? text.text.length : text.children.length) << 1];
        }

        nextInner(skip, dir) {
          this.done = this.lineBreak = false;

          for (;;) {
            var last = this.nodes.length - 1;
            var top2 = this.nodes[last],
                offsetValue = this.offsets[last],
                offset = offsetValue >> 1;
            var size = top2 instanceof TextLeaf ? top2.text.length : top2.children.length;

            if (offset == (dir > 0 ? size : 0)) {
              if (last == 0) {
                this.done = true;
                this.value = "";
                return this;
              }

              if (dir > 0) this.offsets[last - 1]++;
              this.nodes.pop();
              this.offsets.pop();
            } else if ((offsetValue & 1) == (dir > 0 ? 0 : 1)) {
              this.offsets[last] += dir;

              if (skip == 0) {
                this.lineBreak = true;
                this.value = "\n";
                return this;
              }

              skip--;
            } else if (top2 instanceof TextLeaf) {
              var next = top2.text[offset + (dir < 0 ? -1 : 0)];
              this.offsets[last] += dir;

              if (next.length > Math.max(0, skip)) {
                this.value = skip == 0 ? next : dir > 0 ? next.slice(skip) : next.slice(0, next.length - skip);
                return this;
              }

              skip -= next.length;
            } else {
              var _next = top2.children[offset + (dir < 0 ? -1 : 0)];

              if (skip > _next.length) {
                skip -= _next.length;
                this.offsets[last] += dir;
              } else {
                if (dir < 0) this.offsets[last]--;
                this.nodes.push(_next);
                this.offsets.push(dir > 0 ? 1 : (_next instanceof TextLeaf ? _next.text.length : _next.children.length) << 1);
              }
            }
          }
        }

        next() {
          var skip = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

          if (skip < 0) {
            this.nextInner(-skip, -this.dir);
            skip = this.value.length;
          }

          return this.nextInner(skip, this.dir);
        }

      };
      PartialTextCursor = class {
        constructor(text, start, end) {
          this.value = "";
          this.done = false;
          this.cursor = new RawTextCursor(text, start > end ? -1 : 1);
          this.pos = start > end ? text.length : 0;
          this.from = Math.min(start, end);
          this.to = Math.max(start, end);
        }

        nextInner(skip, dir) {
          if (dir < 0 ? this.pos <= this.from : this.pos >= this.to) {
            this.value = "";
            this.done = true;
            return this;
          }

          skip += Math.max(0, dir < 0 ? this.pos - this.to : this.from - this.pos);
          var limit = dir < 0 ? this.pos - this.from : this.to - this.pos;
          if (skip > limit) skip = limit;
          limit -= skip;

          var _this$cursor$next = this.cursor.next(skip),
              value = _this$cursor$next.value;

          this.pos += (value.length + skip) * dir;
          this.value = value.length <= limit ? value : dir < 0 ? value.slice(value.length - limit) : value.slice(0, limit);
          this.done = !this.value;
          return this;
        }

        next() {
          var skip = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          if (skip < 0) skip = Math.max(skip, this.from - this.pos);else if (skip > 0) skip = Math.min(skip, this.to - this.pos);
          return this.nextInner(skip, this.cursor.dir);
        }

        get lineBreak() {
          return this.cursor.lineBreak && this.value != "";
        }

      };
      LineCursor = class {
        constructor(inner) {
          this.inner = inner;
          this.afterBreak = true;
          this.value = "";
          this.done = false;
        }

        next() {
          var skip = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

          var _this$inner$next = this.inner.next(skip),
              done = _this$inner$next.done,
              lineBreak = _this$inner$next.lineBreak,
              value = _this$inner$next.value;

          if (done) {
            this.done = true;
            this.value = "";
          } else if (lineBreak) {
            if (this.afterBreak) {
              this.value = "";
            } else {
              this.afterBreak = true;
              this.next();
            }
          } else {
            this.value = value;
            this.afterBreak = false;
          }

          return this;
        }

        get lineBreak() {
          return false;
        }

      };

      if (typeof Symbol != "undefined") {
        Text.prototype[Symbol.iterator] = function () {
          return this.iter();
        };

        RawTextCursor.prototype[Symbol.iterator] = PartialTextCursor.prototype[Symbol.iterator] = LineCursor.prototype[Symbol.iterator] = function () {
          return this;
        };
      }

      Line = class {
        constructor(from, to, number2, text) {
          this.from = from;
          this.to = to;
          this.number = number2;
          this.text = text;
        }

        get length() {
          return this.to - this.from;
        }

      };
      extend = /* @__PURE__ */"lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map(s => s ? parseInt(s, 36) : 1);

      for (var _i28 = 1; _i28 < extend.length; _i28++) {
        extend[_i28] += extend[_i28 - 1];
      }

      ZWJ = 8205;
      DefaultSplit = /\r\n?|\n/;

      MapMode = /* @__PURE__ */function (MapMode2) {
        MapMode2[MapMode2["Simple"] = 0] = "Simple";
        MapMode2[MapMode2["TrackDel"] = 1] = "TrackDel";
        MapMode2[MapMode2["TrackBefore"] = 2] = "TrackBefore";
        MapMode2[MapMode2["TrackAfter"] = 3] = "TrackAfter";
        return MapMode2;
      }(MapMode || (MapMode = {}));

      ChangeDesc = class {
        constructor(sections) {
          this.sections = sections;
        }

        get length() {
          var result = 0;

          for (var _i29 = 0; _i29 < this.sections.length; _i29 += 2) {
            result += this.sections[_i29];
          }

          return result;
        }

        get newLength() {
          var result = 0;

          for (var _i30 = 0; _i30 < this.sections.length; _i30 += 2) {
            var ins = this.sections[_i30 + 1];
            result += ins < 0 ? this.sections[_i30] : ins;
          }

          return result;
        }

        get empty() {
          return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
        }

        iterGaps(f) {
          for (var _i31 = 0, posA = 0, posB = 0; _i31 < this.sections.length;) {
            var len = this.sections[_i31++],
                ins = this.sections[_i31++];

            if (ins < 0) {
              f(posA, posB, len);
              posB += len;
            } else {
              posB += ins;
            }

            posA += len;
          }
        }

        iterChangedRanges(f) {
          var individual = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          iterChanges(this, f, individual);
        }

        get invertedDesc() {
          var sections = [];

          for (var _i32 = 0; _i32 < this.sections.length;) {
            var len = this.sections[_i32++],
                ins = this.sections[_i32++];
            if (ins < 0) sections.push(len, ins);else sections.push(ins, len);
          }

          return new ChangeDesc(sections);
        }

        composeDesc(other) {
          return this.empty ? other : other.empty ? this : composeSets(this, other);
        }

        mapDesc(other) {
          var before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          return other.empty ? this : mapSet(this, other, before);
        }

        mapPos(pos) {
          var assoc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
          var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : MapMode.Simple;
          var posA = 0,
              posB = 0;

          for (var _i33 = 0; _i33 < this.sections.length;) {
            var len = this.sections[_i33++],
                ins = this.sections[_i33++],
                endA = posA + len;

            if (ins < 0) {
              if (endA > pos) return posB + (pos - posA);
              posB += len;
            } else {
              if (mode != MapMode.Simple && endA >= pos && (mode == MapMode.TrackDel && posA < pos && endA > pos || mode == MapMode.TrackBefore && posA < pos || mode == MapMode.TrackAfter && endA > pos)) return null;
              if (endA > pos || endA == pos && assoc < 0 && !len) return pos == posA || assoc < 0 ? posB : posB + ins;
              posB += ins;
            }

            posA = endA;
          }

          if (pos > posA) throw new RangeError("Position ".concat(pos, " is out of range for changeset of length ").concat(posA));
          return posB;
        }

        touchesRange(from) {
          var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : from;

          for (var _i34 = 0, pos = 0; _i34 < this.sections.length && pos <= to;) {
            var len = this.sections[_i34++],
                ins = this.sections[_i34++],
                end = pos + len;
            if (ins >= 0 && pos <= to && end >= from) return pos < from && end > to ? "cover" : true;
            pos = end;
          }

          return false;
        }

        toString() {
          var result = "";

          for (var _i35 = 0; _i35 < this.sections.length;) {
            var len = this.sections[_i35++],
                ins = this.sections[_i35++];
            result += (result ? " " : "") + len + (ins >= 0 ? ":" + ins : "");
          }

          return result;
        }

        toJSON() {
          return this.sections;
        }

        static fromJSON(json) {
          if (!Array.isArray(json) || json.length % 2 || json.some(a => typeof a != "number")) throw new RangeError("Invalid JSON representation of ChangeDesc");
          return new ChangeDesc(json);
        }

        static create(sections) {
          return new ChangeDesc(sections);
        }

      };
      ChangeSet = class extends ChangeDesc {
        constructor(sections, inserted) {
          super(sections);
          this.inserted = inserted;
        }

        apply(doc2) {
          if (this.length != doc2.length) throw new RangeError("Applying change set to a document with the wrong length");
          iterChanges(this, (fromA, toA, fromB, _toB, text) => doc2 = doc2.replace(fromB, fromB + (toA - fromA), text), false);
          return doc2;
        }

        mapDesc(other) {
          var before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          return mapSet(this, other, before, true);
        }

        invert(doc2) {
          var sections = this.sections.slice(),
              inserted = [];

          for (var _i36 = 0, pos = 0; _i36 < sections.length; _i36 += 2) {
            var len = sections[_i36],
                ins = sections[_i36 + 1];

            if (ins >= 0) {
              sections[_i36] = ins;
              sections[_i36 + 1] = len;
              var index = _i36 >> 1;

              while (inserted.length < index) {
                inserted.push(Text.empty);
              }

              inserted.push(len ? doc2.slice(pos, pos + len) : Text.empty);
            }

            pos += len;
          }

          return new ChangeSet(sections, inserted);
        }

        compose(other) {
          return this.empty ? other : other.empty ? this : composeSets(this, other, true);
        }

        map(other) {
          var before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          return other.empty ? this : mapSet(this, other, before, true);
        }

        iterChanges(f) {
          var individual = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          iterChanges(this, f, individual);
        }

        get desc() {
          return ChangeDesc.create(this.sections);
        }

        filter(ranges) {
          var resultSections = [],
              resultInserted = [],
              filteredSections = [];
          var iter = new SectionIter(this);

          done: for (var _i37 = 0, pos = 0;;) {
            var next = _i37 == ranges.length ? 1e9 : ranges[_i37++];

            while (pos < next || pos == next && iter.len == 0) {
              if (iter.done) break done;
              var len = Math.min(iter.len, next - pos);
              addSection(filteredSections, len, -1);
              var ins = iter.ins == -1 ? -1 : iter.off == 0 ? iter.ins : 0;
              addSection(resultSections, len, ins);
              if (ins > 0) addInsert(resultInserted, resultSections, iter.text);
              iter.forward(len);
              pos += len;
            }

            var end = ranges[_i37++];

            while (pos < end) {
              if (iter.done) break done;

              var _len = Math.min(iter.len, end - pos);

              addSection(resultSections, _len, -1);
              addSection(filteredSections, _len, iter.ins == -1 ? -1 : iter.off == 0 ? iter.ins : 0);
              iter.forward(_len);
              pos += _len;
            }
          }

          return {
            changes: new ChangeSet(resultSections, resultInserted),
            filtered: ChangeDesc.create(filteredSections)
          };
        }

        toJSON() {
          var parts = [];

          for (var _i38 = 0; _i38 < this.sections.length; _i38 += 2) {
            var len = this.sections[_i38],
                ins = this.sections[_i38 + 1];
            if (ins < 0) parts.push(len);else if (ins == 0) parts.push([len]);else parts.push([len].concat(this.inserted[_i38 >> 1].toJSON()));
          }

          return parts;
        }

        static of(changes, length, lineSep) {
          var sections = [],
              inserted = [],
              pos = 0;
          var total = null;

          function flush() {
            var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            if (!force && !sections.length) return;
            if (pos < length) addSection(sections, length - pos, -1);
            var set = new ChangeSet(sections, inserted);
            total = total ? total.compose(set.map(total)) : set;
            sections = [];
            inserted = [];
            pos = 0;
          }

          function process2(spec) {
            if (Array.isArray(spec)) {
              var _iterator19 = _createForOfIteratorHelper(spec),
                  _step19;

              try {
                for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
                  var sub = _step19.value;
                  process2(sub);
                }
              } catch (err) {
                _iterator19.e(err);
              } finally {
                _iterator19.f();
              }
            } else if (spec instanceof ChangeSet) {
              if (spec.length != length) throw new RangeError("Mismatched change set length (got ".concat(spec.length, ", expected ").concat(length, ")"));
              flush();
              total = total ? total.compose(spec.map(total)) : spec;
            } else {
              var from = spec.from,
                  _spec$to = spec.to,
                  to = _spec$to === void 0 ? from : _spec$to,
                  insert2 = spec.insert;
              if (from > to || from < 0 || to > length) throw new RangeError("Invalid change range ".concat(from, " to ").concat(to, " (in doc of length ").concat(length, ")"));
              var insText = !insert2 ? Text.empty : typeof insert2 == "string" ? Text.of(insert2.split(lineSep || DefaultSplit)) : insert2;
              var insLen = insText.length;
              if (from == to && insLen == 0) return;
              if (from < pos) flush();
              if (from > pos) addSection(sections, from - pos, -1);
              addSection(sections, to - from, insLen);
              addInsert(inserted, sections, insText);
              pos = to;
            }
          }

          process2(changes);
          flush(!total);
          return total;
        }

        static empty(length) {
          return new ChangeSet(length ? [length, -1] : [], []);
        }

        static fromJSON(json) {
          if (!Array.isArray(json)) throw new RangeError("Invalid JSON representation of ChangeSet");
          var sections = [],
              inserted = [];

          for (var _i39 = 0; _i39 < json.length; _i39++) {
            var part = json[_i39];

            if (typeof part == "number") {
              sections.push(part, -1);
            } else if (!Array.isArray(part) || typeof part[0] != "number" || part.some((e, i2) => i2 && typeof e != "string")) {
              throw new RangeError("Invalid JSON representation of ChangeSet");
            } else if (part.length == 1) {
              sections.push(part[0], 0);
            } else {
              while (inserted.length < _i39) {
                inserted.push(Text.empty);
              }

              inserted[_i39] = Text.of(part.slice(1));
              sections.push(part[0], inserted[_i39].length);
            }
          }

          return new ChangeSet(sections, inserted);
        }

        static createSet(sections, inserted) {
          return new ChangeSet(sections, inserted);
        }

      };
      SectionIter = class {
        constructor(set) {
          this.set = set;
          this.i = 0;
          this.next();
        }

        next() {
          var sections = this.set.sections;

          if (this.i < sections.length) {
            this.len = sections[this.i++];
            this.ins = sections[this.i++];
          } else {
            this.len = 0;
            this.ins = -2;
          }

          this.off = 0;
        }

        get done() {
          return this.ins == -2;
        }

        get len2() {
          return this.ins < 0 ? this.len : this.ins;
        }

        get text() {
          var inserted = this.set.inserted,
              index = this.i - 2 >> 1;
          return index >= inserted.length ? Text.empty : inserted[index];
        }

        textBit(len) {
          var inserted = this.set.inserted,
              index = this.i - 2 >> 1;
          return index >= inserted.length && !len ? Text.empty : inserted[index].slice(this.off, len == null ? void 0 : this.off + len);
        }

        forward(len) {
          if (len == this.len) this.next();else {
            this.len -= len;
            this.off += len;
          }
        }

        forward2(len) {
          if (this.ins == -1) this.forward(len);else if (len == this.ins) this.next();else {
            this.ins -= len;
            this.off += len;
          }
        }

      };
      SelectionRange = class {
        constructor(from, to, flags) {
          this.from = from;
          this.to = to;
          this.flags = flags;
        }

        get anchor() {
          return this.flags & 16 ? this.to : this.from;
        }

        get head() {
          return this.flags & 16 ? this.from : this.to;
        }

        get empty() {
          return this.from == this.to;
        }

        get assoc() {
          return this.flags & 4 ? -1 : this.flags & 8 ? 1 : 0;
        }

        get bidiLevel() {
          var level = this.flags & 3;
          return level == 3 ? null : level;
        }

        get goalColumn() {
          var value = this.flags >> 5;
          return value == 33554431 ? void 0 : value;
        }

        map(change) {
          var assoc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
          var from, to;

          if (this.empty) {
            from = to = change.mapPos(this.from, assoc);
          } else {
            from = change.mapPos(this.from, 1);
            to = change.mapPos(this.to, -1);
          }

          return from == this.from && to == this.to ? this : new SelectionRange(from, to, this.flags);
        }

        extend(from) {
          var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : from;
          if (from <= this.anchor && to >= this.anchor) return EditorSelection.range(from, to);
          var head = Math.abs(from - this.anchor) > Math.abs(to - this.anchor) ? from : to;
          return EditorSelection.range(this.anchor, head);
        }

        eq(other) {
          return this.anchor == other.anchor && this.head == other.head;
        }

        toJSON() {
          return {
            anchor: this.anchor,
            head: this.head
          };
        }

        static fromJSON(json) {
          if (!json || typeof json.anchor != "number" || typeof json.head != "number") throw new RangeError("Invalid JSON representation for SelectionRange");
          return EditorSelection.range(json.anchor, json.head);
        }

        static create(from, to, flags) {
          return new SelectionRange(from, to, flags);
        }

      };
      EditorSelection = class {
        constructor(ranges, mainIndex) {
          this.ranges = ranges;
          this.mainIndex = mainIndex;
        }

        map(change) {
          var assoc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
          if (change.empty) return this;
          return EditorSelection.create(this.ranges.map(r => r.map(change, assoc)), this.mainIndex);
        }

        eq(other) {
          if (this.ranges.length != other.ranges.length || this.mainIndex != other.mainIndex) return false;

          for (var _i40 = 0; _i40 < this.ranges.length; _i40++) {
            if (!this.ranges[_i40].eq(other.ranges[_i40])) return false;
          }

          return true;
        }

        get main() {
          return this.ranges[this.mainIndex];
        }

        asSingle() {
          return this.ranges.length == 1 ? this : new EditorSelection([this.main], 0);
        }

        addRange(range) {
          var main = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          return EditorSelection.create([range].concat(this.ranges), main ? 0 : this.mainIndex + 1);
        }

        replaceRange(range) {
          var which = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.mainIndex;
          var ranges = this.ranges.slice();
          ranges[which] = range;
          return EditorSelection.create(ranges, this.mainIndex);
        }

        toJSON() {
          return {
            ranges: this.ranges.map(r => r.toJSON()),
            main: this.mainIndex
          };
        }

        static fromJSON(json) {
          if (!json || !Array.isArray(json.ranges) || typeof json.main != "number" || json.main >= json.ranges.length) throw new RangeError("Invalid JSON representation for EditorSelection");
          return new EditorSelection(json.ranges.map(r => SelectionRange.fromJSON(r)), json.main);
        }

        static single(anchor) {
          var head = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : anchor;
          return new EditorSelection([EditorSelection.range(anchor, head)], 0);
        }

        static create(ranges) {
          var mainIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          if (ranges.length == 0) throw new RangeError("A selection needs at least one range");

          for (var pos = 0, _i41 = 0; _i41 < ranges.length; _i41++) {
            var range = ranges[_i41];
            if (range.empty ? range.from <= pos : range.from < pos) return EditorSelection.normalized(ranges.slice(), mainIndex);
            pos = range.to;
          }

          return new EditorSelection(ranges, mainIndex);
        }

        static cursor(pos) {
          var assoc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var bidiLevel = arguments.length > 2 ? arguments[2] : undefined;
          var goalColumn = arguments.length > 3 ? arguments[3] : undefined;
          return SelectionRange.create(pos, pos, (assoc == 0 ? 0 : assoc < 0 ? 4 : 8) | (bidiLevel == null ? 3 : Math.min(2, bidiLevel)) | (goalColumn !== null && goalColumn !== void 0 ? goalColumn : 33554431) << 5);
        }

        static range(anchor, head, goalColumn) {
          var goal = (goalColumn !== null && goalColumn !== void 0 ? goalColumn : 33554431) << 5;
          return head < anchor ? SelectionRange.create(head, anchor, 16 | goal | 8) : SelectionRange.create(anchor, head, goal | (head > anchor ? 4 : 0));
        }

        static normalized(ranges) {
          var mainIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var main = ranges[mainIndex];
          ranges.sort((a, b) => a.from - b.from);
          mainIndex = ranges.indexOf(main);

          for (var _i42 = 1; _i42 < ranges.length; _i42++) {
            var range = ranges[_i42],
                prev = ranges[_i42 - 1];

            if (range.empty ? range.from <= prev.to : range.from < prev.to) {
              var from = prev.from,
                  to = Math.max(range.to, prev.to);
              if (_i42 <= mainIndex) mainIndex--;
              ranges.splice(--_i42, 2, range.anchor > range.head ? EditorSelection.range(to, from) : EditorSelection.range(from, to));
            }
          }

          return new EditorSelection(ranges, mainIndex);
        }

      };
      nextID = 0;
      Facet = class {
        constructor(combine, compareInput, compare2, isStatic, extensions) {
          this.combine = combine;
          this.compareInput = compareInput;
          this.compare = compare2;
          this.isStatic = isStatic;
          this.extensions = extensions;
          this.id = nextID++;
          this.default = combine([]);
        }

        static define() {
          var config2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return new Facet(config2.combine || (a => a), config2.compareInput || ((a, b) => a === b), config2.compare || (!config2.combine ? sameArray : (a, b) => a === b), !!config2.static, config2.enables);
        }

        of(value) {
          return new FacetProvider([], this, 0, value);
        }

        compute(deps, get) {
          if (this.isStatic) throw new Error("Can't compute a static facet");
          return new FacetProvider(deps, this, 1, get);
        }

        computeN(deps, get) {
          if (this.isStatic) throw new Error("Can't compute a static facet");
          return new FacetProvider(deps, this, 2, get);
        }

        from(field, get) {
          if (!get) get = x => x;
          return this.compute([field], state => get(state.field(field)));
        }

      };
      FacetProvider = class {
        constructor(dependencies, facet, type, value) {
          this.dependencies = dependencies;
          this.facet = facet;
          this.type = type;
          this.value = value;
          this.id = nextID++;
        }

        dynamicSlot(addresses) {
          var _a2;

          var getter = this.value;
          var compare2 = this.facet.compareInput;
          var id = this.id,
              idx = addresses[id] >> 1,
              multi = this.type == 2;
          var depDoc = false,
              depSel = false,
              depAddrs = [];

          var _iterator20 = _createForOfIteratorHelper(this.dependencies),
              _step20;

          try {
            for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
              var dep = _step20.value;
              if (dep == "doc") depDoc = true;else if (dep == "selection") depSel = true;else if ((((_a2 = addresses[dep.id]) !== null && _a2 !== void 0 ? _a2 : 1) & 1) == 0) depAddrs.push(addresses[dep.id]);
            }
          } catch (err) {
            _iterator20.e(err);
          } finally {
            _iterator20.f();
          }

          return {
            create(state) {
              state.values[idx] = getter(state);
              return 1;
            },

            update(state, tr) {
              if (depDoc && tr.docChanged || depSel && (tr.docChanged || tr.selection) || ensureAll(state, depAddrs)) {
                var newVal = getter(state);

                if (multi ? !compareArray(newVal, state.values[idx], compare2) : !compare2(newVal, state.values[idx])) {
                  state.values[idx] = newVal;
                  return 1;
                }
              }

              return 0;
            },

            reconfigure: (state, oldState) => {
              var newVal = getter(state);
              var oldAddr = oldState.config.address[id];

              if (oldAddr != null) {
                var oldVal = getAddr(oldState, oldAddr);

                if (this.dependencies.every(dep => {
                  return dep instanceof Facet ? oldState.facet(dep) === state.facet(dep) : dep instanceof StateField ? oldState.field(dep, false) == state.field(dep, false) : true;
                }) || (multi ? compareArray(newVal, oldVal, compare2) : compare2(newVal, oldVal))) {
                  state.values[idx] = oldVal;
                  return 0;
                }
              }

              state.values[idx] = newVal;
              return 1;
            }
          };
        }

      };
      initField = /* @__PURE__ */Facet.define({
        static: true
      });
      StateField = class {
        constructor(id, createF, updateF, compareF, spec) {
          this.id = id;
          this.createF = createF;
          this.updateF = updateF;
          this.compareF = compareF;
          this.spec = spec;
          this.provides = void 0;
        }

        static define(config2) {
          var field = new StateField(nextID++, config2.create, config2.update, config2.compare || ((a, b) => a === b), config2);
          if (config2.provide) field.provides = config2.provide(field);
          return field;
        }

        create(state) {
          var init = state.facet(initField).find(i => i.field == this);
          return ((init === null || init === void 0 ? void 0 : init.create) || this.createF)(state);
        }

        slot(addresses) {
          var idx = addresses[this.id] >> 1;
          return {
            create: state => {
              state.values[idx] = this.create(state);
              return 1;
            },
            update: (state, tr) => {
              var oldVal = state.values[idx];
              var value = this.updateF(oldVal, tr);
              if (this.compareF(oldVal, value)) return 0;
              state.values[idx] = value;
              return 1;
            },
            reconfigure: (state, oldState) => {
              if (oldState.config.address[this.id] != null) {
                state.values[idx] = oldState.field(this);
                return 0;
              }

              state.values[idx] = this.create(state);
              return 1;
            }
          };
        }

        init(create) {
          return [this, initField.of({
            field: this,
            create
          })];
        }

        get extension() {
          return this;
        }

      };
      Prec_ = {
        lowest: 4,
        low: 3,
        default: 2,
        high: 1,
        highest: 0
      };
      Prec = {
        highest: /* @__PURE__ */prec(Prec_.highest),
        high: /* @__PURE__ */prec(Prec_.high),
        default: /* @__PURE__ */prec(Prec_.default),
        low: /* @__PURE__ */prec(Prec_.low),
        lowest: /* @__PURE__ */prec(Prec_.lowest)
      };
      PrecExtension = class {
        constructor(inner, prec2) {
          this.inner = inner;
          this.prec = prec2;
        }

      };
      Compartment = class {
        of(ext) {
          return new CompartmentInstance(this, ext);
        }

        reconfigure(content2) {
          return Compartment.reconfigure.of({
            compartment: this,
            extension: content2
          });
        }

        get(state) {
          return state.config.compartments.get(this);
        }

      };
      CompartmentInstance = class {
        constructor(compartment, inner) {
          this.compartment = compartment;
          this.inner = inner;
        }

      };
      Configuration = class {
        constructor(base2, compartments, dynamicSlots, address, staticValues, facets) {
          this.base = base2;
          this.compartments = compartments;
          this.dynamicSlots = dynamicSlots;
          this.address = address;
          this.staticValues = staticValues;
          this.facets = facets;
          this.statusTemplate = [];

          while (this.statusTemplate.length < dynamicSlots.length) {
            this.statusTemplate.push(0);
          }
        }

        staticFacet(facet) {
          var addr = this.address[facet.id];
          return addr == null ? facet.default : this.staticValues[addr >> 1];
        }

        static resolve(base2, compartments, oldState) {
          var fields = [];
          var facets = /* @__PURE__ */Object.create(null);
          var newCompartments = /* @__PURE__ */new Map();

          var _iterator21 = _createForOfIteratorHelper(flatten(base2, compartments, newCompartments)),
              _step21;

          try {
            for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
              var ext = _step21.value;
              if (ext instanceof StateField) fields.push(ext);else (facets[ext.facet.id] || (facets[ext.facet.id] = [])).push(ext);
            }
          } catch (err) {
            _iterator21.e(err);
          } finally {
            _iterator21.f();
          }

          var address = /* @__PURE__ */Object.create(null);
          var staticValues = [];
          var dynamicSlots = [];

          var _loop = function _loop() {
            var field = _fields[_i43];
            address[field.id] = dynamicSlots.length << 1;
            dynamicSlots.push(a => field.slot(a));
          };

          for (var _i43 = 0, _fields = fields; _i43 < _fields.length; _i43++) {
            _loop();
          }

          var oldFacets = oldState === null || oldState === void 0 ? void 0 : oldState.config.facets;

          var _loop2 = function _loop2(id) {
            var providers = facets[id],
                facet = providers[0].facet;
            var oldProviders = oldFacets && oldFacets[id] || [];

            if (providers.every(p => p.type == 0)) {
              address[facet.id] = staticValues.length << 1 | 1;

              if (sameArray(oldProviders, providers)) {
                staticValues.push(oldState.facet(facet));
              } else {
                var value = facet.combine(providers.map(p => p.value));
                staticValues.push(oldState && facet.compare(value, oldState.facet(facet)) ? oldState.facet(facet) : value);
              }
            } else {
              var _iterator22 = _createForOfIteratorHelper(providers),
                  _step22;

              try {
                var _loop3 = function _loop3() {
                  var p = _step22.value;

                  if (p.type == 0) {
                    address[p.id] = staticValues.length << 1 | 1;
                    staticValues.push(p.value);
                  } else {
                    address[p.id] = dynamicSlots.length << 1;
                    dynamicSlots.push(a => p.dynamicSlot(a));
                  }
                };

                for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
                  _loop3();
                }
              } catch (err) {
                _iterator22.e(err);
              } finally {
                _iterator22.f();
              }

              address[facet.id] = dynamicSlots.length << 1;
              dynamicSlots.push(a => dynamicFacetSlot(a, facet, providers));
            }
          };

          for (var id in facets) {
            _loop2(id);
          }

          var dynamic = dynamicSlots.map(f => f(address));
          return new Configuration(base2, newCompartments, dynamic, address, staticValues, facets);
        }

      };
      languageData = /* @__PURE__ */Facet.define();
      allowMultipleSelections = /* @__PURE__ */Facet.define({
        combine: values => values.some(v => v),
        static: true
      });
      lineSeparator = /* @__PURE__ */Facet.define({
        combine: values => values.length ? values[0] : void 0,
        static: true
      });
      changeFilter = /* @__PURE__ */Facet.define();
      transactionFilter = /* @__PURE__ */Facet.define();
      transactionExtender = /* @__PURE__ */Facet.define();
      readOnly = /* @__PURE__ */Facet.define({
        combine: values => values.length ? values[0] : false
      });
      Annotation = class {
        constructor(type, value) {
          this.type = type;
          this.value = value;
        }

        static define() {
          return new AnnotationType();
        }

      };
      AnnotationType = class {
        of(value) {
          return new Annotation(this, value);
        }

      };
      StateEffectType = class {
        constructor(map) {
          this.map = map;
        }

        of(value) {
          return new StateEffect(this, value);
        }

      };
      StateEffect = class {
        constructor(type, value) {
          this.type = type;
          this.value = value;
        }

        map(mapping) {
          var mapped = this.type.map(this.value, mapping);
          return mapped === void 0 ? void 0 : mapped == this.value ? this : new StateEffect(this.type, mapped);
        }

        is(type) {
          return this.type == type;
        }

        static define() {
          var spec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return new StateEffectType(spec.map || (v => v));
        }

        static mapEffects(effects, mapping) {
          if (!effects.length) return effects;
          var result = [];

          var _iterator23 = _createForOfIteratorHelper(effects),
              _step23;

          try {
            for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
              var effect = _step23.value;
              var mapped = effect.map(mapping);
              if (mapped) result.push(mapped);
            }
          } catch (err) {
            _iterator23.e(err);
          } finally {
            _iterator23.f();
          }

          return result;
        }

      };
      StateEffect.reconfigure = /* @__PURE__ */StateEffect.define();
      StateEffect.appendConfig = /* @__PURE__ */StateEffect.define();
      Transaction = class {
        constructor(startState, changes, selection, effects, annotations, scrollIntoView3) {
          this.startState = startState;
          this.changes = changes;
          this.selection = selection;
          this.effects = effects;
          this.annotations = annotations;
          this.scrollIntoView = scrollIntoView3;
          this._doc = null;
          this._state = null;
          if (selection) checkSelection(selection, changes.newLength);
          if (!annotations.some(a => a.type == Transaction.time)) this.annotations = annotations.concat(Transaction.time.of(Date.now()));
        }

        static create(startState, changes, selection, effects, annotations, scrollIntoView3) {
          return new Transaction(startState, changes, selection, effects, annotations, scrollIntoView3);
        }

        get newDoc() {
          return this._doc || (this._doc = this.changes.apply(this.startState.doc));
        }

        get newSelection() {
          return this.selection || this.startState.selection.map(this.changes);
        }

        get state() {
          if (!this._state) this.startState.applyTransaction(this);
          return this._state;
        }

        annotation(type) {
          var _iterator24 = _createForOfIteratorHelper(this.annotations),
              _step24;

          try {
            for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
              var ann = _step24.value;
              if (ann.type == type) return ann.value;
            }
          } catch (err) {
            _iterator24.e(err);
          } finally {
            _iterator24.f();
          }

          return void 0;
        }

        get docChanged() {
          return !this.changes.empty;
        }

        get reconfigured() {
          return this.startState.config != this.state.config;
        }

        isUserEvent(event) {
          var e = this.annotation(Transaction.userEvent);
          return !!(e && (e == event || e.length > event.length && e.slice(0, event.length) == event && e[event.length] == "."));
        }

      };
      Transaction.time = /* @__PURE__ */Annotation.define();
      Transaction.userEvent = /* @__PURE__ */Annotation.define();
      Transaction.addToHistory = /* @__PURE__ */Annotation.define();
      Transaction.remote = /* @__PURE__ */Annotation.define();
      none = [];

      CharCategory = /* @__PURE__ */function (CharCategory2) {
        CharCategory2[CharCategory2["Word"] = 0] = "Word";
        CharCategory2[CharCategory2["Space"] = 1] = "Space";
        CharCategory2[CharCategory2["Other"] = 2] = "Other";
        return CharCategory2;
      }(CharCategory || (CharCategory = {}));

      nonASCIISingleCaseWordChar = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;

      try {
        wordChar = /* @__PURE__ */new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
      } catch (_) {}

      EditorState = class {
        constructor(config2, doc2, selection, values, computeSlot, tr) {
          this.config = config2;
          this.doc = doc2;
          this.selection = selection;
          this.values = values;
          this.status = config2.statusTemplate.slice();
          this.computeSlot = computeSlot;
          if (tr) tr._state = this;

          for (var _i44 = 0; _i44 < this.config.dynamicSlots.length; _i44++) {
            ensureAddr(this, _i44 << 1);
          }

          this.computeSlot = null;
        }

        field(field) {
          var require2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          var addr = this.config.address[field.id];

          if (addr == null) {
            if (require2) throw new RangeError("Field is not present in this state");
            return void 0;
          }

          ensureAddr(this, addr);
          return getAddr(this, addr);
        }

        update() {
          for (var _len2 = arguments.length, specs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            specs[_key2] = arguments[_key2];
          }

          return resolveTransaction(this, specs, true);
        }

        applyTransaction(tr) {
          var conf = this.config,
              _conf = conf,
              base2 = _conf.base,
              compartments = _conf.compartments;

          var _iterator25 = _createForOfIteratorHelper(tr.effects),
              _step25;

          try {
            for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
              var effect = _step25.value;

              if (effect.is(Compartment.reconfigure)) {
                if (conf) {
                  compartments = /* @__PURE__ */new Map();
                  conf.compartments.forEach((val, key) => compartments.set(key, val));
                  conf = null;
                }

                compartments.set(effect.value.compartment, effect.value.extension);
              } else if (effect.is(StateEffect.reconfigure)) {
                conf = null;
                base2 = effect.value;
              } else if (effect.is(StateEffect.appendConfig)) {
                conf = null;
                base2 = asArray(base2).concat(effect.value);
              }
            }
          } catch (err) {
            _iterator25.e(err);
          } finally {
            _iterator25.f();
          }

          var startValues;

          if (!conf) {
            conf = Configuration.resolve(base2, compartments, this);
            var intermediateState = new EditorState(conf, this.doc, this.selection, conf.dynamicSlots.map(() => null), (state, slot) => slot.reconfigure(state, this), null);
            startValues = intermediateState.values;
          } else {
            startValues = tr.startState.values.slice();
          }

          new EditorState(conf, tr.newDoc, tr.newSelection, startValues, (state, slot) => slot.update(state, tr), tr);
        }

        replaceSelection(text) {
          if (typeof text == "string") text = this.toText(text);
          return this.changeByRange(range => ({
            changes: {
              from: range.from,
              to: range.to,
              insert: text
            },
            range: EditorSelection.cursor(range.from + text.length)
          }));
        }

        changeByRange(f) {
          var sel = this.selection;
          var result1 = f(sel.ranges[0]);
          var changes = this.changes(result1.changes),
              ranges = [result1.range];
          var effects = asArray(result1.effects);

          for (var _i45 = 1; _i45 < sel.ranges.length; _i45++) {
            var result = f(sel.ranges[_i45]);
            var newChanges = this.changes(result.changes),
                newMapped = newChanges.map(changes);

            for (var j = 0; j < _i45; j++) {
              ranges[j] = ranges[j].map(newMapped);
            }

            var mapBy = changes.mapDesc(newChanges, true);
            ranges.push(result.range.map(mapBy));
            changes = changes.compose(newMapped);
            effects = StateEffect.mapEffects(effects, newMapped).concat(StateEffect.mapEffects(asArray(result.effects), mapBy));
          }

          return {
            changes,
            selection: EditorSelection.create(ranges, sel.mainIndex),
            effects
          };
        }

        changes() {
          var spec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          if (spec instanceof ChangeSet) return spec;
          return ChangeSet.of(spec, this.doc.length, this.facet(EditorState.lineSeparator));
        }

        toText(string2) {
          return Text.of(string2.split(this.facet(EditorState.lineSeparator) || DefaultSplit));
        }

        sliceDoc() {
          var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.doc.length;
          return this.doc.sliceString(from, to, this.lineBreak);
        }

        facet(facet) {
          var addr = this.config.address[facet.id];
          if (addr == null) return facet.default;
          ensureAddr(this, addr);
          return getAddr(this, addr);
        }

        toJSON(fields) {
          var result = {
            doc: this.sliceDoc(),
            selection: this.selection.toJSON()
          };
          if (fields) for (var prop in fields) {
            var value = fields[prop];
            if (value instanceof StateField) result[prop] = value.spec.toJSON(this.field(fields[prop]), this);
          }
          return result;
        }

        static fromJSON(json) {
          var config2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var fields = arguments.length > 2 ? arguments[2] : undefined;
          if (!json || typeof json.doc != "string") throw new RangeError("Invalid JSON representation for EditorState");
          var fieldInit = [];

          if (fields) {
            var _loop4 = function _loop4(prop) {
              var field = fields[prop],
                  value = json[prop];
              fieldInit.push(field.init(state => field.spec.fromJSON(value, state)));
            };

            for (var prop in fields) {
              _loop4(prop);
            }
          }

          return EditorState.create({
            doc: json.doc,
            selection: EditorSelection.fromJSON(json.selection),
            extensions: config2.extensions ? fieldInit.concat([config2.extensions]) : fieldInit
          });
        }

        static create() {
          var config2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var configuration = Configuration.resolve(config2.extensions || [], /* @__PURE__ */new Map());
          var doc2 = config2.doc instanceof Text ? config2.doc : Text.of((config2.doc || "").split(configuration.staticFacet(EditorState.lineSeparator) || DefaultSplit));
          var selection = !config2.selection ? EditorSelection.single(0) : config2.selection instanceof EditorSelection ? config2.selection : EditorSelection.single(config2.selection.anchor, config2.selection.head);
          checkSelection(selection, doc2.length);
          if (!configuration.staticFacet(allowMultipleSelections)) selection = selection.asSingle();
          return new EditorState(configuration, doc2, selection, configuration.dynamicSlots.map(() => null), (state, slot) => slot.create(state), null);
        }

        get tabSize() {
          return this.facet(EditorState.tabSize);
        }

        get lineBreak() {
          return this.facet(EditorState.lineSeparator) || "\n";
        }

        get readOnly() {
          return this.facet(readOnly);
        }

        phrase(phrase2) {
          for (var _len3 = arguments.length, insert2 = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            insert2[_key3 - 1] = arguments[_key3];
          }

          var _iterator26 = _createForOfIteratorHelper(this.facet(EditorState.phrases)),
              _step26;

          try {
            for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
              var map = _step26.value;

              if (Object.prototype.hasOwnProperty.call(map, phrase2)) {
                phrase2 = map[phrase2];
                break;
              }
            }
          } catch (err) {
            _iterator26.e(err);
          } finally {
            _iterator26.f();
          }

          if (insert2.length) phrase2 = phrase2.replace(/\$(\$|\d*)/g, (m, i) => {
            if (i == "$") return "$";
            var n = +(i || 1);
            return n > insert2.length ? m : insert2[n - 1];
          });
          return phrase2;
        }

        languageDataAt(name2, pos) {
          var side = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
          var values = [];

          var _iterator27 = _createForOfIteratorHelper(this.facet(languageData)),
              _step27;

          try {
            for (_iterator27.s(); !(_step27 = _iterator27.n()).done;) {
              var provider = _step27.value;

              var _iterator28 = _createForOfIteratorHelper(provider(this, pos, side)),
                  _step28;

              try {
                for (_iterator28.s(); !(_step28 = _iterator28.n()).done;) {
                  var result = _step28.value;
                  if (Object.prototype.hasOwnProperty.call(result, name2)) values.push(result[name2]);
                }
              } catch (err) {
                _iterator28.e(err);
              } finally {
                _iterator28.f();
              }
            }
          } catch (err) {
            _iterator27.e(err);
          } finally {
            _iterator27.f();
          }

          return values;
        }

        charCategorizer(at) {
          return makeCategorizer(this.languageDataAt("wordChars", at).join(""));
        }

        wordAt(pos) {
          var _this$doc$lineAt = this.doc.lineAt(pos),
              text = _this$doc$lineAt.text,
              from = _this$doc$lineAt.from,
              length = _this$doc$lineAt.length;

          var cat = this.charCategorizer(pos);
          var start = pos - from,
              end = pos - from;

          while (start > 0) {
            var prev = findClusterBreak(text, start, false);
            if (cat(text.slice(prev, start)) != CharCategory.Word) break;
            start = prev;
          }

          while (end < length) {
            var next = findClusterBreak(text, end);
            if (cat(text.slice(end, next)) != CharCategory.Word) break;
            end = next;
          }

          return start == end ? null : EditorSelection.range(start + from, end + from);
        }

      };
      EditorState.allowMultipleSelections = allowMultipleSelections;
      EditorState.tabSize = /* @__PURE__ */Facet.define({
        combine: values => values.length ? values[0] : 4
      });
      EditorState.lineSeparator = lineSeparator;
      EditorState.readOnly = readOnly;
      EditorState.phrases = /* @__PURE__ */Facet.define({
        compare(a, b) {
          var kA = Object.keys(a),
              kB = Object.keys(b);
          return kA.length == kB.length && kA.every(k => a[k] == b[k]);
        }

      });
      EditorState.languageData = languageData;
      EditorState.changeFilter = changeFilter;
      EditorState.transactionFilter = transactionFilter;
      EditorState.transactionExtender = transactionExtender;
      Compartment.reconfigure = /* @__PURE__ */StateEffect.define();
      RangeValue = class {
        eq(other) {
          return this == other;
        }

        range(from) {
          var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : from;
          return Range.create(from, to, this);
        }

      };
      RangeValue.prototype.startSide = RangeValue.prototype.endSide = 0;
      RangeValue.prototype.point = false;
      RangeValue.prototype.mapMode = MapMode.TrackDel;
      Range = class {
        constructor(from, to, value) {
          this.from = from;
          this.to = to;
          this.value = value;
        }

        static create(from, to, value) {
          return new Range(from, to, value);
        }

      };
      Chunk = class {
        constructor(from, to, value, maxPoint) {
          this.from = from;
          this.to = to;
          this.value = value;
          this.maxPoint = maxPoint;
        }

        get length() {
          return this.to[this.to.length - 1];
        }

        findIndex(pos, side, end) {
          var startAt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
          var arr = end ? this.to : this.from;

          for (var lo = startAt, hi = arr.length;;) {
            if (lo == hi) return lo;
            var mid = lo + hi >> 1;
            var diff = arr[mid] - pos || (end ? this.value[mid].endSide : this.value[mid].startSide) - side;
            if (mid == lo) return diff >= 0 ? lo : hi;
            if (diff >= 0) hi = mid;else lo = mid + 1;
          }
        }

        between(offset, from, to, f) {
          for (var _i46 = this.findIndex(from, -1e9, true), e = this.findIndex(to, 1e9, false, _i46); _i46 < e; _i46++) {
            if (f(this.from[_i46] + offset, this.to[_i46] + offset, this.value[_i46]) === false) return false;
          }
        }

        map(offset, changes) {
          var value = [],
              from = [],
              to = [],
              newPos = -1,
              maxPoint = -1;

          for (var _i47 = 0; _i47 < this.value.length; _i47++) {
            var val = this.value[_i47],
                curFrom = this.from[_i47] + offset,
                curTo = this.to[_i47] + offset,
                newFrom = void 0,
                newTo = void 0;

            if (curFrom == curTo) {
              var mapped = changes.mapPos(curFrom, val.startSide, val.mapMode);
              if (mapped == null) continue;
              newFrom = newTo = mapped;

              if (val.startSide != val.endSide) {
                newTo = changes.mapPos(curFrom, val.endSide);
                if (newTo < newFrom) continue;
              }
            } else {
              newFrom = changes.mapPos(curFrom, val.startSide);
              newTo = changes.mapPos(curTo, val.endSide);
              if (newFrom > newTo || newFrom == newTo && val.startSide > 0 && val.endSide <= 0) continue;
            }

            if ((newTo - newFrom || val.endSide - val.startSide) < 0) continue;
            if (newPos < 0) newPos = newFrom;
            if (val.point) maxPoint = Math.max(maxPoint, newTo - newFrom);
            value.push(val);
            from.push(newFrom - newPos);
            to.push(newTo - newPos);
          }

          return {
            mapped: value.length ? new Chunk(from, to, value, maxPoint) : null,
            pos: newPos
          };
        }

      };
      RangeSet = class {
        constructor(chunkPos, chunk, nextLayer, maxPoint) {
          this.chunkPos = chunkPos;
          this.chunk = chunk;
          this.nextLayer = nextLayer;
          this.maxPoint = maxPoint;
        }

        static create(chunkPos, chunk, nextLayer, maxPoint) {
          return new RangeSet(chunkPos, chunk, nextLayer, maxPoint);
        }

        get length() {
          var last = this.chunk.length - 1;
          return last < 0 ? 0 : Math.max(this.chunkEnd(last), this.nextLayer.length);
        }

        get size() {
          if (this.isEmpty) return 0;
          var size = this.nextLayer.size;

          var _iterator29 = _createForOfIteratorHelper(this.chunk),
              _step29;

          try {
            for (_iterator29.s(); !(_step29 = _iterator29.n()).done;) {
              var chunk = _step29.value;
              size += chunk.value.length;
            }
          } catch (err) {
            _iterator29.e(err);
          } finally {
            _iterator29.f();
          }

          return size;
        }

        chunkEnd(index) {
          return this.chunkPos[index] + this.chunk[index].length;
        }

        update(updateSpec) {
          var _updateSpec$add = updateSpec.add,
              add2 = _updateSpec$add === void 0 ? [] : _updateSpec$add,
              _updateSpec$sort = updateSpec.sort,
              sort = _updateSpec$sort === void 0 ? false : _updateSpec$sort,
              _updateSpec$filterFro = updateSpec.filterFrom,
              filterFrom = _updateSpec$filterFro === void 0 ? 0 : _updateSpec$filterFro,
              _updateSpec$filterTo = updateSpec.filterTo,
              filterTo = _updateSpec$filterTo === void 0 ? this.length : _updateSpec$filterTo;
          var filter = updateSpec.filter;
          if (add2.length == 0 && !filter) return this;
          if (sort) add2 = add2.slice().sort(cmpRange);
          if (this.isEmpty) return add2.length ? RangeSet.of(add2) : this;
          var cur2 = new LayerCursor(this, null, -1).goto(0),
              i = 0,
              spill = [];
          var builder = new RangeSetBuilder();

          while (cur2.value || i < add2.length) {
            if (i < add2.length && (cur2.from - add2[i].from || cur2.startSide - add2[i].value.startSide) >= 0) {
              var range = add2[i++];
              if (!builder.addInner(range.from, range.to, range.value)) spill.push(range);
            } else if (cur2.rangeIndex == 1 && cur2.chunkIndex < this.chunk.length && (i == add2.length || this.chunkEnd(cur2.chunkIndex) < add2[i].from) && (!filter || filterFrom > this.chunkEnd(cur2.chunkIndex) || filterTo < this.chunkPos[cur2.chunkIndex]) && builder.addChunk(this.chunkPos[cur2.chunkIndex], this.chunk[cur2.chunkIndex])) {
              cur2.nextChunk();
            } else {
              if (!filter || filterFrom > cur2.to || filterTo < cur2.from || filter(cur2.from, cur2.to, cur2.value)) {
                if (!builder.addInner(cur2.from, cur2.to, cur2.value)) spill.push(Range.create(cur2.from, cur2.to, cur2.value));
              }

              cur2.next();
            }
          }

          return builder.finishInner(this.nextLayer.isEmpty && !spill.length ? RangeSet.empty : this.nextLayer.update({
            add: spill,
            filter,
            filterFrom,
            filterTo
          }));
        }

        map(changes) {
          if (changes.empty || this.isEmpty) return this;
          var chunks = [],
              chunkPos = [],
              maxPoint = -1;

          for (var _i48 = 0; _i48 < this.chunk.length; _i48++) {
            var start = this.chunkPos[_i48],
                chunk = this.chunk[_i48];
            var touch = changes.touchesRange(start, start + chunk.length);

            if (touch === false) {
              maxPoint = Math.max(maxPoint, chunk.maxPoint);
              chunks.push(chunk);
              chunkPos.push(changes.mapPos(start));
            } else if (touch === true) {
              var _chunk$map = chunk.map(start, changes),
                  mapped = _chunk$map.mapped,
                  pos = _chunk$map.pos;

              if (mapped) {
                maxPoint = Math.max(maxPoint, mapped.maxPoint);
                chunks.push(mapped);
                chunkPos.push(pos);
              }
            }
          }

          var next = this.nextLayer.map(changes);
          return chunks.length == 0 ? next : new RangeSet(chunkPos, chunks, next || RangeSet.empty, maxPoint);
        }

        between(from, to, f) {
          if (this.isEmpty) return;

          for (var _i49 = 0; _i49 < this.chunk.length; _i49++) {
            var start = this.chunkPos[_i49],
                chunk = this.chunk[_i49];
            if (to >= start && from <= start + chunk.length && chunk.between(start, from - start, to - start, f) === false) return;
          }

          this.nextLayer.between(from, to, f);
        }

        iter() {
          var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          return HeapCursor.from([this]).goto(from);
        }

        get isEmpty() {
          return this.nextLayer == this;
        }

        static iter(sets) {
          var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          return HeapCursor.from(sets).goto(from);
        }

        static compare(oldSets, newSets, textDiff, comparator) {
          var minPointSize = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;
          var a = oldSets.filter(set => set.maxPoint > 0 || !set.isEmpty && set.maxPoint >= minPointSize);
          var b = newSets.filter(set => set.maxPoint > 0 || !set.isEmpty && set.maxPoint >= minPointSize);
          var sharedChunks = findSharedChunks(a, b, textDiff);
          var sideA = new SpanCursor(a, sharedChunks, minPointSize);
          var sideB = new SpanCursor(b, sharedChunks, minPointSize);
          textDiff.iterGaps((fromA, fromB, length) => compare(sideA, fromA, sideB, fromB, length, comparator));
          if (textDiff.empty && textDiff.length == 0) compare(sideA, 0, sideB, 0, 0, comparator);
        }

        static eq(oldSets, newSets) {
          var from = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          var to = arguments.length > 3 ? arguments[3] : undefined;
          if (to == null) to = 1e9;
          var a = oldSets.filter(set => !set.isEmpty && newSets.indexOf(set) < 0);
          var b = newSets.filter(set => !set.isEmpty && oldSets.indexOf(set) < 0);
          if (a.length != b.length) return false;
          if (!a.length) return true;
          var sharedChunks = findSharedChunks(a, b);
          var sideA = new SpanCursor(a, sharedChunks, 0).goto(from),
              sideB = new SpanCursor(b, sharedChunks, 0).goto(from);

          for (;;) {
            if (sideA.to != sideB.to || !sameValues(sideA.active, sideB.active) || sideA.point && (!sideB.point || !sideA.point.eq(sideB.point))) return false;
            if (sideA.to > to) return true;
            sideA.next();
            sideB.next();
          }
        }

        static spans(sets, from, to, iterator) {
          var minPointSize = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;
          var cursor = new SpanCursor(sets, null, minPointSize).goto(from),
              pos = from;
          var open = cursor.openStart;

          for (;;) {
            var curTo = Math.min(cursor.to, to);

            if (cursor.point) {
              iterator.point(pos, curTo, cursor.point, cursor.activeForPoint(cursor.to), open, cursor.pointRank);
              open = cursor.openEnd(curTo) + (cursor.to > curTo ? 1 : 0);
            } else if (curTo > pos) {
              iterator.span(pos, curTo, cursor.active, open);
              open = cursor.openEnd(curTo);
            }

            if (cursor.to > to) break;
            pos = cursor.to;
            cursor.next();
          }

          return open;
        }

        static of(ranges) {
          var sort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var build = new RangeSetBuilder();

          var _iterator30 = _createForOfIteratorHelper(ranges instanceof Range ? [ranges] : sort ? lazySort(ranges) : ranges),
              _step30;

          try {
            for (_iterator30.s(); !(_step30 = _iterator30.n()).done;) {
              var range = _step30.value;
              build.add(range.from, range.to, range.value);
            }
          } catch (err) {
            _iterator30.e(err);
          } finally {
            _iterator30.f();
          }

          return build.finish();
        }

      };
      RangeSet.empty = /* @__PURE__ */new RangeSet([], [], null, -1);
      RangeSet.empty.nextLayer = RangeSet.empty;
      RangeSetBuilder = class {
        constructor() {
          this.chunks = [];
          this.chunkPos = [];
          this.chunkStart = -1;
          this.last = null;
          this.lastFrom = -1e9;
          this.lastTo = -1e9;
          this.from = [];
          this.to = [];
          this.value = [];
          this.maxPoint = -1;
          this.setMaxPoint = -1;
          this.nextLayer = null;
        }

        finishChunk(newArrays) {
          this.chunks.push(new Chunk(this.from, this.to, this.value, this.maxPoint));
          this.chunkPos.push(this.chunkStart);
          this.chunkStart = -1;
          this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint);
          this.maxPoint = -1;

          if (newArrays) {
            this.from = [];
            this.to = [];
            this.value = [];
          }
        }

        add(from, to, value) {
          if (!this.addInner(from, to, value)) (this.nextLayer || (this.nextLayer = new RangeSetBuilder())).add(from, to, value);
        }

        addInner(from, to, value) {
          var diff = from - this.lastTo || value.startSide - this.last.endSide;
          if (diff <= 0 && (from - this.lastFrom || value.startSide - this.last.startSide) < 0) throw new Error("Ranges must be added sorted by `from` position and `startSide`");
          if (diff < 0) return false;
          if (this.from.length == 250) this.finishChunk(true);
          if (this.chunkStart < 0) this.chunkStart = from;
          this.from.push(from - this.chunkStart);
          this.to.push(to - this.chunkStart);
          this.last = value;
          this.lastFrom = from;
          this.lastTo = to;
          this.value.push(value);
          if (value.point) this.maxPoint = Math.max(this.maxPoint, to - from);
          return true;
        }

        addChunk(from, chunk) {
          if ((from - this.lastTo || chunk.value[0].startSide - this.last.endSide) < 0) return false;
          if (this.from.length) this.finishChunk(true);
          this.setMaxPoint = Math.max(this.setMaxPoint, chunk.maxPoint);
          this.chunks.push(chunk);
          this.chunkPos.push(from);
          var last = chunk.value.length - 1;
          this.last = chunk.value[last];
          this.lastFrom = chunk.from[last] + from;
          this.lastTo = chunk.to[last] + from;
          return true;
        }

        finish() {
          return this.finishInner(RangeSet.empty);
        }

        finishInner(next) {
          if (this.from.length) this.finishChunk(false);
          if (this.chunks.length == 0) return next;
          var result = RangeSet.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(next) : next, this.setMaxPoint);
          this.from = null;
          return result;
        }

      };
      LayerCursor = class {
        constructor(layer, skip, minPoint) {
          var rank = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
          this.layer = layer;
          this.skip = skip;
          this.minPoint = minPoint;
          this.rank = rank;
        }

        get startSide() {
          return this.value ? this.value.startSide : 0;
        }

        get endSide() {
          return this.value ? this.value.endSide : 0;
        }

        goto(pos) {
          var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1e9;
          this.chunkIndex = this.rangeIndex = 0;
          this.gotoInner(pos, side, false);
          return this;
        }

        gotoInner(pos, side, forward) {
          while (this.chunkIndex < this.layer.chunk.length) {
            var next = this.layer.chunk[this.chunkIndex];
            if (!(this.skip && this.skip.has(next) || this.layer.chunkEnd(this.chunkIndex) < pos || next.maxPoint < this.minPoint)) break;
            this.chunkIndex++;
            forward = false;
          }

          if (this.chunkIndex < this.layer.chunk.length) {
            var rangeIndex = this.layer.chunk[this.chunkIndex].findIndex(pos - this.layer.chunkPos[this.chunkIndex], side, true);
            if (!forward || this.rangeIndex < rangeIndex) this.setRangeIndex(rangeIndex);
          }

          this.next();
        }

        forward(pos, side) {
          if ((this.to - pos || this.endSide - side) < 0) this.gotoInner(pos, side, true);
        }

        next() {
          for (;;) {
            if (this.chunkIndex == this.layer.chunk.length) {
              this.from = this.to = 1e9;
              this.value = null;
              break;
            } else {
              var chunkPos = this.layer.chunkPos[this.chunkIndex],
                  chunk = this.layer.chunk[this.chunkIndex];
              var from = chunkPos + chunk.from[this.rangeIndex];
              this.from = from;
              this.to = chunkPos + chunk.to[this.rangeIndex];
              this.value = chunk.value[this.rangeIndex];
              this.setRangeIndex(this.rangeIndex + 1);
              if (this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint) break;
            }
          }
        }

        setRangeIndex(index) {
          if (index == this.layer.chunk[this.chunkIndex].value.length) {
            this.chunkIndex++;

            if (this.skip) {
              while (this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex])) {
                this.chunkIndex++;
              }
            }

            this.rangeIndex = 0;
          } else {
            this.rangeIndex = index;
          }
        }

        nextChunk() {
          this.chunkIndex++;
          this.rangeIndex = 0;
          this.next();
        }

        compare(other) {
          return this.from - other.from || this.startSide - other.startSide || this.rank - other.rank || this.to - other.to || this.endSide - other.endSide;
        }

      };
      HeapCursor = class {
        constructor(heap) {
          this.heap = heap;
        }

        static from(sets) {
          var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          var minPoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
          var heap = [];

          for (var _i50 = 0; _i50 < sets.length; _i50++) {
            for (var cur2 = sets[_i50]; !cur2.isEmpty; cur2 = cur2.nextLayer) {
              if (cur2.maxPoint >= minPoint) heap.push(new LayerCursor(cur2, skip, minPoint, _i50));
            }
          }

          return heap.length == 1 ? heap[0] : new HeapCursor(heap);
        }

        get startSide() {
          return this.value ? this.value.startSide : 0;
        }

        goto(pos) {
          var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1e9;

          var _iterator31 = _createForOfIteratorHelper(this.heap),
              _step31;

          try {
            for (_iterator31.s(); !(_step31 = _iterator31.n()).done;) {
              var cur2 = _step31.value;
              cur2.goto(pos, side);
            }
          } catch (err) {
            _iterator31.e(err);
          } finally {
            _iterator31.f();
          }

          for (var _i51 = this.heap.length >> 1; _i51 >= 0; _i51--) {
            heapBubble(this.heap, _i51);
          }

          this.next();
          return this;
        }

        forward(pos, side) {
          var _iterator32 = _createForOfIteratorHelper(this.heap),
              _step32;

          try {
            for (_iterator32.s(); !(_step32 = _iterator32.n()).done;) {
              var cur2 = _step32.value;
              cur2.forward(pos, side);
            }
          } catch (err) {
            _iterator32.e(err);
          } finally {
            _iterator32.f();
          }

          for (var _i52 = this.heap.length >> 1; _i52 >= 0; _i52--) {
            heapBubble(this.heap, _i52);
          }

          if ((this.to - pos || this.value.endSide - side) < 0) this.next();
        }

        next() {
          if (this.heap.length == 0) {
            this.from = this.to = 1e9;
            this.value = null;
            this.rank = -1;
          } else {
            var top2 = this.heap[0];
            this.from = top2.from;
            this.to = top2.to;
            this.value = top2.value;
            this.rank = top2.rank;
            if (top2.value) top2.next();
            heapBubble(this.heap, 0);
          }
        }

      };
      SpanCursor = class {
        constructor(sets, skip, minPoint) {
          this.minPoint = minPoint;
          this.active = [];
          this.activeTo = [];
          this.activeRank = [];
          this.minActive = -1;
          this.point = null;
          this.pointFrom = 0;
          this.pointRank = 0;
          this.to = -1e9;
          this.endSide = 0;
          this.openStart = -1;
          this.cursor = HeapCursor.from(sets, skip, minPoint);
        }

        goto(pos) {
          var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1e9;
          this.cursor.goto(pos, side);
          this.active.length = this.activeTo.length = this.activeRank.length = 0;
          this.minActive = -1;
          this.to = pos;
          this.endSide = side;
          this.openStart = -1;
          this.next();
          return this;
        }

        forward(pos, side) {
          while (this.minActive > -1 && (this.activeTo[this.minActive] - pos || this.active[this.minActive].endSide - side) < 0) {
            this.removeActive(this.minActive);
          }

          this.cursor.forward(pos, side);
        }

        removeActive(index) {
          remove(this.active, index);
          remove(this.activeTo, index);
          remove(this.activeRank, index);
          this.minActive = findMinIndex(this.active, this.activeTo);
        }

        addActive(trackOpen) {
          var i = 0,
              _this$cursor = this.cursor,
              value = _this$cursor.value,
              to = _this$cursor.to,
              rank = _this$cursor.rank;

          while (i < this.activeRank.length && this.activeRank[i] <= rank) {
            i++;
          }

          insert(this.active, i, value);
          insert(this.activeTo, i, to);
          insert(this.activeRank, i, rank);
          if (trackOpen) insert(trackOpen, i, this.cursor.from);
          this.minActive = findMinIndex(this.active, this.activeTo);
        }

        next() {
          var from = this.to,
              wasPoint = this.point;
          this.point = null;
          var trackOpen = this.openStart < 0 ? [] : null,
              trackExtra = 0;

          for (;;) {
            var a = this.minActive;

            if (a > -1 && (this.activeTo[a] - this.cursor.from || this.active[a].endSide - this.cursor.startSide) < 0) {
              if (this.activeTo[a] > from) {
                this.to = this.activeTo[a];
                this.endSide = this.active[a].endSide;
                break;
              }

              this.removeActive(a);
              if (trackOpen) remove(trackOpen, a);
            } else if (!this.cursor.value) {
              this.to = this.endSide = 1e9;
              break;
            } else if (this.cursor.from > from) {
              this.to = this.cursor.from;
              this.endSide = this.cursor.startSide;
              break;
            } else {
              var nextVal = this.cursor.value;

              if (!nextVal.point) {
                this.addActive(trackOpen);
                this.cursor.next();
              } else if (wasPoint && this.cursor.to == this.to && this.cursor.from < this.cursor.to) {
                this.cursor.next();
              } else {
                this.point = nextVal;
                this.pointFrom = this.cursor.from;
                this.pointRank = this.cursor.rank;
                this.to = this.cursor.to;
                this.endSide = nextVal.endSide;
                if (this.cursor.from < from) trackExtra = 1;
                this.cursor.next();
                this.forward(this.to, this.endSide);
                break;
              }
            }
          }

          if (trackOpen) {
            var openStart = 0;

            while (openStart < trackOpen.length && trackOpen[openStart] < from) {
              openStart++;
            }

            this.openStart = openStart + trackExtra;
          }
        }

        activeForPoint(to) {
          if (!this.active.length) return this.active;
          var active = [];

          for (var _i53 = this.active.length - 1; _i53 >= 0; _i53--) {
            if (this.activeRank[_i53] < this.pointRank) break;
            if (this.activeTo[_i53] > to || this.activeTo[_i53] == to && this.active[_i53].endSide >= this.point.endSide) active.push(this.active[_i53]);
          }

          return active.reverse();
        }

        openEnd(to) {
          var open = 0;

          for (var _i54 = this.activeTo.length - 1; _i54 >= 0 && this.activeTo[_i54] > to; _i54--) {
            open++;
          }

          return open;
        }

      };
    }

  }); // node_modules/style-mod/src/style-mod.js


  var C, COUNT, SET, top, StyleModule, adoptedSet, StyleSet;

  var init_style_mod = __esm({
    "node_modules/style-mod/src/style-mod.js"() {
      C = "\u037C";
      COUNT = typeof Symbol == "undefined" ? "__" + C : Symbol.for(C);
      SET = typeof Symbol == "undefined" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet");
      top = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : {};
      StyleModule = class {
        constructor(spec, options) {
          this.rules = [];

          var _ref3 = options || {},
              finish = _ref3.finish;

          function splitSelector(selector) {
            return /^@/.test(selector) ? [selector] : selector.split(/,\s*/);
          }

          function render(selectors, spec2, target, isKeyframes) {
            var local = [],
                isAt = /^@(\w+)\b/.exec(selectors[0]),
                keyframes = isAt && isAt[1] == "keyframes";
            if (isAt && spec2 == null) return target.push(selectors[0] + ";");

            for (var prop in spec2) {
              var value = spec2[prop];

              if (/&/.test(prop)) {
                render(prop.split(/,\s*/).map(part => selectors.map(sel => part.replace(/&/, sel))).reduce((a, b) => a.concat(b)), value, target);
              } else if (value && typeof value == "object") {
                if (!isAt) throw new RangeError("The value of a property (" + prop + ") should be a primitive value.");
                render(splitSelector(prop), value, local, keyframes);
              } else if (value != null) {
                local.push(prop.replace(/_.*/, "").replace(/[A-Z]/g, l => "-" + l.toLowerCase()) + ": " + value + ";");
              }
            }

            if (local.length || keyframes) {
              target.push((finish && !isAt && !isKeyframes ? selectors.map(finish) : selectors).join(", ") + " {" + local.join(" ") + "}");
            }
          }

          for (var prop in spec) {
            render(splitSelector(prop), spec[prop], this.rules);
          }
        }

        getRules() {
          return this.rules.join("\n");
        }

        static newName() {
          var id = top[COUNT] || 1;
          top[COUNT] = id + 1;
          return C + id.toString(36);
        }

        static mount(root, modules) {
          (root[SET] || new StyleSet(root)).mount(Array.isArray(modules) ? modules : [modules]);
        }

      };
      adoptedSet = null;
      StyleSet = class {
        constructor(root) {
          if (!root.head && root.adoptedStyleSheets && typeof CSSStyleSheet != "undefined") {
            if (adoptedSet) {
              root.adoptedStyleSheets = [adoptedSet.sheet].concat(root.adoptedStyleSheets);
              return root[SET] = adoptedSet;
            }

            this.sheet = new CSSStyleSheet();
            root.adoptedStyleSheets = [this.sheet].concat(root.adoptedStyleSheets);
            adoptedSet = this;
          } else {
            this.styleTag = (root.ownerDocument || root).createElement("style");
            var target = root.head || root;
            target.insertBefore(this.styleTag, target.firstChild);
          }

          this.modules = [];
          root[SET] = this;
        }

        mount(modules) {
          var sheet = this.sheet;
          var pos = 0,
              j = 0;

          for (var _i55 = 0; _i55 < modules.length; _i55++) {
            var mod = modules[_i55],
                index = this.modules.indexOf(mod);

            if (index < j && index > -1) {
              this.modules.splice(index, 1);
              j--;
              index = -1;
            }

            if (index == -1) {
              this.modules.splice(j++, 0, mod);
              if (sheet) for (var k = 0; k < mod.rules.length; k++) {
                sheet.insertRule(mod.rules[k], pos++);
              }
            } else {
              while (j < index) {
                pos += this.modules[j++].rules.length;
              }

              pos += mod.rules.length;
              j++;
            }
          }

          if (!sheet) {
            var text = "";

            for (var _i56 = 0; _i56 < this.modules.length; _i56++) {
              text += this.modules[_i56].getRules() + "\n";
            }

            this.styleTag.textContent = text;
          }
        }

      };
    }

  }); // node_modules/w3c-keyname/index.es.js


  function keyName(event) {
    var ignoreKey = brokenModifierNames && (event.ctrlKey || event.altKey || event.metaKey) || (safari || ie) && event.shiftKey && event.key && event.key.length == 1;
    var name2 = !ignoreKey && event.key || (event.shiftKey ? shift : base)[event.keyCode] || event.key || "Unidentified";
    if (name2 == "Esc") name2 = "Escape";
    if (name2 == "Del") name2 = "Delete";
    if (name2 == "Left") name2 = "ArrowLeft";
    if (name2 == "Up") name2 = "ArrowUp";
    if (name2 == "Right") name2 = "ArrowRight";
    if (name2 == "Down") name2 = "ArrowDown";
    return name2;
  }

  var base, shift, chrome, safari, gecko, mac, ie, brokenModifierNames, i, i, i, code;

  var init_index_es = __esm({
    "node_modules/w3c-keyname/index.es.js"() {
      base = {
        8: "Backspace",
        9: "Tab",
        10: "Enter",
        12: "NumLock",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        44: "PrintScreen",
        45: "Insert",
        46: "Delete",
        59: ";",
        61: "=",
        91: "Meta",
        92: "Meta",
        106: "*",
        107: "+",
        108: ",",
        109: "-",
        110: ".",
        111: "/",
        144: "NumLock",
        145: "ScrollLock",
        160: "Shift",
        161: "Shift",
        162: "Control",
        163: "Control",
        164: "Alt",
        165: "Alt",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'",
        229: "q"
      };
      shift = {
        48: ")",
        49: "!",
        50: "@",
        51: "#",
        52: "$",
        53: "%",
        54: "^",
        55: "&",
        56: "*",
        57: "(",
        59: ":",
        61: "+",
        173: "_",
        186: ":",
        187: "+",
        188: "<",
        189: "_",
        190: ">",
        191: "?",
        192: "~",
        219: "{",
        220: "|",
        221: "}",
        222: '"',
        229: "Q"
      };
      chrome = typeof navigator != "undefined" && /Chrome\/(\d+)/.exec(navigator.userAgent);
      safari = typeof navigator != "undefined" && /Apple Computer/.test(navigator.vendor);
      gecko = typeof navigator != "undefined" && /Gecko\/\d+/.test(navigator.userAgent);
      mac = typeof navigator != "undefined" && /Mac/.test(navigator.platform);
      ie = typeof navigator != "undefined" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
      brokenModifierNames = chrome && (mac || +chrome[1] < 57) || gecko && mac;

      for (i = 0; i < 10; i++) {
        base[48 + i] = base[96 + i] = String(i);
      }

      for (i = 1; i <= 24; i++) {
        base[i + 111] = "F" + i;
      }

      for (i = 65; i <= 90; i++) {
        base[i] = String.fromCharCode(i + 32);
        shift[i] = String.fromCharCode(i);
      }

      for (code in base) {
        if (!shift.hasOwnProperty(code)) shift[code] = base[code];
      }
    }

  }); // node_modules/@codemirror/view/dist/index.js


  function getSelection(root) {
    var target;

    if (root.nodeType == 11) {
      target = root.getSelection ? root : root.ownerDocument;
    } else {
      target = root;
    }

    return target.getSelection();
  }

  function contains(dom, node) {
    return node ? dom == node || dom.contains(node.nodeType != 1 ? node.parentNode : node) : false;
  }

  function deepActiveElement() {
    var elt = document.activeElement;

    while (elt && elt.shadowRoot) {
      elt = elt.shadowRoot.activeElement;
    }

    return elt;
  }

  function hasSelection(dom, selection) {
    if (!selection.anchorNode) return false;

    try {
      return contains(dom, selection.anchorNode);
    } catch (_) {
      return false;
    }
  }

  function clientRectsFor(dom) {
    if (dom.nodeType == 3) return textRange(dom, 0, dom.nodeValue.length).getClientRects();else if (dom.nodeType == 1) return dom.getClientRects();else return [];
  }

  function isEquivalentPosition(node, off, targetNode, targetOff) {
    return targetNode ? scanFor(node, off, targetNode, targetOff, -1) || scanFor(node, off, targetNode, targetOff, 1) : false;
  }

  function domIndex(node) {
    for (var index = 0;; index++) {
      node = node.previousSibling;
      if (!node) return index;
    }
  }

  function scanFor(node, off, targetNode, targetOff, dir) {
    for (;;) {
      if (node == targetNode && off == targetOff) return true;

      if (off == (dir < 0 ? 0 : maxOffset(node))) {
        if (node.nodeName == "DIV") return false;
        var parent = node.parentNode;
        if (!parent || parent.nodeType != 1) return false;
        off = domIndex(node) + (dir < 0 ? 0 : 1);
        node = parent;
      } else if (node.nodeType == 1) {
        node = node.childNodes[off + (dir < 0 ? -1 : 0)];
        if (node.nodeType == 1 && node.contentEditable == "false") return false;
        off = dir < 0 ? maxOffset(node) : 0;
      } else {
        return false;
      }
    }
  }

  function maxOffset(node) {
    return node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length;
  }

  function flattenRect(rect, left) {
    var x = left ? rect.left : rect.right;
    return {
      left: x,
      right: x,
      top: rect.top,
      bottom: rect.bottom
    };
  }

  function windowRect(win) {
    return {
      left: 0,
      right: win.innerWidth,
      top: 0,
      bottom: win.innerHeight
    };
  }

  function scrollRectIntoView(dom, rect, side, x, y, xMargin, yMargin, ltr) {
    var doc2 = dom.ownerDocument,
        win = doc2.defaultView;

    for (var cur2 = dom; cur2;) {
      if (cur2.nodeType == 1) {
        var bounding = void 0,
            top2 = cur2 == doc2.body;

        if (top2) {
          bounding = windowRect(win);
        } else {
          if (cur2.scrollHeight <= cur2.clientHeight && cur2.scrollWidth <= cur2.clientWidth) {
            cur2 = cur2.parentNode;
            continue;
          }

          var rect2 = cur2.getBoundingClientRect();
          bounding = {
            left: rect2.left,
            right: rect2.left + cur2.clientWidth,
            top: rect2.top,
            bottom: rect2.top + cur2.clientHeight
          };
        }

        var moveX = 0,
            moveY = 0;

        if (y == "nearest") {
          if (rect.top < bounding.top) {
            moveY = -(bounding.top - rect.top + yMargin);
            if (side > 0 && rect.bottom > bounding.bottom + moveY) moveY = rect.bottom - bounding.bottom + moveY + yMargin;
          } else if (rect.bottom > bounding.bottom) {
            moveY = rect.bottom - bounding.bottom + yMargin;
            if (side < 0 && rect.top - moveY < bounding.top) moveY = -(bounding.top + moveY - rect.top + yMargin);
          }
        } else {
          var rectHeight = rect.bottom - rect.top,
              boundingHeight = bounding.bottom - bounding.top;
          var targetTop = y == "center" && rectHeight <= boundingHeight ? rect.top + rectHeight / 2 - boundingHeight / 2 : y == "start" || y == "center" && side < 0 ? rect.top - yMargin : rect.bottom - boundingHeight + yMargin;
          moveY = targetTop - bounding.top;
        }

        if (x == "nearest") {
          if (rect.left < bounding.left) {
            moveX = -(bounding.left - rect.left + xMargin);
            if (side > 0 && rect.right > bounding.right + moveX) moveX = rect.right - bounding.right + moveX + xMargin;
          } else if (rect.right > bounding.right) {
            moveX = rect.right - bounding.right + xMargin;
            if (side < 0 && rect.left < bounding.left + moveX) moveX = -(bounding.left + moveX - rect.left + xMargin);
          }
        } else {
          var targetLeft = x == "center" ? rect.left + (rect.right - rect.left) / 2 - (bounding.right - bounding.left) / 2 : x == "start" == ltr ? rect.left - xMargin : rect.right - (bounding.right - bounding.left) + xMargin;
          moveX = targetLeft - bounding.left;
        }

        if (moveX || moveY) {
          if (top2) {
            win.scrollBy(moveX, moveY);
          } else {
            if (moveY) {
              var start = cur2.scrollTop;
              cur2.scrollTop += moveY;
              moveY = cur2.scrollTop - start;
            }

            if (moveX) {
              var _start2 = cur2.scrollLeft;
              cur2.scrollLeft += moveX;
              moveX = cur2.scrollLeft - _start2;
            }

            rect = {
              left: rect.left - moveX,
              top: rect.top - moveY,
              right: rect.right - moveX,
              bottom: rect.bottom - moveY
            };
          }
        }

        if (top2) break;
        cur2 = cur2.assignedSlot || cur2.parentNode;
        x = y = "nearest";
      } else if (cur2.nodeType == 11) {
        cur2 = cur2.host;
      } else {
        break;
      }
    }
  }

  function focusPreventScroll(dom) {
    if (dom.setActive) return dom.setActive();
    if (preventScrollSupported) return dom.focus(preventScrollSupported);
    var stack = [];

    for (var cur2 = dom; cur2; cur2 = cur2.parentNode) {
      stack.push(cur2, cur2.scrollTop, cur2.scrollLeft);
      if (cur2 == cur2.ownerDocument) break;
    }

    dom.focus(preventScrollSupported == null ? {
      get preventScroll() {
        preventScrollSupported = {
          preventScroll: true
        };
        return true;
      }

    } : void 0);

    if (!preventScrollSupported) {
      preventScrollSupported = false;

      for (var _i57 = 0; _i57 < stack.length;) {
        var elt = stack[_i57++],
            top2 = stack[_i57++],
            left = stack[_i57++];
        if (elt.scrollTop != top2) elt.scrollTop = top2;
        if (elt.scrollLeft != left) elt.scrollLeft = left;
      }
    }
  }

  function textRange(node, from) {
    var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : from;
    var range = scratchRange || (scratchRange = document.createRange());
    range.setEnd(node, to);
    range.setStart(node, from);
    return range;
  }

  function dispatchKey(elt, name2, code) {
    var options = {
      key: name2,
      code: name2,
      keyCode: code,
      which: code,
      cancelable: true
    };
    var down = new KeyboardEvent("keydown", options);
    down.synthetic = true;
    elt.dispatchEvent(down);
    var up = new KeyboardEvent("keyup", options);
    up.synthetic = true;
    elt.dispatchEvent(up);
    return down.defaultPrevented || up.defaultPrevented;
  }

  function getRoot(node) {
    while (node) {
      if (node && (node.nodeType == 9 || node.nodeType == 11 && node.host)) return node;
      node = node.assignedSlot || node.parentNode;
    }

    return null;
  }

  function clearAttributes(node) {
    while (node.attributes.length) {
      node.removeAttributeNode(node.attributes[0]);
    }
  }

  function rm$1(dom) {
    var next = dom.nextSibling;
    dom.parentNode.removeChild(dom);
    return next;
  }

  function replaceRange(parent, fromI, fromOff, toI, toOff, insert2, breakAtStart, openStart, openEnd) {
    var children = parent.children;
    var before = children.length ? children[fromI] : null;
    var last = insert2.length ? insert2[insert2.length - 1] : null;
    var breakAtEnd = last ? last.breakAfter : breakAtStart;
    if (fromI == toI && before && !breakAtStart && !breakAtEnd && insert2.length < 2 && before.merge(fromOff, toOff, insert2.length ? last : null, fromOff == 0, openStart, openEnd)) return;

    if (toI < children.length) {
      var after = children[toI];

      if (after && toOff < after.length) {
        if (fromI == toI) {
          after = after.split(toOff);
          toOff = 0;
        }

        if (!breakAtEnd && last && after.merge(0, toOff, last, true, 0, openEnd)) {
          insert2[insert2.length - 1] = after;
        } else {
          if (toOff) after.merge(0, toOff, null, false, 0, openEnd);
          insert2.push(after);
        }
      } else if (after === null || after === void 0 ? void 0 : after.breakAfter) {
        if (last) last.breakAfter = 1;else breakAtStart = 1;
      }

      toI++;
    }

    if (before) {
      before.breakAfter = breakAtStart;

      if (fromOff > 0) {
        if (!breakAtStart && insert2.length && before.merge(fromOff, before.length, insert2[0], false, openStart, 0)) {
          before.breakAfter = insert2.shift().breakAfter;
        } else if (fromOff < before.length || before.children.length && before.children[before.children.length - 1].length == 0) {
          before.merge(fromOff, before.length, null, false, openStart, 0);
        }

        fromI++;
      }
    }

    while (fromI < toI && insert2.length) {
      if (children[toI - 1].become(insert2[insert2.length - 1])) {
        toI--;
        insert2.pop();
        openEnd = insert2.length ? 0 : openStart;
      } else if (children[fromI].become(insert2[0])) {
        fromI++;
        insert2.shift();
        openStart = insert2.length ? 0 : openEnd;
      } else {
        break;
      }
    }

    if (!insert2.length && fromI && toI < children.length && !children[fromI - 1].breakAfter && children[toI].merge(0, 0, children[fromI - 1], false, openStart, openEnd)) fromI--;
    if (fromI < toI || insert2.length) parent.replaceChildren(fromI, toI, insert2);
  }

  function mergeChildrenInto(parent, from, to, insert2, openStart, openEnd) {
    var cur2 = parent.childCursor();

    var _cur2$findPos = cur2.findPos(to, 1),
        toI = _cur2$findPos.i,
        toOff = _cur2$findPos.off;

    var _cur2$findPos2 = cur2.findPos(from, -1),
        fromI = _cur2$findPos2.i,
        fromOff = _cur2$findPos2.off;

    var dLen = from - to;

    var _iterator33 = _createForOfIteratorHelper(insert2),
        _step33;

    try {
      for (_iterator33.s(); !(_step33 = _iterator33.n()).done;) {
        var view = _step33.value;
        dLen += view.length;
      }
    } catch (err) {
      _iterator33.e(err);
    } finally {
      _iterator33.f();
    }

    parent.length += dLen;
    replaceRange(parent, fromI, fromOff, toI, toOff, insert2, 0, openStart, openEnd);
  }

  function textCoords(text, pos, side) {
    var length = text.nodeValue.length;
    if (pos > length) pos = length;
    var from = pos,
        to = pos,
        flatten2 = 0;

    if (pos == 0 && side < 0 || pos == length && side >= 0) {
      if (!(browser.chrome || browser.gecko)) {
        if (pos) {
          from--;
          flatten2 = 1;
        } else if (to < length) {
          to++;
          flatten2 = -1;
        }
      }
    } else {
      if (side < 0) from--;else if (to < length) to++;
    }

    var rects = textRange(text, from, to).getClientRects();
    if (!rects.length) return Rect0;
    var rect = rects[(flatten2 ? flatten2 < 0 : side >= 0) ? 0 : rects.length - 1];
    if (browser.safari && !flatten2 && rect.width == 0) rect = Array.prototype.find.call(rects, r => r.width) || rect;
    return flatten2 ? flattenRect(rect, flatten2 < 0) : rect || null;
  }

  function scanCompositionTree(pos, side, view, text, enterView, fromText) {
    if (view instanceof MarkView) {
      var _iterator34 = _createForOfIteratorHelper(view.children),
          _step34;

      try {
        for (_iterator34.s(); !(_step34 = _iterator34.n()).done;) {
          var child = _step34.value;
          var hasComp = contains(child.dom, text);
          var len = hasComp ? text.nodeValue.length : child.length;
          if (pos < len || pos == len && child.getSide() <= 0) return hasComp ? scanCompositionTree(pos, side, child, text, enterView, fromText) : enterView(child, pos, side);
          pos -= len;
        }
      } catch (err) {
        _iterator34.e(err);
      } finally {
        _iterator34.f();
      }

      return enterView(view, view.length, -1);
    } else if (view.dom == text) {
      return fromText(pos, side);
    } else {
      return enterView(view, pos, side);
    }
  }

  function posFromDOMInCompositionTree(node, offset, view, text) {
    if (view instanceof MarkView) {
      var _iterator35 = _createForOfIteratorHelper(view.children),
          _step35;

      try {
        for (_iterator35.s(); !(_step35 = _iterator35.n()).done;) {
          var child = _step35.value;
          var pos = 0,
              hasComp = contains(child.dom, text);
          if (contains(child.dom, node)) return pos + (hasComp ? posFromDOMInCompositionTree(node, offset, child, text) : child.localPosFromDOM(node, offset));
          pos += hasComp ? text.nodeValue.length : child.length;
        }
      } catch (err) {
        _iterator35.e(err);
      } finally {
        _iterator35.f();
      }
    } else if (view.dom == text) {
      return Math.min(offset, text.nodeValue.length);
    }

    return view.localPosFromDOM(node, offset);
  }

  function inlineSiblingRect(view, side) {
    var parent = view.parent,
        index = parent ? parent.children.indexOf(view) : -1;

    while (parent && index >= 0) {
      if (side < 0 ? index > 0 : index < parent.children.length) {
        var next = parent.children[index + side];

        if (next instanceof TextView) {
          var nextRect = next.coordsAt(side < 0 ? next.length : 0, side);
          if (nextRect) return nextRect;
        }

        index += side;
      } else if (parent instanceof MarkView && parent.parent) {
        index = parent.parent.children.indexOf(parent) + (side < 0 ? 0 : 1);
        parent = parent.parent;
      } else {
        var last = parent.dom.lastChild;
        if (last && last.nodeName == "BR") return last.getClientRects()[0];
        break;
      }
    }

    return void 0;
  }

  function inlineDOMAtPos(dom, children, pos) {
    var i = 0;

    for (var off = 0; i < children.length; i++) {
      var child = children[i],
          end = off + child.length;
      if (end == off && child.getSide() <= 0) continue;
      if (pos > off && pos < end && child.dom.parentNode == dom) return child.domAtPos(pos - off);
      if (pos <= off) break;
      off = end;
    }

    for (; i > 0; i--) {
      var before = children[i - 1].dom;
      if (before.parentNode == dom) return DOMPos.after(before);
    }

    return new DOMPos(dom, 0);
  }

  function joinInlineInto(parent, view, open) {
    var last,
        children = parent.children;

    if (open > 0 && view instanceof MarkView && children.length && (last = children[children.length - 1]) instanceof MarkView && last.mark.eq(view.mark)) {
      joinInlineInto(last, view.children[0], open - 1);
    } else {
      children.push(view);
      view.setParent(parent);
    }

    parent.length += view.length;
  }

  function coordsInChildren(view, pos, side) {
    for (var off = 0, _i58 = 0; _i58 < view.children.length; _i58++) {
      var child = view.children[_i58],
          end = off + child.length,
          next = void 0;

      if ((side <= 0 || end == view.length || child.getSide() > 0 ? end >= pos : end > pos) && (pos < end || _i58 + 1 == view.children.length || (next = view.children[_i58 + 1]).length || next.getSide() > 0)) {
        var flatten2 = 0;

        if (end == off) {
          if (child.getSide() <= 0) continue;
          flatten2 = side = -child.getSide();
        }

        var rect = child.coordsAt(Math.max(0, pos - off), side);
        return flatten2 && rect ? flattenRect(rect, side < 0) : rect;
      }

      off = end;
    }

    var last = view.dom.lastChild;
    if (!last) return view.dom.getBoundingClientRect();
    var rects = clientRectsFor(last);
    return rects[rects.length - 1] || null;
  }

  function combineAttrs(source, target) {
    for (var name2 in source) {
      if (name2 == "class" && target.class) target.class += " " + source.class;else if (name2 == "style" && target.style) target.style += ";" + source.style;else target[name2] = source[name2];
    }

    return target;
  }

  function attrsEq(a, b) {
    if (a == b) return true;
    if (!a || !b) return false;
    var keysA = Object.keys(a),
        keysB = Object.keys(b);
    if (keysA.length != keysB.length) return false;

    for (var _i59 = 0, _keysA = keysA; _i59 < _keysA.length; _i59++) {
      var key = _keysA[_i59];
      if (keysB.indexOf(key) == -1 || a[key] !== b[key]) return false;
    }

    return true;
  }

  function updateAttrs(dom, prev, attrs) {
    var changed = null;

    if (prev) {
      for (var name2 in prev) {
        if (!(attrs && name2 in attrs)) dom.removeAttribute(changed = name2);
      }
    }

    if (attrs) {
      for (var _name in attrs) {
        if (!(prev && prev[_name] == attrs[_name])) dom.setAttribute(changed = _name, attrs[_name]);
      }
    }

    return !!changed;
  }

  function getInclusive(spec) {
    var block = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var start = spec.inclusiveStart,
        end = spec.inclusiveEnd;
    if (start == null) start = spec.inclusive;
    if (end == null) end = spec.inclusive;
    return {
      start: start !== null && start !== void 0 ? start : block,
      end: end !== null && end !== void 0 ? end : block
    };
  }

  function widgetsEq(a, b) {
    return a == b || !!(a && b && a.compare(b));
  }

  function addRange(from, to, ranges) {
    var margin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var last = ranges.length - 1;
    if (last >= 0 && ranges[last] + margin >= from) ranges[last] = Math.max(ranges[last], to);else ranges.push(from, to);
  }

  function wrapMarks(view, active) {
    var _iterator36 = _createForOfIteratorHelper(active),
        _step36;

    try {
      for (_iterator36.s(); !(_step36 = _iterator36.n()).done;) {
        var mark = _step36.value;
        view = new MarkView(mark, [view], view.length);
      }
    } catch (err) {
      _iterator36.e(err);
    } finally {
      _iterator36.f();
    }

    return view;
  }

  function logException(state, exception, context) {
    var handler = state.facet(exceptionSink);
    if (handler.length) handler[0](exception);else if (window.onerror) window.onerror(String(exception), context, void 0, void 0, exception);else if (context) console.error(context + ":", exception);else console.error(exception);
  }

  function dec(str) {
    var result = [];

    for (var _i60 = 0; _i60 < str.length; _i60++) {
      result.push(1 << +str[_i60]);
    }

    return result;
  }

  function charType(ch) {
    return ch <= 247 ? LowTypes[ch] : 1424 <= ch && ch <= 1524 ? 2 : 1536 <= ch && ch <= 1785 ? ArabicTypes[ch - 1536] : 1774 <= ch && ch <= 2220 ? 4 : 8192 <= ch && ch <= 8203 ? 256 : ch == 8204 ? 256 : 1;
  }

  function computeOrder(line, direction) {
    var len = line.length,
        outerType = direction == LTR ? 1 : 2,
        oppositeType = direction == LTR ? 2 : 1;
    if (!line || outerType == 1 && !BidiRE.test(line)) return trivialOrder(len);

    for (var _i61 = 0, prev = outerType, prevStrong = outerType; _i61 < len; _i61++) {
      var type = charType(line.charCodeAt(_i61));
      if (type == 512) type = prev;else if (type == 8 && prevStrong == 4) type = 16;
      types[_i61] = type == 4 ? 2 : type;
      if (type & 7) prevStrong = type;
      prev = type;
    }

    for (var _i62 = 0, _prev = outerType, _prevStrong = outerType; _i62 < len; _i62++) {
      var _type2 = types[_i62];

      if (_type2 == 128) {
        if (_i62 < len - 1 && _prev == types[_i62 + 1] && _prev & 24) _type2 = types[_i62] = _prev;else types[_i62] = 256;
      } else if (_type2 == 64) {
        var end = _i62 + 1;

        while (end < len && types[end] == 64) {
          end++;
        }

        var replace = _i62 && _prev == 8 || end < len && types[end] == 8 ? _prevStrong == 1 ? 1 : 8 : 256;

        for (var j = _i62; j < end; j++) {
          types[j] = replace;
        }

        _i62 = end - 1;
      } else if (_type2 == 8 && _prevStrong == 1) {
        types[_i62] = 1;
      }

      _prev = _type2;
      if (_type2 & 7) _prevStrong = _type2;
    }

    for (var _i63 = 0, sI = 0, context = 0, ch, br, _type3; _i63 < len; _i63++) {
      if (br = Brackets[ch = line.charCodeAt(_i63)]) {
        if (br < 0) {
          for (var sJ = sI - 3; sJ >= 0; sJ -= 3) {
            if (BracketStack[sJ + 1] == -br) {
              var flags = BracketStack[sJ + 2];
              var type2 = flags & 2 ? outerType : !(flags & 4) ? 0 : flags & 1 ? oppositeType : outerType;
              if (type2) types[_i63] = types[BracketStack[sJ]] = type2;
              sI = sJ;
              break;
            }
          }
        } else if (BracketStack.length == 189) {
          break;
        } else {
          BracketStack[sI++] = _i63;
          BracketStack[sI++] = ch;
          BracketStack[sI++] = context;
        }
      } else if ((_type3 = types[_i63]) == 2 || _type3 == 1) {
        var embed = _type3 == outerType;
        context = embed ? 0 : 1;

        for (var _sJ = sI - 3; _sJ >= 0; _sJ -= 3) {
          var cur2 = BracketStack[_sJ + 2];
          if (cur2 & 2) break;

          if (embed) {
            BracketStack[_sJ + 2] |= 2;
          } else {
            if (cur2 & 4) break;
            BracketStack[_sJ + 2] |= 4;
          }
        }
      }
    }

    for (var _i64 = 0; _i64 < len; _i64++) {
      if (types[_i64] == 256) {
        var _end2 = _i64 + 1;

        while (_end2 < len && types[_end2] == 256) {
          _end2++;
        }

        var beforeL = (_i64 ? types[_i64 - 1] : outerType) == 1;
        var afterL = (_end2 < len ? types[_end2] : outerType) == 1;

        var _replace = beforeL == afterL ? beforeL ? 1 : 2 : outerType;

        for (var _j = _i64; _j < _end2; _j++) {
          types[_j] = _replace;
        }

        _i64 = _end2 - 1;
      }
    }

    var order = [];

    if (outerType == 1) {
      for (var _i65 = 0; _i65 < len;) {
        var start = _i65,
            rtl = types[_i65++] != 1;

        while (_i65 < len && rtl == (types[_i65] != 1)) {
          _i65++;
        }

        if (rtl) {
          for (var _j2 = _i65; _j2 > start;) {
            var _end3 = _j2,
                l = types[--_j2] != 2;

            while (_j2 > start && l == (types[_j2 - 1] != 2)) {
              _j2--;
            }

            order.push(new BidiSpan(_j2, _end3, l ? 2 : 1));
          }
        } else {
          order.push(new BidiSpan(start, _i65, 0));
        }
      }
    } else {
      for (var _i66 = 0; _i66 < len;) {
        var _start3 = _i66,
            _rtl = types[_i66++] == 2;

        while (_i66 < len && _rtl == (types[_i66] == 2)) {
          _i66++;
        }

        order.push(new BidiSpan(_start3, _i66, _rtl ? 1 : 2));
      }
    }

    return order;
  }

  function trivialOrder(length) {
    return [new BidiSpan(0, length, 0)];
  }

  function moveVisually(line, order, dir, start, forward) {
    var _a2;

    var startIndex = start.head - line.from,
        spanI = -1;

    if (startIndex == 0) {
      if (!forward || !line.length) return null;

      if (order[0].level != dir) {
        startIndex = order[0].side(false, dir);
        spanI = 0;
      }
    } else if (startIndex == line.length) {
      if (forward) return null;
      var last = order[order.length - 1];

      if (last.level != dir) {
        startIndex = last.side(true, dir);
        spanI = order.length - 1;
      }
    }

    if (spanI < 0) spanI = BidiSpan.find(order, startIndex, (_a2 = start.bidiLevel) !== null && _a2 !== void 0 ? _a2 : -1, start.assoc);
    var span = order[spanI];

    if (startIndex == span.side(forward, dir)) {
      span = order[spanI += forward ? 1 : -1];
      startIndex = span.side(!forward, dir);
    }

    var indexForward = forward == (span.dir == dir);
    var nextIndex = findClusterBreak(line.text, startIndex, indexForward);
    movedOver = line.text.slice(Math.min(startIndex, nextIndex), Math.max(startIndex, nextIndex));
    if (nextIndex != span.side(forward, dir)) return EditorSelection.cursor(nextIndex + line.from, indexForward ? -1 : 1, span.level);
    var nextSpan = spanI == (forward ? order.length - 1 : 0) ? null : order[spanI + (forward ? 1 : -1)];
    if (!nextSpan && span.level != dir) return EditorSelection.cursor(forward ? line.to : line.from, forward ? -1 : 1, dir);
    if (nextSpan && nextSpan.level < span.level) return EditorSelection.cursor(nextSpan.side(!forward, dir) + line.from, forward ? 1 : -1, nextSpan.level);
    return EditorSelection.cursor(nextIndex + line.from, forward ? -1 : 1, span.level);
  }

  function isBlockElement(node) {
    return node.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(node.nodeName);
  }

  function betweenUneditable(pos) {
    return pos.node.nodeType == 1 && pos.node.firstChild && (pos.offset == 0 || pos.node.childNodes[pos.offset - 1].contentEditable == "false") && (pos.offset == pos.node.childNodes.length || pos.node.childNodes[pos.offset].contentEditable == "false");
  }

  function compositionSurroundingNode(view) {
    var sel = view.observer.selectionRange;
    var textNode = sel.focusNode && nearbyTextNode(sel.focusNode, sel.focusOffset, 0);
    if (!textNode) return null;
    var cView = view.docView.nearest(textNode);
    if (!cView) return null;

    if (cView instanceof LineView) {
      var topNode = textNode;

      while (topNode.parentNode != cView.dom) {
        topNode = topNode.parentNode;
      }

      var prev = topNode.previousSibling;

      while (prev && !ContentView.get(prev)) {
        prev = prev.previousSibling;
      }

      var pos = prev ? ContentView.get(prev).posAtEnd : cView.posAtStart;
      return {
        from: pos,
        to: pos,
        node: topNode,
        text: textNode
      };
    } else {
      for (;;) {
        var _cView = cView,
            parent = _cView.parent;
        if (!parent) return null;
        if (parent instanceof LineView) break;
        cView = parent;
      }

      var from = cView.posAtStart;
      return {
        from,
        to: from + cView.length,
        node: cView.dom,
        text: textNode
      };
    }
  }

  function computeCompositionDeco(view, changes) {
    var surrounding = compositionSurroundingNode(view);
    if (!surrounding) return Decoration.none;
    var from = surrounding.from,
        to = surrounding.to,
        node = surrounding.node,
        textNode = surrounding.text;
    var newFrom = changes.mapPos(from, 1),
        newTo = Math.max(newFrom, changes.mapPos(to, -1));
    var state = view.state,
        text = node.nodeType == 3 ? node.nodeValue : new DOMReader([], state).readRange(node.firstChild, null).text;

    if (newTo - newFrom < text.length) {
      if (state.doc.sliceString(newFrom, Math.min(state.doc.length, newFrom + text.length), LineBreakPlaceholder) == text) newTo = newFrom + text.length;else if (state.doc.sliceString(Math.max(0, newTo - text.length), newTo, LineBreakPlaceholder) == text) newFrom = newTo - text.length;else return Decoration.none;
    } else if (state.doc.sliceString(newFrom, newTo, LineBreakPlaceholder) != text) {
      return Decoration.none;
    }

    var topView = ContentView.get(node);
    if (topView instanceof CompositionView) topView = topView.widget.topView;else if (topView) topView.parent = null;
    return Decoration.set(Decoration.replace({
      widget: new CompositionWidget(node, textNode, topView),
      inclusive: true
    }).range(newFrom, newTo));
  }

  function nearbyTextNode(node, offset, side) {
    for (;;) {
      if (node.nodeType == 3) return node;

      if (node.nodeType == 1 && offset > 0 && side <= 0) {
        node = node.childNodes[offset - 1];
        offset = maxOffset(node);
      } else if (node.nodeType == 1 && offset < node.childNodes.length && side >= 0) {
        node = node.childNodes[offset];
        offset = 0;
      } else {
        return null;
      }
    }
  }

  function nextToUneditable(node, offset) {
    if (node.nodeType != 1) return 0;
    return (offset && node.childNodes[offset - 1].contentEditable == "false" ? 1 : 0) | (offset < node.childNodes.length && node.childNodes[offset].contentEditable == "false" ? 2 : 0);
  }

  function findChangedDeco(a, b, diff) {
    var comp = new DecorationComparator$1();
    RangeSet.compare(a, b, diff, comp);
    return comp.changes;
  }

  function inUneditable(node, inside2) {
    for (var cur2 = node; cur2 && cur2 != inside2; cur2 = cur2.assignedSlot || cur2.parentNode) {
      if (cur2.nodeType == 1 && cur2.contentEditable == "false") {
        return true;
      }
    }

    return false;
  }

  function groupAt(state, pos) {
    var bias = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var categorize = state.charCategorizer(pos);
    var line = state.doc.lineAt(pos),
        linePos = pos - line.from;
    if (line.length == 0) return EditorSelection.cursor(pos);
    if (linePos == 0) bias = 1;else if (linePos == line.length) bias = -1;
    var from = linePos,
        to = linePos;
    if (bias < 0) from = findClusterBreak(line.text, linePos, false);else to = findClusterBreak(line.text, linePos);
    var cat = categorize(line.text.slice(from, to));

    while (from > 0) {
      var prev = findClusterBreak(line.text, from, false);
      if (categorize(line.text.slice(prev, from)) != cat) break;
      from = prev;
    }

    while (to < line.length) {
      var next = findClusterBreak(line.text, to);
      if (categorize(line.text.slice(to, next)) != cat) break;
      to = next;
    }

    return EditorSelection.range(from + line.from, to + line.from);
  }

  function getdx(x, rect) {
    return rect.left > x ? rect.left - x : Math.max(0, x - rect.right);
  }

  function getdy(y, rect) {
    return rect.top > y ? rect.top - y : Math.max(0, y - rect.bottom);
  }

  function yOverlap(a, b) {
    return a.top < b.bottom - 1 && a.bottom > b.top + 1;
  }

  function upTop(rect, top2) {
    return top2 < rect.top ? {
      top: top2,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom
    } : rect;
  }

  function upBot(rect, bottom) {
    return bottom > rect.bottom ? {
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom
    } : rect;
  }

  function domPosAtCoords(parent, x, y) {
    var closest, closestRect, closestX, closestY;
    var above, below, aboveRect, belowRect;

    for (var child = parent.firstChild; child; child = child.nextSibling) {
      var rects = clientRectsFor(child);

      for (var _i67 = 0; _i67 < rects.length; _i67++) {
        var rect = rects[_i67];
        if (closestRect && yOverlap(closestRect, rect)) rect = upTop(upBot(rect, closestRect.bottom), closestRect.top);
        var dx = getdx(x, rect),
            dy = getdy(y, rect);
        if (dx == 0 && dy == 0) return child.nodeType == 3 ? domPosInText(child, x, y) : domPosAtCoords(child, x, y);

        if (!closest || closestY > dy || closestY == dy && closestX > dx) {
          closest = child;
          closestRect = rect;
          closestX = dx;
          closestY = dy;
        }

        if (dx == 0) {
          if (y > rect.bottom && (!aboveRect || aboveRect.bottom < rect.bottom)) {
            above = child;
            aboveRect = rect;
          } else if (y < rect.top && (!belowRect || belowRect.top > rect.top)) {
            below = child;
            belowRect = rect;
          }
        } else if (aboveRect && yOverlap(aboveRect, rect)) {
          aboveRect = upBot(aboveRect, rect.bottom);
        } else if (belowRect && yOverlap(belowRect, rect)) {
          belowRect = upTop(belowRect, rect.top);
        }
      }
    }

    if (aboveRect && aboveRect.bottom >= y) {
      closest = above;
      closestRect = aboveRect;
    } else if (belowRect && belowRect.top <= y) {
      closest = below;
      closestRect = belowRect;
    }

    if (!closest) return {
      node: parent,
      offset: 0
    };
    var clipX = Math.max(closestRect.left, Math.min(closestRect.right, x));
    if (closest.nodeType == 3) return domPosInText(closest, clipX, y);
    if (!closestX && closest.contentEditable == "true") return domPosAtCoords(closest, clipX, y);
    var offset = Array.prototype.indexOf.call(parent.childNodes, closest) + (x >= (closestRect.left + closestRect.right) / 2 ? 1 : 0);
    return {
      node: parent,
      offset
    };
  }

  function domPosInText(node, x, y) {
    var len = node.nodeValue.length;
    var closestOffset = -1,
        closestDY = 1e9,
        generalSide = 0;

    for (var _i68 = 0; _i68 < len; _i68++) {
      var rects = textRange(node, _i68, _i68 + 1).getClientRects();

      for (var j = 0; j < rects.length; j++) {
        var rect = rects[j];
        if (rect.top == rect.bottom) continue;
        if (!generalSide) generalSide = x - rect.left;
        var dy = (rect.top > y ? rect.top - y : y - rect.bottom) - 1;

        if (rect.left - 1 <= x && rect.right + 1 >= x && dy < closestDY) {
          var right = x >= (rect.left + rect.right) / 2,
              after = right;

          if (browser.chrome || browser.gecko) {
            var rectBefore = textRange(node, _i68).getBoundingClientRect();
            if (rectBefore.left == rect.right) after = !right;
          }

          if (dy <= 0) return {
            node,
            offset: _i68 + (after ? 1 : 0)
          };
          closestOffset = _i68 + (after ? 1 : 0);
          closestDY = dy;
        }
      }
    }

    return {
      node,
      offset: closestOffset > -1 ? closestOffset : generalSide > 0 ? node.nodeValue.length : 0
    };
  }

  function posAtCoords(view, _ref4, precise) {
    var x = _ref4.x,
        y = _ref4.y;
    var bias = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;

    var _a2;

    var content2 = view.contentDOM.getBoundingClientRect(),
        docTop = content2.top + view.viewState.paddingTop;
    var block,
        docHeight = view.viewState.docHeight;
    var yOffset = y - docTop;
    if (yOffset < 0) return 0;
    if (yOffset > docHeight) return view.state.doc.length;

    for (var halfLine = view.defaultLineHeight / 2, bounced = false;;) {
      block = view.elementAtHeight(yOffset);
      if (block.type == BlockType.Text) break;

      for (;;) {
        yOffset = bias > 0 ? block.bottom + halfLine : block.top - halfLine;
        if (yOffset >= 0 && yOffset <= docHeight) break;
        if (bounced) return precise ? null : 0;
        bounced = true;
        bias = -bias;
      }
    }

    y = docTop + yOffset;
    var lineStart = block.from;
    if (lineStart < view.viewport.from) return view.viewport.from == 0 ? 0 : precise ? null : posAtCoordsImprecise(view, content2, block, x, y);
    if (lineStart > view.viewport.to) return view.viewport.to == view.state.doc.length ? view.state.doc.length : precise ? null : posAtCoordsImprecise(view, content2, block, x, y);
    var doc2 = view.dom.ownerDocument;
    var root = view.root.elementFromPoint ? view.root : doc2;
    var element = root.elementFromPoint(x, y);
    if (element && !view.contentDOM.contains(element)) element = null;

    if (!element) {
      x = Math.max(content2.left + 1, Math.min(content2.right - 1, x));
      element = root.elementFromPoint(x, y);
      if (element && !view.contentDOM.contains(element)) element = null;
    }

    var node,
        offset = -1;

    if (element && ((_a2 = view.docView.nearest(element)) === null || _a2 === void 0 ? void 0 : _a2.isEditable) != false) {
      if (doc2.caretPositionFromPoint) {
        var pos = doc2.caretPositionFromPoint(x, y);

        if (pos) {
          node = pos.offsetNode;
          offset = pos.offset;
        }
      } else if (doc2.caretRangeFromPoint) {
        var range = doc2.caretRangeFromPoint(x, y);

        if (range) {
          node = range.startContainer;
          offset = range.startOffset;
          if (browser.safari && isSuspiciousCaretResult(node, offset, x)) node = void 0;
        }
      }
    }

    if (!node || !view.docView.dom.contains(node)) {
      var line = LineView.find(view.docView, lineStart);
      if (!line) return yOffset > block.top + block.height / 2 ? block.to : block.from;

      var _domPosAtCoords = domPosAtCoords(line.dom, x, y);

      node = _domPosAtCoords.node;
      offset = _domPosAtCoords.offset;
    }

    return view.docView.posFromDOM(node, offset);
  }

  function posAtCoordsImprecise(view, contentRect, block, x, y) {
    var into = Math.round((x - contentRect.left) * view.defaultCharacterWidth);

    if (view.lineWrapping && block.height > view.defaultLineHeight * 1.5) {
      var line = Math.floor((y - block.top) / view.defaultLineHeight);
      into += line * view.viewState.heightOracle.lineLength;
    }

    var content2 = view.state.sliceDoc(block.from, block.to);
    return block.from + findColumn(content2, into, view.state.tabSize);
  }

  function isSuspiciousCaretResult(node, offset, x) {
    var len;
    if (node.nodeType != 3 || offset != (len = node.nodeValue.length)) return false;

    for (var next = node.nextSibling; next; next = next.nextSibling) {
      if (next.nodeType != 1 || next.nodeName != "BR") return false;
    }

    return textRange(node, len - 1, len).getBoundingClientRect().left > x;
  }

  function moveToLineBoundary(view, start, forward, includeWrap) {
    var line = view.state.doc.lineAt(start.head);
    var coords = !includeWrap || !view.lineWrapping ? null : view.coordsAtPos(start.assoc < 0 && start.head > line.from ? start.head - 1 : start.head);

    if (coords) {
      var editorRect = view.dom.getBoundingClientRect();
      var direction = view.textDirectionAt(line.from);
      var pos = view.posAtCoords({
        x: forward == (direction == Direction.LTR) ? editorRect.right - 1 : editorRect.left + 1,
        y: (coords.top + coords.bottom) / 2
      });
      if (pos != null) return EditorSelection.cursor(pos, forward ? -1 : 1);
    }

    var lineView = LineView.find(view.docView, start.head);
    var end = lineView ? forward ? lineView.posAtEnd : lineView.posAtStart : forward ? line.to : line.from;
    return EditorSelection.cursor(end, forward ? -1 : 1);
  }

  function moveByChar(view, start, forward, by) {
    var line = view.state.doc.lineAt(start.head),
        spans = view.bidiSpans(line);
    var direction = view.textDirectionAt(line.from);

    for (var cur2 = start, check = null;;) {
      var next = moveVisually(line, spans, direction, cur2, forward),
          char = movedOver;

      if (!next) {
        if (line.number == (forward ? view.state.doc.lines : 1)) return cur2;
        char = "\n";
        line = view.state.doc.line(line.number + (forward ? 1 : -1));
        spans = view.bidiSpans(line);
        next = EditorSelection.cursor(forward ? line.from : line.to);
      }

      if (!check) {
        if (!by) return next;
        check = by(char);
      } else if (!check(char)) {
        return cur2;
      }

      cur2 = next;
    }
  }

  function byGroup(view, pos, start) {
    var categorize = view.state.charCategorizer(pos);
    var cat = categorize(start);
    return next => {
      var nextCat = categorize(next);
      if (cat == CharCategory.Space) cat = nextCat;
      return cat == nextCat;
    };
  }

  function moveVertically(view, start, forward, distance) {
    var startPos = start.head,
        dir = forward ? 1 : -1;
    if (startPos == (forward ? view.state.doc.length : 0)) return EditorSelection.cursor(startPos, start.assoc);
    var goal = start.goalColumn,
        startY;
    var rect = view.contentDOM.getBoundingClientRect();
    var startCoords = view.coordsAtPos(startPos),
        docTop = view.documentTop;

    if (startCoords) {
      if (goal == null) goal = startCoords.left - rect.left;
      startY = dir < 0 ? startCoords.top : startCoords.bottom;
    } else {
      var line = view.viewState.lineBlockAt(startPos);
      if (goal == null) goal = Math.min(rect.right - rect.left, view.defaultCharacterWidth * (startPos - line.from));
      startY = (dir < 0 ? line.top : line.bottom) + docTop;
    }

    var resolvedGoal = rect.left + goal;
    var dist = distance !== null && distance !== void 0 ? distance : view.defaultLineHeight >> 1;

    for (var extra = 0;; extra += 10) {
      var curY = startY + (dist + extra) * dir;
      var pos = posAtCoords(view, {
        x: resolvedGoal,
        y: curY
      }, false, dir);
      if (curY < rect.top || curY > rect.bottom || (dir < 0 ? pos < startPos : pos > startPos)) return EditorSelection.cursor(pos, start.assoc, void 0, goal);
    }
  }

  function skipAtoms(view, oldPos, pos) {
    var atoms = view.state.facet(atomicRanges).map(f => f(view));

    for (;;) {
      var moved = false;

      var _iterator37 = _createForOfIteratorHelper(atoms),
          _step37;

      try {
        for (_iterator37.s(); !(_step37 = _iterator37.n()).done;) {
          var set = _step37.value;
          set.between(pos.from - 1, pos.from + 1, (from, to, value) => {
            if (pos.from > from && pos.from < to) {
              pos = oldPos.from > pos.from ? EditorSelection.cursor(from, 1) : EditorSelection.cursor(to, -1);
              moved = true;
            }
          });
        }
      } catch (err) {
        _iterator37.e(err);
      } finally {
        _iterator37.f();
      }

      if (!moved) return pos;
    }
  }

  function addsSelectionRange(view, event) {
    var facet = view.state.facet(clickAddsSelectionRange);
    return facet.length ? facet[0](event) : browser.mac ? event.metaKey : event.ctrlKey;
  }

  function dragMovesSelection(view, event) {
    var facet = view.state.facet(dragMovesSelection$1);
    return facet.length ? facet[0](event) : browser.mac ? !event.altKey : !event.ctrlKey;
  }

  function isInPrimarySelection(view, event) {
    var main = view.state.selection.main;
    if (main.empty) return false;
    var sel = getSelection(view.root);
    if (sel.rangeCount == 0) return true;
    var rects = sel.getRangeAt(0).getClientRects();

    for (var _i69 = 0; _i69 < rects.length; _i69++) {
      var rect = rects[_i69];
      if (rect.left <= event.clientX && rect.right >= event.clientX && rect.top <= event.clientY && rect.bottom >= event.clientY) return true;
    }

    return false;
  }

  function eventBelongsToEditor(view, event) {
    if (!event.bubbles) return true;
    if (event.defaultPrevented) return false;

    for (var node = event.target, cView; node != view.contentDOM; node = node.parentNode) {
      if (!node || node.nodeType == 11 || (cView = ContentView.get(node)) && cView.ignoreEvent(event)) return false;
    }

    return true;
  }

  function capturePaste(view) {
    var parent = view.dom.parentNode;
    if (!parent) return;
    var target = parent.appendChild(document.createElement("textarea"));
    target.style.cssText = "position: fixed; left: -10000px; top: 10px";
    target.focus();
    setTimeout(() => {
      view.focus();
      target.remove();
      doPaste(view, target.value);
    }, 50);
  }

  function doPaste(view, input) {
    var state = view.state,
        changes,
        i = 1,
        text = state.toText(input);
    var byLine = text.lines == state.selection.ranges.length;
    var linewise = lastLinewiseCopy != null && state.selection.ranges.every(r => r.empty) && lastLinewiseCopy == text.toString();

    if (linewise) {
      var lastLine = -1;
      changes = state.changeByRange(range => {
        var line = state.doc.lineAt(range.from);
        if (line.from == lastLine) return {
          range
        };
        lastLine = line.from;
        var insert2 = state.toText((byLine ? text.line(i++).text : input) + state.lineBreak);
        return {
          changes: {
            from: line.from,
            insert: insert2
          },
          range: EditorSelection.cursor(range.from + insert2.length)
        };
      });
    } else if (byLine) {
      changes = state.changeByRange(range => {
        var line = text.line(i++);
        return {
          changes: {
            from: range.from,
            to: range.to,
            insert: line.text
          },
          range: EditorSelection.cursor(range.from + line.length)
        };
      });
    } else {
      changes = state.replaceSelection(text);
    }

    view.dispatch(changes, {
      userEvent: "input.paste",
      scrollIntoView: true
    });
  }

  function rangeForClick(view, pos, bias, type) {
    if (type == 1) {
      return EditorSelection.cursor(pos, bias);
    } else if (type == 2) {
      return groupAt(view.state, pos, bias);
    } else {
      var visual = LineView.find(view.docView, pos),
          line = view.state.doc.lineAt(visual ? visual.posAtEnd : pos);
      var from = visual ? visual.posAtStart : line.from,
          to = visual ? visual.posAtEnd : line.to;
      if (to < view.state.doc.length && to == line.to) to++;
      return EditorSelection.range(from, to);
    }
  }

  function findPositionSide(view, pos, x, y) {
    var line = LineView.find(view.docView, pos);
    if (!line) return 1;
    var off = pos - line.posAtStart;
    if (off == 0) return 1;
    if (off == line.length) return -1;
    var before = line.coordsAt(off, -1);
    if (before && inside(x, y, before)) return -1;
    var after = line.coordsAt(off, 1);
    if (after && inside(x, y, after)) return 1;
    return before && insideY(y, before) ? -1 : 1;
  }

  function queryPos(view, event) {
    var pos = view.posAtCoords({
      x: event.clientX,
      y: event.clientY
    }, false);
    return {
      pos,
      bias: findPositionSide(view, pos, event.clientX, event.clientY)
    };
  }

  function getClickType(event) {
    if (!BadMouseDetail) return event.detail;
    var last = lastMouseDown,
        lastTime = lastMouseDownTime;
    lastMouseDown = event;
    lastMouseDownTime = Date.now();
    return lastMouseDownCount = !last || lastTime > Date.now() - 400 && Math.abs(last.clientX - event.clientX) < 2 && Math.abs(last.clientY - event.clientY) < 2 ? (lastMouseDownCount + 1) % 3 : 1;
  }

  function basicMouseSelection(view, event) {
    var start = queryPos(view, event),
        type = getClickType(event);
    var startSel = view.state.selection;
    var last = start,
        lastEvent = event;
    return {
      update(update) {
        if (update.docChanged) {
          if (start) start.pos = update.changes.mapPos(start.pos);
          startSel = startSel.map(update.changes);
          lastEvent = null;
        }
      },

      get(event2, extend2, multiple) {
        var cur2;
        if (lastEvent && event2.clientX == lastEvent.clientX && event2.clientY == lastEvent.clientY) cur2 = last;else {
          cur2 = last = queryPos(view, event2);
          lastEvent = event2;
        }
        if (!cur2 || !start) return startSel;
        var range = rangeForClick(view, cur2.pos, cur2.bias, type);

        if (start.pos != cur2.pos && !extend2) {
          var startRange = rangeForClick(view, start.pos, start.bias, type);
          var from = Math.min(startRange.from, range.from),
              to = Math.max(startRange.to, range.to);
          range = from < range.from ? EditorSelection.range(from, to) : EditorSelection.range(to, from);
        }

        if (extend2) return startSel.replaceRange(startSel.main.extend(range.from, range.to));else if (multiple) return startSel.addRange(range);else return EditorSelection.create([range]);
      }

    };
  }

  function dropText(view, event, text, direct) {
    if (!text) return;
    var dropPos = view.posAtCoords({
      x: event.clientX,
      y: event.clientY
    }, false);
    event.preventDefault();
    var mouseSelection = view.inputState.mouseSelection;
    var del = direct && mouseSelection && mouseSelection.dragging && mouseSelection.dragMove ? {
      from: mouseSelection.dragging.from,
      to: mouseSelection.dragging.to
    } : null;
    var ins = {
      from: dropPos,
      insert: text
    };
    var changes = view.state.changes(del ? [del, ins] : ins);
    view.focus();
    view.dispatch({
      changes,
      selection: {
        anchor: changes.mapPos(dropPos, -1),
        head: changes.mapPos(dropPos, 1)
      },
      userEvent: del ? "move.drop" : "input.drop"
    });
  }

  function captureCopy(view, text) {
    var parent = view.dom.parentNode;
    if (!parent) return;
    var target = parent.appendChild(document.createElement("textarea"));
    target.style.cssText = "position: fixed; left: -10000px; top: 10px";
    target.value = text;
    target.focus();
    target.selectionEnd = text.length;
    target.selectionStart = 0;
    setTimeout(() => {
      target.remove();
      view.focus();
    }, 50);
  }

  function copiedRange(state) {
    var content2 = [],
        ranges = [],
        linewise = false;

    var _iterator38 = _createForOfIteratorHelper(state.selection.ranges),
        _step38;

    try {
      for (_iterator38.s(); !(_step38 = _iterator38.n()).done;) {
        var range = _step38.value;

        if (!range.empty) {
          content2.push(state.sliceDoc(range.from, range.to));
          ranges.push(range);
        }
      }
    } catch (err) {
      _iterator38.e(err);
    } finally {
      _iterator38.f();
    }

    if (!content2.length) {
      var upto = -1;

      var _iterator39 = _createForOfIteratorHelper(state.selection.ranges),
          _step39;

      try {
        for (_iterator39.s(); !(_step39 = _iterator39.n()).done;) {
          var from = _step39.value.from;
          var line = state.doc.lineAt(from);

          if (line.number > upto) {
            content2.push(line.text);
            ranges.push({
              from: line.from,
              to: Math.min(state.doc.length, line.to + 1)
            });
          }

          upto = line.number;
        }
      } catch (err) {
        _iterator39.e(err);
      } finally {
        _iterator39.f();
      }

      linewise = true;
    }

    return {
      text: content2.join(state.lineBreak),
      ranges,
      linewise
    };
  }

  function updateForFocusChange(view) {
    setTimeout(() => {
      if (view.hasFocus != view.inputState.notifiedFocused) view.update([]);
    }, 10);
  }

  function forceClearComposition(view, rapid) {
    if (view.docView.compositionDeco.size) {
      view.inputState.rapidCompositionStart = rapid;

      try {
        view.update([]);
      } finally {
        view.inputState.rapidCompositionStart = false;
      }
    }
  }

  function mergeGaps(nodes, around) {
    var before, after;
    if (nodes[around] == null && (before = nodes[around - 1]) instanceof HeightMapGap && (after = nodes[around + 1]) instanceof HeightMapGap) nodes.splice(around - 1, 3, new HeightMapGap(before.length + 1 + after.length));
  }

  function heightRelevantDecoChanges(a, b, diff) {
    var comp = new DecorationComparator();
    RangeSet.compare(a, b, diff, comp, 0);
    return comp.changes;
  }

  function visiblePixelRange(dom, paddingTop) {
    var rect = dom.getBoundingClientRect();
    var left = Math.max(0, rect.left),
        right = Math.min(innerWidth, rect.right);
    var top2 = Math.max(0, rect.top),
        bottom = Math.min(innerHeight, rect.bottom);
    var body = dom.ownerDocument.body;

    for (var parent = dom.parentNode; parent && parent != body;) {
      if (parent.nodeType == 1) {
        var elt = parent;
        var style = window.getComputedStyle(elt);

        if ((elt.scrollHeight > elt.clientHeight || elt.scrollWidth > elt.clientWidth) && style.overflow != "visible") {
          var parentRect = elt.getBoundingClientRect();
          left = Math.max(left, parentRect.left);
          right = Math.min(right, parentRect.right);
          top2 = Math.max(top2, parentRect.top);
          bottom = Math.min(bottom, parentRect.bottom);
        }

        parent = style.position == "absolute" || style.position == "fixed" ? elt.offsetParent : elt.parentNode;
      } else if (parent.nodeType == 11) {
        parent = parent.host;
      } else {
        break;
      }
    }

    return {
      left: left - rect.left,
      right: Math.max(left, right) - rect.left,
      top: top2 - (rect.top + paddingTop),
      bottom: Math.max(top2, bottom) - (rect.top + paddingTop)
    };
  }

  function fullPixelRange(dom, paddingTop) {
    var rect = dom.getBoundingClientRect();
    return {
      left: 0,
      right: rect.right - rect.left,
      top: paddingTop,
      bottom: rect.bottom - (rect.top + paddingTop)
    };
  }

  function lineStructure(from, to, stateDeco) {
    var ranges = [],
        pos = from,
        total = 0;
    RangeSet.spans(stateDeco, from, to, {
      span() {},

      point(from2, to2) {
        if (from2 > pos) {
          ranges.push({
            from: pos,
            to: from2
          });
          total += from2 - pos;
        }

        pos = to2;
      }

    }, 20);

    if (pos < to) {
      ranges.push({
        from: pos,
        to
      });
      total += to - pos;
    }

    return {
      total,
      ranges
    };
  }

  function findPosition(_ref5, ratio) {
    var total = _ref5.total,
        ranges = _ref5.ranges;
    if (ratio <= 0) return ranges[0].from;
    if (ratio >= 1) return ranges[ranges.length - 1].to;
    var dist = Math.floor(total * ratio);

    for (var _i70 = 0;; _i70++) {
      var _ranges$_i = ranges[_i70],
          from = _ranges$_i.from,
          to = _ranges$_i.to,
          size = to - from;
      if (dist <= size) return from + dist;
      dist -= size;
    }
  }

  function findFraction(structure, pos) {
    var counted = 0;

    var _iterator40 = _createForOfIteratorHelper(structure.ranges),
        _step40;

    try {
      for (_iterator40.s(); !(_step40 = _iterator40.n()).done;) {
        var _step40$value = _step40.value,
            from = _step40$value.from,
            to = _step40$value.to;

        if (pos <= to) {
          counted += pos - from;
          break;
        }

        counted += to - from;
      }
    } catch (err) {
      _iterator40.e(err);
    } finally {
      _iterator40.f();
    }

    return counted / structure.total;
  }

  function cutRange(ranges, from, to) {
    for (var _i71 = 0; _i71 < ranges.length; _i71++) {
      var r = ranges[_i71];

      if (r.from < to && r.to > from) {
        var pieces = [];
        if (r.from < from) pieces.push({
          from: r.from,
          to: from
        });
        if (r.to > to) pieces.push({
          from: to,
          to: r.to
        });
        ranges.splice(_i71, 1, ...pieces);
        _i71 += pieces.length - 1;
      }
    }
  }

  function find(array, f) {
    var _iterator41 = _createForOfIteratorHelper(array),
        _step41;

    try {
      for (_iterator41.s(); !(_step41 = _iterator41.n()).done;) {
        var val = _step41.value;
        if (f(val)) return val;
      }
    } catch (err) {
      _iterator41.e(err);
    } finally {
      _iterator41.f();
    }

    return void 0;
  }

  function scaleBlock(block, scaler) {
    if (scaler.scale == 1) return block;
    var bTop = scaler.toDOM(block.top),
        bBottom = scaler.toDOM(block.bottom);
    return new BlockInfo(block.from, block.length, bTop, bBottom - bTop, Array.isArray(block.type) ? block.type.map(b => scaleBlock(b, scaler)) : block.type);
  }

  function buildTheme(main, spec, scopes) {
    return new StyleModule(spec, {
      finish(sel) {
        return /&/.test(sel) ? sel.replace(/&\w*/, m => {
          if (m == "&") return main;
          if (!scopes || !scopes[m]) throw new RangeError("Unsupported selector: ".concat(m));
          return scopes[m];
        }) : main + " " + sel;
      }

    });
  }

  function findChild(cView, dom, dir) {
    while (dom) {
      var curView = ContentView.get(dom);
      if (curView && curView.parent == cView) return curView;
      var parent = dom.parentNode;
      dom = parent != cView.dom ? parent : dir > 0 ? dom.nextSibling : dom.previousSibling;
    }

    return null;
  }

  function safariSelectionRangeHack(view) {
    var found = null;

    function read(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      found = event.getTargetRanges()[0];
    }

    view.contentDOM.addEventListener("beforeinput", read, true);
    document.execCommand("indent");
    view.contentDOM.removeEventListener("beforeinput", read, true);
    if (!found) return null;
    var anchorNode = found.startContainer,
        anchorOffset = found.startOffset;
    var focusNode = found.endContainer,
        focusOffset = found.endOffset;
    var curAnchor = view.docView.domAtPos(view.state.selection.main.anchor);

    if (isEquivalentPosition(curAnchor.node, curAnchor.offset, focusNode, focusOffset)) {
      var _ref6 = [focusNode, focusOffset, anchorNode, anchorOffset];
      anchorNode = _ref6[0];
      anchorOffset = _ref6[1];
      focusNode = _ref6[2];
      focusOffset = _ref6[3];
    }

    return {
      anchorNode,
      anchorOffset,
      focusNode,
      focusOffset
    };
  }

  function applyDOMChange(view, start, end, typeOver) {
    var change, newSel;
    var sel = view.state.selection.main;

    if (start > -1) {
      var bounds = view.docView.domBoundsAround(start, end, 0);
      if (!bounds || view.state.readOnly) return false;
      var from = bounds.from,
          to = bounds.to;
      var selPoints = view.docView.impreciseHead || view.docView.impreciseAnchor ? [] : selectionPoints(view);
      var reader = new DOMReader(selPoints, view.state);
      reader.readRange(bounds.startDOM, bounds.endDOM);
      var preferredPos = sel.from,
          preferredSide = null;

      if (view.inputState.lastKeyCode === 8 && view.inputState.lastKeyTime > Date.now() - 100 || browser.android && reader.text.length < to - from) {
        preferredPos = sel.to;
        preferredSide = "end";
      }

      var diff = findDiff(view.state.doc.sliceString(from, to, LineBreakPlaceholder), reader.text, preferredPos - from, preferredSide);

      if (diff) {
        if (browser.chrome && view.inputState.lastKeyCode == 13 && diff.toB == diff.from + 2 && reader.text.slice(diff.from, diff.toB) == LineBreakPlaceholder + LineBreakPlaceholder) diff.toB--;
        change = {
          from: from + diff.from,
          to: from + diff.toA,
          insert: Text.of(reader.text.slice(diff.from, diff.toB).split(LineBreakPlaceholder))
        };
      }

      newSel = selectionFromPoints(selPoints, from);
    } else if (view.hasFocus || !view.state.facet(editable)) {
      var domSel = view.observer.selectionRange;
      var _view$docView = view.docView,
          iHead = _view$docView.impreciseHead,
          iAnchor = _view$docView.impreciseAnchor;
      var head = iHead && iHead.node == domSel.focusNode && iHead.offset == domSel.focusOffset || !contains(view.contentDOM, domSel.focusNode) ? view.state.selection.main.head : view.docView.posFromDOM(domSel.focusNode, domSel.focusOffset);
      var anchor = iAnchor && iAnchor.node == domSel.anchorNode && iAnchor.offset == domSel.anchorOffset || !contains(view.contentDOM, domSel.anchorNode) ? view.state.selection.main.anchor : view.docView.posFromDOM(domSel.anchorNode, domSel.anchorOffset);
      if (head != sel.head || anchor != sel.anchor) newSel = EditorSelection.single(anchor, head);
    }

    if (!change && !newSel) return false;
    if (!change && typeOver && !sel.empty && newSel && newSel.main.empty) change = {
      from: sel.from,
      to: sel.to,
      insert: view.state.doc.slice(sel.from, sel.to)
    };else if (change && change.from >= sel.from && change.to <= sel.to && (change.from != sel.from || change.to != sel.to) && sel.to - sel.from - (change.to - change.from) <= 4) change = {
      from: sel.from,
      to: sel.to,
      insert: view.state.doc.slice(sel.from, change.from).append(change.insert).append(view.state.doc.slice(change.to, sel.to))
    };else if ((browser.mac || browser.android) && change && change.from == change.to && change.from == sel.head - 1 && change.insert.toString() == ".") change = {
      from: sel.from,
      to: sel.to,
      insert: Text.of([" "])
    };

    if (change) {
      var startState = view.state;
      if (browser.ios && view.inputState.flushIOSKey(view)) return true;
      if (browser.android && (change.from == sel.from && change.to == sel.to && change.insert.length == 1 && change.insert.lines == 2 && dispatchKey(view.contentDOM, "Enter", 13) || change.from == sel.from - 1 && change.to == sel.to && change.insert.length == 0 && dispatchKey(view.contentDOM, "Backspace", 8) || change.from == sel.from && change.to == sel.to + 1 && change.insert.length == 0 && dispatchKey(view.contentDOM, "Delete", 46))) return true;
      var text = change.insert.toString();
      if (view.state.facet(inputHandler).some(h => h(view, change.from, change.to, text))) return true;
      if (view.inputState.composing >= 0) view.inputState.composing++;
      var tr;

      if (change.from >= sel.from && change.to <= sel.to && change.to - change.from >= (sel.to - sel.from) / 3 && (!newSel || newSel.main.empty && newSel.main.from == change.from + change.insert.length) && view.inputState.composing < 0) {
        var before = sel.from < change.from ? startState.sliceDoc(sel.from, change.from) : "";
        var after = sel.to > change.to ? startState.sliceDoc(change.to, sel.to) : "";
        tr = startState.replaceSelection(view.state.toText(before + change.insert.sliceString(0, void 0, view.state.lineBreak) + after));
      } else {
        var changes = startState.changes(change);
        var mainSel = newSel && !startState.selection.main.eq(newSel.main) && newSel.main.to <= changes.newLength ? newSel.main : void 0;

        if (startState.selection.ranges.length > 1 && view.inputState.composing >= 0 && change.to <= sel.to && change.to >= sel.to - 10) {
          var replaced = view.state.sliceDoc(change.from, change.to);
          var compositionRange = compositionSurroundingNode(view) || view.state.doc.lineAt(sel.head);
          var offset = sel.to - change.to,
              size = sel.to - sel.from;
          tr = startState.changeByRange(range => {
            if (range.from == sel.from && range.to == sel.to) return {
              changes,
              range: mainSel || range.map(changes)
            };
            var to = range.to - offset,
                from = to - replaced.length;
            if (range.to - range.from != size || view.state.sliceDoc(from, to) != replaced || compositionRange && range.to >= compositionRange.from && range.from <= compositionRange.to) return {
              range
            };
            var rangeChanges = startState.changes({
              from,
              to,
              insert: change.insert
            }),
                selOff = range.to - sel.to;
            return {
              changes: rangeChanges,
              range: !mainSel ? range.map(rangeChanges) : EditorSelection.range(Math.max(0, mainSel.anchor + selOff), Math.max(0, mainSel.head + selOff))
            };
          });
        } else {
          tr = {
            changes,
            selection: mainSel && startState.selection.replaceRange(mainSel)
          };
        }
      }

      var userEvent = "input.type";

      if (view.composing) {
        userEvent += ".compose";

        if (view.inputState.compositionFirstChange) {
          userEvent += ".start";
          view.inputState.compositionFirstChange = false;
        }
      }

      view.dispatch(tr, {
        scrollIntoView: true,
        userEvent
      });
      return true;
    } else if (newSel && !newSel.main.eq(sel)) {
      var scrollIntoView3 = false,
          _userEvent = "select";

      if (view.inputState.lastSelectionTime > Date.now() - 50) {
        if (view.inputState.lastSelectionOrigin == "select") scrollIntoView3 = true;
        _userEvent = view.inputState.lastSelectionOrigin;
      }

      view.dispatch({
        selection: newSel,
        scrollIntoView: scrollIntoView3,
        userEvent: _userEvent
      });
      return true;
    } else {
      return false;
    }
  }

  function findDiff(a, b, preferredPos, preferredSide) {
    var minLen = Math.min(a.length, b.length);
    var from = 0;

    while (from < minLen && a.charCodeAt(from) == b.charCodeAt(from)) {
      from++;
    }

    if (from == minLen && a.length == b.length) return null;
    var toA = a.length,
        toB = b.length;

    while (toA > 0 && toB > 0 && a.charCodeAt(toA - 1) == b.charCodeAt(toB - 1)) {
      toA--;
      toB--;
    }

    if (preferredSide == "end") {
      var adjust = Math.max(0, from - Math.min(toA, toB));
      preferredPos -= toA + adjust - from;
    }

    if (toA < from && a.length < b.length) {
      var move = preferredPos <= from && preferredPos >= toA ? from - preferredPos : 0;
      from -= move;
      toB = from + (toB - toA);
      toA = from;
    } else if (toB < from) {
      var _move = preferredPos <= from && preferredPos >= toB ? from - preferredPos : 0;

      from -= _move;
      toA = from + (toA - toB);
      toB = from;
    }

    return {
      from,
      toA,
      toB
    };
  }

  function selectionPoints(view) {
    var result = [];
    if (view.root.activeElement != view.contentDOM) return result;
    var _view$observer$select = view.observer.selectionRange,
        anchorNode = _view$observer$select.anchorNode,
        anchorOffset = _view$observer$select.anchorOffset,
        focusNode = _view$observer$select.focusNode,
        focusOffset = _view$observer$select.focusOffset;

    if (anchorNode) {
      result.push(new DOMPoint(anchorNode, anchorOffset));
      if (focusNode != anchorNode || focusOffset != anchorOffset) result.push(new DOMPoint(focusNode, focusOffset));
    }

    return result;
  }

  function selectionFromPoints(points, base2) {
    if (points.length == 0) return null;
    var anchor = points[0].pos,
        head = points.length == 2 ? points[1].pos : anchor;
    return anchor > -1 && head > -1 ? EditorSelection.single(anchor + base2, head + base2) : null;
  }

  function attrsFromFacet(view, facet, base2) {
    for (var sources = view.state.facet(facet), _i72 = sources.length - 1; _i72 >= 0; _i72--) {
      var source = sources[_i72],
          value = typeof source == "function" ? source(view) : source;
      if (value) combineAttrs(value, base2);
    }

    return base2;
  }

  function normalizeKeyName(name2, platform) {
    var parts = name2.split(/-(?!$)/);
    var result = parts[parts.length - 1];
    if (result == "Space") result = " ";
    var alt, ctrl, shift2, meta2;

    for (var _i73 = 0; _i73 < parts.length - 1; ++_i73) {
      var mod = parts[_i73];
      if (/^(cmd|meta|m)$/i.test(mod)) meta2 = true;else if (/^a(lt)?$/i.test(mod)) alt = true;else if (/^(c|ctrl|control)$/i.test(mod)) ctrl = true;else if (/^s(hift)?$/i.test(mod)) shift2 = true;else if (/^mod$/i.test(mod)) {
        if (platform == "mac") meta2 = true;else ctrl = true;
      } else throw new Error("Unrecognized modifier name: " + mod);
    }

    if (alt) result = "Alt-" + result;
    if (ctrl) result = "Ctrl-" + result;
    if (meta2) result = "Meta-" + result;
    if (shift2) result = "Shift-" + result;
    return result;
  }

  function modifiers(name2, event, shift2) {
    if (event.altKey) name2 = "Alt-" + name2;
    if (event.ctrlKey) name2 = "Ctrl-" + name2;
    if (event.metaKey) name2 = "Meta-" + name2;
    if (shift2 !== false && event.shiftKey) name2 = "Shift-" + name2;
    return name2;
  }

  function getKeymap(state) {
    var bindings = state.facet(keymap);
    var map = Keymaps.get(bindings);
    if (!map) Keymaps.set(bindings, map = buildKeymap(bindings.reduce((a, b) => a.concat(b), [])));
    return map;
  }

  function runScopeHandlers(view, event, scope) {
    return runHandlers(getKeymap(view.state), event, view, scope);
  }

  function buildKeymap(bindings) {
    var platform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentPlatform;
    var bound = /* @__PURE__ */Object.create(null);
    var isPrefix = /* @__PURE__ */Object.create(null);

    var checkPrefix = (name2, is) => {
      var current = isPrefix[name2];
      if (current == null) isPrefix[name2] = is;else if (current != is) throw new Error("Key binding " + name2 + " is used both as a regular binding and as a multi-stroke prefix");
    };

    var add2 = (scope, key, command2, preventDefault) => {
      var scopeObj = bound[scope] || (bound[scope] = /* @__PURE__ */Object.create(null));
      var parts = key.split(/ (?!$)/).map(k => normalizeKeyName(k, platform));

      var _loop5 = function _loop5(_i74) {
        var prefix = parts.slice(0, _i74).join(" ");
        checkPrefix(prefix, true);
        if (!scopeObj[prefix]) scopeObj[prefix] = {
          preventDefault: true,
          commands: [view => {
            var ourObj = storedPrefix = {
              view,
              prefix,
              scope
            };
            setTimeout(() => {
              if (storedPrefix == ourObj) storedPrefix = null;
            }, PrefixTimeout);
            return true;
          }]
        };
      };

      for (var _i74 = 1; _i74 < parts.length; _i74++) {
        _loop5(_i74);
      }

      var full = parts.join(" ");
      checkPrefix(full, false);
      var binding = scopeObj[full] || (scopeObj[full] = {
        preventDefault: false,
        commands: []
      });
      binding.commands.push(command2);
      if (preventDefault) binding.preventDefault = true;
    };

    var _iterator42 = _createForOfIteratorHelper(bindings),
        _step42;

    try {
      for (_iterator42.s(); !(_step42 = _iterator42.n()).done;) {
        var b = _step42.value;
        var name2 = b[platform] || b.key;
        if (!name2) continue;

        var _iterator43 = _createForOfIteratorHelper(b.scope ? b.scope.split(" ") : ["editor"]),
            _step43;

        try {
          for (_iterator43.s(); !(_step43 = _iterator43.n()).done;) {
            var scope = _step43.value;
            add2(scope, name2, b.run, b.preventDefault);
            if (b.shift) add2(scope, "Shift-" + name2, b.shift, b.preventDefault);
          }
        } catch (err) {
          _iterator43.e(err);
        } finally {
          _iterator43.f();
        }
      }
    } catch (err) {
      _iterator42.e(err);
    } finally {
      _iterator42.f();
    }

    return bound;
  }

  function runHandlers(map, event, view, scope) {
    var name2 = keyName(event),
        isChar = name2.length == 1 && name2 != " ";
    var prefix = "",
        fallthrough = false;

    if (storedPrefix && storedPrefix.view == view && storedPrefix.scope == scope) {
      prefix = storedPrefix.prefix + " ";
      if (fallthrough = modifierCodes.indexOf(event.keyCode) < 0) storedPrefix = null;
    }

    var runFor = binding => {
      if (binding) {
        var _iterator44 = _createForOfIteratorHelper(binding.commands),
            _step44;

        try {
          for (_iterator44.s(); !(_step44 = _iterator44.n()).done;) {
            var cmd2 = _step44.value;
            if (cmd2(view)) return true;
          }
        } catch (err) {
          _iterator44.e(err);
        } finally {
          _iterator44.f();
        }

        if (binding.preventDefault) fallthrough = true;
      }

      return false;
    };

    var scopeObj = map[scope],
        baseName;

    if (scopeObj) {
      if (runFor(scopeObj[prefix + modifiers(name2, event, !isChar)])) return true;

      if (isChar && (event.shiftKey || event.altKey || event.metaKey) && (baseName = base[event.keyCode]) && baseName != name2) {
        if (runFor(scopeObj[prefix + modifiers(baseName, event, true)])) return true;
      } else if (isChar && event.shiftKey) {
        if (runFor(scopeObj[prefix + modifiers(name2, event, true)])) return true;
      }
    }

    return fallthrough;
  }

  function drawSelection() {
    var config2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return [selectionConfig.of(config2), drawSelectionPlugin, hideNativeSelection];
  }

  function getBase(view) {
    var rect = view.scrollDOM.getBoundingClientRect();
    var left = view.textDirection == Direction.LTR ? rect.left : rect.right - view.scrollDOM.clientWidth;
    return {
      left: left - view.scrollDOM.scrollLeft,
      top: rect.top - view.scrollDOM.scrollTop
    };
  }

  function wrappedLine(view, pos, inside2) {
    var range = EditorSelection.cursor(pos);
    return {
      from: Math.max(inside2.from, view.moveToLineBoundary(range, false, true).from),
      to: Math.min(inside2.to, view.moveToLineBoundary(range, true, true).from),
      type: BlockType.Text
    };
  }

  function blockAt(view, pos) {
    var line = view.lineBlockAt(pos);

    if (Array.isArray(line.type)) {
      var _iterator45 = _createForOfIteratorHelper(line.type),
          _step45;

      try {
        for (_iterator45.s(); !(_step45 = _iterator45.n()).done;) {
          var l = _step45.value;
          if (l.to > pos || l.to == pos && (l.to == line.to || l.type == BlockType.Text)) return l;
        }
      } catch (err) {
        _iterator45.e(err);
      } finally {
        _iterator45.f();
      }
    }

    return line;
  }

  function measureRange(view, range) {
    if (range.to <= view.viewport.from || range.from >= view.viewport.to) return [];
    var from = Math.max(range.from, view.viewport.from),
        to = Math.min(range.to, view.viewport.to);
    var ltr = view.textDirection == Direction.LTR;
    var content2 = view.contentDOM,
        contentRect = content2.getBoundingClientRect(),
        base2 = getBase(view);
    var lineStyle = window.getComputedStyle(content2.firstChild);
    var leftSide = contentRect.left + parseInt(lineStyle.paddingLeft) + Math.min(0, parseInt(lineStyle.textIndent));
    var rightSide = contentRect.right - parseInt(lineStyle.paddingRight);
    var startBlock = blockAt(view, from),
        endBlock = blockAt(view, to);
    var visualStart = startBlock.type == BlockType.Text ? startBlock : null;
    var visualEnd = endBlock.type == BlockType.Text ? endBlock : null;

    if (view.lineWrapping) {
      if (visualStart) visualStart = wrappedLine(view, from, visualStart);
      if (visualEnd) visualEnd = wrappedLine(view, to, visualEnd);
    }

    if (visualStart && visualEnd && visualStart.from == visualEnd.from) {
      return pieces(drawForLine(range.from, range.to, visualStart));
    } else {
      var top2 = visualStart ? drawForLine(range.from, null, visualStart) : drawForWidget(startBlock, false);
      var bottom = visualEnd ? drawForLine(null, range.to, visualEnd) : drawForWidget(endBlock, true);
      var between = [];
      if ((visualStart || startBlock).to < (visualEnd || endBlock).from - 1) between.push(piece(leftSide, top2.bottom, rightSide, bottom.top));else if (top2.bottom < bottom.top && view.elementAtHeight((top2.bottom + bottom.top) / 2).type == BlockType.Text) top2.bottom = bottom.top = (top2.bottom + bottom.top) / 2;
      return pieces(top2).concat(between).concat(pieces(bottom));
    }

    function piece(left, top2, right, bottom) {
      return new Piece(left - base2.left, top2 - base2.top - 0.01, right - left, bottom - top2 + 0.01, "cm-selectionBackground");
    }

    function pieces(_ref7) {
      var top2 = _ref7.top,
          bottom = _ref7.bottom,
          horizontal = _ref7.horizontal;
      var pieces2 = [];

      for (var _i75 = 0; _i75 < horizontal.length; _i75 += 2) {
        pieces2.push(piece(horizontal[_i75], top2, horizontal[_i75 + 1], bottom));
      }

      return pieces2;
    }

    function drawForLine(from2, to2, line) {
      var top2 = 1e9,
          bottom = -1e9,
          horizontal = [];

      function addSpan(from3, fromOpen, to3, toOpen, dir) {
        var fromCoords = view.coordsAtPos(from3, from3 == line.to ? -2 : 2);
        var toCoords = view.coordsAtPos(to3, to3 == line.from ? 2 : -2);
        top2 = Math.min(fromCoords.top, toCoords.top, top2);
        bottom = Math.max(fromCoords.bottom, toCoords.bottom, bottom);
        if (dir == Direction.LTR) horizontal.push(ltr && fromOpen ? leftSide : fromCoords.left, ltr && toOpen ? rightSide : toCoords.right);else horizontal.push(!ltr && toOpen ? leftSide : toCoords.left, !ltr && fromOpen ? rightSide : fromCoords.right);
      }

      var start = from2 !== null && from2 !== void 0 ? from2 : line.from,
          end = to2 !== null && to2 !== void 0 ? to2 : line.to;

      var _iterator46 = _createForOfIteratorHelper(view.visibleRanges),
          _step46;

      try {
        for (_iterator46.s(); !(_step46 = _iterator46.n()).done;) {
          var r = _step46.value;

          if (r.to > start && r.from < end) {
            for (var pos = Math.max(r.from, start), endPos = Math.min(r.to, end);;) {
              var docLine = view.state.doc.lineAt(pos);

              var _iterator47 = _createForOfIteratorHelper(view.bidiSpans(docLine)),
                  _step47;

              try {
                for (_iterator47.s(); !(_step47 = _iterator47.n()).done;) {
                  var span = _step47.value;
                  var spanFrom = span.from + docLine.from,
                      spanTo = span.to + docLine.from;
                  if (spanFrom >= endPos) break;
                  if (spanTo > pos) addSpan(Math.max(spanFrom, pos), from2 == null && spanFrom <= start, Math.min(spanTo, endPos), to2 == null && spanTo >= end, span.dir);
                }
              } catch (err) {
                _iterator47.e(err);
              } finally {
                _iterator47.f();
              }

              pos = docLine.to + 1;
              if (pos >= endPos) break;
            }
          }
        }
      } catch (err) {
        _iterator46.e(err);
      } finally {
        _iterator46.f();
      }

      if (horizontal.length == 0) addSpan(start, from2 == null, end, to2 == null, view.textDirection);
      return {
        top: top2,
        bottom,
        horizontal
      };
    }

    function drawForWidget(block, top2) {
      var y = contentRect.top + (top2 ? block.top : block.bottom);
      return {
        top: y,
        bottom: y,
        horizontal: []
      };
    }
  }

  function measureCursor(view, cursor, primary) {
    var pos = view.coordsAtPos(cursor.head, cursor.assoc || 1);
    if (!pos) return null;
    var base2 = getBase(view);
    return new Piece(pos.left - base2.left, pos.top - base2.top, -1, pos.bottom - pos.top, primary ? "cm-cursor cm-cursor-primary" : "cm-cursor cm-cursor-secondary");
  }

  function dropCursor() {
    return [dropCursorPos, drawDropCursor];
  }

  function iterMatches(doc2, re, from, to, f) {
    re.lastIndex = 0;

    for (var cursor = doc2.iterRange(from, to), pos = from, m; !cursor.next().done; pos += cursor.value.length) {
      if (!cursor.lineBreak) while (m = re.exec(cursor.value)) {
        f(pos + m.index, pos + m.index + m[0].length, m);
      }
    }
  }

  function matchRanges(view, maxLength) {
    var visible = view.visibleRanges;
    if (visible.length == 1 && visible[0].from == view.viewport.from && visible[0].to == view.viewport.to) return visible;
    var result = [];

    var _iterator48 = _createForOfIteratorHelper(visible),
        _step48;

    try {
      for (_iterator48.s(); !(_step48 = _iterator48.n()).done;) {
        var _step48$value = _step48.value,
            from = _step48$value.from,
            to = _step48$value.to;
        from = Math.max(view.state.doc.lineAt(from).from, from - maxLength);
        to = Math.min(view.state.doc.lineAt(to).to, to + maxLength);
        if (result.length && result[result.length - 1].to >= from) result[result.length - 1].to = to;else result.push({
          from,
          to
        });
      }
    } catch (err) {
      _iterator48.e(err);
    } finally {
      _iterator48.f();
    }

    return result;
  }

  function supportsTabSize() {
    var _a2;

    if (_supportsTabSize == null && typeof document != "undefined" && document.body) {
      var styles = document.body.style;
      _supportsTabSize = ((_a2 = styles.tabSize) !== null && _a2 !== void 0 ? _a2 : styles.MozTabSize) != null;
    }

    return _supportsTabSize || false;
  }

  function highlightSpecialChars() {
    var config2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return [specialCharConfig.of(config2), specialCharPlugin()];
  }

  function specialCharPlugin() {
    return _plugin || (_plugin = ViewPlugin.fromClass(class {
      constructor(view) {
        this.view = view;
        this.decorations = Decoration.none;
        this.decorationCache = /* @__PURE__ */Object.create(null);
        this.decorator = this.makeDecorator(view.state.facet(specialCharConfig));
        this.decorations = this.decorator.createDeco(view);
      }

      makeDecorator(conf) {
        return new MatchDecorator({
          regexp: conf.specialChars,
          decoration: (m, view, pos) => {
            var doc2 = view.state.doc;
            var code = codePointAt(m[0], 0);

            if (code == 9) {
              var line = doc2.lineAt(pos);
              var size = view.state.tabSize,
                  col = countColumn(line.text, size, pos - line.from);
              return Decoration.replace({
                widget: new TabWidget((size - col % size) * this.view.defaultCharacterWidth)
              });
            }

            return this.decorationCache[code] || (this.decorationCache[code] = Decoration.replace({
              widget: new SpecialCharWidget(conf, code)
            }));
          },
          boundary: conf.replaceTabs ? void 0 : /[^]/
        });
      }

      update(update) {
        var conf = update.state.facet(specialCharConfig);

        if (update.startState.facet(specialCharConfig) != conf) {
          this.decorator = this.makeDecorator(conf);
          this.decorations = this.decorator.createDeco(update.view);
        } else {
          this.decorations = this.decorator.updateDeco(update, this.decorations);
        }
      }

    }, {
      decorations: v => v.decorations
    }));
  }

  function placeholder$1(code) {
    if (code >= 32) return DefaultPlaceholder;
    if (code == 10) return "\u2424";
    return String.fromCharCode(9216 + code);
  }

  function highlightActiveLine() {
    return activeLineHighlighter;
  }

  function rectangleFor(state, a, b) {
    var startLine = Math.min(a.line, b.line),
        endLine = Math.max(a.line, b.line);
    var ranges = [];

    if (a.off > MaxOff || b.off > MaxOff || a.col < 0 || b.col < 0) {
      var startOff = Math.min(a.off, b.off),
          endOff = Math.max(a.off, b.off);

      for (var _i76 = startLine; _i76 <= endLine; _i76++) {
        var line = state.doc.line(_i76);
        if (line.length <= endOff) ranges.push(EditorSelection.range(line.from + startOff, line.to + endOff));
      }
    } else {
      var startCol = Math.min(a.col, b.col),
          endCol = Math.max(a.col, b.col);

      for (var _i77 = startLine; _i77 <= endLine; _i77++) {
        var _line = state.doc.line(_i77);

        var start = findColumn(_line.text, startCol, state.tabSize, true);

        if (start > -1) {
          var end = findColumn(_line.text, endCol, state.tabSize);
          ranges.push(EditorSelection.range(_line.from + start, _line.from + end));
        }
      }
    }

    return ranges;
  }

  function absoluteColumn(view, x) {
    var ref = view.coordsAtPos(view.viewport.from);
    return ref ? Math.round(Math.abs((ref.left - x) / view.defaultCharacterWidth)) : -1;
  }

  function getPos(view, event) {
    var offset = view.posAtCoords({
      x: event.clientX,
      y: event.clientY
    }, false);
    var line = view.state.doc.lineAt(offset),
        off = offset - line.from;
    var col = off > MaxOff ? -1 : off == line.length ? absoluteColumn(view, event.clientX) : countColumn(line.text, view.state.tabSize, offset - line.from);
    return {
      line: line.number,
      col,
      off
    };
  }

  function rectangleSelectionStyle(view, event) {
    var start = getPos(view, event),
        startSel = view.state.selection;
    if (!start) return null;
    return {
      update(update) {
        if (update.docChanged) {
          var newStart = update.changes.mapPos(update.startState.doc.line(start.line).from);
          var newLine = update.state.doc.lineAt(newStart);
          start = {
            line: newLine.number,
            col: start.col,
            off: Math.min(start.off, newLine.length)
          };
          startSel = startSel.map(update.changes);
        }
      },

      get(event2, _extend, multiple) {
        var cur2 = getPos(view, event2);
        if (!cur2) return startSel;
        var ranges = rectangleFor(view.state, start, cur2);
        if (!ranges.length) return startSel;
        if (multiple) return EditorSelection.create(ranges.concat(startSel.ranges));else return EditorSelection.create(ranges);
      }

    };
  }

  function rectangularSelection(options) {
    var filter = (options === null || options === void 0 ? void 0 : options.eventFilter) || (e => e.altKey && e.button == 0);

    return EditorView.mouseSelectionStyle.of((view, event) => filter(event) ? rectangleSelectionStyle(view, event) : null);
  }

  function crosshairCursor() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _keys = _slicedToArray(keys[options.key || "Alt"], 2),
        code = _keys[0],
        getter = _keys[1];

    var plugin = ViewPlugin.fromClass(class {
      constructor(view) {
        this.view = view;
        this.isDown = false;
      }

      set(isDown) {
        if (this.isDown != isDown) {
          this.isDown = isDown;
          this.view.update([]);
        }
      }

    }, {
      eventHandlers: {
        keydown(e) {
          this.set(e.keyCode == code || getter(e));
        },

        keyup(e) {
          if (e.keyCode == code || !getter(e)) this.set(false);
        }

      }
    });
    return [plugin, EditorView.contentAttributes.of(view => {
      var _a2;

      return ((_a2 = view.plugin(plugin)) === null || _a2 === void 0 ? void 0 : _a2.isDown) ? showCrosshair : null;
    })];
  }

  function windowSpace() {
    return {
      top: 0,
      left: 0,
      bottom: innerHeight,
      right: innerWidth
    };
  }

  function isInTooltip(elt) {
    for (var cur2 = elt; cur2; cur2 = cur2.parentNode) {
      if (cur2.nodeType == 1 && cur2.classList.contains("cm-tooltip")) return true;
    }

    return false;
  }

  function isOverRange(view, from, to, x, y, margin) {
    var range = document.createRange();
    var fromDOM = view.domAtPos(from),
        toDOM = view.domAtPos(to);
    range.setEnd(toDOM.node, toDOM.offset);
    range.setStart(fromDOM.node, fromDOM.offset);
    var rects = range.getClientRects();
    range.detach();

    for (var _i78 = 0; _i78 < rects.length; _i78++) {
      var rect = rects[_i78];
      var dist = Math.max(rect.top - y, y - rect.bottom, rect.left - x, x - rect.right);
      if (dist <= margin) return true;
    }

    return false;
  }

  function hoverTooltip(source) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var setHover = StateEffect.define();
    var hoverState = StateField.define({
      create() {
        return null;
      },

      update(value, tr) {
        if (value && (options.hideOnChange && (tr.docChanged || tr.selection) || options.hideOn && options.hideOn(tr, value))) return null;

        if (value && tr.docChanged) {
          var newPos = tr.changes.mapPos(value.pos, -1, MapMode.TrackDel);
          if (newPos == null) return null;
          var copy = Object.assign( /* @__PURE__ */Object.create(null), value);
          copy.pos = newPos;
          if (value.end != null) copy.end = tr.changes.mapPos(value.end);
          value = copy;
        }

        var _iterator49 = _createForOfIteratorHelper(tr.effects),
            _step49;

        try {
          for (_iterator49.s(); !(_step49 = _iterator49.n()).done;) {
            var effect = _step49.value;
            if (effect.is(setHover)) value = effect.value;
            if (effect.is(closeHoverTooltipEffect)) value = null;
          }
        } catch (err) {
          _iterator49.e(err);
        } finally {
          _iterator49.f();
        }

        return value;
      },

      provide: f => showHoverTooltip.from(f)
    });
    return [hoverState, ViewPlugin.define(view => new HoverPlugin(view, source, hoverState, setHover, options.hoverTime || 300)), showHoverTooltipHost];
  }

  function getTooltip(view, tooltip) {
    var plugin = view.plugin(tooltipPlugin);
    if (!plugin) return null;
    var found = plugin.manager.tooltips.indexOf(tooltip);
    return found < 0 ? null : plugin.manager.tooltipViews[found];
  }

  function getPanel(view, panel) {
    var plugin = view.plugin(panelPlugin);
    var index = plugin ? plugin.specs.indexOf(panel) : -1;
    return index > -1 ? plugin.panels[index] : null;
  }

  function rm(node) {
    var next = node.nextSibling;
    node.remove();
    return next;
  }

  function gutter(config2) {
    return [gutters(), activeGutters.of(Object.assign(Object.assign({}, defaults), config2))];
  }

  function gutters(config2) {
    var result = [gutterView];
    if (config2 && config2.fixed === false) result.push(unfixGutters.of(true));
    return result;
  }

  function asArray2(val) {
    return Array.isArray(val) ? val : [val];
  }

  function advanceCursor(cursor, collect, pos) {
    while (cursor.value && cursor.from <= pos) {
      if (cursor.from == pos) collect.push(cursor.value);
      cursor.next();
    }
  }

  function sameMarkers(a, b) {
    if (a.length != b.length) return false;

    for (var _i79 = 0; _i79 < a.length; _i79++) {
      if (!a[_i79].compare(b[_i79])) return false;
    }

    return true;
  }

  function formatNumber(view, number2) {
    return view.state.facet(lineNumberConfig).formatNumber(number2, view.state);
  }

  function lineNumbers() {
    var config2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return [lineNumberConfig.of(config2), gutters(), lineNumberGutter];
  }

  function maxLineNumber(lines) {
    var last = 9;

    while (last < lines) {
      last = last * 10 + 9;
    }

    return last;
  }

  function highlightActiveLineGutter() {
    return activeLineGutterHighlighter;
  }

  var Rect0, DOMSelectionState, preventScrollSupported, scratchRange, DOMPos, noChildren, ContentView, ChildCursor, nav, doc, ie_edge, ie_upto10, ie_11up, ie2, gecko2, chrome2, webkit, safari2, ios, browser, MaxJoinLen, TextView, MarkView, WidgetView, CompositionView, WidgetBufferView, WidgetType, BlockType, Decoration, MarkDecoration, LineDecoration, PointDecoration, LineView, BlockWidgetView, ContentBuilder, NullWidget, clickAddsSelectionRange, dragMovesSelection$1, mouseSelectionStyle, exceptionSink, updateListener, inputHandler, perLineTextDirection, ScrollTarget, scrollIntoView, editable, nextPluginID, viewPlugin, ViewPlugin, PluginInstance, editorAttributes, contentAttributes, decorations, atomicRanges, scrollMargins, styleModule, ChangedRange, ViewUpdate, Direction, LTR, RTL, LowTypes, ArabicTypes, Brackets, BracketStack, BidiRE, BidiSpan, types, movedOver, LineBreakPlaceholder, DOMReader, DOMPoint, DocView, BlockGapWidget, CompositionWidget, DecorationComparator$1, InputState, PendingKeys, modifierCodes, MouseSelection, handlers, brokenClipboardAPI, lastTouch, insideY, inside, BadMouseDetail, lastMouseDown, lastMouseDownCount, lastMouseDownTime, lastLinewiseCopy, wrappingWhiteSpace, HeightOracle, MeasuredHeights, BlockInfo, QueryType, Epsilon, HeightMap, HeightMapBlock, HeightMapText, HeightMapGap, HeightMapBranch, relevantWidgetHeight, NodeBuilder, DecorationComparator, LineGap, LineGapWidget, ViewState, Viewport, IdScaler, BigScaler, theme, darkTheme, baseThemeID, baseLightID, baseDarkID, lightDarkIDs, baseTheme$1, observeOptions, useCharData, DOMObserver, EditorView, MaxBidiLine, BadMeasure, CachedOrder, currentPlatform, handleKeyEvents, keymap, Keymaps, storedPrefix, PrefixTimeout, CanHidePrimary, selectionConfig, Piece, drawSelectionPlugin, themeSpec, hideNativeSelection, setDropCursorPos, dropCursorPos, drawDropCursor, MatchDecorator, UnicodeRegexpSupport, Specials, Names, _supportsTabSize, specialCharConfig, _plugin, DefaultPlaceholder, SpecialCharWidget, TabWidget, lineDeco, activeLineHighlighter, MaxOff, keys, showCrosshair, Outside, TooltipViewManager, tooltipConfig, tooltipPlugin, baseTheme, noOffset, showTooltip, showHoverTooltip, HoverTooltipHost, showHoverTooltipHost, HoverPlugin, closeHoverTooltipEffect, panelConfig, panelPlugin, PanelGroup, showPanel, GutterMarker, gutterLineClass, defaults, activeGutters, unfixGutters, gutterView, UpdateContext, SingleGutterView, GutterElement, lineNumberMarkers, lineNumberConfig, NumberMarker, lineNumberGutter, activeLineGutterMarker, activeLineGutterHighlighter;

  var init_dist2 = __esm({
    "node_modules/@codemirror/view/dist/index.js"() {
      init_dist();
      init_style_mod();
      init_index_es();
      Rect0 = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      };
      DOMSelectionState = class {
        constructor() {
          this.anchorNode = null;
          this.anchorOffset = 0;
          this.focusNode = null;
          this.focusOffset = 0;
        }

        eq(domSel) {
          return this.anchorNode == domSel.anchorNode && this.anchorOffset == domSel.anchorOffset && this.focusNode == domSel.focusNode && this.focusOffset == domSel.focusOffset;
        }

        setRange(range) {
          this.set(range.anchorNode, range.anchorOffset, range.focusNode, range.focusOffset);
        }

        set(anchorNode, anchorOffset, focusNode, focusOffset) {
          this.anchorNode = anchorNode;
          this.anchorOffset = anchorOffset;
          this.focusNode = focusNode;
          this.focusOffset = focusOffset;
        }

      };
      preventScrollSupported = null;
      DOMPos = class {
        constructor(node, offset) {
          var precise = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
          this.node = node;
          this.offset = offset;
          this.precise = precise;
        }

        static before(dom, precise) {
          return new DOMPos(dom.parentNode, domIndex(dom), precise);
        }

        static after(dom, precise) {
          return new DOMPos(dom.parentNode, domIndex(dom) + 1, precise);
        }

      };
      noChildren = [];
      ContentView = class {
        constructor() {
          this.parent = null;
          this.dom = null;
          this.dirty = 2;
        }

        get editorView() {
          if (!this.parent) throw new Error("Accessing view in orphan content view");
          return this.parent.editorView;
        }

        get overrideDOMText() {
          return null;
        }

        get posAtStart() {
          return this.parent ? this.parent.posBefore(this) : 0;
        }

        get posAtEnd() {
          return this.posAtStart + this.length;
        }

        posBefore(view) {
          var pos = this.posAtStart;

          var _iterator50 = _createForOfIteratorHelper(this.children),
              _step50;

          try {
            for (_iterator50.s(); !(_step50 = _iterator50.n()).done;) {
              var child = _step50.value;
              if (child == view) return pos;
              pos += child.length + child.breakAfter;
            }
          } catch (err) {
            _iterator50.e(err);
          } finally {
            _iterator50.f();
          }

          throw new RangeError("Invalid child in posBefore");
        }

        posAfter(view) {
          return this.posBefore(view) + view.length;
        }

        coordsAt(_pos, _side) {
          return null;
        }

        sync(track) {
          if (this.dirty & 2) {
            var parent = this.dom;
            var prev = null,
                next;

            var _iterator51 = _createForOfIteratorHelper(this.children),
                _step51;

            try {
              for (_iterator51.s(); !(_step51 = _iterator51.n()).done;) {
                var child = _step51.value;

                if (child.dirty) {
                  if (!child.dom && (next = prev ? prev.nextSibling : parent.firstChild)) {
                    var contentView = ContentView.get(next);
                    if (!contentView || !contentView.parent && contentView.constructor == child.constructor) child.reuseDOM(next);
                  }

                  child.sync(track);
                  child.dirty = 0;
                }

                next = prev ? prev.nextSibling : parent.firstChild;
                if (track && !track.written && track.node == parent && next != child.dom) track.written = true;

                if (child.dom.parentNode == parent) {
                  while (next && next != child.dom) {
                    next = rm$1(next);
                  }
                } else {
                  parent.insertBefore(child.dom, next);
                }

                prev = child.dom;
              }
            } catch (err) {
              _iterator51.e(err);
            } finally {
              _iterator51.f();
            }

            next = prev ? prev.nextSibling : parent.firstChild;
            if (next && track && track.node == parent) track.written = true;

            while (next) {
              next = rm$1(next);
            }
          } else if (this.dirty & 1) {
            var _iterator52 = _createForOfIteratorHelper(this.children),
                _step52;

            try {
              for (_iterator52.s(); !(_step52 = _iterator52.n()).done;) {
                var _child = _step52.value;

                if (_child.dirty) {
                  _child.sync(track);

                  _child.dirty = 0;
                }
              }
            } catch (err) {
              _iterator52.e(err);
            } finally {
              _iterator52.f();
            }
          }
        }

        reuseDOM(_dom) {}

        localPosFromDOM(node, offset) {
          var after;

          if (node == this.dom) {
            after = this.dom.childNodes[offset];
          } else {
            var bias = maxOffset(node) == 0 ? 0 : offset == 0 ? -1 : 1;

            for (;;) {
              var parent = node.parentNode;
              if (parent == this.dom) break;

              if (bias == 0 && parent.firstChild != parent.lastChild) {
                if (node == parent.firstChild) bias = -1;else bias = 1;
              }

              node = parent;
            }

            if (bias < 0) after = node;else after = node.nextSibling;
          }

          if (after == this.dom.firstChild) return 0;

          while (after && !ContentView.get(after)) {
            after = after.nextSibling;
          }

          if (!after) return this.length;

          for (var _i80 = 0, pos = 0;; _i80++) {
            var child = this.children[_i80];
            if (child.dom == after) return pos;
            pos += child.length + child.breakAfter;
          }
        }

        domBoundsAround(from, to) {
          var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          var fromI = -1,
              fromStart = -1,
              toI = -1,
              toEnd = -1;

          for (var _i81 = 0, pos = offset, prevEnd = offset; _i81 < this.children.length; _i81++) {
            var child = this.children[_i81],
                end = pos + child.length;
            if (pos < from && end > to) return child.domBoundsAround(from, to, pos);

            if (end >= from && fromI == -1) {
              fromI = _i81;
              fromStart = pos;
            }

            if (pos > to && child.dom.parentNode == this.dom) {
              toI = _i81;
              toEnd = prevEnd;
              break;
            }

            prevEnd = end;
            pos = end + child.breakAfter;
          }

          return {
            from: fromStart,
            to: toEnd < 0 ? offset + this.length : toEnd,
            startDOM: (fromI ? this.children[fromI - 1].dom.nextSibling : null) || this.dom.firstChild,
            endDOM: toI < this.children.length && toI >= 0 ? this.children[toI].dom : null
          };
        }

        markDirty() {
          var andParent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          this.dirty |= 2;
          this.markParentsDirty(andParent);
        }

        markParentsDirty(childList) {
          for (var parent = this.parent; parent; parent = parent.parent) {
            if (childList) parent.dirty |= 2;
            if (parent.dirty & 1) return;
            parent.dirty |= 1;
            childList = false;
          }
        }

        setParent(parent) {
          if (this.parent != parent) {
            this.parent = parent;
            if (this.dirty) this.markParentsDirty(true);
          }
        }

        setDOM(dom) {
          if (this.dom) this.dom.cmView = null;
          this.dom = dom;
          dom.cmView = this;
        }

        get rootView() {
          for (var v = this;;) {
            var parent = v.parent;
            if (!parent) return v;
            v = parent;
          }
        }

        replaceChildren(from, to) {
          var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noChildren;
          this.markDirty();

          for (var _i82 = from; _i82 < to; _i82++) {
            var child = this.children[_i82];
            if (child.parent == this) child.destroy();
          }

          this.children.splice(from, to - from, ...children);

          for (var _i83 = 0; _i83 < children.length; _i83++) {
            children[_i83].setParent(this);
          }
        }

        ignoreMutation(_rec) {
          return false;
        }

        ignoreEvent(_event) {
          return false;
        }

        childCursor() {
          var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.length;
          return new ChildCursor(this.children, pos, this.children.length);
        }

        childPos(pos) {
          var bias = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
          return this.childCursor().findPos(pos, bias);
        }

        toString() {
          var name2 = this.constructor.name.replace("View", "");
          return name2 + (this.children.length ? "(" + this.children.join() + ")" : this.length ? "[" + (name2 == "Text" ? this.text : this.length) + "]" : "") + (this.breakAfter ? "#" : "");
        }

        static get(node) {
          return node.cmView;
        }

        get isEditable() {
          return true;
        }

        merge(from, to, source, hasStart, openStart, openEnd) {
          return false;
        }

        become(other) {
          return false;
        }

        getSide() {
          return 0;
        }

        destroy() {
          this.parent = null;
        }

      };
      ContentView.prototype.breakAfter = 0;
      ChildCursor = class {
        constructor(children, pos, i) {
          this.children = children;
          this.pos = pos;
          this.i = i;
          this.off = 0;
        }

        findPos(pos) {
          var bias = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

          for (;;) {
            if (pos > this.pos || pos == this.pos && (bias > 0 || this.i == 0 || this.children[this.i - 1].breakAfter)) {
              this.off = pos - this.pos;
              return this;
            }

            var next = this.children[--this.i];
            this.pos -= next.length + next.breakAfter;
          }
        }

      };
      nav = typeof navigator != "undefined" ? navigator : {
        userAgent: "",
        vendor: "",
        platform: ""
      };
      doc = typeof document != "undefined" ? document : {
        documentElement: {
          style: {}
        }
      };
      ie_edge = /* @__PURE__ */ /Edge\/(\d+)/.exec(nav.userAgent);
      ie_upto10 = /* @__PURE__ */ /MSIE \d/.test(nav.userAgent);
      ie_11up = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(nav.userAgent);
      ie2 = !!(ie_upto10 || ie_11up || ie_edge);
      gecko2 = !ie2 && /* @__PURE__ */ /gecko\/(\d+)/i.test(nav.userAgent);
      chrome2 = !ie2 && /* @__PURE__ */ /Chrome\/(\d+)/.exec(nav.userAgent);
      webkit = "webkitFontSmoothing" in doc.documentElement.style;
      safari2 = !ie2 && /* @__PURE__ */ /Apple Computer/.test(nav.vendor);
      ios = safari2 && ( /* @__PURE__ */ /Mobile\/\w+/.test(nav.userAgent) || nav.maxTouchPoints > 2);
      browser = {
        mac: ios || /* @__PURE__ */ /Mac/.test(nav.platform),
        windows: /* @__PURE__ */ /Win/.test(nav.platform),
        linux: /* @__PURE__ */ /Linux|X11/.test(nav.platform),
        ie: ie2,
        ie_version: ie_upto10 ? doc.documentMode || 6 : ie_11up ? +ie_11up[1] : ie_edge ? +ie_edge[1] : 0,
        gecko: gecko2,
        gecko_version: gecko2 ? +( /* @__PURE__ */ /Firefox\/(\d+)/.exec(nav.userAgent) || [0, 0])[1] : 0,
        chrome: !!chrome2,
        chrome_version: chrome2 ? +chrome2[1] : 0,
        ios,
        android: /* @__PURE__ */ /Android\b/.test(nav.userAgent),
        webkit,
        safari: safari2,
        webkit_version: webkit ? +( /* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0,
        tabSize: doc.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
      };
      MaxJoinLen = 256;
      TextView = class extends ContentView {
        constructor(text) {
          super();
          this.text = text;
        }

        get length() {
          return this.text.length;
        }

        createDOM(textDOM) {
          this.setDOM(textDOM || document.createTextNode(this.text));
        }

        sync(track) {
          if (!this.dom) this.createDOM();

          if (this.dom.nodeValue != this.text) {
            if (track && track.node == this.dom) track.written = true;
            this.dom.nodeValue = this.text;
          }
        }

        reuseDOM(dom) {
          if (dom.nodeType == 3) this.createDOM(dom);
        }

        merge(from, to, source) {
          if (source && (!(source instanceof TextView) || this.length - (to - from) + source.length > MaxJoinLen)) return false;
          this.text = this.text.slice(0, from) + (source ? source.text : "") + this.text.slice(to);
          this.markDirty();
          return true;
        }

        split(from) {
          var result = new TextView(this.text.slice(from));
          this.text = this.text.slice(0, from);
          this.markDirty();
          return result;
        }

        localPosFromDOM(node, offset) {
          return node == this.dom ? offset : offset ? this.text.length : 0;
        }

        domAtPos(pos) {
          return new DOMPos(this.dom, pos);
        }

        domBoundsAround(_from, _to, offset) {
          return {
            from: offset,
            to: offset + this.length,
            startDOM: this.dom,
            endDOM: this.dom.nextSibling
          };
        }

        coordsAt(pos, side) {
          return textCoords(this.dom, pos, side);
        }

      };
      MarkView = class extends ContentView {
        constructor(mark) {
          var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
          var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          super();
          this.mark = mark;
          this.children = children;
          this.length = length;

          var _iterator53 = _createForOfIteratorHelper(children),
              _step53;

          try {
            for (_iterator53.s(); !(_step53 = _iterator53.n()).done;) {
              var ch = _step53.value;
              ch.setParent(this);
            }
          } catch (err) {
            _iterator53.e(err);
          } finally {
            _iterator53.f();
          }
        }

        setAttrs(dom) {
          clearAttributes(dom);
          if (this.mark.class) dom.className = this.mark.class;
          if (this.mark.attrs) for (var name2 in this.mark.attrs) {
            dom.setAttribute(name2, this.mark.attrs[name2]);
          }
          return dom;
        }

        reuseDOM(node) {
          if (node.nodeName == this.mark.tagName.toUpperCase()) {
            this.setDOM(node);
            this.dirty |= 4 | 2;
          }
        }

        sync(track) {
          if (!this.dom) this.setDOM(this.setAttrs(document.createElement(this.mark.tagName)));else if (this.dirty & 4) this.setAttrs(this.dom);
          super.sync(track);
        }

        merge(from, to, source, _hasStart, openStart, openEnd) {
          if (source && (!(source instanceof MarkView && source.mark.eq(this.mark)) || from && openStart <= 0 || to < this.length && openEnd <= 0)) return false;
          mergeChildrenInto(this, from, to, source ? source.children : [], openStart - 1, openEnd - 1);
          this.markDirty();
          return true;
        }

        split(from) {
          var result = [],
              off = 0,
              detachFrom = -1,
              i = 0;

          var _iterator54 = _createForOfIteratorHelper(this.children),
              _step54;

          try {
            for (_iterator54.s(); !(_step54 = _iterator54.n()).done;) {
              var elt = _step54.value;
              var end = off + elt.length;
              if (end > from) result.push(off < from ? elt.split(from - off) : elt);
              if (detachFrom < 0 && off >= from) detachFrom = i;
              off = end;
              i++;
            }
          } catch (err) {
            _iterator54.e(err);
          } finally {
            _iterator54.f();
          }

          var length = this.length - from;
          this.length = from;

          if (detachFrom > -1) {
            this.children.length = detachFrom;
            this.markDirty();
          }

          return new MarkView(this.mark, result, length);
        }

        domAtPos(pos) {
          return inlineDOMAtPos(this.dom, this.children, pos);
        }

        coordsAt(pos, side) {
          return coordsInChildren(this, pos, side);
        }

      };
      WidgetView = class extends ContentView {
        constructor(widget, length, side) {
          super();
          this.widget = widget;
          this.length = length;
          this.side = side;
          this.prevWidget = null;
        }

        static create(widget, length, side) {
          return new (widget.customView || WidgetView)(widget, length, side);
        }

        split(from) {
          var result = WidgetView.create(this.widget, this.length - from, this.side);
          this.length -= from;
          return result;
        }

        sync() {
          if (!this.dom || !this.widget.updateDOM(this.dom)) {
            if (this.dom && this.prevWidget) this.prevWidget.destroy(this.dom);
            this.prevWidget = null;
            this.setDOM(this.widget.toDOM(this.editorView));
            this.dom.contentEditable = "false";
          }
        }

        getSide() {
          return this.side;
        }

        merge(from, to, source, hasStart, openStart, openEnd) {
          if (source && (!(source instanceof WidgetView) || !this.widget.compare(source.widget) || from > 0 && openStart <= 0 || to < this.length && openEnd <= 0)) return false;
          this.length = from + (source ? source.length : 0) + (this.length - to);
          return true;
        }

        become(other) {
          if (other.length == this.length && other instanceof WidgetView && other.side == this.side) {
            if (this.widget.constructor == other.widget.constructor) {
              if (!this.widget.eq(other.widget)) this.markDirty(true);
              if (this.dom && !this.prevWidget) this.prevWidget = this.widget;
              this.widget = other.widget;
              return true;
            }
          }

          return false;
        }

        ignoreMutation() {
          return true;
        }

        ignoreEvent(event) {
          return this.widget.ignoreEvent(event);
        }

        get overrideDOMText() {
          if (this.length == 0) return Text.empty;
          var top2 = this;

          while (top2.parent) {
            top2 = top2.parent;
          }

          var view = top2.editorView,
              text = view && view.state.doc,
              start = this.posAtStart;
          return text ? text.slice(start, start + this.length) : Text.empty;
        }

        domAtPos(pos) {
          return pos == 0 ? DOMPos.before(this.dom) : DOMPos.after(this.dom, pos == this.length);
        }

        domBoundsAround() {
          return null;
        }

        coordsAt(pos, side) {
          var rects = this.dom.getClientRects(),
              rect = null;
          if (!rects.length) return Rect0;

          for (var _i84 = pos > 0 ? rects.length - 1 : 0;; _i84 += pos > 0 ? -1 : 1) {
            rect = rects[_i84];
            if (pos > 0 ? _i84 == 0 : _i84 == rects.length - 1 || rect.top < rect.bottom) break;
          }

          return pos == 0 && side > 0 || pos == this.length && side <= 0 ? rect : flattenRect(rect, pos == 0);
        }

        get isEditable() {
          return false;
        }

        destroy() {
          super.destroy();
          if (this.dom) this.widget.destroy(this.dom);
        }

      };
      CompositionView = class extends WidgetView {
        domAtPos(pos) {
          var _this$widget = this.widget,
              topView = _this$widget.topView,
              text = _this$widget.text;
          if (!topView) return new DOMPos(text, Math.min(pos, text.nodeValue.length));
          return scanCompositionTree(pos, 0, topView, text, (v, p) => v.domAtPos(p), p => new DOMPos(text, Math.min(p, text.nodeValue.length)));
        }

        sync() {
          this.setDOM(this.widget.toDOM());
        }

        localPosFromDOM(node, offset) {
          var _this$widget2 = this.widget,
              topView = _this$widget2.topView,
              text = _this$widget2.text;
          if (!topView) return Math.min(offset, this.length);
          return posFromDOMInCompositionTree(node, offset, topView, text);
        }

        ignoreMutation() {
          return false;
        }

        get overrideDOMText() {
          return null;
        }

        coordsAt(pos, side) {
          var _this$widget3 = this.widget,
              topView = _this$widget3.topView,
              text = _this$widget3.text;
          if (!topView) return textCoords(text, pos, side);
          return scanCompositionTree(pos, side, topView, text, (v, pos2, side2) => v.coordsAt(pos2, side2), (pos2, side2) => textCoords(text, pos2, side2));
        }

        destroy() {
          var _a2;

          super.destroy();
          (_a2 = this.widget.topView) === null || _a2 === void 0 ? void 0 : _a2.destroy();
        }

        get isEditable() {
          return true;
        }

      };
      WidgetBufferView = class extends ContentView {
        constructor(side) {
          super();
          this.side = side;
        }

        get length() {
          return 0;
        }

        merge() {
          return false;
        }

        become(other) {
          return other instanceof WidgetBufferView && other.side == this.side;
        }

        split() {
          return new WidgetBufferView(this.side);
        }

        sync() {
          if (!this.dom) {
            var dom = document.createElement("img");
            dom.className = "cm-widgetBuffer";
            dom.setAttribute("aria-hidden", "true");
            this.setDOM(dom);
          }
        }

        getSide() {
          return this.side;
        }

        domAtPos(pos) {
          return DOMPos.before(this.dom);
        }

        localPosFromDOM() {
          return 0;
        }

        domBoundsAround() {
          return null;
        }

        coordsAt(pos) {
          var imgRect = this.dom.getBoundingClientRect();
          var siblingRect = inlineSiblingRect(this, this.side > 0 ? -1 : 1);
          return siblingRect && siblingRect.top < imgRect.bottom && siblingRect.bottom > imgRect.top ? {
            left: imgRect.left,
            right: imgRect.right,
            top: siblingRect.top,
            bottom: siblingRect.bottom
          } : imgRect;
        }

        get overrideDOMText() {
          return Text.empty;
        }

      };
      TextView.prototype.children = WidgetView.prototype.children = WidgetBufferView.prototype.children = noChildren;
      WidgetType = class {
        eq(widget) {
          return false;
        }

        updateDOM(dom) {
          return false;
        }

        compare(other) {
          return this == other || this.constructor == other.constructor && this.eq(other);
        }

        get estimatedHeight() {
          return -1;
        }

        ignoreEvent(event) {
          return true;
        }

        get customView() {
          return null;
        }

        destroy(dom) {}

      };

      BlockType = /* @__PURE__ */function (BlockType2) {
        BlockType2[BlockType2["Text"] = 0] = "Text";
        BlockType2[BlockType2["WidgetBefore"] = 1] = "WidgetBefore";
        BlockType2[BlockType2["WidgetAfter"] = 2] = "WidgetAfter";
        BlockType2[BlockType2["WidgetRange"] = 3] = "WidgetRange";
        return BlockType2;
      }(BlockType || (BlockType = {}));

      Decoration = class extends RangeValue {
        constructor(startSide, endSide, widget, spec) {
          super();
          this.startSide = startSide;
          this.endSide = endSide;
          this.widget = widget;
          this.spec = spec;
        }

        get heightRelevant() {
          return false;
        }

        static mark(spec) {
          return new MarkDecoration(spec);
        }

        static widget(spec) {
          var side = spec.side || 0,
              block = !!spec.block;
          side += block ? side > 0 ? 3e8 : -4e8 : side > 0 ? 1e8 : -1e8;
          return new PointDecoration(spec, side, side, block, spec.widget || null, false);
        }

        static replace(spec) {
          var block = !!spec.block,
              startSide,
              endSide;

          if (spec.isBlockGap) {
            startSide = -5e8;
            endSide = 4e8;
          } else {
            var _getInclusive = getInclusive(spec, block),
                start = _getInclusive.start,
                end = _getInclusive.end;

            startSide = (start ? block ? -3e8 : -1 : 5e8) - 1;
            endSide = (end ? block ? 2e8 : 1 : -6e8) + 1;
          }

          return new PointDecoration(spec, startSide, endSide, block, spec.widget || null, true);
        }

        static line(spec) {
          return new LineDecoration(spec);
        }

        static set(of) {
          var sort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          return RangeSet.of(of, sort);
        }

        hasHeight() {
          return this.widget ? this.widget.estimatedHeight > -1 : false;
        }

      };
      Decoration.none = RangeSet.empty;
      MarkDecoration = class extends Decoration {
        constructor(spec) {
          var _getInclusive2 = getInclusive(spec),
              start = _getInclusive2.start,
              end = _getInclusive2.end;

          super(start ? -1 : 5e8, end ? 1 : -6e8, null, spec);
          this.tagName = spec.tagName || "span";
          this.class = spec.class || "";
          this.attrs = spec.attributes || null;
        }

        eq(other) {
          return this == other || other instanceof MarkDecoration && this.tagName == other.tagName && this.class == other.class && attrsEq(this.attrs, other.attrs);
        }

        range(from) {
          var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : from;
          if (from >= to) throw new RangeError("Mark decorations may not be empty");
          return super.range(from, to);
        }

      };
      MarkDecoration.prototype.point = false;
      LineDecoration = class extends Decoration {
        constructor(spec) {
          super(-2e8, -2e8, null, spec);
        }

        eq(other) {
          return other instanceof LineDecoration && attrsEq(this.spec.attributes, other.spec.attributes);
        }

        range(from) {
          var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : from;
          if (to != from) throw new RangeError("Line decoration ranges must be zero-length");
          return super.range(from, to);
        }

      };
      LineDecoration.prototype.mapMode = MapMode.TrackBefore;
      LineDecoration.prototype.point = true;
      PointDecoration = class extends Decoration {
        constructor(spec, startSide, endSide, block, widget, isReplace) {
          super(startSide, endSide, widget, spec);
          this.block = block;
          this.isReplace = isReplace;
          this.mapMode = !block ? MapMode.TrackDel : startSide <= 0 ? MapMode.TrackBefore : MapMode.TrackAfter;
        }

        get type() {
          return this.startSide < this.endSide ? BlockType.WidgetRange : this.startSide <= 0 ? BlockType.WidgetBefore : BlockType.WidgetAfter;
        }

        get heightRelevant() {
          return this.block || !!this.widget && this.widget.estimatedHeight >= 5;
        }

        eq(other) {
          return other instanceof PointDecoration && widgetsEq(this.widget, other.widget) && this.block == other.block && this.startSide == other.startSide && this.endSide == other.endSide;
        }

        range(from) {
          var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : from;
          if (this.isReplace && (from > to || from == to && this.startSide > 0 && this.endSide <= 0)) throw new RangeError("Invalid range for replacement decoration");
          if (!this.isReplace && to != from) throw new RangeError("Widget decorations can only have zero-length ranges");
          return super.range(from, to);
        }

      };
      PointDecoration.prototype.point = true;
      LineView = class extends ContentView {
        constructor() {
          super(...arguments);
          this.children = [];
          this.length = 0;
          this.prevAttrs = void 0;
          this.attrs = null;
          this.breakAfter = 0;
        }

        merge(from, to, source, hasStart, openStart, openEnd) {
          if (source) {
            if (!(source instanceof LineView)) return false;
            if (!this.dom) source.transferDOM(this);
          }

          if (hasStart) this.setDeco(source ? source.attrs : null);
          mergeChildrenInto(this, from, to, source ? source.children : [], openStart, openEnd);
          return true;
        }

        split(at) {
          var end = new LineView();
          end.breakAfter = this.breakAfter;
          if (this.length == 0) return end;

          var _this$childPos = this.childPos(at),
              i = _this$childPos.i,
              off = _this$childPos.off;

          if (off) {
            end.append(this.children[i].split(off), 0);
            this.children[i].merge(off, this.children[i].length, null, false, 0, 0);
            i++;
          }

          for (var j = i; j < this.children.length; j++) {
            end.append(this.children[j], 0);
          }

          while (i > 0 && this.children[i - 1].length == 0) {
            this.children[--i].destroy();
          }

          this.children.length = i;
          this.markDirty();
          this.length = at;
          return end;
        }

        transferDOM(other) {
          if (!this.dom) return;
          this.markDirty();
          other.setDOM(this.dom);
          other.prevAttrs = this.prevAttrs === void 0 ? this.attrs : this.prevAttrs;
          this.prevAttrs = void 0;
          this.dom = null;
        }

        setDeco(attrs) {
          if (!attrsEq(this.attrs, attrs)) {
            if (this.dom) {
              this.prevAttrs = this.attrs;
              this.markDirty();
            }

            this.attrs = attrs;
          }
        }

        append(child, openStart) {
          joinInlineInto(this, child, openStart);
        }

        addLineDeco(deco) {
          var attrs = deco.spec.attributes,
              cls = deco.spec.class;
          if (attrs) this.attrs = combineAttrs(attrs, this.attrs || {});
          if (cls) this.attrs = combineAttrs({
            class: cls
          }, this.attrs || {});
        }

        domAtPos(pos) {
          return inlineDOMAtPos(this.dom, this.children, pos);
        }

        reuseDOM(node) {
          if (node.nodeName == "DIV") {
            this.setDOM(node);
            this.dirty |= 4 | 2;
          }
        }

        sync(track) {
          var _a2;

          if (!this.dom) {
            this.setDOM(document.createElement("div"));
            this.dom.className = "cm-line";
            this.prevAttrs = this.attrs ? null : void 0;
          } else if (this.dirty & 4) {
            clearAttributes(this.dom);
            this.dom.className = "cm-line";
            this.prevAttrs = this.attrs ? null : void 0;
          }

          if (this.prevAttrs !== void 0) {
            updateAttrs(this.dom, this.prevAttrs, this.attrs);
            this.dom.classList.add("cm-line");
            this.prevAttrs = void 0;
          }

          super.sync(track);
          var last = this.dom.lastChild;

          while (last && ContentView.get(last) instanceof MarkView) {
            last = last.lastChild;
          }

          if (!last || !this.length || last.nodeName != "BR" && ((_a2 = ContentView.get(last)) === null || _a2 === void 0 ? void 0 : _a2.isEditable) == false && (!browser.ios || !this.children.some(ch => ch instanceof TextView))) {
            var hack = document.createElement("BR");
            hack.cmIgnore = true;
            this.dom.appendChild(hack);
          }
        }

        measureTextSize() {
          if (this.children.length == 0 || this.length > 20) return null;
          var totalWidth = 0;

          var _iterator55 = _createForOfIteratorHelper(this.children),
              _step55;

          try {
            for (_iterator55.s(); !(_step55 = _iterator55.n()).done;) {
              var child = _step55.value;
              if (!(child instanceof TextView)) return null;
              var rects = clientRectsFor(child.dom);
              if (rects.length != 1) return null;
              totalWidth += rects[0].width;
            }
          } catch (err) {
            _iterator55.e(err);
          } finally {
            _iterator55.f();
          }

          return {
            lineHeight: this.dom.getBoundingClientRect().height,
            charWidth: totalWidth / this.length
          };
        }

        coordsAt(pos, side) {
          return coordsInChildren(this, pos, side);
        }

        become(_other) {
          return false;
        }

        get type() {
          return BlockType.Text;
        }

        static find(docView, pos) {
          for (var _i85 = 0, off = 0; _i85 < docView.children.length; _i85++) {
            var block = docView.children[_i85],
                end = off + block.length;

            if (end >= pos) {
              if (block instanceof LineView) return block;
              if (end > pos) break;
            }

            off = end + block.breakAfter;
          }

          return null;
        }

      };
      BlockWidgetView = class extends ContentView {
        constructor(widget, length, type) {
          super();
          this.widget = widget;
          this.length = length;
          this.type = type;
          this.breakAfter = 0;
          this.prevWidget = null;
        }

        merge(from, to, source, _takeDeco, openStart, openEnd) {
          if (source && (!(source instanceof BlockWidgetView) || !this.widget.compare(source.widget) || from > 0 && openStart <= 0 || to < this.length && openEnd <= 0)) return false;
          this.length = from + (source ? source.length : 0) + (this.length - to);
          return true;
        }

        domAtPos(pos) {
          return pos == 0 ? DOMPos.before(this.dom) : DOMPos.after(this.dom, pos == this.length);
        }

        split(at) {
          var len = this.length - at;
          this.length = at;
          var end = new BlockWidgetView(this.widget, len, this.type);
          end.breakAfter = this.breakAfter;
          return end;
        }

        get children() {
          return noChildren;
        }

        sync() {
          if (!this.dom || !this.widget.updateDOM(this.dom)) {
            if (this.dom && this.prevWidget) this.prevWidget.destroy(this.dom);
            this.prevWidget = null;
            this.setDOM(this.widget.toDOM(this.editorView));
            this.dom.contentEditable = "false";
          }
        }

        get overrideDOMText() {
          return this.parent ? this.parent.view.state.doc.slice(this.posAtStart, this.posAtEnd) : Text.empty;
        }

        domBoundsAround() {
          return null;
        }

        become(other) {
          if (other instanceof BlockWidgetView && other.type == this.type && other.widget.constructor == this.widget.constructor) {
            if (!other.widget.eq(this.widget)) this.markDirty(true);
            if (this.dom && !this.prevWidget) this.prevWidget = this.widget;
            this.widget = other.widget;
            this.length = other.length;
            this.breakAfter = other.breakAfter;
            return true;
          }

          return false;
        }

        ignoreMutation() {
          return true;
        }

        ignoreEvent(event) {
          return this.widget.ignoreEvent(event);
        }

        destroy() {
          super.destroy();
          if (this.dom) this.widget.destroy(this.dom);
        }

      };
      ContentBuilder = class {
        constructor(doc2, pos, end, disallowBlockEffectsFor) {
          this.doc = doc2;
          this.pos = pos;
          this.end = end;
          this.disallowBlockEffectsFor = disallowBlockEffectsFor;
          this.content = [];
          this.curLine = null;
          this.breakAtStart = 0;
          this.pendingBuffer = 0;
          this.atCursorPos = true;
          this.openStart = -1;
          this.openEnd = -1;
          this.text = "";
          this.textOff = 0;
          this.cursor = doc2.iter();
          this.skip = pos;
        }

        posCovered() {
          if (this.content.length == 0) return !this.breakAtStart && this.doc.lineAt(this.pos).from != this.pos;
          var last = this.content[this.content.length - 1];
          return !last.breakAfter && !(last instanceof BlockWidgetView && last.type == BlockType.WidgetBefore);
        }

        getLine() {
          if (!this.curLine) {
            this.content.push(this.curLine = new LineView());
            this.atCursorPos = true;
          }

          return this.curLine;
        }

        flushBuffer(active) {
          if (this.pendingBuffer) {
            this.curLine.append(wrapMarks(new WidgetBufferView(-1), active), active.length);
            this.pendingBuffer = 0;
          }
        }

        addBlockWidget(view) {
          this.flushBuffer([]);
          this.curLine = null;
          this.content.push(view);
        }

        finish(openEnd) {
          if (!openEnd) this.flushBuffer([]);else this.pendingBuffer = 0;
          if (!this.posCovered()) this.getLine();
        }

        buildText(length, active, openStart) {
          while (length > 0) {
            if (this.textOff == this.text.length) {
              var _this$cursor$next2 = this.cursor.next(this.skip),
                  value = _this$cursor$next2.value,
                  lineBreak = _this$cursor$next2.lineBreak,
                  done = _this$cursor$next2.done;

              this.skip = 0;
              if (done) throw new Error("Ran out of text content when drawing inline views");

              if (lineBreak) {
                if (!this.posCovered()) this.getLine();
                if (this.content.length) this.content[this.content.length - 1].breakAfter = 1;else this.breakAtStart = 1;
                this.flushBuffer([]);
                this.curLine = null;
                length--;
                continue;
              } else {
                this.text = value;
                this.textOff = 0;
              }
            }

            var take = Math.min(this.text.length - this.textOff, length, 512);
            this.flushBuffer(active.slice(0, openStart));
            this.getLine().append(wrapMarks(new TextView(this.text.slice(this.textOff, this.textOff + take)), active), openStart);
            this.atCursorPos = true;
            this.textOff += take;
            length -= take;
            openStart = 0;
          }
        }

        span(from, to, active, openStart) {
          this.buildText(to - from, active, openStart);
          this.pos = to;
          if (this.openStart < 0) this.openStart = openStart;
        }

        point(from, to, deco, active, openStart, index) {
          if (this.disallowBlockEffectsFor[index] && deco instanceof PointDecoration) {
            if (deco.block) throw new RangeError("Block decorations may not be specified via plugins");
            if (to > this.doc.lineAt(this.pos).to) throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
          }

          var len = to - from;

          if (deco instanceof PointDecoration) {
            if (deco.block) {
              var type = deco.type;
              if (type == BlockType.WidgetAfter && !this.posCovered()) this.getLine();
              this.addBlockWidget(new BlockWidgetView(deco.widget || new NullWidget("div"), len, type));
            } else {
              var view = WidgetView.create(deco.widget || new NullWidget("span"), len, deco.startSide);
              var cursorBefore = this.atCursorPos && !view.isEditable && openStart <= active.length && (from < to || deco.startSide > 0);
              var cursorAfter = !view.isEditable && (from < to || deco.startSide <= 0);
              var line = this.getLine();
              if (this.pendingBuffer == 2 && !cursorBefore) this.pendingBuffer = 0;
              this.flushBuffer(active);

              if (cursorBefore) {
                line.append(wrapMarks(new WidgetBufferView(1), active), openStart);
                openStart = active.length + Math.max(0, openStart - active.length);
              }

              line.append(wrapMarks(view, active), openStart);
              this.atCursorPos = cursorAfter;
              this.pendingBuffer = !cursorAfter ? 0 : from < to ? 1 : 2;
            }
          } else if (this.doc.lineAt(this.pos).from == this.pos) {
            this.getLine().addLineDeco(deco);
          }

          if (len) {
            if (this.textOff + len <= this.text.length) {
              this.textOff += len;
            } else {
              this.skip += len - (this.text.length - this.textOff);
              this.text = "";
              this.textOff = 0;
            }

            this.pos = to;
          }

          if (this.openStart < 0) this.openStart = openStart;
        }

        static build(text, from, to, decorations2, dynamicDecorationMap) {
          var builder = new ContentBuilder(text, from, to, dynamicDecorationMap);
          builder.openEnd = RangeSet.spans(decorations2, from, to, builder);
          if (builder.openStart < 0) builder.openStart = builder.openEnd;
          builder.finish(builder.openEnd);
          return builder;
        }

      };
      NullWidget = class extends WidgetType {
        constructor(tag) {
          super();
          this.tag = tag;
        }

        eq(other) {
          return other.tag == this.tag;
        }

        toDOM() {
          return document.createElement(this.tag);
        }

        updateDOM(elt) {
          return elt.nodeName.toLowerCase() == this.tag;
        }

      };
      clickAddsSelectionRange = /* @__PURE__ */Facet.define();
      dragMovesSelection$1 = /* @__PURE__ */Facet.define();
      mouseSelectionStyle = /* @__PURE__ */Facet.define();
      exceptionSink = /* @__PURE__ */Facet.define();
      updateListener = /* @__PURE__ */Facet.define();
      inputHandler = /* @__PURE__ */Facet.define();
      perLineTextDirection = /* @__PURE__ */Facet.define({
        combine: values => values.some(x => x)
      });
      ScrollTarget = class {
        constructor(range) {
          var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "nearest";
          var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "nearest";
          var yMargin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;
          var xMargin = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 5;
          this.range = range;
          this.y = y;
          this.x = x;
          this.yMargin = yMargin;
          this.xMargin = xMargin;
        }

        map(changes) {
          return changes.empty ? this : new ScrollTarget(this.range.map(changes), this.y, this.x, this.yMargin, this.xMargin);
        }

      };
      scrollIntoView = /* @__PURE__ */StateEffect.define({
        map: (t2, ch) => t2.map(ch)
      });
      editable = /* @__PURE__ */Facet.define({
        combine: values => values.length ? values[0] : true
      });
      nextPluginID = 0;
      viewPlugin = /* @__PURE__ */Facet.define();
      ViewPlugin = class {
        constructor(id, create, domEventHandlers, buildExtensions) {
          this.id = id;
          this.create = create;
          this.domEventHandlers = domEventHandlers;
          this.extension = buildExtensions(this);
        }

        static define(create, spec) {
          var _ref8 = spec || {},
              eventHandlers = _ref8.eventHandlers,
              provide = _ref8.provide,
              deco = _ref8.decorations;

          return new ViewPlugin(nextPluginID++, create, eventHandlers, plugin => {
            var ext = [viewPlugin.of(plugin)];
            if (deco) ext.push(decorations.of(view => {
              var pluginInst = view.plugin(plugin);
              return pluginInst ? deco(pluginInst) : Decoration.none;
            }));
            if (provide) ext.push(provide(plugin));
            return ext;
          });
        }

        static fromClass(cls, spec) {
          return ViewPlugin.define(view => new cls(view), spec);
        }

      };
      PluginInstance = class {
        constructor(spec) {
          this.spec = spec;
          this.mustUpdate = null;
          this.value = null;
        }

        update(view) {
          if (!this.value) {
            if (this.spec) {
              try {
                this.value = this.spec.create(view);
              } catch (e) {
                logException(view.state, e, "CodeMirror plugin crashed");
                this.deactivate();
              }
            }
          } else if (this.mustUpdate) {
            var update = this.mustUpdate;
            this.mustUpdate = null;

            if (this.value.update) {
              try {
                this.value.update(update);
              } catch (e) {
                logException(update.state, e, "CodeMirror plugin crashed");
                if (this.value.destroy) try {
                  this.value.destroy();
                } catch (_) {}
                this.deactivate();
              }
            }
          }

          return this;
        }

        destroy(view) {
          var _a2;

          if ((_a2 = this.value) === null || _a2 === void 0 ? void 0 : _a2.destroy) {
            try {
              this.value.destroy();
            } catch (e) {
              logException(view.state, e, "CodeMirror plugin crashed");
            }
          }
        }

        deactivate() {
          this.spec = this.value = null;
        }

      };
      editorAttributes = /* @__PURE__ */Facet.define();
      contentAttributes = /* @__PURE__ */Facet.define();
      decorations = /* @__PURE__ */Facet.define();
      atomicRanges = /* @__PURE__ */Facet.define();
      scrollMargins = /* @__PURE__ */Facet.define();
      styleModule = /* @__PURE__ */Facet.define();
      ChangedRange = class {
        constructor(fromA, toA, fromB, toB) {
          this.fromA = fromA;
          this.toA = toA;
          this.fromB = fromB;
          this.toB = toB;
        }

        join(other) {
          return new ChangedRange(Math.min(this.fromA, other.fromA), Math.max(this.toA, other.toA), Math.min(this.fromB, other.fromB), Math.max(this.toB, other.toB));
        }

        addToSet(set) {
          var i = set.length,
              me = this;

          for (; i > 0; i--) {
            var range = set[i - 1];
            if (range.fromA > me.toA) continue;
            if (range.toA < me.fromA) break;
            me = me.join(range);
            set.splice(i - 1, 1);
          }

          set.splice(i, 0, me);
          return set;
        }

        static extendWithRanges(diff, ranges) {
          if (ranges.length == 0) return diff;
          var result = [];

          for (var dI = 0, rI = 0, posA = 0, posB = 0;; dI++) {
            var next = dI == diff.length ? null : diff[dI],
                off = posA - posB;
            var end = next ? next.fromB : 1e9;

            while (rI < ranges.length && ranges[rI] < end) {
              var from = ranges[rI],
                  to = ranges[rI + 1];
              var fromB = Math.max(posB, from),
                  toB = Math.min(end, to);
              if (fromB <= toB) new ChangedRange(fromB + off, toB + off, fromB, toB).addToSet(result);
              if (to > end) break;else rI += 2;
            }

            if (!next) return result;
            new ChangedRange(next.fromA, next.toA, next.fromB, next.toB).addToSet(result);
            posA = next.toA;
            posB = next.toB;
          }
        }

      };
      ViewUpdate = class {
        constructor(view, state, transactions) {
          this.view = view;
          this.state = state;
          this.transactions = transactions;
          this.flags = 0;
          this.startState = view.state;
          this.changes = ChangeSet.empty(this.startState.doc.length);

          var _iterator56 = _createForOfIteratorHelper(transactions),
              _step56;

          try {
            for (_iterator56.s(); !(_step56 = _iterator56.n()).done;) {
              var tr = _step56.value;
              this.changes = this.changes.compose(tr.changes);
            }
          } catch (err) {
            _iterator56.e(err);
          } finally {
            _iterator56.f();
          }

          var changedRanges = [];
          this.changes.iterChangedRanges((fromA, toA, fromB, toB) => changedRanges.push(new ChangedRange(fromA, toA, fromB, toB)));
          this.changedRanges = changedRanges;
          var focus = view.hasFocus;

          if (focus != view.inputState.notifiedFocused) {
            view.inputState.notifiedFocused = focus;
            this.flags |= 1;
          }
        }

        static create(view, state, transactions) {
          return new ViewUpdate(view, state, transactions);
        }

        get viewportChanged() {
          return (this.flags & 4) > 0;
        }

        get heightChanged() {
          return (this.flags & 2) > 0;
        }

        get geometryChanged() {
          return this.docChanged || (this.flags & (8 | 2)) > 0;
        }

        get focusChanged() {
          return (this.flags & 1) > 0;
        }

        get docChanged() {
          return !this.changes.empty;
        }

        get selectionSet() {
          return this.transactions.some(tr => tr.selection);
        }

        get empty() {
          return this.flags == 0 && this.transactions.length == 0;
        }

      };

      Direction = /* @__PURE__ */function (Direction2) {
        Direction2[Direction2["LTR"] = 0] = "LTR";
        Direction2[Direction2["RTL"] = 1] = "RTL";
        return Direction2;
      }(Direction || (Direction = {}));

      LTR = Direction.LTR;
      RTL = Direction.RTL;
      LowTypes = /* @__PURE__ */dec("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008");
      ArabicTypes = /* @__PURE__ */dec("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333");
      Brackets = /* @__PURE__ */Object.create(null);
      BracketStack = [];

      for (var _i86 = 0, _arr2 = ["()", "[]", "{}"]; _i86 < _arr2.length; _i86++) {
        var p = _arr2[_i86];
        var l = /* @__PURE__ */p.charCodeAt(0),
            r = /* @__PURE__ */p.charCodeAt(1);
        Brackets[l] = r;
        Brackets[r] = -l;
      }

      BidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
      BidiSpan = class {
        constructor(from, to, level) {
          this.from = from;
          this.to = to;
          this.level = level;
        }

        get dir() {
          return this.level % 2 ? RTL : LTR;
        }

        side(end, dir) {
          return this.dir == dir == end ? this.to : this.from;
        }

        static find(order, index, level, assoc) {
          var maybe = -1;

          for (var _i87 = 0; _i87 < order.length; _i87++) {
            var span = order[_i87];

            if (span.from <= index && span.to >= index) {
              if (span.level == level) return _i87;
              if (maybe < 0 || (assoc != 0 ? assoc < 0 ? span.from < index : span.to > index : order[maybe].level > span.level)) maybe = _i87;
            }
          }

          if (maybe < 0) throw new RangeError("Index out of range");
          return maybe;
        }

      };
      types = [];
      movedOver = "";
      LineBreakPlaceholder = "\uFFFF";
      DOMReader = class {
        constructor(points, state) {
          this.points = points;
          this.text = "";
          this.lineSeparator = state.facet(EditorState.lineSeparator);
        }

        append(text) {
          this.text += text;
        }

        lineBreak() {
          this.text += LineBreakPlaceholder;
        }

        readRange(start, end) {
          if (!start) return this;
          var parent = start.parentNode;

          for (var cur2 = start;;) {
            this.findPointBefore(parent, cur2);
            this.readNode(cur2);
            var next = cur2.nextSibling;
            if (next == end) break;
            var view = ContentView.get(cur2),
                nextView = ContentView.get(next);
            if (view && nextView ? view.breakAfter : (view ? view.breakAfter : isBlockElement(cur2)) || isBlockElement(next) && (cur2.nodeName != "BR" || cur2.cmIgnore)) this.lineBreak();
            cur2 = next;
          }

          this.findPointBefore(parent, end);
          return this;
        }

        readTextNode(node) {
          var text = node.nodeValue;

          var _iterator57 = _createForOfIteratorHelper(this.points),
              _step57;

          try {
            for (_iterator57.s(); !(_step57 = _iterator57.n()).done;) {
              var _point = _step57.value;
              if (_point.node == node) _point.pos = this.text.length + Math.min(_point.offset, text.length);
            }
          } catch (err) {
            _iterator57.e(err);
          } finally {
            _iterator57.f();
          }

          for (var off = 0, re = this.lineSeparator ? null : /\r\n?|\n/g;;) {
            var nextBreak = -1,
                breakSize = 1,
                m = void 0;

            if (this.lineSeparator) {
              nextBreak = text.indexOf(this.lineSeparator, off);
              breakSize = this.lineSeparator.length;
            } else if (m = re.exec(text)) {
              nextBreak = m.index;
              breakSize = m[0].length;
            }

            this.append(text.slice(off, nextBreak < 0 ? text.length : nextBreak));
            if (nextBreak < 0) break;
            this.lineBreak();

            if (breakSize > 1) {
              var _iterator58 = _createForOfIteratorHelper(this.points),
                  _step58;

              try {
                for (_iterator58.s(); !(_step58 = _iterator58.n()).done;) {
                  var point = _step58.value;
                  if (point.node == node && point.pos > this.text.length) point.pos -= breakSize - 1;
                }
              } catch (err) {
                _iterator58.e(err);
              } finally {
                _iterator58.f();
              }
            }

            off = nextBreak + breakSize;
          }
        }

        readNode(node) {
          if (node.cmIgnore) return;
          var view = ContentView.get(node);
          var fromView = view && view.overrideDOMText;

          if (fromView != null) {
            this.findPointInside(node, fromView.length);

            for (var _i88 = fromView.iter(); !_i88.next().done;) {
              if (_i88.lineBreak) this.lineBreak();else this.append(_i88.value);
            }
          } else if (node.nodeType == 3) {
            this.readTextNode(node);
          } else if (node.nodeName == "BR") {
            if (node.nextSibling) this.lineBreak();
          } else if (node.nodeType == 1) {
            this.readRange(node.firstChild, null);
          }
        }

        findPointBefore(node, next) {
          var _iterator59 = _createForOfIteratorHelper(this.points),
              _step59;

          try {
            for (_iterator59.s(); !(_step59 = _iterator59.n()).done;) {
              var point = _step59.value;
              if (point.node == node && node.childNodes[point.offset] == next) point.pos = this.text.length;
            }
          } catch (err) {
            _iterator59.e(err);
          } finally {
            _iterator59.f();
          }
        }

        findPointInside(node, maxLen) {
          var _iterator60 = _createForOfIteratorHelper(this.points),
              _step60;

          try {
            for (_iterator60.s(); !(_step60 = _iterator60.n()).done;) {
              var point = _step60.value;
              if (node.nodeType == 3 ? point.node == node : node.contains(point.node)) point.pos = this.text.length + Math.min(maxLen, point.offset);
            }
          } catch (err) {
            _iterator60.e(err);
          } finally {
            _iterator60.f();
          }
        }

      };
      DOMPoint = class {
        constructor(node, offset) {
          this.node = node;
          this.offset = offset;
          this.pos = -1;
        }

      };
      DocView = class extends ContentView {
        constructor(view) {
          super();
          this.view = view;
          this.compositionDeco = Decoration.none;
          this.decorations = [];
          this.dynamicDecorationMap = [];
          this.minWidth = 0;
          this.minWidthFrom = 0;
          this.minWidthTo = 0;
          this.impreciseAnchor = null;
          this.impreciseHead = null;
          this.forceSelection = false;
          this.lastUpdate = Date.now();
          this.setDOM(view.contentDOM);
          this.children = [new LineView()];
          this.children[0].setParent(this);
          this.updateDeco();
          this.updateInner([new ChangedRange(0, 0, 0, view.state.doc.length)], 0);
        }

        get root() {
          return this.view.root;
        }

        get editorView() {
          return this.view;
        }

        get length() {
          return this.view.state.doc.length;
        }

        update(update) {
          var changedRanges = update.changedRanges;

          if (this.minWidth > 0 && changedRanges.length) {
            if (!changedRanges.every(_ref9 => {
              var fromA = _ref9.fromA,
                  toA = _ref9.toA;
              return toA < this.minWidthFrom || fromA > this.minWidthTo;
            })) {
              this.minWidth = this.minWidthFrom = this.minWidthTo = 0;
            } else {
              this.minWidthFrom = update.changes.mapPos(this.minWidthFrom, 1);
              this.minWidthTo = update.changes.mapPos(this.minWidthTo, 1);
            }
          }

          if (this.view.inputState.composing < 0) this.compositionDeco = Decoration.none;else if (update.transactions.length || this.dirty) this.compositionDeco = computeCompositionDeco(this.view, update.changes);
          if ((browser.ie || browser.chrome) && !this.compositionDeco.size && update && update.state.doc.lines != update.startState.doc.lines) this.forceSelection = true;
          var prevDeco = this.decorations,
              deco = this.updateDeco();
          var decoDiff = findChangedDeco(prevDeco, deco, update.changes);
          changedRanges = ChangedRange.extendWithRanges(changedRanges, decoDiff);

          if (this.dirty == 0 && changedRanges.length == 0) {
            return false;
          } else {
            this.updateInner(changedRanges, update.startState.doc.length);
            if (update.transactions.length) this.lastUpdate = Date.now();
            return true;
          }
        }

        updateInner(changes, oldLength) {
          this.view.viewState.mustMeasureContent = true;
          this.updateChildren(changes, oldLength);
          var observer = this.view.observer;
          observer.ignore(() => {
            this.dom.style.height = this.view.viewState.contentHeight + "px";
            this.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
            var track = browser.chrome || browser.ios ? {
              node: observer.selectionRange.focusNode,
              written: false
            } : void 0;
            this.sync(track);
            this.dirty = 0;
            if (track && (track.written || observer.selectionRange.focusNode != track.node)) this.forceSelection = true;
            this.dom.style.height = "";
          });
          var gaps = [];

          if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length) {
            var _iterator61 = _createForOfIteratorHelper(this.children),
                _step61;

            try {
              for (_iterator61.s(); !(_step61 = _iterator61.n()).done;) {
                var child = _step61.value;
                if (child instanceof BlockWidgetView && child.widget instanceof BlockGapWidget) gaps.push(child.dom);
              }
            } catch (err) {
              _iterator61.e(err);
            } finally {
              _iterator61.f();
            }
          }

          observer.updateGaps(gaps);
        }

        updateChildren(changes, oldLength) {
          var cursor = this.childCursor(oldLength);

          for (var _i89 = changes.length - 1;; _i89--) {
            var next = _i89 >= 0 ? changes[_i89] : null;
            if (!next) break;
            var fromA = next.fromA,
                toA = next.toA,
                fromB = next.fromB,
                toB = next.toB;

            var _ContentBuilder$build = ContentBuilder.build(this.view.state.doc, fromB, toB, this.decorations, this.dynamicDecorationMap),
                content2 = _ContentBuilder$build.content,
                breakAtStart = _ContentBuilder$build.breakAtStart,
                openStart = _ContentBuilder$build.openStart,
                openEnd = _ContentBuilder$build.openEnd;

            var _cursor$findPos = cursor.findPos(toA, 1),
                toI = _cursor$findPos.i,
                toOff = _cursor$findPos.off;

            var _cursor$findPos2 = cursor.findPos(fromA, -1),
                fromI = _cursor$findPos2.i,
                fromOff = _cursor$findPos2.off;

            replaceRange(this, fromI, fromOff, toI, toOff, content2, breakAtStart, openStart, openEnd);
          }
        }

        updateSelection() {
          var mustRead = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          var fromPointer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          if (mustRead) this.view.observer.readSelectionRange();
          if (!(fromPointer || this.mayControlSelection()) || browser.ios && this.view.inputState.rapidCompositionStart) return;
          var force = this.forceSelection;
          this.forceSelection = false;
          var main = this.view.state.selection.main;
          var anchor = this.domAtPos(main.anchor);
          var head = main.empty ? anchor : this.domAtPos(main.head);

          if (browser.gecko && main.empty && betweenUneditable(anchor)) {
            var dummy = document.createTextNode("");
            this.view.observer.ignore(() => anchor.node.insertBefore(dummy, anchor.node.childNodes[anchor.offset] || null));
            anchor = head = new DOMPos(dummy, 0);
            force = true;
          }

          var domSel = this.view.observer.selectionRange;

          if (force || !domSel.focusNode || !isEquivalentPosition(anchor.node, anchor.offset, domSel.anchorNode, domSel.anchorOffset) || !isEquivalentPosition(head.node, head.offset, domSel.focusNode, domSel.focusOffset)) {
            this.view.observer.ignore(() => {
              if (browser.android && browser.chrome && this.dom.contains(domSel.focusNode) && inUneditable(domSel.focusNode, this.dom)) {
                this.dom.blur();
                this.dom.focus({
                  preventScroll: true
                });
              }

              var rawSel = getSelection(this.root);

              if (main.empty) {
                if (browser.gecko) {
                  var nextTo = nextToUneditable(anchor.node, anchor.offset);

                  if (nextTo && nextTo != (1 | 2)) {
                    var text = nearbyTextNode(anchor.node, anchor.offset, nextTo == 1 ? 1 : -1);
                    if (text) anchor = new DOMPos(text, nextTo == 1 ? 0 : text.nodeValue.length);
                  }
                }

                rawSel.collapse(anchor.node, anchor.offset);
                if (main.bidiLevel != null && domSel.cursorBidiLevel != null) domSel.cursorBidiLevel = main.bidiLevel;
              } else if (rawSel.extend) {
                rawSel.collapse(anchor.node, anchor.offset);
                rawSel.extend(head.node, head.offset);
              } else {
                var range = document.createRange();

                if (main.anchor > main.head) {
                  var _ref10 = [head, anchor];
                  anchor = _ref10[0];
                  head = _ref10[1];
                }

                range.setEnd(head.node, head.offset);
                range.setStart(anchor.node, anchor.offset);
                rawSel.removeAllRanges();
                rawSel.addRange(range);
              }
            });
            this.view.observer.setSelectionRange(anchor, head);
          }

          this.impreciseAnchor = anchor.precise ? null : new DOMPos(domSel.anchorNode, domSel.anchorOffset);
          this.impreciseHead = head.precise ? null : new DOMPos(domSel.focusNode, domSel.focusOffset);
        }

        enforceCursorAssoc() {
          if (this.compositionDeco.size) return;
          var cursor = this.view.state.selection.main;
          var sel = getSelection(this.root);
          if (!cursor.empty || !cursor.assoc || !sel.modify) return;
          var line = LineView.find(this, cursor.head);
          if (!line) return;
          var lineStart = line.posAtStart;
          if (cursor.head == lineStart || cursor.head == lineStart + line.length) return;
          var before = this.coordsAt(cursor.head, -1),
              after = this.coordsAt(cursor.head, 1);
          if (!before || !after || before.bottom > after.top) return;
          var dom = this.domAtPos(cursor.head + cursor.assoc);
          sel.collapse(dom.node, dom.offset);
          sel.modify("move", cursor.assoc < 0 ? "forward" : "backward", "lineboundary");
        }

        mayControlSelection() {
          return this.view.state.facet(editable) ? this.root.activeElement == this.dom : hasSelection(this.dom, this.view.observer.selectionRange);
        }

        nearest(dom) {
          for (var cur2 = dom; cur2;) {
            var domView = ContentView.get(cur2);
            if (domView && domView.rootView == this) return domView;
            cur2 = cur2.parentNode;
          }

          return null;
        }

        posFromDOM(node, offset) {
          var view = this.nearest(node);
          if (!view) throw new RangeError("Trying to find position for a DOM position outside of the document");
          return view.localPosFromDOM(node, offset) + view.posAtStart;
        }

        domAtPos(pos) {
          var _this$childCursor$fin = this.childCursor().findPos(pos, -1),
              i = _this$childCursor$fin.i,
              off = _this$childCursor$fin.off;

          for (; i < this.children.length - 1;) {
            var child = this.children[i];
            if (off < child.length || child instanceof LineView) break;
            i++;
            off = 0;
          }

          return this.children[i].domAtPos(off);
        }

        coordsAt(pos, side) {
          for (var off = this.length, _i90 = this.children.length - 1;; _i90--) {
            var child = this.children[_i90],
                start = off - child.breakAfter - child.length;
            if (pos > start || pos == start && child.type != BlockType.WidgetBefore && child.type != BlockType.WidgetAfter && (!_i90 || side == 2 || this.children[_i90 - 1].breakAfter || this.children[_i90 - 1].type == BlockType.WidgetBefore && side > -2)) return child.coordsAt(pos - start, side);
            off = start;
          }
        }

        measureVisibleLineHeights(viewport) {
          var result = [],
              from = viewport.from,
              to = viewport.to;
          var contentWidth = this.view.contentDOM.clientWidth;
          var isWider = contentWidth > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1;
          var widest = -1,
              ltr = this.view.textDirection == Direction.LTR;

          for (var pos = 0, _i91 = 0; _i91 < this.children.length; _i91++) {
            var child = this.children[_i91],
                end = pos + child.length;
            if (end > to) break;

            if (pos >= from) {
              var childRect = child.dom.getBoundingClientRect();
              result.push(childRect.height);

              if (isWider) {
                var last = child.dom.lastChild;
                var rects = last ? clientRectsFor(last) : [];

                if (rects.length) {
                  var rect = rects[rects.length - 1];
                  var width = ltr ? rect.right - childRect.left : childRect.right - rect.left;

                  if (width > widest) {
                    widest = width;
                    this.minWidth = contentWidth;
                    this.minWidthFrom = pos;
                    this.minWidthTo = end;
                  }
                }
              }
            }

            pos = end + child.breakAfter;
          }

          return result;
        }

        textDirectionAt(pos) {
          var _this$childPos2 = this.childPos(pos, 1),
              i = _this$childPos2.i;

          return getComputedStyle(this.children[i].dom).direction == "rtl" ? Direction.RTL : Direction.LTR;
        }

        measureTextSize() {
          var _iterator62 = _createForOfIteratorHelper(this.children),
              _step62;

          try {
            for (_iterator62.s(); !(_step62 = _iterator62.n()).done;) {
              var child = _step62.value;

              if (child instanceof LineView) {
                var measure = child.measureTextSize();
                if (measure) return measure;
              }
            }
          } catch (err) {
            _iterator62.e(err);
          } finally {
            _iterator62.f();
          }

          var dummy = document.createElement("div"),
              lineHeight,
              charWidth;
          dummy.className = "cm-line";
          dummy.textContent = "abc def ghi jkl mno pqr stu";
          this.view.observer.ignore(() => {
            this.dom.appendChild(dummy);
            var rect = clientRectsFor(dummy.firstChild)[0];
            lineHeight = dummy.getBoundingClientRect().height;
            charWidth = rect ? rect.width / 27 : 7;
            dummy.remove();
          });
          return {
            lineHeight,
            charWidth
          };
        }

        childCursor() {
          var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.length;
          var i = this.children.length;
          if (i) pos -= this.children[--i].length;
          return new ChildCursor(this.children, pos, i);
        }

        computeBlockGapDeco() {
          var deco = [],
              vs = this.view.viewState;

          for (var pos = 0, _i92 = 0;; _i92++) {
            var next = _i92 == vs.viewports.length ? null : vs.viewports[_i92];
            var end = next ? next.from - 1 : this.length;

            if (end > pos) {
              var height = vs.lineBlockAt(end).bottom - vs.lineBlockAt(pos).top;
              deco.push(Decoration.replace({
                widget: new BlockGapWidget(height),
                block: true,
                inclusive: true,
                isBlockGap: true
              }).range(pos, end));
            }

            if (!next) break;
            pos = next.to + 1;
          }

          return Decoration.set(deco);
        }

        updateDeco() {
          var allDeco = this.view.state.facet(decorations).map((d, i) => {
            var dynamic = this.dynamicDecorationMap[i] = typeof d == "function";
            return dynamic ? d(this.view) : d;
          });

          for (var _i93 = allDeco.length; _i93 < allDeco.length + 3; _i93++) {
            this.dynamicDecorationMap[_i93] = false;
          }

          return this.decorations = [...allDeco, this.compositionDeco, this.computeBlockGapDeco(), this.view.viewState.lineGapDeco];
        }

        scrollIntoView(target) {
          var range = target.range;
          var rect = this.coordsAt(range.head, range.empty ? range.assoc : range.head > range.anchor ? -1 : 1),
              other;
          if (!rect) return;
          if (!range.empty && (other = this.coordsAt(range.anchor, range.anchor > range.head ? -1 : 1))) rect = {
            left: Math.min(rect.left, other.left),
            top: Math.min(rect.top, other.top),
            right: Math.max(rect.right, other.right),
            bottom: Math.max(rect.bottom, other.bottom)
          };
          var mLeft = 0,
              mRight = 0,
              mTop = 0,
              mBottom = 0;

          var _iterator63 = _createForOfIteratorHelper(this.view.state.facet(scrollMargins).map(f => f(this.view))),
              _step63;

          try {
            for (_iterator63.s(); !(_step63 = _iterator63.n()).done;) {
              var margins = _step63.value;

              if (margins) {
                var left = margins.left,
                    right = margins.right,
                    top2 = margins.top,
                    bottom = margins.bottom;
                if (left != null) mLeft = Math.max(mLeft, left);
                if (right != null) mRight = Math.max(mRight, right);
                if (top2 != null) mTop = Math.max(mTop, top2);
                if (bottom != null) mBottom = Math.max(mBottom, bottom);
              }
            }
          } catch (err) {
            _iterator63.e(err);
          } finally {
            _iterator63.f();
          }

          var targetRect = {
            left: rect.left - mLeft,
            top: rect.top - mTop,
            right: rect.right + mRight,
            bottom: rect.bottom + mBottom
          };
          scrollRectIntoView(this.view.scrollDOM, targetRect, range.head < range.anchor ? -1 : 1, target.x, target.y, target.xMargin, target.yMargin, this.view.textDirection == Direction.LTR);
        }

      };
      BlockGapWidget = class extends WidgetType {
        constructor(height) {
          super();
          this.height = height;
        }

        toDOM() {
          var elt = document.createElement("div");
          this.updateDOM(elt);
          return elt;
        }

        eq(other) {
          return other.height == this.height;
        }

        updateDOM(elt) {
          elt.style.height = this.height + "px";
          return true;
        }

        get estimatedHeight() {
          return this.height;
        }

      };
      CompositionWidget = class extends WidgetType {
        constructor(top2, text, topView) {
          super();
          this.top = top2;
          this.text = text;
          this.topView = topView;
        }

        eq(other) {
          return this.top == other.top && this.text == other.text;
        }

        toDOM() {
          return this.top;
        }

        ignoreEvent() {
          return false;
        }

        get customView() {
          return CompositionView;
        }

      };
      DecorationComparator$1 = class {
        constructor() {
          this.changes = [];
        }

        compareRange(from, to) {
          addRange(from, to, this.changes);
        }

        comparePoint(from, to) {
          addRange(from, to, this.changes);
        }

      };
      InputState = class {
        constructor(view) {
          var _this = this;

          this.lastKeyCode = 0;
          this.lastKeyTime = 0;
          this.chromeScrollHack = -1;
          this.pendingIOSKey = void 0;
          this.lastSelectionOrigin = null;
          this.lastSelectionTime = 0;
          this.lastEscPress = 0;
          this.lastContextMenu = 0;
          this.scrollHandlers = [];
          this.registeredEvents = [];
          this.customHandlers = [];
          this.composing = -1;
          this.compositionFirstChange = null;
          this.compositionEndedAt = 0;
          this.rapidCompositionStart = false;
          this.mouseSelection = null;

          var _loop6 = function _loop6(type) {
            var handler = handlers[type];
            view.contentDOM.addEventListener(type, event => {
              if (!eventBelongsToEditor(view, event) || _this.ignoreDuringComposition(event)) return;
              if (type == "keydown" && _this.keydown(view, event)) return;
              if (_this.mustFlushObserver(event)) view.observer.forceFlush();
              if (_this.runCustomHandlers(type, view, event)) event.preventDefault();else handler(view, event);
            });

            _this.registeredEvents.push(type);
          };

          for (var type in handlers) {
            _loop6(type);
          }

          if (browser.chrome && browser.chrome_version >= 102) {
            view.scrollDOM.addEventListener("wheel", () => {
              if (this.chromeScrollHack < 0) view.contentDOM.style.pointerEvents = "none";else window.clearTimeout(this.chromeScrollHack);
              this.chromeScrollHack = setTimeout(() => {
                this.chromeScrollHack = -1;
                view.contentDOM.style.pointerEvents = "";
              }, 100);
            }, {
              passive: true
            });
          }

          this.notifiedFocused = view.hasFocus;
          if (browser.safari) view.contentDOM.addEventListener("input", () => null);
        }

        setSelectionOrigin(origin) {
          this.lastSelectionOrigin = origin;
          this.lastSelectionTime = Date.now();
        }

        ensureHandlers(view, plugins) {
          var _this2 = this;

          var _a2;

          var handlers2;
          this.customHandlers = [];

          var _iterator64 = _createForOfIteratorHelper(plugins),
              _step64;

          try {
            for (_iterator64.s(); !(_step64 = _iterator64.n()).done;) {
              var plugin = _step64.value;

              if (handlers2 = (_a2 = plugin.update(view).spec) === null || _a2 === void 0 ? void 0 : _a2.domEventHandlers) {
                this.customHandlers.push({
                  plugin: plugin.value,
                  handlers: handlers2
                });

                var _loop7 = function _loop7(type) {
                  if (_this2.registeredEvents.indexOf(type) < 0 && type != "scroll") {
                    _this2.registeredEvents.push(type);

                    view.contentDOM.addEventListener(type, event => {
                      if (!eventBelongsToEditor(view, event)) return;
                      if (_this2.runCustomHandlers(type, view, event)) event.preventDefault();
                    });
                  }
                };

                for (var type in handlers2) {
                  _loop7(type);
                }
              }
            }
          } catch (err) {
            _iterator64.e(err);
          } finally {
            _iterator64.f();
          }
        }

        runCustomHandlers(type, view, event) {
          var _iterator65 = _createForOfIteratorHelper(this.customHandlers),
              _step65;

          try {
            for (_iterator65.s(); !(_step65 = _iterator65.n()).done;) {
              var set = _step65.value;
              var handler = set.handlers[type];

              if (handler) {
                try {
                  if (handler.call(set.plugin, event, view) || event.defaultPrevented) return true;
                } catch (e) {
                  logException(view.state, e);
                }
              }
            }
          } catch (err) {
            _iterator65.e(err);
          } finally {
            _iterator65.f();
          }

          return false;
        }

        runScrollHandlers(view, event) {
          var _iterator66 = _createForOfIteratorHelper(this.customHandlers),
              _step66;

          try {
            for (_iterator66.s(); !(_step66 = _iterator66.n()).done;) {
              var set = _step66.value;
              var handler = set.handlers.scroll;

              if (handler) {
                try {
                  handler.call(set.plugin, event, view);
                } catch (e) {
                  logException(view.state, e);
                }
              }
            }
          } catch (err) {
            _iterator66.e(err);
          } finally {
            _iterator66.f();
          }
        }

        keydown(view, event) {
          this.lastKeyCode = event.keyCode;
          this.lastKeyTime = Date.now();
          if (event.keyCode == 9 && Date.now() < this.lastEscPress + 2e3) return true;

          if (browser.android && browser.chrome && !event.synthetic && (event.keyCode == 13 || event.keyCode == 8)) {
            view.observer.delayAndroidKey(event.key, event.keyCode);
            return true;
          }

          var pending;

          if (browser.ios && (pending = PendingKeys.find(key => key.keyCode == event.keyCode)) && !(event.ctrlKey || event.altKey || event.metaKey) && !event.synthetic) {
            this.pendingIOSKey = pending;
            setTimeout(() => this.flushIOSKey(view), 250);
            return true;
          }

          return false;
        }

        flushIOSKey(view) {
          var key = this.pendingIOSKey;
          if (!key) return false;
          this.pendingIOSKey = void 0;
          return dispatchKey(view.contentDOM, key.key, key.keyCode);
        }

        ignoreDuringComposition(event) {
          if (!/^key/.test(event.type)) return false;
          if (this.composing > 0) return true;

          if (browser.safari && Date.now() - this.compositionEndedAt < 100) {
            this.compositionEndedAt = 0;
            return true;
          }

          return false;
        }

        mustFlushObserver(event) {
          return event.type == "keydown" && event.keyCode != 229 || event.type == "compositionend" && !browser.ios;
        }

        startMouseSelection(mouseSelection) {
          if (this.mouseSelection) this.mouseSelection.destroy();
          this.mouseSelection = mouseSelection;
        }

        update(update) {
          if (this.mouseSelection) this.mouseSelection.update(update);
          if (update.transactions.length) this.lastKeyCode = this.lastSelectionTime = 0;
        }

        destroy() {
          if (this.mouseSelection) this.mouseSelection.destroy();
        }

      };
      PendingKeys = [{
        key: "Backspace",
        keyCode: 8,
        inputType: "deleteContentBackward"
      }, {
        key: "Enter",
        keyCode: 13,
        inputType: "insertParagraph"
      }, {
        key: "Delete",
        keyCode: 46,
        inputType: "deleteContentForward"
      }];
      modifierCodes = [16, 17, 18, 20, 91, 92, 224, 225];
      MouseSelection = class {
        constructor(view, startEvent, style, mustSelect) {
          this.view = view;
          this.style = style;
          this.mustSelect = mustSelect;
          this.lastEvent = startEvent;
          var doc2 = view.contentDOM.ownerDocument;
          doc2.addEventListener("mousemove", this.move = this.move.bind(this));
          doc2.addEventListener("mouseup", this.up = this.up.bind(this));
          this.extend = startEvent.shiftKey;
          this.multiple = view.state.facet(EditorState.allowMultipleSelections) && addsSelectionRange(view, startEvent);
          this.dragMove = dragMovesSelection(view, startEvent);
          this.dragging = isInPrimarySelection(view, startEvent) && getClickType(startEvent) == 1 ? null : false;

          if (this.dragging === false) {
            startEvent.preventDefault();
            this.select(startEvent);
          }
        }

        move(event) {
          if (event.buttons == 0) return this.destroy();
          if (this.dragging !== false) return;
          this.select(this.lastEvent = event);
        }

        up(event) {
          if (this.dragging == null) this.select(this.lastEvent);
          if (!this.dragging) event.preventDefault();
          this.destroy();
        }

        destroy() {
          var doc2 = this.view.contentDOM.ownerDocument;
          doc2.removeEventListener("mousemove", this.move);
          doc2.removeEventListener("mouseup", this.up);
          this.view.inputState.mouseSelection = null;
        }

        select(event) {
          var selection = this.style.get(event, this.extend, this.multiple);
          if (this.mustSelect || !selection.eq(this.view.state.selection) || selection.main.assoc != this.view.state.selection.main.assoc) this.view.dispatch({
            selection,
            userEvent: "select.pointer",
            scrollIntoView: true
          });
          this.mustSelect = false;
        }

        update(update) {
          if (update.docChanged && this.dragging) this.dragging = this.dragging.map(update.changes);
          if (this.style.update(update)) setTimeout(() => this.select(this.lastEvent), 20);
        }

      };
      handlers = /* @__PURE__ */Object.create(null);
      brokenClipboardAPI = browser.ie && browser.ie_version < 15 || browser.ios && browser.webkit_version < 604;

      handlers.keydown = (view, event) => {
        view.inputState.setSelectionOrigin("select");
        if (event.keyCode == 27) view.inputState.lastEscPress = Date.now();else if (modifierCodes.indexOf(event.keyCode) < 0) view.inputState.lastEscPress = 0;
      };

      lastTouch = 0;

      handlers.touchstart = (view, e) => {
        lastTouch = Date.now();
        view.inputState.setSelectionOrigin("select.pointer");
      };

      handlers.touchmove = view => {
        view.inputState.setSelectionOrigin("select.pointer");
      };

      handlers.mousedown = (view, event) => {
        view.observer.flush();
        if (lastTouch > Date.now() - 2e3 && getClickType(event) == 1) return;
        var style = null;

        var _iterator67 = _createForOfIteratorHelper(view.state.facet(mouseSelectionStyle)),
            _step67;

        try {
          for (_iterator67.s(); !(_step67 = _iterator67.n()).done;) {
            var makeStyle = _step67.value;
            style = makeStyle(view, event);
            if (style) break;
          }
        } catch (err) {
          _iterator67.e(err);
        } finally {
          _iterator67.f();
        }

        if (!style && event.button == 0) style = basicMouseSelection(view, event);

        if (style) {
          var mustFocus = view.root.activeElement != view.contentDOM;
          if (mustFocus) view.observer.ignore(() => focusPreventScroll(view.contentDOM));
          view.inputState.startMouseSelection(new MouseSelection(view, event, style, mustFocus));
        }
      };

      insideY = (y, rect) => y >= rect.top && y <= rect.bottom;

      inside = (x, y, rect) => insideY(y, rect) && x >= rect.left && x <= rect.right;

      BadMouseDetail = browser.ie && browser.ie_version <= 11;
      lastMouseDown = null;
      lastMouseDownCount = 0;
      lastMouseDownTime = 0;

      handlers.dragstart = (view, event) => {
        var main = view.state.selection.main;
        var mouseSelection = view.inputState.mouseSelection;
        if (mouseSelection) mouseSelection.dragging = main;

        if (event.dataTransfer) {
          event.dataTransfer.setData("Text", view.state.sliceDoc(main.from, main.to));
          event.dataTransfer.effectAllowed = "copyMove";
        }
      };

      handlers.drop = (view, event) => {
        if (!event.dataTransfer) return;
        if (view.state.readOnly) return event.preventDefault();
        var files = event.dataTransfer.files;

        if (files && files.length) {
          (function () {
            event.preventDefault();
            var text = Array(files.length),
                read = 0;

            var finishFile = () => {
              if (++read == files.length) dropText(view, event, text.filter(s => s != null).join(view.state.lineBreak), false);
            };

            var _loop8 = function _loop8(_i94) {
              var reader = new FileReader();
              reader.onerror = finishFile;

              reader.onload = () => {
                if (!/[\x00-\x08\x0e-\x1f]{2}/.test(reader.result)) text[_i94] = reader.result;
                finishFile();
              };

              reader.readAsText(files[_i94]);
            };

            for (var _i94 = 0; _i94 < files.length; _i94++) {
              _loop8(_i94);
            }
          })();
        } else {
          dropText(view, event, event.dataTransfer.getData("Text"), true);
        }
      };

      handlers.paste = (view, event) => {
        if (view.state.readOnly) return event.preventDefault();
        view.observer.flush();
        var data = brokenClipboardAPI ? null : event.clipboardData;

        if (data) {
          doPaste(view, data.getData("text/plain"));
          event.preventDefault();
        } else {
          capturePaste(view);
        }
      };

      lastLinewiseCopy = null;

      handlers.copy = handlers.cut = (view, event) => {
        var _copiedRange = copiedRange(view.state),
            text = _copiedRange.text,
            ranges = _copiedRange.ranges,
            linewise = _copiedRange.linewise;

        if (!text && !linewise) return;
        lastLinewiseCopy = linewise ? text : null;
        var data = brokenClipboardAPI ? null : event.clipboardData;

        if (data) {
          event.preventDefault();
          data.clearData();
          data.setData("text/plain", text);
        } else {
          captureCopy(view, text);
        }

        if (event.type == "cut" && !view.state.readOnly) view.dispatch({
          changes: ranges,
          scrollIntoView: true,
          userEvent: "delete.cut"
        });
      };

      handlers.focus = updateForFocusChange;

      handlers.blur = view => {
        view.observer.clearSelectionRange();
        updateForFocusChange(view);
      };

      handlers.compositionstart = handlers.compositionupdate = view => {
        if (view.inputState.compositionFirstChange == null) view.inputState.compositionFirstChange = true;

        if (view.inputState.composing < 0) {
          view.inputState.composing = 0;

          if (view.docView.compositionDeco.size) {
            view.observer.flush();
            forceClearComposition(view, true);
          }
        }
      };

      handlers.compositionend = view => {
        view.inputState.composing = -1;
        view.inputState.compositionEndedAt = Date.now();
        view.inputState.compositionFirstChange = null;
        setTimeout(() => {
          if (view.inputState.composing < 0) forceClearComposition(view, false);
        }, 50);
      };

      handlers.contextmenu = view => {
        view.inputState.lastContextMenu = Date.now();
      };

      handlers.beforeinput = (view, event) => {
        var _a2;

        var pending;

        if (browser.chrome && browser.android && (pending = PendingKeys.find(key => key.inputType == event.inputType))) {
          view.observer.delayAndroidKey(pending.key, pending.keyCode);

          if (pending.key == "Backspace" || pending.key == "Delete") {
            var startViewHeight = ((_a2 = window.visualViewport) === null || _a2 === void 0 ? void 0 : _a2.height) || 0;
            setTimeout(() => {
              var _a3;

              if ((((_a3 = window.visualViewport) === null || _a3 === void 0 ? void 0 : _a3.height) || 0) > startViewHeight + 10 && view.hasFocus) {
                view.contentDOM.blur();
                view.focus();
              }
            }, 100);
          }
        }
      };

      wrappingWhiteSpace = ["pre-wrap", "normal", "pre-line", "break-spaces"];
      HeightOracle = class {
        constructor() {
          this.doc = Text.empty;
          this.lineWrapping = false;
          this.heightSamples = {};
          this.lineHeight = 14;
          this.charWidth = 7;
          this.lineLength = 30;
          this.heightChanged = false;
        }

        heightForGap(from, to) {
          var lines = this.doc.lineAt(to).number - this.doc.lineAt(from).number + 1;
          if (this.lineWrapping) lines += Math.ceil((to - from - lines * this.lineLength * 0.5) / this.lineLength);
          return this.lineHeight * lines;
        }

        heightForLine(length) {
          if (!this.lineWrapping) return this.lineHeight;
          var lines = 1 + Math.max(0, Math.ceil((length - this.lineLength) / (this.lineLength - 5)));
          return lines * this.lineHeight;
        }

        setDoc(doc2) {
          this.doc = doc2;
          return this;
        }

        mustRefreshForWrapping(whiteSpace) {
          return wrappingWhiteSpace.indexOf(whiteSpace) > -1 != this.lineWrapping;
        }

        mustRefreshForHeights(lineHeights) {
          var newHeight = false;

          for (var _i95 = 0; _i95 < lineHeights.length; _i95++) {
            var h = lineHeights[_i95];

            if (h < 0) {
              _i95++;
            } else if (!this.heightSamples[Math.floor(h * 10)]) {
              newHeight = true;
              this.heightSamples[Math.floor(h * 10)] = true;
            }
          }

          return newHeight;
        }

        refresh(whiteSpace, lineHeight, charWidth, lineLength, knownHeights) {
          var lineWrapping = wrappingWhiteSpace.indexOf(whiteSpace) > -1;
          var changed = Math.round(lineHeight) != Math.round(this.lineHeight) || this.lineWrapping != lineWrapping;
          this.lineWrapping = lineWrapping;
          this.lineHeight = lineHeight;
          this.charWidth = charWidth;
          this.lineLength = lineLength;

          if (changed) {
            this.heightSamples = {};

            for (var _i96 = 0; _i96 < knownHeights.length; _i96++) {
              var h = knownHeights[_i96];
              if (h < 0) _i96++;else this.heightSamples[Math.floor(h * 10)] = true;
            }
          }

          return changed;
        }

      };
      MeasuredHeights = class {
        constructor(from, heights) {
          this.from = from;
          this.heights = heights;
          this.index = 0;
        }

        get more() {
          return this.index < this.heights.length;
        }

      };
      BlockInfo = class {
        constructor(from, length, top2, height, type) {
          this.from = from;
          this.length = length;
          this.top = top2;
          this.height = height;
          this.type = type;
        }

        get to() {
          return this.from + this.length;
        }

        get bottom() {
          return this.top + this.height;
        }

        join(other) {
          var detail = (Array.isArray(this.type) ? this.type : [this]).concat(Array.isArray(other.type) ? other.type : [other]);
          return new BlockInfo(this.from, this.length + other.length, this.top, this.height + other.height, detail);
        }

      };

      QueryType = /* @__PURE__ */function (QueryType3) {
        QueryType3[QueryType3["ByPos"] = 0] = "ByPos";
        QueryType3[QueryType3["ByHeight"] = 1] = "ByHeight";
        QueryType3[QueryType3["ByPosNoHeight"] = 2] = "ByPosNoHeight";
        return QueryType3;
      }(QueryType || (QueryType = {}));

      Epsilon = 1e-3;
      HeightMap = class {
        constructor(length, height) {
          var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
          this.length = length;
          this.height = height;
          this.flags = flags;
        }

        get outdated() {
          return (this.flags & 2) > 0;
        }

        set outdated(value) {
          this.flags = (value ? 2 : 0) | this.flags & ~2;
        }

        setHeight(oracle, height) {
          if (this.height != height) {
            if (Math.abs(this.height - height) > Epsilon) oracle.heightChanged = true;
            this.height = height;
          }
        }

        replace(_from, _to, nodes) {
          return HeightMap.of(nodes);
        }

        decomposeLeft(_to, result) {
          result.push(this);
        }

        decomposeRight(_from, result) {
          result.push(this);
        }

        applyChanges(decorations2, oldDoc, oracle, changes) {
          var me = this;

          for (var _i97 = changes.length - 1; _i97 >= 0; _i97--) {
            var _changes$_i = changes[_i97],
                fromA = _changes$_i.fromA,
                toA = _changes$_i.toA,
                fromB = _changes$_i.fromB,
                toB = _changes$_i.toB;
            var start = me.lineAt(fromA, QueryType.ByPosNoHeight, oldDoc, 0, 0);
            var end = start.to >= toA ? start : me.lineAt(toA, QueryType.ByPosNoHeight, oldDoc, 0, 0);
            toB += end.to - toA;
            toA = end.to;

            while (_i97 > 0 && start.from <= changes[_i97 - 1].toA) {
              fromA = changes[_i97 - 1].fromA;
              fromB = changes[_i97 - 1].fromB;
              _i97--;
              if (fromA < start.from) start = me.lineAt(fromA, QueryType.ByPosNoHeight, oldDoc, 0, 0);
            }

            fromB += start.from - fromA;
            fromA = start.from;
            var nodes = NodeBuilder.build(oracle, decorations2, fromB, toB);
            me = me.replace(fromA, toA, nodes);
          }

          return me.updateHeight(oracle, 0);
        }

        static empty() {
          return new HeightMapText(0, 0);
        }

        static of(nodes) {
          if (nodes.length == 1) return nodes[0];
          var i = 0,
              j = nodes.length,
              before = 0,
              after = 0;

          for (;;) {
            if (i == j) {
              if (before > after * 2) {
                var split = nodes[i - 1];
                if (split.break) nodes.splice(--i, 1, split.left, null, split.right);else nodes.splice(--i, 1, split.left, split.right);
                j += 1 + split.break;
                before -= split.size;
              } else if (after > before * 2) {
                var _split = nodes[j];
                if (_split.break) nodes.splice(j, 1, _split.left, null, _split.right);else nodes.splice(j, 1, _split.left, _split.right);
                j += 2 + _split.break;
                after -= _split.size;
              } else {
                break;
              }
            } else if (before < after) {
              var next = nodes[i++];
              if (next) before += next.size;
            } else {
              var _next2 = nodes[--j];
              if (_next2) after += _next2.size;
            }
          }

          var brk = 0;

          if (nodes[i - 1] == null) {
            brk = 1;
            i--;
          } else if (nodes[i] == null) {
            brk = 1;
            j++;
          }

          return new HeightMapBranch(HeightMap.of(nodes.slice(0, i)), brk, HeightMap.of(nodes.slice(j)));
        }

      };
      HeightMap.prototype.size = 1;
      HeightMapBlock = class extends HeightMap {
        constructor(length, height, type) {
          super(length, height);
          this.type = type;
        }

        blockAt(_height, _doc, top2, offset) {
          return new BlockInfo(offset, this.length, top2, this.height, this.type);
        }

        lineAt(_value, _type, doc2, top2, offset) {
          return this.blockAt(0, doc2, top2, offset);
        }

        forEachLine(from, to, doc2, top2, offset, f) {
          if (from <= offset + this.length && to >= offset) f(this.blockAt(0, doc2, top2, offset));
        }

        updateHeight(oracle) {
          var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

          var _force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

          var measured = arguments.length > 3 ? arguments[3] : undefined;
          if (measured && measured.from <= offset && measured.more) this.setHeight(oracle, measured.heights[measured.index++]);
          this.outdated = false;
          return this;
        }

        toString() {
          return "block(".concat(this.length, ")");
        }

      };
      HeightMapText = class extends HeightMapBlock {
        constructor(length, height) {
          super(length, height, BlockType.Text);
          this.collapsed = 0;
          this.widgetHeight = 0;
        }

        replace(_from, _to, nodes) {
          var node = nodes[0];

          if (nodes.length == 1 && (node instanceof HeightMapText || node instanceof HeightMapGap && node.flags & 4) && Math.abs(this.length - node.length) < 10) {
            if (node instanceof HeightMapGap) node = new HeightMapText(node.length, this.height);else node.height = this.height;
            if (!this.outdated) node.outdated = false;
            return node;
          } else {
            return HeightMap.of(nodes);
          }
        }

        updateHeight(oracle) {
          var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var measured = arguments.length > 3 ? arguments[3] : undefined;
          if (measured && measured.from <= offset && measured.more) this.setHeight(oracle, measured.heights[measured.index++]);else if (force || this.outdated) this.setHeight(oracle, Math.max(this.widgetHeight, oracle.heightForLine(this.length - this.collapsed)));
          this.outdated = false;
          return this;
        }

        toString() {
          return "line(".concat(this.length).concat(this.collapsed ? -this.collapsed : "").concat(this.widgetHeight ? ":" + this.widgetHeight : "", ")");
        }

      };
      HeightMapGap = class extends HeightMap {
        constructor(length) {
          super(length, 0);
        }

        lines(doc2, offset) {
          var firstLine = doc2.lineAt(offset).number,
              lastLine = doc2.lineAt(offset + this.length).number;
          return {
            firstLine,
            lastLine,
            lineHeight: this.height / (lastLine - firstLine + 1)
          };
        }

        blockAt(height, doc2, top2, offset) {
          var _this$lines = this.lines(doc2, offset),
              firstLine = _this$lines.firstLine,
              lastLine = _this$lines.lastLine,
              lineHeight = _this$lines.lineHeight;

          var line = Math.max(0, Math.min(lastLine - firstLine, Math.floor((height - top2) / lineHeight)));

          var _doc2$line = doc2.line(firstLine + line),
              from = _doc2$line.from,
              length = _doc2$line.length;

          return new BlockInfo(from, length, top2 + lineHeight * line, lineHeight, BlockType.Text);
        }

        lineAt(value, type, doc2, top2, offset) {
          if (type == QueryType.ByHeight) return this.blockAt(value, doc2, top2, offset);

          if (type == QueryType.ByPosNoHeight) {
            var _doc2$lineAt = doc2.lineAt(value),
                from2 = _doc2$lineAt.from,
                to = _doc2$lineAt.to;

            return new BlockInfo(from2, to - from2, 0, 0, BlockType.Text);
          }

          var _this$lines2 = this.lines(doc2, offset),
              firstLine = _this$lines2.firstLine,
              lineHeight = _this$lines2.lineHeight;

          var _doc2$lineAt2 = doc2.lineAt(value),
              from = _doc2$lineAt2.from,
              length = _doc2$lineAt2.length,
              number2 = _doc2$lineAt2.number;

          return new BlockInfo(from, length, top2 + lineHeight * (number2 - firstLine), lineHeight, BlockType.Text);
        }

        forEachLine(from, to, doc2, top2, offset, f) {
          var _this$lines3 = this.lines(doc2, offset),
              firstLine = _this$lines3.firstLine,
              lineHeight = _this$lines3.lineHeight;

          for (var pos = Math.max(from, offset), end = Math.min(offset + this.length, to); pos <= end;) {
            var line = doc2.lineAt(pos);
            if (pos == from) top2 += lineHeight * (line.number - firstLine);
            f(new BlockInfo(line.from, line.length, top2, lineHeight, BlockType.Text));
            top2 += lineHeight;
            pos = line.to + 1;
          }
        }

        replace(from, to, nodes) {
          var after = this.length - to;

          if (after > 0) {
            var last = nodes[nodes.length - 1];
            if (last instanceof HeightMapGap) nodes[nodes.length - 1] = new HeightMapGap(last.length + after);else nodes.push(null, new HeightMapGap(after - 1));
          }

          if (from > 0) {
            var first = nodes[0];
            if (first instanceof HeightMapGap) nodes[0] = new HeightMapGap(from + first.length);else nodes.unshift(new HeightMapGap(from - 1), null);
          }

          return HeightMap.of(nodes);
        }

        decomposeLeft(to, result) {
          result.push(new HeightMapGap(to - 1), null);
        }

        decomposeRight(from, result) {
          result.push(null, new HeightMapGap(this.length - from - 1));
        }

        updateHeight(oracle) {
          var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var measured = arguments.length > 3 ? arguments[3] : undefined;
          var end = offset + this.length;

          if (measured && measured.from <= offset + this.length && measured.more) {
            var nodes = [],
                pos = Math.max(offset, measured.from),
                singleHeight = -1;
            var wasChanged = oracle.heightChanged;
            if (measured.from > offset) nodes.push(new HeightMapGap(measured.from - offset - 1).updateHeight(oracle, offset));

            while (pos <= end && measured.more) {
              var len = oracle.doc.lineAt(pos).length;
              if (nodes.length) nodes.push(null);
              var height = measured.heights[measured.index++];
              if (singleHeight == -1) singleHeight = height;else if (Math.abs(height - singleHeight) >= Epsilon) singleHeight = -2;
              var line = new HeightMapText(len, height);
              line.outdated = false;
              nodes.push(line);
              pos += len + 1;
            }

            if (pos <= end) nodes.push(null, new HeightMapGap(end - pos).updateHeight(oracle, pos));
            var result = HeightMap.of(nodes);
            oracle.heightChanged = wasChanged || singleHeight < 0 || Math.abs(result.height - this.height) >= Epsilon || Math.abs(singleHeight - this.lines(oracle.doc, offset).lineHeight) >= Epsilon;
            return result;
          } else if (force || this.outdated) {
            this.setHeight(oracle, oracle.heightForGap(offset, offset + this.length));
            this.outdated = false;
          }

          return this;
        }

        toString() {
          return "gap(".concat(this.length, ")");
        }

      };
      HeightMapBranch = class extends HeightMap {
        constructor(left, brk, right) {
          super(left.length + brk + right.length, left.height + right.height, brk | (left.outdated || right.outdated ? 2 : 0));
          this.left = left;
          this.right = right;
          this.size = left.size + right.size;
        }

        get break() {
          return this.flags & 1;
        }

        blockAt(height, doc2, top2, offset) {
          var mid = top2 + this.left.height;
          return height < mid ? this.left.blockAt(height, doc2, top2, offset) : this.right.blockAt(height, doc2, mid, offset + this.left.length + this.break);
        }

        lineAt(value, type, doc2, top2, offset) {
          var rightTop = top2 + this.left.height,
              rightOffset = offset + this.left.length + this.break;
          var left = type == QueryType.ByHeight ? value < rightTop : value < rightOffset;
          var base2 = left ? this.left.lineAt(value, type, doc2, top2, offset) : this.right.lineAt(value, type, doc2, rightTop, rightOffset);
          if (this.break || (left ? base2.to < rightOffset : base2.from > rightOffset)) return base2;
          var subQuery = type == QueryType.ByPosNoHeight ? QueryType.ByPosNoHeight : QueryType.ByPos;
          if (left) return base2.join(this.right.lineAt(rightOffset, subQuery, doc2, rightTop, rightOffset));else return this.left.lineAt(rightOffset, subQuery, doc2, top2, offset).join(base2);
        }

        forEachLine(from, to, doc2, top2, offset, f) {
          var rightTop = top2 + this.left.height,
              rightOffset = offset + this.left.length + this.break;

          if (this.break) {
            if (from < rightOffset) this.left.forEachLine(from, to, doc2, top2, offset, f);
            if (to >= rightOffset) this.right.forEachLine(from, to, doc2, rightTop, rightOffset, f);
          } else {
            var mid = this.lineAt(rightOffset, QueryType.ByPos, doc2, top2, offset);
            if (from < mid.from) this.left.forEachLine(from, mid.from - 1, doc2, top2, offset, f);
            if (mid.to >= from && mid.from <= to) f(mid);
            if (to > mid.to) this.right.forEachLine(mid.to + 1, to, doc2, rightTop, rightOffset, f);
          }
        }

        replace(from, to, nodes) {
          var rightStart = this.left.length + this.break;
          if (to < rightStart) return this.balanced(this.left.replace(from, to, nodes), this.right);
          if (from > this.left.length) return this.balanced(this.left, this.right.replace(from - rightStart, to - rightStart, nodes));
          var result = [];
          if (from > 0) this.decomposeLeft(from, result);
          var left = result.length;

          var _iterator68 = _createForOfIteratorHelper(nodes),
              _step68;

          try {
            for (_iterator68.s(); !(_step68 = _iterator68.n()).done;) {
              var node = _step68.value;
              result.push(node);
            }
          } catch (err) {
            _iterator68.e(err);
          } finally {
            _iterator68.f();
          }

          if (from > 0) mergeGaps(result, left - 1);

          if (to < this.length) {
            var right = result.length;
            this.decomposeRight(to, result);
            mergeGaps(result, right);
          }

          return HeightMap.of(result);
        }

        decomposeLeft(to, result) {
          var left = this.left.length;
          if (to <= left) return this.left.decomposeLeft(to, result);
          result.push(this.left);

          if (this.break) {
            left++;
            if (to >= left) result.push(null);
          }

          if (to > left) this.right.decomposeLeft(to - left, result);
        }

        decomposeRight(from, result) {
          var left = this.left.length,
              right = left + this.break;
          if (from >= right) return this.right.decomposeRight(from - right, result);
          if (from < left) this.left.decomposeRight(from, result);
          if (this.break && from < right) result.push(null);
          result.push(this.right);
        }

        balanced(left, right) {
          if (left.size > 2 * right.size || right.size > 2 * left.size) return HeightMap.of(this.break ? [left, null, right] : [left, right]);
          this.left = left;
          this.right = right;
          this.height = left.height + right.height;
          this.outdated = left.outdated || right.outdated;
          this.size = left.size + right.size;
          this.length = left.length + this.break + right.length;
          return this;
        }

        updateHeight(oracle) {
          var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var measured = arguments.length > 3 ? arguments[3] : undefined;
          var left = this.left,
              right = this.right,
              rightStart = offset + left.length + this.break,
              rebalance = null;
          if (measured && measured.from <= offset + left.length && measured.more) rebalance = left = left.updateHeight(oracle, offset, force, measured);else left.updateHeight(oracle, offset, force);
          if (measured && measured.from <= rightStart + right.length && measured.more) rebalance = right = right.updateHeight(oracle, rightStart, force, measured);else right.updateHeight(oracle, rightStart, force);
          if (rebalance) return this.balanced(left, right);
          this.height = this.left.height + this.right.height;
          this.outdated = false;
          return this;
        }

        toString() {
          return this.left + (this.break ? " " : "-") + this.right;
        }

      };
      relevantWidgetHeight = 5;
      NodeBuilder = class {
        constructor(pos, oracle) {
          this.pos = pos;
          this.oracle = oracle;
          this.nodes = [];
          this.lineStart = -1;
          this.lineEnd = -1;
          this.covering = null;
          this.writtenTo = pos;
        }

        get isCovered() {
          return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
        }

        span(_from, to) {
          if (this.lineStart > -1) {
            var end = Math.min(to, this.lineEnd),
                last = this.nodes[this.nodes.length - 1];
            if (last instanceof HeightMapText) last.length += end - this.pos;else if (end > this.pos || !this.isCovered) this.nodes.push(new HeightMapText(end - this.pos, -1));
            this.writtenTo = end;

            if (to > end) {
              this.nodes.push(null);
              this.writtenTo++;
              this.lineStart = -1;
            }
          }

          this.pos = to;
        }

        point(from, to, deco) {
          if (from < to || deco.heightRelevant) {
            var height = deco.widget ? deco.widget.estimatedHeight : 0;
            if (height < 0) height = this.oracle.lineHeight;
            var len = to - from;

            if (deco.block) {
              this.addBlock(new HeightMapBlock(len, height, deco.type));
            } else if (len || height >= relevantWidgetHeight) {
              this.addLineDeco(height, len);
            }
          } else if (to > from) {
            this.span(from, to);
          }

          if (this.lineEnd > -1 && this.lineEnd < this.pos) this.lineEnd = this.oracle.doc.lineAt(this.pos).to;
        }

        enterLine() {
          if (this.lineStart > -1) return;

          var _this$oracle$doc$line = this.oracle.doc.lineAt(this.pos),
              from = _this$oracle$doc$line.from,
              to = _this$oracle$doc$line.to;

          this.lineStart = from;
          this.lineEnd = to;

          if (this.writtenTo < from) {
            if (this.writtenTo < from - 1 || this.nodes[this.nodes.length - 1] == null) this.nodes.push(this.blankContent(this.writtenTo, from - 1));
            this.nodes.push(null);
          }

          if (this.pos > from) this.nodes.push(new HeightMapText(this.pos - from, -1));
          this.writtenTo = this.pos;
        }

        blankContent(from, to) {
          var gap = new HeightMapGap(to - from);
          if (this.oracle.doc.lineAt(from).to == to) gap.flags |= 4;
          return gap;
        }

        ensureLine() {
          this.enterLine();
          var last = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
          if (last instanceof HeightMapText) return last;
          var line = new HeightMapText(0, -1);
          this.nodes.push(line);
          return line;
        }

        addBlock(block) {
          this.enterLine();
          if (block.type == BlockType.WidgetAfter && !this.isCovered) this.ensureLine();
          this.nodes.push(block);
          this.writtenTo = this.pos = this.pos + block.length;
          if (block.type != BlockType.WidgetBefore) this.covering = block;
        }

        addLineDeco(height, length) {
          var line = this.ensureLine();
          line.length += length;
          line.collapsed += length;
          line.widgetHeight = Math.max(line.widgetHeight, height);
          this.writtenTo = this.pos = this.pos + length;
        }

        finish(from) {
          var last = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
          if (this.lineStart > -1 && !(last instanceof HeightMapText) && !this.isCovered) this.nodes.push(new HeightMapText(0, -1));else if (this.writtenTo < this.pos || last == null) this.nodes.push(this.blankContent(this.writtenTo, this.pos));
          var pos = from;

          var _iterator69 = _createForOfIteratorHelper(this.nodes),
              _step69;

          try {
            for (_iterator69.s(); !(_step69 = _iterator69.n()).done;) {
              var node = _step69.value;
              if (node instanceof HeightMapText) node.updateHeight(this.oracle, pos);
              pos += node ? node.length : 1;
            }
          } catch (err) {
            _iterator69.e(err);
          } finally {
            _iterator69.f();
          }

          return this.nodes;
        }

        static build(oracle, decorations2, from, to) {
          var builder = new NodeBuilder(from, oracle);
          RangeSet.spans(decorations2, from, to, builder, 0);
          return builder.finish(from);
        }

      };
      DecorationComparator = class {
        constructor() {
          this.changes = [];
        }

        compareRange() {}

        comparePoint(from, to, a, b) {
          if (from < to || a && a.heightRelevant || b && b.heightRelevant) addRange(from, to, this.changes, 5);
        }

      };
      LineGap = class {
        constructor(from, to, size) {
          this.from = from;
          this.to = to;
          this.size = size;
        }

        static same(a, b) {
          if (a.length != b.length) return false;

          for (var _i98 = 0; _i98 < a.length; _i98++) {
            var gA = a[_i98],
                gB = b[_i98];
            if (gA.from != gB.from || gA.to != gB.to || gA.size != gB.size) return false;
          }

          return true;
        }

        draw(wrapping) {
          return Decoration.replace({
            widget: new LineGapWidget(this.size, wrapping)
          }).range(this.from, this.to);
        }

      };
      LineGapWidget = class extends WidgetType {
        constructor(size, vertical) {
          super();
          this.size = size;
          this.vertical = vertical;
        }

        eq(other) {
          return other.size == this.size && other.vertical == this.vertical;
        }

        toDOM() {
          var elt = document.createElement("div");

          if (this.vertical) {
            elt.style.height = this.size + "px";
          } else {
            elt.style.width = this.size + "px";
            elt.style.height = "2px";
            elt.style.display = "inline-block";
          }

          return elt;
        }

        get estimatedHeight() {
          return this.vertical ? this.size : -1;
        }

      };
      ViewState = class {
        constructor(state) {
          this.state = state;
          this.pixelViewport = {
            left: 0,
            right: window.innerWidth,
            top: 0,
            bottom: 0
          };
          this.inView = true;
          this.paddingTop = 0;
          this.paddingBottom = 0;
          this.contentDOMWidth = 0;
          this.contentDOMHeight = 0;
          this.editorHeight = 0;
          this.editorWidth = 0;
          this.heightOracle = new HeightOracle();
          this.scaler = IdScaler;
          this.scrollTarget = null;
          this.printing = false;
          this.mustMeasureContent = true;
          this.defaultTextDirection = Direction.RTL;
          this.visibleRanges = [];
          this.mustEnforceCursorAssoc = false;
          this.stateDeco = state.facet(decorations).filter(d => typeof d != "function");
          this.heightMap = HeightMap.empty().applyChanges(this.stateDeco, Text.empty, this.heightOracle.setDoc(state.doc), [new ChangedRange(0, 0, 0, state.doc.length)]);
          this.viewport = this.getViewport(0, null);
          this.updateViewportLines();
          this.updateForViewport();
          this.lineGaps = this.ensureLineGaps([]);
          this.lineGapDeco = Decoration.set(this.lineGaps.map(gap => gap.draw(false)));
          this.computeVisibleRanges();
        }

        updateForViewport() {
          var _this3 = this;

          var viewports = [this.viewport],
              main = this.state.selection.main;

          var _loop9 = function _loop9(_i99) {
            var pos = _i99 ? main.head : main.anchor;

            if (!viewports.some(_ref11 => {
              var from = _ref11.from,
                  to = _ref11.to;
              return pos >= from && pos <= to;
            })) {
              var _this3$lineBlockAt = _this3.lineBlockAt(pos),
                  from = _this3$lineBlockAt.from,
                  to = _this3$lineBlockAt.to;

              viewports.push(new Viewport(from, to));
            }
          };

          for (var _i99 = 0; _i99 <= 1; _i99++) {
            _loop9(_i99);
          }

          this.viewports = viewports.sort((a, b) => a.from - b.from);
          this.scaler = this.heightMap.height <= 7e6 ? IdScaler : new BigScaler(this.heightOracle.doc, this.heightMap, this.viewports);
        }

        updateViewportLines() {
          this.viewportLines = [];
          this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.state.doc, 0, 0, block => {
            this.viewportLines.push(this.scaler.scale == 1 ? block : scaleBlock(block, this.scaler));
          });
        }

        update(update) {
          var scrollTarget = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          this.state = update.state;
          var prevDeco = this.stateDeco;
          this.stateDeco = this.state.facet(decorations).filter(d => typeof d != "function");
          var contentChanges = update.changedRanges;
          var heightChanges = ChangedRange.extendWithRanges(contentChanges, heightRelevantDecoChanges(prevDeco, this.stateDeco, update ? update.changes : ChangeSet.empty(this.state.doc.length)));
          var prevHeight = this.heightMap.height;
          this.heightMap = this.heightMap.applyChanges(this.stateDeco, update.startState.doc, this.heightOracle.setDoc(this.state.doc), heightChanges);
          if (this.heightMap.height != prevHeight) update.flags |= 2;
          var viewport = heightChanges.length ? this.mapViewport(this.viewport, update.changes) : this.viewport;
          if (scrollTarget && (scrollTarget.range.head < viewport.from || scrollTarget.range.head > viewport.to) || !this.viewportIsAppropriate(viewport)) viewport = this.getViewport(0, scrollTarget);
          var updateLines = !update.changes.empty || update.flags & 2 || viewport.from != this.viewport.from || viewport.to != this.viewport.to;
          this.viewport = viewport;
          this.updateForViewport();
          if (updateLines) this.updateViewportLines();
          if (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, update.changes)));
          update.flags |= this.computeVisibleRanges();
          if (scrollTarget) this.scrollTarget = scrollTarget;
          if (!this.mustEnforceCursorAssoc && update.selectionSet && update.view.lineWrapping && update.state.selection.main.empty && update.state.selection.main.assoc) this.mustEnforceCursorAssoc = true;
        }

        measure(view) {
          var dom = view.contentDOM,
              style = window.getComputedStyle(dom);
          var oracle = this.heightOracle;
          var whiteSpace = style.whiteSpace;
          this.defaultTextDirection = style.direction == "rtl" ? Direction.RTL : Direction.LTR;
          var refresh = this.heightOracle.mustRefreshForWrapping(whiteSpace);
          var measureContent = refresh || this.mustMeasureContent || this.contentDOMHeight != dom.clientHeight;
          this.contentDOMHeight = dom.clientHeight;
          this.mustMeasureContent = false;
          var result = 0,
              bias = 0;
          var paddingTop = parseInt(style.paddingTop) || 0,
              paddingBottom = parseInt(style.paddingBottom) || 0;

          if (this.paddingTop != paddingTop || this.paddingBottom != paddingBottom) {
            this.paddingTop = paddingTop;
            this.paddingBottom = paddingBottom;
            result |= 8 | 2;
          }

          if (this.editorWidth != view.scrollDOM.clientWidth) {
            if (oracle.lineWrapping) measureContent = true;
            this.editorWidth = view.scrollDOM.clientWidth;
            result |= 8;
          }

          var pixelViewport = (this.printing ? fullPixelRange : visiblePixelRange)(dom, this.paddingTop);
          var dTop = pixelViewport.top - this.pixelViewport.top,
              dBottom = pixelViewport.bottom - this.pixelViewport.bottom;
          this.pixelViewport = pixelViewport;
          var inView = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;

          if (inView != this.inView) {
            this.inView = inView;
            if (inView) measureContent = true;
          }

          if (!this.inView) return 0;
          var contentWidth = dom.clientWidth;

          if (this.contentDOMWidth != contentWidth || this.editorHeight != view.scrollDOM.clientHeight) {
            this.contentDOMWidth = contentWidth;
            this.editorHeight = view.scrollDOM.clientHeight;
            result |= 8;
          }

          if (measureContent) {
            var lineHeights = view.docView.measureVisibleLineHeights(this.viewport);
            if (oracle.mustRefreshForHeights(lineHeights)) refresh = true;

            if (refresh || oracle.lineWrapping && Math.abs(contentWidth - this.contentDOMWidth) > oracle.charWidth) {
              var _view$docView$measure = view.docView.measureTextSize(),
                  lineHeight = _view$docView$measure.lineHeight,
                  charWidth = _view$docView$measure.charWidth;

              refresh = oracle.refresh(whiteSpace, lineHeight, charWidth, contentWidth / charWidth, lineHeights);

              if (refresh) {
                view.docView.minWidth = 0;
                result |= 8;
              }
            }

            if (dTop > 0 && dBottom > 0) bias = Math.max(dTop, dBottom);else if (dTop < 0 && dBottom < 0) bias = Math.min(dTop, dBottom);
            oracle.heightChanged = false;

            var _iterator70 = _createForOfIteratorHelper(this.viewports),
                _step70;

            try {
              for (_iterator70.s(); !(_step70 = _iterator70.n()).done;) {
                var vp = _step70.value;
                var heights = vp.from == this.viewport.from ? lineHeights : view.docView.measureVisibleLineHeights(vp);
                this.heightMap = this.heightMap.updateHeight(oracle, 0, refresh, new MeasuredHeights(vp.from, heights));
              }
            } catch (err) {
              _iterator70.e(err);
            } finally {
              _iterator70.f();
            }

            if (oracle.heightChanged) result |= 2;
          }

          var viewportChange = !this.viewportIsAppropriate(this.viewport, bias) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
          if (viewportChange) this.viewport = this.getViewport(bias, this.scrollTarget);
          this.updateForViewport();
          if (result & 2 || viewportChange) this.updateViewportLines();
          if (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) this.updateLineGaps(this.ensureLineGaps(refresh ? [] : this.lineGaps));
          result |= this.computeVisibleRanges();

          if (this.mustEnforceCursorAssoc) {
            this.mustEnforceCursorAssoc = false;
            view.docView.enforceCursorAssoc();
          }

          return result;
        }

        get visibleTop() {
          return this.scaler.fromDOM(this.pixelViewport.top);
        }

        get visibleBottom() {
          return this.scaler.fromDOM(this.pixelViewport.bottom);
        }

        getViewport(bias, scrollTarget) {
          var marginTop = 0.5 - Math.max(-0.5, Math.min(0.5, bias / 1e3 / 2));
          var map = this.heightMap,
              doc2 = this.state.doc,
              visibleTop = this.visibleTop,
              visibleBottom = this.visibleBottom;
          var viewport = new Viewport(map.lineAt(visibleTop - marginTop * 1e3, QueryType.ByHeight, doc2, 0, 0).from, map.lineAt(visibleBottom + (1 - marginTop) * 1e3, QueryType.ByHeight, doc2, 0, 0).to);

          if (scrollTarget) {
            var head = scrollTarget.range.head;

            if (head < viewport.from || head > viewport.to) {
              var viewHeight = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top);
              var block = map.lineAt(head, QueryType.ByPos, doc2, 0, 0),
                  topPos;
              if (scrollTarget.y == "center") topPos = (block.top + block.bottom) / 2 - viewHeight / 2;else if (scrollTarget.y == "start" || scrollTarget.y == "nearest" && head < viewport.from) topPos = block.top;else topPos = block.bottom - viewHeight;
              viewport = new Viewport(map.lineAt(topPos - 1e3 / 2, QueryType.ByHeight, doc2, 0, 0).from, map.lineAt(topPos + viewHeight + 1e3 / 2, QueryType.ByHeight, doc2, 0, 0).to);
            }
          }

          return viewport;
        }

        mapViewport(viewport, changes) {
          var from = changes.mapPos(viewport.from, -1),
              to = changes.mapPos(viewport.to, 1);
          return new Viewport(this.heightMap.lineAt(from, QueryType.ByPos, this.state.doc, 0, 0).from, this.heightMap.lineAt(to, QueryType.ByPos, this.state.doc, 0, 0).to);
        }

        viewportIsAppropriate(_ref12) {
          var from = _ref12.from,
              to = _ref12.to;
          var bias = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          if (!this.inView) return true;

          var _this$heightMap$lineA = this.heightMap.lineAt(from, QueryType.ByPos, this.state.doc, 0, 0),
              top2 = _this$heightMap$lineA.top;

          var _this$heightMap$lineA2 = this.heightMap.lineAt(to, QueryType.ByPos, this.state.doc, 0, 0),
              bottom = _this$heightMap$lineA2.bottom;

          var visibleTop = this.visibleTop,
              visibleBottom = this.visibleBottom;
          return (from == 0 || top2 <= visibleTop - Math.max(10, Math.min(-bias, 250))) && (to == this.state.doc.length || bottom >= visibleBottom + Math.max(10, Math.min(bias, 250))) && top2 > visibleTop - 2 * 1e3 && bottom < visibleBottom + 2 * 1e3;
        }

        mapLineGaps(gaps, changes) {
          if (!gaps.length || changes.empty) return gaps;
          var mapped = [];

          var _iterator71 = _createForOfIteratorHelper(gaps),
              _step71;

          try {
            for (_iterator71.s(); !(_step71 = _iterator71.n()).done;) {
              var gap = _step71.value;
              if (!changes.touchesRange(gap.from, gap.to)) mapped.push(new LineGap(changes.mapPos(gap.from), changes.mapPos(gap.to), gap.size));
            }
          } catch (err) {
            _iterator71.e(err);
          } finally {
            _iterator71.f();
          }

          return mapped;
        }

        ensureLineGaps(current) {
          var _this4 = this;

          var gaps = [];
          if (this.defaultTextDirection != Direction.LTR) return gaps;

          var _iterator72 = _createForOfIteratorHelper(this.viewportLines),
              _step72;

          try {
            var _loop10 = function _loop10() {
              var line = _step72.value;
              if (line.length < 4e3) return "continue";
              var structure = lineStructure(line.from, line.to, _this4.stateDeco);
              if (structure.total < 4e3) return "continue";
              var viewFrom = void 0,
                  viewTo = void 0;

              if (_this4.heightOracle.lineWrapping) {
                var marginHeight = 2e3 / _this4.heightOracle.lineLength * _this4.heightOracle.lineHeight;
                viewFrom = findPosition(structure, (_this4.visibleTop - line.top - marginHeight) / line.height);
                viewTo = findPosition(structure, (_this4.visibleBottom - line.top + marginHeight) / line.height);
              } else {
                var totalWidth = structure.total * _this4.heightOracle.charWidth;
                var marginWidth = 2e3 * _this4.heightOracle.charWidth;
                viewFrom = findPosition(structure, (_this4.pixelViewport.left - marginWidth) / totalWidth);
                viewTo = findPosition(structure, (_this4.pixelViewport.right + marginWidth) / totalWidth);
              }

              var outside = [];
              if (viewFrom > line.from) outside.push({
                from: line.from,
                to: viewFrom
              });
              if (viewTo < line.to) outside.push({
                from: viewTo,
                to: line.to
              });
              var sel = _this4.state.selection.main;
              if (sel.from >= line.from && sel.from <= line.to) cutRange(outside, sel.from - 10, sel.from + 10);
              if (!sel.empty && sel.to >= line.from && sel.to <= line.to) cutRange(outside, sel.to - 10, sel.to + 10);

              var _loop11 = function _loop11() {
                var _outside$_i = _outside[_i100],
                    from = _outside$_i.from,
                    to = _outside$_i.to;

                if (to - from > 1e3) {
                  gaps.push(find(current, gap => gap.from >= line.from && gap.to <= line.to && Math.abs(gap.from - from) < 1e3 && Math.abs(gap.to - to) < 1e3) || new LineGap(from, to, _this4.gapSize(line, from, to, structure)));
                }
              };

              for (var _i100 = 0, _outside = outside; _i100 < _outside.length; _i100++) {
                _loop11();
              }
            };

            for (_iterator72.s(); !(_step72 = _iterator72.n()).done;) {
              var _ret = _loop10();

              if (_ret === "continue") continue;
            }
          } catch (err) {
            _iterator72.e(err);
          } finally {
            _iterator72.f();
          }

          return gaps;
        }

        gapSize(line, from, to, structure) {
          var fraction = findFraction(structure, to) - findFraction(structure, from);

          if (this.heightOracle.lineWrapping) {
            return line.height * fraction;
          } else {
            return structure.total * this.heightOracle.charWidth * fraction;
          }
        }

        updateLineGaps(gaps) {
          if (!LineGap.same(gaps, this.lineGaps)) {
            this.lineGaps = gaps;
            this.lineGapDeco = Decoration.set(gaps.map(gap => gap.draw(this.heightOracle.lineWrapping)));
          }
        }

        computeVisibleRanges() {
          var deco = this.stateDeco;
          if (this.lineGaps.length) deco = deco.concat(this.lineGapDeco);
          var ranges = [];
          RangeSet.spans(deco, this.viewport.from, this.viewport.to, {
            span(from, to) {
              ranges.push({
                from,
                to
              });
            },

            point() {}

          }, 20);
          var changed = ranges.length != this.visibleRanges.length || this.visibleRanges.some((r, i) => r.from != ranges[i].from || r.to != ranges[i].to);
          this.visibleRanges = ranges;
          return changed ? 4 : 0;
        }

        lineBlockAt(pos) {
          return pos >= this.viewport.from && pos <= this.viewport.to && this.viewportLines.find(b => b.from <= pos && b.to >= pos) || scaleBlock(this.heightMap.lineAt(pos, QueryType.ByPos, this.state.doc, 0, 0), this.scaler);
        }

        lineBlockAtHeight(height) {
          return scaleBlock(this.heightMap.lineAt(this.scaler.fromDOM(height), QueryType.ByHeight, this.state.doc, 0, 0), this.scaler);
        }

        elementAtHeight(height) {
          return scaleBlock(this.heightMap.blockAt(this.scaler.fromDOM(height), this.state.doc, 0, 0), this.scaler);
        }

        get docHeight() {
          return this.scaler.toDOM(this.heightMap.height);
        }

        get contentHeight() {
          return this.docHeight + this.paddingTop + this.paddingBottom;
        }

      };
      Viewport = class {
        constructor(from, to) {
          this.from = from;
          this.to = to;
        }

      };
      IdScaler = {
        toDOM(n) {
          return n;
        },

        fromDOM(n) {
          return n;
        },

        scale: 1
      };
      BigScaler = class {
        constructor(doc2, heightMap, viewports) {
          var vpHeight = 0,
              base2 = 0,
              domBase = 0;
          this.viewports = viewports.map(_ref13 => {
            var from = _ref13.from,
                to = _ref13.to;
            var top2 = heightMap.lineAt(from, QueryType.ByPos, doc2, 0, 0).top;
            var bottom = heightMap.lineAt(to, QueryType.ByPos, doc2, 0, 0).bottom;
            vpHeight += bottom - top2;
            return {
              from,
              to,
              top: top2,
              bottom,
              domTop: 0,
              domBottom: 0
            };
          });
          this.scale = (7e6 - vpHeight) / (heightMap.height - vpHeight);

          var _iterator73 = _createForOfIteratorHelper(this.viewports),
              _step73;

          try {
            for (_iterator73.s(); !(_step73 = _iterator73.n()).done;) {
              var obj = _step73.value;
              obj.domTop = domBase + (obj.top - base2) * this.scale;
              domBase = obj.domBottom = obj.domTop + (obj.bottom - obj.top);
              base2 = obj.bottom;
            }
          } catch (err) {
            _iterator73.e(err);
          } finally {
            _iterator73.f();
          }
        }

        toDOM(n) {
          for (var _i101 = 0, base2 = 0, domBase = 0;; _i101++) {
            var vp = _i101 < this.viewports.length ? this.viewports[_i101] : null;
            if (!vp || n < vp.top) return domBase + (n - base2) * this.scale;
            if (n <= vp.bottom) return vp.domTop + (n - vp.top);
            base2 = vp.bottom;
            domBase = vp.domBottom;
          }
        }

        fromDOM(n) {
          for (var _i102 = 0, base2 = 0, domBase = 0;; _i102++) {
            var vp = _i102 < this.viewports.length ? this.viewports[_i102] : null;
            if (!vp || n < vp.domTop) return base2 + (n - domBase) / this.scale;
            if (n <= vp.domBottom) return vp.top + (n - vp.domTop);
            base2 = vp.bottom;
            domBase = vp.domBottom;
          }
        }

      };
      theme = /* @__PURE__ */Facet.define({
        combine: strs => strs.join(" ")
      });
      darkTheme = /* @__PURE__ */Facet.define({
        combine: values => values.indexOf(true) > -1
      });
      baseThemeID = /* @__PURE__ */StyleModule.newName();
      baseLightID = /* @__PURE__ */StyleModule.newName();
      baseDarkID = /* @__PURE__ */StyleModule.newName();
      lightDarkIDs = {
        "&light": "." + baseLightID,
        "&dark": "." + baseDarkID
      };
      baseTheme$1 = /* @__PURE__ */buildTheme("." + baseThemeID, {
        "&.cm-editor": {
          position: "relative !important",
          boxSizing: "border-box",
          "&.cm-focused": {
            outline: "1px dotted #212121"
          },
          display: "flex !important",
          flexDirection: "column"
        },
        ".cm-scroller": {
          display: "flex !important",
          alignItems: "flex-start !important",
          fontFamily: "monospace",
          lineHeight: 1.4,
          height: "100%",
          overflowX: "auto",
          position: "relative",
          zIndex: 0
        },
        ".cm-content": {
          margin: 0,
          flexGrow: 2,
          minHeight: "100%",
          display: "block",
          whiteSpace: "pre",
          wordWrap: "normal",
          boxSizing: "border-box",
          padding: "4px 0",
          outline: "none",
          "&[contenteditable=true]": {
            WebkitUserModify: "read-write-plaintext-only"
          }
        },
        ".cm-lineWrapping": {
          whiteSpace_fallback: "pre-wrap",
          whiteSpace: "break-spaces",
          wordBreak: "break-word",
          overflowWrap: "anywhere"
        },
        "&light .cm-content": {
          caretColor: "black"
        },
        "&dark .cm-content": {
          caretColor: "white"
        },
        ".cm-line": {
          display: "block",
          padding: "0 2px 0 4px"
        },
        ".cm-selectionLayer": {
          zIndex: -1,
          contain: "size style"
        },
        ".cm-selectionBackground": {
          position: "absolute"
        },
        "&light .cm-selectionBackground": {
          background: "#d9d9d9"
        },
        "&dark .cm-selectionBackground": {
          background: "#222"
        },
        "&light.cm-focused .cm-selectionBackground": {
          background: "#d7d4f0"
        },
        "&dark.cm-focused .cm-selectionBackground": {
          background: "#233"
        },
        ".cm-cursorLayer": {
          zIndex: 100,
          contain: "size style",
          pointerEvents: "none"
        },
        "&.cm-focused .cm-cursorLayer": {
          animation: "steps(1) cm-blink 1.2s infinite"
        },
        "@keyframes cm-blink": {
          "0%": {},
          "50%": {
            visibility: "hidden"
          },
          "100%": {}
        },
        "@keyframes cm-blink2": {
          "0%": {},
          "50%": {
            visibility: "hidden"
          },
          "100%": {}
        },
        ".cm-cursor, .cm-dropCursor": {
          position: "absolute",
          borderLeft: "1.2px solid black",
          marginLeft: "-0.6px",
          pointerEvents: "none"
        },
        ".cm-cursor": {
          display: "none"
        },
        "&dark .cm-cursor": {
          borderLeftColor: "#444"
        },
        "&.cm-focused .cm-cursor": {
          display: "block"
        },
        "&light .cm-activeLine": {
          backgroundColor: "#f3f9ff"
        },
        "&dark .cm-activeLine": {
          backgroundColor: "#223039"
        },
        "&light .cm-specialChar": {
          color: "red"
        },
        "&dark .cm-specialChar": {
          color: "#f78"
        },
        ".cm-gutters": {
          display: "flex",
          height: "100%",
          boxSizing: "border-box",
          left: 0,
          zIndex: 200
        },
        "&light .cm-gutters": {
          backgroundColor: "#f5f5f5",
          color: "#6c6c6c",
          borderRight: "1px solid #ddd"
        },
        "&dark .cm-gutters": {
          backgroundColor: "#333338",
          color: "#ccc"
        },
        ".cm-gutter": {
          display: "flex !important",
          flexDirection: "column",
          flexShrink: 0,
          boxSizing: "border-box",
          minHeight: "100%",
          overflow: "hidden"
        },
        ".cm-gutterElement": {
          boxSizing: "border-box"
        },
        ".cm-lineNumbers .cm-gutterElement": {
          padding: "0 3px 0 5px",
          minWidth: "20px",
          textAlign: "right",
          whiteSpace: "nowrap"
        },
        "&light .cm-activeLineGutter": {
          backgroundColor: "#e2f2ff"
        },
        "&dark .cm-activeLineGutter": {
          backgroundColor: "#222227"
        },
        ".cm-panels": {
          boxSizing: "border-box",
          position: "sticky",
          left: 0,
          right: 0
        },
        "&light .cm-panels": {
          backgroundColor: "#f5f5f5",
          color: "black"
        },
        "&light .cm-panels-top": {
          borderBottom: "1px solid #ddd"
        },
        "&light .cm-panels-bottom": {
          borderTop: "1px solid #ddd"
        },
        "&dark .cm-panels": {
          backgroundColor: "#333338",
          color: "white"
        },
        ".cm-tab": {
          display: "inline-block",
          overflow: "hidden",
          verticalAlign: "bottom"
        },
        ".cm-widgetBuffer": {
          verticalAlign: "text-top",
          height: "1em",
          display: "inline"
        },
        ".cm-placeholder": {
          color: "#888",
          display: "inline-block",
          verticalAlign: "top"
        },
        ".cm-button": {
          verticalAlign: "middle",
          color: "inherit",
          fontSize: "70%",
          padding: ".2em 1em",
          borderRadius: "1px"
        },
        "&light .cm-button": {
          backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
          border: "1px solid #888",
          "&:active": {
            backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)"
          }
        },
        "&dark .cm-button": {
          backgroundImage: "linear-gradient(#393939, #111)",
          border: "1px solid #888",
          "&:active": {
            backgroundImage: "linear-gradient(#111, #333)"
          }
        },
        ".cm-textfield": {
          verticalAlign: "middle",
          color: "inherit",
          fontSize: "70%",
          border: "1px solid silver",
          padding: ".2em .5em"
        },
        "&light .cm-textfield": {
          backgroundColor: "white"
        },
        "&dark .cm-textfield": {
          border: "1px solid #555",
          backgroundColor: "inherit"
        }
      }, lightDarkIDs);
      observeOptions = {
        childList: true,
        characterData: true,
        subtree: true,
        attributes: true,
        characterDataOldValue: true
      };
      useCharData = browser.ie && browser.ie_version <= 11;
      DOMObserver = class {
        constructor(view, onChange, onScrollChanged) {
          this.view = view;
          this.onChange = onChange;
          this.onScrollChanged = onScrollChanged;
          this.active = false;
          this.selectionRange = new DOMSelectionState();
          this.selectionChanged = false;
          this.delayedFlush = -1;
          this.resizeTimeout = -1;
          this.queue = [];
          this.delayedAndroidKey = null;
          this.scrollTargets = [];
          this.intersection = null;
          this.resize = null;
          this.intersecting = false;
          this.gapIntersection = null;
          this.gaps = [];
          this.parentCheck = -1;
          this.dom = view.contentDOM;
          this.observer = new MutationObserver(mutations => {
            var _iterator74 = _createForOfIteratorHelper(mutations),
                _step74;

            try {
              for (_iterator74.s(); !(_step74 = _iterator74.n()).done;) {
                var mut = _step74.value;
                this.queue.push(mut);
              }
            } catch (err) {
              _iterator74.e(err);
            } finally {
              _iterator74.f();
            }

            if ((browser.ie && browser.ie_version <= 11 || browser.ios && view.composing) && mutations.some(m => m.type == "childList" && m.removedNodes.length || m.type == "characterData" && m.oldValue.length > m.target.nodeValue.length)) this.flushSoon();else this.flush();
          });
          if (useCharData) this.onCharData = event => {
            this.queue.push({
              target: event.target,
              type: "characterData",
              oldValue: event.prevValue
            });
            this.flushSoon();
          };
          this.onSelectionChange = this.onSelectionChange.bind(this);
          window.addEventListener("resize", this.onResize = this.onResize.bind(this));

          if (typeof ResizeObserver == "function") {
            this.resize = new ResizeObserver(() => {
              if (this.view.docView.lastUpdate < Date.now() - 75) this.onResize();
            });
            this.resize.observe(view.scrollDOM);
          }

          window.addEventListener("beforeprint", this.onPrint = this.onPrint.bind(this));
          this.start();
          window.addEventListener("scroll", this.onScroll = this.onScroll.bind(this));

          if (typeof IntersectionObserver == "function") {
            this.intersection = new IntersectionObserver(entries => {
              if (this.parentCheck < 0) this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3);

              if (entries.length > 0 && entries[entries.length - 1].intersectionRatio > 0 != this.intersecting) {
                this.intersecting = !this.intersecting;
                if (this.intersecting != this.view.inView) this.onScrollChanged(document.createEvent("Event"));
              }
            }, {});
            this.intersection.observe(this.dom);
            this.gapIntersection = new IntersectionObserver(entries => {
              if (entries.length > 0 && entries[entries.length - 1].intersectionRatio > 0) this.onScrollChanged(document.createEvent("Event"));
            }, {});
          }

          this.listenForScroll();
          this.readSelectionRange();
          this.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
        }

        onScroll(e) {
          if (this.intersecting) this.flush(false);
          this.onScrollChanged(e);
        }

        onResize() {
          if (this.resizeTimeout < 0) this.resizeTimeout = setTimeout(() => {
            this.resizeTimeout = -1;
            this.view.requestMeasure();
          }, 50);
        }

        onPrint() {
          this.view.viewState.printing = true;
          this.view.measure();
          setTimeout(() => {
            this.view.viewState.printing = false;
            this.view.requestMeasure();
          }, 500);
        }

        updateGaps(gaps) {
          if (this.gapIntersection && (gaps.length != this.gaps.length || this.gaps.some((g, i) => g != gaps[i]))) {
            this.gapIntersection.disconnect();

            var _iterator75 = _createForOfIteratorHelper(gaps),
                _step75;

            try {
              for (_iterator75.s(); !(_step75 = _iterator75.n()).done;) {
                var gap = _step75.value;
                this.gapIntersection.observe(gap);
              }
            } catch (err) {
              _iterator75.e(err);
            } finally {
              _iterator75.f();
            }

            this.gaps = gaps;
          }
        }

        onSelectionChange(event) {
          if (!this.readSelectionRange() || this.delayedAndroidKey) return;
          var view = this.view,
              sel = this.selectionRange;
          if (view.state.facet(editable) ? view.root.activeElement != this.dom : !hasSelection(view.dom, sel)) return;
          var context = sel.anchorNode && view.docView.nearest(sel.anchorNode);
          if (context && context.ignoreEvent(event)) return;
          if ((browser.ie && browser.ie_version <= 11 || browser.android && browser.chrome) && !view.state.selection.main.empty && sel.focusNode && isEquivalentPosition(sel.focusNode, sel.focusOffset, sel.anchorNode, sel.anchorOffset)) this.flushSoon();else this.flush(false);
        }

        readSelectionRange() {
          var root = this.view.root,
              domSel = getSelection(root);
          var range = browser.safari && root.nodeType == 11 && deepActiveElement() == this.view.contentDOM && safariSelectionRangeHack(this.view) || domSel;
          if (this.selectionRange.eq(range)) return false;
          this.selectionRange.setRange(range);
          return this.selectionChanged = true;
        }

        setSelectionRange(anchor, head) {
          this.selectionRange.set(anchor.node, anchor.offset, head.node, head.offset);
          this.selectionChanged = false;
        }

        clearSelectionRange() {
          this.selectionRange.set(null, 0, null, 0);
        }

        listenForScroll() {
          this.parentCheck = -1;
          var i = 0,
              changed = null;

          for (var dom = this.dom; dom;) {
            if (dom.nodeType == 1) {
              if (!changed && i < this.scrollTargets.length && this.scrollTargets[i] == dom) i++;else if (!changed) changed = this.scrollTargets.slice(0, i);
              if (changed) changed.push(dom);
              dom = dom.assignedSlot || dom.parentNode;
            } else if (dom.nodeType == 11) {
              dom = dom.host;
            } else {
              break;
            }
          }

          if (i < this.scrollTargets.length && !changed) changed = this.scrollTargets.slice(0, i);

          if (changed) {
            var _iterator76 = _createForOfIteratorHelper(this.scrollTargets),
                _step76;

            try {
              for (_iterator76.s(); !(_step76 = _iterator76.n()).done;) {
                var _dom2 = _step76.value;

                _dom2.removeEventListener("scroll", this.onScroll);
              }
            } catch (err) {
              _iterator76.e(err);
            } finally {
              _iterator76.f();
            }

            var _iterator77 = _createForOfIteratorHelper(this.scrollTargets = changed),
                _step77;

            try {
              for (_iterator77.s(); !(_step77 = _iterator77.n()).done;) {
                var _dom3 = _step77.value;

                _dom3.addEventListener("scroll", this.onScroll);
              }
            } catch (err) {
              _iterator77.e(err);
            } finally {
              _iterator77.f();
            }
          }
        }

        ignore(f) {
          if (!this.active) return f();

          try {
            this.stop();
            return f();
          } finally {
            this.start();
            this.clear();
          }
        }

        start() {
          if (this.active) return;
          this.observer.observe(this.dom, observeOptions);
          if (useCharData) this.dom.addEventListener("DOMCharacterDataModified", this.onCharData);
          this.active = true;
        }

        stop() {
          if (!this.active) return;
          this.active = false;
          this.observer.disconnect();
          if (useCharData) this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData);
        }

        clear() {
          this.processRecords();
          this.queue.length = 0;
          this.selectionChanged = false;
        }

        delayAndroidKey(key, keyCode) {
          if (!this.delayedAndroidKey) requestAnimationFrame(() => {
            var key2 = this.delayedAndroidKey;
            this.delayedAndroidKey = null;
            this.delayedFlush = -1;
            if (!this.flush()) dispatchKey(this.view.contentDOM, key2.key, key2.keyCode);
          });
          if (!this.delayedAndroidKey || key == "Enter") this.delayedAndroidKey = {
            key,
            keyCode
          };
        }

        flushSoon() {
          if (this.delayedFlush < 0) this.delayedFlush = window.setTimeout(() => {
            this.delayedFlush = -1;
            this.flush();
          }, 20);
        }

        forceFlush() {
          if (this.delayedFlush >= 0) {
            window.clearTimeout(this.delayedFlush);
            this.delayedFlush = -1;
            this.flush();
          }
        }

        processRecords() {
          var records = this.queue;

          var _iterator78 = _createForOfIteratorHelper(this.observer.takeRecords()),
              _step78;

          try {
            for (_iterator78.s(); !(_step78 = _iterator78.n()).done;) {
              var mut = _step78.value;
              records.push(mut);
            }
          } catch (err) {
            _iterator78.e(err);
          } finally {
            _iterator78.f();
          }

          if (records.length) this.queue = [];
          var from = -1,
              to = -1,
              typeOver = false;

          var _iterator79 = _createForOfIteratorHelper(records),
              _step79;

          try {
            for (_iterator79.s(); !(_step79 = _iterator79.n()).done;) {
              var record = _step79.value;
              var range = this.readMutation(record);
              if (!range) continue;
              if (range.typeOver) typeOver = true;

              if (from == -1) {
                from = range.from;
                to = range.to;
              } else {
                from = Math.min(range.from, from);
                to = Math.max(range.to, to);
              }
            }
          } catch (err) {
            _iterator79.e(err);
          } finally {
            _iterator79.f();
          }

          return {
            from,
            to,
            typeOver
          };
        }

        flush() {
          var readSelection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          if (this.delayedFlush >= 0 || this.delayedAndroidKey) return;
          if (readSelection) this.readSelectionRange();

          var _this$processRecords = this.processRecords(),
              from = _this$processRecords.from,
              to = _this$processRecords.to,
              typeOver = _this$processRecords.typeOver;

          var newSel = this.selectionChanged && hasSelection(this.dom, this.selectionRange);
          if (from < 0 && !newSel) return;
          this.selectionChanged = false;
          var startState = this.view.state;
          var handled = this.onChange(from, to, typeOver);
          if (this.view.state == startState) this.view.update([]);
          return handled;
        }

        readMutation(rec) {
          var cView = this.view.docView.nearest(rec.target);
          if (!cView || cView.ignoreMutation(rec)) return null;
          cView.markDirty(rec.type == "attributes");
          if (rec.type == "attributes") cView.dirty |= 4;

          if (rec.type == "childList") {
            var childBefore = findChild(cView, rec.previousSibling || rec.target.previousSibling, -1);
            var childAfter = findChild(cView, rec.nextSibling || rec.target.nextSibling, 1);
            return {
              from: childBefore ? cView.posAfter(childBefore) : cView.posAtStart,
              to: childAfter ? cView.posBefore(childAfter) : cView.posAtEnd,
              typeOver: false
            };
          } else if (rec.type == "characterData") {
            return {
              from: cView.posAtStart,
              to: cView.posAtEnd,
              typeOver: rec.target.nodeValue == rec.oldValue
            };
          } else {
            return null;
          }
        }

        destroy() {
          var _a2, _b, _c;

          this.stop();
          (_a2 = this.intersection) === null || _a2 === void 0 ? void 0 : _a2.disconnect();
          (_b = this.gapIntersection) === null || _b === void 0 ? void 0 : _b.disconnect();
          (_c = this.resize) === null || _c === void 0 ? void 0 : _c.disconnect();

          var _iterator80 = _createForOfIteratorHelper(this.scrollTargets),
              _step80;

          try {
            for (_iterator80.s(); !(_step80 = _iterator80.n()).done;) {
              var dom = _step80.value;
              dom.removeEventListener("scroll", this.onScroll);
            }
          } catch (err) {
            _iterator80.e(err);
          } finally {
            _iterator80.f();
          }

          window.removeEventListener("scroll", this.onScroll);
          window.removeEventListener("resize", this.onResize);
          window.removeEventListener("beforeprint", this.onPrint);
          this.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
          clearTimeout(this.parentCheck);
          clearTimeout(this.resizeTimeout);
        }

      };
      EditorView = class {
        constructor() {
          var config2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          this.plugins = [];
          this.pluginMap = /* @__PURE__ */new Map();
          this.editorAttrs = {};
          this.contentAttrs = {};
          this.bidiCache = [];
          this.destroyed = false;
          this.updateState = 2;
          this.measureScheduled = -1;
          this.measureRequests = [];
          this.contentDOM = document.createElement("div");
          this.scrollDOM = document.createElement("div");
          this.scrollDOM.tabIndex = -1;
          this.scrollDOM.className = "cm-scroller";
          this.scrollDOM.appendChild(this.contentDOM);
          this.announceDOM = document.createElement("div");
          this.announceDOM.style.cssText = "position: absolute; top: -10000px";
          this.announceDOM.setAttribute("aria-live", "polite");
          this.dom = document.createElement("div");
          this.dom.appendChild(this.announceDOM);
          this.dom.appendChild(this.scrollDOM);

          this._dispatch = config2.dispatch || (tr => this.update([tr]));

          this.dispatch = this.dispatch.bind(this);
          this.root = config2.root || getRoot(config2.parent) || document;
          this.viewState = new ViewState(config2.state || EditorState.create(config2));
          this.plugins = this.state.facet(viewPlugin).map(spec => new PluginInstance(spec));

          var _iterator81 = _createForOfIteratorHelper(this.plugins),
              _step81;

          try {
            for (_iterator81.s(); !(_step81 = _iterator81.n()).done;) {
              var plugin = _step81.value;
              plugin.update(this);
            }
          } catch (err) {
            _iterator81.e(err);
          } finally {
            _iterator81.f();
          }

          this.observer = new DOMObserver(this, (from, to, typeOver) => {
            return applyDOMChange(this, from, to, typeOver);
          }, event => {
            this.inputState.runScrollHandlers(this, event);
            if (this.observer.intersecting) this.measure();
          });
          this.inputState = new InputState(this);
          this.inputState.ensureHandlers(this, this.plugins);
          this.docView = new DocView(this);
          this.mountStyles();
          this.updateAttrs();
          this.updateState = 0;
          this.requestMeasure();
          if (config2.parent) config2.parent.appendChild(this.dom);
        }

        get state() {
          return this.viewState.state;
        }

        get viewport() {
          return this.viewState.viewport;
        }

        get visibleRanges() {
          return this.viewState.visibleRanges;
        }

        get inView() {
          return this.viewState.inView;
        }

        get composing() {
          return this.inputState.composing > 0;
        }

        get compositionStarted() {
          return this.inputState.composing >= 0;
        }

        dispatch() {
          this._dispatch(arguments.length == 1 && (arguments.length <= 0 ? undefined : arguments[0]) instanceof Transaction ? arguments.length <= 0 ? undefined : arguments[0] : this.state.update(...arguments));
        }

        update(transactions) {
          if (this.updateState != 0) throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
          var redrawn = false,
              attrsChanged = false,
              update;
          var state = this.state;

          var _iterator82 = _createForOfIteratorHelper(transactions),
              _step82;

          try {
            for (_iterator82.s(); !(_step82 = _iterator82.n()).done;) {
              var _tr = _step82.value;
              if (_tr.startState != state) throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
              state = _tr.state;
            }
          } catch (err) {
            _iterator82.e(err);
          } finally {
            _iterator82.f();
          }

          if (this.destroyed) {
            this.viewState.state = state;
            return;
          }

          this.observer.clear();
          if (state.facet(EditorState.phrases) != this.state.facet(EditorState.phrases)) return this.setState(state);
          update = ViewUpdate.create(this, state, transactions);
          var scrollTarget = this.viewState.scrollTarget;

          try {
            this.updateState = 2;

            var _iterator83 = _createForOfIteratorHelper(transactions),
                _step83;

            try {
              for (_iterator83.s(); !(_step83 = _iterator83.n()).done;) {
                var tr = _step83.value;
                if (scrollTarget) scrollTarget = scrollTarget.map(tr.changes);

                if (tr.scrollIntoView) {
                  var main = tr.state.selection.main;
                  scrollTarget = new ScrollTarget(main.empty ? main : EditorSelection.cursor(main.head, main.head > main.anchor ? -1 : 1));
                }

                var _iterator84 = _createForOfIteratorHelper(tr.effects),
                    _step84;

                try {
                  for (_iterator84.s(); !(_step84 = _iterator84.n()).done;) {
                    var e = _step84.value;
                    if (e.is(scrollIntoView)) scrollTarget = e.value;
                  }
                } catch (err) {
                  _iterator84.e(err);
                } finally {
                  _iterator84.f();
                }
              }
            } catch (err) {
              _iterator83.e(err);
            } finally {
              _iterator83.f();
            }

            this.viewState.update(update, scrollTarget);
            this.bidiCache = CachedOrder.update(this.bidiCache, update.changes);

            if (!update.empty) {
              this.updatePlugins(update);
              this.inputState.update(update);
            }

            redrawn = this.docView.update(update);
            if (this.state.facet(styleModule) != this.styleModules) this.mountStyles();
            attrsChanged = this.updateAttrs();
            this.showAnnouncements(transactions);
            this.docView.updateSelection(redrawn, transactions.some(tr => tr.isUserEvent("select.pointer")));
          } finally {
            this.updateState = 0;
          }

          if (update.startState.facet(theme) != update.state.facet(theme)) this.viewState.mustMeasureContent = true;
          if (redrawn || attrsChanged || scrollTarget || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) this.requestMeasure();

          if (!update.empty) {
            var _iterator85 = _createForOfIteratorHelper(this.state.facet(updateListener)),
                _step85;

            try {
              for (_iterator85.s(); !(_step85 = _iterator85.n()).done;) {
                var listener = _step85.value;
                listener(update);
              }
            } catch (err) {
              _iterator85.e(err);
            } finally {
              _iterator85.f();
            }
          }
        }

        setState(newState) {
          if (this.updateState != 0) throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");

          if (this.destroyed) {
            this.viewState.state = newState;
            return;
          }

          this.updateState = 2;
          var hadFocus = this.hasFocus;

          try {
            var _iterator86 = _createForOfIteratorHelper(this.plugins),
                _step86;

            try {
              for (_iterator86.s(); !(_step86 = _iterator86.n()).done;) {
                var plugin = _step86.value;
                plugin.destroy(this);
              }
            } catch (err) {
              _iterator86.e(err);
            } finally {
              _iterator86.f();
            }

            this.viewState = new ViewState(newState);
            this.plugins = newState.facet(viewPlugin).map(spec => new PluginInstance(spec));
            this.pluginMap.clear();

            var _iterator87 = _createForOfIteratorHelper(this.plugins),
                _step87;

            try {
              for (_iterator87.s(); !(_step87 = _iterator87.n()).done;) {
                var _plugin2 = _step87.value;

                _plugin2.update(this);
              }
            } catch (err) {
              _iterator87.e(err);
            } finally {
              _iterator87.f();
            }

            this.docView = new DocView(this);
            this.inputState.ensureHandlers(this, this.plugins);
            this.mountStyles();
            this.updateAttrs();
            this.bidiCache = [];
          } finally {
            this.updateState = 0;
          }

          if (hadFocus) this.focus();
          this.requestMeasure();
        }

        updatePlugins(update) {
          var prevSpecs = update.startState.facet(viewPlugin),
              specs = update.state.facet(viewPlugin);

          if (prevSpecs != specs) {
            var newPlugins = [];

            var _iterator88 = _createForOfIteratorHelper(specs),
                _step88;

            try {
              for (_iterator88.s(); !(_step88 = _iterator88.n()).done;) {
                var spec = _step88.value;
                var found = prevSpecs.indexOf(spec);

                if (found < 0) {
                  newPlugins.push(new PluginInstance(spec));
                } else {
                  var plugin = this.plugins[found];
                  plugin.mustUpdate = update;
                  newPlugins.push(plugin);
                }
              }
            } catch (err) {
              _iterator88.e(err);
            } finally {
              _iterator88.f();
            }

            var _iterator89 = _createForOfIteratorHelper(this.plugins),
                _step89;

            try {
              for (_iterator89.s(); !(_step89 = _iterator89.n()).done;) {
                var _plugin3 = _step89.value;
                if (_plugin3.mustUpdate != update) _plugin3.destroy(this);
              }
            } catch (err) {
              _iterator89.e(err);
            } finally {
              _iterator89.f();
            }

            this.plugins = newPlugins;
            this.pluginMap.clear();
            this.inputState.ensureHandlers(this, this.plugins);
          } else {
            var _iterator90 = _createForOfIteratorHelper(this.plugins),
                _step90;

            try {
              for (_iterator90.s(); !(_step90 = _iterator90.n()).done;) {
                var _p = _step90.value;
                _p.mustUpdate = update;
              }
            } catch (err) {
              _iterator90.e(err);
            } finally {
              _iterator90.f();
            }
          }

          for (var _i103 = 0; _i103 < this.plugins.length; _i103++) {
            this.plugins[_i103].update(this);
          }
        }

        measure() {
          var flush = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          if (this.destroyed) return;
          if (this.measureScheduled > -1) cancelAnimationFrame(this.measureScheduled);
          this.measureScheduled = 0;
          if (flush) this.observer.flush();
          var updated = null;

          try {
            for (var _i104 = 0;; _i104++) {
              this.updateState = 1;
              var oldViewport = this.viewport;
              var changed = this.viewState.measure(this);
              if (!changed && !this.measureRequests.length && this.viewState.scrollTarget == null) break;

              if (_i104 > 5) {
                console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
                break;
              }

              var measuring = [];

              if (!(changed & 4)) {
                var _ref14 = [measuring, this.measureRequests];
                this.measureRequests = _ref14[0];
                measuring = _ref14[1];
              }

              var measured = measuring.map(m => {
                try {
                  return m.read(this);
                } catch (e) {
                  logException(this.state, e);
                  return BadMeasure;
                }
              });
              var update = ViewUpdate.create(this, this.state, []),
                  redrawn = false,
                  scrolled = false;
              update.flags |= changed;
              if (!updated) updated = update;else updated.flags |= changed;
              this.updateState = 2;

              if (!update.empty) {
                this.updatePlugins(update);
                this.inputState.update(update);
                this.updateAttrs();
                redrawn = this.docView.update(update);
              }

              for (var i2 = 0; i2 < measuring.length; i2++) {
                if (measured[i2] != BadMeasure) {
                  try {
                    var m = measuring[i2];
                    if (m.write) m.write(measured[i2], this);
                  } catch (e) {
                    logException(this.state, e);
                  }
                }
              }

              if (this.viewState.scrollTarget) {
                this.docView.scrollIntoView(this.viewState.scrollTarget);
                this.viewState.scrollTarget = null;
                scrolled = true;
              }

              if (redrawn) this.docView.updateSelection(true);
              if (this.viewport.from == oldViewport.from && this.viewport.to == oldViewport.to && !scrolled && this.measureRequests.length == 0) break;
            }
          } finally {
            this.updateState = 0;
            this.measureScheduled = -1;
          }

          if (updated && !updated.empty) {
            var _iterator91 = _createForOfIteratorHelper(this.state.facet(updateListener)),
                _step91;

            try {
              for (_iterator91.s(); !(_step91 = _iterator91.n()).done;) {
                var listener = _step91.value;
                listener(updated);
              }
            } catch (err) {
              _iterator91.e(err);
            } finally {
              _iterator91.f();
            }
          }
        }

        get themeClasses() {
          return baseThemeID + " " + (this.state.facet(darkTheme) ? baseDarkID : baseLightID) + " " + this.state.facet(theme);
        }

        updateAttrs() {
          var editorAttrs = attrsFromFacet(this, editorAttributes, {
            class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
          });
          var contentAttrs = {
            spellcheck: "false",
            autocorrect: "off",
            autocapitalize: "off",
            translate: "no",
            contenteditable: !this.state.facet(editable) ? "false" : "true",
            class: "cm-content",
            style: "".concat(browser.tabSize, ": ").concat(this.state.tabSize),
            role: "textbox",
            "aria-multiline": "true"
          };
          if (this.state.readOnly) contentAttrs["aria-readonly"] = "true";
          attrsFromFacet(this, contentAttributes, contentAttrs);
          var changed = this.observer.ignore(() => {
            var changedContent = updateAttrs(this.contentDOM, this.contentAttrs, contentAttrs);
            var changedEditor = updateAttrs(this.dom, this.editorAttrs, editorAttrs);
            return changedContent || changedEditor;
          });
          this.editorAttrs = editorAttrs;
          this.contentAttrs = contentAttrs;
          return changed;
        }

        showAnnouncements(trs) {
          var first = true;

          var _iterator92 = _createForOfIteratorHelper(trs),
              _step92;

          try {
            for (_iterator92.s(); !(_step92 = _iterator92.n()).done;) {
              var tr = _step92.value;

              var _iterator93 = _createForOfIteratorHelper(tr.effects),
                  _step93;

              try {
                for (_iterator93.s(); !(_step93 = _iterator93.n()).done;) {
                  var effect = _step93.value;

                  if (effect.is(EditorView.announce)) {
                    if (first) this.announceDOM.textContent = "";
                    first = false;
                    var div = this.announceDOM.appendChild(document.createElement("div"));
                    div.textContent = effect.value;
                  }
                }
              } catch (err) {
                _iterator93.e(err);
              } finally {
                _iterator93.f();
              }
            }
          } catch (err) {
            _iterator92.e(err);
          } finally {
            _iterator92.f();
          }
        }

        mountStyles() {
          this.styleModules = this.state.facet(styleModule);
          StyleModule.mount(this.root, this.styleModules.concat(baseTheme$1).reverse());
        }

        readMeasured() {
          if (this.updateState == 2) throw new Error("Reading the editor layout isn't allowed during an update");
          if (this.updateState == 0 && this.measureScheduled > -1) this.measure(false);
        }

        requestMeasure(request) {
          if (this.measureScheduled < 0) this.measureScheduled = requestAnimationFrame(() => this.measure());

          if (request) {
            if (request.key != null) for (var _i105 = 0; _i105 < this.measureRequests.length; _i105++) {
              if (this.measureRequests[_i105].key === request.key) {
                this.measureRequests[_i105] = request;
                return;
              }
            }
            this.measureRequests.push(request);
          }
        }

        plugin(plugin) {
          var known = this.pluginMap.get(plugin);
          if (known === void 0 || known && known.spec != plugin) this.pluginMap.set(plugin, known = this.plugins.find(p => p.spec == plugin) || null);
          return known && known.update(this).value;
        }

        get documentTop() {
          return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
        }

        get documentPadding() {
          return {
            top: this.viewState.paddingTop,
            bottom: this.viewState.paddingBottom
          };
        }

        elementAtHeight(height) {
          this.readMeasured();
          return this.viewState.elementAtHeight(height);
        }

        lineBlockAtHeight(height) {
          this.readMeasured();
          return this.viewState.lineBlockAtHeight(height);
        }

        get viewportLineBlocks() {
          return this.viewState.viewportLines;
        }

        lineBlockAt(pos) {
          return this.viewState.lineBlockAt(pos);
        }

        get contentHeight() {
          return this.viewState.contentHeight;
        }

        moveByChar(start, forward, by) {
          return skipAtoms(this, start, moveByChar(this, start, forward, by));
        }

        moveByGroup(start, forward) {
          return skipAtoms(this, start, moveByChar(this, start, forward, initial => byGroup(this, start.head, initial)));
        }

        moveToLineBoundary(start, forward) {
          var includeWrap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
          return moveToLineBoundary(this, start, forward, includeWrap);
        }

        moveVertically(start, forward, distance) {
          return skipAtoms(this, start, moveVertically(this, start, forward, distance));
        }

        domAtPos(pos) {
          return this.docView.domAtPos(pos);
        }

        posAtDOM(node) {
          var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          return this.docView.posFromDOM(node, offset);
        }

        posAtCoords(coords) {
          var precise = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          this.readMeasured();
          return posAtCoords(this, coords, precise);
        }

        coordsAtPos(pos) {
          var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
          this.readMeasured();
          var rect = this.docView.coordsAt(pos, side);
          if (!rect || rect.left == rect.right) return rect;
          var line = this.state.doc.lineAt(pos),
              order = this.bidiSpans(line);
          var span = order[BidiSpan.find(order, pos - line.from, -1, side)];
          return flattenRect(rect, span.dir == Direction.LTR == side > 0);
        }

        get defaultCharacterWidth() {
          return this.viewState.heightOracle.charWidth;
        }

        get defaultLineHeight() {
          return this.viewState.heightOracle.lineHeight;
        }

        get textDirection() {
          return this.viewState.defaultTextDirection;
        }

        textDirectionAt(pos) {
          var perLine = this.state.facet(perLineTextDirection);
          if (!perLine || pos < this.viewport.from || pos > this.viewport.to) return this.textDirection;
          this.readMeasured();
          return this.docView.textDirectionAt(pos);
        }

        get lineWrapping() {
          return this.viewState.heightOracle.lineWrapping;
        }

        bidiSpans(line) {
          if (line.length > MaxBidiLine) return trivialOrder(line.length);
          var dir = this.textDirectionAt(line.from);

          var _iterator94 = _createForOfIteratorHelper(this.bidiCache),
              _step94;

          try {
            for (_iterator94.s(); !(_step94 = _iterator94.n()).done;) {
              var entry = _step94.value;
              if (entry.from == line.from && entry.dir == dir) return entry.order;
            }
          } catch (err) {
            _iterator94.e(err);
          } finally {
            _iterator94.f();
          }

          var order = computeOrder(line.text, dir);
          this.bidiCache.push(new CachedOrder(line.from, line.to, dir, order));
          return order;
        }

        get hasFocus() {
          var _a2;

          return (document.hasFocus() || browser.safari && ((_a2 = this.inputState) === null || _a2 === void 0 ? void 0 : _a2.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
        }

        focus() {
          this.observer.ignore(() => {
            focusPreventScroll(this.contentDOM);
            this.docView.updateSelection();
          });
        }

        destroy() {
          var _iterator95 = _createForOfIteratorHelper(this.plugins),
              _step95;

          try {
            for (_iterator95.s(); !(_step95 = _iterator95.n()).done;) {
              var plugin = _step95.value;
              plugin.destroy(this);
            }
          } catch (err) {
            _iterator95.e(err);
          } finally {
            _iterator95.f();
          }

          this.plugins = [];
          this.inputState.destroy();
          this.dom.remove();
          this.observer.destroy();
          if (this.measureScheduled > -1) cancelAnimationFrame(this.measureScheduled);
          this.destroyed = true;
        }

        static scrollIntoView(pos) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return scrollIntoView.of(new ScrollTarget(typeof pos == "number" ? EditorSelection.cursor(pos) : pos, options.y, options.x, options.yMargin, options.xMargin));
        }

        static domEventHandlers(handlers2) {
          return ViewPlugin.define(() => ({}), {
            eventHandlers: handlers2
          });
        }

        static theme(spec, options) {
          var prefix = StyleModule.newName();
          var result = [theme.of(prefix), styleModule.of(buildTheme(".".concat(prefix), spec))];
          if (options && options.dark) result.push(darkTheme.of(true));
          return result;
        }

        static baseTheme(spec) {
          return Prec.lowest(styleModule.of(buildTheme("." + baseThemeID, spec, lightDarkIDs)));
        }

        static findFromDOM(dom) {
          var _a2;

          var content2 = dom.querySelector(".cm-content");
          var cView = content2 && ContentView.get(content2) || ContentView.get(dom);
          return ((_a2 = cView === null || cView === void 0 ? void 0 : cView.rootView) === null || _a2 === void 0 ? void 0 : _a2.view) || null;
        }

      };
      EditorView.styleModule = styleModule;
      EditorView.inputHandler = inputHandler;
      EditorView.perLineTextDirection = perLineTextDirection;
      EditorView.exceptionSink = exceptionSink;
      EditorView.updateListener = updateListener;
      EditorView.editable = editable;
      EditorView.mouseSelectionStyle = mouseSelectionStyle;
      EditorView.dragMovesSelection = dragMovesSelection$1;
      EditorView.clickAddsSelectionRange = clickAddsSelectionRange;
      EditorView.decorations = decorations;
      EditorView.atomicRanges = atomicRanges;
      EditorView.scrollMargins = scrollMargins;
      EditorView.darkTheme = darkTheme;
      EditorView.contentAttributes = contentAttributes;
      EditorView.editorAttributes = editorAttributes;
      EditorView.lineWrapping = /* @__PURE__ */EditorView.contentAttributes.of({
        "class": "cm-lineWrapping"
      });
      EditorView.announce = /* @__PURE__ */StateEffect.define();
      MaxBidiLine = 4096;
      BadMeasure = {};
      CachedOrder = class {
        constructor(from, to, dir, order) {
          this.from = from;
          this.to = to;
          this.dir = dir;
          this.order = order;
        }

        static update(cache, changes) {
          if (changes.empty) return cache;
          var result = [],
              lastDir = cache.length ? cache[cache.length - 1].dir : Direction.LTR;

          for (var _i106 = Math.max(0, cache.length - 10); _i106 < cache.length; _i106++) {
            var entry = cache[_i106];
            if (entry.dir == lastDir && !changes.touchesRange(entry.from, entry.to)) result.push(new CachedOrder(changes.mapPos(entry.from, 1), changes.mapPos(entry.to, -1), entry.dir, entry.order));
          }

          return result;
        }

      };
      currentPlatform = browser.mac ? "mac" : browser.windows ? "win" : browser.linux ? "linux" : "key";
      handleKeyEvents = /* @__PURE__ */EditorView.domEventHandlers({
        keydown(event, view) {
          return runHandlers(getKeymap(view.state), event, view, "editor");
        }

      });
      keymap = /* @__PURE__ */Facet.define({
        enables: handleKeyEvents
      });
      Keymaps = /* @__PURE__ */new WeakMap();
      storedPrefix = null;
      PrefixTimeout = 4e3;
      CanHidePrimary = !browser.ios;
      selectionConfig = /* @__PURE__ */Facet.define({
        combine(configs) {
          return combineConfig(configs, {
            cursorBlinkRate: 1200,
            drawRangeCursor: true
          }, {
            cursorBlinkRate: (a, b) => Math.min(a, b),
            drawRangeCursor: (a, b) => a || b
          });
        }

      });
      Piece = class {
        constructor(left, top2, width, height, className) {
          this.left = left;
          this.top = top2;
          this.width = width;
          this.height = height;
          this.className = className;
        }

        draw() {
          var elt = document.createElement("div");
          elt.className = this.className;
          this.adjust(elt);
          return elt;
        }

        adjust(elt) {
          elt.style.left = this.left + "px";
          elt.style.top = this.top + "px";
          if (this.width >= 0) elt.style.width = this.width + "px";
          elt.style.height = this.height + "px";
        }

        eq(p) {
          return this.left == p.left && this.top == p.top && this.width == p.width && this.height == p.height && this.className == p.className;
        }

      };
      drawSelectionPlugin = /* @__PURE__ */ViewPlugin.fromClass(class {
        constructor(view) {
          this.view = view;
          this.rangePieces = [];
          this.cursors = [];
          this.measureReq = {
            read: this.readPos.bind(this),
            write: this.drawSel.bind(this)
          };
          this.selectionLayer = view.scrollDOM.appendChild(document.createElement("div"));
          this.selectionLayer.className = "cm-selectionLayer";
          this.selectionLayer.setAttribute("aria-hidden", "true");
          this.cursorLayer = view.scrollDOM.appendChild(document.createElement("div"));
          this.cursorLayer.className = "cm-cursorLayer";
          this.cursorLayer.setAttribute("aria-hidden", "true");
          view.requestMeasure(this.measureReq);
          this.setBlinkRate();
        }

        setBlinkRate() {
          this.cursorLayer.style.animationDuration = this.view.state.facet(selectionConfig).cursorBlinkRate + "ms";
        }

        update(update) {
          var confChanged = update.startState.facet(selectionConfig) != update.state.facet(selectionConfig);
          if (confChanged || update.selectionSet || update.geometryChanged || update.viewportChanged) this.view.requestMeasure(this.measureReq);
          if (update.transactions.some(tr => tr.scrollIntoView)) this.cursorLayer.style.animationName = this.cursorLayer.style.animationName == "cm-blink" ? "cm-blink2" : "cm-blink";
          if (confChanged) this.setBlinkRate();
        }

        readPos() {
          var state = this.view.state,
              conf = state.facet(selectionConfig);
          var rangePieces = state.selection.ranges.map(r => r.empty ? [] : measureRange(this.view, r)).reduce((a, b) => a.concat(b));
          var cursors = [];

          var _iterator96 = _createForOfIteratorHelper(state.selection.ranges),
              _step96;

          try {
            for (_iterator96.s(); !(_step96 = _iterator96.n()).done;) {
              var _r = _step96.value;
              var prim = _r == state.selection.main;

              if (_r.empty ? !prim || CanHidePrimary : conf.drawRangeCursor) {
                var piece = measureCursor(this.view, _r, prim);
                if (piece) cursors.push(piece);
              }
            }
          } catch (err) {
            _iterator96.e(err);
          } finally {
            _iterator96.f();
          }

          return {
            rangePieces,
            cursors
          };
        }

        drawSel(_ref15) {
          var rangePieces = _ref15.rangePieces,
              cursors = _ref15.cursors;

          if (rangePieces.length != this.rangePieces.length || rangePieces.some((p, i) => !p.eq(this.rangePieces[i]))) {
            this.selectionLayer.textContent = "";

            var _iterator97 = _createForOfIteratorHelper(rangePieces),
                _step97;

            try {
              for (_iterator97.s(); !(_step97 = _iterator97.n()).done;) {
                var _p2 = _step97.value;
                this.selectionLayer.appendChild(_p2.draw());
              }
            } catch (err) {
              _iterator97.e(err);
            } finally {
              _iterator97.f();
            }

            this.rangePieces = rangePieces;
          }

          if (cursors.length != this.cursors.length || cursors.some((c, i) => !c.eq(this.cursors[i]))) {
            var oldCursors = this.cursorLayer.children;

            if (oldCursors.length !== cursors.length) {
              this.cursorLayer.textContent = "";

              var _iterator98 = _createForOfIteratorHelper(cursors),
                  _step98;

              try {
                for (_iterator98.s(); !(_step98 = _iterator98.n()).done;) {
                  var c = _step98.value;
                  this.cursorLayer.appendChild(c.draw());
                }
              } catch (err) {
                _iterator98.e(err);
              } finally {
                _iterator98.f();
              }
            } else {
              cursors.forEach((c, idx) => c.adjust(oldCursors[idx]));
            }

            this.cursors = cursors;
          }
        }

        destroy() {
          this.selectionLayer.remove();
          this.cursorLayer.remove();
        }

      });
      themeSpec = {
        ".cm-line": {
          "& ::selection": {
            backgroundColor: "transparent !important"
          },
          "&::selection": {
            backgroundColor: "transparent !important"
          }
        }
      };
      if (CanHidePrimary) themeSpec[".cm-line"].caretColor = "transparent !important";
      hideNativeSelection = /* @__PURE__ */Prec.highest( /* @__PURE__ */EditorView.theme(themeSpec));
      setDropCursorPos = /* @__PURE__ */StateEffect.define({
        map(pos, mapping) {
          return pos == null ? null : mapping.mapPos(pos);
        }

      });
      dropCursorPos = /* @__PURE__ */StateField.define({
        create() {
          return null;
        },

        update(pos, tr) {
          if (pos != null) pos = tr.changes.mapPos(pos);
          return tr.effects.reduce((pos2, e) => e.is(setDropCursorPos) ? e.value : pos2, pos);
        }

      });
      drawDropCursor = /* @__PURE__ */ViewPlugin.fromClass(class {
        constructor(view) {
          this.view = view;
          this.cursor = null;
          this.measureReq = {
            read: this.readPos.bind(this),
            write: this.drawCursor.bind(this)
          };
        }

        update(update) {
          var _a2;

          var cursorPos = update.state.field(dropCursorPos);

          if (cursorPos == null) {
            if (this.cursor != null) {
              (_a2 = this.cursor) === null || _a2 === void 0 ? void 0 : _a2.remove();
              this.cursor = null;
            }
          } else {
            if (!this.cursor) {
              this.cursor = this.view.scrollDOM.appendChild(document.createElement("div"));
              this.cursor.className = "cm-dropCursor";
            }

            if (update.startState.field(dropCursorPos) != cursorPos || update.docChanged || update.geometryChanged) this.view.requestMeasure(this.measureReq);
          }
        }

        readPos() {
          var pos = this.view.state.field(dropCursorPos);
          var rect = pos != null && this.view.coordsAtPos(pos);
          if (!rect) return null;
          var outer = this.view.scrollDOM.getBoundingClientRect();
          return {
            left: rect.left - outer.left + this.view.scrollDOM.scrollLeft,
            top: rect.top - outer.top + this.view.scrollDOM.scrollTop,
            height: rect.bottom - rect.top
          };
        }

        drawCursor(pos) {
          if (this.cursor) {
            if (pos) {
              this.cursor.style.left = pos.left + "px";
              this.cursor.style.top = pos.top + "px";
              this.cursor.style.height = pos.height + "px";
            } else {
              this.cursor.style.left = "-100000px";
            }
          }
        }

        destroy() {
          if (this.cursor) this.cursor.remove();
        }

        setDropPos(pos) {
          if (this.view.state.field(dropCursorPos) != pos) this.view.dispatch({
            effects: setDropCursorPos.of(pos)
          });
        }

      }, {
        eventHandlers: {
          dragover(event) {
            this.setDropPos(this.view.posAtCoords({
              x: event.clientX,
              y: event.clientY
            }));
          },

          dragleave(event) {
            if (event.target == this.view.contentDOM || !this.view.contentDOM.contains(event.relatedTarget)) this.setDropPos(null);
          },

          dragend() {
            this.setDropPos(null);
          },

          drop() {
            this.setDropPos(null);
          }

        }
      });
      MatchDecorator = class {
        constructor(config2) {
          var regexp = config2.regexp,
              decoration = config2.decoration,
              boundary = config2.boundary,
              _config2$maxLength = config2.maxLength,
              maxLength = _config2$maxLength === void 0 ? 1e3 : _config2$maxLength;
          if (!regexp.global) throw new RangeError("The regular expression given to MatchDecorator should have its 'g' flag set");
          this.regexp = regexp;
          this.getDeco = typeof decoration == "function" ? decoration : () => decoration;
          this.boundary = boundary;
          this.maxLength = maxLength;
        }

        createDeco(view) {
          var build = new RangeSetBuilder();

          var _iterator99 = _createForOfIteratorHelper(matchRanges(view, this.maxLength)),
              _step99;

          try {
            for (_iterator99.s(); !(_step99 = _iterator99.n()).done;) {
              var _step99$value = _step99.value,
                  from = _step99$value.from,
                  to = _step99$value.to;
              iterMatches(view.state.doc, this.regexp, from, to, (a, b, m) => build.add(a, b, this.getDeco(m, view, a)));
            }
          } catch (err) {
            _iterator99.e(err);
          } finally {
            _iterator99.f();
          }

          return build.finish();
        }

        updateDeco(update, deco) {
          var changeFrom = 1e9,
              changeTo = -1;
          if (update.docChanged) update.changes.iterChanges((_f, _t, from, to) => {
            if (to > update.view.viewport.from && from < update.view.viewport.to) {
              changeFrom = Math.min(from, changeFrom);
              changeTo = Math.max(to, changeTo);
            }
          });
          if (update.viewportChanged || changeTo - changeFrom > 1e3) return this.createDeco(update.view);
          if (changeTo > -1) return this.updateRange(update.view, deco.map(update.changes), changeFrom, changeTo);
          return deco;
        }

        updateRange(view, deco, updateFrom, updateTo) {
          var _this5 = this;

          var _iterator100 = _createForOfIteratorHelper(view.visibleRanges),
              _step100;

          try {
            for (_iterator100.s(); !(_step100 = _iterator100.n()).done;) {
              var _r2 = _step100.value;
              var from = Math.max(_r2.from, updateFrom),
                  to = Math.min(_r2.to, updateTo);

              if (to > from) {
                (function () {
                  var fromLine = view.state.doc.lineAt(from),
                      toLine = fromLine.to < to ? view.state.doc.lineAt(to) : fromLine;
                  var start = Math.max(_r2.from, fromLine.from),
                      end = Math.min(_r2.to, toLine.to);

                  if (_this5.boundary) {
                    for (; from > fromLine.from; from--) {
                      if (_this5.boundary.test(fromLine.text[from - 1 - fromLine.from])) {
                        start = from;
                        break;
                      }
                    }

                    for (; to < toLine.to; to++) {
                      if (_this5.boundary.test(toLine.text[to - toLine.from])) {
                        end = to;
                        break;
                      }
                    }
                  }

                  var ranges = [],
                      m = void 0;

                  if (fromLine == toLine) {
                    _this5.regexp.lastIndex = start - fromLine.from;

                    while ((m = _this5.regexp.exec(fromLine.text)) && m.index < end - fromLine.from) {
                      var pos = m.index + fromLine.from;
                      ranges.push(_this5.getDeco(m, view, pos).range(pos, pos + m[0].length));
                    }
                  } else {
                    iterMatches(view.state.doc, _this5.regexp, start, end, (from2, to2, m2) => ranges.push(_this5.getDeco(m2, view, from2).range(from2, to2)));
                  }

                  deco = deco.update({
                    filterFrom: start,
                    filterTo: end,
                    filter: (from2, to2) => from2 < start || to2 > end,
                    add: ranges
                  });
                })();
              }
            }
          } catch (err) {
            _iterator100.e(err);
          } finally {
            _iterator100.f();
          }

          return deco;
        }

      };
      UnicodeRegexpSupport = /x/.unicode != null ? "gu" : "g";
      Specials = /* @__PURE__ */new RegExp("[\0-\b\n-\x1F\x7F-\x9F\xAD\u061C\u200B\u200E\u200F\u2028\u2029\u202D\u202E\uFEFF\uFFF9-\uFFFC]", UnicodeRegexpSupport);
      Names = {
        0: "null",
        7: "bell",
        8: "backspace",
        10: "newline",
        11: "vertical tab",
        13: "carriage return",
        27: "escape",
        8203: "zero width space",
        8204: "zero width non-joiner",
        8205: "zero width joiner",
        8206: "left-to-right mark",
        8207: "right-to-left mark",
        8232: "line separator",
        8237: "left-to-right override",
        8238: "right-to-left override",
        8233: "paragraph separator",
        65279: "zero width no-break space",
        65532: "object replacement"
      };
      _supportsTabSize = null;
      specialCharConfig = /* @__PURE__ */Facet.define({
        combine(configs) {
          var config2 = combineConfig(configs, {
            render: null,
            specialChars: Specials,
            addSpecialChars: null
          });
          if (config2.replaceTabs = !supportsTabSize()) config2.specialChars = new RegExp("	|" + config2.specialChars.source, UnicodeRegexpSupport);
          if (config2.addSpecialChars) config2.specialChars = new RegExp(config2.specialChars.source + "|" + config2.addSpecialChars.source, UnicodeRegexpSupport);
          return config2;
        }

      });
      _plugin = null;
      DefaultPlaceholder = "\u2022";
      SpecialCharWidget = class extends WidgetType {
        constructor(options, code) {
          super();
          this.options = options;
          this.code = code;
        }

        eq(other) {
          return other.code == this.code;
        }

        toDOM(view) {
          var ph = placeholder$1(this.code);
          var desc = view.state.phrase("Control character") + " " + (Names[this.code] || "0x" + this.code.toString(16));
          var custom = this.options.render && this.options.render(this.code, desc, ph);
          if (custom) return custom;
          var span = document.createElement("span");
          span.textContent = ph;
          span.title = desc;
          span.setAttribute("aria-label", desc);
          span.className = "cm-specialChar";
          return span;
        }

        ignoreEvent() {
          return false;
        }

      };
      TabWidget = class extends WidgetType {
        constructor(width) {
          super();
          this.width = width;
        }

        eq(other) {
          return other.width == this.width;
        }

        toDOM() {
          var span = document.createElement("span");
          span.textContent = "	";
          span.className = "cm-tab";
          span.style.width = this.width + "px";
          return span;
        }

        ignoreEvent() {
          return false;
        }

      };
      lineDeco = /* @__PURE__ */Decoration.line({
        class: "cm-activeLine"
      });
      activeLineHighlighter = /* @__PURE__ */ViewPlugin.fromClass(class {
        constructor(view) {
          this.decorations = this.getDeco(view);
        }

        update(update) {
          if (update.docChanged || update.selectionSet) this.decorations = this.getDeco(update.view);
        }

        getDeco(view) {
          var lastLineStart = -1,
              deco = [];

          var _iterator101 = _createForOfIteratorHelper(view.state.selection.ranges),
              _step101;

          try {
            for (_iterator101.s(); !(_step101 = _iterator101.n()).done;) {
              var _r3 = _step101.value;
              if (!_r3.empty) return Decoration.none;
              var line = view.lineBlockAt(_r3.head);

              if (line.from > lastLineStart) {
                deco.push(lineDeco.range(line.from));
                lastLineStart = line.from;
              }
            }
          } catch (err) {
            _iterator101.e(err);
          } finally {
            _iterator101.f();
          }

          return Decoration.set(deco);
        }

      }, {
        decorations: v => v.decorations
      });
      MaxOff = 2e3;
      keys = {
        Alt: [18, e => e.altKey],
        Control: [17, e => e.ctrlKey],
        Shift: [16, e => e.shiftKey],
        Meta: [91, e => e.metaKey]
      };
      showCrosshair = {
        style: "cursor: crosshair"
      };
      Outside = "-10000px";
      TooltipViewManager = class {
        constructor(view, facet, createTooltipView) {
          this.facet = facet;
          this.createTooltipView = createTooltipView;
          this.input = view.state.facet(facet);
          this.tooltips = this.input.filter(t2 => t2);
          this.tooltipViews = this.tooltips.map(createTooltipView);
        }

        update(update) {
          var input = update.state.facet(this.facet);
          var tooltips = input.filter(x => x);

          if (input === this.input) {
            var _iterator102 = _createForOfIteratorHelper(this.tooltipViews),
                _step102;

            try {
              for (_iterator102.s(); !(_step102 = _iterator102.n()).done;) {
                var t2 = _step102.value;
                if (t2.update) t2.update(update);
              }
            } catch (err) {
              _iterator102.e(err);
            } finally {
              _iterator102.f();
            }

            return false;
          }

          var tooltipViews = [];

          for (var _i107 = 0; _i107 < tooltips.length; _i107++) {
            var tip = tooltips[_i107],
                known = -1;
            if (!tip) continue;

            for (var i2 = 0; i2 < this.tooltips.length; i2++) {
              var other = this.tooltips[i2];
              if (other && other.create == tip.create) known = i2;
            }

            if (known < 0) {
              tooltipViews[_i107] = this.createTooltipView(tip);
            } else {
              var tooltipView = tooltipViews[_i107] = this.tooltipViews[known];
              if (tooltipView.update) tooltipView.update(update);
            }
          }

          var _iterator103 = _createForOfIteratorHelper(this.tooltipViews),
              _step103;

          try {
            for (_iterator103.s(); !(_step103 = _iterator103.n()).done;) {
              var _t2 = _step103.value;
              if (tooltipViews.indexOf(_t2) < 0) _t2.dom.remove();
            }
          } catch (err) {
            _iterator103.e(err);
          } finally {
            _iterator103.f();
          }

          this.input = input;
          this.tooltips = tooltips;
          this.tooltipViews = tooltipViews;
          return true;
        }

      };
      tooltipConfig = /* @__PURE__ */Facet.define({
        combine: values => {
          var _a2, _b, _c;

          return {
            position: browser.ios ? "absolute" : ((_a2 = values.find(conf => conf.position)) === null || _a2 === void 0 ? void 0 : _a2.position) || "fixed",
            parent: ((_b = values.find(conf => conf.parent)) === null || _b === void 0 ? void 0 : _b.parent) || null,
            tooltipSpace: ((_c = values.find(conf => conf.tooltipSpace)) === null || _c === void 0 ? void 0 : _c.tooltipSpace) || windowSpace
          };
        }
      });
      tooltipPlugin = /* @__PURE__ */ViewPlugin.fromClass(class {
        constructor(view) {
          var _a2;

          this.view = view;
          this.inView = true;
          this.lastTransaction = 0;
          this.measureTimeout = -1;
          var config2 = view.state.facet(tooltipConfig);
          this.position = config2.position;
          this.parent = config2.parent;
          this.classes = view.themeClasses;
          this.createContainer();
          this.measureReq = {
            read: this.readMeasure.bind(this),
            write: this.writeMeasure.bind(this),
            key: this
          };
          this.manager = new TooltipViewManager(view, showTooltip, t2 => this.createTooltip(t2));
          this.intersectionObserver = typeof IntersectionObserver == "function" ? new IntersectionObserver(entries => {
            if (Date.now() > this.lastTransaction - 50 && entries.length > 0 && entries[entries.length - 1].intersectionRatio < 1) this.measureSoon();
          }, {
            threshold: [1]
          }) : null;
          this.observeIntersection();
          (_a2 = view.dom.ownerDocument.defaultView) === null || _a2 === void 0 ? void 0 : _a2.addEventListener("resize", this.measureSoon = this.measureSoon.bind(this));
          this.maybeMeasure();
        }

        createContainer() {
          if (this.parent) {
            this.container = document.createElement("div");
            this.container.style.position = "relative";
            this.container.className = this.view.themeClasses;
            this.parent.appendChild(this.container);
          } else {
            this.container = this.view.dom;
          }
        }

        observeIntersection() {
          if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();

            var _iterator104 = _createForOfIteratorHelper(this.manager.tooltipViews),
                _step104;

            try {
              for (_iterator104.s(); !(_step104 = _iterator104.n()).done;) {
                var tooltip = _step104.value;
                this.intersectionObserver.observe(tooltip.dom);
              }
            } catch (err) {
              _iterator104.e(err);
            } finally {
              _iterator104.f();
            }
          }
        }

        measureSoon() {
          if (this.measureTimeout < 0) this.measureTimeout = setTimeout(() => {
            this.measureTimeout = -1;
            this.maybeMeasure();
          }, 50);
        }

        update(update) {
          if (update.transactions.length) this.lastTransaction = Date.now();
          var updated = this.manager.update(update);
          if (updated) this.observeIntersection();
          var shouldMeasure = updated || update.geometryChanged;
          var newConfig = update.state.facet(tooltipConfig);

          if (newConfig.position != this.position) {
            this.position = newConfig.position;

            var _iterator105 = _createForOfIteratorHelper(this.manager.tooltipViews),
                _step105;

            try {
              for (_iterator105.s(); !(_step105 = _iterator105.n()).done;) {
                var t2 = _step105.value;
                t2.dom.style.position = this.position;
              }
            } catch (err) {
              _iterator105.e(err);
            } finally {
              _iterator105.f();
            }

            shouldMeasure = true;
          }

          if (newConfig.parent != this.parent) {
            if (this.parent) this.container.remove();
            this.parent = newConfig.parent;
            this.createContainer();

            var _iterator106 = _createForOfIteratorHelper(this.manager.tooltipViews),
                _step106;

            try {
              for (_iterator106.s(); !(_step106 = _iterator106.n()).done;) {
                var _t3 = _step106.value;
                this.container.appendChild(_t3.dom);
              }
            } catch (err) {
              _iterator106.e(err);
            } finally {
              _iterator106.f();
            }

            shouldMeasure = true;
          } else if (this.parent && this.view.themeClasses != this.classes) {
            this.classes = this.container.className = this.view.themeClasses;
          }

          if (shouldMeasure) this.maybeMeasure();
        }

        createTooltip(tooltip) {
          var tooltipView = tooltip.create(this.view);
          tooltipView.dom.classList.add("cm-tooltip");

          if (tooltip.arrow && !tooltipView.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")) {
            var arrow = document.createElement("div");
            arrow.className = "cm-tooltip-arrow";
            tooltipView.dom.appendChild(arrow);
          }

          tooltipView.dom.style.position = this.position;
          tooltipView.dom.style.top = Outside;
          this.container.appendChild(tooltipView.dom);
          if (tooltipView.mount) tooltipView.mount(this.view);
          return tooltipView;
        }

        destroy() {
          var _a2, _b;

          (_a2 = this.view.dom.ownerDocument.defaultView) === null || _a2 === void 0 ? void 0 : _a2.removeEventListener("resize", this.measureSoon);

          var _iterator107 = _createForOfIteratorHelper(this.manager.tooltipViews),
              _step107;

          try {
            for (_iterator107.s(); !(_step107 = _iterator107.n()).done;) {
              var dom = _step107.value.dom;
              dom.remove();
            }
          } catch (err) {
            _iterator107.e(err);
          } finally {
            _iterator107.f();
          }

          (_b = this.intersectionObserver) === null || _b === void 0 ? void 0 : _b.disconnect();
          clearTimeout(this.measureTimeout);
        }

        readMeasure() {
          var editor = this.view.dom.getBoundingClientRect();
          return {
            editor,
            parent: this.parent ? this.container.getBoundingClientRect() : editor,
            pos: this.manager.tooltips.map((t2, i) => {
              var tv = this.manager.tooltipViews[i];
              return tv.getCoords ? tv.getCoords(t2.pos) : this.view.coordsAtPos(t2.pos);
            }),
            size: this.manager.tooltipViews.map(_ref16 => {
              var dom = _ref16.dom;
              return dom.getBoundingClientRect();
            }),
            space: this.view.state.facet(tooltipConfig).tooltipSpace(this.view)
          };
        }

        writeMeasure(measured) {
          var editor = measured.editor,
              space = measured.space;
          var others = [];

          for (var _i108 = 0; _i108 < this.manager.tooltips.length; _i108++) {
            var tooltip = this.manager.tooltips[_i108],
                tView = this.manager.tooltipViews[_i108],
                dom = tView.dom;
            var pos = measured.pos[_i108],
                size = measured.size[_i108];

            if (!pos || pos.bottom <= Math.max(editor.top, space.top) || pos.top >= Math.min(editor.bottom, space.bottom) || pos.right < Math.max(editor.left, space.left) - 0.1 || pos.left > Math.min(editor.right, space.right) + 0.1) {
              dom.style.top = Outside;
              continue;
            }

            var arrow = tooltip.arrow ? tView.dom.querySelector(".cm-tooltip-arrow") : null;
            var arrowHeight = arrow ? 7 : 0;
            var width = size.right - size.left,
                height = size.bottom - size.top;
            var offset = tView.offset || noOffset,
                ltr = this.view.textDirection == Direction.LTR;
            var left = size.width > space.right - space.left ? ltr ? space.left : space.right - size.width : ltr ? Math.min(pos.left - (arrow ? 14 : 0) + offset.x, space.right - width) : Math.max(space.left, pos.left - width + (arrow ? 14 : 0) - offset.x);
            var above = !!tooltip.above;
            if (!tooltip.strictSide && (above ? pos.top - (size.bottom - size.top) - offset.y < space.top : pos.bottom + (size.bottom - size.top) + offset.y > space.bottom) && above == space.bottom - pos.bottom > pos.top - space.top) above = !above;
            var top2 = above ? pos.top - height - arrowHeight - offset.y : pos.bottom + arrowHeight + offset.y;
            var right = left + width;

            if (tView.overlap !== true) {
              var _iterator108 = _createForOfIteratorHelper(others),
                  _step108;

              try {
                for (_iterator108.s(); !(_step108 = _iterator108.n()).done;) {
                  var _r4 = _step108.value;
                  if (_r4.left < right && _r4.right > left && _r4.top < top2 + height && _r4.bottom > top2) top2 = above ? _r4.top - height - 2 - arrowHeight : _r4.bottom + arrowHeight + 2;
                }
              } catch (err) {
                _iterator108.e(err);
              } finally {
                _iterator108.f();
              }
            }

            if (this.position == "absolute") {
              dom.style.top = top2 - measured.parent.top + "px";
              dom.style.left = left - measured.parent.left + "px";
            } else {
              dom.style.top = top2 + "px";
              dom.style.left = left + "px";
            }

            if (arrow) arrow.style.left = "".concat(pos.left + (ltr ? offset.x : -offset.x) - (left + 14 - 7), "px");
            if (tView.overlap !== true) others.push({
              left,
              top: top2,
              right,
              bottom: top2 + height
            });
            dom.classList.toggle("cm-tooltip-above", above);
            dom.classList.toggle("cm-tooltip-below", !above);
            if (tView.positioned) tView.positioned();
          }
        }

        maybeMeasure() {
          if (this.manager.tooltips.length) {
            if (this.view.inView) this.view.requestMeasure(this.measureReq);

            if (this.inView != this.view.inView) {
              this.inView = this.view.inView;

              if (!this.inView) {
                var _iterator109 = _createForOfIteratorHelper(this.manager.tooltipViews),
                    _step109;

                try {
                  for (_iterator109.s(); !(_step109 = _iterator109.n()).done;) {
                    var tv = _step109.value;
                    tv.dom.style.top = Outside;
                  }
                } catch (err) {
                  _iterator109.e(err);
                } finally {
                  _iterator109.f();
                }
              }
            }
          }
        }

      }, {
        eventHandlers: {
          scroll() {
            this.maybeMeasure();
          }

        }
      });
      baseTheme = /* @__PURE__ */EditorView.baseTheme({
        ".cm-tooltip": {
          zIndex: 100
        },
        "&light .cm-tooltip": {
          border: "1px solid #bbb",
          backgroundColor: "#f5f5f5"
        },
        "&light .cm-tooltip-section:not(:first-child)": {
          borderTop: "1px solid #bbb"
        },
        "&dark .cm-tooltip": {
          backgroundColor: "#333338",
          color: "white"
        },
        ".cm-tooltip-arrow": {
          height: "".concat(7, "px"),
          width: "".concat(7 * 2, "px"),
          position: "absolute",
          zIndex: -1,
          overflow: "hidden",
          "&:before, &:after": {
            content: "''",
            position: "absolute",
            width: 0,
            height: 0,
            borderLeft: "".concat(7, "px solid transparent"),
            borderRight: "".concat(7, "px solid transparent")
          },
          ".cm-tooltip-above &": {
            bottom: "-".concat(7, "px"),
            "&:before": {
              borderTop: "".concat(7, "px solid #bbb")
            },
            "&:after": {
              borderTop: "".concat(7, "px solid #f5f5f5"),
              bottom: "1px"
            }
          },
          ".cm-tooltip-below &": {
            top: "-".concat(7, "px"),
            "&:before": {
              borderBottom: "".concat(7, "px solid #bbb")
            },
            "&:after": {
              borderBottom: "".concat(7, "px solid #f5f5f5"),
              top: "1px"
            }
          }
        },
        "&dark .cm-tooltip .cm-tooltip-arrow": {
          "&:before": {
            borderTopColor: "#333338",
            borderBottomColor: "#333338"
          },
          "&:after": {
            borderTopColor: "transparent",
            borderBottomColor: "transparent"
          }
        }
      });
      noOffset = {
        x: 0,
        y: 0
      };
      showTooltip = /* @__PURE__ */Facet.define({
        enables: [tooltipPlugin, baseTheme]
      });
      showHoverTooltip = /* @__PURE__ */Facet.define();
      HoverTooltipHost = class {
        constructor(view) {
          this.view = view;
          this.mounted = false;
          this.dom = document.createElement("div");
          this.dom.classList.add("cm-tooltip-hover");
          this.manager = new TooltipViewManager(view, showHoverTooltip, t2 => this.createHostedView(t2));
        }

        static create(view) {
          return new HoverTooltipHost(view);
        }

        createHostedView(tooltip) {
          var hostedView = tooltip.create(this.view);
          hostedView.dom.classList.add("cm-tooltip-section");
          this.dom.appendChild(hostedView.dom);
          if (this.mounted && hostedView.mount) hostedView.mount(this.view);
          return hostedView;
        }

        mount(view) {
          var _iterator110 = _createForOfIteratorHelper(this.manager.tooltipViews),
              _step110;

          try {
            for (_iterator110.s(); !(_step110 = _iterator110.n()).done;) {
              var hostedView = _step110.value;
              if (hostedView.mount) hostedView.mount(view);
            }
          } catch (err) {
            _iterator110.e(err);
          } finally {
            _iterator110.f();
          }

          this.mounted = true;
        }

        positioned() {
          var _iterator111 = _createForOfIteratorHelper(this.manager.tooltipViews),
              _step111;

          try {
            for (_iterator111.s(); !(_step111 = _iterator111.n()).done;) {
              var hostedView = _step111.value;
              if (hostedView.positioned) hostedView.positioned();
            }
          } catch (err) {
            _iterator111.e(err);
          } finally {
            _iterator111.f();
          }
        }

        update(update) {
          this.manager.update(update);
        }

      };
      showHoverTooltipHost = /* @__PURE__ */showTooltip.compute([showHoverTooltip], state => {
        var tooltips = state.facet(showHoverTooltip).filter(t2 => t2);
        if (tooltips.length === 0) return null;
        return {
          pos: Math.min(...tooltips.map(t2 => t2.pos)),
          end: Math.max(...tooltips.filter(t2 => t2.end != null).map(t2 => t2.end)),
          create: HoverTooltipHost.create,
          above: tooltips[0].above,
          arrow: tooltips.some(t2 => t2.arrow)
        };
      });
      HoverPlugin = class {
        constructor(view, source, field, setHover, hoverTime) {
          this.view = view;
          this.source = source;
          this.field = field;
          this.setHover = setHover;
          this.hoverTime = hoverTime;
          this.hoverTimeout = -1;
          this.restartTimeout = -1;
          this.pending = null;
          this.lastMove = {
            x: 0,
            y: 0,
            target: view.dom,
            time: 0
          };
          this.checkHover = this.checkHover.bind(this);
          view.dom.addEventListener("mouseleave", this.mouseleave = this.mouseleave.bind(this));
          view.dom.addEventListener("mousemove", this.mousemove = this.mousemove.bind(this));
        }

        update() {
          if (this.pending) {
            this.pending = null;
            clearTimeout(this.restartTimeout);
            this.restartTimeout = setTimeout(() => this.startHover(), 20);
          }
        }

        get active() {
          return this.view.state.field(this.field);
        }

        checkHover() {
          this.hoverTimeout = -1;
          if (this.active) return;
          var hovered = Date.now() - this.lastMove.time;
          if (hovered < this.hoverTime) this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime - hovered);else this.startHover();
        }

        startHover() {
          clearTimeout(this.restartTimeout);
          var lastMove = this.lastMove;
          var pos = this.view.contentDOM.contains(lastMove.target) ? this.view.posAtCoords(lastMove) : null;
          if (pos == null) return;
          var posCoords = this.view.coordsAtPos(pos);
          if (posCoords == null || lastMove.y < posCoords.top || lastMove.y > posCoords.bottom || lastMove.x < posCoords.left - this.view.defaultCharacterWidth || lastMove.x > posCoords.right + this.view.defaultCharacterWidth) return;
          var bidi = this.view.bidiSpans(this.view.state.doc.lineAt(pos)).find(s => s.from <= pos && s.to >= pos);
          var rtl = bidi && bidi.dir == Direction.RTL ? -1 : 1;
          var open = this.source(this.view, pos, lastMove.x < posCoords.left ? -rtl : rtl);

          if (open === null || open === void 0 ? void 0 : open.then) {
            var pending = this.pending = {
              pos
            };
            open.then(result => {
              if (this.pending == pending) {
                this.pending = null;
                if (result) this.view.dispatch({
                  effects: this.setHover.of(result)
                });
              }
            }, e => logException(this.view.state, e, "hover tooltip"));
          } else if (open) {
            this.view.dispatch({
              effects: this.setHover.of(open)
            });
          }
        }

        mousemove(event) {
          var _a2;

          this.lastMove = {
            x: event.clientX,
            y: event.clientY,
            target: event.target,
            time: Date.now()
          };
          if (this.hoverTimeout < 0) this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime);
          var tooltip = this.active;

          if (tooltip && !isInTooltip(this.lastMove.target) || this.pending) {
            var _ref17 = tooltip || this.pending,
                pos = _ref17.pos,
                end = (_a2 = tooltip === null || tooltip === void 0 ? void 0 : tooltip.end) !== null && _a2 !== void 0 ? _a2 : pos;

            if (pos == end ? this.view.posAtCoords(this.lastMove) != pos : !isOverRange(this.view, pos, end, event.clientX, event.clientY, 6)) {
              this.view.dispatch({
                effects: this.setHover.of(null)
              });
              this.pending = null;
            }
          }
        }

        mouseleave() {
          clearTimeout(this.hoverTimeout);
          this.hoverTimeout = -1;
          if (this.active) this.view.dispatch({
            effects: this.setHover.of(null)
          });
        }

        destroy() {
          clearTimeout(this.hoverTimeout);
          this.view.dom.removeEventListener("mouseleave", this.mouseleave);
          this.view.dom.removeEventListener("mousemove", this.mousemove);
        }

      };
      closeHoverTooltipEffect = /* @__PURE__ */StateEffect.define();
      panelConfig = /* @__PURE__ */Facet.define({
        combine(configs) {
          var topContainer, bottomContainer;

          var _iterator112 = _createForOfIteratorHelper(configs),
              _step112;

          try {
            for (_iterator112.s(); !(_step112 = _iterator112.n()).done;) {
              var c = _step112.value;
              topContainer = topContainer || c.topContainer;
              bottomContainer = bottomContainer || c.bottomContainer;
            }
          } catch (err) {
            _iterator112.e(err);
          } finally {
            _iterator112.f();
          }

          return {
            topContainer,
            bottomContainer
          };
        }

      });
      panelPlugin = /* @__PURE__ */ViewPlugin.fromClass(class {
        constructor(view) {
          this.input = view.state.facet(showPanel);
          this.specs = this.input.filter(s => s);
          this.panels = this.specs.map(spec => spec(view));
          var conf = view.state.facet(panelConfig);
          this.top = new PanelGroup(view, true, conf.topContainer);
          this.bottom = new PanelGroup(view, false, conf.bottomContainer);
          this.top.sync(this.panels.filter(p => p.top));
          this.bottom.sync(this.panels.filter(p => !p.top));

          var _iterator113 = _createForOfIteratorHelper(this.panels),
              _step113;

          try {
            for (_iterator113.s(); !(_step113 = _iterator113.n()).done;) {
              var _p3 = _step113.value;

              _p3.dom.classList.add("cm-panel");

              if (_p3.mount) _p3.mount();
            }
          } catch (err) {
            _iterator113.e(err);
          } finally {
            _iterator113.f();
          }
        }

        update(update) {
          var conf = update.state.facet(panelConfig);

          if (this.top.container != conf.topContainer) {
            this.top.sync([]);
            this.top = new PanelGroup(update.view, true, conf.topContainer);
          }

          if (this.bottom.container != conf.bottomContainer) {
            this.bottom.sync([]);
            this.bottom = new PanelGroup(update.view, false, conf.bottomContainer);
          }

          this.top.syncClasses();
          this.bottom.syncClasses();
          var input = update.state.facet(showPanel);

          if (input != this.input) {
            var specs = input.filter(x => x);
            var panels = [],
                top2 = [],
                bottom = [],
                mount = [];

            var _iterator114 = _createForOfIteratorHelper(specs),
                _step114;

            try {
              for (_iterator114.s(); !(_step114 = _iterator114.n()).done;) {
                var spec = _step114.value;
                var known = this.specs.indexOf(spec),
                    panel = void 0;

                if (known < 0) {
                  panel = spec(update.view);
                  mount.push(panel);
                } else {
                  panel = this.panels[known];
                  if (panel.update) panel.update(update);
                }

                panels.push(panel);
                (panel.top ? top2 : bottom).push(panel);
              }
            } catch (err) {
              _iterator114.e(err);
            } finally {
              _iterator114.f();
            }

            this.specs = specs;
            this.panels = panels;
            this.top.sync(top2);
            this.bottom.sync(bottom);

            for (var _i109 = 0, _mount = mount; _i109 < _mount.length; _i109++) {
              var _p4 = _mount[_i109];

              _p4.dom.classList.add("cm-panel");

              if (_p4.mount) _p4.mount();
            }
          } else {
            var _iterator115 = _createForOfIteratorHelper(this.panels),
                _step115;

            try {
              for (_iterator115.s(); !(_step115 = _iterator115.n()).done;) {
                var _p5 = _step115.value;
                if (_p5.update) _p5.update(update);
              }
            } catch (err) {
              _iterator115.e(err);
            } finally {
              _iterator115.f();
            }
          }
        }

        destroy() {
          this.top.sync([]);
          this.bottom.sync([]);
        }

      }, {
        provide: plugin => EditorView.scrollMargins.of(view => {
          var value = view.plugin(plugin);
          return value && {
            top: value.top.scrollMargin(),
            bottom: value.bottom.scrollMargin()
          };
        })
      });
      PanelGroup = class {
        constructor(view, top2, container) {
          this.view = view;
          this.top = top2;
          this.container = container;
          this.dom = void 0;
          this.classes = "";
          this.panels = [];
          this.syncClasses();
        }

        sync(panels) {
          var _iterator116 = _createForOfIteratorHelper(this.panels),
              _step116;

          try {
            for (_iterator116.s(); !(_step116 = _iterator116.n()).done;) {
              var _p6 = _step116.value;
              if (_p6.destroy && panels.indexOf(_p6) < 0) _p6.destroy();
            }
          } catch (err) {
            _iterator116.e(err);
          } finally {
            _iterator116.f();
          }

          this.panels = panels;
          this.syncDOM();
        }

        syncDOM() {
          if (this.panels.length == 0) {
            if (this.dom) {
              this.dom.remove();
              this.dom = void 0;
            }

            return;
          }

          if (!this.dom) {
            this.dom = document.createElement("div");
            this.dom.className = this.top ? "cm-panels cm-panels-top" : "cm-panels cm-panels-bottom";
            this.dom.style[this.top ? "top" : "bottom"] = "0";
            var parent = this.container || this.view.dom;
            parent.insertBefore(this.dom, this.top ? parent.firstChild : null);
          }

          var curDOM = this.dom.firstChild;

          var _iterator117 = _createForOfIteratorHelper(this.panels),
              _step117;

          try {
            for (_iterator117.s(); !(_step117 = _iterator117.n()).done;) {
              var panel = _step117.value;

              if (panel.dom.parentNode == this.dom) {
                while (curDOM != panel.dom) {
                  curDOM = rm(curDOM);
                }

                curDOM = curDOM.nextSibling;
              } else {
                this.dom.insertBefore(panel.dom, curDOM);
              }
            }
          } catch (err) {
            _iterator117.e(err);
          } finally {
            _iterator117.f();
          }

          while (curDOM) {
            curDOM = rm(curDOM);
          }
        }

        scrollMargin() {
          return !this.dom || this.container ? 0 : Math.max(0, this.top ? this.dom.getBoundingClientRect().bottom - Math.max(0, this.view.scrollDOM.getBoundingClientRect().top) : Math.min(innerHeight, this.view.scrollDOM.getBoundingClientRect().bottom) - this.dom.getBoundingClientRect().top);
        }

        syncClasses() {
          if (!this.container || this.classes == this.view.themeClasses) return;

          var _iterator118 = _createForOfIteratorHelper(this.classes.split(" ")),
              _step118;

          try {
            for (_iterator118.s(); !(_step118 = _iterator118.n()).done;) {
              var cls = _step118.value;
              if (cls) this.container.classList.remove(cls);
            }
          } catch (err) {
            _iterator118.e(err);
          } finally {
            _iterator118.f();
          }

          var _iterator119 = _createForOfIteratorHelper((this.classes = this.view.themeClasses).split(" ")),
              _step119;

          try {
            for (_iterator119.s(); !(_step119 = _iterator119.n()).done;) {
              var _cls = _step119.value;
              if (_cls) this.container.classList.add(_cls);
            }
          } catch (err) {
            _iterator119.e(err);
          } finally {
            _iterator119.f();
          }
        }

      };
      showPanel = /* @__PURE__ */Facet.define({
        enables: panelPlugin
      });
      GutterMarker = class extends RangeValue {
        compare(other) {
          return this == other || this.constructor == other.constructor && this.eq(other);
        }

        eq(other) {
          return false;
        }

        destroy(dom) {}

      };
      GutterMarker.prototype.elementClass = "";
      GutterMarker.prototype.toDOM = void 0;
      GutterMarker.prototype.mapMode = MapMode.TrackBefore;
      GutterMarker.prototype.startSide = GutterMarker.prototype.endSide = -1;
      GutterMarker.prototype.point = true;
      gutterLineClass = /* @__PURE__ */Facet.define();
      defaults = {
        class: "",
        renderEmptyElements: false,
        elementStyle: "",
        markers: () => RangeSet.empty,
        lineMarker: () => null,
        lineMarkerChange: null,
        initialSpacer: null,
        updateSpacer: null,
        domEventHandlers: {}
      };
      activeGutters = /* @__PURE__ */Facet.define();
      unfixGutters = /* @__PURE__ */Facet.define({
        combine: values => values.some(x => x)
      });
      gutterView = /* @__PURE__ */ViewPlugin.fromClass(class {
        constructor(view) {
          this.view = view;
          this.prevViewport = view.viewport;
          this.dom = document.createElement("div");
          this.dom.className = "cm-gutters";
          this.dom.setAttribute("aria-hidden", "true");
          this.dom.style.minHeight = this.view.contentHeight + "px";
          this.gutters = view.state.facet(activeGutters).map(conf => new SingleGutterView(view, conf));

          var _iterator120 = _createForOfIteratorHelper(this.gutters),
              _step120;

          try {
            for (_iterator120.s(); !(_step120 = _iterator120.n()).done;) {
              var gutter2 = _step120.value;
              this.dom.appendChild(gutter2.dom);
            }
          } catch (err) {
            _iterator120.e(err);
          } finally {
            _iterator120.f();
          }

          this.fixed = !view.state.facet(unfixGutters);

          if (this.fixed) {
            this.dom.style.position = "sticky";
          }

          this.syncGutters(false);
          view.scrollDOM.insertBefore(this.dom, view.contentDOM);
        }

        update(update) {
          if (this.updateGutters(update)) {
            var vpA = this.prevViewport,
                vpB = update.view.viewport;
            var vpOverlap = Math.min(vpA.to, vpB.to) - Math.max(vpA.from, vpB.from);
            this.syncGutters(vpOverlap < (vpB.to - vpB.from) * 0.8);
          }

          if (update.geometryChanged) this.dom.style.minHeight = this.view.contentHeight + "px";

          if (this.view.state.facet(unfixGutters) != !this.fixed) {
            this.fixed = !this.fixed;
            this.dom.style.position = this.fixed ? "sticky" : "";
          }

          this.prevViewport = update.view.viewport;
        }

        syncGutters(detach) {
          var after = this.dom.nextSibling;
          if (detach) this.dom.remove();
          var lineClasses = RangeSet.iter(this.view.state.facet(gutterLineClass), this.view.viewport.from);
          var classSet = [];
          var contexts = this.gutters.map(gutter2 => new UpdateContext(gutter2, this.view.viewport, -this.view.documentPadding.top));

          var _iterator121 = _createForOfIteratorHelper(this.view.viewportLineBlocks),
              _step121;

          try {
            for (_iterator121.s(); !(_step121 = _iterator121.n()).done;) {
              var line = _step121.value;
              var text = void 0;

              if (Array.isArray(line.type)) {
                var _iterator123 = _createForOfIteratorHelper(line.type),
                    _step123;

                try {
                  for (_iterator123.s(); !(_step123 = _iterator123.n()).done;) {
                    var b = _step123.value;

                    if (b.type == BlockType.Text) {
                      text = b;
                      break;
                    }
                  }
                } catch (err) {
                  _iterator123.e(err);
                } finally {
                  _iterator123.f();
                }
              } else {
                text = line.type == BlockType.Text ? line : void 0;
              }

              if (!text) continue;
              if (classSet.length) classSet = [];
              advanceCursor(lineClasses, classSet, line.from);

              var _iterator124 = _createForOfIteratorHelper(contexts),
                  _step124;

              try {
                for (_iterator124.s(); !(_step124 = _iterator124.n()).done;) {
                  var cx = _step124.value;
                  cx.line(this.view, text, classSet);
                }
              } catch (err) {
                _iterator124.e(err);
              } finally {
                _iterator124.f();
              }
            }
          } catch (err) {
            _iterator121.e(err);
          } finally {
            _iterator121.f();
          }

          var _iterator122 = _createForOfIteratorHelper(contexts),
              _step122;

          try {
            for (_iterator122.s(); !(_step122 = _iterator122.n()).done;) {
              var _cx = _step122.value;

              _cx.finish();
            }
          } catch (err) {
            _iterator122.e(err);
          } finally {
            _iterator122.f();
          }

          if (detach) this.view.scrollDOM.insertBefore(this.dom, after);
        }

        updateGutters(update) {
          var prev = update.startState.facet(activeGutters),
              cur2 = update.state.facet(activeGutters);
          var change = update.docChanged || update.heightChanged || update.viewportChanged || !RangeSet.eq(update.startState.facet(gutterLineClass), update.state.facet(gutterLineClass), update.view.viewport.from, update.view.viewport.to);

          if (prev == cur2) {
            var _iterator125 = _createForOfIteratorHelper(this.gutters),
                _step125;

            try {
              for (_iterator125.s(); !(_step125 = _iterator125.n()).done;) {
                var gutter2 = _step125.value;
                if (gutter2.update(update)) change = true;
              }
            } catch (err) {
              _iterator125.e(err);
            } finally {
              _iterator125.f();
            }
          } else {
            change = true;
            var gutters2 = [];

            var _iterator126 = _createForOfIteratorHelper(cur2),
                _step126;

            try {
              for (_iterator126.s(); !(_step126 = _iterator126.n()).done;) {
                var conf = _step126.value;
                var known = prev.indexOf(conf);

                if (known < 0) {
                  gutters2.push(new SingleGutterView(this.view, conf));
                } else {
                  this.gutters[known].update(update);
                  gutters2.push(this.gutters[known]);
                }
              }
            } catch (err) {
              _iterator126.e(err);
            } finally {
              _iterator126.f();
            }

            var _iterator127 = _createForOfIteratorHelper(this.gutters),
                _step127;

            try {
              for (_iterator127.s(); !(_step127 = _iterator127.n()).done;) {
                var _g = _step127.value;

                _g.dom.remove();

                if (gutters2.indexOf(_g) < 0) _g.destroy();
              }
            } catch (err) {
              _iterator127.e(err);
            } finally {
              _iterator127.f();
            }

            for (var _i110 = 0, _gutters = gutters2; _i110 < _gutters.length; _i110++) {
              var g = _gutters[_i110];
              this.dom.appendChild(g.dom);
            }

            this.gutters = gutters2;
          }

          return change;
        }

        destroy() {
          var _iterator128 = _createForOfIteratorHelper(this.gutters),
              _step128;

          try {
            for (_iterator128.s(); !(_step128 = _iterator128.n()).done;) {
              var view = _step128.value;
              view.destroy();
            }
          } catch (err) {
            _iterator128.e(err);
          } finally {
            _iterator128.f();
          }

          this.dom.remove();
        }

      }, {
        provide: plugin => EditorView.scrollMargins.of(view => {
          var value = view.plugin(plugin);
          if (!value || value.gutters.length == 0 || !value.fixed) return null;
          return view.textDirection == Direction.LTR ? {
            left: value.dom.offsetWidth
          } : {
            right: value.dom.offsetWidth
          };
        })
      });
      UpdateContext = class {
        constructor(gutter2, viewport, height) {
          this.gutter = gutter2;
          this.height = height;
          this.localMarkers = [];
          this.i = 0;
          this.cursor = RangeSet.iter(gutter2.markers, viewport.from);
        }

        line(view, line, extraMarkers) {
          if (this.localMarkers.length) this.localMarkers = [];
          advanceCursor(this.cursor, this.localMarkers, line.from);
          var localMarkers = extraMarkers.length ? this.localMarkers.concat(extraMarkers) : this.localMarkers;
          var forLine = this.gutter.config.lineMarker(view, line, localMarkers);
          if (forLine) localMarkers.unshift(forLine);
          var gutter2 = this.gutter;
          if (localMarkers.length == 0 && !gutter2.config.renderEmptyElements) return;
          var above = line.top - this.height;

          if (this.i == gutter2.elements.length) {
            var newElt = new GutterElement(view, line.height, above, localMarkers);
            gutter2.elements.push(newElt);
            gutter2.dom.appendChild(newElt.dom);
          } else {
            gutter2.elements[this.i].update(view, line.height, above, localMarkers);
          }

          this.height = line.bottom;
          this.i++;
        }

        finish() {
          var gutter2 = this.gutter;

          while (gutter2.elements.length > this.i) {
            var last = gutter2.elements.pop();
            gutter2.dom.removeChild(last.dom);
            last.destroy();
          }
        }

      };
      SingleGutterView = class {
        constructor(view, config2) {
          var _this6 = this;

          this.view = view;
          this.config = config2;
          this.elements = [];
          this.spacer = null;
          this.dom = document.createElement("div");
          this.dom.className = "cm-gutter" + (this.config.class ? " " + this.config.class : "");

          var _loop12 = function _loop12(prop) {
            _this6.dom.addEventListener(prop, event => {
              var line = view.lineBlockAtHeight(event.clientY - view.documentTop);
              if (config2.domEventHandlers[prop](view, line, event)) event.preventDefault();
            });
          };

          for (var prop in config2.domEventHandlers) {
            _loop12(prop);
          }

          this.markers = asArray2(config2.markers(view));

          if (config2.initialSpacer) {
            this.spacer = new GutterElement(view, 0, 0, [config2.initialSpacer(view)]);
            this.dom.appendChild(this.spacer.dom);
            this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none";
          }
        }

        update(update) {
          var prevMarkers = this.markers;
          this.markers = asArray2(this.config.markers(update.view));

          if (this.spacer && this.config.updateSpacer) {
            var updated = this.config.updateSpacer(this.spacer.markers[0], update);
            if (updated != this.spacer.markers[0]) this.spacer.update(update.view, 0, 0, [updated]);
          }

          var vp = update.view.viewport;
          return !RangeSet.eq(this.markers, prevMarkers, vp.from, vp.to) || (this.config.lineMarkerChange ? this.config.lineMarkerChange(update) : false);
        }

        destroy() {
          var _iterator129 = _createForOfIteratorHelper(this.elements),
              _step129;

          try {
            for (_iterator129.s(); !(_step129 = _iterator129.n()).done;) {
              var elt = _step129.value;
              elt.destroy();
            }
          } catch (err) {
            _iterator129.e(err);
          } finally {
            _iterator129.f();
          }
        }

      };
      GutterElement = class {
        constructor(view, height, above, markers) {
          this.height = -1;
          this.above = 0;
          this.markers = [];
          this.dom = document.createElement("div");
          this.dom.className = "cm-gutterElement";
          this.update(view, height, above, markers);
        }

        update(view, height, above, markers) {
          if (this.height != height) this.dom.style.height = (this.height = height) + "px";
          if (this.above != above) this.dom.style.marginTop = (this.above = above) ? above + "px" : "";
          if (!sameMarkers(this.markers, markers)) this.setMarkers(view, markers);
        }

        setMarkers(view, markers) {
          var cls = "cm-gutterElement",
              domPos = this.dom.firstChild;

          for (var iNew = 0, iOld = 0;;) {
            var skipTo = iOld,
                marker = iNew < markers.length ? markers[iNew++] : null,
                matched = false;

            if (marker) {
              var c = marker.elementClass;
              if (c) cls += " " + c;

              for (var _i111 = iOld; _i111 < this.markers.length; _i111++) {
                if (this.markers[_i111].compare(marker)) {
                  skipTo = _i111;
                  matched = true;
                  break;
                }
              }
            } else {
              skipTo = this.markers.length;
            }

            while (iOld < skipTo) {
              var next = this.markers[iOld++];

              if (next.toDOM) {
                next.destroy(domPos);
                var after = domPos.nextSibling;
                domPos.remove();
                domPos = after;
              }
            }

            if (!marker) break;

            if (marker.toDOM) {
              if (matched) domPos = domPos.nextSibling;else this.dom.insertBefore(marker.toDOM(view), domPos);
            }

            if (matched) iOld++;
          }

          this.dom.className = cls;
          this.markers = markers;
        }

        destroy() {
          this.setMarkers(null, []);
        }

      };
      lineNumberMarkers = /* @__PURE__ */Facet.define();
      lineNumberConfig = /* @__PURE__ */Facet.define({
        combine(values) {
          return combineConfig(values, {
            formatNumber: String,
            domEventHandlers: {}
          }, {
            domEventHandlers(a, b) {
              var result = Object.assign({}, a);

              var _loop13 = function _loop13(event) {
                var exists = result[event],
                    add2 = b[event];
                result[event] = exists ? (view, line, event2) => exists(view, line, event2) || add2(view, line, event2) : add2;
              };

              for (var event in b) {
                _loop13(event);
              }

              return result;
            }

          });
        }

      });
      NumberMarker = class extends GutterMarker {
        constructor(number2) {
          super();
          this.number = number2;
        }

        eq(other) {
          return this.number == other.number;
        }

        toDOM() {
          return document.createTextNode(this.number);
        }

      };
      lineNumberGutter = /* @__PURE__ */activeGutters.compute([lineNumberConfig], state => ({
        class: "cm-lineNumbers",
        renderEmptyElements: false,

        markers(view) {
          return view.state.facet(lineNumberMarkers);
        },

        lineMarker(view, line, others) {
          if (others.some(m => m.toDOM)) return null;
          return new NumberMarker(formatNumber(view, view.state.doc.lineAt(line.from).number));
        },

        lineMarkerChange: update => update.startState.facet(lineNumberConfig) != update.state.facet(lineNumberConfig),

        initialSpacer(view) {
          return new NumberMarker(formatNumber(view, maxLineNumber(view.state.doc.lines)));
        },

        updateSpacer(spacer, update) {
          var max = formatNumber(update.view, maxLineNumber(update.view.state.doc.lines));
          return max == spacer.number ? spacer : new NumberMarker(max);
        },

        domEventHandlers: state.facet(lineNumberConfig).domEventHandlers
      }));
      activeLineGutterMarker = /* @__PURE__ */new class extends GutterMarker {
        constructor() {
          super(...arguments);
          this.elementClass = "cm-activeLineGutter";
        }

      }();
      activeLineGutterHighlighter = /* @__PURE__ */gutterLineClass.compute(["selection"], state => {
        var marks = [],
            last = -1;

        var _iterator130 = _createForOfIteratorHelper(state.selection.ranges),
            _step130;

        try {
          for (_iterator130.s(); !(_step130 = _iterator130.n()).done;) {
            var range = _step130.value;

            if (range.empty) {
              var linePos = state.doc.lineAt(range.head).from;

              if (linePos > last) {
                last = linePos;
                marks.push(activeLineGutterMarker.range(linePos));
              }
            }
          }
        } catch (err) {
          _iterator130.e(err);
        } finally {
          _iterator130.f();
        }

        return RangeSet.of(marks);
      });
    }

  }); // node_modules/@lezer/common/dist/index.js


  function checkSide(side, pos, from, to) {
    switch (side) {
      case -2:
        return from < pos;

      case -1:
        return to >= pos && from < pos;

      case 0:
        return from < pos && to > pos;

      case 1:
        return from <= pos && to > pos;

      case 2:
        return to > pos;

      case 4:
        return true;
    }
  }

  function enterUnfinishedNodesBefore(node, pos) {
    var scan = node.childBefore(pos);

    while (scan) {
      var last = scan.lastChild;
      if (!last || last.to != scan.to) break;

      if (last.type.isError && last.from == last.to) {
        node = scan;
        scan = last.prevSibling;
      } else {
        scan = last;
      }
    }

    return node;
  }

  function resolveNode(node, pos, side, overlays) {
    var _a2;

    while (node.from == node.to || (side < 1 ? node.from >= pos : node.from > pos) || (side > -1 ? node.to <= pos : node.to < pos)) {
      var parent = !overlays && node instanceof TreeNode && node.index < 0 ? null : node.parent;
      if (!parent) return node;
      node = parent;
    }

    var mode = overlays ? 0 : IterMode.IgnoreOverlays;
    if (overlays) for (var scan = node, _parent2 = scan.parent; _parent2; scan = _parent2, _parent2 = scan.parent) {
      if (scan instanceof TreeNode && scan.index < 0 && ((_a2 = _parent2.enter(pos, side, mode)) === null || _a2 === void 0 ? void 0 : _a2.from) != scan.from) node = _parent2;
    }

    for (;;) {
      var inner = node.enter(pos, side, mode);
      if (!inner) return node;
      node = inner;
    }
  }

  function getChildren(node, type, before, after) {
    var cur2 = node.cursor(),
        result = [];
    if (!cur2.firstChild()) return result;

    if (before != null) {
      while (!cur2.type.is(before)) {
        if (!cur2.nextSibling()) return result;
      }
    }

    for (;;) {
      if (after != null && cur2.type.is(after)) return result;
      if (cur2.type.is(type)) result.push(cur2.node);
      if (!cur2.nextSibling()) return after == null ? result : [];
    }
  }

  function matchNodeContext(node, context) {
    var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : context.length - 1;

    for (var p = node.parent; i >= 0; p = p.parent) {
      if (!p) return false;

      if (!p.type.isAnonymous) {
        if (context[i] && context[i] != p.name) return false;
        i--;
      }
    }

    return true;
  }

  function hasChild(tree) {
    return tree.children.some(ch => ch instanceof TreeBuffer || !ch.type.isAnonymous || hasChild(ch));
  }

  function buildTree(data) {
    var _a2;

    var buffer = data.buffer,
        nodeSet = data.nodeSet,
        _data$maxBufferLength = data.maxBufferLength,
        maxBufferLength = _data$maxBufferLength === void 0 ? DefaultBufferLength : _data$maxBufferLength,
        _data$reused = data.reused,
        reused = _data$reused === void 0 ? [] : _data$reused,
        _data$minRepeatType = data.minRepeatType,
        minRepeatType = _data$minRepeatType === void 0 ? nodeSet.types.length : _data$minRepeatType;
    var cursor = Array.isArray(buffer) ? new FlatBufferCursor(buffer, buffer.length) : buffer;
    var types2 = nodeSet.types;
    var contextHash = 0,
        lookAhead = 0;

    function takeNode(parentStart, minPos, children2, positions2, inRepeat) {
      var id = cursor.id,
          start = cursor.start,
          end = cursor.end,
          size = cursor.size;
      var lookAheadAtStart = lookAhead;

      while (size < 0) {
        cursor.next();

        if (size == -1) {
          var node2 = reused[id];
          children2.push(node2);
          positions2.push(start - parentStart);
          return;
        } else if (size == -3) {
          contextHash = id;
          return;
        } else if (size == -4) {
          lookAhead = id;
          return;
        } else {
          throw new RangeError("Unrecognized record size: ".concat(size));
        }
      }

      var type = types2[id],
          node,
          buffer2;
      var startPos = start - parentStart;

      if (end - start <= maxBufferLength && (buffer2 = findBufferSize(cursor.pos - minPos, inRepeat))) {
        var data2 = new Uint16Array(buffer2.size - buffer2.skip);
        var endPos = cursor.pos - buffer2.size,
            index = data2.length;

        while (cursor.pos > endPos) {
          index = copyToBuffer(buffer2.start, data2, index);
        }

        node = new TreeBuffer(data2, end - buffer2.start, nodeSet);
        startPos = buffer2.start - parentStart;
      } else {
        var _endPos = cursor.pos - size;

        cursor.next();
        var localChildren = [],
            localPositions = [];
        var localInRepeat = id >= minRepeatType ? id : -1;
        var lastGroup = 0,
            lastEnd = end;

        while (cursor.pos > _endPos) {
          if (localInRepeat >= 0 && cursor.id == localInRepeat && cursor.size >= 0) {
            if (cursor.end <= lastEnd - maxBufferLength) {
              makeRepeatLeaf(localChildren, localPositions, start, lastGroup, cursor.end, lastEnd, localInRepeat, lookAheadAtStart);
              lastGroup = localChildren.length;
              lastEnd = cursor.end;
            }

            cursor.next();
          } else {
            takeNode(start, _endPos, localChildren, localPositions, localInRepeat);
          }
        }

        if (localInRepeat >= 0 && lastGroup > 0 && lastGroup < localChildren.length) makeRepeatLeaf(localChildren, localPositions, start, lastGroup, start, lastEnd, localInRepeat, lookAheadAtStart);
        localChildren.reverse();
        localPositions.reverse();

        if (localInRepeat > -1 && lastGroup > 0) {
          var make = makeBalanced(type);
          node = balanceRange(type, localChildren, localPositions, 0, localChildren.length, 0, end - start, make, make);
        } else {
          node = makeTree(type, localChildren, localPositions, end - start, lookAheadAtStart - end);
        }
      }

      children2.push(node);
      positions2.push(startPos);
    }

    function makeBalanced(type) {
      return (children2, positions2, length2) => {
        var lookAhead2 = 0,
            lastI = children2.length - 1,
            last,
            lookAheadProp;

        if (lastI >= 0 && (last = children2[lastI]) instanceof Tree) {
          if (!lastI && last.type == type && last.length == length2) return last;
          if (lookAheadProp = last.prop(NodeProp.lookAhead)) lookAhead2 = positions2[lastI] + last.length + lookAheadProp;
        }

        return makeTree(type, children2, positions2, length2, lookAhead2);
      };
    }

    function makeRepeatLeaf(children2, positions2, base2, i, from, to, type, lookAhead2) {
      var localChildren = [],
          localPositions = [];

      while (children2.length > i) {
        localChildren.push(children2.pop());
        localPositions.push(positions2.pop() + base2 - from);
      }

      children2.push(makeTree(nodeSet.types[type], localChildren, localPositions, to - from, lookAhead2 - to));
      positions2.push(from - base2);
    }

    function makeTree(type, children2, positions2, length2) {
      var lookAhead2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var props = arguments.length > 5 ? arguments[5] : undefined;

      if (contextHash) {
        var pair = [NodeProp.contextHash, contextHash];
        props = props ? [pair].concat(props) : [pair];
      }

      if (lookAhead2 > 25) {
        var _pair = [NodeProp.lookAhead, lookAhead2];
        props = props ? [_pair].concat(props) : [_pair];
      }

      return new Tree(type, children2, positions2, length2, props);
    }

    function findBufferSize(maxSize, inRepeat) {
      var fork = cursor.fork();
      var size = 0,
          start = 0,
          skip = 0,
          minStart = fork.end - maxBufferLength;
      var result = {
        size: 0,
        start: 0,
        skip: 0
      };

      scan: for (var minPos = fork.pos - maxSize; fork.pos > minPos;) {
        var nodeSize2 = fork.size;

        if (fork.id == inRepeat && nodeSize2 >= 0) {
          result.size = size;
          result.start = start;
          result.skip = skip;
          skip += 4;
          size += 4;
          fork.next();
          continue;
        }

        var startPos = fork.pos - nodeSize2;
        if (nodeSize2 < 0 || startPos < minPos || fork.start < minStart) break;
        var localSkipped = fork.id >= minRepeatType ? 4 : 0;
        var nodeStart2 = fork.start;
        fork.next();

        while (fork.pos > startPos) {
          if (fork.size < 0) {
            if (fork.size == -3) localSkipped += 4;else break scan;
          } else if (fork.id >= minRepeatType) {
            localSkipped += 4;
          }

          fork.next();
        }

        start = nodeStart2;
        size += nodeSize2;
        skip += localSkipped;
      }

      if (inRepeat < 0 || size == maxSize) {
        result.size = size;
        result.start = start;
        result.skip = skip;
      }

      return result.size > 4 ? result : void 0;
    }

    function copyToBuffer(bufferStart, buffer2, index) {
      var id = cursor.id,
          start = cursor.start,
          end = cursor.end,
          size = cursor.size;
      cursor.next();

      if (size >= 0 && id < minRepeatType) {
        var startIndex = index;

        if (size > 4) {
          var endPos = cursor.pos - (size - 4);

          while (cursor.pos > endPos) {
            index = copyToBuffer(bufferStart, buffer2, index);
          }
        }

        buffer2[--index] = startIndex;
        buffer2[--index] = end - bufferStart;
        buffer2[--index] = start - bufferStart;
        buffer2[--index] = id;
      } else if (size == -3) {
        contextHash = id;
      } else if (size == -4) {
        lookAhead = id;
      }

      return index;
    }

    var children = [],
        positions = [];

    while (cursor.pos > 0) {
      takeNode(data.start || 0, data.bufferStart || 0, children, positions, -1);
    }

    var length = (_a2 = data.length) !== null && _a2 !== void 0 ? _a2 : children.length ? positions[0] + children[0].length : 0;
    return new Tree(types2[data.topID], children.reverse(), positions.reverse(), length);
  }

  function nodeSize(balanceType, node) {
    if (!balanceType.isAnonymous || node instanceof TreeBuffer || node.type != balanceType) return 1;
    var size = nodeSizeCache.get(node);

    if (size == null) {
      size = 1;

      var _iterator131 = _createForOfIteratorHelper(node.children),
          _step131;

      try {
        for (_iterator131.s(); !(_step131 = _iterator131.n()).done;) {
          var child = _step131.value;

          if (child.type != balanceType || !(child instanceof Tree)) {
            size = 1;
            break;
          }

          size += nodeSize(balanceType, child);
        }
      } catch (err) {
        _iterator131.e(err);
      } finally {
        _iterator131.f();
      }

      nodeSizeCache.set(node, size);
    }

    return size;
  }

  function balanceRange(balanceType, children, positions, from, to, start, length, mkTop, mkTree) {
    var total = 0;

    for (var _i112 = from; _i112 < to; _i112++) {
      total += nodeSize(balanceType, children[_i112]);
    }

    var maxChild = Math.ceil(total * 1.5 / 8);
    var localChildren = [],
        localPositions = [];

    function divide(children2, positions2, from2, to2, offset) {
      for (var _i113 = from2; _i113 < to2;) {
        var groupFrom = _i113,
            groupStart = positions2[_i113],
            groupSize = nodeSize(balanceType, children2[_i113]);
        _i113++;

        for (; _i113 < to2; _i113++) {
          var nextSize = nodeSize(balanceType, children2[_i113]);
          if (groupSize + nextSize >= maxChild) break;
          groupSize += nextSize;
        }

        if (_i113 == groupFrom + 1) {
          if (groupSize > maxChild) {
            var only = children2[groupFrom];
            divide(only.children, only.positions, 0, only.children.length, positions2[groupFrom] + offset);
            continue;
          }

          localChildren.push(children2[groupFrom]);
        } else {
          var length2 = positions2[_i113 - 1] + children2[_i113 - 1].length - groupStart;
          localChildren.push(balanceRange(balanceType, children2, positions2, groupFrom, _i113, groupStart, length2, null, mkTree));
        }

        localPositions.push(groupStart + offset - start);
      }
    }

    divide(children, positions, from, to, 0);
    return (mkTop || mkTree)(localChildren, localPositions, length);
  }

  var DefaultBufferLength, nextPropID, Range2, NodeProp, noProps, NodeType, CachedNode, CachedInnerNode, IterMode, Tree, FlatBufferCursor, TreeBuffer, TreeNode, BufferContext, BufferNode, TreeCursor, nodeSizeCache, TreeFragment, Parser, StringInput, stoppedInner;

  var init_dist3 = __esm({
    "node_modules/@lezer/common/dist/index.js"() {
      DefaultBufferLength = 1024;
      nextPropID = 0;
      Range2 = class {
        constructor(from, to) {
          this.from = from;
          this.to = to;
        }

      };
      NodeProp = class {
        constructor() {
          var config2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          this.id = nextPropID++;
          this.perNode = !!config2.perNode;

          this.deserialize = config2.deserialize || (() => {
            throw new Error("This node type doesn't define a deserialize function");
          });
        }

        add(match) {
          if (this.perNode) throw new RangeError("Can't add per-node props to node types");
          if (typeof match != "function") match = NodeType.match(match);
          return type => {
            var result = match(type);
            return result === void 0 ? null : [this, result];
          };
        }

      };
      NodeProp.closedBy = new NodeProp({
        deserialize: str => str.split(" ")
      });
      NodeProp.openedBy = new NodeProp({
        deserialize: str => str.split(" ")
      });
      NodeProp.group = new NodeProp({
        deserialize: str => str.split(" ")
      });
      NodeProp.contextHash = new NodeProp({
        perNode: true
      });
      NodeProp.lookAhead = new NodeProp({
        perNode: true
      });
      NodeProp.mounted = new NodeProp({
        perNode: true
      });
      noProps = /* @__PURE__ */Object.create(null);
      NodeType = class {
        constructor(name2, props, id) {
          var flags = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
          this.name = name2;
          this.props = props;
          this.id = id;
          this.flags = flags;
        }

        static define(spec) {
          var props = spec.props && spec.props.length ? /* @__PURE__ */Object.create(null) : noProps;
          var flags = (spec.top ? 1 : 0) | (spec.skipped ? 2 : 0) | (spec.error ? 4 : 0) | (spec.name == null ? 8 : 0);
          var type = new NodeType(spec.name || "", props, spec.id, flags);

          if (spec.props) {
            var _iterator132 = _createForOfIteratorHelper(spec.props),
                _step132;

            try {
              for (_iterator132.s(); !(_step132 = _iterator132.n()).done;) {
                var src = _step132.value;
                if (!Array.isArray(src)) src = src(type);

                if (src) {
                  if (src[0].perNode) throw new RangeError("Can't store a per-node prop on a node type");
                  props[src[0].id] = src[1];
                }
              }
            } catch (err) {
              _iterator132.e(err);
            } finally {
              _iterator132.f();
            }
          }

          return type;
        }

        prop(prop) {
          return this.props[prop.id];
        }

        get isTop() {
          return (this.flags & 1) > 0;
        }

        get isSkipped() {
          return (this.flags & 2) > 0;
        }

        get isError() {
          return (this.flags & 4) > 0;
        }

        get isAnonymous() {
          return (this.flags & 8) > 0;
        }

        is(name2) {
          if (typeof name2 == "string") {
            if (this.name == name2) return true;
            var group = this.prop(NodeProp.group);
            return group ? group.indexOf(name2) > -1 : false;
          }

          return this.id == name2;
        }

        static match(map) {
          var direct = /* @__PURE__ */Object.create(null);

          for (var prop in map) {
            var _iterator133 = _createForOfIteratorHelper(prop.split(" ")),
                _step133;

            try {
              for (_iterator133.s(); !(_step133 = _iterator133.n()).done;) {
                var name2 = _step133.value;
                direct[name2] = map[prop];
              }
            } catch (err) {
              _iterator133.e(err);
            } finally {
              _iterator133.f();
            }
          }

          return node => {
            for (var groups = node.prop(NodeProp.group), _i114 = -1; _i114 < (groups ? groups.length : 0); _i114++) {
              var found = direct[_i114 < 0 ? node.name : groups[_i114]];
              if (found) return found;
            }
          };
        }

      };
      NodeType.none = new NodeType("", /* @__PURE__ */Object.create(null), 0, 8);
      CachedNode = /* @__PURE__ */new WeakMap();
      CachedInnerNode = /* @__PURE__ */new WeakMap();

      (function (IterMode2) {
        IterMode2[IterMode2["ExcludeBuffers"] = 1] = "ExcludeBuffers";
        IterMode2[IterMode2["IncludeAnonymous"] = 2] = "IncludeAnonymous";
        IterMode2[IterMode2["IgnoreMounts"] = 4] = "IgnoreMounts";
        IterMode2[IterMode2["IgnoreOverlays"] = 8] = "IgnoreOverlays";
      })(IterMode || (IterMode = {}));

      Tree = class {
        constructor(type, children, positions, length, props) {
          this.type = type;
          this.children = children;
          this.positions = positions;
          this.length = length;
          this.props = null;

          if (props && props.length) {
            this.props = /* @__PURE__ */Object.create(null);

            var _iterator134 = _createForOfIteratorHelper(props),
                _step134;

            try {
              for (_iterator134.s(); !(_step134 = _iterator134.n()).done;) {
                var _step134$value = _slicedToArray(_step134.value, 2),
                    prop = _step134$value[0],
                    value = _step134$value[1];

                this.props[typeof prop == "number" ? prop : prop.id] = value;
              }
            } catch (err) {
              _iterator134.e(err);
            } finally {
              _iterator134.f();
            }
          }
        }

        toString() {
          var mounted = this.prop(NodeProp.mounted);
          if (mounted && !mounted.overlay) return mounted.tree.toString();
          var children = "";

          var _iterator135 = _createForOfIteratorHelper(this.children),
              _step135;

          try {
            for (_iterator135.s(); !(_step135 = _iterator135.n()).done;) {
              var ch = _step135.value;
              var str = ch.toString();

              if (str) {
                if (children) children += ",";
                children += str;
              }
            }
          } catch (err) {
            _iterator135.e(err);
          } finally {
            _iterator135.f();
          }

          return !this.type.name ? children : (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (children.length ? "(" + children + ")" : "");
        }

        cursor() {
          var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          return new TreeCursor(this.topNode, mode);
        }

        cursorAt(pos) {
          var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          var scope = CachedNode.get(this) || this.topNode;
          var cursor = new TreeCursor(scope);
          cursor.moveTo(pos, side);
          CachedNode.set(this, cursor._tree);
          return cursor;
        }

        get topNode() {
          return new TreeNode(this, 0, 0, null);
        }

        resolve(pos) {
          var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var node = resolveNode(CachedNode.get(this) || this.topNode, pos, side, false);
          CachedNode.set(this, node);
          return node;
        }

        resolveInner(pos) {
          var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var node = resolveNode(CachedInnerNode.get(this) || this.topNode, pos, side, true);
          CachedInnerNode.set(this, node);
          return node;
        }

        iterate(spec) {
          var enter = spec.enter,
              leave = spec.leave,
              _spec$from = spec.from,
              from = _spec$from === void 0 ? 0 : _spec$from,
              _spec$to2 = spec.to,
              to = _spec$to2 === void 0 ? this.length : _spec$to2;

          for (var c = this.cursor((spec.mode || 0) | IterMode.IncludeAnonymous);;) {
            var entered = false;

            if (c.from <= to && c.to >= from && (c.type.isAnonymous || enter(c) !== false)) {
              if (c.firstChild()) continue;
              entered = true;
            }

            for (;;) {
              if (entered && leave && !c.type.isAnonymous) leave(c);
              if (c.nextSibling()) break;
              if (!c.parent()) return;
              entered = true;
            }
          }
        }

        prop(prop) {
          return !prop.perNode ? this.type.prop(prop) : this.props ? this.props[prop.id] : void 0;
        }

        get propValues() {
          var result = [];
          if (this.props) for (var id in this.props) {
            result.push([+id, this.props[id]]);
          }
          return result;
        }

        balance() {
          var config2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return this.children.length <= 8 ? this : balanceRange(NodeType.none, this.children, this.positions, 0, this.children.length, 0, this.length, (children, positions, length) => new Tree(this.type, children, positions, length, this.propValues), config2.makeTree || ((children, positions, length) => new Tree(NodeType.none, children, positions, length)));
        }

        static build(data) {
          return buildTree(data);
        }

      };
      Tree.empty = new Tree(NodeType.none, [], [], 0);
      FlatBufferCursor = class {
        constructor(buffer, index) {
          this.buffer = buffer;
          this.index = index;
        }

        get id() {
          return this.buffer[this.index - 4];
        }

        get start() {
          return this.buffer[this.index - 3];
        }

        get end() {
          return this.buffer[this.index - 2];
        }

        get size() {
          return this.buffer[this.index - 1];
        }

        get pos() {
          return this.index;
        }

        next() {
          this.index -= 4;
        }

        fork() {
          return new FlatBufferCursor(this.buffer, this.index);
        }

      };
      TreeBuffer = class {
        constructor(buffer, length, set) {
          this.buffer = buffer;
          this.length = length;
          this.set = set;
        }

        get type() {
          return NodeType.none;
        }

        toString() {
          var result = [];

          for (var index = 0; index < this.buffer.length;) {
            result.push(this.childString(index));
            index = this.buffer[index + 3];
          }

          return result.join(",");
        }

        childString(index) {
          var id = this.buffer[index],
              endIndex = this.buffer[index + 3];
          var type = this.set.types[id],
              result = type.name;
          if (/\W/.test(result) && !type.isError) result = JSON.stringify(result);
          index += 4;
          if (endIndex == index) return result;
          var children = [];

          while (index < endIndex) {
            children.push(this.childString(index));
            index = this.buffer[index + 3];
          }

          return result + "(" + children.join(",") + ")";
        }

        findChild(startIndex, endIndex, dir, pos, side) {
          var buffer = this.buffer,
              pick = -1;

          for (var _i115 = startIndex; _i115 != endIndex; _i115 = buffer[_i115 + 3]) {
            if (checkSide(side, pos, buffer[_i115 + 1], buffer[_i115 + 2])) {
              pick = _i115;
              if (dir > 0) break;
            }
          }

          return pick;
        }

        slice(startI, endI, from, to) {
          var b = this.buffer;
          var copy = new Uint16Array(endI - startI);

          for (var _i116 = startI, j = 0; _i116 < endI;) {
            copy[j++] = b[_i116++];
            copy[j++] = b[_i116++] - from;
            copy[j++] = b[_i116++] - from;
            copy[j++] = b[_i116++] - startI;
          }

          return new TreeBuffer(copy, to - from, this.set);
        }

      };
      TreeNode = class {
        constructor(_tree, from, index, _parent) {
          this._tree = _tree;
          this.from = from;
          this.index = index;
          this._parent = _parent;
        }

        get type() {
          return this._tree.type;
        }

        get name() {
          return this._tree.type.name;
        }

        get to() {
          return this.from + this._tree.length;
        }

        nextChild(i, dir, pos, side) {
          var mode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

          for (var parent = this;;) {
            for (var _parent$_tree = parent._tree, children = _parent$_tree.children, positions = _parent$_tree.positions, e = dir > 0 ? children.length : -1; i != e; i += dir) {
              var next = children[i],
                  start = positions[i] + parent.from;
              if (!checkSide(side, pos, start, start + next.length)) continue;

              if (next instanceof TreeBuffer) {
                if (mode & IterMode.ExcludeBuffers) continue;
                var index = next.findChild(0, next.buffer.length, dir, pos - start, side);
                if (index > -1) return new BufferNode(new BufferContext(parent, next, i, start), null, index);
              } else if (mode & IterMode.IncludeAnonymous || !next.type.isAnonymous || hasChild(next)) {
                var mounted = void 0;
                if (!(mode & IterMode.IgnoreMounts) && next.props && (mounted = next.prop(NodeProp.mounted)) && !mounted.overlay) return new TreeNode(mounted.tree, start, i, parent);
                var inner = new TreeNode(next, start, i, parent);
                return mode & IterMode.IncludeAnonymous || !inner.type.isAnonymous ? inner : inner.nextChild(dir < 0 ? next.children.length - 1 : 0, dir, pos, side);
              }
            }

            if (mode & IterMode.IncludeAnonymous || !parent.type.isAnonymous) return null;
            if (parent.index >= 0) i = parent.index + dir;else i = dir < 0 ? -1 : parent._parent._tree.children.length;
            parent = parent._parent;
            if (!parent) return null;
          }
        }

        get firstChild() {
          return this.nextChild(0, 1, 0, 4);
        }

        get lastChild() {
          return this.nextChild(this._tree.children.length - 1, -1, 0, 4);
        }

        childAfter(pos) {
          return this.nextChild(0, 1, pos, 2);
        }

        childBefore(pos) {
          return this.nextChild(this._tree.children.length - 1, -1, pos, -2);
        }

        enter(pos, side) {
          var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          var mounted;

          if (!(mode & IterMode.IgnoreOverlays) && (mounted = this._tree.prop(NodeProp.mounted)) && mounted.overlay) {
            var rPos = pos - this.from;

            var _iterator136 = _createForOfIteratorHelper(mounted.overlay),
                _step136;

            try {
              for (_iterator136.s(); !(_step136 = _iterator136.n()).done;) {
                var _step136$value = _step136.value,
                    from = _step136$value.from,
                    to = _step136$value.to;
                if ((side > 0 ? from <= rPos : from < rPos) && (side < 0 ? to >= rPos : to > rPos)) return new TreeNode(mounted.tree, mounted.overlay[0].from + this.from, -1, this);
              }
            } catch (err) {
              _iterator136.e(err);
            } finally {
              _iterator136.f();
            }
          }

          return this.nextChild(0, 1, pos, side, mode);
        }

        nextSignificantParent() {
          var val = this;

          while (val.type.isAnonymous && val._parent) {
            val = val._parent;
          }

          return val;
        }

        get parent() {
          return this._parent ? this._parent.nextSignificantParent() : null;
        }

        get nextSibling() {
          return this._parent && this.index >= 0 ? this._parent.nextChild(this.index + 1, 1, 0, 4) : null;
        }

        get prevSibling() {
          return this._parent && this.index >= 0 ? this._parent.nextChild(this.index - 1, -1, 0, 4) : null;
        }

        cursor() {
          var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          return new TreeCursor(this, mode);
        }

        get tree() {
          return this._tree;
        }

        toTree() {
          return this._tree;
        }

        resolve(pos) {
          var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          return resolveNode(this, pos, side, false);
        }

        resolveInner(pos) {
          var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          return resolveNode(this, pos, side, true);
        }

        enterUnfinishedNodesBefore(pos) {
          return enterUnfinishedNodesBefore(this, pos);
        }

        getChild(type) {
          var before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          var after = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
          var r = getChildren(this, type, before, after);
          return r.length ? r[0] : null;
        }

        getChildren(type) {
          var before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          var after = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
          return getChildren(this, type, before, after);
        }

        toString() {
          return this._tree.toString();
        }

        get node() {
          return this;
        }

        matchContext(context) {
          return matchNodeContext(this, context);
        }

      };
      BufferContext = class {
        constructor(parent, buffer, index, start) {
          this.parent = parent;
          this.buffer = buffer;
          this.index = index;
          this.start = start;
        }

      };
      BufferNode = class {
        constructor(context, _parent, index) {
          this.context = context;
          this._parent = _parent;
          this.index = index;
          this.type = context.buffer.set.types[context.buffer.buffer[index]];
        }

        get name() {
          return this.type.name;
        }

        get from() {
          return this.context.start + this.context.buffer.buffer[this.index + 1];
        }

        get to() {
          return this.context.start + this.context.buffer.buffer[this.index + 2];
        }

        child(dir, pos, side) {
          var buffer = this.context.buffer;
          var index = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], dir, pos - this.context.start, side);
          return index < 0 ? null : new BufferNode(this.context, this, index);
        }

        get firstChild() {
          return this.child(1, 0, 4);
        }

        get lastChild() {
          return this.child(-1, 0, 4);
        }

        childAfter(pos) {
          return this.child(1, pos, 2);
        }

        childBefore(pos) {
          return this.child(-1, pos, -2);
        }

        enter(pos, side) {
          var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          if (mode & IterMode.ExcludeBuffers) return null;
          var buffer = this.context.buffer;
          var index = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], side > 0 ? 1 : -1, pos - this.context.start, side);
          return index < 0 ? null : new BufferNode(this.context, this, index);
        }

        get parent() {
          return this._parent || this.context.parent.nextSignificantParent();
        }

        externalSibling(dir) {
          return this._parent ? null : this.context.parent.nextChild(this.context.index + dir, dir, 0, 4);
        }

        get nextSibling() {
          var buffer = this.context.buffer;
          var after = buffer.buffer[this.index + 3];
          if (after < (this._parent ? buffer.buffer[this._parent.index + 3] : buffer.buffer.length)) return new BufferNode(this.context, this._parent, after);
          return this.externalSibling(1);
        }

        get prevSibling() {
          var buffer = this.context.buffer;
          var parentStart = this._parent ? this._parent.index + 4 : 0;
          if (this.index == parentStart) return this.externalSibling(-1);
          return new BufferNode(this.context, this._parent, buffer.findChild(parentStart, this.index, -1, 0, 4));
        }

        cursor() {
          var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          return new TreeCursor(this, mode);
        }

        get tree() {
          return null;
        }

        toTree() {
          var children = [],
              positions = [];
          var buffer = this.context.buffer;
          var startI = this.index + 4,
              endI = buffer.buffer[this.index + 3];

          if (endI > startI) {
            var from = buffer.buffer[this.index + 1],
                to = buffer.buffer[this.index + 2];
            children.push(buffer.slice(startI, endI, from, to));
            positions.push(0);
          }

          return new Tree(this.type, children, positions, this.to - this.from);
        }

        resolve(pos) {
          var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          return resolveNode(this, pos, side, false);
        }

        resolveInner(pos) {
          var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          return resolveNode(this, pos, side, true);
        }

        enterUnfinishedNodesBefore(pos) {
          return enterUnfinishedNodesBefore(this, pos);
        }

        toString() {
          return this.context.buffer.childString(this.index);
        }

        getChild(type) {
          var before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          var after = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
          var r = getChildren(this, type, before, after);
          return r.length ? r[0] : null;
        }

        getChildren(type) {
          var before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          var after = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
          return getChildren(this, type, before, after);
        }

        get node() {
          return this;
        }

        matchContext(context) {
          return matchNodeContext(this, context);
        }

      };
      TreeCursor = class {
        constructor(node) {
          var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          this.mode = mode;
          this.buffer = null;
          this.stack = [];
          this.index = 0;
          this.bufferNode = null;

          if (node instanceof TreeNode) {
            this.yieldNode(node);
          } else {
            this._tree = node.context.parent;
            this.buffer = node.context;

            for (var n = node._parent; n; n = n._parent) {
              this.stack.unshift(n.index);
            }

            this.bufferNode = node;
            this.yieldBuf(node.index);
          }
        }

        get name() {
          return this.type.name;
        }

        yieldNode(node) {
          if (!node) return false;
          this._tree = node;
          this.type = node.type;
          this.from = node.from;
          this.to = node.to;
          return true;
        }

        yieldBuf(index, type) {
          this.index = index;
          var _this$buffer = this.buffer,
              start = _this$buffer.start,
              buffer = _this$buffer.buffer;
          this.type = type || buffer.set.types[buffer.buffer[index]];
          this.from = start + buffer.buffer[index + 1];
          this.to = start + buffer.buffer[index + 2];
          return true;
        }

        yield(node) {
          if (!node) return false;

          if (node instanceof TreeNode) {
            this.buffer = null;
            return this.yieldNode(node);
          }

          this.buffer = node.context;
          return this.yieldBuf(node.index, node.type);
        }

        toString() {
          return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
        }

        enterChild(dir, pos, side) {
          if (!this.buffer) return this.yield(this._tree.nextChild(dir < 0 ? this._tree._tree.children.length - 1 : 0, dir, pos, side, this.mode));
          var buffer = this.buffer.buffer;
          var index = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], dir, pos - this.buffer.start, side);
          if (index < 0) return false;
          this.stack.push(this.index);
          return this.yieldBuf(index);
        }

        firstChild() {
          return this.enterChild(1, 0, 4);
        }

        lastChild() {
          return this.enterChild(-1, 0, 4);
        }

        childAfter(pos) {
          return this.enterChild(1, pos, 2);
        }

        childBefore(pos) {
          return this.enterChild(-1, pos, -2);
        }

        enter(pos, side) {
          var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.mode;
          if (!this.buffer) return this.yield(this._tree.enter(pos, side, mode));
          return mode & IterMode.ExcludeBuffers ? false : this.enterChild(1, pos, side);
        }

        parent() {
          if (!this.buffer) return this.yieldNode(this.mode & IterMode.IncludeAnonymous ? this._tree._parent : this._tree.parent);
          if (this.stack.length) return this.yieldBuf(this.stack.pop());
          var parent = this.mode & IterMode.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
          this.buffer = null;
          return this.yieldNode(parent);
        }

        sibling(dir) {
          if (!this.buffer) return !this._tree._parent ? false : this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + dir, dir, 0, 4, this.mode));
          var buffer = this.buffer.buffer,
              d = this.stack.length - 1;

          if (dir < 0) {
            var parentStart = d < 0 ? 0 : this.stack[d] + 4;
            if (this.index != parentStart) return this.yieldBuf(buffer.findChild(parentStart, this.index, -1, 0, 4));
          } else {
            var after = buffer.buffer[this.index + 3];
            if (after < (d < 0 ? buffer.buffer.length : buffer.buffer[this.stack[d] + 3])) return this.yieldBuf(after);
          }

          return d < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + dir, dir, 0, 4, this.mode)) : false;
        }

        nextSibling() {
          return this.sibling(1);
        }

        prevSibling() {
          return this.sibling(-1);
        }

        atLastNode(dir) {
          var index,
              parent,
              buffer = this.buffer;

          if (buffer) {
            if (dir > 0) {
              if (this.index < buffer.buffer.buffer.length) return false;
            } else {
              for (var _i117 = 0; _i117 < this.index; _i117++) {
                if (buffer.buffer.buffer[_i117 + 3] < this.index) return false;
              }
            }

            index = buffer.index;
            parent = buffer.parent;
          } else {
            var _this$_tree = this._tree;
            index = _this$_tree.index;
            parent = _this$_tree._parent;
          }

          for (; parent; _parent3 = parent, index = _parent3.index, parent = _parent3._parent, _parent3) {
            var _parent3;

            if (index > -1) for (var _i118 = index + dir, e = dir < 0 ? -1 : parent._tree.children.length; _i118 != e; _i118 += dir) {
              var child = parent._tree.children[_i118];
              if (this.mode & IterMode.IncludeAnonymous || child instanceof TreeBuffer || !child.type.isAnonymous || hasChild(child)) return false;
            }
          }

          return true;
        }

        move(dir, enter) {
          if (enter && this.enterChild(dir, 0, 4)) return true;

          for (;;) {
            if (this.sibling(dir)) return true;
            if (this.atLastNode(dir) || !this.parent()) return false;
          }
        }

        next() {
          var enter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          return this.move(1, enter);
        }

        prev() {
          var enter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          return this.move(-1, enter);
        }

        moveTo(pos) {
          var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

          while (this.from == this.to || (side < 1 ? this.from >= pos : this.from > pos) || (side > -1 ? this.to <= pos : this.to < pos)) {
            if (!this.parent()) break;
          }

          while (this.enterChild(1, pos, side)) {}

          return this;
        }

        get node() {
          if (!this.buffer) return this._tree;
          var cache = this.bufferNode,
              result = null,
              depth = 0;

          if (cache && cache.context == this.buffer) {
            scan: for (var index = this.index, d = this.stack.length; d >= 0;) {
              for (var c = cache; c; c = c._parent) {
                if (c.index == index) {
                  if (index == this.index) return c;
                  result = c;
                  depth = d + 1;
                  break scan;
                }
              }

              index = this.stack[--d];
            }
          }

          for (var _i119 = depth; _i119 < this.stack.length; _i119++) {
            result = new BufferNode(this.buffer, result, this.stack[_i119]);
          }

          return this.bufferNode = new BufferNode(this.buffer, result, this.index);
        }

        get tree() {
          return this.buffer ? null : this._tree._tree;
        }

        iterate(enter, leave) {
          for (var depth = 0;;) {
            var mustLeave = false;

            if (this.type.isAnonymous || enter(this) !== false) {
              if (this.firstChild()) {
                depth++;
                continue;
              }

              if (!this.type.isAnonymous) mustLeave = true;
            }

            for (;;) {
              if (mustLeave && leave) leave(this);
              mustLeave = this.type.isAnonymous;
              if (this.nextSibling()) break;
              if (!depth) return;
              this.parent();
              depth--;
              mustLeave = true;
            }
          }
        }

        matchContext(context) {
          if (!this.buffer) return matchNodeContext(this.node, context);
          var buffer = this.buffer.buffer,
              types2 = buffer.set.types;

          for (var _i120 = context.length - 1, d = this.stack.length - 1; _i120 >= 0; d--) {
            if (d < 0) return matchNodeContext(this.node, context, _i120);
            var type = types2[buffer.buffer[this.stack[d]]];

            if (!type.isAnonymous) {
              if (context[_i120] && context[_i120] != type.name) return false;
              _i120--;
            }
          }

          return true;
        }

      };
      nodeSizeCache = /* @__PURE__ */new WeakMap();
      TreeFragment = class {
        constructor(from, to, tree, offset) {
          var openStart = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
          var openEnd = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
          this.from = from;
          this.to = to;
          this.tree = tree;
          this.offset = offset;
          this.open = (openStart ? 1 : 0) | (openEnd ? 2 : 0);
        }

        get openStart() {
          return (this.open & 1) > 0;
        }

        get openEnd() {
          return (this.open & 2) > 0;
        }

        static addTree(tree) {
          var fragments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
          var partial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var result = [new TreeFragment(0, tree.length, tree, 0, false, partial)];

          var _iterator137 = _createForOfIteratorHelper(fragments),
              _step137;

          try {
            for (_iterator137.s(); !(_step137 = _iterator137.n()).done;) {
              var f = _step137.value;
              if (f.to > tree.length) result.push(f);
            }
          } catch (err) {
            _iterator137.e(err);
          } finally {
            _iterator137.f();
          }

          return result;
        }

        static applyChanges(fragments, changes) {
          var minGap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 128;
          if (!changes.length) return fragments;
          var result = [];
          var fI = 1,
              nextF = fragments.length ? fragments[0] : null;

          for (var cI = 0, pos = 0, off = 0;; cI++) {
            var nextC = cI < changes.length ? changes[cI] : null;
            var nextPos = nextC ? nextC.fromA : 1e9;
            if (nextPos - pos >= minGap) while (nextF && nextF.from < nextPos) {
              var cut = nextF;

              if (pos >= cut.from || nextPos <= cut.to || off) {
                var fFrom = Math.max(cut.from, pos) - off,
                    fTo = Math.min(cut.to, nextPos) - off;
                cut = fFrom >= fTo ? null : new TreeFragment(fFrom, fTo, cut.tree, cut.offset + off, cI > 0, !!nextC);
              }

              if (cut) result.push(cut);
              if (nextF.to > nextPos) break;
              nextF = fI < fragments.length ? fragments[fI++] : null;
            }
            if (!nextC) break;
            pos = nextC.toA;
            off = nextC.toA - nextC.toB;
          }

          return result;
        }

      };
      Parser = class {
        startParse(input, fragments, ranges) {
          if (typeof input == "string") input = new StringInput(input);
          ranges = !ranges ? [new Range2(0, input.length)] : ranges.length ? ranges.map(r => new Range2(r.from, r.to)) : [new Range2(0, 0)];
          return this.createParse(input, fragments || [], ranges);
        }

        parse(input, fragments, ranges) {
          var parse = this.startParse(input, fragments, ranges);

          for (;;) {
            var done = parse.advance();
            if (done) return done;
          }
        }

      };
      StringInput = class {
        constructor(string2) {
          this.string = string2;
        }

        get length() {
          return this.string.length;
        }

        chunk(from) {
          return this.string.slice(from);
        }

        get lineChunks() {
          return false;
        }

        read(from, to) {
          return this.string.slice(from, to);
        }

      };
      stoppedInner = new NodeProp({
        perNode: true
      });
    }

  }); // node_modules/@lezer/highlight/dist/index.js


  function sameArray2(a, b) {
    return a.length == b.length && a.every((x, i) => x == b[i]);
  }

  function permute(array) {
    var result = [array];

    for (var _i121 = 0; _i121 < array.length; _i121++) {
      var _iterator138 = _createForOfIteratorHelper(permute(array.slice(0, _i121).concat(array.slice(_i121 + 1)))),
          _step138;

      try {
        for (_iterator138.s(); !(_step138 = _iterator138.n()).done;) {
          var a = _step138.value;
          result.push(a);
        }
      } catch (err) {
        _iterator138.e(err);
      } finally {
        _iterator138.f();
      }
    }

    return result;
  }

  function styleTags(spec) {
    var byName = /* @__PURE__ */Object.create(null);

    for (var prop in spec) {
      var tags2 = spec[prop];
      if (!Array.isArray(tags2)) tags2 = [tags2];

      var _iterator139 = _createForOfIteratorHelper(prop.split(" ")),
          _step139;

      try {
        for (_iterator139.s(); !(_step139 = _iterator139.n()).done;) {
          var part = _step139.value;

          if (part) {
            var pieces = [],
                mode = 2,
                rest = part;

            for (var pos = 0;;) {
              if (rest == "..." && pos > 0 && pos + 3 == part.length) {
                mode = 1;
                break;
              }

              var m = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(rest);
              if (!m) throw new RangeError("Invalid path: " + part);
              pieces.push(m[0] == "*" ? "" : m[0][0] == '"' ? JSON.parse(m[0]) : m[0]);
              pos += m[0].length;
              if (pos == part.length) break;
              var next = part[pos++];

              if (pos == part.length && next == "!") {
                mode = 0;
                break;
              }

              if (next != "/") throw new RangeError("Invalid path: " + part);
              rest = part.slice(pos);
            }

            var last = pieces.length - 1,
                inner = pieces[last];
            if (!inner) throw new RangeError("Invalid path: " + part);
            var rule = new Rule(tags2, mode, last > 0 ? pieces.slice(0, last) : null);
            byName[inner] = rule.sort(byName[inner]);
          }
        }
      } catch (err) {
        _iterator139.e(err);
      } finally {
        _iterator139.f();
      }
    }

    return ruleNodeProp.add(byName);
  }

  function tagHighlighter(tags2, options) {
    var map = /* @__PURE__ */Object.create(null);

    var _iterator140 = _createForOfIteratorHelper(tags2),
        _step140;

    try {
      for (_iterator140.s(); !(_step140 = _iterator140.n()).done;) {
        var style = _step140.value;
        if (!Array.isArray(style.tag)) map[style.tag.id] = style.class;else {
          var _iterator143 = _createForOfIteratorHelper(style.tag),
              _step143;

          try {
            for (_iterator143.s(); !(_step143 = _iterator143.n()).done;) {
              var tag = _step143.value;
              map[tag.id] = style.class;
            }
          } catch (err) {
            _iterator143.e(err);
          } finally {
            _iterator143.f();
          }
        }
      }
    } catch (err) {
      _iterator140.e(err);
    } finally {
      _iterator140.f();
    }

    var _ref18 = options || {},
        scope = _ref18.scope,
        _ref18$all = _ref18.all,
        all = _ref18$all === void 0 ? null : _ref18$all;

    return {
      style: tags3 => {
        var cls = all;

        var _iterator141 = _createForOfIteratorHelper(tags3),
            _step141;

        try {
          for (_iterator141.s(); !(_step141 = _iterator141.n()).done;) {
            var tag = _step141.value;

            var _iterator142 = _createForOfIteratorHelper(tag.set),
                _step142;

            try {
              for (_iterator142.s(); !(_step142 = _iterator142.n()).done;) {
                var sub = _step142.value;
                var tagClass = map[sub.id];

                if (tagClass) {
                  cls = cls ? cls + " " + tagClass : tagClass;
                  break;
                }
              }
            } catch (err) {
              _iterator142.e(err);
            } finally {
              _iterator142.f();
            }
          }
        } catch (err) {
          _iterator141.e(err);
        } finally {
          _iterator141.f();
        }

        return cls;
      },
      scope
    };
  }

  function highlightTags(highlighters, tags2) {
    var result = null;

    var _iterator144 = _createForOfIteratorHelper(highlighters),
        _step144;

    try {
      for (_iterator144.s(); !(_step144 = _iterator144.n()).done;) {
        var highlighter = _step144.value;
        var value = highlighter.style(tags2);
        if (value) result = result ? result + " " + value : value;
      }
    } catch (err) {
      _iterator144.e(err);
    } finally {
      _iterator144.f();
    }

    return result;
  }

  function highlightTree(tree, highlighter, putStyle) {
    var from = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var to = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : tree.length;
    var builder = new HighlightBuilder(from, Array.isArray(highlighter) ? highlighter : [highlighter], putStyle);
    builder.highlightRange(tree.cursor(), from, to, "", builder.highlighters);
    builder.flush(to);
  }

  var nextTagID, Tag, nextModifierID, Modifier, ruleNodeProp, Rule, HighlightBuilder, t, comment, name, typeName, propertyName, literal, string, number, content, heading, keyword, operator, punctuation, bracket, meta, tags, classHighlighter;

  var init_dist4 = __esm({
    "node_modules/@lezer/highlight/dist/index.js"() {
      init_dist3();
      nextTagID = 0;
      Tag = class {
        constructor(set, base2, modified) {
          this.set = set;
          this.base = base2;
          this.modified = modified;
          this.id = nextTagID++;
        }

        static define(parent) {
          if (parent === null || parent === void 0 ? void 0 : parent.base) throw new Error("Can not derive from a modified tag");
          var tag = new Tag([], null, []);
          tag.set.push(tag);

          if (parent) {
            var _iterator145 = _createForOfIteratorHelper(parent.set),
                _step145;

            try {
              for (_iterator145.s(); !(_step145 = _iterator145.n()).done;) {
                var t2 = _step145.value;
                tag.set.push(t2);
              }
            } catch (err) {
              _iterator145.e(err);
            } finally {
              _iterator145.f();
            }
          }

          return tag;
        }

        static defineModifier() {
          var mod = new Modifier();
          return tag => {
            if (tag.modified.indexOf(mod) > -1) return tag;
            return Modifier.get(tag.base || tag, tag.modified.concat(mod).sort((a, b) => a.id - b.id));
          };
        }

      };
      nextModifierID = 0;
      Modifier = class {
        constructor() {
          this.instances = [];
          this.id = nextModifierID++;
        }

        static get(base2, mods) {
          if (!mods.length) return base2;
          var exists = mods[0].instances.find(t2 => t2.base == base2 && sameArray2(mods, t2.modified));
          if (exists) return exists;
          var set = [],
              tag = new Tag(set, base2, mods);

          var _iterator146 = _createForOfIteratorHelper(mods),
              _step146;

          try {
            for (_iterator146.s(); !(_step146 = _iterator146.n()).done;) {
              var m = _step146.value;
              m.instances.push(tag);
            }
          } catch (err) {
            _iterator146.e(err);
          } finally {
            _iterator146.f();
          }

          var configs = permute(mods);

          var _iterator147 = _createForOfIteratorHelper(base2.set),
              _step147;

          try {
            for (_iterator147.s(); !(_step147 = _iterator147.n()).done;) {
              var parent = _step147.value;

              var _iterator148 = _createForOfIteratorHelper(configs),
                  _step148;

              try {
                for (_iterator148.s(); !(_step148 = _iterator148.n()).done;) {
                  var config2 = _step148.value;
                  set.push(Modifier.get(parent, config2));
                }
              } catch (err) {
                _iterator148.e(err);
              } finally {
                _iterator148.f();
              }
            }
          } catch (err) {
            _iterator147.e(err);
          } finally {
            _iterator147.f();
          }

          return tag;
        }

      };
      ruleNodeProp = new NodeProp();
      Rule = class {
        constructor(tags2, mode, context, next) {
          this.tags = tags2;
          this.mode = mode;
          this.context = context;
          this.next = next;
        }

        sort(other) {
          if (!other || other.depth < this.depth) {
            this.next = other;
            return this;
          }

          other.next = this.sort(other.next);
          return other;
        }

        get depth() {
          return this.context ? this.context.length : 0;
        }

      };
      HighlightBuilder = class {
        constructor(at, highlighters, span) {
          this.at = at;
          this.highlighters = highlighters;
          this.span = span;
          this.class = "";
        }

        startSpan(at, cls) {
          if (cls != this.class) {
            this.flush(at);
            if (at > this.at) this.at = at;
            this.class = cls;
          }
        }

        flush(to) {
          if (to > this.at && this.class) this.span(this.at, to, this.class);
        }

        highlightRange(cursor, from, to, inheritedClass, highlighters) {
          var type = cursor.type,
              start = cursor.from,
              end = cursor.to;
          if (start >= to || end <= from) return;
          if (type.isTop) highlighters = this.highlighters.filter(h => !h.scope || h.scope(type));
          var cls = inheritedClass;
          var rule = type.prop(ruleNodeProp),
              opaque = false;

          while (rule) {
            if (!rule.context || cursor.matchContext(rule.context)) {
              var tagCls = highlightTags(highlighters, rule.tags);

              if (tagCls) {
                if (cls) cls += " ";
                cls += tagCls;
                if (rule.mode == 1) inheritedClass += (inheritedClass ? " " : "") + tagCls;else if (rule.mode == 0) opaque = true;
              }

              break;
            }

            rule = rule.next;
          }

          this.startSpan(cursor.from, cls);
          if (opaque) return;
          var mounted = cursor.tree && cursor.tree.prop(NodeProp.mounted);

          if (mounted && mounted.overlay) {
            var inner = cursor.node.enter(mounted.overlay[0].from + start, 1);
            var innerHighlighters = this.highlighters.filter(h => !h.scope || h.scope(mounted.tree.type));
            var hasChild2 = cursor.firstChild();

            for (var _i122 = 0, pos = start;; _i122++) {
              var next = _i122 < mounted.overlay.length ? mounted.overlay[_i122] : null;
              var nextPos = next ? next.from + start : end;
              var rangeFrom = Math.max(from, pos),
                  rangeTo = Math.min(to, nextPos);

              if (rangeFrom < rangeTo && hasChild2) {
                while (cursor.from < rangeTo) {
                  this.highlightRange(cursor, rangeFrom, rangeTo, inheritedClass, highlighters);
                  this.startSpan(Math.min(to, cursor.to), cls);
                  if (cursor.to >= nextPos || !cursor.nextSibling()) break;
                }
              }

              if (!next || nextPos > to) break;
              pos = next.to + start;

              if (pos > from) {
                this.highlightRange(inner.cursor(), Math.max(from, next.from + start), Math.min(to, pos), inheritedClass, innerHighlighters);
                this.startSpan(pos, cls);
              }
            }

            if (hasChild2) cursor.parent();
          } else if (cursor.firstChild()) {
            do {
              if (cursor.to <= from) continue;
              if (cursor.from >= to) break;
              this.highlightRange(cursor, from, to, inheritedClass, highlighters);
              this.startSpan(Math.min(to, cursor.to), cls);
            } while (cursor.nextSibling());

            cursor.parent();
          }
        }

      };
      t = Tag.define;
      comment = t();
      name = t();
      typeName = t(name);
      propertyName = t(name);
      literal = t();
      string = t(literal);
      number = t(literal);
      content = t();
      heading = t(content);
      keyword = t();
      operator = t();
      punctuation = t();
      bracket = t(punctuation);
      meta = t();
      tags = {
        comment,
        lineComment: t(comment),
        blockComment: t(comment),
        docComment: t(comment),
        name,
        variableName: t(name),
        typeName,
        tagName: t(typeName),
        propertyName,
        attributeName: t(propertyName),
        className: t(name),
        labelName: t(name),
        namespace: t(name),
        macroName: t(name),
        literal,
        string,
        docString: t(string),
        character: t(string),
        attributeValue: t(string),
        number,
        integer: t(number),
        float: t(number),
        bool: t(literal),
        regexp: t(literal),
        escape: t(literal),
        color: t(literal),
        url: t(literal),
        keyword,
        self: t(keyword),
        null: t(keyword),
        atom: t(keyword),
        unit: t(keyword),
        modifier: t(keyword),
        operatorKeyword: t(keyword),
        controlKeyword: t(keyword),
        definitionKeyword: t(keyword),
        moduleKeyword: t(keyword),
        operator,
        derefOperator: t(operator),
        arithmeticOperator: t(operator),
        logicOperator: t(operator),
        bitwiseOperator: t(operator),
        compareOperator: t(operator),
        updateOperator: t(operator),
        definitionOperator: t(operator),
        typeOperator: t(operator),
        controlOperator: t(operator),
        punctuation,
        separator: t(punctuation),
        bracket,
        angleBracket: t(bracket),
        squareBracket: t(bracket),
        paren: t(bracket),
        brace: t(bracket),
        content,
        heading,
        heading1: t(heading),
        heading2: t(heading),
        heading3: t(heading),
        heading4: t(heading),
        heading5: t(heading),
        heading6: t(heading),
        contentSeparator: t(content),
        list: t(content),
        quote: t(content),
        emphasis: t(content),
        strong: t(content),
        link: t(content),
        monospace: t(content),
        strikethrough: t(content),
        inserted: t(),
        deleted: t(),
        changed: t(),
        invalid: t(),
        meta,
        documentMeta: t(meta),
        annotation: t(meta),
        processingInstruction: t(meta),
        definition: Tag.defineModifier(),
        constant: Tag.defineModifier(),
        function: Tag.defineModifier(),
        standard: Tag.defineModifier(),
        local: Tag.defineModifier(),
        special: Tag.defineModifier()
      };
      classHighlighter = tagHighlighter([{
        tag: tags.link,
        class: "tok-link"
      }, {
        tag: tags.heading,
        class: "tok-heading"
      }, {
        tag: tags.emphasis,
        class: "tok-emphasis"
      }, {
        tag: tags.strong,
        class: "tok-strong"
      }, {
        tag: tags.keyword,
        class: "tok-keyword"
      }, {
        tag: tags.atom,
        class: "tok-atom"
      }, {
        tag: tags.bool,
        class: "tok-bool"
      }, {
        tag: tags.url,
        class: "tok-url"
      }, {
        tag: tags.labelName,
        class: "tok-labelName"
      }, {
        tag: tags.inserted,
        class: "tok-inserted"
      }, {
        tag: tags.deleted,
        class: "tok-deleted"
      }, {
        tag: tags.literal,
        class: "tok-literal"
      }, {
        tag: tags.string,
        class: "tok-string"
      }, {
        tag: tags.number,
        class: "tok-number"
      }, {
        tag: [tags.regexp, tags.escape, tags.special(tags.string)],
        class: "tok-string2"
      }, {
        tag: tags.variableName,
        class: "tok-variableName"
      }, {
        tag: tags.local(tags.variableName),
        class: "tok-variableName tok-local"
      }, {
        tag: tags.definition(tags.variableName),
        class: "tok-variableName tok-definition"
      }, {
        tag: tags.special(tags.variableName),
        class: "tok-variableName2"
      }, {
        tag: tags.definition(tags.propertyName),
        class: "tok-propertyName tok-definition"
      }, {
        tag: tags.typeName,
        class: "tok-typeName"
      }, {
        tag: tags.namespace,
        class: "tok-namespace"
      }, {
        tag: tags.className,
        class: "tok-className"
      }, {
        tag: tags.macroName,
        class: "tok-macroName"
      }, {
        tag: tags.propertyName,
        class: "tok-propertyName"
      }, {
        tag: tags.operator,
        class: "tok-operator"
      }, {
        tag: tags.comment,
        class: "tok-comment"
      }, {
        tag: tags.meta,
        class: "tok-meta"
      }, {
        tag: tags.invalid,
        class: "tok-invalid"
      }, {
        tag: tags.punctuation,
        class: "tok-punctuation"
      }]);
    }

  }); // node_modules/@codemirror/language/dist/index.js


  function languageDataFacetAt(state, pos, side) {
    var topLang = state.facet(language);
    if (!topLang) return null;
    var facet = topLang.data;

    if (topLang.allowsNesting) {
      for (var node = syntaxTree(state).topNode; node; node = node.enter(pos, side, IterMode.ExcludeBuffers)) {
        facet = node.type.prop(languageDataProp) || facet;
      }
    }

    return facet;
  }

  function syntaxTree(state) {
    var field = state.field(Language.state, false);
    return field ? field.tree : Tree.empty;
  }

  function cutFragments(fragments, from, to) {
    return TreeFragment.applyChanges(fragments, [{
      fromA: from,
      toA: to,
      fromB: from,
      toB: to
    }]);
  }

  function getIndentUnit(state) {
    var unit = state.facet(indentUnit);
    return unit.charCodeAt(0) == 9 ? state.tabSize * unit.length : unit.length;
  }

  function indentString(state, cols) {
    var result = "",
        ts = state.tabSize;
    if (state.facet(indentUnit).charCodeAt(0) == 9) while (cols >= ts) {
      result += "	";
      cols -= ts;
    }

    for (var _i123 = 0; _i123 < cols; _i123++) {
      result += " ";
    }

    return result;
  }

  function getIndentation(context, pos) {
    if (context instanceof EditorState) context = new IndentContext(context);

    var _iterator149 = _createForOfIteratorHelper(context.state.facet(indentService)),
        _step149;

    try {
      for (_iterator149.s(); !(_step149 = _iterator149.n()).done;) {
        var service = _step149.value;
        var result = service(context, pos);
        if (result != null) return result;
      }
    } catch (err) {
      _iterator149.e(err);
    } finally {
      _iterator149.f();
    }

    var tree = syntaxTree(context.state);
    return tree ? syntaxIndentation(context, tree, pos) : null;
  }

  function syntaxIndentation(cx, ast, pos) {
    return indentFrom(ast.resolveInner(pos).enterUnfinishedNodesBefore(pos), pos, cx);
  }

  function ignoreClosed(cx) {
    return cx.pos == cx.options.simulateBreak && cx.options.simulateDoubleBreak;
  }

  function indentStrategy(tree) {
    var strategy = tree.type.prop(indentNodeProp);
    if (strategy) return strategy;
    var first = tree.firstChild,
        close;

    if (first && (close = first.type.prop(NodeProp.closedBy))) {
      var last = tree.lastChild,
          closed = last && close.indexOf(last.name) > -1;
      return cx => delimitedStrategy(cx, true, 1, void 0, closed && !ignoreClosed(cx) ? last.from : void 0);
    }

    return tree.parent == null ? topIndent : null;
  }

  function indentFrom(node, pos, base2) {
    for (; node; node = node.parent) {
      var strategy = indentStrategy(node);
      if (strategy) return strategy(TreeIndentContext.create(base2, pos, node));
    }

    return null;
  }

  function topIndent() {
    return 0;
  }

  function isParent(parent, of) {
    for (var cur2 = of; cur2; cur2 = cur2.parent) {
      if (parent == cur2) return true;
    }

    return false;
  }

  function bracketedAligned(context) {
    var tree = context.node;
    var openToken = tree.childAfter(tree.from),
        last = tree.lastChild;
    if (!openToken) return null;
    var sim = context.options.simulateBreak;
    var openLine = context.state.doc.lineAt(openToken.from);
    var lineEnd = sim == null || sim <= openLine.from ? openLine.to : Math.min(openLine.to, sim);

    for (var pos = openToken.to;;) {
      var next = tree.childAfter(pos);
      if (!next || next == last) return null;
      if (!next.type.isSkipped) return next.from < lineEnd ? openToken : null;
      pos = next.to;
    }
  }

  function delimitedStrategy(context, align, units, closing2, closedAt) {
    var after = context.textAfter,
        space = after.match(/^\s*/)[0].length;
    var closed = closing2 && after.slice(space, space + closing2.length) == closing2 || closedAt == context.pos + space;
    var aligned = align ? bracketedAligned(context) : null;
    if (aligned) return closed ? context.column(aligned.from) : context.column(aligned.to);
    return context.baseIndent + (closed ? 0 : context.unit * units);
  }

  function indentOnInput() {
    return EditorState.transactionFilter.of(tr => {
      if (!tr.docChanged || !tr.isUserEvent("input.type") && !tr.isUserEvent("input.complete")) return tr;
      var rules = tr.startState.languageDataAt("indentOnInput", tr.startState.selection.main.head);
      if (!rules.length) return tr;
      var doc2 = tr.newDoc,
          head = tr.newSelection.main.head,
          line = doc2.lineAt(head);
      if (head > line.from + DontIndentBeyond) return tr;
      var lineStart = doc2.sliceString(line.from, head);
      if (!rules.some(r => r.test(lineStart))) return tr;
      var state = tr.state,
          last = -1,
          changes = [];

      var _iterator150 = _createForOfIteratorHelper(state.selection.ranges),
          _step150;

      try {
        for (_iterator150.s(); !(_step150 = _iterator150.n()).done;) {
          var head2 = _step150.value.head;
          var line2 = state.doc.lineAt(head2);
          if (line2.from == last) continue;
          last = line2.from;
          var indent = getIndentation(state, line2.from);
          if (indent == null) continue;
          var cur2 = /^\s*/.exec(line2.text)[0];
          var norm = indentString(state, indent);
          if (cur2 != norm) changes.push({
            from: line2.from,
            to: line2.from + cur2.length,
            insert: norm
          });
        }
      } catch (err) {
        _iterator150.e(err);
      } finally {
        _iterator150.f();
      }

      return changes.length ? [tr, {
        changes,
        sequential: true
      }] : tr;
    });
  }

  function syntaxFolding(state, start, end) {
    var tree = syntaxTree(state);
    if (tree.length < end) return null;
    var inner = tree.resolveInner(end);
    var found = null;

    for (var cur2 = inner; cur2; cur2 = cur2.parent) {
      if (cur2.to <= end || cur2.from > end) continue;
      if (found && cur2.from < start) break;
      var prop = cur2.type.prop(foldNodeProp);

      if (prop && (cur2.to < tree.length - 50 || tree.length == state.doc.length || !isUnfinished(cur2))) {
        var value = prop(cur2, state);
        if (value && value.from <= end && value.from >= start && value.to > end) found = value;
      }
    }

    return found;
  }

  function isUnfinished(node) {
    var ch = node.lastChild;
    return ch && ch.to == node.to && ch.type.isError;
  }

  function foldable(state, lineStart, lineEnd) {
    var _iterator151 = _createForOfIteratorHelper(state.facet(foldService)),
        _step151;

    try {
      for (_iterator151.s(); !(_step151 = _iterator151.n()).done;) {
        var service = _step151.value;
        var result = service(state, lineStart, lineEnd);
        if (result) return result;
      }
    } catch (err) {
      _iterator151.e(err);
    } finally {
      _iterator151.f();
    }

    return syntaxFolding(state, lineStart, lineEnd);
  }

  function mapRange(range, mapping) {
    var from = mapping.mapPos(range.from, 1),
        to = mapping.mapPos(range.to, -1);
    return from >= to ? void 0 : {
      from,
      to
    };
  }

  function selectedLines(view) {
    var lines = [];

    var _iterator152 = _createForOfIteratorHelper(view.state.selection.ranges),
        _step152;

    try {
      var _loop14 = function _loop14() {
        var head = _step152.value.head;
        if (lines.some(l => l.from <= head && l.to >= head)) return "continue";
        lines.push(view.lineBlockAt(head));
      };

      for (_iterator152.s(); !(_step152 = _iterator152.n()).done;) {
        var _ret2 = _loop14();

        if (_ret2 === "continue") continue;
      }
    } catch (err) {
      _iterator152.e(err);
    } finally {
      _iterator152.f();
    }

    return lines;
  }

  function findFold(state, from, to) {
    var _a2;

    var found = null;
    (_a2 = state.field(foldState, false)) === null || _a2 === void 0 ? void 0 : _a2.between(from, to, (from2, to2) => {
      if (!found || found.from > from2) found = {
        from: from2,
        to: to2
      };
    });
    return found;
  }

  function foldExists(folded, from, to) {
    var found = false;
    folded.between(from, from, (a, b) => {
      if (a == from && b == to) found = true;
    });
    return found;
  }

  function maybeEnable(state, other) {
    return state.field(foldState, false) ? other : other.concat(StateEffect.appendConfig.of(codeFolding()));
  }

  function announceFold(view, range) {
    var fold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var lineFrom = view.state.doc.lineAt(range.from).number,
        lineTo = view.state.doc.lineAt(range.to).number;
    return EditorView.announce.of("".concat(view.state.phrase(fold ? "Folded lines" : "Unfolded lines"), " ").concat(lineFrom, " ").concat(view.state.phrase("to"), " ").concat(lineTo, "."));
  }

  function codeFolding(config2) {
    var result = [foldState, baseTheme$12];
    if (config2) result.push(foldConfig.of(config2));
    return result;
  }

  function foldGutter() {
    var config2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var fullConfig = Object.assign(Object.assign({}, foldGutterDefaults), config2);
    var canFold = new FoldMarker(fullConfig, true),
        canUnfold = new FoldMarker(fullConfig, false);
    var markers = ViewPlugin.fromClass(class {
      constructor(view) {
        this.from = view.viewport.from;
        this.markers = this.buildMarkers(view);
      }

      update(update) {
        if (update.docChanged || update.viewportChanged || update.startState.facet(language) != update.state.facet(language) || update.startState.field(foldState, false) != update.state.field(foldState, false) || syntaxTree(update.startState) != syntaxTree(update.state) || fullConfig.foldingChanged(update)) this.markers = this.buildMarkers(update.view);
      }

      buildMarkers(view) {
        var builder = new RangeSetBuilder();

        var _iterator153 = _createForOfIteratorHelper(view.viewportLineBlocks),
            _step153;

        try {
          for (_iterator153.s(); !(_step153 = _iterator153.n()).done;) {
            var line = _step153.value;
            var mark = findFold(view.state, line.from, line.to) ? canUnfold : foldable(view.state, line.from, line.to) ? canFold : null;
            if (mark) builder.add(line.from, line.from, mark);
          }
        } catch (err) {
          _iterator153.e(err);
        } finally {
          _iterator153.f();
        }

        return builder.finish();
      }

    });
    var domEventHandlers = fullConfig.domEventHandlers;
    return [markers, gutter({
      class: "cm-foldGutter",

      markers(view) {
        var _a2;

        return ((_a2 = view.plugin(markers)) === null || _a2 === void 0 ? void 0 : _a2.markers) || RangeSet.empty;
      },

      initialSpacer() {
        return new FoldMarker(fullConfig, false);
      },

      domEventHandlers: Object.assign(Object.assign({}, domEventHandlers), {
        click: (view, line, event) => {
          if (domEventHandlers.click && domEventHandlers.click(view, line, event)) return true;
          var folded = findFold(view.state, line.from, line.to);

          if (folded) {
            view.dispatch({
              effects: unfoldEffect.of(folded)
            });
            return true;
          }

          var range = foldable(view.state, line.from, line.to);

          if (range) {
            view.dispatch({
              effects: foldEffect.of(range)
            });
            return true;
          }

          return false;
        }
      })
    }), codeFolding()];
  }

  function getHighlighters(state) {
    var main = state.facet(highlighterFacet);
    return main.length ? main : state.facet(fallbackHighlighter);
  }

  function syntaxHighlighting(highlighter, options) {
    var ext = [treeHighlighter],
        themeType;

    if (highlighter instanceof HighlightStyle) {
      if (highlighter.module) ext.push(EditorView.styleModule.of(highlighter.module));
      themeType = highlighter.themeType;
    }

    if (options === null || options === void 0 ? void 0 : options.fallback) ext.push(fallbackHighlighter.of(highlighter));else if (themeType) ext.push(highlighterFacet.computeN([EditorView.darkTheme], state => {
      return state.facet(EditorView.darkTheme) == (themeType == "dark") ? [highlighter] : [];
    }));else ext.push(highlighterFacet.of(highlighter));
    return ext;
  }

  function defaultRenderMatch(match) {
    var decorations2 = [];
    var mark = match.matched ? matchingMark : nonmatchingMark;
    decorations2.push(mark.range(match.start.from, match.start.to));
    if (match.end) decorations2.push(mark.range(match.end.from, match.end.to));
    return decorations2;
  }

  function bracketMatching() {
    var config2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return [bracketMatchingConfig.of(config2), bracketMatchingUnique];
  }

  function matchingNodes(node, dir, brackets) {
    var byProp = node.prop(dir < 0 ? NodeProp.openedBy : NodeProp.closedBy);
    if (byProp) return byProp;

    if (node.name.length == 1) {
      var index = brackets.indexOf(node.name);
      if (index > -1 && index % 2 == (dir < 0 ? 1 : 0)) return [brackets[index + dir]];
    }

    return null;
  }

  function matchBrackets(state, pos, dir) {
    var config2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var maxScanDistance = config2.maxScanDistance || DefaultScanDist,
        brackets = config2.brackets || DefaultBrackets;
    var tree = syntaxTree(state),
        node = tree.resolveInner(pos, dir);

    for (var cur2 = node; cur2; cur2 = cur2.parent) {
      var matches = matchingNodes(cur2.type, dir, brackets);
      if (matches && cur2.from < cur2.to) return matchMarkedBrackets(state, pos, dir, cur2, matches, brackets);
    }

    return matchPlainBrackets(state, pos, dir, tree, node.type, maxScanDistance, brackets);
  }

  function matchMarkedBrackets(_state, _pos, dir, token, matching, brackets) {
    var parent = token.parent,
        firstToken = {
      from: token.from,
      to: token.to
    };
    var depth = 0,
        cursor = parent === null || parent === void 0 ? void 0 : parent.cursor();
    if (cursor && (dir < 0 ? cursor.childBefore(token.from) : cursor.childAfter(token.to))) do {
      if (dir < 0 ? cursor.to <= token.from : cursor.from >= token.to) {
        if (depth == 0 && matching.indexOf(cursor.type.name) > -1 && cursor.from < cursor.to) {
          return {
            start: firstToken,
            end: {
              from: cursor.from,
              to: cursor.to
            },
            matched: true
          };
        } else if (matchingNodes(cursor.type, dir, brackets)) {
          depth++;
        } else if (matchingNodes(cursor.type, -dir, brackets)) {
          depth--;
          if (depth == 0) return {
            start: firstToken,
            end: cursor.from == cursor.to ? void 0 : {
              from: cursor.from,
              to: cursor.to
            },
            matched: false
          };
        }
      }
    } while (dir < 0 ? cursor.prevSibling() : cursor.nextSibling());
    return {
      start: firstToken,
      matched: false
    };
  }

  function matchPlainBrackets(state, pos, dir, tree, tokenType, maxScanDistance, brackets) {
    var startCh = dir < 0 ? state.sliceDoc(pos - 1, pos) : state.sliceDoc(pos, pos + 1);
    var bracket2 = brackets.indexOf(startCh);
    if (bracket2 < 0 || bracket2 % 2 == 0 != dir > 0) return null;
    var startToken = {
      from: dir < 0 ? pos - 1 : pos,
      to: dir > 0 ? pos + 1 : pos
    };
    var iter = state.doc.iterRange(pos, dir > 0 ? state.doc.length : 0),
        depth = 0;

    for (var distance = 0; !iter.next().done && distance <= maxScanDistance;) {
      var text = iter.value;
      if (dir < 0) distance += text.length;
      var basePos = pos + distance * dir;

      for (var pos2 = dir > 0 ? 0 : text.length - 1, end = dir > 0 ? text.length : -1; pos2 != end; pos2 += dir) {
        var found = brackets.indexOf(text[pos2]);
        if (found < 0 || tree.resolve(basePos + pos2, 1).type != tokenType) continue;

        if (found % 2 == 0 == dir > 0) {
          depth++;
        } else if (depth == 1) {
          return {
            start: startToken,
            end: {
              from: basePos + pos2,
              to: basePos + pos2 + 1
            },
            matched: found >> 1 == bracket2 >> 1
          };
        } else {
          depth--;
        }
      }

      if (dir > 0) distance += text.length;
    }

    return iter.done ? {
      start: startToken,
      matched: false
    } : null;
  }

  function warnForPart(part, msg) {
    if (warned.indexOf(part) > -1) return;
    warned.push(part);
    console.warn(msg);
  }

  function createTokenType(extra, tagStr) {
    var tag = null;

    var _iterator154 = _createForOfIteratorHelper(tagStr.split(".")),
        _step154;

    try {
      for (_iterator154.s(); !(_step154 = _iterator154.n()).done;) {
        var part = _step154.value;
        var value = extra[part] || tags[part];

        if (!value) {
          warnForPart(part, "Unknown highlighting tag ".concat(part));
        } else if (typeof value == "function") {
          if (!tag) warnForPart(part, "Modifier ".concat(part, " used at start of tag"));else tag = value(tag);
        } else {
          if (tag) warnForPart(part, "Tag ".concat(part, " used as modifier"));else tag = value;
        }
      }
    } catch (err) {
      _iterator154.e(err);
    } finally {
      _iterator154.f();
    }

    if (!tag) return 0;
    var name2 = tagStr.replace(/ /g, "_"),
        type = NodeType.define({
      id: typeArray.length,
      name: name2,
      props: [styleTags({
        [name2]: tag
      })]
    });
    typeArray.push(type);
    return type.id;
  }

  var _a, languageDataProp, Language, DocInput, currentContext, ParseContext, LanguageState, requestIdle, isInputPending, parseWorker, language, indentService, indentUnit, IndentContext, indentNodeProp, TreeIndentContext, DontIndentBeyond, foldService, foldNodeProp, foldEffect, unfoldEffect, foldState, foldCode, unfoldCode, foldAll, unfoldAll, foldKeymap, defaultConfig, foldConfig, foldWidget, foldGutterDefaults, FoldMarker, baseTheme$12, HighlightStyle, highlighterFacet, fallbackHighlighter, TreeHighlighter, treeHighlighter, defaultHighlightStyle, baseTheme2, DefaultScanDist, DefaultBrackets, bracketMatchingConfig, matchingMark, nonmatchingMark, bracketMatchingState, bracketMatchingUnique, noTokens, typeArray, warned, defaultTable;

  var init_dist5 = __esm({
    "node_modules/@codemirror/language/dist/index.js"() {
      init_dist3();
      init_dist();
      init_dist2();
      init_dist4();
      init_style_mod();
      languageDataProp = /* @__PURE__ */new NodeProp();
      Language = class {
        constructor(data, parser) {
          var extraExtensions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
          this.data = data;
          if (!EditorState.prototype.hasOwnProperty("tree")) Object.defineProperty(EditorState.prototype, "tree", {
            get() {
              return syntaxTree(this);
            }

          });
          this.parser = parser;
          this.extension = [language.of(this), EditorState.languageData.of((state, pos, side) => state.facet(languageDataFacetAt(state, pos, side)))].concat(extraExtensions);
        }

        isActiveAt(state, pos) {
          var side = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
          return languageDataFacetAt(state, pos, side) == this.data;
        }

        findRegions(state) {
          var lang = state.facet(language);
          if ((lang === null || lang === void 0 ? void 0 : lang.data) == this.data) return [{
            from: 0,
            to: state.doc.length
          }];
          if (!lang || !lang.allowsNesting) return [];
          var result = [];

          var explore = (tree, from) => {
            if (tree.prop(languageDataProp) == this.data) {
              result.push({
                from,
                to: from + tree.length
              });
              return;
            }

            var mount = tree.prop(NodeProp.mounted);

            if (mount) {
              if (mount.tree.prop(languageDataProp) == this.data) {
                if (mount.overlay) {
                  var _iterator155 = _createForOfIteratorHelper(mount.overlay),
                      _step155;

                  try {
                    for (_iterator155.s(); !(_step155 = _iterator155.n()).done;) {
                      var r = _step155.value;
                      result.push({
                        from: r.from + from,
                        to: r.to + from
                      });
                    }
                  } catch (err) {
                    _iterator155.e(err);
                  } finally {
                    _iterator155.f();
                  }
                } else result.push({
                  from,
                  to: from + tree.length
                });

                return;
              } else if (mount.overlay) {
                var size = result.length;
                explore(mount.tree, mount.overlay[0].from + from);
                if (result.length > size) return;
              }
            }

            for (var _i124 = 0; _i124 < tree.children.length; _i124++) {
              var ch = tree.children[_i124];
              if (ch instanceof Tree) explore(ch, tree.positions[_i124] + from);
            }
          };

          explore(syntaxTree(state), 0);
          return result;
        }

        get allowsNesting() {
          return true;
        }

      };
      Language.setState = /* @__PURE__ */StateEffect.define();
      DocInput = class {
        constructor(doc2) {
          var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : doc2.length;
          this.doc = doc2;
          this.length = length;
          this.cursorPos = 0;
          this.string = "";
          this.cursor = doc2.iter();
        }

        syncTo(pos) {
          this.string = this.cursor.next(pos - this.cursorPos).value;
          this.cursorPos = pos + this.string.length;
          return this.cursorPos - this.string.length;
        }

        chunk(pos) {
          this.syncTo(pos);
          return this.string;
        }

        get lineChunks() {
          return true;
        }

        read(from, to) {
          var stringStart = this.cursorPos - this.string.length;
          if (from < stringStart || to >= this.cursorPos) return this.doc.sliceString(from, to);else return this.string.slice(from - stringStart, to - stringStart);
        }

      };
      currentContext = null;
      ParseContext = class {
        constructor(parser, state) {
          var fragments = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
          var tree = arguments.length > 3 ? arguments[3] : undefined;
          var treeLen = arguments.length > 4 ? arguments[4] : undefined;
          var viewport = arguments.length > 5 ? arguments[5] : undefined;
          var skipped = arguments.length > 6 ? arguments[6] : undefined;
          var scheduleOn = arguments.length > 7 ? arguments[7] : undefined;
          this.parser = parser;
          this.state = state;
          this.fragments = fragments;
          this.tree = tree;
          this.treeLen = treeLen;
          this.viewport = viewport;
          this.skipped = skipped;
          this.scheduleOn = scheduleOn;
          this.parse = null;
          this.tempSkipped = [];
        }

        static create(parser, state, viewport) {
          return new ParseContext(parser, state, [], Tree.empty, 0, viewport, [], null);
        }

        startParse() {
          return this.parser.startParse(new DocInput(this.state.doc), this.fragments);
        }

        work(until, upto) {
          if (upto != null && upto >= this.state.doc.length) upto = void 0;

          if (this.tree != Tree.empty && this.isDone(upto !== null && upto !== void 0 ? upto : this.state.doc.length)) {
            this.takeTree();
            return true;
          }

          return this.withContext(() => {
            var _a2;

            if (typeof until == "number") {
              var endTime = Date.now() + until;

              until = () => Date.now() > endTime;
            }

            if (!this.parse) this.parse = this.startParse();
            if (upto != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > upto) && upto < this.state.doc.length) this.parse.stopAt(upto);

            for (;;) {
              var done = this.parse.advance();

              if (done) {
                this.fragments = this.withoutTempSkipped(TreeFragment.addTree(done, this.fragments, this.parse.stoppedAt != null));
                this.treeLen = (_a2 = this.parse.stoppedAt) !== null && _a2 !== void 0 ? _a2 : this.state.doc.length;
                this.tree = done;
                this.parse = null;
                if (this.treeLen < (upto !== null && upto !== void 0 ? upto : this.state.doc.length)) this.parse = this.startParse();else return true;
              }

              if (until()) return false;
            }
          });
        }

        takeTree() {
          var pos, tree;

          if (this.parse && (pos = this.parse.parsedPos) >= this.treeLen) {
            if (this.parse.stoppedAt == null || this.parse.stoppedAt > pos) this.parse.stopAt(pos);
            this.withContext(() => {
              while (!(tree = this.parse.advance())) {}
            });
            this.treeLen = pos;
            this.tree = tree;
            this.fragments = this.withoutTempSkipped(TreeFragment.addTree(this.tree, this.fragments, true));
            this.parse = null;
          }
        }

        withContext(f) {
          var prev = currentContext;
          currentContext = this;

          try {
            return f();
          } finally {
            currentContext = prev;
          }
        }

        withoutTempSkipped(fragments) {
          for (var r; r = this.tempSkipped.pop();) {
            fragments = cutFragments(fragments, r.from, r.to);
          }

          return fragments;
        }

        changes(changes, newState) {
          var fragments = this.fragments,
              tree = this.tree,
              treeLen = this.treeLen,
              viewport = this.viewport,
              skipped = this.skipped;
          this.takeTree();

          if (!changes.empty) {
            var ranges = [];
            changes.iterChangedRanges((fromA, toA, fromB, toB) => ranges.push({
              fromA,
              toA,
              fromB,
              toB
            }));
            fragments = TreeFragment.applyChanges(fragments, ranges);
            tree = Tree.empty;
            treeLen = 0;
            viewport = {
              from: changes.mapPos(viewport.from, -1),
              to: changes.mapPos(viewport.to, 1)
            };

            if (this.skipped.length) {
              skipped = [];

              var _iterator156 = _createForOfIteratorHelper(this.skipped),
                  _step156;

              try {
                for (_iterator156.s(); !(_step156 = _iterator156.n()).done;) {
                  var r = _step156.value;
                  var from = changes.mapPos(r.from, 1),
                      to = changes.mapPos(r.to, -1);
                  if (from < to) skipped.push({
                    from,
                    to
                  });
                }
              } catch (err) {
                _iterator156.e(err);
              } finally {
                _iterator156.f();
              }
            }
          }

          return new ParseContext(this.parser, newState, fragments, tree, treeLen, viewport, skipped, this.scheduleOn);
        }

        updateViewport(viewport) {
          if (this.viewport.from == viewport.from && this.viewport.to == viewport.to) return false;
          this.viewport = viewport;
          var startLen = this.skipped.length;

          for (var _i125 = 0; _i125 < this.skipped.length; _i125++) {
            var _this$skipped$_i = this.skipped[_i125],
                from = _this$skipped$_i.from,
                to = _this$skipped$_i.to;

            if (from < viewport.to && to > viewport.from) {
              this.fragments = cutFragments(this.fragments, from, to);
              this.skipped.splice(_i125--, 1);
            }
          }

          if (this.skipped.length >= startLen) return false;
          this.reset();
          return true;
        }

        reset() {
          if (this.parse) {
            this.takeTree();
            this.parse = null;
          }
        }

        skipUntilInView(from, to) {
          this.skipped.push({
            from,
            to
          });
        }

        static getSkippingParser(until) {
          return new class extends Parser {
            createParse(input, fragments, ranges) {
              var from = ranges[0].from,
                  to = ranges[ranges.length - 1].to;
              var parser = {
                parsedPos: from,

                advance() {
                  var cx = currentContext;

                  if (cx) {
                    var _iterator157 = _createForOfIteratorHelper(ranges),
                        _step157;

                    try {
                      for (_iterator157.s(); !(_step157 = _iterator157.n()).done;) {
                        var r = _step157.value;
                        cx.tempSkipped.push(r);
                      }
                    } catch (err) {
                      _iterator157.e(err);
                    } finally {
                      _iterator157.f();
                    }

                    if (until) cx.scheduleOn = cx.scheduleOn ? Promise.all([cx.scheduleOn, until]) : until;
                  }

                  this.parsedPos = to;
                  return new Tree(NodeType.none, [], [], to - from);
                },

                stoppedAt: null,

                stopAt() {}

              };
              return parser;
            }

          }();
        }

        isDone(upto) {
          upto = Math.min(upto, this.state.doc.length);
          var frags = this.fragments;
          return this.treeLen >= upto && frags.length && frags[0].from == 0 && frags[0].to >= upto;
        }

        static get() {
          return currentContext;
        }

      };
      LanguageState = class {
        constructor(context) {
          this.context = context;
          this.tree = context.tree;
        }

        apply(tr) {
          if (!tr.docChanged && this.tree == this.context.tree) return this;
          var newCx = this.context.changes(tr.changes, tr.state);
          var upto = this.context.treeLen == tr.startState.doc.length ? void 0 : Math.max(tr.changes.mapPos(this.context.treeLen), newCx.viewport.to);
          if (!newCx.work(20, upto)) newCx.takeTree();
          return new LanguageState(newCx);
        }

        static init(state) {
          var vpTo = Math.min(3e3, state.doc.length);
          var parseState = ParseContext.create(state.facet(language).parser, state, {
            from: 0,
            to: vpTo
          });
          if (!parseState.work(20, vpTo)) parseState.takeTree();
          return new LanguageState(parseState);
        }

      };
      Language.state = /* @__PURE__ */StateField.define({
        create: LanguageState.init,

        update(value, tr) {
          var _iterator158 = _createForOfIteratorHelper(tr.effects),
              _step158;

          try {
            for (_iterator158.s(); !(_step158 = _iterator158.n()).done;) {
              var e = _step158.value;
              if (e.is(Language.setState)) return e.value;
            }
          } catch (err) {
            _iterator158.e(err);
          } finally {
            _iterator158.f();
          }

          if (tr.startState.facet(language) != tr.state.facet(language)) return LanguageState.init(tr.state);
          return value.apply(tr);
        }

      });

      requestIdle = callback => {
        var timeout = setTimeout(() => callback(), 500);
        return () => clearTimeout(timeout);
      };

      if (typeof requestIdleCallback != "undefined") requestIdle = callback => {
        var idle = -1,
            timeout = setTimeout(() => {
          idle = requestIdleCallback(callback, {
            timeout: 500 - 100
          });
        }, 100);
        return () => idle < 0 ? clearTimeout(timeout) : cancelIdleCallback(idle);
      };
      isInputPending = typeof navigator != "undefined" && ((_a = navigator.scheduling) === null || _a === void 0 ? void 0 : _a.isInputPending) ? () => navigator.scheduling.isInputPending() : null;
      parseWorker = /* @__PURE__ */ViewPlugin.fromClass(class ParseWorker {
        constructor(view) {
          this.view = view;
          this.working = null;
          this.workScheduled = 0;
          this.chunkEnd = -1;
          this.chunkBudget = -1;
          this.work = this.work.bind(this);
          this.scheduleWork();
        }

        update(update) {
          var cx = this.view.state.field(Language.state).context;
          if (cx.updateViewport(update.view.viewport) || this.view.viewport.to > cx.treeLen) this.scheduleWork();

          if (update.docChanged) {
            if (this.view.hasFocus) this.chunkBudget += 50;
            this.scheduleWork();
          }

          this.checkAsyncSchedule(cx);
        }

        scheduleWork() {
          if (this.working) return;
          var state = this.view.state,
              field = state.field(Language.state);
          if (field.tree != field.context.tree || !field.context.isDone(state.doc.length)) this.working = requestIdle(this.work);
        }

        work(deadline) {
          this.working = null;
          var now = Date.now();

          if (this.chunkEnd < now && (this.chunkEnd < 0 || this.view.hasFocus)) {
            this.chunkEnd = now + 3e4;
            this.chunkBudget = 3e3;
          }

          if (this.chunkBudget <= 0) return;
          var _this$view = this.view,
              state = _this$view.state,
              vpTo = _this$view.viewport.to,
              field = state.field(Language.state);
          if (field.tree == field.context.tree && field.context.isDone(vpTo + 1e5)) return;
          var endTime = Date.now() + Math.min(this.chunkBudget, 100, deadline && !isInputPending ? Math.max(25, deadline.timeRemaining() - 5) : 1e9);
          var viewportFirst = field.context.treeLen < vpTo && state.doc.length > vpTo + 1e3;
          var done = field.context.work(() => {
            return isInputPending && isInputPending() || Date.now() > endTime;
          }, vpTo + (viewportFirst ? 0 : 1e5));
          this.chunkBudget -= Date.now() - now;

          if (done || this.chunkBudget <= 0) {
            field.context.takeTree();
            this.view.dispatch({
              effects: Language.setState.of(new LanguageState(field.context))
            });
          }

          if (this.chunkBudget > 0 && !(done && !viewportFirst)) this.scheduleWork();
          this.checkAsyncSchedule(field.context);
        }

        checkAsyncSchedule(cx) {
          if (cx.scheduleOn) {
            this.workScheduled++;
            cx.scheduleOn.then(() => this.scheduleWork()).catch(err => logException(this.view.state, err)).then(() => this.workScheduled--);
            cx.scheduleOn = null;
          }
        }

        destroy() {
          if (this.working) this.working();
        }

        isWorking() {
          return !!(this.working || this.workScheduled > 0);
        }

      }, {
        eventHandlers: {
          focus() {
            this.scheduleWork();
          }

        }
      });
      language = /* @__PURE__ */Facet.define({
        combine(languages) {
          return languages.length ? languages[0] : null;
        },

        enables: [Language.state, parseWorker]
      });
      indentService = /* @__PURE__ */Facet.define();
      indentUnit = /* @__PURE__ */Facet.define({
        combine: values => {
          if (!values.length) return "  ";
          if (!/^(?: +|\t+)$/.test(values[0])) throw new Error("Invalid indent unit: " + JSON.stringify(values[0]));
          return values[0];
        }
      });
      IndentContext = class {
        constructor(state) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          this.state = state;
          this.options = options;
          this.unit = getIndentUnit(state);
        }

        lineAt(pos) {
          var bias = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
          var line = this.state.doc.lineAt(pos);
          var _this$options = this.options,
              simulateBreak = _this$options.simulateBreak,
              simulateDoubleBreak = _this$options.simulateDoubleBreak;

          if (simulateBreak != null && simulateBreak >= line.from && simulateBreak <= line.to) {
            if (simulateDoubleBreak && simulateBreak == pos) return {
              text: "",
              from: pos
            };else if (bias < 0 ? simulateBreak < pos : simulateBreak <= pos) return {
              text: line.text.slice(simulateBreak - line.from),
              from: simulateBreak
            };else return {
              text: line.text.slice(0, simulateBreak - line.from),
              from: line.from
            };
          }

          return line;
        }

        textAfterPos(pos) {
          var bias = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
          if (this.options.simulateDoubleBreak && pos == this.options.simulateBreak) return "";

          var _this$lineAt = this.lineAt(pos, bias),
              text = _this$lineAt.text,
              from = _this$lineAt.from;

          return text.slice(pos - from, Math.min(text.length, pos + 100 - from));
        }

        column(pos) {
          var bias = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

          var _this$lineAt2 = this.lineAt(pos, bias),
              text = _this$lineAt2.text,
              from = _this$lineAt2.from;

          var result = this.countColumn(text, pos - from);
          var override = this.options.overrideIndentation ? this.options.overrideIndentation(from) : -1;
          if (override > -1) result += override - this.countColumn(text, text.search(/\S|$/));
          return result;
        }

        countColumn(line) {
          var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : line.length;
          return countColumn(line, this.state.tabSize, pos);
        }

        lineIndent(pos) {
          var bias = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

          var _this$lineAt3 = this.lineAt(pos, bias),
              text = _this$lineAt3.text,
              from = _this$lineAt3.from;

          var override = this.options.overrideIndentation;

          if (override) {
            var overriden = override(from);
            if (overriden > -1) return overriden;
          }

          return this.countColumn(text, text.search(/\S|$/));
        }

        get simulatedBreak() {
          return this.options.simulateBreak || null;
        }

      };
      indentNodeProp = /* @__PURE__ */new NodeProp();
      TreeIndentContext = class extends IndentContext {
        constructor(base2, pos, node) {
          super(base2.state, base2.options);
          this.base = base2;
          this.pos = pos;
          this.node = node;
        }

        static create(base2, pos, node) {
          return new TreeIndentContext(base2, pos, node);
        }

        get textAfter() {
          return this.textAfterPos(this.pos);
        }

        get baseIndent() {
          var line = this.state.doc.lineAt(this.node.from);

          for (;;) {
            var atBreak = this.node.resolve(line.from);

            while (atBreak.parent && atBreak.parent.from == atBreak.from) {
              atBreak = atBreak.parent;
            }

            if (isParent(atBreak, this.node)) break;
            line = this.state.doc.lineAt(atBreak.from);
          }

          return this.lineIndent(line.from);
        }

        continue() {
          var parent = this.node.parent;
          return parent ? indentFrom(parent, this.pos, this.base) : 0;
        }

      };
      DontIndentBeyond = 200;
      foldService = /* @__PURE__ */Facet.define();
      foldNodeProp = /* @__PURE__ */new NodeProp();
      foldEffect = /* @__PURE__ */StateEffect.define({
        map: mapRange
      });
      unfoldEffect = /* @__PURE__ */StateEffect.define({
        map: mapRange
      });
      foldState = /* @__PURE__ */StateField.define({
        create() {
          return Decoration.none;
        },

        update(folded, tr) {
          folded = folded.map(tr.changes);

          var _iterator159 = _createForOfIteratorHelper(tr.effects),
              _step159;

          try {
            var _loop15 = function _loop15() {
              var e = _step159.value;
              if (e.is(foldEffect) && !foldExists(folded, e.value.from, e.value.to)) folded = folded.update({
                add: [foldWidget.range(e.value.from, e.value.to)]
              });else if (e.is(unfoldEffect)) folded = folded.update({
                filter: (from, to) => e.value.from != from || e.value.to != to,
                filterFrom: e.value.from,
                filterTo: e.value.to
              });
            };

            for (_iterator159.s(); !(_step159 = _iterator159.n()).done;) {
              _loop15();
            }
          } catch (err) {
            _iterator159.e(err);
          } finally {
            _iterator159.f();
          }

          if (tr.selection) {
            var onSelection = false,
                head = tr.selection.main.head;
            folded.between(head, head, (a, b) => {
              if (a < head && b > head) onSelection = true;
            });
            if (onSelection) folded = folded.update({
              filterFrom: head,
              filterTo: head,
              filter: (a, b) => b <= head || a >= head
            });
          }

          return folded;
        },

        provide: f => EditorView.decorations.from(f)
      });

      foldCode = view => {
        var _iterator160 = _createForOfIteratorHelper(selectedLines(view)),
            _step160;

        try {
          for (_iterator160.s(); !(_step160 = _iterator160.n()).done;) {
            var line = _step160.value;
            var range = foldable(view.state, line.from, line.to);

            if (range) {
              view.dispatch({
                effects: maybeEnable(view.state, [foldEffect.of(range), announceFold(view, range)])
              });
              return true;
            }
          }
        } catch (err) {
          _iterator160.e(err);
        } finally {
          _iterator160.f();
        }

        return false;
      };

      unfoldCode = view => {
        if (!view.state.field(foldState, false)) return false;
        var effects = [];

        var _iterator161 = _createForOfIteratorHelper(selectedLines(view)),
            _step161;

        try {
          for (_iterator161.s(); !(_step161 = _iterator161.n()).done;) {
            var line = _step161.value;
            var folded = findFold(view.state, line.from, line.to);
            if (folded) effects.push(unfoldEffect.of(folded), announceFold(view, folded, false));
          }
        } catch (err) {
          _iterator161.e(err);
        } finally {
          _iterator161.f();
        }

        if (effects.length) view.dispatch({
          effects
        });
        return effects.length > 0;
      };

      foldAll = view => {
        var state = view.state,
            effects = [];

        for (var pos = 0; pos < state.doc.length;) {
          var line = view.lineBlockAt(pos),
              range = foldable(state, line.from, line.to);
          if (range) effects.push(foldEffect.of(range));
          pos = (range ? view.lineBlockAt(range.to) : line).to + 1;
        }

        if (effects.length) view.dispatch({
          effects: maybeEnable(view.state, effects)
        });
        return !!effects.length;
      };

      unfoldAll = view => {
        var field = view.state.field(foldState, false);
        if (!field || !field.size) return false;
        var effects = [];
        field.between(0, view.state.doc.length, (from, to) => {
          effects.push(unfoldEffect.of({
            from,
            to
          }));
        });
        view.dispatch({
          effects
        });
        return true;
      };

      foldKeymap = [{
        key: "Ctrl-Shift-[",
        mac: "Cmd-Alt-[",
        run: foldCode
      }, {
        key: "Ctrl-Shift-]",
        mac: "Cmd-Alt-]",
        run: unfoldCode
      }, {
        key: "Ctrl-Alt-[",
        run: foldAll
      }, {
        key: "Ctrl-Alt-]",
        run: unfoldAll
      }];
      defaultConfig = {
        placeholderDOM: null,
        placeholderText: "\u2026"
      };
      foldConfig = /* @__PURE__ */Facet.define({
        combine(values) {
          return combineConfig(values, defaultConfig);
        }

      });
      foldWidget = /* @__PURE__ */Decoration.replace({
        widget: /* @__PURE__ */new class extends WidgetType {
          toDOM(view) {
            var state = view.state,
                conf = state.facet(foldConfig);

            var onclick = event => {
              var line = view.lineBlockAt(view.posAtDOM(event.target));
              var folded = findFold(view.state, line.from, line.to);
              if (folded) view.dispatch({
                effects: unfoldEffect.of(folded)
              });
              event.preventDefault();
            };

            if (conf.placeholderDOM) return conf.placeholderDOM(view, onclick);
            var element = document.createElement("span");
            element.textContent = conf.placeholderText;
            element.setAttribute("aria-label", state.phrase("folded code"));
            element.title = state.phrase("unfold");
            element.className = "cm-foldPlaceholder";
            element.onclick = onclick;
            return element;
          }

        }()
      });
      foldGutterDefaults = {
        openText: "\u2304",
        closedText: "\u203A",
        markerDOM: null,
        domEventHandlers: {},
        foldingChanged: () => false
      };
      FoldMarker = class extends GutterMarker {
        constructor(config2, open) {
          super();
          this.config = config2;
          this.open = open;
        }

        eq(other) {
          return this.config == other.config && this.open == other.open;
        }

        toDOM(view) {
          if (this.config.markerDOM) return this.config.markerDOM(this.open);
          var span = document.createElement("span");
          span.textContent = this.open ? this.config.openText : this.config.closedText;
          span.title = view.state.phrase(this.open ? "Fold line" : "Unfold line");
          return span;
        }

      };
      baseTheme$12 = /* @__PURE__ */EditorView.baseTheme({
        ".cm-foldPlaceholder": {
          backgroundColor: "#eee",
          border: "1px solid #ddd",
          color: "#888",
          borderRadius: ".2em",
          margin: "0 1px",
          padding: "0 1px",
          cursor: "pointer"
        },
        ".cm-foldGutter span": {
          padding: "0 1px",
          cursor: "pointer"
        }
      });
      HighlightStyle = class {
        constructor(spec, options) {
          var modSpec;

          function def(spec2) {
            var cls = StyleModule.newName();
            (modSpec || (modSpec = /* @__PURE__ */Object.create(null)))["." + cls] = spec2;
            return cls;
          }

          var all = typeof options.all == "string" ? options.all : options.all ? def(options.all) : void 0;
          var scopeOpt = options.scope;
          this.scope = scopeOpt instanceof Language ? type => type.prop(languageDataProp) == scopeOpt.data : scopeOpt ? type => type == scopeOpt : void 0;
          this.style = tagHighlighter(spec.map(style => ({
            tag: style.tag,
            class: style.class || def(Object.assign({}, style, {
              tag: null
            }))
          })), {
            all
          }).style;
          this.module = modSpec ? new StyleModule(modSpec) : null;
          this.themeType = options.themeType;
        }

        static define(specs, options) {
          return new HighlightStyle(specs, options || {});
        }

      };
      highlighterFacet = /* @__PURE__ */Facet.define();
      fallbackHighlighter = /* @__PURE__ */Facet.define({
        combine(values) {
          return values.length ? [values[0]] : null;
        }

      });
      TreeHighlighter = class {
        constructor(view) {
          this.markCache = /* @__PURE__ */Object.create(null);
          this.tree = syntaxTree(view.state);
          this.decorations = this.buildDeco(view, getHighlighters(view.state));
        }

        update(update) {
          var tree = syntaxTree(update.state),
              highlighters = getHighlighters(update.state);
          var styleChange = highlighters != getHighlighters(update.startState);

          if (tree.length < update.view.viewport.to && !styleChange && tree.type == this.tree.type) {
            this.decorations = this.decorations.map(update.changes);
          } else if (tree != this.tree || update.viewportChanged || styleChange) {
            this.tree = tree;
            this.decorations = this.buildDeco(update.view, highlighters);
          }
        }

        buildDeco(view, highlighters) {
          if (!highlighters || !this.tree.length) return Decoration.none;
          var builder = new RangeSetBuilder();

          var _iterator162 = _createForOfIteratorHelper(view.visibleRanges),
              _step162;

          try {
            for (_iterator162.s(); !(_step162 = _iterator162.n()).done;) {
              var _step162$value = _step162.value,
                  from = _step162$value.from,
                  to = _step162$value.to;
              highlightTree(this.tree, highlighters, (from2, to2, style) => {
                builder.add(from2, to2, this.markCache[style] || (this.markCache[style] = Decoration.mark({
                  class: style
                })));
              }, from, to);
            }
          } catch (err) {
            _iterator162.e(err);
          } finally {
            _iterator162.f();
          }

          return builder.finish();
        }

      };
      treeHighlighter = /* @__PURE__ */Prec.high( /* @__PURE__ */ViewPlugin.fromClass(TreeHighlighter, {
        decorations: v => v.decorations
      }));
      defaultHighlightStyle = /* @__PURE__ */HighlightStyle.define([{
        tag: tags.meta,
        color: "#7a757a"
      }, {
        tag: tags.link,
        textDecoration: "underline"
      }, {
        tag: tags.heading,
        textDecoration: "underline",
        fontWeight: "bold"
      }, {
        tag: tags.emphasis,
        fontStyle: "italic"
      }, {
        tag: tags.strong,
        fontWeight: "bold"
      }, {
        tag: tags.strikethrough,
        textDecoration: "line-through"
      }, {
        tag: tags.keyword,
        color: "#708"
      }, {
        tag: [tags.atom, tags.bool, tags.url, tags.contentSeparator, tags.labelName],
        color: "#219"
      }, {
        tag: [tags.literal, tags.inserted],
        color: "#164"
      }, {
        tag: [tags.string, tags.deleted],
        color: "#a11"
      }, {
        tag: [tags.regexp, tags.escape, /* @__PURE__ */tags.special(tags.string)],
        color: "#e40"
      }, {
        tag: /* @__PURE__ */tags.definition(tags.variableName),
        color: "#00f"
      }, {
        tag: /* @__PURE__ */tags.local(tags.variableName),
        color: "#30a"
      }, {
        tag: [tags.typeName, tags.namespace],
        color: "#085"
      }, {
        tag: tags.className,
        color: "#167"
      }, {
        tag: [/* @__PURE__ */tags.special(tags.variableName), tags.macroName],
        color: "#256"
      }, {
        tag: /* @__PURE__ */tags.definition(tags.propertyName),
        color: "#00c"
      }, {
        tag: tags.comment,
        color: "#940"
      }, {
        tag: tags.invalid,
        color: "#f00"
      }]);
      baseTheme2 = /* @__PURE__ */EditorView.baseTheme({
        "&.cm-focused .cm-matchingBracket": {
          backgroundColor: "#328c8252"
        },
        "&.cm-focused .cm-nonmatchingBracket": {
          backgroundColor: "#bb555544"
        }
      });
      DefaultScanDist = 1e4;
      DefaultBrackets = "()[]{}";
      bracketMatchingConfig = /* @__PURE__ */Facet.define({
        combine(configs) {
          return combineConfig(configs, {
            afterCursor: true,
            brackets: DefaultBrackets,
            maxScanDistance: DefaultScanDist,
            renderMatch: defaultRenderMatch
          });
        }

      });
      matchingMark = /* @__PURE__ */Decoration.mark({
        class: "cm-matchingBracket"
      });
      nonmatchingMark = /* @__PURE__ */Decoration.mark({
        class: "cm-nonmatchingBracket"
      });
      bracketMatchingState = /* @__PURE__ */StateField.define({
        create() {
          return Decoration.none;
        },

        update(deco, tr) {
          if (!tr.docChanged && !tr.selection) return deco;
          var decorations2 = [];
          var config2 = tr.state.facet(bracketMatchingConfig);

          var _iterator163 = _createForOfIteratorHelper(tr.state.selection.ranges),
              _step163;

          try {
            for (_iterator163.s(); !(_step163 = _iterator163.n()).done;) {
              var range = _step163.value;
              if (!range.empty) continue;
              var match = matchBrackets(tr.state, range.head, -1, config2) || range.head > 0 && matchBrackets(tr.state, range.head - 1, 1, config2) || config2.afterCursor && (matchBrackets(tr.state, range.head, 1, config2) || range.head < tr.state.doc.length && matchBrackets(tr.state, range.head + 1, -1, config2));
              if (match) decorations2 = decorations2.concat(config2.renderMatch(match, tr.state));
            }
          } catch (err) {
            _iterator163.e(err);
          } finally {
            _iterator163.f();
          }

          return Decoration.set(decorations2, true);
        },

        provide: f => EditorView.decorations.from(f)
      });
      bracketMatchingUnique = [bracketMatchingState, baseTheme2];
      noTokens = /* @__PURE__ */Object.create(null);
      typeArray = [NodeType.none];
      warned = [];
      defaultTable = /* @__PURE__ */Object.create(null);

      for (var _i126 = 0, _arr3 = [["variable", "variableName"], ["variable-2", "variableName.special"], ["string-2", "string.special"], ["def", "variableName.definition"], ["tag", "typeName"], ["attribute", "propertyName"], ["type", "typeName"], ["builtin", "variableName.standard"], ["qualifier", "modifier"], ["error", "invalid"], ["header", "heading"], ["property", "propertyName"]]; _i126 < _arr3.length; _i126++) {
        var _arr3$_i = _slicedToArray(_arr3[_i126], 2),
            legacyName = _arr3$_i[0],
            name2 = _arr3$_i[1];

        defaultTable[legacyName] = /* @__PURE__ */createTokenType(noTokens, name2);
      }
    }

  }); // node_modules/@codemirror/commands/dist/index.js


  function command(f, option) {
    return _ref19 => {
      var state = _ref19.state,
          dispatch = _ref19.dispatch;
      if (state.readOnly) return false;
      var tr = f(option, state);
      if (!tr) return false;
      dispatch(state.update(tr));
      return true;
    };
  }

  function getConfig(state) {
    var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : state.selection.main.head;
    var data = state.languageDataAt("commentTokens", pos);
    return data.length ? data[0] : {};
  }

  function findBlockComment(state, _ref20, from, to) {
    var open = _ref20.open,
        close = _ref20.close;
    var textBefore = state.sliceDoc(from - SearchMargin, from);
    var textAfter = state.sliceDoc(to, to + SearchMargin);
    var spaceBefore = /\s*$/.exec(textBefore)[0].length,
        spaceAfter = /^\s*/.exec(textAfter)[0].length;
    var beforeOff = textBefore.length - spaceBefore;

    if (textBefore.slice(beforeOff - open.length, beforeOff) == open && textAfter.slice(spaceAfter, spaceAfter + close.length) == close) {
      return {
        open: {
          pos: from - spaceBefore,
          margin: spaceBefore && 1
        },
        close: {
          pos: to + spaceAfter,
          margin: spaceAfter && 1
        }
      };
    }

    var startText, endText;

    if (to - from <= 2 * SearchMargin) {
      startText = endText = state.sliceDoc(from, to);
    } else {
      startText = state.sliceDoc(from, from + SearchMargin);
      endText = state.sliceDoc(to - SearchMargin, to);
    }

    var startSpace = /^\s*/.exec(startText)[0].length,
        endSpace = /\s*$/.exec(endText)[0].length;
    var endOff = endText.length - endSpace - close.length;

    if (startText.slice(startSpace, startSpace + open.length) == open && endText.slice(endOff, endOff + close.length) == close) {
      return {
        open: {
          pos: from + startSpace + open.length,
          margin: /\s/.test(startText.charAt(startSpace + open.length)) ? 1 : 0
        },
        close: {
          pos: to - endSpace - close.length,
          margin: /\s/.test(endText.charAt(endOff - 1)) ? 1 : 0
        }
      };
    }

    return null;
  }

  function selectedLineRanges(state) {
    var ranges = [];

    var _iterator164 = _createForOfIteratorHelper(state.selection.ranges),
        _step164;

    try {
      for (_iterator164.s(); !(_step164 = _iterator164.n()).done;) {
        var r = _step164.value;
        var fromLine = state.doc.lineAt(r.from);
        var toLine = r.to <= fromLine.to ? fromLine : state.doc.lineAt(r.to);
        var last = ranges.length - 1;
        if (last >= 0 && ranges[last].to > fromLine.from) ranges[last].to = toLine.to;else ranges.push({
          from: fromLine.from,
          to: toLine.to
        });
      }
    } catch (err) {
      _iterator164.e(err);
    } finally {
      _iterator164.f();
    }

    return ranges;
  }

  function changeBlockComment(option, state) {
    var ranges = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : state.selection.ranges;
    var tokens = ranges.map(r => getConfig(state, r.from).block);
    if (!tokens.every(c => c)) return null;
    var comments = ranges.map((r, i) => findBlockComment(state, tokens[i], r.from, r.to));

    if (option != 2 && !comments.every(c => c)) {
      return {
        changes: state.changes(ranges.map((range, i) => {
          if (comments[i]) return [];
          return [{
            from: range.from,
            insert: tokens[i].open + " "
          }, {
            from: range.to,
            insert: " " + tokens[i].close
          }];
        }))
      };
    } else if (option != 1 && comments.some(c => c)) {
      var changes = [];

      for (var _i127 = 0, comment2; _i127 < comments.length; _i127++) {
        if (comment2 = comments[_i127]) {
          var token = tokens[_i127],
              _comment = comment2,
              open = _comment.open,
              close = _comment.close;
          changes.push({
            from: open.pos - token.open.length,
            to: open.pos + open.margin
          }, {
            from: close.pos - close.margin,
            to: close.pos + token.close.length
          });
        }
      }

      return {
        changes
      };
    }

    return null;
  }

  function changeLineComment(option, state) {
    var ranges = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : state.selection.ranges;
    var lines = [];
    var prevLine = -1;

    var _iterator165 = _createForOfIteratorHelper(ranges),
        _step165;

    try {
      for (_iterator165.s(); !(_step165 = _iterator165.n()).done;) {
        var _step165$value = _step165.value,
            _from2 = _step165$value.from,
            _to2 = _step165$value.to;
        var startI = lines.length,
            minIndent = 1e9;

        for (var pos = _from2; pos <= _to2;) {
          var _line3 = state.doc.lineAt(pos);

          if (_line3.from > prevLine && (_from2 == _to2 || _to2 > _line3.from)) {
            prevLine = _line3.from;
            var _token2 = getConfig(state, pos).line;
            if (!_token2) continue;
            var _indent = /^\s*/.exec(_line3.text)[0].length;

            var _empty = _indent == _line3.length;

            var _comment2 = _line3.text.slice(_indent, _indent + _token2.length) == _token2 ? _indent : -1;

            if (_indent < _line3.text.length && _indent < minIndent) minIndent = _indent;
            lines.push({
              line: _line3,
              comment: _comment2,
              token: _token2,
              indent: _indent,
              empty: _empty,
              single: false
            });
          }

          pos = _line3.to + 1;
        }

        if (minIndent < 1e9) {
          for (var _i128 = startI; _i128 < lines.length; _i128++) {
            if (lines[_i128].indent < lines[_i128].line.text.length) lines[_i128].indent = minIndent;
          }
        }

        if (lines.length == startI + 1) lines[startI].single = true;
      }
    } catch (err) {
      _iterator165.e(err);
    } finally {
      _iterator165.f();
    }

    if (option != 2 && lines.some(l => l.comment < 0 && (!l.empty || l.single))) {
      var changes = [];

      var _iterator166 = _createForOfIteratorHelper(lines),
          _step166;

      try {
        for (_iterator166.s(); !(_step166 = _iterator166.n()).done;) {
          var _step166$value = _step166.value,
              line = _step166$value.line,
              token = _step166$value.token,
              indent = _step166$value.indent,
              empty2 = _step166$value.empty,
              single = _step166$value.single;
          if (single || !empty2) changes.push({
            from: line.from + indent,
            insert: token + " "
          });
        }
      } catch (err) {
        _iterator166.e(err);
      } finally {
        _iterator166.f();
      }

      var changeSet = state.changes(changes);
      return {
        changes: changeSet,
        selection: state.selection.map(changeSet, 1)
      };
    } else if (option != 1 && lines.some(l => l.comment >= 0)) {
      var _changes = [];

      var _iterator167 = _createForOfIteratorHelper(lines),
          _step167;

      try {
        for (_iterator167.s(); !(_step167 = _iterator167.n()).done;) {
          var _step167$value = _step167.value,
              _line2 = _step167$value.line,
              comment2 = _step167$value.comment,
              _token = _step167$value.token;

          if (comment2 >= 0) {
            var from = _line2.from + comment2,
                to = from + _token.length;
            if (_line2.text[to - _line2.from] == " ") to++;

            _changes.push({
              from,
              to
            });
          }
        }
      } catch (err) {
        _iterator167.e(err);
      } finally {
        _iterator167.f();
      }

      return {
        changes: _changes
      };
    }

    return null;
  }

  function changeEnd(changes) {
    var end = 0;
    changes.iterChangedRanges((_, to) => end = to);
    return end;
  }

  function history() {
    var config2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return [historyField_, historyConfig.of(config2), EditorView.domEventHandlers({
      beforeinput(e, view) {
        var command2 = e.inputType == "historyUndo" ? undo : e.inputType == "historyRedo" ? redo : null;
        if (!command2) return false;
        e.preventDefault();
        return command2(view);
      }

    })];
  }

  function cmd(side, selection) {
    return function (_ref21) {
      var state = _ref21.state,
          dispatch = _ref21.dispatch;
      if (!selection && state.readOnly) return false;
      var historyState = state.field(historyField_, false);
      if (!historyState) return false;
      var tr = historyState.pop(side, state, selection);
      if (!tr) return false;
      dispatch(tr);
      return true;
    };
  }

  function updateBranch(branch, to, maxLen, newEvent) {
    var start = to + 1 > maxLen + 20 ? to - maxLen - 1 : 0;
    var newBranch = branch.slice(start, to);
    newBranch.push(newEvent);
    return newBranch;
  }

  function isAdjacent(a, b) {
    var ranges = [],
        isAdjacent2 = false;
    a.iterChangedRanges((f, t2) => ranges.push(f, t2));
    b.iterChangedRanges((_f, _t, f, t2) => {
      for (var _i129 = 0; _i129 < ranges.length;) {
        var from = ranges[_i129++],
            to = ranges[_i129++];
        if (t2 >= from && f <= to) isAdjacent2 = true;
      }
    });
    return isAdjacent2;
  }

  function eqSelectionShape(a, b) {
    return a.ranges.length == b.ranges.length && a.ranges.filter((r, i) => r.empty != b.ranges[i].empty).length === 0;
  }

  function conc(a, b) {
    return !a.length ? b : !b.length ? a : a.concat(b);
  }

  function addSelection(branch, selection) {
    if (!branch.length) {
      return [HistEvent.selection([selection])];
    } else {
      var lastEvent = branch[branch.length - 1];
      var sels = lastEvent.selectionsAfter.slice(Math.max(0, lastEvent.selectionsAfter.length - MaxSelectionsPerEvent));
      if (sels.length && sels[sels.length - 1].eq(selection)) return branch;
      sels.push(selection);
      return updateBranch(branch, branch.length - 1, 1e9, lastEvent.setSelAfter(sels));
    }
  }

  function popSelection(branch) {
    var last = branch[branch.length - 1];
    var newBranch = branch.slice();
    newBranch[branch.length - 1] = last.setSelAfter(last.selectionsAfter.slice(0, last.selectionsAfter.length - 1));
    return newBranch;
  }

  function addMappingToBranch(branch, mapping) {
    if (!branch.length) return branch;
    var length = branch.length,
        selections = none2;

    while (length) {
      var event = mapEvent(branch[length - 1], mapping, selections);

      if (event.changes && !event.changes.empty || event.effects.length) {
        var result = branch.slice(0, length);
        result[length - 1] = event;
        return result;
      } else {
        mapping = event.mapped;
        length--;
        selections = event.selectionsAfter;
      }
    }

    return selections.length ? [HistEvent.selection(selections)] : none2;
  }

  function mapEvent(event, mapping, extraSelections) {
    var selections = conc(event.selectionsAfter.length ? event.selectionsAfter.map(s => s.map(mapping)) : none2, extraSelections);
    if (!event.changes) return HistEvent.selection(selections);
    var mappedChanges = event.changes.map(mapping),
        before = mapping.mapDesc(event.changes, true);
    var fullMapping = event.mapped ? event.mapped.composeDesc(before) : before;
    return new HistEvent(mappedChanges, StateEffect.mapEffects(event.effects, mapping), fullMapping, event.startSelection.map(before), selections);
  }

  function updateSel(sel, by) {
    return EditorSelection.create(sel.ranges.map(by), sel.mainIndex);
  }

  function setSel(state, selection) {
    return state.update({
      selection,
      scrollIntoView: true,
      userEvent: "select"
    });
  }

  function moveSel(_ref22, how) {
    var state = _ref22.state,
        dispatch = _ref22.dispatch;
    var selection = updateSel(state.selection, how);
    if (selection.eq(state.selection)) return false;
    dispatch(setSel(state, selection));
    return true;
  }

  function rangeEnd(range, forward) {
    return EditorSelection.cursor(forward ? range.to : range.from);
  }

  function cursorByChar(view, forward) {
    return moveSel(view, range => range.empty ? view.moveByChar(range, forward) : rangeEnd(range, forward));
  }

  function ltrAtCursor(view) {
    return view.textDirectionAt(view.state.selection.main.head) == Direction.LTR;
  }

  function cursorByGroup(view, forward) {
    return moveSel(view, range => range.empty ? view.moveByGroup(range, forward) : rangeEnd(range, forward));
  }

  function interestingNode(state, node, bracketProp) {
    if (node.type.prop(bracketProp)) return true;
    var len = node.to - node.from;
    return len && (len > 2 || /[^\s,.;:]/.test(state.sliceDoc(node.from, node.to))) || node.firstChild;
  }

  function moveBySyntax(state, start, forward) {
    var pos = syntaxTree(state).resolveInner(start.head);
    var bracketProp = forward ? NodeProp.closedBy : NodeProp.openedBy;

    for (var at = start.head;;) {
      var next = forward ? pos.childAfter(at) : pos.childBefore(at);
      if (!next) break;
      if (interestingNode(state, next, bracketProp)) pos = next;else at = forward ? next.to : next.from;
    }

    var bracket2 = pos.type.prop(bracketProp),
        match,
        newPos;
    if (bracket2 && (match = forward ? matchBrackets(state, pos.from, 1) : matchBrackets(state, pos.to, -1)) && match.matched) newPos = forward ? match.end.to : match.end.from;else newPos = forward ? pos.to : pos.from;
    return EditorSelection.cursor(newPos, forward ? -1 : 1);
  }

  function cursorByLine(view, forward) {
    return moveSel(view, range => {
      if (!range.empty) return rangeEnd(range, forward);
      var moved = view.moveVertically(range, forward);
      return moved.head != range.head ? moved : view.moveToLineBoundary(range, forward);
    });
  }

  function pageHeight(view) {
    return Math.max(view.defaultLineHeight, Math.min(view.dom.clientHeight, innerHeight) - 5);
  }

  function cursorByPage(view, forward) {
    var state = view.state,
        selection = updateSel(state.selection, range => {
      return range.empty ? view.moveVertically(range, forward, pageHeight(view)) : rangeEnd(range, forward);
    });
    if (selection.eq(state.selection)) return false;
    var startPos = view.coordsAtPos(state.selection.main.head);
    var scrollRect = view.scrollDOM.getBoundingClientRect();
    var effect;
    if (startPos && startPos.top > scrollRect.top && startPos.bottom < scrollRect.bottom && startPos.top - scrollRect.top <= view.scrollDOM.scrollHeight - view.scrollDOM.scrollTop - view.scrollDOM.clientHeight) effect = EditorView.scrollIntoView(selection.main.head, {
      y: "start",
      yMargin: startPos.top - scrollRect.top
    });
    view.dispatch(setSel(state, selection), {
      effects: effect
    });
    return true;
  }

  function moveByLineBoundary(view, start, forward) {
    var line = view.lineBlockAt(start.head),
        moved = view.moveToLineBoundary(start, forward);
    if (moved.head == start.head && moved.head != (forward ? line.to : line.from)) moved = view.moveToLineBoundary(start, forward, false);

    if (!forward && moved.head == line.from && line.length) {
      var space = /^\s*/.exec(view.state.sliceDoc(line.from, Math.min(line.from + 100, line.to)))[0].length;
      if (space && start.head != line.from + space) moved = EditorSelection.cursor(line.from + space);
    }

    return moved;
  }

  function toMatchingBracket(state, dispatch, extend2) {
    var found = false,
        selection = updateSel(state.selection, range => {
      var matching = matchBrackets(state, range.head, -1) || matchBrackets(state, range.head, 1) || range.head > 0 && matchBrackets(state, range.head - 1, 1) || range.head < state.doc.length && matchBrackets(state, range.head + 1, -1);
      if (!matching || !matching.end) return range;
      found = true;
      var head = matching.start.from == range.head ? matching.end.to : matching.end.from;
      return extend2 ? EditorSelection.range(range.anchor, head) : EditorSelection.cursor(head);
    });
    if (!found) return false;
    dispatch(setSel(state, selection));
    return true;
  }

  function extendSel(view, how) {
    var selection = updateSel(view.state.selection, range => {
      var head = how(range);
      return EditorSelection.range(range.anchor, head.head, head.goalColumn);
    });
    if (selection.eq(view.state.selection)) return false;
    view.dispatch(setSel(view.state, selection));
    return true;
  }

  function selectByChar(view, forward) {
    return extendSel(view, range => view.moveByChar(range, forward));
  }

  function selectByGroup(view, forward) {
    return extendSel(view, range => view.moveByGroup(range, forward));
  }

  function selectByLine(view, forward) {
    return extendSel(view, range => view.moveVertically(range, forward));
  }

  function selectByPage(view, forward) {
    return extendSel(view, range => view.moveVertically(range, forward, pageHeight(view)));
  }

  function deleteBy(_ref23, by) {
    var state = _ref23.state,
        dispatch = _ref23.dispatch;
    if (state.readOnly) return false;
    var event = "delete.selection";
    var changes = state.changeByRange(range => {
      var from = range.from,
          to = range.to;

      if (from == to) {
        var towards = by(from);
        if (towards < from) event = "delete.backward";else if (towards > from) event = "delete.forward";
        from = Math.min(from, towards);
        to = Math.max(to, towards);
      }

      return from == to ? {
        range
      } : {
        changes: {
          from,
          to
        },
        range: EditorSelection.cursor(from)
      };
    });
    if (changes.changes.empty) return false;
    dispatch(state.update(changes, {
      scrollIntoView: true,
      userEvent: event
    }));
    return true;
  }

  function skipAtomic(target, pos, forward) {
    if (target instanceof EditorView) {
      var _iterator168 = _createForOfIteratorHelper(target.state.facet(EditorView.atomicRanges).map(f => f(target))),
          _step168;

      try {
        for (_iterator168.s(); !(_step168 = _iterator168.n()).done;) {
          var ranges = _step168.value;
          ranges.between(pos, pos, (from, to) => {
            if (from < pos && to > pos) pos = forward ? to : from;
          });
        }
      } catch (err) {
        _iterator168.e(err);
      } finally {
        _iterator168.f();
      }
    }

    return pos;
  }

  function selectedLineBlocks(state) {
    var blocks = [],
        upto = -1;

    var _iterator169 = _createForOfIteratorHelper(state.selection.ranges),
        _step169;

    try {
      for (_iterator169.s(); !(_step169 = _iterator169.n()).done;) {
        var range = _step169.value;
        var startLine = state.doc.lineAt(range.from),
            endLine = state.doc.lineAt(range.to);
        if (!range.empty && range.to == endLine.from) endLine = state.doc.lineAt(range.to - 1);

        if (upto >= startLine.number) {
          var prev = blocks[blocks.length - 1];
          prev.to = endLine.to;
          prev.ranges.push(range);
        } else {
          blocks.push({
            from: startLine.from,
            to: endLine.to,
            ranges: [range]
          });
        }

        upto = endLine.number + 1;
      }
    } catch (err) {
      _iterator169.e(err);
    } finally {
      _iterator169.f();
    }

    return blocks;
  }

  function moveLine(state, dispatch, forward) {
    if (state.readOnly) return false;
    var changes = [],
        ranges = [];

    var _iterator170 = _createForOfIteratorHelper(selectedLineBlocks(state)),
        _step170;

    try {
      for (_iterator170.s(); !(_step170 = _iterator170.n()).done;) {
        var block = _step170.value;
        if (forward ? block.to == state.doc.length : block.from == 0) continue;
        var nextLine = state.doc.lineAt(forward ? block.to + 1 : block.from - 1);
        var size = nextLine.length + 1;

        if (forward) {
          changes.push({
            from: block.to,
            to: nextLine.to
          }, {
            from: block.from,
            insert: nextLine.text + state.lineBreak
          });

          var _iterator171 = _createForOfIteratorHelper(block.ranges),
              _step171;

          try {
            for (_iterator171.s(); !(_step171 = _iterator171.n()).done;) {
              var r = _step171.value;
              ranges.push(EditorSelection.range(Math.min(state.doc.length, r.anchor + size), Math.min(state.doc.length, r.head + size)));
            }
          } catch (err) {
            _iterator171.e(err);
          } finally {
            _iterator171.f();
          }
        } else {
          changes.push({
            from: nextLine.from,
            to: block.from
          }, {
            from: block.to,
            insert: state.lineBreak + nextLine.text
          });

          var _iterator172 = _createForOfIteratorHelper(block.ranges),
              _step172;

          try {
            for (_iterator172.s(); !(_step172 = _iterator172.n()).done;) {
              var _r5 = _step172.value;
              ranges.push(EditorSelection.range(_r5.anchor - size, _r5.head - size));
            }
          } catch (err) {
            _iterator172.e(err);
          } finally {
            _iterator172.f();
          }
        }
      }
    } catch (err) {
      _iterator170.e(err);
    } finally {
      _iterator170.f();
    }

    if (!changes.length) return false;
    dispatch(state.update({
      changes,
      scrollIntoView: true,
      selection: EditorSelection.create(ranges, state.selection.mainIndex),
      userEvent: "move.line"
    }));
    return true;
  }

  function copyLine(state, dispatch, forward) {
    if (state.readOnly) return false;
    var changes = [];

    var _iterator173 = _createForOfIteratorHelper(selectedLineBlocks(state)),
        _step173;

    try {
      for (_iterator173.s(); !(_step173 = _iterator173.n()).done;) {
        var block = _step173.value;
        if (forward) changes.push({
          from: block.from,
          insert: state.doc.slice(block.from, block.to) + state.lineBreak
        });else changes.push({
          from: block.to,
          insert: state.lineBreak + state.doc.slice(block.from, block.to)
        });
      }
    } catch (err) {
      _iterator173.e(err);
    } finally {
      _iterator173.f();
    }

    dispatch(state.update({
      changes,
      scrollIntoView: true,
      userEvent: "input.copyline"
    }));
    return true;
  }

  function isBetweenBrackets(state, pos) {
    if (/\(\)|\[\]|\{\}/.test(state.sliceDoc(pos - 1, pos + 1))) return {
      from: pos,
      to: pos
    };
    var context = syntaxTree(state).resolveInner(pos);
    var before = context.childBefore(pos),
        after = context.childAfter(pos),
        closedBy;
    if (before && after && before.to <= pos && after.from >= pos && (closedBy = before.type.prop(NodeProp.closedBy)) && closedBy.indexOf(after.name) > -1 && state.doc.lineAt(before.to).from == state.doc.lineAt(after.from).from) return {
      from: before.to,
      to: after.from
    };
    return null;
  }

  function newlineAndIndent(atEof) {
    return _ref24 => {
      var state = _ref24.state,
          dispatch = _ref24.dispatch;
      if (state.readOnly) return false;
      var changes = state.changeByRange(range => {
        var from = range.from,
            to = range.to,
            line = state.doc.lineAt(from);
        var explode = !atEof && from == to && isBetweenBrackets(state, from);
        if (atEof) from = to = (to <= line.to ? line : state.doc.lineAt(to)).to;
        var cx = new IndentContext(state, {
          simulateBreak: from,
          simulateDoubleBreak: !!explode
        });
        var indent = getIndentation(cx, from);
        if (indent == null) indent = /^\s*/.exec(state.doc.lineAt(from).text)[0].length;

        while (to < line.to && /\s/.test(line.text[to - line.from])) {
          to++;
        }

        if (explode) {
          from = explode.from;
          to = explode.to;
        } else if (from > line.from && from < line.from + 100 && !/\S/.test(line.text.slice(0, from))) from = line.from;

        var insert2 = ["", indentString(state, indent)];
        if (explode) insert2.push(indentString(state, cx.lineIndent(line.from, -1)));
        return {
          changes: {
            from,
            to,
            insert: Text.of(insert2)
          },
          range: EditorSelection.cursor(from + 1 + insert2[1].length)
        };
      });
      dispatch(state.update(changes, {
        scrollIntoView: true,
        userEvent: "input"
      }));
      return true;
    };
  }

  function changeBySelectedLine(state, f) {
    var atLine = -1;
    return state.changeByRange(range => {
      var changes = [];

      for (var pos = range.from; pos <= range.to;) {
        var line = state.doc.lineAt(pos);

        if (line.number > atLine && (range.empty || range.to > line.from)) {
          f(line, changes, range);
          atLine = line.number;
        }

        pos = line.to + 1;
      }

      var changeSet = state.changes(changes);
      return {
        changes,
        range: EditorSelection.range(changeSet.mapPos(range.anchor, 1), changeSet.mapPos(range.head, 1))
      };
    });
  }

  var toggleComment, toggleLineComment, toggleBlockComment, toggleBlockCommentByLine, SearchMargin, fromHistory, isolateHistory, invertedEffects, historyConfig, historyField_, undo, redo, undoSelection, redoSelection, HistEvent, none2, MaxSelectionsPerEvent, joinableUserEvent, HistoryState, historyKeymap, cursorCharLeft, cursorCharRight, cursorGroupLeft, cursorGroupRight, cursorSyntaxLeft, cursorSyntaxRight, cursorLineUp, cursorLineDown, cursorPageUp, cursorPageDown, cursorLineBoundaryForward, cursorLineBoundaryBackward, cursorLineStart, cursorLineEnd, cursorMatchingBracket, selectCharLeft, selectCharRight, selectGroupLeft, selectGroupRight, selectSyntaxLeft, selectSyntaxRight, selectLineUp, selectLineDown, selectPageUp, selectPageDown, selectLineBoundaryForward, selectLineBoundaryBackward, selectLineStart, selectLineEnd, cursorDocStart, cursorDocEnd, selectDocStart, selectDocEnd, selectAll, selectLine, selectParentSyntax, simplifySelection, deleteByChar, deleteCharBackward, deleteCharForward, deleteByGroup, deleteGroupBackward, deleteGroupForward, deleteToLineEnd, deleteToLineStart, splitLine, transposeChars, moveLineUp, moveLineDown, copyLineUp, copyLineDown, deleteLine, insertNewlineAndIndent, insertBlankLine, indentSelection, indentMore, indentLess, emacsStyleKeymap, standardKeymap, defaultKeymap;

  var init_dist6 = __esm({
    "node_modules/@codemirror/commands/dist/index.js"() {
      init_dist();
      init_dist2();
      init_dist5();
      init_dist3();

      toggleComment = target => {
        var config2 = getConfig(target.state);
        return config2.line ? toggleLineComment(target) : config2.block ? toggleBlockCommentByLine(target) : false;
      };

      toggleLineComment = /* @__PURE__ */command(changeLineComment, 0);
      toggleBlockComment = /* @__PURE__ */command(changeBlockComment, 0);
      toggleBlockCommentByLine = /* @__PURE__ */command((o, s) => changeBlockComment(o, s, selectedLineRanges(s)), 0);
      SearchMargin = 50;
      fromHistory = /* @__PURE__ */Annotation.define();
      isolateHistory = /* @__PURE__ */Annotation.define();
      invertedEffects = /* @__PURE__ */Facet.define();
      historyConfig = /* @__PURE__ */Facet.define({
        combine(configs) {
          return combineConfig(configs, {
            minDepth: 100,
            newGroupDelay: 500
          }, {
            minDepth: Math.max,
            newGroupDelay: Math.min
          });
        }

      });
      historyField_ = /* @__PURE__ */StateField.define({
        create() {
          return HistoryState.empty;
        },

        update(state, tr) {
          var config2 = tr.state.facet(historyConfig);
          var fromHist = tr.annotation(fromHistory);

          if (fromHist) {
            var selection = tr.docChanged ? EditorSelection.single(changeEnd(tr.changes)) : void 0;
            var item = HistEvent.fromTransaction(tr, selection),
                from = fromHist.side;
            var other = from == 0 ? state.undone : state.done;
            if (item) other = updateBranch(other, other.length, config2.minDepth, item);else other = addSelection(other, tr.startState.selection);
            return new HistoryState(from == 0 ? fromHist.rest : other, from == 0 ? other : fromHist.rest);
          }

          var isolate = tr.annotation(isolateHistory);
          if (isolate == "full" || isolate == "before") state = state.isolate();
          if (tr.annotation(Transaction.addToHistory) === false) return !tr.changes.empty ? state.addMapping(tr.changes.desc) : state;
          var event = HistEvent.fromTransaction(tr);
          var time = tr.annotation(Transaction.time),
              userEvent = tr.annotation(Transaction.userEvent);
          if (event) state = state.addChanges(event, time, userEvent, config2.newGroupDelay, config2.minDepth);else if (tr.selection) state = state.addSelection(tr.startState.selection, time, userEvent, config2.newGroupDelay);
          if (isolate == "full" || isolate == "after") state = state.isolate();
          return state;
        },

        toJSON(value) {
          return {
            done: value.done.map(e => e.toJSON()),
            undone: value.undone.map(e => e.toJSON())
          };
        },

        fromJSON(json) {
          return new HistoryState(json.done.map(HistEvent.fromJSON), json.undone.map(HistEvent.fromJSON));
        }

      });
      undo = /* @__PURE__ */cmd(0, false);
      redo = /* @__PURE__ */cmd(1, false);
      undoSelection = /* @__PURE__ */cmd(0, true);
      redoSelection = /* @__PURE__ */cmd(1, true);
      HistEvent = class {
        constructor(changes, effects, mapped, startSelection, selectionsAfter) {
          this.changes = changes;
          this.effects = effects;
          this.mapped = mapped;
          this.startSelection = startSelection;
          this.selectionsAfter = selectionsAfter;
        }

        setSelAfter(after) {
          return new HistEvent(this.changes, this.effects, this.mapped, this.startSelection, after);
        }

        toJSON() {
          var _a2, _b, _c;

          return {
            changes: (_a2 = this.changes) === null || _a2 === void 0 ? void 0 : _a2.toJSON(),
            mapped: (_b = this.mapped) === null || _b === void 0 ? void 0 : _b.toJSON(),
            startSelection: (_c = this.startSelection) === null || _c === void 0 ? void 0 : _c.toJSON(),
            selectionsAfter: this.selectionsAfter.map(s => s.toJSON())
          };
        }

        static fromJSON(json) {
          return new HistEvent(json.changes && ChangeSet.fromJSON(json.changes), [], json.mapped && ChangeDesc.fromJSON(json.mapped), json.startSelection && EditorSelection.fromJSON(json.startSelection), json.selectionsAfter.map(EditorSelection.fromJSON));
        }

        static fromTransaction(tr, selection) {
          var effects = none2;

          var _iterator174 = _createForOfIteratorHelper(tr.startState.facet(invertedEffects)),
              _step174;

          try {
            for (_iterator174.s(); !(_step174 = _iterator174.n()).done;) {
              var invert = _step174.value;
              var result = invert(tr);
              if (result.length) effects = effects.concat(result);
            }
          } catch (err) {
            _iterator174.e(err);
          } finally {
            _iterator174.f();
          }

          if (!effects.length && tr.changes.empty) return null;
          return new HistEvent(tr.changes.invert(tr.startState.doc), effects, void 0, selection || tr.startState.selection, none2);
        }

        static selection(selections) {
          return new HistEvent(void 0, none2, void 0, void 0, selections);
        }

      };
      none2 = [];
      MaxSelectionsPerEvent = 200;
      joinableUserEvent = /^(input\.type|delete)($|\.)/;
      HistoryState = class {
        constructor(done, undone) {
          var prevTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          var prevUserEvent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : void 0;
          this.done = done;
          this.undone = undone;
          this.prevTime = prevTime;
          this.prevUserEvent = prevUserEvent;
        }

        isolate() {
          return this.prevTime ? new HistoryState(this.done, this.undone) : this;
        }

        addChanges(event, time, userEvent, newGroupDelay, maxLen) {
          var done = this.done,
              lastEvent = done[done.length - 1];

          if (lastEvent && lastEvent.changes && !lastEvent.changes.empty && event.changes && (!userEvent || joinableUserEvent.test(userEvent)) && (!lastEvent.selectionsAfter.length && time - this.prevTime < newGroupDelay && isAdjacent(lastEvent.changes, event.changes) || userEvent == "input.type.compose")) {
            done = updateBranch(done, done.length - 1, maxLen, new HistEvent(event.changes.compose(lastEvent.changes), conc(event.effects, lastEvent.effects), lastEvent.mapped, lastEvent.startSelection, none2));
          } else {
            done = updateBranch(done, done.length, maxLen, event);
          }

          return new HistoryState(done, none2, time, userEvent);
        }

        addSelection(selection, time, userEvent, newGroupDelay) {
          var last = this.done.length ? this.done[this.done.length - 1].selectionsAfter : none2;
          if (last.length > 0 && time - this.prevTime < newGroupDelay && userEvent == this.prevUserEvent && userEvent && /^select($|\.)/.test(userEvent) && eqSelectionShape(last[last.length - 1], selection)) return this;
          return new HistoryState(addSelection(this.done, selection), this.undone, time, userEvent);
        }

        addMapping(mapping) {
          return new HistoryState(addMappingToBranch(this.done, mapping), addMappingToBranch(this.undone, mapping), this.prevTime, this.prevUserEvent);
        }

        pop(side, state, selection) {
          var branch = side == 0 ? this.done : this.undone;
          if (branch.length == 0) return null;
          var event = branch[branch.length - 1];

          if (selection && event.selectionsAfter.length) {
            return state.update({
              selection: event.selectionsAfter[event.selectionsAfter.length - 1],
              annotations: fromHistory.of({
                side,
                rest: popSelection(branch)
              }),
              userEvent: side == 0 ? "select.undo" : "select.redo",
              scrollIntoView: true
            });
          } else if (!event.changes) {
            return null;
          } else {
            var rest = branch.length == 1 ? none2 : branch.slice(0, branch.length - 1);
            if (event.mapped) rest = addMappingToBranch(rest, event.mapped);
            return state.update({
              changes: event.changes,
              selection: event.startSelection,
              effects: event.effects,
              annotations: fromHistory.of({
                side,
                rest
              }),
              filter: false,
              userEvent: side == 0 ? "undo" : "redo",
              scrollIntoView: true
            });
          }
        }

      };
      HistoryState.empty = /* @__PURE__ */new HistoryState(none2, none2);
      historyKeymap = [{
        key: "Mod-z",
        run: undo,
        preventDefault: true
      }, {
        key: "Mod-y",
        mac: "Mod-Shift-z",
        run: redo,
        preventDefault: true
      }, {
        key: "Mod-u",
        run: undoSelection,
        preventDefault: true
      }, {
        key: "Alt-u",
        mac: "Mod-Shift-u",
        run: redoSelection,
        preventDefault: true
      }];

      cursorCharLeft = view => cursorByChar(view, !ltrAtCursor(view));

      cursorCharRight = view => cursorByChar(view, ltrAtCursor(view));

      cursorGroupLeft = view => cursorByGroup(view, !ltrAtCursor(view));

      cursorGroupRight = view => cursorByGroup(view, ltrAtCursor(view));

      cursorSyntaxLeft = view => moveSel(view, range => moveBySyntax(view.state, range, !ltrAtCursor(view)));

      cursorSyntaxRight = view => moveSel(view, range => moveBySyntax(view.state, range, ltrAtCursor(view)));

      cursorLineUp = view => cursorByLine(view, false);

      cursorLineDown = view => cursorByLine(view, true);

      cursorPageUp = view => cursorByPage(view, false);

      cursorPageDown = view => cursorByPage(view, true);

      cursorLineBoundaryForward = view => moveSel(view, range => moveByLineBoundary(view, range, true));

      cursorLineBoundaryBackward = view => moveSel(view, range => moveByLineBoundary(view, range, false));

      cursorLineStart = view => moveSel(view, range => EditorSelection.cursor(view.lineBlockAt(range.head).from, 1));

      cursorLineEnd = view => moveSel(view, range => EditorSelection.cursor(view.lineBlockAt(range.head).to, -1));

      cursorMatchingBracket = _ref25 => {
        var state = _ref25.state,
            dispatch = _ref25.dispatch;
        return toMatchingBracket(state, dispatch, false);
      };

      selectCharLeft = view => selectByChar(view, !ltrAtCursor(view));

      selectCharRight = view => selectByChar(view, ltrAtCursor(view));

      selectGroupLeft = view => selectByGroup(view, !ltrAtCursor(view));

      selectGroupRight = view => selectByGroup(view, ltrAtCursor(view));

      selectSyntaxLeft = view => extendSel(view, range => moveBySyntax(view.state, range, !ltrAtCursor(view)));

      selectSyntaxRight = view => extendSel(view, range => moveBySyntax(view.state, range, ltrAtCursor(view)));

      selectLineUp = view => selectByLine(view, false);

      selectLineDown = view => selectByLine(view, true);

      selectPageUp = view => selectByPage(view, false);

      selectPageDown = view => selectByPage(view, true);

      selectLineBoundaryForward = view => extendSel(view, range => moveByLineBoundary(view, range, true));

      selectLineBoundaryBackward = view => extendSel(view, range => moveByLineBoundary(view, range, false));

      selectLineStart = view => extendSel(view, range => EditorSelection.cursor(view.lineBlockAt(range.head).from));

      selectLineEnd = view => extendSel(view, range => EditorSelection.cursor(view.lineBlockAt(range.head).to));

      cursorDocStart = _ref26 => {
        var state = _ref26.state,
            dispatch = _ref26.dispatch;
        dispatch(setSel(state, {
          anchor: 0
        }));
        return true;
      };

      cursorDocEnd = _ref27 => {
        var state = _ref27.state,
            dispatch = _ref27.dispatch;
        dispatch(setSel(state, {
          anchor: state.doc.length
        }));
        return true;
      };

      selectDocStart = _ref28 => {
        var state = _ref28.state,
            dispatch = _ref28.dispatch;
        dispatch(setSel(state, {
          anchor: state.selection.main.anchor,
          head: 0
        }));
        return true;
      };

      selectDocEnd = _ref29 => {
        var state = _ref29.state,
            dispatch = _ref29.dispatch;
        dispatch(setSel(state, {
          anchor: state.selection.main.anchor,
          head: state.doc.length
        }));
        return true;
      };

      selectAll = _ref30 => {
        var state = _ref30.state,
            dispatch = _ref30.dispatch;
        dispatch(state.update({
          selection: {
            anchor: 0,
            head: state.doc.length
          },
          userEvent: "select"
        }));
        return true;
      };

      selectLine = _ref31 => {
        var state = _ref31.state,
            dispatch = _ref31.dispatch;
        var ranges = selectedLineBlocks(state).map(_ref32 => {
          var from = _ref32.from,
              to = _ref32.to;
          return EditorSelection.range(from, Math.min(to + 1, state.doc.length));
        });
        dispatch(state.update({
          selection: EditorSelection.create(ranges),
          userEvent: "select"
        }));
        return true;
      };

      selectParentSyntax = _ref33 => {
        var state = _ref33.state,
            dispatch = _ref33.dispatch;
        var selection = updateSel(state.selection, range => {
          var _a2;

          var context = syntaxTree(state).resolveInner(range.head, 1);

          while (!(context.from < range.from && context.to >= range.to || context.to > range.to && context.from <= range.from || !((_a2 = context.parent) === null || _a2 === void 0 ? void 0 : _a2.parent))) {
            context = context.parent;
          }

          return EditorSelection.range(context.to, context.from);
        });
        dispatch(setSel(state, selection));
        return true;
      };

      simplifySelection = _ref34 => {
        var state = _ref34.state,
            dispatch = _ref34.dispatch;
        var cur2 = state.selection,
            selection = null;
        if (cur2.ranges.length > 1) selection = EditorSelection.create([cur2.main]);else if (!cur2.main.empty) selection = EditorSelection.create([EditorSelection.cursor(cur2.main.head)]);
        if (!selection) return false;
        dispatch(setSel(state, selection));
        return true;
      };

      deleteByChar = (target, forward) => deleteBy(target, pos => {
        var state = target.state,
            line = state.doc.lineAt(pos),
            before,
            targetPos;

        if (!forward && pos > line.from && pos < line.from + 200 && !/[^ \t]/.test(before = line.text.slice(0, pos - line.from))) {
          if (before[before.length - 1] == "	") return pos - 1;
          var col = countColumn(before, state.tabSize),
              drop = col % getIndentUnit(state) || getIndentUnit(state);

          for (var _i130 = 0; _i130 < drop && before[before.length - 1 - _i130] == " "; _i130++) {
            pos--;
          }

          targetPos = pos;
        } else {
          targetPos = findClusterBreak(line.text, pos - line.from, forward, forward) + line.from;
          if (targetPos == pos && line.number != (forward ? state.doc.lines : 1)) targetPos += forward ? 1 : -1;
        }

        return skipAtomic(target, targetPos, forward);
      });

      deleteCharBackward = view => deleteByChar(view, false);

      deleteCharForward = view => deleteByChar(view, true);

      deleteByGroup = (target, forward) => deleteBy(target, start => {
        var pos = start,
            state = target.state,
            line = state.doc.lineAt(pos);
        var categorize = state.charCategorizer(pos);

        for (var cat = null;;) {
          if (pos == (forward ? line.to : line.from)) {
            if (pos == start && line.number != (forward ? state.doc.lines : 1)) pos += forward ? 1 : -1;
            break;
          }

          var next = findClusterBreak(line.text, pos - line.from, forward) + line.from;
          var nextChar2 = line.text.slice(Math.min(pos, next) - line.from, Math.max(pos, next) - line.from);
          var nextCat = categorize(nextChar2);
          if (cat != null && nextCat != cat) break;
          if (nextChar2 != " " || pos != start) cat = nextCat;
          pos = next;
        }

        return skipAtomic(target, pos, forward);
      });

      deleteGroupBackward = target => deleteByGroup(target, false);

      deleteGroupForward = target => deleteByGroup(target, true);

      deleteToLineEnd = view => deleteBy(view, pos => {
        var lineEnd = view.lineBlockAt(pos).to;
        return skipAtomic(view, pos < lineEnd ? lineEnd : Math.min(view.state.doc.length, pos + 1), true);
      });

      deleteToLineStart = view => deleteBy(view, pos => {
        var lineStart = view.lineBlockAt(pos).from;
        return skipAtomic(view, pos > lineStart ? lineStart : Math.max(0, pos - 1), false);
      });

      splitLine = _ref35 => {
        var state = _ref35.state,
            dispatch = _ref35.dispatch;
        if (state.readOnly) return false;
        var changes = state.changeByRange(range => {
          return {
            changes: {
              from: range.from,
              to: range.to,
              insert: Text.of(["", ""])
            },
            range: EditorSelection.cursor(range.from)
          };
        });
        dispatch(state.update(changes, {
          scrollIntoView: true,
          userEvent: "input"
        }));
        return true;
      };

      transposeChars = _ref36 => {
        var state = _ref36.state,
            dispatch = _ref36.dispatch;
        if (state.readOnly) return false;
        var changes = state.changeByRange(range => {
          if (!range.empty || range.from == 0 || range.from == state.doc.length) return {
            range
          };
          var pos = range.from,
              line = state.doc.lineAt(pos);
          var from = pos == line.from ? pos - 1 : findClusterBreak(line.text, pos - line.from, false) + line.from;
          var to = pos == line.to ? pos + 1 : findClusterBreak(line.text, pos - line.from, true) + line.from;
          return {
            changes: {
              from,
              to,
              insert: state.doc.slice(pos, to).append(state.doc.slice(from, pos))
            },
            range: EditorSelection.cursor(to)
          };
        });
        if (changes.changes.empty) return false;
        dispatch(state.update(changes, {
          scrollIntoView: true,
          userEvent: "move.character"
        }));
        return true;
      };

      moveLineUp = _ref37 => {
        var state = _ref37.state,
            dispatch = _ref37.dispatch;
        return moveLine(state, dispatch, false);
      };

      moveLineDown = _ref38 => {
        var state = _ref38.state,
            dispatch = _ref38.dispatch;
        return moveLine(state, dispatch, true);
      };

      copyLineUp = _ref39 => {
        var state = _ref39.state,
            dispatch = _ref39.dispatch;
        return copyLine(state, dispatch, false);
      };

      copyLineDown = _ref40 => {
        var state = _ref40.state,
            dispatch = _ref40.dispatch;
        return copyLine(state, dispatch, true);
      };

      deleteLine = view => {
        if (view.state.readOnly) return false;
        var state = view.state,
            changes = state.changes(selectedLineBlocks(state).map(_ref41 => {
          var from = _ref41.from,
              to = _ref41.to;
          if (from > 0) from--;else if (to < state.doc.length) to++;
          return {
            from,
            to
          };
        }));
        var selection = updateSel(state.selection, range => view.moveVertically(range, true)).map(changes);
        view.dispatch({
          changes,
          selection,
          scrollIntoView: true,
          userEvent: "delete.line"
        });
        return true;
      };

      insertNewlineAndIndent = /* @__PURE__ */newlineAndIndent(false);
      insertBlankLine = /* @__PURE__ */newlineAndIndent(true);

      indentSelection = _ref42 => {
        var state = _ref42.state,
            dispatch = _ref42.dispatch;
        if (state.readOnly) return false;
        var updated = /* @__PURE__ */Object.create(null);
        var context = new IndentContext(state, {
          overrideIndentation: start => {
            var found = updated[start];
            return found == null ? -1 : found;
          }
        });
        var changes = changeBySelectedLine(state, (line, changes2, range) => {
          var indent = getIndentation(context, line.from);
          if (indent == null) return;
          if (!/\S/.test(line.text)) indent = 0;
          var cur2 = /^\s*/.exec(line.text)[0];
          var norm = indentString(state, indent);

          if (cur2 != norm || range.from < line.from + cur2.length) {
            updated[line.from] = indent;
            changes2.push({
              from: line.from,
              to: line.from + cur2.length,
              insert: norm
            });
          }
        });
        if (!changes.changes.empty) dispatch(state.update(changes, {
          userEvent: "indent"
        }));
        return true;
      };

      indentMore = _ref43 => {
        var state = _ref43.state,
            dispatch = _ref43.dispatch;
        if (state.readOnly) return false;
        dispatch(state.update(changeBySelectedLine(state, (line, changes) => {
          changes.push({
            from: line.from,
            insert: state.facet(indentUnit)
          });
        }), {
          userEvent: "input.indent"
        }));
        return true;
      };

      indentLess = _ref44 => {
        var state = _ref44.state,
            dispatch = _ref44.dispatch;
        if (state.readOnly) return false;
        dispatch(state.update(changeBySelectedLine(state, (line, changes) => {
          var space = /^\s*/.exec(line.text)[0];
          if (!space) return;
          var col = countColumn(space, state.tabSize),
              keep = 0;
          var insert2 = indentString(state, Math.max(0, col - getIndentUnit(state)));

          while (keep < space.length && keep < insert2.length && space.charCodeAt(keep) == insert2.charCodeAt(keep)) {
            keep++;
          }

          changes.push({
            from: line.from + keep,
            to: line.from + space.length,
            insert: insert2.slice(keep)
          });
        }), {
          userEvent: "delete.dedent"
        }));
        return true;
      };

      emacsStyleKeymap = [{
        key: "Ctrl-b",
        run: cursorCharLeft,
        shift: selectCharLeft,
        preventDefault: true
      }, {
        key: "Ctrl-f",
        run: cursorCharRight,
        shift: selectCharRight
      }, {
        key: "Ctrl-p",
        run: cursorLineUp,
        shift: selectLineUp
      }, {
        key: "Ctrl-n",
        run: cursorLineDown,
        shift: selectLineDown
      }, {
        key: "Ctrl-a",
        run: cursorLineStart,
        shift: selectLineStart
      }, {
        key: "Ctrl-e",
        run: cursorLineEnd,
        shift: selectLineEnd
      }, {
        key: "Ctrl-d",
        run: deleteCharForward
      }, {
        key: "Ctrl-h",
        run: deleteCharBackward
      }, {
        key: "Ctrl-k",
        run: deleteToLineEnd
      }, {
        key: "Ctrl-Alt-h",
        run: deleteGroupBackward
      }, {
        key: "Ctrl-o",
        run: splitLine
      }, {
        key: "Ctrl-t",
        run: transposeChars
      }, {
        key: "Ctrl-v",
        run: cursorPageDown
      }];
      standardKeymap = /* @__PURE__ */[{
        key: "ArrowLeft",
        run: cursorCharLeft,
        shift: selectCharLeft,
        preventDefault: true
      }, {
        key: "Mod-ArrowLeft",
        mac: "Alt-ArrowLeft",
        run: cursorGroupLeft,
        shift: selectGroupLeft
      }, {
        mac: "Cmd-ArrowLeft",
        run: cursorLineBoundaryBackward,
        shift: selectLineBoundaryBackward
      }, {
        key: "ArrowRight",
        run: cursorCharRight,
        shift: selectCharRight,
        preventDefault: true
      }, {
        key: "Mod-ArrowRight",
        mac: "Alt-ArrowRight",
        run: cursorGroupRight,
        shift: selectGroupRight
      }, {
        mac: "Cmd-ArrowRight",
        run: cursorLineBoundaryForward,
        shift: selectLineBoundaryForward
      }, {
        key: "ArrowUp",
        run: cursorLineUp,
        shift: selectLineUp,
        preventDefault: true
      }, {
        mac: "Cmd-ArrowUp",
        run: cursorDocStart,
        shift: selectDocStart
      }, {
        mac: "Ctrl-ArrowUp",
        run: cursorPageUp,
        shift: selectPageUp
      }, {
        key: "ArrowDown",
        run: cursorLineDown,
        shift: selectLineDown,
        preventDefault: true
      }, {
        mac: "Cmd-ArrowDown",
        run: cursorDocEnd,
        shift: selectDocEnd
      }, {
        mac: "Ctrl-ArrowDown",
        run: cursorPageDown,
        shift: selectPageDown
      }, {
        key: "PageUp",
        run: cursorPageUp,
        shift: selectPageUp
      }, {
        key: "PageDown",
        run: cursorPageDown,
        shift: selectPageDown
      }, {
        key: "Home",
        run: cursorLineBoundaryBackward,
        shift: selectLineBoundaryBackward,
        preventDefault: true
      }, {
        key: "Mod-Home",
        run: cursorDocStart,
        shift: selectDocStart
      }, {
        key: "End",
        run: cursorLineBoundaryForward,
        shift: selectLineBoundaryForward,
        preventDefault: true
      }, {
        key: "Mod-End",
        run: cursorDocEnd,
        shift: selectDocEnd
      }, {
        key: "Enter",
        run: insertNewlineAndIndent
      }, {
        key: "Mod-a",
        run: selectAll
      }, {
        key: "Backspace",
        run: deleteCharBackward,
        shift: deleteCharBackward
      }, {
        key: "Delete",
        run: deleteCharForward
      }, {
        key: "Mod-Backspace",
        mac: "Alt-Backspace",
        run: deleteGroupBackward
      }, {
        key: "Mod-Delete",
        mac: "Alt-Delete",
        run: deleteGroupForward
      }, {
        mac: "Mod-Backspace",
        run: deleteToLineStart
      }, {
        mac: "Mod-Delete",
        run: deleteToLineEnd
      }].concat( /* @__PURE__ */emacsStyleKeymap.map(b => ({
        mac: b.key,
        run: b.run,
        shift: b.shift
      })));
      defaultKeymap = /* @__PURE__ */[{
        key: "Alt-ArrowLeft",
        mac: "Ctrl-ArrowLeft",
        run: cursorSyntaxLeft,
        shift: selectSyntaxLeft
      }, {
        key: "Alt-ArrowRight",
        mac: "Ctrl-ArrowRight",
        run: cursorSyntaxRight,
        shift: selectSyntaxRight
      }, {
        key: "Alt-ArrowUp",
        run: moveLineUp
      }, {
        key: "Shift-Alt-ArrowUp",
        run: copyLineUp
      }, {
        key: "Alt-ArrowDown",
        run: moveLineDown
      }, {
        key: "Shift-Alt-ArrowDown",
        run: copyLineDown
      }, {
        key: "Escape",
        run: simplifySelection
      }, {
        key: "Mod-Enter",
        run: insertBlankLine
      }, {
        key: "Alt-l",
        mac: "Ctrl-l",
        run: selectLine
      }, {
        key: "Mod-i",
        run: selectParentSyntax,
        preventDefault: true
      }, {
        key: "Mod-[",
        run: indentLess
      }, {
        key: "Mod-]",
        run: indentMore
      }, {
        key: "Mod-Alt-\\",
        run: indentSelection
      }, {
        key: "Shift-Mod-k",
        run: deleteLine
      }, {
        key: "Shift-Mod-\\",
        run: cursorMatchingBracket
      }, {
        key: "Mod-/",
        run: toggleComment
      }, {
        key: "Alt-A",
        run: toggleBlockComment
      }].concat(standardKeymap);
    }

  }); // node_modules/crelt/index.es.js


  function crelt() {
    var elt = arguments[0];
    if (typeof elt == "string") elt = document.createElement(elt);
    var i = 1,
        next = arguments[1];

    if (next && typeof next == "object" && next.nodeType == null && !Array.isArray(next)) {
      for (var name2 in next) {
        if (Object.prototype.hasOwnProperty.call(next, name2)) {
          var value = next[name2];
          if (typeof value == "string") elt.setAttribute(name2, value);else if (value != null) elt[name2] = value;
        }
      }

      i++;
    }

    for (; i < arguments.length; i++) {
      add(elt, arguments[i]);
    }

    return elt;
  }

  function add(elt, child) {
    if (typeof child == "string") {
      elt.appendChild(document.createTextNode(child));
    } else if (child == null) {} else if (child.nodeType != null) {
      elt.appendChild(child);
    } else if (Array.isArray(child)) {
      for (var i = 0; i < child.length; i++) {
        add(elt, child[i]);
      }
    } else {
      throw new RangeError("Unsupported child node: " + child);
    }
  }

  var init_index_es2 = __esm({
    "node_modules/crelt/index.es.js"() {}

  }); // node_modules/@codemirror/search/dist/index.js


  function validRegExp(source) {
    try {
      new RegExp(source, baseFlags);
      return true;
    } catch (_a2) {
      return false;
    }
  }

  function createLineDialog(view) {
    var input = crelt("input", {
      class: "cm-textfield",
      name: "line"
    });
    var dom = crelt("form", {
      class: "cm-gotoLine",
      onkeydown: event => {
        if (event.keyCode == 27) {
          event.preventDefault();
          view.dispatch({
            effects: dialogEffect.of(false)
          });
          view.focus();
        } else if (event.keyCode == 13) {
          event.preventDefault();
          go();
        }
      },
      onsubmit: event => {
        event.preventDefault();
        go();
      }
    }, crelt("label", view.state.phrase("Go to line"), ": ", input), " ", crelt("button", {
      class: "cm-button",
      type: "submit"
    }, view.state.phrase("go")));

    function go() {
      var match = /^([+-])?(\d+)?(:\d+)?(%)?$/.exec(input.value);
      if (!match) return;
      var state = view.state,
          startLine = state.doc.lineAt(state.selection.main.head);

      var _match = _slicedToArray(match, 5),
          sign = _match[1],
          ln = _match[2],
          cl = _match[3],
          percent = _match[4];

      var col = cl ? +cl.slice(1) : 0;
      var line = ln ? +ln : startLine.number;

      if (ln && percent) {
        var pc = line / 100;
        if (sign) pc = pc * (sign == "-" ? -1 : 1) + startLine.number / state.doc.lines;
        line = Math.round(state.doc.lines * pc);
      } else if (ln && sign) {
        line = line * (sign == "-" ? -1 : 1) + startLine.number;
      }

      var docLine = state.doc.line(Math.max(1, Math.min(state.doc.lines, line)));
      view.dispatch({
        effects: dialogEffect.of(false),
        selection: EditorSelection.cursor(docLine.from + Math.max(0, Math.min(col, docLine.length))),
        scrollIntoView: true
      });
      view.focus();
    }

    return {
      dom
    };
  }

  function highlightSelectionMatches(options) {
    var ext = [defaultTheme, matchHighlighter];
    if (options) ext.push(highlightConfig.of(options));
    return ext;
  }

  function insideWordBoundaries(check, state, from, to) {
    return (from == 0 || check(state.sliceDoc(from - 1, from)) != CharCategory.Word) && (to == state.doc.length || check(state.sliceDoc(to, to + 1)) != CharCategory.Word);
  }

  function insideWord(check, state, from, to) {
    return check(state.sliceDoc(from, from + 1)) == CharCategory.Word && check(state.sliceDoc(to - 1, to)) == CharCategory.Word;
  }

  function findNextOccurrence(state, query) {
    var _state$selection = state.selection,
        main = _state$selection.main,
        ranges = _state$selection.ranges;
    var word = state.wordAt(main.head),
        fullWord = word && word.from == main.from && word.to == main.to;

    var _loop16 = function _loop16(_cycled, _cursor) {
      _cursor.next();

      if (_cursor.done) {
        if (_cycled) {
          cursor = _cursor;
          {
            cycled = _cycled;
            return {
              v: null
            };
          }
        }

        _cursor = new SearchCursor(state.doc, query, 0, Math.max(0, ranges[ranges.length - 1].from - 1));
        _cycled = true;
      } else {
        if (_cycled && ranges.some(r => r.from == _cursor.value.from)) {
          cursor = _cursor;
          {
            cycled = _cycled;
            return "continue";
          }
        }

        if (fullWord) {
          var word2 = state.wordAt(_cursor.value.from);

          if (!word2 || word2.from != _cursor.value.from || word2.to != _cursor.value.to) {
            cursor = _cursor;
            {
              cycled = _cycled;
              return "continue";
            }
          }
        }

        cycled = _cycled;
        cursor = _cursor;
        return {
          v: _cursor.value
        };
      }

      cycled = _cycled;
      cursor = _cursor;
    };

    for (var cycled = false, cursor = new SearchCursor(state.doc, query, ranges[ranges.length - 1].to);;) {
      var _ret3 = _loop16(cycled, cursor);

      if (_ret3 === "continue") continue;
      if (typeof _ret3 === "object") return _ret3.v;
    }
  }

  function stringCursor(spec, doc2, from, to) {
    return new SearchCursor(doc2, spec.unquoted, from, to, spec.caseSensitive ? void 0 : x => x.toLowerCase());
  }

  function regexpCursor(spec, doc2, from, to) {
    return new RegExpCursor(doc2, spec.search, spec.caseSensitive ? void 0 : {
      ignoreCase: true
    }, from, to);
  }

  function searchCommand(f) {
    return view => {
      var state = view.state.field(searchState, false);
      return state && state.query.spec.valid ? f(view, state) : openSearchPanel(view);
    };
  }

  function createSearchPanel(view) {
    return view.state.facet(searchConfigFacet).createPanel(view);
  }

  function defaultQuery(state, fallback) {
    var _a2;

    var sel = state.selection.main;
    var selText = sel.empty || sel.to > sel.from + 100 ? "" : state.sliceDoc(sel.from, sel.to);
    var caseSensitive = (_a2 = fallback === null || fallback === void 0 ? void 0 : fallback.caseSensitive) !== null && _a2 !== void 0 ? _a2 : state.facet(searchConfigFacet).caseSensitive;
    return fallback && !selText ? fallback : new SearchQuery({
      search: selText.replace(/\n/g, "\\n"),
      caseSensitive
    });
  }

  function phrase(view, phrase2) {
    return view.state.phrase(phrase2);
  }

  function announceMatch(view, _ref45) {
    var from = _ref45.from,
        to = _ref45.to;
    var line = view.state.doc.lineAt(from),
        lineEnd = view.state.doc.lineAt(to).to;
    var start = Math.max(line.from, from - AnnounceMargin),
        end = Math.min(lineEnd, to + AnnounceMargin);
    var text = view.state.sliceDoc(start, end);

    if (start != line.from) {
      for (var _i131 = 0; _i131 < AnnounceMargin; _i131++) {
        if (!Break.test(text[_i131 + 1]) && Break.test(text[_i131])) {
          text = text.slice(_i131);
          break;
        }
      }
    }

    if (end != lineEnd) {
      for (var _i132 = text.length - 1; _i132 > text.length - AnnounceMargin; _i132--) {
        if (!Break.test(text[_i132 - 1]) && Break.test(text[_i132])) {
          text = text.slice(0, _i132);
          break;
        }
      }
    }

    return EditorView.announce.of("".concat(view.state.phrase("current match"), ". ").concat(text, " ").concat(view.state.phrase("on line"), " ").concat(line.number, "."));
  }

  var basicNormalize, SearchCursor, empty, baseFlags, RegExpCursor, flattened, FlattenedDoc, MultilineRegExpCursor, dialogEffect, dialogField, gotoLine, baseTheme$13, defaultHighlightOptions, highlightConfig, matchDeco, mainMatchDeco, matchHighlighter, defaultTheme, selectWord, selectNextOccurrence, searchConfigFacet, SearchQuery, QueryType2, StringQuery, RegExpQuery, setSearchQuery, togglePanel, searchState, SearchState, matchMark, selectedMatchMark, searchHighlighter, findNext, findPrevious, selectMatches, selectSelectionMatches, replaceNext, replaceAll, openSearchPanel, closeSearchPanel, searchKeymap, SearchPanel, AnnounceMargin, Break, baseTheme3, searchExtensions;

  var init_dist7 = __esm({
    "node_modules/@codemirror/search/dist/index.js"() {
      init_dist2();
      init_dist();
      init_index_es2();
      basicNormalize = typeof String.prototype.normalize == "function" ? x => x.normalize("NFKD") : x => x;
      SearchCursor = class {
        constructor(text, query) {
          var from = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          var to = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : text.length;
          var normalize = arguments.length > 4 ? arguments[4] : undefined;
          this.value = {
            from: 0,
            to: 0
          };
          this.done = false;
          this.matches = [];
          this.buffer = "";
          this.bufferPos = 0;
          this.iter = text.iterRange(from, to);
          this.bufferStart = from;
          this.normalize = normalize ? x => normalize(basicNormalize(x)) : basicNormalize;
          this.query = this.normalize(query);
        }

        peek() {
          if (this.bufferPos == this.buffer.length) {
            this.bufferStart += this.buffer.length;
            this.iter.next();
            if (this.iter.done) return -1;
            this.bufferPos = 0;
            this.buffer = this.iter.value;
          }

          return codePointAt(this.buffer, this.bufferPos);
        }

        next() {
          while (this.matches.length) {
            this.matches.pop();
          }

          return this.nextOverlapping();
        }

        nextOverlapping() {
          for (;;) {
            var next = this.peek();

            if (next < 0) {
              this.done = true;
              return this;
            }

            var str = fromCodePoint(next),
                start = this.bufferStart + this.bufferPos;
            this.bufferPos += codePointSize(next);
            var norm = this.normalize(str);

            for (var _i133 = 0, pos = start;; _i133++) {
              var _code = norm.charCodeAt(_i133);

              var match = this.match(_code, pos);

              if (match) {
                this.value = match;
                return this;
              }

              if (_i133 == norm.length - 1) break;
              if (pos == start && _i133 < str.length && str.charCodeAt(_i133) == _code) pos++;
            }
          }
        }

        match(code, pos) {
          var match = null;

          for (var _i134 = 0; _i134 < this.matches.length; _i134 += 2) {
            var index = this.matches[_i134],
                keep = false;

            if (this.query.charCodeAt(index) == code) {
              if (index == this.query.length - 1) {
                match = {
                  from: this.matches[_i134 + 1],
                  to: pos + 1
                };
              } else {
                this.matches[_i134]++;
                keep = true;
              }
            }

            if (!keep) {
              this.matches.splice(_i134, 2);
              _i134 -= 2;
            }
          }

          if (this.query.charCodeAt(0) == code) {
            if (this.query.length == 1) match = {
              from: pos,
              to: pos + 1
            };else this.matches.push(1, pos);
          }

          return match;
        }

      };
      if (typeof Symbol != "undefined") SearchCursor.prototype[Symbol.iterator] = function () {
        return this;
      };
      empty = {
        from: -1,
        to: -1,
        match: /* @__PURE__ */ /.*/.exec("")
      };
      baseFlags = "gm" + (/x/.unicode == null ? "" : "u");
      RegExpCursor = class {
        constructor(text, query, options) {
          var from = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
          var to = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : text.length;
          this.to = to;
          this.curLine = "";
          this.done = false;
          this.value = empty;
          if (/\\[sWDnr]|\n|\r|\[\^/.test(query)) return new MultilineRegExpCursor(text, query, options, from, to);
          this.re = new RegExp(query, baseFlags + ((options === null || options === void 0 ? void 0 : options.ignoreCase) ? "i" : ""));
          this.iter = text.iter();
          var startLine = text.lineAt(from);
          this.curLineStart = startLine.from;
          this.matchPos = from;
          this.getLine(this.curLineStart);
        }

        getLine(skip) {
          this.iter.next(skip);

          if (this.iter.lineBreak) {
            this.curLine = "";
          } else {
            this.curLine = this.iter.value;
            if (this.curLineStart + this.curLine.length > this.to) this.curLine = this.curLine.slice(0, this.to - this.curLineStart);
            this.iter.next();
          }
        }

        nextLine() {
          this.curLineStart = this.curLineStart + this.curLine.length + 1;
          if (this.curLineStart > this.to) this.curLine = "";else this.getLine(0);
        }

        next() {
          for (var off = this.matchPos - this.curLineStart;;) {
            this.re.lastIndex = off;
            var match = this.matchPos <= this.to && this.re.exec(this.curLine);

            if (match) {
              var from = this.curLineStart + match.index,
                  to = from + match[0].length;
              this.matchPos = to + (from == to ? 1 : 0);
              if (from == this.curLine.length) this.nextLine();

              if (from < to || from > this.value.to) {
                this.value = {
                  from,
                  to,
                  match
                };
                return this;
              }

              off = this.matchPos - this.curLineStart;
            } else if (this.curLineStart + this.curLine.length < this.to) {
              this.nextLine();
              off = 0;
            } else {
              this.done = true;
              return this;
            }
          }
        }

      };
      flattened = /* @__PURE__ */new WeakMap();
      FlattenedDoc = class {
        constructor(from, text) {
          this.from = from;
          this.text = text;
        }

        get to() {
          return this.from + this.text.length;
        }

        static get(doc2, from, to) {
          var cached = flattened.get(doc2);

          if (!cached || cached.from >= to || cached.to <= from) {
            var flat = new FlattenedDoc(from, doc2.sliceString(from, to));
            flattened.set(doc2, flat);
            return flat;
          }

          if (cached.from == from && cached.to == to) return cached;
          var text = cached.text,
              cachedFrom = cached.from;

          if (cachedFrom > from) {
            text = doc2.sliceString(from, cachedFrom) + text;
            cachedFrom = from;
          }

          if (cached.to < to) text += doc2.sliceString(cached.to, to);
          flattened.set(doc2, new FlattenedDoc(cachedFrom, text));
          return new FlattenedDoc(from, text.slice(from - cachedFrom, to - cachedFrom));
        }

      };
      MultilineRegExpCursor = class {
        constructor(text, query, options, from, to) {
          this.text = text;
          this.to = to;
          this.done = false;
          this.value = empty;
          this.matchPos = from;
          this.re = new RegExp(query, baseFlags + ((options === null || options === void 0 ? void 0 : options.ignoreCase) ? "i" : ""));
          this.flat = FlattenedDoc.get(text, from, this.chunkEnd(from + 5e3));
        }

        chunkEnd(pos) {
          return pos >= this.to ? this.to : this.text.lineAt(pos).to;
        }

        next() {
          for (;;) {
            var off = this.re.lastIndex = this.matchPos - this.flat.from;
            var match = this.re.exec(this.flat.text);

            if (match && !match[0] && match.index == off) {
              this.re.lastIndex = off + 1;
              match = this.re.exec(this.flat.text);
            }

            if (match && this.flat.to < this.to && match.index + match[0].length > this.flat.text.length - 10) match = null;

            if (match) {
              var from = this.flat.from + match.index,
                  to = from + match[0].length;
              this.value = {
                from,
                to,
                match
              };
              this.matchPos = to + (from == to ? 1 : 0);
              return this;
            } else {
              if (this.flat.to == this.to) {
                this.done = true;
                return this;
              }

              this.flat = FlattenedDoc.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
            }
          }
        }

      };

      if (typeof Symbol != "undefined") {
        RegExpCursor.prototype[Symbol.iterator] = MultilineRegExpCursor.prototype[Symbol.iterator] = function () {
          return this;
        };
      }

      dialogEffect = /* @__PURE__ */StateEffect.define();
      dialogField = /* @__PURE__ */StateField.define({
        create() {
          return true;
        },

        update(value, tr) {
          var _iterator175 = _createForOfIteratorHelper(tr.effects),
              _step175;

          try {
            for (_iterator175.s(); !(_step175 = _iterator175.n()).done;) {
              var e = _step175.value;
              if (e.is(dialogEffect)) value = e.value;
            }
          } catch (err) {
            _iterator175.e(err);
          } finally {
            _iterator175.f();
          }

          return value;
        },

        provide: f => showPanel.from(f, val => val ? createLineDialog : null)
      });

      gotoLine = view => {
        var panel = getPanel(view, createLineDialog);

        if (!panel) {
          var effects = [dialogEffect.of(true)];
          if (view.state.field(dialogField, false) == null) effects.push(StateEffect.appendConfig.of([dialogField, baseTheme$13]));
          view.dispatch({
            effects
          });
          panel = getPanel(view, createLineDialog);
        }

        if (panel) panel.dom.querySelector("input").focus();
        return true;
      };

      baseTheme$13 = /* @__PURE__ */EditorView.baseTheme({
        ".cm-panel.cm-gotoLine": {
          padding: "2px 6px 4px",
          "& label": {
            fontSize: "80%"
          }
        }
      });
      defaultHighlightOptions = {
        highlightWordAroundCursor: false,
        minSelectionLength: 1,
        maxMatches: 100,
        wholeWords: false
      };
      highlightConfig = /* @__PURE__ */Facet.define({
        combine(options) {
          return combineConfig(options, defaultHighlightOptions, {
            highlightWordAroundCursor: (a, b) => a || b,
            minSelectionLength: Math.min,
            maxMatches: Math.min
          });
        }

      });
      matchDeco = /* @__PURE__ */Decoration.mark({
        class: "cm-selectionMatch"
      });
      mainMatchDeco = /* @__PURE__ */Decoration.mark({
        class: "cm-selectionMatch cm-selectionMatch-main"
      });
      matchHighlighter = /* @__PURE__ */ViewPlugin.fromClass(class {
        constructor(view) {
          this.decorations = this.getDeco(view);
        }

        update(update) {
          if (update.selectionSet || update.docChanged || update.viewportChanged) this.decorations = this.getDeco(update.view);
        }

        getDeco(view) {
          var conf = view.state.facet(highlightConfig);
          var state = view.state,
              sel = state.selection;
          if (sel.ranges.length > 1) return Decoration.none;
          var range = sel.main,
              query,
              check = null;

          if (range.empty) {
            if (!conf.highlightWordAroundCursor) return Decoration.none;
            var word = state.wordAt(range.head);
            if (!word) return Decoration.none;
            check = state.charCategorizer(range.head);
            query = state.sliceDoc(word.from, word.to);
          } else {
            var len = range.to - range.from;
            if (len < conf.minSelectionLength || len > 200) return Decoration.none;

            if (conf.wholeWords) {
              query = state.sliceDoc(range.from, range.to);
              check = state.charCategorizer(range.head);
              if (!(insideWordBoundaries(check, state, range.from, range.to) && insideWord(check, state, range.from, range.to))) return Decoration.none;
            } else {
              query = state.sliceDoc(range.from, range.to).trim();
              if (!query) return Decoration.none;
            }
          }

          var deco = [];

          var _iterator176 = _createForOfIteratorHelper(view.visibleRanges),
              _step176;

          try {
            for (_iterator176.s(); !(_step176 = _iterator176.n()).done;) {
              var part = _step176.value;

              var _cursor2 = new SearchCursor(state.doc, query, part.from, part.to);

              while (!_cursor2.next().done) {
                var _cursor2$value = _cursor2.value,
                    from = _cursor2$value.from,
                    to = _cursor2$value.to;

                if (!check || insideWordBoundaries(check, state, from, to)) {
                  if (range.empty && from <= range.from && to >= range.to) deco.push(mainMatchDeco.range(from, to));else if (from >= range.to || to <= range.from) deco.push(matchDeco.range(from, to));
                  if (deco.length > conf.maxMatches) return Decoration.none;
                }
              }
            }
          } catch (err) {
            _iterator176.e(err);
          } finally {
            _iterator176.f();
          }

          return Decoration.set(deco);
        }

      }, {
        decorations: v => v.decorations
      });
      defaultTheme = /* @__PURE__ */EditorView.baseTheme({
        ".cm-selectionMatch": {
          backgroundColor: "#99ff7780"
        },
        ".cm-searchMatch .cm-selectionMatch": {
          backgroundColor: "transparent"
        }
      });

      selectWord = _ref46 => {
        var state = _ref46.state,
            dispatch = _ref46.dispatch;
        var selection = state.selection;
        var newSel = EditorSelection.create(selection.ranges.map(range => state.wordAt(range.head) || EditorSelection.cursor(range.head)), selection.mainIndex);
        if (newSel.eq(selection)) return false;
        dispatch(state.update({
          selection: newSel
        }));
        return true;
      };

      selectNextOccurrence = _ref47 => {
        var state = _ref47.state,
            dispatch = _ref47.dispatch;
        var ranges = state.selection.ranges;
        if (ranges.some(sel => sel.from === sel.to)) return selectWord({
          state,
          dispatch
        });
        var searchedText = state.sliceDoc(ranges[0].from, ranges[0].to);
        if (state.selection.ranges.some(r => state.sliceDoc(r.from, r.to) != searchedText)) return false;
        var range = findNextOccurrence(state, searchedText);
        if (!range) return false;
        dispatch(state.update({
          selection: state.selection.addRange(EditorSelection.range(range.from, range.to), false),
          effects: EditorView.scrollIntoView(range.to)
        }));
        return true;
      };

      searchConfigFacet = /* @__PURE__ */Facet.define({
        combine(configs) {
          var _a2;

          return {
            top: configs.reduce((val, conf) => val !== null && val !== void 0 ? val : conf.top, void 0) || false,
            caseSensitive: configs.reduce((val, conf) => val !== null && val !== void 0 ? val : conf.caseSensitive, void 0) || false,
            createPanel: ((_a2 = configs.find(c => c.createPanel)) === null || _a2 === void 0 ? void 0 : _a2.createPanel) || (view => new SearchPanel(view))
          };
        }

      });
      SearchQuery = class {
        constructor(config2) {
          this.search = config2.search;
          this.caseSensitive = !!config2.caseSensitive;
          this.regexp = !!config2.regexp;
          this.replace = config2.replace || "";
          this.valid = !!this.search && (!this.regexp || validRegExp(this.search));
          this.unquoted = config2.literal ? this.search : this.search.replace(/\\([nrt\\])/g, (_, ch) => ch == "n" ? "\n" : ch == "r" ? "\r" : ch == "t" ? "	" : "\\");
        }

        eq(other) {
          return this.search == other.search && this.replace == other.replace && this.caseSensitive == other.caseSensitive && this.regexp == other.regexp;
        }

        create() {
          return this.regexp ? new RegExpQuery(this) : new StringQuery(this);
        }

        getCursor(doc2) {
          var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : doc2.length;
          return this.regexp ? regexpCursor(this, doc2, from, to) : stringCursor(this, doc2, from, to);
        }

      };
      QueryType2 = class {
        constructor(spec) {
          this.spec = spec;
        }

      };
      StringQuery = class extends QueryType2 {
        constructor(spec) {
          super(spec);
        }

        nextMatch(doc2, curFrom, curTo) {
          var cursor = stringCursor(this.spec, doc2, curTo, doc2.length).nextOverlapping();
          if (cursor.done) cursor = stringCursor(this.spec, doc2, 0, curFrom).nextOverlapping();
          return cursor.done ? null : cursor.value;
        }

        prevMatchInRange(doc2, from, to) {
          for (var pos = to;;) {
            var start = Math.max(from, pos - 1e4 - this.spec.unquoted.length);

            var _cursor3 = stringCursor(this.spec, doc2, start, pos),
                range = null;

            while (!_cursor3.nextOverlapping().done) {
              range = _cursor3.value;
            }

            if (range) return range;
            if (start == from) return null;
            pos -= 1e4;
          }
        }

        prevMatch(doc2, curFrom, curTo) {
          return this.prevMatchInRange(doc2, 0, curFrom) || this.prevMatchInRange(doc2, curTo, doc2.length);
        }

        getReplacement(_result) {
          return this.spec.replace;
        }

        matchAll(doc2, limit) {
          var cursor = stringCursor(this.spec, doc2, 0, doc2.length),
              ranges = [];

          while (!cursor.next().done) {
            if (ranges.length >= limit) return null;
            ranges.push(cursor.value);
          }

          return ranges;
        }

        highlight(doc2, from, to, add2) {
          var cursor = stringCursor(this.spec, doc2, Math.max(0, from - this.spec.unquoted.length), Math.min(to + this.spec.unquoted.length, doc2.length));

          while (!cursor.next().done) {
            add2(cursor.value.from, cursor.value.to);
          }
        }

      };
      RegExpQuery = class extends QueryType2 {
        nextMatch(doc2, curFrom, curTo) {
          var cursor = regexpCursor(this.spec, doc2, curTo, doc2.length).next();
          if (cursor.done) cursor = regexpCursor(this.spec, doc2, 0, curFrom).next();
          return cursor.done ? null : cursor.value;
        }

        prevMatchInRange(doc2, from, to) {
          for (var size = 1;; size++) {
            var start = Math.max(from, to - size * 1e4);

            var _cursor4 = regexpCursor(this.spec, doc2, start, to),
                range = null;

            while (!_cursor4.next().done) {
              range = _cursor4.value;
            }

            if (range && (start == from || range.from > start + 10)) return range;
            if (start == from) return null;
          }
        }

        prevMatch(doc2, curFrom, curTo) {
          return this.prevMatchInRange(doc2, 0, curFrom) || this.prevMatchInRange(doc2, curTo, doc2.length);
        }

        getReplacement(result) {
          return this.spec.replace.replace(/\$([$&\d+])/g, (m, i) => i == "$" ? "$" : i == "&" ? result.match[0] : i != "0" && +i < result.match.length ? result.match[i] : m);
        }

        matchAll(doc2, limit) {
          var cursor = regexpCursor(this.spec, doc2, 0, doc2.length),
              ranges = [];

          while (!cursor.next().done) {
            if (ranges.length >= limit) return null;
            ranges.push(cursor.value);
          }

          return ranges;
        }

        highlight(doc2, from, to, add2) {
          var cursor = regexpCursor(this.spec, doc2, Math.max(0, from - 250), Math.min(to + 250, doc2.length));

          while (!cursor.next().done) {
            add2(cursor.value.from, cursor.value.to);
          }
        }

      };
      setSearchQuery = /* @__PURE__ */StateEffect.define();
      togglePanel = /* @__PURE__ */StateEffect.define();
      searchState = /* @__PURE__ */StateField.define({
        create(state) {
          return new SearchState(defaultQuery(state).create(), null);
        },

        update(value, tr) {
          var _iterator177 = _createForOfIteratorHelper(tr.effects),
              _step177;

          try {
            for (_iterator177.s(); !(_step177 = _iterator177.n()).done;) {
              var effect = _step177.value;
              if (effect.is(setSearchQuery)) value = new SearchState(effect.value.create(), value.panel);else if (effect.is(togglePanel)) value = new SearchState(value.query, effect.value ? createSearchPanel : null);
            }
          } catch (err) {
            _iterator177.e(err);
          } finally {
            _iterator177.f();
          }

          return value;
        },

        provide: f => showPanel.from(f, val => val.panel)
      });
      SearchState = class {
        constructor(query, panel) {
          this.query = query;
          this.panel = panel;
        }

      };
      matchMark = /* @__PURE__ */Decoration.mark({
        class: "cm-searchMatch"
      });
      selectedMatchMark = /* @__PURE__ */Decoration.mark({
        class: "cm-searchMatch cm-searchMatch-selected"
      });
      searchHighlighter = /* @__PURE__ */ViewPlugin.fromClass(class {
        constructor(view) {
          this.view = view;
          this.decorations = this.highlight(view.state.field(searchState));
        }

        update(update) {
          var state = update.state.field(searchState);
          if (state != update.startState.field(searchState) || update.docChanged || update.selectionSet || update.viewportChanged) this.decorations = this.highlight(state);
        }

        highlight(_ref48) {
          var query = _ref48.query,
              panel = _ref48.panel;
          if (!panel || !query.spec.valid) return Decoration.none;
          var view = this.view;
          var builder = new RangeSetBuilder();

          for (var _i135 = 0, ranges = view.visibleRanges, l = ranges.length; _i135 < l; _i135++) {
            var _ranges$_i2 = ranges[_i135],
                from = _ranges$_i2.from,
                to = _ranges$_i2.to;

            while (_i135 < l - 1 && to > ranges[_i135 + 1].from - 2 * 250) {
              to = ranges[++_i135].to;
            }

            query.highlight(view.state.doc, from, to, (from2, to2) => {
              var selected = view.state.selection.ranges.some(r => r.from == from2 && r.to == to2);
              builder.add(from2, to2, selected ? selectedMatchMark : matchMark);
            });
          }

          return builder.finish();
        }

      }, {
        decorations: v => v.decorations
      });
      findNext = /* @__PURE__ */searchCommand((view, _ref49) => {
        var query = _ref49.query;
        var _view$state$selection = view.state.selection.main,
            from = _view$state$selection.from,
            to = _view$state$selection.to;
        var next = query.nextMatch(view.state.doc, from, to);
        if (!next || next.from == from && next.to == to) return false;
        view.dispatch({
          selection: {
            anchor: next.from,
            head: next.to
          },
          scrollIntoView: true,
          effects: announceMatch(view, next),
          userEvent: "select.search"
        });
        return true;
      });
      findPrevious = /* @__PURE__ */searchCommand((view, _ref50) => {
        var query = _ref50.query;
        var state = view.state,
            _state$selection$main = state.selection.main,
            from = _state$selection$main.from,
            to = _state$selection$main.to;
        var range = query.prevMatch(state.doc, from, to);
        if (!range) return false;
        view.dispatch({
          selection: {
            anchor: range.from,
            head: range.to
          },
          scrollIntoView: true,
          effects: announceMatch(view, range),
          userEvent: "select.search"
        });
        return true;
      });
      selectMatches = /* @__PURE__ */searchCommand((view, _ref51) => {
        var query = _ref51.query;
        var ranges = query.matchAll(view.state.doc, 1e3);
        if (!ranges || !ranges.length) return false;
        view.dispatch({
          selection: EditorSelection.create(ranges.map(r => EditorSelection.range(r.from, r.to))),
          userEvent: "select.search.matches"
        });
        return true;
      });

      selectSelectionMatches = _ref52 => {
        var state = _ref52.state,
            dispatch = _ref52.dispatch;
        var sel = state.selection;
        if (sel.ranges.length > 1 || sel.main.empty) return false;
        var _sel$main = sel.main,
            from = _sel$main.from,
            to = _sel$main.to;
        var ranges = [],
            main = 0;

        for (var cur2 = new SearchCursor(state.doc, state.sliceDoc(from, to)); !cur2.next().done;) {
          if (ranges.length > 1e3) return false;
          if (cur2.value.from == from) main = ranges.length;
          ranges.push(EditorSelection.range(cur2.value.from, cur2.value.to));
        }

        dispatch(state.update({
          selection: EditorSelection.create(ranges, main),
          userEvent: "select.search.matches"
        }));
        return true;
      };

      replaceNext = /* @__PURE__ */searchCommand((view, _ref53) => {
        var query = _ref53.query;
        var state = view.state,
            _state$selection$main2 = state.selection.main,
            from = _state$selection$main2.from,
            to = _state$selection$main2.to;
        if (state.readOnly) return false;
        var next = query.nextMatch(state.doc, from, from);
        if (!next) return false;
        var changes = [],
            selection,
            replacement;
        var announce = [];

        if (next.from == from && next.to == to) {
          replacement = state.toText(query.getReplacement(next));
          changes.push({
            from: next.from,
            to: next.to,
            insert: replacement
          });
          next = query.nextMatch(state.doc, next.from, next.to);
          announce.push(EditorView.announce.of(state.phrase("replaced match on line $", state.doc.lineAt(from).number) + "."));
        }

        if (next) {
          var off = changes.length == 0 || changes[0].from >= next.to ? 0 : next.to - next.from - replacement.length;
          selection = {
            anchor: next.from - off,
            head: next.to - off
          };
          announce.push(announceMatch(view, next));
        }

        view.dispatch({
          changes,
          selection,
          scrollIntoView: !!selection,
          effects: announce,
          userEvent: "input.replace"
        });
        return true;
      });
      replaceAll = /* @__PURE__ */searchCommand((view, _ref54) => {
        var query = _ref54.query;
        if (view.state.readOnly) return false;
        var changes = query.matchAll(view.state.doc, 1e9).map(match => {
          var from = match.from,
              to = match.to;
          return {
            from,
            to,
            insert: query.getReplacement(match)
          };
        });
        if (!changes.length) return false;
        var announceText = view.state.phrase("replaced $ matches", changes.length) + ".";
        view.dispatch({
          changes,
          effects: EditorView.announce.of(announceText),
          userEvent: "input.replace.all"
        });
        return true;
      });

      openSearchPanel = view => {
        var state = view.state.field(searchState, false);

        if (state && state.panel) {
          var panel = getPanel(view, createSearchPanel);
          if (!panel) return false;
          var searchInput = panel.dom.querySelector("[main-field]");

          if (searchInput && searchInput != view.root.activeElement) {
            var query = defaultQuery(view.state, state.query.spec);
            if (query.valid) view.dispatch({
              effects: setSearchQuery.of(query)
            });
            searchInput.focus();
            searchInput.select();
          }
        } else {
          view.dispatch({
            effects: [togglePanel.of(true), state ? setSearchQuery.of(defaultQuery(view.state, state.query.spec)) : StateEffect.appendConfig.of(searchExtensions)]
          });
        }

        return true;
      };

      closeSearchPanel = view => {
        var state = view.state.field(searchState, false);
        if (!state || !state.panel) return false;
        var panel = getPanel(view, createSearchPanel);
        if (panel && panel.dom.contains(view.root.activeElement)) view.focus();
        view.dispatch({
          effects: togglePanel.of(false)
        });
        return true;
      };

      searchKeymap = [{
        key: "Mod-f",
        run: openSearchPanel,
        scope: "editor search-panel"
      }, {
        key: "F3",
        run: findNext,
        shift: findPrevious,
        scope: "editor search-panel",
        preventDefault: true
      }, {
        key: "Mod-g",
        run: findNext,
        shift: findPrevious,
        scope: "editor search-panel",
        preventDefault: true
      }, {
        key: "Escape",
        run: closeSearchPanel,
        scope: "editor search-panel"
      }, {
        key: "Mod-Shift-l",
        run: selectSelectionMatches
      }, {
        key: "Alt-g",
        run: gotoLine
      }, {
        key: "Mod-d",
        run: selectNextOccurrence,
        preventDefault: true
      }];
      SearchPanel = class {
        constructor(view) {
          this.view = view;
          var query = this.query = view.state.field(searchState).query.spec;
          this.commit = this.commit.bind(this);
          this.searchField = crelt("input", {
            value: query.search,
            placeholder: phrase(view, "Find"),
            "aria-label": phrase(view, "Find"),
            class: "cm-textfield",
            name: "search",
            "main-field": "true",
            onchange: this.commit,
            onkeyup: this.commit
          });
          this.replaceField = crelt("input", {
            value: query.replace,
            placeholder: phrase(view, "Replace"),
            "aria-label": phrase(view, "Replace"),
            class: "cm-textfield",
            name: "replace",
            onchange: this.commit,
            onkeyup: this.commit
          });
          this.caseField = crelt("input", {
            type: "checkbox",
            name: "case",
            checked: query.caseSensitive,
            onchange: this.commit
          });
          this.reField = crelt("input", {
            type: "checkbox",
            name: "re",
            checked: query.regexp,
            onchange: this.commit
          });

          function button(name2, onclick, content2) {
            return crelt("button", {
              class: "cm-button",
              name: name2,
              onclick,
              type: "button"
            }, content2);
          }

          this.dom = crelt("div", {
            onkeydown: e => this.keydown(e),
            class: "cm-search"
          }, [this.searchField, button("next", () => findNext(view), [phrase(view, "next")]), button("prev", () => findPrevious(view), [phrase(view, "previous")]), button("select", () => selectMatches(view), [phrase(view, "all")]), crelt("label", null, [this.caseField, phrase(view, "match case")]), crelt("label", null, [this.reField, phrase(view, "regexp")]), ...(view.state.readOnly ? [] : [crelt("br"), this.replaceField, button("replace", () => replaceNext(view), [phrase(view, "replace")]), button("replaceAll", () => replaceAll(view), [phrase(view, "replace all")]), crelt("button", {
            name: "close",
            onclick: () => closeSearchPanel(view),
            "aria-label": phrase(view, "close"),
            type: "button"
          }, ["\xD7"])])]);
        }

        commit() {
          var query = new SearchQuery({
            search: this.searchField.value,
            caseSensitive: this.caseField.checked,
            regexp: this.reField.checked,
            replace: this.replaceField.value
          });

          if (!query.eq(this.query)) {
            this.query = query;
            this.view.dispatch({
              effects: setSearchQuery.of(query)
            });
          }
        }

        keydown(e) {
          if (runScopeHandlers(this.view, e, "search-panel")) {
            e.preventDefault();
          } else if (e.keyCode == 13 && e.target == this.searchField) {
            e.preventDefault();
            (e.shiftKey ? findPrevious : findNext)(this.view);
          } else if (e.keyCode == 13 && e.target == this.replaceField) {
            e.preventDefault();
            replaceNext(this.view);
          }
        }

        update(update) {
          var _iterator178 = _createForOfIteratorHelper(update.transactions),
              _step178;

          try {
            for (_iterator178.s(); !(_step178 = _iterator178.n()).done;) {
              var tr = _step178.value;

              var _iterator179 = _createForOfIteratorHelper(tr.effects),
                  _step179;

              try {
                for (_iterator179.s(); !(_step179 = _iterator179.n()).done;) {
                  var effect = _step179.value;
                  if (effect.is(setSearchQuery) && !effect.value.eq(this.query)) this.setQuery(effect.value);
                }
              } catch (err) {
                _iterator179.e(err);
              } finally {
                _iterator179.f();
              }
            }
          } catch (err) {
            _iterator178.e(err);
          } finally {
            _iterator178.f();
          }
        }

        setQuery(query) {
          this.query = query;
          this.searchField.value = query.search;
          this.replaceField.value = query.replace;
          this.caseField.checked = query.caseSensitive;
          this.reField.checked = query.regexp;
        }

        mount() {
          this.searchField.select();
        }

        get pos() {
          return 80;
        }

        get top() {
          return this.view.state.facet(searchConfigFacet).top;
        }

      };
      AnnounceMargin = 30;
      Break = /[\s\.,:;?!]/;
      baseTheme3 = /* @__PURE__ */EditorView.baseTheme({
        ".cm-panel.cm-search": {
          padding: "2px 6px 4px",
          position: "relative",
          "& [name=close]": {
            position: "absolute",
            top: "0",
            right: "4px",
            backgroundColor: "inherit",
            border: "none",
            font: "inherit",
            padding: 0,
            margin: 0
          },
          "& input, & button, & label": {
            margin: ".2em .6em .2em 0"
          },
          "& input[type=checkbox]": {
            marginRight: ".2em"
          },
          "& label": {
            fontSize: "80%",
            whiteSpace: "pre"
          }
        },
        "&light .cm-searchMatch": {
          backgroundColor: "#ffff0054"
        },
        "&dark .cm-searchMatch": {
          backgroundColor: "#00ffff8a"
        },
        "&light .cm-searchMatch-selected": {
          backgroundColor: "#ff6a0054"
        },
        "&dark .cm-searchMatch-selected": {
          backgroundColor: "#ff00ff8a"
        }
      });
      searchExtensions = [searchState, /* @__PURE__ */Prec.lowest(searchHighlighter), baseTheme3];
    }

  }); // node_modules/@codemirror/autocomplete/dist/index.js


  function toSet(chars) {
    var flat = Object.keys(chars).join("");
    var words = /\w/.test(flat);
    if (words) flat = flat.replace(/\w/g, "");
    return "[".concat(words ? "\\w" : "").concat(flat.replace(/[^\w\s]/g, "\\$&"), "]");
  }

  function prefixMatch(options) {
    var first = /* @__PURE__ */Object.create(null),
        rest = /* @__PURE__ */Object.create(null);

    var _iterator180 = _createForOfIteratorHelper(options),
        _step180;

    try {
      for (_iterator180.s(); !(_step180 = _iterator180.n()).done;) {
        var label = _step180.value.label;
        first[label[0]] = true;

        for (var _i136 = 1; _i136 < label.length; _i136++) {
          rest[label[_i136]] = true;
        }
      }
    } catch (err) {
      _iterator180.e(err);
    } finally {
      _iterator180.f();
    }

    var source = toSet(first) + toSet(rest) + "*$";
    return [new RegExp("^" + source), new RegExp(source)];
  }

  function completeFromList(list) {
    var options = list.map(o => typeof o == "string" ? {
      label: o
    } : o);

    var _ref55 = options.every(o => /^\w+$/.test(o.label)) ? [/\w*$/, /\w+$/] : prefixMatch(options),
        _ref56 = _slicedToArray(_ref55, 2),
        validFor = _ref56[0],
        match = _ref56[1];

    return context => {
      var token = context.matchBefore(match);
      return token || context.explicit ? {
        from: token ? token.from : context.pos,
        options,
        validFor
      } : null;
    };
  }

  function cur(state) {
    return state.selection.main.head;
  }

  function ensureAnchor(expr, start) {
    var _a2;

    var source = expr.source;
    var addStart = start && source[0] != "^",
        addEnd = source[source.length - 1] != "$";
    if (!addStart && !addEnd) return expr;
    return new RegExp("".concat(addStart ? "^" : "", "(?:").concat(source, ")").concat(addEnd ? "$" : ""), (_a2 = expr.flags) !== null && _a2 !== void 0 ? _a2 : expr.ignoreCase ? "i" : "");
  }

  function insertCompletionText(state, text, from, to) {
    return Object.assign(Object.assign({}, state.changeByRange(range => {
      if (range == state.selection.main) return {
        changes: {
          from,
          to,
          insert: text
        },
        range: EditorSelection.cursor(from + text.length)
      };
      var len = to - from;
      if (!range.empty || len && state.sliceDoc(range.from - len, range.from) != state.sliceDoc(from, to)) return {
        range
      };
      return {
        changes: {
          from: range.from - len,
          to: range.from,
          insert: text
        },
        range: EditorSelection.cursor(range.from - len + text.length)
      };
    })), {
      userEvent: "input.complete"
    });
  }

  function applyCompletion(view, option) {
    var apply = option.completion.apply || option.completion.label;
    var result = option.source;
    if (typeof apply == "string") view.dispatch(insertCompletionText(view.state, apply, result.from, result.to));else apply(view, option.completion, result.from, result.to);
  }

  function asSource(source) {
    if (!Array.isArray(source)) return source;
    var known = SourceCache.get(source);
    if (!known) SourceCache.set(source, known = completeFromList(source));
    return known;
  }

  function joinClass(a, b) {
    return a ? b ? a + " " + b : a : b;
  }

  function optionContent(config2) {
    var content2 = config2.addToOptions.slice();
    if (config2.icons) content2.push({
      render(completion) {
        var icon = document.createElement("div");
        icon.classList.add("cm-completionIcon");
        if (completion.type) icon.classList.add(...completion.type.split(/\s+/g).map(cls => "cm-completionIcon-" + cls));
        icon.setAttribute("aria-hidden", "true");
        return icon;
      },

      position: 20
    });
    content2.push({
      render(completion, _s, match) {
        var labelElt = document.createElement("span");
        labelElt.className = "cm-completionLabel";
        var label = completion.label,
            off = 0;

        for (var j = 1; j < match.length;) {
          var from = match[j++],
              to = match[j++];
          if (from > off) labelElt.appendChild(document.createTextNode(label.slice(off, from)));
          var span = labelElt.appendChild(document.createElement("span"));
          span.appendChild(document.createTextNode(label.slice(from, to)));
          span.className = "cm-completionMatchedText";
          off = to;
        }

        if (off < label.length) labelElt.appendChild(document.createTextNode(label.slice(off)));
        return labelElt;
      },

      position: 50
    }, {
      render(completion) {
        if (!completion.detail) return null;
        var detailElt = document.createElement("span");
        detailElt.className = "cm-completionDetail";
        detailElt.textContent = completion.detail;
        return detailElt;
      },

      position: 80
    });
    return content2.sort((a, b) => a.position - b.position).map(a => a.render);
  }

  function rangeAroundSelected(total, selected, max) {
    if (total <= max) return {
      from: 0,
      to: total
    };

    if (selected <= total >> 1) {
      var off2 = Math.floor(selected / max);
      return {
        from: off2 * max,
        to: (off2 + 1) * max
      };
    }

    var off = Math.floor((total - selected) / max);
    return {
      from: total - (off + 1) * max,
      to: total - off * max
    };
  }

  function completionTooltip(stateField) {
    return view => new CompletionTooltip(view, stateField);
  }

  function scrollIntoView2(container, element) {
    var parent = container.getBoundingClientRect();
    var self = element.getBoundingClientRect();
    if (self.top < parent.top) container.scrollTop -= parent.top - self.top;else if (self.bottom > parent.bottom) container.scrollTop += self.bottom - parent.bottom;
  }

  function score(option) {
    return (option.boost || 0) * 100 + (option.apply ? 10 : 0) + (option.info ? 5 : 0) + (option.type ? 1 : 0);
  }

  function sortOptions(active, state) {
    var options = [],
        i = 0;

    var _iterator181 = _createForOfIteratorHelper(active),
        _step181;

    try {
      for (_iterator181.s(); !(_step181 = _iterator181.n()).done;) {
        var a = _step181.value;

        if (a.hasResult()) {
          if (a.result.filter === false) {
            var getMatch = a.result.getMatch;

            var _iterator183 = _createForOfIteratorHelper(a.result.options),
                _step183;

            try {
              for (_iterator183.s(); !(_step183 = _iterator183.n()).done;) {
                var option = _step183.value;
                var match = [1e9 - i++];

                if (getMatch) {
                  var _iterator184 = _createForOfIteratorHelper(getMatch(option)),
                      _step184;

                  try {
                    for (_iterator184.s(); !(_step184 = _iterator184.n()).done;) {
                      var n = _step184.value;
                      match.push(n);
                    }
                  } catch (err) {
                    _iterator184.e(err);
                  } finally {
                    _iterator184.f();
                  }
                }

                options.push(new Option(option, a, match));
              }
            } catch (err) {
              _iterator183.e(err);
            } finally {
              _iterator183.f();
            }
          } else {
            var matcher = new FuzzyMatcher(state.sliceDoc(a.from, a.to)),
                _match2 = void 0;

            var _iterator185 = _createForOfIteratorHelper(a.result.options),
                _step185;

            try {
              for (_iterator185.s(); !(_step185 = _iterator185.n()).done;) {
                var _option = _step185.value;

                if (_match2 = matcher.match(_option.label)) {
                  if (_option.boost != null) _match2[0] += _option.boost;
                  options.push(new Option(_option, a, _match2));
                }
              }
            } catch (err) {
              _iterator185.e(err);
            } finally {
              _iterator185.f();
            }
          }
        }
      }
    } catch (err) {
      _iterator181.e(err);
    } finally {
      _iterator181.f();
    }

    var result = [],
        prev = null;

    var _iterator182 = _createForOfIteratorHelper(options.sort(cmpOption)),
        _step182;

    try {
      for (_iterator182.s(); !(_step182 = _iterator182.n()).done;) {
        var opt = _step182.value;
        if (!prev || prev.label != opt.completion.label || prev.detail != opt.completion.detail || prev.type != null && opt.completion.type != null && prev.type != opt.completion.type || prev.apply != opt.completion.apply) result.push(opt);else if (score(opt.completion) > score(prev)) result[result.length - 1] = opt;
        prev = opt.completion;
      }
    } catch (err) {
      _iterator182.e(err);
    } finally {
      _iterator182.f();
    }

    return result;
  }

  function sameResults(a, b) {
    if (a == b) return true;

    for (var iA = 0, iB = 0;;) {
      while (iA < a.length && !a[iA].hasResult) {
        iA++;
      }

      while (iB < b.length && !b[iB].hasResult) {
        iB++;
      }

      var endA = iA == a.length,
          endB = iB == b.length;
      if (endA || endB) return endA == endB;
      if (a[iA++].result != b[iB++].result) return false;
    }
  }

  function makeAttrs(id, selected) {
    return {
      "aria-autocomplete": "list",
      "aria-haspopup": "listbox",
      "aria-activedescendant": id + "-" + selected,
      "aria-controls": id
    };
  }

  function cmpOption(a, b) {
    var dScore = b.match[0] - a.match[0];
    if (dScore) return dScore;
    return a.completion.label.localeCompare(b.completion.label);
  }

  function getUserEvent(tr) {
    return tr.isUserEvent("input.type") ? "input" : tr.isUserEvent("delete.backward") ? "delete" : null;
  }

  function checkValid(validFor, state, from, to) {
    if (!validFor) return false;
    var text = state.sliceDoc(from, to);
    return typeof validFor == "function" ? validFor(text, from, to, state) : ensureAnchor(validFor, true).test(text);
  }

  function moveCompletionSelection(forward) {
    var by = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "option";
    return view => {
      var cState = view.state.field(completionState, false);
      if (!cState || !cState.open || Date.now() - cState.open.timestamp < CompletionInteractMargin) return false;
      var step = 1,
          tooltip;
      if (by == "page" && (tooltip = getTooltip(view, cState.open.tooltip))) step = Math.max(2, Math.floor(tooltip.dom.offsetHeight / tooltip.dom.querySelector("li").offsetHeight) - 1);
      var selected = cState.open.selected + step * (forward ? 1 : -1),
          length = cState.open.options.length;
      if (selected < 0) selected = by == "page" ? 0 : length - 1;else if (selected >= length) selected = by == "page" ? length - 1 : 0;
      view.dispatch({
        effects: setSelectedEffect.of(selected)
      });
      return true;
    };
  }

  function closeBrackets() {
    return [inputHandler2, bracketState];
  }

  function closing(ch) {
    for (var _i137 = 0; _i137 < definedClosing.length; _i137 += 2) {
      if (definedClosing.charCodeAt(_i137) == ch) return definedClosing.charAt(_i137 + 1);
    }

    return fromCodePoint(ch < 128 ? ch : ch + 1);
  }

  function config(state, pos) {
    return state.languageDataAt("closeBrackets", pos)[0] || defaults2;
  }

  function insertBracket(state, bracket2) {
    var conf = config(state, state.selection.main.head);
    var tokens = conf.brackets || defaults2.brackets;

    var _iterator186 = _createForOfIteratorHelper(tokens),
        _step186;

    try {
      for (_iterator186.s(); !(_step186 = _iterator186.n()).done;) {
        var tok = _step186.value;
        var closed = closing(codePointAt(tok, 0));
        if (bracket2 == tok) return closed == tok ? handleSame(state, tok, tokens.indexOf(tok + tok + tok) > -1) : handleOpen(state, tok, closed, conf.before || defaults2.before);
        if (bracket2 == closed && closedBracketAt(state, state.selection.main.from)) return handleClose(state, tok, closed);
      }
    } catch (err) {
      _iterator186.e(err);
    } finally {
      _iterator186.f();
    }

    return null;
  }

  function closedBracketAt(state, pos) {
    var found = false;
    state.field(bracketState).between(0, state.doc.length, from => {
      if (from == pos) found = true;
    });
    return found;
  }

  function nextChar(doc2, pos) {
    var next = doc2.sliceString(pos, pos + 2);
    return next.slice(0, codePointSize(codePointAt(next, 0)));
  }

  function prevChar(doc2, pos) {
    var prev = doc2.sliceString(pos - 2, pos);
    return codePointSize(codePointAt(prev, 0)) == prev.length ? prev : prev.slice(1);
  }

  function handleOpen(state, open, close, closeBefore) {
    var dont = null,
        changes = state.changeByRange(range => {
      if (!range.empty) return {
        changes: [{
          insert: open,
          from: range.from
        }, {
          insert: close,
          from: range.to
        }],
        effects: closeBracketEffect.of(range.to + open.length),
        range: EditorSelection.range(range.anchor + open.length, range.head + open.length)
      };
      var next = nextChar(state.doc, range.head);
      if (!next || /\s/.test(next) || closeBefore.indexOf(next) > -1) return {
        changes: {
          insert: open + close,
          from: range.head
        },
        effects: closeBracketEffect.of(range.head + open.length),
        range: EditorSelection.cursor(range.head + open.length)
      };
      return {
        range: dont = range
      };
    });
    return dont ? null : state.update(changes, {
      scrollIntoView: true,
      userEvent: "input.type"
    });
  }

  function handleClose(state, _open, close) {
    var dont = null,
        moved = state.selection.ranges.map(range => {
      if (range.empty && nextChar(state.doc, range.head) == close) return EditorSelection.cursor(range.head + close.length);
      return dont = range;
    });
    return dont ? null : state.update({
      selection: EditorSelection.create(moved, state.selection.mainIndex),
      scrollIntoView: true,
      effects: state.selection.ranges.map(_ref57 => {
        var from = _ref57.from;
        return skipBracketEffect.of(from);
      })
    });
  }

  function handleSame(state, token, allowTriple) {
    var dont = null,
        changes = state.changeByRange(range => {
      if (!range.empty) return {
        changes: [{
          insert: token,
          from: range.from
        }, {
          insert: token,
          from: range.to
        }],
        effects: closeBracketEffect.of(range.to + token.length),
        range: EditorSelection.range(range.anchor + token.length, range.head + token.length)
      };
      var pos = range.head,
          next = nextChar(state.doc, pos);

      if (next == token) {
        if (nodeStart(state, pos)) {
          return {
            changes: {
              insert: token + token,
              from: pos
            },
            effects: closeBracketEffect.of(pos + token.length),
            range: EditorSelection.cursor(pos + token.length)
          };
        } else if (closedBracketAt(state, pos)) {
          var isTriple = allowTriple && state.sliceDoc(pos, pos + token.length * 3) == token + token + token;
          return {
            range: EditorSelection.cursor(pos + token.length * (isTriple ? 3 : 1)),
            effects: skipBracketEffect.of(pos)
          };
        }
      } else if (allowTriple && state.sliceDoc(pos - 2 * token.length, pos) == token + token && nodeStart(state, pos - 2 * token.length)) {
        return {
          changes: {
            insert: token + token + token + token,
            from: pos
          },
          effects: closeBracketEffect.of(pos + token.length),
          range: EditorSelection.cursor(pos + token.length)
        };
      } else if (state.charCategorizer(pos)(next) != CharCategory.Word) {
        var prev = state.sliceDoc(pos - 1, pos);
        if (prev != token && state.charCategorizer(pos)(prev) != CharCategory.Word && !probablyInString(state, pos, token)) return {
          changes: {
            insert: token + token,
            from: pos
          },
          effects: closeBracketEffect.of(pos + token.length),
          range: EditorSelection.cursor(pos + token.length)
        };
      }

      return {
        range: dont = range
      };
    });
    return dont ? null : state.update(changes, {
      scrollIntoView: true,
      userEvent: "input.type"
    });
  }

  function nodeStart(state, pos) {
    var tree = syntaxTree(state).resolveInner(pos + 1);
    return tree.parent && tree.from == pos;
  }

  function probablyInString(state, pos, quoteToken) {
    var node = syntaxTree(state).resolveInner(pos, -1);

    for (var _i138 = 0; _i138 < 5; _i138++) {
      if (state.sliceDoc(node.from, node.from + quoteToken.length) == quoteToken) return true;
      var parent = node.to == pos && node.parent;
      if (!parent) break;
      node = parent;
    }

    return false;
  }

  function autocompletion() {
    var config2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return [completionState, completionConfig.of(config2), completionPlugin, completionKeymapExt, baseTheme4];
  }

  var CompletionContext, Option, SourceCache, FuzzyMatcher, completionConfig, CompletionTooltip, CompletionDialog, CompletionState, baseAttrs, none3, ActiveSource, ActiveResult, startCompletionEffect, closeCompletionEffect, setActiveEffect, setSelectedEffect, completionState, CompletionInteractMargin, acceptCompletion, startCompletion, closeCompletion, RunningQuery, DebounceTime, MaxUpdateCount, MinAbortTime, completionPlugin, baseTheme4, defaults2, closeBracketEffect, skipBracketEffect, closedBracket, bracketState, definedClosing, android, inputHandler2, deleteBracketPair, closeBracketsKeymap, completionKeymap, completionKeymapExt;

  var init_dist8 = __esm({
    "node_modules/@codemirror/autocomplete/dist/index.js"() {
      init_dist();
      init_dist2();
      init_dist5();
      CompletionContext = class {
        constructor(state, pos, explicit) {
          this.state = state;
          this.pos = pos;
          this.explicit = explicit;
          this.abortListeners = [];
        }

        tokenBefore(types2) {
          var token = syntaxTree(this.state).resolveInner(this.pos, -1);

          while (token && types2.indexOf(token.name) < 0) {
            token = token.parent;
          }

          return token ? {
            from: token.from,
            to: this.pos,
            text: this.state.sliceDoc(token.from, this.pos),
            type: token.type
          } : null;
        }

        matchBefore(expr) {
          var line = this.state.doc.lineAt(this.pos);
          var start = Math.max(line.from, this.pos - 250);
          var str = line.text.slice(start - line.from, this.pos - line.from);
          var found = str.search(ensureAnchor(expr, false));
          return found < 0 ? null : {
            from: start + found,
            to: this.pos,
            text: str.slice(found)
          };
        }

        get aborted() {
          return this.abortListeners == null;
        }

        addEventListener(type, listener) {
          if (type == "abort" && this.abortListeners) this.abortListeners.push(listener);
        }

      };
      Option = class {
        constructor(completion, source, match) {
          this.completion = completion;
          this.source = source;
          this.match = match;
        }

      };
      SourceCache = /* @__PURE__ */new WeakMap();
      FuzzyMatcher = class {
        constructor(pattern) {
          this.pattern = pattern;
          this.chars = [];
          this.folded = [];
          this.any = [];
          this.precise = [];
          this.byWord = [];

          for (var p = 0; p < pattern.length;) {
            var char = codePointAt(pattern, p),
                size = codePointSize(char);
            this.chars.push(char);
            var part = pattern.slice(p, p + size),
                upper = part.toUpperCase();
            this.folded.push(codePointAt(upper == part ? part.toLowerCase() : upper, 0));
            p += size;
          }

          this.astral = pattern.length != this.chars.length;
        }

        match(word) {
          if (this.pattern.length == 0) return [0];
          if (word.length < this.pattern.length) return null;
          var chars = this.chars,
              folded = this.folded,
              any = this.any,
              precise = this.precise,
              byWord = this.byWord;

          if (chars.length == 1) {
            var first = codePointAt(word, 0);
            return first == chars[0] ? [0, 0, codePointSize(first)] : first == folded[0] ? [-200, 0, codePointSize(first)] : null;
          }

          var direct = word.indexOf(this.pattern);
          if (direct == 0) return [0, 0, this.pattern.length];
          var len = chars.length,
              anyTo = 0;

          if (direct < 0) {
            for (var _i139 = 0, e = Math.min(word.length, 200); _i139 < e && anyTo < len;) {
              var next = codePointAt(word, _i139);
              if (next == chars[anyTo] || next == folded[anyTo]) any[anyTo++] = _i139;
              _i139 += codePointSize(next);
            }

            if (anyTo < len) return null;
          }

          var preciseTo = 0;
          var byWordTo = 0,
              byWordFolded = false;
          var adjacentTo = 0,
              adjacentStart = -1,
              adjacentEnd = -1;
          var hasLower = /[a-z]/.test(word),
              wordAdjacent = true;

          for (var _i140 = 0, _e2 = Math.min(word.length, 200), prevType = 0; _i140 < _e2 && byWordTo < len;) {
            var _next3 = codePointAt(word, _i140);

            if (direct < 0) {
              if (preciseTo < len && _next3 == chars[preciseTo]) precise[preciseTo++] = _i140;

              if (adjacentTo < len) {
                if (_next3 == chars[adjacentTo] || _next3 == folded[adjacentTo]) {
                  if (adjacentTo == 0) adjacentStart = _i140;
                  adjacentEnd = _i140 + 1;
                  adjacentTo++;
                } else {
                  adjacentTo = 0;
                }
              }
            }

            var ch = void 0,
                type = _next3 < 255 ? _next3 >= 48 && _next3 <= 57 || _next3 >= 97 && _next3 <= 122 ? 2 : _next3 >= 65 && _next3 <= 90 ? 1 : 0 : (ch = fromCodePoint(_next3)) != ch.toLowerCase() ? 1 : ch != ch.toUpperCase() ? 2 : 0;

            if (!_i140 || type == 1 && hasLower || prevType == 0 && type != 0) {
              if (chars[byWordTo] == _next3 || folded[byWordTo] == _next3 && (byWordFolded = true)) byWord[byWordTo++] = _i140;else if (byWord.length) wordAdjacent = false;
            }

            prevType = type;
            _i140 += codePointSize(_next3);
          }

          if (byWordTo == len && byWord[0] == 0 && wordAdjacent) return this.result(-100 + (byWordFolded ? -200 : 0), byWord, word);
          if (adjacentTo == len && adjacentStart == 0) return [-200 - word.length, 0, adjacentEnd];
          if (direct > -1) return [-700 - word.length, direct, direct + this.pattern.length];
          if (adjacentTo == len) return [-200 + -700 - word.length, adjacentStart, adjacentEnd];
          if (byWordTo == len) return this.result(-100 + (byWordFolded ? -200 : 0) + -700 + (wordAdjacent ? 0 : -1100), byWord, word);
          return chars.length == 2 ? null : this.result((any[0] ? -700 : 0) + -200 + -1100, any, word);
        }

        result(score2, positions, word) {
          var result = [score2 - word.length],
              i = 1;

          var _iterator187 = _createForOfIteratorHelper(positions),
              _step187;

          try {
            for (_iterator187.s(); !(_step187 = _iterator187.n()).done;) {
              var pos = _step187.value;
              var to = pos + (this.astral ? codePointSize(codePointAt(word, pos)) : 1);
              if (i > 1 && result[i - 1] == pos) result[i - 1] = to;else {
                result[i++] = pos;
                result[i++] = to;
              }
            }
          } catch (err) {
            _iterator187.e(err);
          } finally {
            _iterator187.f();
          }

          return result;
        }

      };
      completionConfig = /* @__PURE__ */Facet.define({
        combine(configs) {
          return combineConfig(configs, {
            activateOnTyping: true,
            override: null,
            closeOnBlur: true,
            maxRenderedOptions: 100,
            defaultKeymap: true,
            optionClass: () => "",
            aboveCursor: false,
            icons: true,
            addToOptions: []
          }, {
            defaultKeymap: (a, b) => a && b,
            closeOnBlur: (a, b) => a && b,
            icons: (a, b) => a && b,
            optionClass: (a, b) => c => joinClass(a(c), b(c)),
            addToOptions: (a, b) => a.concat(b)
          });
        }

      });
      CompletionTooltip = class {
        constructor(view, stateField) {
          this.view = view;
          this.stateField = stateField;
          this.info = null;
          this.placeInfo = {
            read: () => this.measureInfo(),
            write: pos => this.positionInfo(pos),
            key: this
          };
          var cState = view.state.field(stateField);
          var _cState$open = cState.open,
              options = _cState$open.options,
              selected = _cState$open.selected;
          var config2 = view.state.facet(completionConfig);
          this.optionContent = optionContent(config2);
          this.optionClass = config2.optionClass;
          this.range = rangeAroundSelected(options.length, selected, config2.maxRenderedOptions);
          this.dom = document.createElement("div");
          this.dom.className = "cm-tooltip-autocomplete";
          this.dom.addEventListener("mousedown", e => {
            for (var dom = e.target, match; dom && dom != this.dom; dom = dom.parentNode) {
              if (dom.nodeName == "LI" && (match = /-(\d+)$/.exec(dom.id)) && +match[1] < options.length) {
                applyCompletion(view, options[+match[1]]);
                e.preventDefault();
                return;
              }
            }
          });
          this.list = this.dom.appendChild(this.createListBox(options, cState.id, this.range));
          this.list.addEventListener("scroll", () => {
            if (this.info) this.view.requestMeasure(this.placeInfo);
          });
        }

        mount() {
          this.updateSel();
        }

        update(update) {
          if (update.state.field(this.stateField) != update.startState.field(this.stateField)) this.updateSel();
        }

        positioned() {
          if (this.info) this.view.requestMeasure(this.placeInfo);
        }

        updateSel() {
          var cState = this.view.state.field(this.stateField),
              open = cState.open;

          if (open.selected < this.range.from || open.selected >= this.range.to) {
            this.range = rangeAroundSelected(open.options.length, open.selected, this.view.state.facet(completionConfig).maxRenderedOptions);
            this.list.remove();
            this.list = this.dom.appendChild(this.createListBox(open.options, cState.id, this.range));
            this.list.addEventListener("scroll", () => {
              if (this.info) this.view.requestMeasure(this.placeInfo);
            });
          }

          if (this.updateSelectedOption(open.selected)) {
            if (this.info) {
              this.info.remove();
              this.info = null;
            }

            var completion = open.options[open.selected].completion;
            var info = completion.info;
            if (!info) return;
            var infoResult = typeof info === "string" ? document.createTextNode(info) : info(completion);
            if (!infoResult) return;

            if ("then" in infoResult) {
              infoResult.then(node => {
                if (node && this.view.state.field(this.stateField, false) == cState) this.addInfoPane(node);
              }).catch(e => logException(this.view.state, e, "completion info"));
            } else {
              this.addInfoPane(infoResult);
            }
          }
        }

        addInfoPane(content2) {
          var dom = this.info = document.createElement("div");
          dom.className = "cm-tooltip cm-completionInfo";
          dom.appendChild(content2);
          this.dom.appendChild(dom);
          this.view.requestMeasure(this.placeInfo);
        }

        updateSelectedOption(selected) {
          var set = null;

          for (var opt = this.list.firstChild, _i141 = this.range.from; opt; opt = opt.nextSibling, _i141++) {
            if (_i141 == selected) {
              if (!opt.hasAttribute("aria-selected")) {
                opt.setAttribute("aria-selected", "true");
                set = opt;
              }
            } else {
              if (opt.hasAttribute("aria-selected")) opt.removeAttribute("aria-selected");
            }
          }

          if (set) scrollIntoView2(this.list, set);
          return set;
        }

        measureInfo() {
          var sel = this.dom.querySelector("[aria-selected]");
          if (!sel || !this.info) return null;
          var listRect = this.dom.getBoundingClientRect();
          var infoRect = this.info.getBoundingClientRect();
          var selRect = sel.getBoundingClientRect();
          if (selRect.top > Math.min(innerHeight, listRect.bottom) - 10 || selRect.bottom < Math.max(0, listRect.top) + 10) return null;
          var top2 = Math.max(0, Math.min(selRect.top, innerHeight - infoRect.height)) - listRect.top;
          var left = this.view.textDirection == Direction.RTL;
          var spaceLeft = listRect.left,
              spaceRight = innerWidth - listRect.right;
          if (left && spaceLeft < Math.min(infoRect.width, spaceRight)) left = false;else if (!left && spaceRight < Math.min(infoRect.width, spaceLeft)) left = true;
          return {
            top: top2,
            left
          };
        }

        positionInfo(pos) {
          if (this.info) {
            this.info.style.top = (pos ? pos.top : -1e6) + "px";

            if (pos) {
              this.info.classList.toggle("cm-completionInfo-left", pos.left);
              this.info.classList.toggle("cm-completionInfo-right", !pos.left);
            }
          }
        }

        createListBox(options, id, range) {
          var ul = document.createElement("ul");
          ul.id = id;
          ul.setAttribute("role", "listbox");
          ul.setAttribute("aria-expanded", "true");
          ul.setAttribute("aria-label", this.view.state.phrase("Completions"));

          for (var _i142 = range.from; _i142 < range.to; _i142++) {
            var _options$_i = options[_i142],
                completion = _options$_i.completion,
                match = _options$_i.match;
            var li = ul.appendChild(document.createElement("li"));
            li.id = id + "-" + _i142;
            li.setAttribute("role", "option");
            var cls = this.optionClass(completion);
            if (cls) li.className = cls;

            var _iterator188 = _createForOfIteratorHelper(this.optionContent),
                _step188;

            try {
              for (_iterator188.s(); !(_step188 = _iterator188.n()).done;) {
                var source = _step188.value;
                var node = source(completion, this.view.state, match);
                if (node) li.appendChild(node);
              }
            } catch (err) {
              _iterator188.e(err);
            } finally {
              _iterator188.f();
            }
          }

          if (range.from) ul.classList.add("cm-completionListIncompleteTop");
          if (range.to < options.length) ul.classList.add("cm-completionListIncompleteBottom");
          return ul;
        }

      };
      CompletionDialog = class {
        constructor(options, attrs, tooltip, timestamp, selected) {
          this.options = options;
          this.attrs = attrs;
          this.tooltip = tooltip;
          this.timestamp = timestamp;
          this.selected = selected;
        }

        setSelected(selected, id) {
          return selected == this.selected || selected >= this.options.length ? this : new CompletionDialog(this.options, makeAttrs(id, selected), this.tooltip, this.timestamp, selected);
        }

        static build(active, state, id, prev, conf) {
          var options = sortOptions(active, state);
          if (!options.length) return null;
          var selected = 0;

          if (prev && prev.selected) {
            var selectedValue = prev.options[prev.selected].completion;

            for (var _i143 = 0; _i143 < options.length; _i143++) {
              if (options[_i143].completion == selectedValue) {
                selected = _i143;
                break;
              }
            }
          }

          return new CompletionDialog(options, makeAttrs(id, selected), {
            pos: active.reduce((a, b) => b.hasResult() ? Math.min(a, b.from) : a, 1e8),
            create: completionTooltip(completionState),
            above: conf.aboveCursor
          }, prev ? prev.timestamp : Date.now(), selected);
        }

        map(changes) {
          return new CompletionDialog(this.options, this.attrs, Object.assign(Object.assign({}, this.tooltip), {
            pos: changes.mapPos(this.tooltip.pos)
          }), this.timestamp, this.selected);
        }

      };
      CompletionState = class {
        constructor(active, id, open) {
          this.active = active;
          this.id = id;
          this.open = open;
        }

        static start() {
          return new CompletionState(none3, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
        }

        update(tr) {
          var state = tr.state,
              conf = state.facet(completionConfig);
          var sources = conf.override || state.languageDataAt("autocomplete", cur(state)).map(asSource);
          var active = sources.map(source => {
            var value = this.active.find(s => s.source == source) || new ActiveSource(source, this.active.some(a => a.state != 0) ? 1 : 0);
            return value.update(tr, conf);
          });
          if (active.length == this.active.length && active.every((a, i) => a == this.active[i])) active = this.active;
          var open = tr.selection || active.some(a => a.hasResult() && tr.changes.touchesRange(a.from, a.to)) || !sameResults(active, this.active) ? CompletionDialog.build(active, state, this.id, this.open, conf) : this.open && tr.docChanged ? this.open.map(tr.changes) : this.open;
          if (!open && active.every(a => a.state != 1) && active.some(a => a.hasResult())) active = active.map(a => a.hasResult() ? new ActiveSource(a.source, 0) : a);

          var _iterator189 = _createForOfIteratorHelper(tr.effects),
              _step189;

          try {
            for (_iterator189.s(); !(_step189 = _iterator189.n()).done;) {
              var effect = _step189.value;
              if (effect.is(setSelectedEffect)) open = open && open.setSelected(effect.value, this.id);
            }
          } catch (err) {
            _iterator189.e(err);
          } finally {
            _iterator189.f();
          }

          return active == this.active && open == this.open ? this : new CompletionState(active, this.id, open);
        }

        get tooltip() {
          return this.open ? this.open.tooltip : null;
        }

        get attrs() {
          return this.open ? this.open.attrs : baseAttrs;
        }

      };
      baseAttrs = {
        "aria-autocomplete": "list"
      };
      none3 = [];
      ActiveSource = class {
        constructor(source, state) {
          var explicitPos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
          this.source = source;
          this.state = state;
          this.explicitPos = explicitPos;
        }

        hasResult() {
          return false;
        }

        update(tr, conf) {
          var event = getUserEvent(tr),
              value = this;
          if (event) value = value.handleUserEvent(tr, event, conf);else if (tr.docChanged) value = value.handleChange(tr);else if (tr.selection && value.state != 0) value = new ActiveSource(value.source, 0);

          var _iterator190 = _createForOfIteratorHelper(tr.effects),
              _step190;

          try {
            for (_iterator190.s(); !(_step190 = _iterator190.n()).done;) {
              var effect = _step190.value;
              if (effect.is(startCompletionEffect)) value = new ActiveSource(value.source, 1, effect.value ? cur(tr.state) : -1);else if (effect.is(closeCompletionEffect)) value = new ActiveSource(value.source, 0);else if (effect.is(setActiveEffect)) {
                var _iterator191 = _createForOfIteratorHelper(effect.value),
                    _step191;

                try {
                  for (_iterator191.s(); !(_step191 = _iterator191.n()).done;) {
                    var active = _step191.value;
                    if (active.source == value.source) value = active;
                  }
                } catch (err) {
                  _iterator191.e(err);
                } finally {
                  _iterator191.f();
                }
              }
            }
          } catch (err) {
            _iterator190.e(err);
          } finally {
            _iterator190.f();
          }

          return value;
        }

        handleUserEvent(tr, type, conf) {
          return type == "delete" || !conf.activateOnTyping ? this.map(tr.changes) : new ActiveSource(this.source, 1);
        }

        handleChange(tr) {
          return tr.changes.touchesRange(cur(tr.startState)) ? new ActiveSource(this.source, 0) : this.map(tr.changes);
        }

        map(changes) {
          return changes.empty || this.explicitPos < 0 ? this : new ActiveSource(this.source, this.state, changes.mapPos(this.explicitPos));
        }

      };
      ActiveResult = class extends ActiveSource {
        constructor(source, explicitPos, result, from, to) {
          super(source, 2, explicitPos);
          this.result = result;
          this.from = from;
          this.to = to;
        }

        hasResult() {
          return true;
        }

        handleUserEvent(tr, type, conf) {
          var _a2;

          var from = tr.changes.mapPos(this.from),
              to = tr.changes.mapPos(this.to, 1);
          var pos = cur(tr.state);
          if ((this.explicitPos < 0 ? pos <= from : pos < this.from) || pos > to || type == "delete" && cur(tr.startState) == this.from) return new ActiveSource(this.source, type == "input" && conf.activateOnTyping ? 1 : 0);
          var explicitPos = this.explicitPos < 0 ? -1 : tr.changes.mapPos(this.explicitPos),
              updated;
          if (checkValid(this.result.validFor, tr.state, from, to)) return new ActiveResult(this.source, explicitPos, this.result, from, to);
          if (this.result.update && (updated = this.result.update(this.result, from, to, new CompletionContext(tr.state, pos, explicitPos >= 0)))) return new ActiveResult(this.source, explicitPos, updated, updated.from, (_a2 = updated.to) !== null && _a2 !== void 0 ? _a2 : cur(tr.state));
          return new ActiveSource(this.source, 1, explicitPos);
        }

        handleChange(tr) {
          return tr.changes.touchesRange(this.from, this.to) ? new ActiveSource(this.source, 0) : this.map(tr.changes);
        }

        map(mapping) {
          return mapping.empty ? this : new ActiveResult(this.source, this.explicitPos < 0 ? -1 : mapping.mapPos(this.explicitPos), this.result, mapping.mapPos(this.from), mapping.mapPos(this.to, 1));
        }

      };
      startCompletionEffect = /* @__PURE__ */StateEffect.define();
      closeCompletionEffect = /* @__PURE__ */StateEffect.define();
      setActiveEffect = /* @__PURE__ */StateEffect.define({
        map(sources, mapping) {
          return sources.map(s => s.map(mapping));
        }

      });
      setSelectedEffect = /* @__PURE__ */StateEffect.define();
      completionState = /* @__PURE__ */StateField.define({
        create() {
          return CompletionState.start();
        },

        update(value, tr) {
          return value.update(tr);
        },

        provide: f => [showTooltip.from(f, val => val.tooltip), EditorView.contentAttributes.from(f, state => state.attrs)]
      });
      CompletionInteractMargin = 75;

      acceptCompletion = view => {
        var cState = view.state.field(completionState, false);
        if (view.state.readOnly || !cState || !cState.open || Date.now() - cState.open.timestamp < CompletionInteractMargin) return false;
        applyCompletion(view, cState.open.options[cState.open.selected]);
        return true;
      };

      startCompletion = view => {
        var cState = view.state.field(completionState, false);
        if (!cState) return false;
        view.dispatch({
          effects: startCompletionEffect.of(true)
        });
        return true;
      };

      closeCompletion = view => {
        var cState = view.state.field(completionState, false);
        if (!cState || !cState.active.some(a => a.state != 0)) return false;
        view.dispatch({
          effects: closeCompletionEffect.of(null)
        });
        return true;
      };

      RunningQuery = class {
        constructor(active, context) {
          this.active = active;
          this.context = context;
          this.time = Date.now();
          this.updates = [];
          this.done = void 0;
        }

      };
      DebounceTime = 50;
      MaxUpdateCount = 50;
      MinAbortTime = 1e3;
      completionPlugin = /* @__PURE__ */ViewPlugin.fromClass(class {
        constructor(view) {
          this.view = view;
          this.debounceUpdate = -1;
          this.running = [];
          this.debounceAccept = -1;
          this.composing = 0;

          var _iterator192 = _createForOfIteratorHelper(view.state.field(completionState).active),
              _step192;

          try {
            for (_iterator192.s(); !(_step192 = _iterator192.n()).done;) {
              var active = _step192.value;
              if (active.state == 1) this.startQuery(active);
            }
          } catch (err) {
            _iterator192.e(err);
          } finally {
            _iterator192.f();
          }
        }

        update(update) {
          var cState = update.state.field(completionState);
          if (!update.selectionSet && !update.docChanged && update.startState.field(completionState) == cState) return;
          var doesReset = update.transactions.some(tr => {
            return (tr.selection || tr.docChanged) && !getUserEvent(tr);
          });

          for (var _i144 = 0; _i144 < this.running.length; _i144++) {
            var query = this.running[_i144];

            if (doesReset || query.updates.length + update.transactions.length > MaxUpdateCount && Date.now() - query.time > MinAbortTime) {
              var _iterator193 = _createForOfIteratorHelper(query.context.abortListeners),
                  _step193;

              try {
                for (_iterator193.s(); !(_step193 = _iterator193.n()).done;) {
                  var handler = _step193.value;

                  try {
                    handler();
                  } catch (e) {
                    logException(this.view.state, e);
                  }
                }
              } catch (err) {
                _iterator193.e(err);
              } finally {
                _iterator193.f();
              }

              query.context.abortListeners = null;
              this.running.splice(_i144--, 1);
            } else {
              query.updates.push(...update.transactions);
            }
          }

          if (this.debounceUpdate > -1) clearTimeout(this.debounceUpdate);
          this.debounceUpdate = cState.active.some(a => a.state == 1 && !this.running.some(q => q.active.source == a.source)) ? setTimeout(() => this.startUpdate(), DebounceTime) : -1;

          if (this.composing != 0) {
            var _iterator194 = _createForOfIteratorHelper(update.transactions),
                _step194;

            try {
              for (_iterator194.s(); !(_step194 = _iterator194.n()).done;) {
                var tr = _step194.value;
                if (getUserEvent(tr) == "input") this.composing = 2;else if (this.composing == 2 && tr.selection) this.composing = 3;
              }
            } catch (err) {
              _iterator194.e(err);
            } finally {
              _iterator194.f();
            }
          }
        }

        startUpdate() {
          var _this7 = this;

          this.debounceUpdate = -1;
          var state = this.view.state,
              cState = state.field(completionState);

          var _iterator195 = _createForOfIteratorHelper(cState.active),
              _step195;

          try {
            var _loop17 = function _loop17() {
              var active = _step195.value;
              if (active.state == 1 && !_this7.running.some(r => r.active.source == active.source)) _this7.startQuery(active);
            };

            for (_iterator195.s(); !(_step195 = _iterator195.n()).done;) {
              _loop17();
            }
          } catch (err) {
            _iterator195.e(err);
          } finally {
            _iterator195.f();
          }
        }

        startQuery(active) {
          var state = this.view.state,
              pos = cur(state);
          var context = new CompletionContext(state, pos, active.explicitPos == pos);
          var pending = new RunningQuery(active, context);
          this.running.push(pending);
          Promise.resolve(active.source(context)).then(result => {
            if (!pending.context.aborted) {
              pending.done = result || null;
              this.scheduleAccept();
            }
          }, err => {
            this.view.dispatch({
              effects: closeCompletionEffect.of(null)
            });
            logException(this.view.state, err);
          });
        }

        scheduleAccept() {
          if (this.running.every(q => q.done !== void 0)) this.accept();else if (this.debounceAccept < 0) this.debounceAccept = setTimeout(() => this.accept(), DebounceTime);
        }

        accept() {
          var _this8 = this;

          var _a2;

          if (this.debounceAccept > -1) clearTimeout(this.debounceAccept);
          this.debounceAccept = -1;
          var updated = [];
          var conf = this.view.state.facet(completionConfig);

          var _loop18 = function _loop18(_i146) {
            var query = _this8.running[_i146];

            if (query.done === void 0) {
              _i145 = _i146;
              return "continue";
            }

            _this8.running.splice(_i146--, 1);

            if (query.done) {
              var active = new ActiveResult(query.active.source, query.active.explicitPos, query.done, query.done.from, (_a2 = query.done.to) !== null && _a2 !== void 0 ? _a2 : cur(query.updates.length ? query.updates[0].startState : _this8.view.state));

              var _iterator196 = _createForOfIteratorHelper(query.updates),
                  _step196;

              try {
                for (_iterator196.s(); !(_step196 = _iterator196.n()).done;) {
                  var tr = _step196.value;
                  active = active.update(tr, conf);
                }
              } catch (err) {
                _iterator196.e(err);
              } finally {
                _iterator196.f();
              }

              if (active.hasResult()) {
                updated.push(active);
                _i145 = _i146;
                return "continue";
              }
            }

            var current = _this8.view.state.field(completionState).active.find(a => a.source == query.active.source);

            if (current && current.state == 1) {
              if (query.done == null) {
                var _active = new ActiveSource(query.active.source, 0);

                var _iterator197 = _createForOfIteratorHelper(query.updates),
                    _step197;

                try {
                  for (_iterator197.s(); !(_step197 = _iterator197.n()).done;) {
                    var _tr2 = _step197.value;
                    _active = _active.update(_tr2, conf);
                  }
                } catch (err) {
                  _iterator197.e(err);
                } finally {
                  _iterator197.f();
                }

                if (_active.state != 1) updated.push(_active);
              } else {
                _this8.startQuery(current);
              }
            }

            _i145 = _i146;
          };

          for (var _i145 = 0; _i145 < this.running.length; _i145++) {
            var _ret4 = _loop18(_i145);

            if (_ret4 === "continue") continue;
          }

          if (updated.length) this.view.dispatch({
            effects: setActiveEffect.of(updated)
          });
        }

      }, {
        eventHandlers: {
          blur() {
            var state = this.view.state.field(completionState, false);
            if (state && state.tooltip && this.view.state.facet(completionConfig).closeOnBlur) this.view.dispatch({
              effects: closeCompletionEffect.of(null)
            });
          },

          compositionstart() {
            this.composing = 1;
          },

          compositionend() {
            if (this.composing == 3) {
              setTimeout(() => this.view.dispatch({
                effects: startCompletionEffect.of(false)
              }), 20);
            }

            this.composing = 0;
          }

        }
      });
      baseTheme4 = /* @__PURE__ */EditorView.baseTheme({
        ".cm-tooltip.cm-tooltip-autocomplete": {
          "& > ul": {
            fontFamily: "monospace",
            whiteSpace: "nowrap",
            overflow: "hidden auto",
            maxWidth_fallback: "700px",
            maxWidth: "min(700px, 95vw)",
            minWidth: "250px",
            maxHeight: "10em",
            listStyle: "none",
            margin: 0,
            padding: 0,
            "& > li": {
              overflowX: "hidden",
              textOverflow: "ellipsis",
              cursor: "pointer",
              padding: "1px 3px",
              lineHeight: 1.2
            }
          }
        },
        "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
          background: "#17c",
          color: "white"
        },
        "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
          background: "#347",
          color: "white"
        },
        ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
          content: '"\xB7\xB7\xB7"',
          opacity: 0.5,
          display: "block",
          textAlign: "center"
        },
        ".cm-tooltip.cm-completionInfo": {
          position: "absolute",
          padding: "3px 9px",
          width: "max-content",
          maxWidth: "300px"
        },
        ".cm-completionInfo.cm-completionInfo-left": {
          right: "100%"
        },
        ".cm-completionInfo.cm-completionInfo-right": {
          left: "100%"
        },
        "&light .cm-snippetField": {
          backgroundColor: "#00000022"
        },
        "&dark .cm-snippetField": {
          backgroundColor: "#ffffff22"
        },
        ".cm-snippetFieldPosition": {
          verticalAlign: "text-top",
          width: 0,
          height: "1.15em",
          margin: "0 -0.7px -.7em",
          borderLeft: "1.4px dotted #888"
        },
        ".cm-completionMatchedText": {
          textDecoration: "underline"
        },
        ".cm-completionDetail": {
          marginLeft: "0.5em",
          fontStyle: "italic"
        },
        ".cm-completionIcon": {
          fontSize: "90%",
          width: ".8em",
          display: "inline-block",
          textAlign: "center",
          paddingRight: ".6em",
          opacity: "0.6"
        },
        ".cm-completionIcon-function, .cm-completionIcon-method": {
          "&:after": {
            content: "'\u0192'"
          }
        },
        ".cm-completionIcon-class": {
          "&:after": {
            content: "'\u25CB'"
          }
        },
        ".cm-completionIcon-interface": {
          "&:after": {
            content: "'\u25CC'"
          }
        },
        ".cm-completionIcon-variable": {
          "&:after": {
            content: "'\uD835\uDC65'"
          }
        },
        ".cm-completionIcon-constant": {
          "&:after": {
            content: "'\uD835\uDC36'"
          }
        },
        ".cm-completionIcon-type": {
          "&:after": {
            content: "'\uD835\uDC61'"
          }
        },
        ".cm-completionIcon-enum": {
          "&:after": {
            content: "'\u222A'"
          }
        },
        ".cm-completionIcon-property": {
          "&:after": {
            content: "'\u25A1'"
          }
        },
        ".cm-completionIcon-keyword": {
          "&:after": {
            content: "'\uD83D\uDD11\uFE0E'"
          }
        },
        ".cm-completionIcon-namespace": {
          "&:after": {
            content: "'\u25A2'"
          }
        },
        ".cm-completionIcon-text": {
          "&:after": {
            content: "'abc'",
            fontSize: "50%",
            verticalAlign: "middle"
          }
        }
      });
      defaults2 = {
        brackets: ["(", "[", "{", "'", '"'],
        before: ")]}:;>"
      };
      closeBracketEffect = /* @__PURE__ */StateEffect.define({
        map(value, mapping) {
          var mapped = mapping.mapPos(value, -1, MapMode.TrackAfter);
          return mapped == null ? void 0 : mapped;
        }

      });
      skipBracketEffect = /* @__PURE__ */StateEffect.define({
        map(value, mapping) {
          return mapping.mapPos(value);
        }

      });
      closedBracket = /* @__PURE__ */new class extends RangeValue {}();
      closedBracket.startSide = 1;
      closedBracket.endSide = -1;
      bracketState = /* @__PURE__ */StateField.define({
        create() {
          return RangeSet.empty;
        },

        update(value, tr) {
          if (tr.selection) {
            var lineStart = tr.state.doc.lineAt(tr.selection.main.head).from;
            var prevLineStart = tr.startState.doc.lineAt(tr.startState.selection.main.head).from;
            if (lineStart != tr.changes.mapPos(prevLineStart, -1)) value = RangeSet.empty;
          }

          value = value.map(tr.changes);

          var _iterator198 = _createForOfIteratorHelper(tr.effects),
              _step198;

          try {
            var _loop19 = function _loop19() {
              var effect = _step198.value;
              if (effect.is(closeBracketEffect)) value = value.update({
                add: [closedBracket.range(effect.value, effect.value + 1)]
              });else if (effect.is(skipBracketEffect)) value = value.update({
                filter: from => from != effect.value
              });
            };

            for (_iterator198.s(); !(_step198 = _iterator198.n()).done;) {
              _loop19();
            }
          } catch (err) {
            _iterator198.e(err);
          } finally {
            _iterator198.f();
          }

          return value;
        }

      });
      definedClosing = "()[]{}<>";
      android = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent);
      inputHandler2 = /* @__PURE__ */EditorView.inputHandler.of((view, from, to, insert2) => {
        if ((android ? view.composing : view.compositionStarted) || view.state.readOnly) return false;
        var sel = view.state.selection.main;
        if (insert2.length > 2 || insert2.length == 2 && codePointSize(codePointAt(insert2, 0)) == 1 || from != sel.from || to != sel.to) return false;
        var tr = insertBracket(view.state, insert2);
        if (!tr) return false;
        view.dispatch(tr);
        return true;
      });

      deleteBracketPair = _ref58 => {
        var state = _ref58.state,
            dispatch = _ref58.dispatch;
        if (state.readOnly) return false;
        var conf = config(state, state.selection.main.head);
        var tokens = conf.brackets || defaults2.brackets;
        var dont = null,
            changes = state.changeByRange(range => {
          if (range.empty) {
            var before = prevChar(state.doc, range.head);

            var _iterator199 = _createForOfIteratorHelper(tokens),
                _step199;

            try {
              for (_iterator199.s(); !(_step199 = _iterator199.n()).done;) {
                var token = _step199.value;
                if (token == before && nextChar(state.doc, range.head) == closing(codePointAt(token, 0))) return {
                  changes: {
                    from: range.head - token.length,
                    to: range.head + token.length
                  },
                  range: EditorSelection.cursor(range.head - token.length),
                  userEvent: "delete.backward"
                };
              }
            } catch (err) {
              _iterator199.e(err);
            } finally {
              _iterator199.f();
            }
          }

          return {
            range: dont = range
          };
        });
        if (!dont) dispatch(state.update(changes, {
          scrollIntoView: true
        }));
        return !dont;
      };

      closeBracketsKeymap = [{
        key: "Backspace",
        run: deleteBracketPair
      }];
      completionKeymap = [{
        key: "Ctrl-Space",
        run: startCompletion
      }, {
        key: "Escape",
        run: closeCompletion
      }, {
        key: "ArrowDown",
        run: /* @__PURE__ */moveCompletionSelection(true)
      }, {
        key: "ArrowUp",
        run: /* @__PURE__ */moveCompletionSelection(false)
      }, {
        key: "PageDown",
        run: /* @__PURE__ */moveCompletionSelection(true, "page")
      }, {
        key: "PageUp",
        run: /* @__PURE__ */moveCompletionSelection(false, "page")
      }, {
        key: "Enter",
        run: acceptCompletion
      }];
      completionKeymapExt = /* @__PURE__ */Prec.highest( /* @__PURE__ */keymap.computeN([completionConfig], state => state.facet(completionConfig).defaultKeymap ? [completionKeymap] : []));
    }

  }); // node_modules/@codemirror/lint/dist/index.js


  function findDiagnostic(diagnostics) {
    var diagnostic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var after = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var found = null;
    diagnostics.between(after, 1e9, (from, to, _ref59) => {
      var spec = _ref59.spec;
      if (diagnostic && spec.diagnostic != diagnostic) return;
      found = new SelectedDiagnostic(from, to, spec.diagnostic);
      return false;
    });
    return found;
  }

  function hideTooltip(tr, tooltip) {
    return !!(tr.effects.some(e => e.is(setDiagnosticsEffect)) || tr.changes.touchesRange(tooltip.pos));
  }

  function maybeEnableLint(state, effects) {
    return state.field(lintState, false) ? effects : effects.concat(StateEffect.appendConfig.of([lintState, EditorView.decorations.compute([lintState], state2 => {
      var _state2$field = state2.field(lintState),
          selected = _state2$field.selected,
          panel = _state2$field.panel;

      return !selected || !panel || selected.from == selected.to ? Decoration.none : Decoration.set([activeMark.range(selected.from, selected.to)]);
    }), hoverTooltip(lintTooltip, {
      hideOn: hideTooltip
    }), baseTheme5]));
  }

  function setDiagnostics(state, diagnostics) {
    return {
      effects: maybeEnableLint(state, [setDiagnosticsEffect.of(diagnostics)])
    };
  }

  function lintTooltip(view, pos, side) {
    var _view$state$field = view.state.field(lintState),
        diagnostics = _view$state$field.diagnostics;

    var found = [],
        stackStart = 2e8,
        stackEnd = 0;
    diagnostics.between(pos - (side < 0 ? 1 : 0), pos + (side > 0 ? 1 : 0), (from, to, _ref60) => {
      var spec = _ref60.spec;

      if (pos >= from && pos <= to && (from == to || (pos > from || side > 0) && (pos < to || side < 0))) {
        found.push(spec.diagnostic);
        stackStart = Math.min(from, stackStart);
        stackEnd = Math.max(to, stackEnd);
      }
    });
    var diagnosticFilter = view.state.facet(lintConfig).tooltipFilter;
    if (diagnosticFilter) found = diagnosticFilter(found);
    if (!found.length) return null;
    return {
      pos: stackStart,
      end: stackEnd,
      above: view.state.doc.lineAt(stackStart).to < stackEnd,

      create() {
        return {
          dom: diagnosticsTooltip(view, found)
        };
      }

    };
  }

  function diagnosticsTooltip(view, diagnostics) {
    return crelt("ul", {
      class: "cm-tooltip-lint"
    }, diagnostics.map(d => renderDiagnostic(view, d, false)));
  }

  function assignKeys(actions) {
    var assigned = [];

    if (actions) {
      var _iterator200 = _createForOfIteratorHelper(actions),
          _step200;

      try {
        actions: for (_iterator200.s(); !(_step200 = _iterator200.n()).done;) {
          var name2 = _step200.value.name;

          var _loop20 = function _loop20(_i147) {
            var ch = name2[_i147];

            if (/[a-zA-Z]/.test(ch) && !assigned.some(c => c.toLowerCase() == ch.toLowerCase())) {
              assigned.push(ch);
              return "continue|actions";
            }
          };

          for (var _i147 = 0; _i147 < name2.length; _i147++) {
            var _ret5 = _loop20(_i147);

            if (_ret5 === "continue|actions") continue actions;
          }

          assigned.push("");
        }
      } catch (err) {
        _iterator200.e(err);
      } finally {
        _iterator200.f();
      }
    }

    return assigned;
  }

  function renderDiagnostic(view, diagnostic, inPanel) {
    var _a2;

    var keys2 = inPanel ? assignKeys(diagnostic.actions) : [];
    return crelt("li", {
      class: "cm-diagnostic cm-diagnostic-" + diagnostic.severity
    }, crelt("span", {
      class: "cm-diagnosticText"
    }, diagnostic.renderMessage ? diagnostic.renderMessage() : diagnostic.message), (_a2 = diagnostic.actions) === null || _a2 === void 0 ? void 0 : _a2.map((action, i) => {
      var click = e => {
        e.preventDefault();
        var found = findDiagnostic(view.state.field(lintState).diagnostics, diagnostic);
        if (found) action.apply(view, found.from, found.to);
      };

      var name2 = action.name,
          keyIndex = keys2[i] ? name2.indexOf(keys2[i]) : -1;
      var nameElt = keyIndex < 0 ? name2 : [name2.slice(0, keyIndex), crelt("u", name2.slice(keyIndex, keyIndex + 1)), name2.slice(keyIndex + 1)];
      return crelt("button", {
        type: "button",
        class: "cm-diagnosticAction",
        onclick: click,
        onmousedown: click,
        "aria-label": " Action: ".concat(name2).concat(keyIndex < 0 ? "" : " (access key \"".concat(keys2[i], ")\""), ".")
      }, nameElt);
    }), diagnostic.source && crelt("div", {
      class: "cm-diagnosticSource"
    }, diagnostic.source));
  }

  function svg(content2) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "viewBox=\"0 0 40 40\"";
    return "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" ".concat(attrs, ">").concat(encodeURIComponent(content2), "</svg>')");
  }

  function underline(color) {
    return svg("<path d=\"m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0\" stroke=\"".concat(color, "\" fill=\"none\" stroke-width=\".7\"/>"), "width=\"6\" height=\"3\"");
  }

  var SelectedDiagnostic, LintState, setDiagnosticsEffect, togglePanel2, movePanelSelection, lintState, activeMark, openLintPanel, closeLintPanel, nextDiagnostic, lintKeymap, lintPlugin, lintConfig, DiagnosticWidget, PanelItem, LintPanel, baseTheme5;

  var init_dist9 = __esm({
    "node_modules/@codemirror/lint/dist/index.js"() {
      init_dist2();
      init_dist();
      init_index_es2();
      SelectedDiagnostic = class {
        constructor(from, to, diagnostic) {
          this.from = from;
          this.to = to;
          this.diagnostic = diagnostic;
        }

      };
      LintState = class {
        constructor(diagnostics, panel, selected) {
          this.diagnostics = diagnostics;
          this.panel = panel;
          this.selected = selected;
        }

        static init(diagnostics, panel, state) {
          var markedDiagnostics = diagnostics;
          var diagnosticFilter = state.facet(lintConfig).markerFilter;
          if (diagnosticFilter) markedDiagnostics = diagnosticFilter(markedDiagnostics);
          var ranges = Decoration.set(markedDiagnostics.map(d => {
            return d.from == d.to || d.from == d.to - 1 && state.doc.lineAt(d.from).to == d.from ? Decoration.widget({
              widget: new DiagnosticWidget(d),
              diagnostic: d
            }).range(d.from) : Decoration.mark({
              attributes: {
                class: "cm-lintRange cm-lintRange-" + d.severity
              },
              diagnostic: d
            }).range(d.from, d.to);
          }), true);
          return new LintState(ranges, panel, findDiagnostic(ranges));
        }

      };
      setDiagnosticsEffect = /* @__PURE__ */StateEffect.define();
      togglePanel2 = /* @__PURE__ */StateEffect.define();
      movePanelSelection = /* @__PURE__ */StateEffect.define();
      lintState = /* @__PURE__ */StateField.define({
        create() {
          return new LintState(Decoration.none, null, null);
        },

        update(value, tr) {
          if (tr.docChanged) {
            var mapped = value.diagnostics.map(tr.changes),
                selected = null;

            if (value.selected) {
              var selPos = tr.changes.mapPos(value.selected.from, 1);
              selected = findDiagnostic(mapped, value.selected.diagnostic, selPos) || findDiagnostic(mapped, null, selPos);
            }

            value = new LintState(mapped, value.panel, selected);
          }

          var _iterator201 = _createForOfIteratorHelper(tr.effects),
              _step201;

          try {
            for (_iterator201.s(); !(_step201 = _iterator201.n()).done;) {
              var effect = _step201.value;

              if (effect.is(setDiagnosticsEffect)) {
                value = LintState.init(effect.value, value.panel, tr.state);
              } else if (effect.is(togglePanel2)) {
                value = new LintState(value.diagnostics, effect.value ? LintPanel.open : null, value.selected);
              } else if (effect.is(movePanelSelection)) {
                value = new LintState(value.diagnostics, value.panel, effect.value);
              }
            }
          } catch (err) {
            _iterator201.e(err);
          } finally {
            _iterator201.f();
          }

          return value;
        },

        provide: f => [showPanel.from(f, val => val.panel), EditorView.decorations.from(f, s => s.diagnostics)]
      });
      activeMark = /* @__PURE__ */Decoration.mark({
        class: "cm-lintRange cm-lintRange-active"
      });

      openLintPanel = view => {
        var field = view.state.field(lintState, false);
        if (!field || !field.panel) view.dispatch({
          effects: maybeEnableLint(view.state, [togglePanel2.of(true)])
        });
        var panel = getPanel(view, LintPanel.open);
        if (panel) panel.dom.querySelector(".cm-panel-lint ul").focus();
        return true;
      };

      closeLintPanel = view => {
        var field = view.state.field(lintState, false);
        if (!field || !field.panel) return false;
        view.dispatch({
          effects: togglePanel2.of(false)
        });
        return true;
      };

      nextDiagnostic = view => {
        var field = view.state.field(lintState, false);
        if (!field) return false;
        var sel = view.state.selection.main,
            next = field.diagnostics.iter(sel.to + 1);

        if (!next.value) {
          next = field.diagnostics.iter(0);
          if (!next.value || next.from == sel.from && next.to == sel.to) return false;
        }

        view.dispatch({
          selection: {
            anchor: next.from,
            head: next.to
          },
          scrollIntoView: true
        });
        return true;
      };

      lintKeymap = [{
        key: "Mod-Shift-m",
        run: openLintPanel
      }, {
        key: "F8",
        run: nextDiagnostic
      }];
      lintPlugin = /* @__PURE__ */ViewPlugin.fromClass(class {
        constructor(view) {
          this.view = view;
          this.timeout = -1;
          this.set = true;

          var _view$state$facet = view.state.facet(lintConfig),
              delay = _view$state$facet.delay;

          this.lintTime = Date.now() + delay;
          this.run = this.run.bind(this);
          this.timeout = setTimeout(this.run, delay);
        }

        run() {
          var now = Date.now();

          if (now < this.lintTime - 10) {
            setTimeout(this.run, this.lintTime - now);
          } else {
            this.set = false;

            var state = this.view.state,
                _state$facet = state.facet(lintConfig),
                sources = _state$facet.sources;

            Promise.all(sources.map(source => Promise.resolve(source(this.view)))).then(annotations => {
              var all = annotations.reduce((a, b) => a.concat(b));
              if (this.view.state.doc == state.doc) this.view.dispatch(setDiagnostics(this.view.state, all));
            }, error => {
              logException(this.view.state, error);
            });
          }
        }

        update(update) {
          var config2 = update.state.facet(lintConfig);

          if (update.docChanged || config2 != update.startState.facet(lintConfig)) {
            this.lintTime = Date.now() + config2.delay;

            if (!this.set) {
              this.set = true;
              this.timeout = setTimeout(this.run, config2.delay);
            }
          }
        }

        force() {
          if (this.set) {
            this.lintTime = Date.now();
            this.run();
          }
        }

        destroy() {
          clearTimeout(this.timeout);
        }

      });
      lintConfig = /* @__PURE__ */Facet.define({
        combine(input) {
          return Object.assign({
            sources: input.map(i => i.source)
          }, combineConfig(input.map(i => i.config), {
            delay: 750,
            markerFilter: null,
            tooltipFilter: null
          }));
        },

        enables: lintPlugin
      });
      DiagnosticWidget = class extends WidgetType {
        constructor(diagnostic) {
          super();
          this.diagnostic = diagnostic;
        }

        eq(other) {
          return other.diagnostic == this.diagnostic;
        }

        toDOM() {
          return crelt("span", {
            class: "cm-lintPoint cm-lintPoint-" + this.diagnostic.severity
          });
        }

      };
      PanelItem = class {
        constructor(view, diagnostic) {
          this.diagnostic = diagnostic;
          this.id = "item_" + Math.floor(Math.random() * 4294967295).toString(16);
          this.dom = renderDiagnostic(view, diagnostic, true);
          this.dom.id = this.id;
          this.dom.setAttribute("role", "option");
        }

      };
      LintPanel = class {
        constructor(view) {
          this.view = view;
          this.items = [];

          var onkeydown = event => {
            if (event.keyCode == 27) {
              closeLintPanel(this.view);
              this.view.focus();
            } else if (event.keyCode == 38 || event.keyCode == 33) {
              this.moveSelection((this.selectedIndex - 1 + this.items.length) % this.items.length);
            } else if (event.keyCode == 40 || event.keyCode == 34) {
              this.moveSelection((this.selectedIndex + 1) % this.items.length);
            } else if (event.keyCode == 36) {
              this.moveSelection(0);
            } else if (event.keyCode == 35) {
              this.moveSelection(this.items.length - 1);
            } else if (event.keyCode == 13) {
              this.view.focus();
            } else if (event.keyCode >= 65 && event.keyCode <= 90 && this.selectedIndex >= 0) {
              var diagnostic = this.items[this.selectedIndex].diagnostic,
                  keys2 = assignKeys(diagnostic.actions);

              for (var _i148 = 0; _i148 < keys2.length; _i148++) {
                if (keys2[_i148].toUpperCase().charCodeAt(0) == event.keyCode) {
                  var found = findDiagnostic(this.view.state.field(lintState).diagnostics, diagnostic);
                  if (found) diagnostic.actions[_i148].apply(view, found.from, found.to);
                }
              }
            } else {
              return;
            }

            event.preventDefault();
          };

          var onclick = event => {
            for (var _i149 = 0; _i149 < this.items.length; _i149++) {
              if (this.items[_i149].dom.contains(event.target)) this.moveSelection(_i149);
            }
          };

          this.list = crelt("ul", {
            tabIndex: 0,
            role: "listbox",
            "aria-label": this.view.state.phrase("Diagnostics"),
            onkeydown,
            onclick
          });
          this.dom = crelt("div", {
            class: "cm-panel-lint"
          }, this.list, crelt("button", {
            type: "button",
            name: "close",
            "aria-label": this.view.state.phrase("close"),
            onclick: () => closeLintPanel(this.view)
          }, "\xD7"));
          this.update();
        }

        get selectedIndex() {
          var selected = this.view.state.field(lintState).selected;
          if (!selected) return -1;

          for (var _i150 = 0; _i150 < this.items.length; _i150++) {
            if (this.items[_i150].diagnostic == selected.diagnostic) return _i150;
          }

          return -1;
        }

        update() {
          var _this$view$state$fiel = this.view.state.field(lintState),
              diagnostics = _this$view$state$fiel.diagnostics,
              selected = _this$view$state$fiel.selected;

          var i = 0,
              needsSync = false,
              newSelectedItem = null;
          diagnostics.between(0, this.view.state.doc.length, (_start, _end, _ref61) => {
            var spec = _ref61.spec;
            var found = -1,
                item;

            for (var j = i; j < this.items.length; j++) {
              if (this.items[j].diagnostic == spec.diagnostic) {
                found = j;
                break;
              }
            }

            if (found < 0) {
              item = new PanelItem(this.view, spec.diagnostic);
              this.items.splice(i, 0, item);
              needsSync = true;
            } else {
              item = this.items[found];

              if (found > i) {
                this.items.splice(i, found - i);
                needsSync = true;
              }
            }

            if (selected && item.diagnostic == selected.diagnostic) {
              if (!item.dom.hasAttribute("aria-selected")) {
                item.dom.setAttribute("aria-selected", "true");
                newSelectedItem = item;
              }
            } else if (item.dom.hasAttribute("aria-selected")) {
              item.dom.removeAttribute("aria-selected");
            }

            i++;
          });

          while (i < this.items.length && !(this.items.length == 1 && this.items[0].diagnostic.from < 0)) {
            needsSync = true;
            this.items.pop();
          }

          if (this.items.length == 0) {
            this.items.push(new PanelItem(this.view, {
              from: -1,
              to: -1,
              severity: "info",
              message: this.view.state.phrase("No diagnostics")
            }));
            needsSync = true;
          }

          if (newSelectedItem) {
            this.list.setAttribute("aria-activedescendant", newSelectedItem.id);
            this.view.requestMeasure({
              key: this,
              read: () => ({
                sel: newSelectedItem.dom.getBoundingClientRect(),
                panel: this.list.getBoundingClientRect()
              }),
              write: _ref62 => {
                var sel = _ref62.sel,
                    panel = _ref62.panel;
                if (sel.top < panel.top) this.list.scrollTop -= panel.top - sel.top;else if (sel.bottom > panel.bottom) this.list.scrollTop += sel.bottom - panel.bottom;
              }
            });
          } else if (this.selectedIndex < 0) {
            this.list.removeAttribute("aria-activedescendant");
          }

          if (needsSync) this.sync();
        }

        sync() {
          var domPos = this.list.firstChild;

          function rm2() {
            var prev = domPos;
            domPos = prev.nextSibling;
            prev.remove();
          }

          var _iterator202 = _createForOfIteratorHelper(this.items),
              _step202;

          try {
            for (_iterator202.s(); !(_step202 = _iterator202.n()).done;) {
              var item = _step202.value;

              if (item.dom.parentNode == this.list) {
                while (domPos != item.dom) {
                  rm2();
                }

                domPos = item.dom.nextSibling;
              } else {
                this.list.insertBefore(item.dom, domPos);
              }
            }
          } catch (err) {
            _iterator202.e(err);
          } finally {
            _iterator202.f();
          }

          while (domPos) {
            rm2();
          }
        }

        moveSelection(selectedIndex) {
          if (this.selectedIndex < 0) return;
          var field = this.view.state.field(lintState);
          var selection = findDiagnostic(field.diagnostics, this.items[selectedIndex].diagnostic);
          if (!selection) return;
          this.view.dispatch({
            selection: {
              anchor: selection.from,
              head: selection.to
            },
            scrollIntoView: true,
            effects: movePanelSelection.of(selection)
          });
        }

        static open(view) {
          return new LintPanel(view);
        }

      };
      baseTheme5 = /* @__PURE__ */EditorView.baseTheme({
        ".cm-diagnostic": {
          padding: "3px 6px 3px 8px",
          marginLeft: "-1px",
          display: "block",
          whiteSpace: "pre-wrap"
        },
        ".cm-diagnostic-error": {
          borderLeft: "5px solid #d11"
        },
        ".cm-diagnostic-warning": {
          borderLeft: "5px solid orange"
        },
        ".cm-diagnostic-info": {
          borderLeft: "5px solid #999"
        },
        ".cm-diagnosticAction": {
          font: "inherit",
          border: "none",
          padding: "2px 4px",
          backgroundColor: "#444",
          color: "white",
          borderRadius: "3px",
          marginLeft: "8px"
        },
        ".cm-diagnosticSource": {
          fontSize: "70%",
          opacity: 0.7
        },
        ".cm-lintRange": {
          backgroundPosition: "left bottom",
          backgroundRepeat: "repeat-x",
          paddingBottom: "0.7px"
        },
        ".cm-lintRange-error": {
          backgroundImage: /* @__PURE__ */underline("#d11")
        },
        ".cm-lintRange-warning": {
          backgroundImage: /* @__PURE__ */underline("orange")
        },
        ".cm-lintRange-info": {
          backgroundImage: /* @__PURE__ */underline("#999")
        },
        ".cm-lintRange-active": {
          backgroundColor: "#ffdd9980"
        },
        ".cm-tooltip-lint": {
          padding: 0,
          margin: 0
        },
        ".cm-lintPoint": {
          position: "relative",
          "&:after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: "-2px",
            borderLeft: "3px solid transparent",
            borderRight: "3px solid transparent",
            borderBottom: "4px solid #d11"
          }
        },
        ".cm-lintPoint-warning": {
          "&:after": {
            borderBottomColor: "orange"
          }
        },
        ".cm-lintPoint-info": {
          "&:after": {
            borderBottomColor: "#999"
          }
        },
        ".cm-panel.cm-panel-lint": {
          position: "relative",
          "& ul": {
            maxHeight: "100px",
            overflowY: "auto",
            "& [aria-selected]": {
              backgroundColor: "#ddd",
              "& u": {
                textDecoration: "underline"
              }
            },
            "&:focus [aria-selected]": {
              background_fallback: "#bdf",
              backgroundColor: "Highlight",
              color_fallback: "white",
              color: "HighlightText"
            },
            "& u": {
              textDecoration: "none"
            },
            padding: 0,
            margin: 0
          },
          "& [name=close]": {
            position: "absolute",
            top: "0",
            right: "2px",
            background: "inherit",
            border: "none",
            font: "inherit",
            padding: 0,
            margin: 0
          }
        }
      });
    }

  }); // node_modules/codemirror/dist/index.js


  var basicSetup, minimalSetup;

  var init_dist10 = __esm({
    "node_modules/codemirror/dist/index.js"() {
      init_dist2();
      init_dist2();
      init_dist();
      init_dist5();
      init_dist6();
      init_dist7();
      init_dist8();
      init_dist9();
      basicSetup = [/* @__PURE__ */lineNumbers(), /* @__PURE__ */highlightActiveLineGutter(), /* @__PURE__ */highlightSpecialChars(), /* @__PURE__ */history(), /* @__PURE__ */foldGutter(), /* @__PURE__ */drawSelection(), /* @__PURE__ */dropCursor(), /* @__PURE__ */EditorState.allowMultipleSelections.of(true), /* @__PURE__ */indentOnInput(), /* @__PURE__ */syntaxHighlighting(defaultHighlightStyle, {
        fallback: true
      }), /* @__PURE__ */bracketMatching(), /* @__PURE__ */closeBrackets(), /* @__PURE__ */autocompletion(), /* @__PURE__ */rectangularSelection(), /* @__PURE__ */crosshairCursor(), /* @__PURE__ */highlightActiveLine(), /* @__PURE__ */highlightSelectionMatches(), /* @__PURE__ */keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...searchKeymap, ...historyKeymap, ...foldKeymap, ...completionKeymap, ...lintKeymap])];
      minimalSetup = [/* @__PURE__ */highlightSpecialChars(), /* @__PURE__ */history(), /* @__PURE__ */drawSelection(), /* @__PURE__ */syntaxHighlighting(defaultHighlightStyle, {
        fallback: true
      }), /* @__PURE__ */keymap.of([...defaultKeymap, ...historyKeymap])];
    }

  }); // src/optionDefinitions.ts


  var DEFAULT_MERGE_CHECK, optionDefinitions;

  var init_optionDefinitions = __esm({
    "src/optionDefinitions.ts"() {
      DEFAULT_MERGE_CHECK = ["doi", "citation", "abstract"];
      optionDefinitions = [{
        key: "help",
        cli: {
          "--help": true,
          "-h": true
        },
        title: "Help",
        description: ["Show help"],
        type: "boolean"
      }, {
        key: "omit",
        cli: {
          "--omit": args => {
            if (args.length === 0) {
              console.error("Expected a omit list");
              process.exit(1);
            }

            return args;
          }
        },
        toCLI: val => Array.isArray(val) && val.length > 0 ? "--omit=".concat(val.join(",")) : void 0,
        title: "Remove fields",
        description: ["Remove specified fields from bibliography entries."],
        examples: ["--omit=id,name"],
        type: "string[]",
        defaultValue: []
      }, {
        key: "curly",
        cli: {
          "--curly": true,
          "--no-curly": false
        },
        toCLI: val => val ? "--curly" : void 0,
        title: "Enclose values in braces",
        description: ['Enclose all property values in braces. Quoted values will be converted to braces. For example, "Journal of Tea" will become {Journal of Tea}.'],
        type: "boolean",
        defaultValue: false
      }, {
        key: "numeric",
        cli: {
          "--numeric": true,
          "--no-numeric": false
        },
        toCLI: val => val ? "--numeric" : void 0,
        title: "Use numeric values where possible",
        description: ["Strip quotes and braces from numeric/month values. For example, {1998} will become 1998."],
        type: "boolean",
        defaultValue: false
      }, {
        key: "space",
        cli: {
          "--space": args => args.length > 0 ? Number(args[0]) : true
        },
        toCLI: val => {
          if (typeof val === "number") return "--space=".concat(val);
          if (val) return "--space";
          return void 0;
        },
        title: "Indent with spaces",
        description: ["Indent all fields with the specified number of spaces. Ignored if tab is set."],
        examples: ["--space=2 (default)", "--space=4"],
        type: "boolean | number",
        valueIfTrue: 2,
        defaultValue: 2
      }, {
        key: "tab",
        cli: {
          "--tab": true,
          "--no-tab": false
        },
        toCLI: val => val ? "--tab" : void 0,
        title: "Indent with tabs",
        description: ["Indent all fields with a tab."],
        type: "boolean",
        defaultValue: false
      }, {
        key: "align",
        cli: {
          "--align": args => Number(args[0]),
          "--no-align": false
        },
        toCLI: val => {
          if (typeof val === "number") return "--align=".concat(val);
          if (val === false) return "--no-align";
          return void 0;
        },
        title: "Align values",
        description: ["Insert whitespace between fields and values so that values are visually aligned."],
        examples: ["--align=14 (default)"],
        type: "boolean | number",
        valueIfFalse: 1,
        defaultValue: 14
      }, {
        key: "sort",
        cli: {
          "--sort": args => args.length > 0 ? args : true,
          "--no-sort": false
        },
        toCLI: val => {
          if (Array.isArray(val) && val.length > 0) return "--sort=".concat(val.join(","));
          if (val === true) return "--sort";
          return void 0;
        },
        title: "Sort bibliography entries",
        description: ["Sort entries by specified fields. For descending order, prefix the field with a dash (-)."],
        examples: ["--sort (sort by id)", "--sort=-year,name (sort year descending then name ascending)", "--sort=name,year"],
        type: "boolean | string[]",
        valueIfTrue: ["key"]
      }, {
        key: "duplicates",
        cli: {
          "--duplicates": args => {
            if (args.length === 0) return true;

            var _iterator203 = _createForOfIteratorHelper(args),
                _step203;

            try {
              for (_iterator203.s(); !(_step203 = _iterator203.n()).done;) {
                var _i151 = _step203.value;

                if (_i151 !== "doi" && _i151 !== "key" && _i151 !== "abstract" && _i151 !== "citation") {
                  console.error("Invalid key for merge option: \"".concat(_i151, "\""));
                  process.exit(1);
                }
              }
            } catch (err) {
              _iterator203.e(err);
            } finally {
              _iterator203.f();
            }

            return args;
          }
        },
        toCLI: val => {
          if (Array.isArray(val) && val.length > 0) return "--duplicates=".concat(val.join(","));
          if (val === true) return "--duplicates";
          return void 0;
        },
        title: "Check for duplicates",
        description: ["Warn if duplicates are found, which are entries where DOI, abstract, or author and title are the same."],
        examples: ["--duplicates doi (same DOIs)", "--duplicates key (same IDs)", "--duplicates abstract (similar abstracts)", "--duplicates citation (similar author and titles)", "--duplicates doi, key (identical DOI or keys)", "--duplicates (same DOI, key, abstract, or citation)"],
        type: "boolean | ('doi' | 'key' | 'abstract' | 'citation')[]",
        valueIfTrue: DEFAULT_MERGE_CHECK,
        defaultValue: options => options.merge ? DEFAULT_MERGE_CHECK : void 0
      }, {
        key: "merge",
        cli: {
          "--merge": args => {
            if (args.length === 0) return true;

            if (args[0] !== "first" && args[0] !== "last" && args[0] !== "combine" && args[0] !== "overwrite") {
              console.error("Invalid merge strategy: \"".concat(args[0], "\""));
              process.exit(1);
            }

            return args[0];
          },
          "--no-merge": false
        },
        toCLI: val => {
          if (typeof val === "string") return "--merge=".concat(val);
          if (val) return "--merge";
          return void 0;
        },
        title: "Merge duplicate entries",
        description: ["Merge duplicates entries. Use the duplicates option to determine how duplicates are identified. There are different ways to merge:", "- first: only keep the original entry", "- last: only keep the last found duplicate", "- combine: keep original entry and merge in fields of duplicates if they do not already exist", "- overwrite: keep original entry and merge in fields of duplicates, overwriting existing fields if they exist"],
        type: "boolean | 'first' | 'last' | 'combine' | 'overwrite'",
        valueIfTrue: "combine"
      }, {
        key: "stripEnclosingBraces",
        cli: {
          "--strip-enclosing-braces": true
        },
        toCLI: val => val ? "--strip-enclosing-braces" : void 0,
        title: "Strip double-braced values",
        description: ["Where an entire value is enclosed in double braces, remove the extra braces. For example, {{Journal of Tea}} will become {Journal of Tea}."],
        type: "boolean",
        defaultValue: false
      }, {
        key: "dropAllCaps",
        cli: {
          "--drop-all-caps": true
        },
        toCLI: val => val ? "--drop-all-caps" : void 0,
        title: "Drop all caps",
        description: ["Where values are all caps, make them title case. For example, {JOURNAL OF TEA} will become {Journal of Tea}."],
        type: "boolean",
        defaultValue: false
      }, {
        key: "escape",
        cli: {
          "--escape": true,
          "--no-escape": false
        },
        toCLI: val => val === false ? "--no-escape" : void 0,
        title: "Escape special characters",
        description: ["Escape special characters, such as umlaut. This ensures correct typesetting with latex. Enabled by default."],
        type: "boolean",
        defaultValue: true
      }, {
        key: "sortFields",
        cli: {
          "--sort-fields": args => args.length > 0 ? args : true
        },
        toCLI: val => {
          if (Array.isArray(val) && val.length > 0) return "--sort-fields=".concat(val.join(","));
          if (val === true) return "--sort-fields";
          return void 0;
        },
        title: "Sort fields",
        description: ["Sort the fields within entries.", "If no fields are specified fields will be sorted by: title, shorttitle, author, year, month, day, journal, booktitle, location, on, publisher, address, series, volume, number, pages, doi, isbn, issn, url, urldate, copyright, category, note, metadata"],
        examples: ["--sort-fields=name,author"],
        type: "boolean | string[]",
        valueIfTrue: ["title", "shorttitle", "author", "year", "month", "day", "journal", "booktitle", "location", "on", "publisher", "address", "series", "volume", "number", "pages", "doi", "isbn", "issn", "url", "urldate", "copyright", "category", "note", "metadata"],
        defaultValue: false
      }, {
        key: "sortProperties",
        cli: {
          "--sort-properties": args => args.length > 0 ? args : true
        },
        title: "Sort properties",
        description: ["Alias of sort fields (legacy)"],
        type: "boolean | string[]",
        deprecated: true
      }, {
        key: "stripComments",
        cli: {
          "--strip-comments": true,
          "--no-strip-comments": false
        },
        toCLI: val => val ? "--strip-comments" : void 0,
        title: "Remove comments",
        description: ["Remove all comments from the bibtex source."],
        type: "boolean",
        defaultValue: false
      }, {
        key: "trailingCommas",
        cli: {
          "--trailing-commas": true,
          "--no-trailing-commas": true
        },
        toCLI: val => val ? "--trailing-commas" : void 0,
        title: "Trailing commas",
        description: ["End the last key value pair in each entry with a comma."],
        type: "boolean",
        defaultValue: false
      }, {
        key: "encodeUrls",
        cli: {
          "--encode-urls": true,
          "--no-encode-urls": true
        },
        toCLI: val => val ? "--encode-urls" : void 0,
        title: "Encode URLs",
        description: ["Replace invalid URL characters with percent encoded values."],
        type: "boolean",
        defaultValue: false
      }, {
        key: "tidyComments",
        cli: {
          "--tidy-comments": true,
          "--no-tidy-comments": false
        },
        toCLI: val => val === false ? "--no-tidy-comments" : void 0,
        title: "Tidy comments",
        description: ["Remove whitespace surrounding comments."],
        type: "boolean",
        defaultValue: true
      }, {
        key: "removeEmptyFields",
        cli: {
          "--remove-empty-fields": true,
          "--no-remove-empty-fields": false
        },
        toCLI: val => val ? "--remove-empty-fields" : void 0,
        title: "Remove empty fields",
        description: ["Remove any fields that have empty values."],
        type: "boolean",
        defaultValue: false
      }, {
        key: "removeDuplicateFields",
        cli: {
          "--remove-dupe-fields": true,
          "--no-remove-dupe-fields": false
        },
        toCLI: val => val === false ? "--no-remove-dupe-fields" : void 0,
        title: "Remove duplicate fields",
        description: ["Only allow one of each field in each entry. Enabled by default."],
        type: "boolean",
        defaultValue: true
      }, {
        key: "generateKeys",
        cli: {
          "--generate-keys": true
        },
        toCLI: val => val === true ? "--generate-keys" : void 0,
        title: "Generate BibTeX keys",
        description: ["[Experimental] For all entries replace the key with a new key of the form <author><year><title>."],
        type: "boolean",
        defaultValue: false
      }, {
        key: "maxAuthors",
        cli: {
          "--max-authors": args => Number(args[0])
        },
        toCLI: val => val ? "--max-authors=".concat(val) : void 0,
        title: "Maximum authors",
        description: ['Truncate authors if above a given number into "and others".'],
        type: "number"
      }, {
        key: "lowercase",
        cli: {
          "--no-lowercase": false
        },
        toCLI: val => val === false ? "--no-lowercase" : void 0,
        title: "Lowercase fields",
        description: ["Lowercase field names and entry type. Enabled by default."],
        type: "boolean",
        defaultValue: true
      }, {
        key: "enclosingBraces",
        cli: {
          "--enclosing-braces": args => args.length > 0 ? args : true
        },
        toCLI: val => {
          if (Array.isArray(val) && val.length > 0) return "--enclosing-braces=".concat(val.join(","));
          if (val === true) return "--enclosing-braces";
          return void 0;
        },
        title: "Enclose values in double braces",
        description: ["Enclose the given fields in double braces, such that case is preserved during BibTeX compilation."],
        examples: ["--enclosing-braces=title,journal (output title and journal fields will be of the form {{This is a title}})", "--enclosing-braces (equivalent to ---enclosing-braces=title)"],
        type: "boolean | string[]",
        valueIfTrue: ["title"]
      }, {
        key: "wrap",
        cli: {
          "--wrap": args => args.length > 0 ? Number(args[0]) : true,
          "--no-wrap": false
        },
        toCLI: val => val ? "--wrap=".concat(val) : void 0,
        title: "Wrap values",
        description: ["Wrap long values at the given column"],
        examples: ["--wrap (80 by default)", "--wrap=82"],
        type: "boolean | number",
        valueIfTrue: 80
      }, {
        key: "version",
        cli: {
          "--version": true,
          "-v": true
        },
        title: "Version",
        description: ["Show bibtex-tidy version."],
        type: "boolean"
      }, {
        key: "quiet",
        cli: {
          "--quiet": true
        },
        title: "Quiet",
        description: ["Suppress logs and warnings."],
        type: "boolean"
      }, {
        key: "backup",
        cli: {
          "--backup": true,
          "--no-backup": false
        },
        title: "Backup",
        description: ["Make a backup <filename>.original. Enabled by default."],
        type: "boolean",
        defaultValue: true
      }];
    }

  }); // src/optionUtils.ts


  function normalizeOptions(options) {
    return Object.fromEntries(optionDefinitions.map(def => {
      var key = def.key;
      var value = options[key];

      if (value === true && def.valueIfTrue !== void 0) {
        return [key, def.valueIfTrue];
      }

      if (value === false && def.valueIfFalse !== void 0) {
        return [key, def.valueIfFalse];
      }

      if (typeof value === "undefined" && def.defaultValue !== void 0) {
        if (typeof def.defaultValue === "function") {
          return [key, def.defaultValue(options)];
        }

        return [key, def.defaultValue];
      }

      return [key, value];
    }));
  }

  var init_optionUtils = __esm({
    "src/optionUtils.ts"() {
      init_optionDefinitions();
    }

  }); // src/bibtex-parser.ts


  function generateAST(input) {
    var _a2;

    var rootNode = new RootNode();
    var node = rootNode;
    var line = 1;
    var column = 0;

    for (var _i152 = 0; _i152 < input.length; _i152++) {
      var char = input[_i152];
      var prev = input[_i152 - 1];

      if (char === "\n") {
        line++;
        column = 0;
      }

      column++;

      switch (node.type) {
        case "root":
          {
            node = char === "@" ? new BlockNode(node) : new TextNode2(node, char);
            break;
          }

        case "text":
          {
            if (char === "@" && /[\s\r\n}]/.test(prev)) {
              node = new BlockNode(node.parent);
            } else {
              node.text += char;
            }

            break;
          }

        case "block":
          {
            if (char === "@") {
              var prevNode = node.parent.children[node.parent.children.length - 2];

              if ((prevNode == null ? void 0 : prevNode.type) === "text") {
                prevNode.text += "@" + node.command;
              } else {
                node.parent.children.pop();
                new TextNode2(node.parent, "@" + node.command);
                node.parent.children.push(node);
              }

              node.command = "";
            } else if (char === "{" || char === "(") {
              var commandTrimmed = node.command.trim();

              if (commandTrimmed === "" || /\s/.test(commandTrimmed)) {
                node.parent.children.pop();
                node = new TextNode2(node.parent, "@" + node.command + char);
              } else {
                node.command = commandTrimmed;
                var command2 = node.command.toLowerCase();

                var _ref63 = char === "{" ? [1, 0] : [0, 1],
                    _ref64 = _slicedToArray(_ref63, 2),
                    braces = _ref64[0],
                    parens = _ref64[1];

                var raw = "@" + command2 + char;

                switch (command2) {
                  case "string":
                    node = new StringNode(node, raw, braces, parens);
                    break;

                  case "preamble":
                    node = new PreambleNode(node, raw, braces, parens);
                    break;

                  case "comment":
                    node = new CommentNode(node, raw, braces, parens);
                    break;

                  default:
                    node = new EntryNode(node);
                    break;
                }
              }
            } else if (char.match(/[=#,})\[\]]/)) {
              node.parent.children.pop();
              node = new TextNode2(node.parent, "@" + node.command + char);
            } else {
              node.command += char;
            }

            break;
          }

        case "comment":
        case "string":
        case "preamble":
          if (char === "{") {
            node.braces++;
          } else if (char === "}") {
            node.braces--;
          } else if (char === "(") {
            node.parens++;
          } else if (char === ")") {
            node.parens--;
          }

          node.raw += char;

          if (node.braces === 0 && node.parens === 0) {
            node = node.parent.parent;
          }

          break;

        case "entry":
          {
            if (char === "}" || char === ")") {
              node = node.parent.parent;
            } else if (char === ",") {
              node = new FieldNode(node);
            } else if (char === "=") {
              if (!node.key) {
                throw new BibTeXSyntaxError(input, node, _i152, line, column);
              }

              var field = new FieldNode(node, node.key);
              node.fields.push(field);
              node.key = void 0;
              node = field.value;
            } else if (isWhitespace(char)) {} else if (char.match(/[=#,{}()\[\]]/)) {
              throw new BibTeXSyntaxError(input, node, _i152, line, column);
            } else {
              node.key = ((_a2 = node.key) != null ? _a2 : "") + char;
            }

            break;
          }

        case "field":
          {
            if (char === "}" || char === ")") {
              node.name = node.name.trim();
              node = node.parent.parent.parent;
            } else if (char === "=") {
              node.name = node.name.trim();
              node = node.value;
            } else if (char === ",") {
              node.name = node.name.trim();
              node = new FieldNode(node.parent);
            } else if (/[=,{}()\[\]]/.test(char)) {
              throw new BibTeXSyntaxError(input, node, _i152, line, column);
            } else if (!node.name) {
              if (!isWhitespace(char)) {
                node.parent.fields.push(node);
                node.name = char;
              } else {}
            } else {
              node.name += char;
            }

            break;
          }

        case "concat":
          {
            if (isWhitespace(char)) {
              break;
            } else if (node.canConsumeValue) {
              if (/[#=,}()\[\]]/.test(char)) {
                throw new BibTeXSyntaxError(input, node, _i152, line, column);
              } else {
                node.canConsumeValue = false;

                if (char === "{") {
                  node = new BracedNode(node);
                } else if (char === '"') {
                  node = new QuotedNode(node);
                } else {
                  node = new LiteralNode(node, char);
                }
              }
            } else {
              if (char === ",") {
                node = new FieldNode(node.parent.parent);
              } else if (char === "}" || char === ")") {
                node = node.parent.parent.parent.parent;
              } else if (char === "#") {
                node.canConsumeValue = true;
              } else {
                throw new BibTeXSyntaxError(input, node, _i152, line, column);
              }
            }

            break;
          }

        case "literal":
          if (isWhitespace(char)) {
            node = node.parent;
          } else if (char === ",") {
            node = new FieldNode(node.parent.parent.parent);
          } else if (char === "}") {
            node = node.parent.parent.parent.parent.parent;
          } else if (char === "#") {
            node = node.parent;
            node.canConsumeValue = true;
          } else {
            node.value += char;
          }

          break;

        case "braced":
          if (char === "}" && node.depth === 0) {
            node = node.parent;
            break;
          } else if (char === "{") {
            node.depth++;
          } else if (char === "}") {
            node.depth--;
          }

          node.value += char;
          break;

        case "quoted":
          if (char === '"' && node.depth === 0) {
            node = node.parent;
            break;
          } else if (char === "{") {
            node.depth++;
          } else if (char === "}") {
            node.depth--;

            if (node.depth < 0) {
              throw new BibTeXSyntaxError(input, node, _i152, line, column);
            }
          }

          node.value += char;
          break;
      }
    }

    return rootNode;
  }

  function isWhitespace(string2) {
    return /^[ \t\n\r]*$/.test(string2);
  }

  var RootNode, TextNode2, BlockNode, CommentNode, PreambleNode, StringNode, EntryNode, FieldNode, ConcatNode, LiteralNode, BracedNode, QuotedNode, BibTeXSyntaxError;

  var init_bibtex_parser = __esm({
    "src/bibtex-parser.ts"() {
      RootNode = class {
        constructor() {
          var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          this.children = children;
          this.type = "root";
        }

      };
      TextNode2 = class {
        constructor(parent, text) {
          this.parent = parent;
          this.text = text;
          this.type = "text";
          parent.children.push(this);
        }

      };
      BlockNode = class {
        constructor(parent) {
          this.parent = parent;
          this.type = "block";
          this.command = "";
          parent.children.push(this);
        }

      };
      CommentNode = class {
        constructor(parent, raw, braces, parens) {
          this.parent = parent;
          this.raw = raw;
          this.braces = braces;
          this.parens = parens;
          this.type = "comment";
          parent.block = this;
        }

      };
      PreambleNode = class {
        constructor(parent, raw, braces, parens) {
          this.parent = parent;
          this.raw = raw;
          this.braces = braces;
          this.parens = parens;
          this.type = "preamble";
          parent.block = this;
        }

      };
      StringNode = class {
        constructor(parent, raw, braces, parens) {
          this.parent = parent;
          this.raw = raw;
          this.braces = braces;
          this.parens = parens;
          this.type = "string";
          parent.block = this;
        }

      };
      EntryNode = class {
        constructor(parent) {
          this.parent = parent;
          this.type = "entry";
          parent.block = this;
          this.fields = [];
        }

      };
      FieldNode = class {
        constructor(parent) {
          var name2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
          this.parent = parent;
          this.name = name2;
          this.type = "field";
          this.value = new ConcatNode(this);
        }

      };
      ConcatNode = class {
        constructor(parent) {
          this.parent = parent;
          this.type = "concat";
          this.canConsumeValue = true;
          this.concat = [];
        }

      };
      LiteralNode = class {
        constructor(parent, value) {
          this.parent = parent;
          this.value = value;
          this.type = "literal";
          parent.concat.push(this);
        }

      };
      BracedNode = class {
        constructor(parent) {
          this.parent = parent;
          this.type = "braced";
          this.value = "";
          this.depth = 0;
          parent.concat.push(this);
        }

      };
      QuotedNode = class {
        constructor(parent) {
          this.parent = parent;
          this.type = "quoted";
          this.value = "";
          this.depth = 0;
          parent.concat.push(this);
        }

      };
      BibTeXSyntaxError = class extends Error {
        constructor(input, node, pos, line, column) {
          super("Line ".concat(line, ":").concat(column, ": Syntax Error in ").concat(node.type, "\n") + input.slice(Math.max(0, pos - 20), pos) + ">>" + input[pos] + "<<" + input.slice(pos + 1, pos + 20));
          this.node = node;
          this.line = line;
          this.column = column;
          this.name = "Syntax Error";
          this.char = input[pos];
        }

      };
    }

  }); // src/unicode.ts


  var specialCharacters;

  var init_unicode = __esm({
    "src/unicode.ts"() {
      specialCharacters = /* @__PURE__ */new Map([["0023", "\\#"], ["0024", "\\$"], ["0025", "\\%"], ["0026", "\\&"], ["0027", "'"], ["0040", "\\@"], ["002a", "\\textasteriskcentered"], ["005f", "\\_"], ["007c", "\\vert{}"], ["00a0", "~"], ["00a1", "\\textexclamdown{}"], ["00a2", "\\textcent{}"], ["00a3", "\\textsterling{}"], ["00a4", "\\textcurrency{}"], ["00a5", "\\textyen{}"], ["00a6", "\\textbrokenbar{}"], ["00a7", "\\textsection{}"], ["00a8", "\\textasciidieresis{}"], ["00a9", "\\textcopyright{}"], ["00aa", "\\textordfeminine{}"], ["00ab", "\\guillemotleft{}"], ["00ac", "\\lnot{}"], ["00ad", "\\-"], ["00ae", "\\textregistered{}"], ["00af", "\\textasciimacron{}"], ["00b0", "\\textdegree{}"], ["00b1", "\\pm{}"], ["00b2", "\\ensuremath{^2}"], ["00b3", "\\ensuremath{^3}"], ["00b4", "\\textasciiacute{}"], ["00b5", "\\mathrm{\\mu}"], ["00b6", "\\textparagraph{}"], ["00b7", "\\cdot{}"], ["00b8", "\\c{}"], ["00b9", "\\ensuremath{^1}"], ["00ba", "\\textordmasculine{}"], ["00bb", "\\guillemotright{}"], ["00bc", "\\textonequarter{}"], ["00bd", "\\textonehalf{}"], ["00be", "\\textthreequarters{}"], ["00bf", "\\textquestiondown{}"], ["00c0", "\\`{A}"], ["00c1", "\\'{A}"], ["00c2", "\\^{A}"], ["00c3", "\\~{A}"], ["00c4", '\\"{A}'], ["00c5", "\\AA{}"], ["00c6", "\\AE{}"], ["00c7", "\\c{C}"], ["00c8", "\\`{E}"], ["00c9", "\\'{E}"], ["00ca", "\\^{E}"], ["00cb", '\\"{E}'], ["00cc", "\\`{I}"], ["00cd", "\\'{I}"], ["00ce", "\\^{I}"], ["00cf", '\\"{I}'], ["00d0", "\\DH{}"], ["00d1", "\\~{N}"], ["00d2", "\\`{O}"], ["00d3", "\\'{O}"], ["00d4", "\\^{O}"], ["00d5", "\\~{O}"], ["00d6", '\\"{O}'], ["00d7", "\\texttimes{}"], ["00d8", "\\O{}"], ["00d9", "\\`{U}"], ["00da", "\\'{U}"], ["00db", "\\^{U}"], ["00dc", '\\"{U}'], ["00dd", "\\'{Y}"], ["00de", "\\TH{}"], ["00df", "\\ss{}"], ["00e0", "\\`{a}"], ["00e1", "\\'{a}"], ["00e2", "\\^{a}"], ["00e3", "\\~{a}"], ["00e4", '\\"{a}'], ["00e5", "\\aa{}"], ["00e6", "\\ae{}"], ["00e7", "\\c{c}"], ["00e8", "\\`{e}"], ["00e9", "\\'{e}"], ["00ea", "\\^{e}"], ["00eb", '\\"{e}'], ["00ec", "\\`{\\i}"], ["00ed", "\\'{\\i}"], ["00ee", "\\^{\\i}"], ["00ef", '\\"{\\i}'], ["00f0", "\\dh{}"], ["00f1", "\\~{n}"], ["00f2", "\\`{o}"], ["00f3", "\\'{o}"], ["00f4", "\\^{o}"], ["00f5", "\\~{o}"], ["00f6", '\\"{o}'], ["00f7", "\\div{}"], ["00f8", "\\o{}"], ["00f9", "\\`{u}"], ["00fa", "\\'{u}"], ["00fb", "\\^{u}"], ["00fc", '\\"{u}'], ["00fd", "\\'{y}"], ["00fe", "\\th{}"], ["00ff", '\\"{y}'], ["0100", "\\={A}"], ["0101", "\\={a}"], ["0102", "\\u{A}"], ["0103", "\\u{a}"], ["0104", "\\k{A}"], ["0105", "\\k{a}"], ["0106", "\\'{C}"], ["0107", "\\'{c}"], ["0108", "\\^{C}"], ["0109", "\\^{c}"], ["010a", "\\.{C}"], ["010b", "\\.{c}"], ["010c", "\\v{C}"], ["010d", "\\v{c}"], ["010e", "\\v{D}"], ["010f", "\\v{d}"], ["0110", "\\DJ{}"], ["0111", "\\dj{}"], ["0112", "\\={E}"], ["0113", "\\={e}"], ["0114", "\\u{E}"], ["0115", "\\u{e}"], ["0116", "\\.{E}"], ["0117", "\\.{e}"], ["0118", "\\k{E}"], ["0119", "\\k{e}"], ["011a", "\\v{E}"], ["011b", "\\v{e}"], ["011c", "\\^{G}"], ["011d", "\\^{g}"], ["011e", "\\u{G}"], ["011f", "\\u{g}"], ["0120", "\\.{G}"], ["0121", "\\.{g}"], ["0122", "\\c{G}"], ["0123", "\\c{g}"], ["0124", "\\^{H}"], ["0125", "\\^{h}"], ["0126", "{\\fontencoding{LELA}\\selectfont\\char40}"], ["0127", "\\Elzxh{}"], ["0128", "\\~{I}"], ["0129", "\\~{\\i}"], ["012a", "\\={I}"], ["012b", "\\={\\i}"], ["012c", "\\u{I}"], ["012d", "\\u{\\i}"], ["012e", "\\k{I}"], ["012f", "\\k{i}"], ["0130", "\\.{I}"], ["0131", "\\i{}"], ["0132", "IJ"], ["0133", "ij"], ["0134", "\\^{J}"], ["0135", "\\^{\\j}"], ["0136", "\\c{K}"], ["0137", "\\c{k}"], ["0138", "{\\fontencoding{LELA}\\selectfont\\char91}"], ["0139", "\\'{L}"], ["013a", "\\'{l}"], ["013b", "\\c{L}"], ["013c", "\\c{l}"], ["013d", "\\v{L}"], ["013e", "\\v{l}"], ["013f", "{\\fontencoding{LELA}\\selectfont\\char201}"], ["0140", "{\\fontencoding{LELA}\\selectfont\\char202}"], ["0141", "\\L{}"], ["0142", "\\l{}"], ["0143", "\\'{N}"], ["0144", "\\'{n}"], ["0145", "\\c{N}"], ["0146", "\\c{n}"], ["0147", "\\v{N}"], ["0148", "\\v{n}"], ["0149", "'n"], ["014a", "\\NG{}"], ["014b", "\\ng{}"], ["014c", "\\={O}"], ["014d", "\\={o}"], ["014e", "\\u{O}"], ["014f", "\\u{o}"], ["0150", "\\H{O}"], ["0151", "\\H{o}"], ["0152", "\\OE{}"], ["0153", "\\oe{}"], ["0154", "\\'{R}"], ["0155", "\\'{r}"], ["0156", "\\c{R}"], ["0157", "\\c{r}"], ["0158", "\\v{R}"], ["0159", "\\v{r}"], ["015a", "\\'{S}"], ["015b", "\\'{s}"], ["015c", "\\^{S}"], ["015d", "\\^{s}"], ["015e", "\\c{S}"], ["015f", "\\c{s}"], ["0160", "\\v{S}"], ["0161", "\\v{s}"], ["0162", "\\c{T}"], ["0163", "\\c{t}"], ["0164", "\\v{T}"], ["0165", "\\v{t}"], ["0166", "{\\fontencoding{LELA}\\selectfont\\char47}"], ["0167", "{\\fontencoding{LELA}\\selectfont\\char63}"], ["0168", "\\~{U}"], ["0169", "\\~{u}"], ["016a", "\\={U}"], ["016b", "\\={u}"], ["016c", "\\u{U}"], ["016d", "\\u{u}"], ["016e", "\\r{U}"], ["016f", "\\r{u}"], ["0170", "\\H{U}"], ["0171", "\\H{u}"], ["0172", "\\k{U}"], ["0173", "\\k{u}"], ["0174", "\\^{W}"], ["0175", "\\^{w}"], ["0176", "\\^{Y}"], ["0177", "\\^{y}"], ["0178", '\\"{Y}'], ["0179", "\\'{Z}"], ["017a", "\\'{z}"], ["017b", "\\.{Z}"], ["017c", "\\.{z}"], ["017d", "\\v{Z}"], ["017e", "\\v{z}"], ["0195", "\\texthvlig{}"], ["019e", "\\textnrleg{}"], ["01aa", "\\eth{}"], ["01ba", "{\\fontencoding{LELA}\\selectfont\\char195}"], ["01c2", "\\textdoublepipe{}"], ["01f5", "\\'{g}"], ["0250", "\\Elztrna{}"], ["0252", "\\Elztrnsa{}"], ["0254", "\\Elzopeno{}"], ["0256", "\\Elzrtld{}"], ["0258", "{\\fontencoding{LEIP}\\selectfont\\char61}"], ["0259", "\\Elzschwa{}"], ["025b", "\\varepsilon{}"], ["0263", "\\Elzpgamma{}"], ["0264", "\\Elzpbgam{}"], ["0265", "\\Elztrnh{}"], ["026c", "\\Elzbtdl{}"], ["026d", "\\Elzrtll{}"], ["026f", "\\Elztrnm{}"], ["0270", "\\Elztrnmlr{}"], ["0271", "\\Elzltlmr{}"], ["0272", "\\Elzltln{}"], ["0273", "\\Elzrtln{}"], ["0277", "\\Elzclomeg{}"], ["0278", "\\textphi{}"], ["0279", "\\Elztrnr{}"], ["027a", "\\Elztrnrl{}"], ["027b", "\\Elzrttrnr{}"], ["027c", "\\Elzrl{}"], ["027d", "\\Elzrtlr{}"], ["027e", "\\Elzfhr{}"], ["027f", "{\\fontencoding{LEIP}\\selectfont\\char202}"], ["0282", "\\Elzrtls{}"], ["0283", "\\Elzesh{}"], ["0287", "\\Elztrnt{}"], ["0288", "\\Elzrtlt{}"], ["028a", "\\Elzpupsil{}"], ["028b", "\\Elzpscrv{}"], ["028c", "\\Elzinvv{}"], ["028d", "\\Elzinvw{}"], ["028e", "\\Elztrny{}"], ["0290", "\\Elzrtlz{}"], ["0292", "\\Elzyogh{}"], ["0294", "\\Elzglst{}"], ["0295", "\\Elzreglst{}"], ["0296", "\\Elzinglst{}"], ["029e", "\\textturnk{}"], ["02a4", "\\Elzdyogh{}"], ["02a7", "\\Elztesh{}"], ["02c7", "\\textasciicaron{}"], ["02c8", "\\Elzverts{}"], ["02cc", "\\Elzverti{}"], ["02d0", "\\Elzlmrk{}"], ["02d1", "\\Elzhlmrk{}"], ["02d2", "\\Elzsbrhr{}"], ["02d3", "\\Elzsblhr{}"], ["02d4", "\\Elzrais{}"], ["02d5", "\\Elzlow{}"], ["02d8", "\\textasciibreve{}"], ["02d9", "\\textperiodcentered{}"], ["02da", "\\r{}"], ["02db", "\\k{}"], ["02dc", "\\texttildelow{}"], ["02dd", "\\H{}"], ["02e5", "\\tone{55}"], ["02e6", "\\tone{44}"], ["02e7", "\\tone{33}"], ["02e8", "\\tone{22}"], ["02e9", "\\tone{11}"], ["0300", "\\`"], ["0301", "\\'"], ["0302", "\\^"], ["0303", "\\~"], ["0304", "\\="], ["0306", "\\u"], ["0307", "\\."], ["0308", '\\"'], ["030a", "\\r"], ["030b", "\\H"], ["030c", "\\v"], ["030f", "\\cyrchar\\C"], ["0311", "{\\fontencoding{LECO}\\selectfont\\char177}"], ["0318", "{\\fontencoding{LECO}\\selectfont\\char184}"], ["0319", "{\\fontencoding{LECO}\\selectfont\\char185}"], ["0321", "\\Elzpalh{}"], ["0322", "\\Elzrh{}"], ["0327", "\\c"], ["0328", "\\k"], ["032a", "\\Elzsbbrg{}"], ["032b", "{\\fontencoding{LECO}\\selectfont\\char203}"], ["032f", "{\\fontencoding{LECO}\\selectfont\\char207}"], ["0335", "\\Elzxl{}"], ["0336", "\\Elzbar{}"], ["0337", "{\\fontencoding{LECO}\\selectfont\\char215}"], ["0338", "{\\fontencoding{LECO}\\selectfont\\char216}"], ["033a", "{\\fontencoding{LECO}\\selectfont\\char218}"], ["033b", "{\\fontencoding{LECO}\\selectfont\\char219}"], ["033c", "{\\fontencoding{LECO}\\selectfont\\char220}"], ["033d", "{\\fontencoding{LECO}\\selectfont\\char221}"], ["0361", "{\\fontencoding{LECO}\\selectfont\\char225}"], ["0386", "\\'{A}"], ["0388", "\\'{E}"], ["0389", "\\'{H}"], ["038a", "\\'{}{I}"], ["038c", "\\'{}O"], ["038e", "\\mathrm{'Y}"], ["038f", "\\mathrm{'\\Omega}"], ["0390", "\\acute{\\ddot{\\iota}}"], ["0391", "\\ensuremath{\\Alpha}"], ["0392", "\\ensuremath{\\Beta}"], ["0393", "\\ensuremath{\\Gamma}"], ["0394", "\\ensuremath{\\Delta}"], ["0395", "\\ensuremath{\\Epsilon}"], ["0396", "\\ensuremath{\\Zeta}"], ["0397", "\\ensuremath{\\Eta}"], ["0398", "\\ensuremath{\\Theta}"], ["0399", "\\ensuremath{\\Iota}"], ["039a", "\\ensuremath{\\Kappa}"], ["039b", "\\ensuremath{\\Lambda}"], ["039e", "\\ensuremath{\\Xi}"], ["03a0", "\\ensuremath{\\Pi}"], ["03a1", "\\ensuremath{\\Rho}"], ["03a3", "\\ensuremath{\\Sigma}"], ["03a4", "\\ensuremath{\\Tau}"], ["03a5", "\\ensuremath{\\Upsilon}"], ["03a6", "\\ensuremath{\\Phi}"], ["03a7", "\\ensuremath{\\Chi}"], ["03a8", "\\ensuremath{\\Psi}"], ["03a9", "\\ensuremath{\\Omega}"], ["03aa", "\\mathrm{\\ddot{I}}"], ["03ab", "\\mathrm{\\ddot{Y}}"], ["03ac", "\\'{$\\alpha$}"], ["03ad", "\\acute{\\epsilon}"], ["03ae", "\\acute{\\eta}"], ["03af", "\\acute{\\iota}"], ["03b0", "\\acute{\\ddot{\\upsilon}}"], ["03b1", "\\ensuremath{\\alpha}"], ["03b2", "\\ensuremath{\\beta}"], ["03b3", "\\ensuremath{\\gamma}"], ["03b4", "\\ensuremath{\\delta}"], ["03b5", "\\ensuremath{\\epsilon}"], ["03b6", "\\ensuremath{\\zeta}"], ["03b7", "\\ensuremath{\\eta}"], ["03b8", "\\texttheta{}"], ["03b9", "\\ensuremath{\\iota}"], ["03ba", "\\ensuremath{\\kappa}"], ["03bb", "\\ensuremath{\\lambda}"], ["03bc", "\\ensuremath{\\mu}"], ["03bd", "\\ensuremath{\\nu}"], ["03be", "\\ensuremath{\\xi}"], ["03c0", "\\ensuremath{\\pi}"], ["03c1", "\\ensuremath{\\rho}"], ["03c2", "\\ensuremath{\\varsigma}"], ["03c3", "\\ensuremath{\\sigma}"], ["03c4", "\\ensuremath{\\tau}"], ["03c5", "\\ensuremath{\\upsilon}"], ["03c6", "\\ensuremath{\\varphi}"], ["03c7", "\\ensuremath{\\chi}"], ["03c8", "\\ensuremath{\\psi}"], ["03c9", "\\ensuremath{\\omega}"], ["03ca", "\\ensuremath{\\ddot{\\iota}}"], ["03cb", "\\ensuremath{\\ddot{\\upsilon}}"], ["03cc", "\\'{o}"], ["03cd", "\\acute{\\upsilon}"], ["03ce", "\\acute{\\omega}"], ["03d0", "\\Pisymbol{ppi022}{87}"], ["03d1", "\\textvartheta{}"], ["03d2", "\\ensuremath{\\Upsilon}"], ["03d5", "\\ensuremath{\\phi}"], ["03d6", "\\ensuremath{\\varpi}"], ["03da", "\\Stigma{}"], ["03dc", "\\Digamma{}"], ["03dd", "\\digamma{}"], ["03de", "\\Koppa{}"], ["03e0", "\\Sampi{}"], ["03f0", "\\varkappa{}"], ["03f1", "\\varrho{}"], ["03f4", "\\textTheta{}"], ["03f6", "\\backepsilon{}"], ["0401", "\\cyrchar\\CYRYO{}"], ["0402", "\\cyrchar\\CYRDJE{}"], ["0403", "\\cyrchar{\\'\\CYRG}"], ["0404", "\\cyrchar\\CYRIE{}"], ["0405", "\\cyrchar\\CYRDZE{}"], ["0406", "\\cyrchar\\CYRII{}"], ["0407", "\\cyrchar\\CYRYI{}"], ["0408", "\\cyrchar\\CYRJE{}"], ["0409", "\\cyrchar\\CYRLJE{}"], ["040a", "\\cyrchar\\CYRNJE{}"], ["040b", "\\cyrchar\\CYRTSHE{}"], ["040c", "\\cyrchar{\\'\\CYRK}"], ["040e", "\\cyrchar\\CYRUSHRT{}"], ["040f", "\\cyrchar\\CYRDZHE{}"], ["0410", "\\cyrchar\\CYRA{}"], ["0411", "\\cyrchar\\CYRB{}"], ["0412", "\\cyrchar\\CYRV{}"], ["0413", "\\cyrchar\\CYRG{}"], ["0414", "\\cyrchar\\CYRD{}"], ["0415", "\\cyrchar\\CYRE{}"], ["0416", "\\cyrchar\\CYRZH{}"], ["0417", "\\cyrchar\\CYRZ{}"], ["0418", "\\cyrchar\\CYRI{}"], ["0419", "\\cyrchar\\CYRISHRT{}"], ["041a", "\\cyrchar\\CYRK{}"], ["041b", "\\cyrchar\\CYRL{}"], ["041c", "\\cyrchar\\CYRM{}"], ["041d", "\\cyrchar\\CYRN{}"], ["041e", "\\cyrchar\\CYRO{}"], ["041f", "\\cyrchar\\CYRP{}"], ["0420", "\\cyrchar\\CYRR{}"], ["0421", "\\cyrchar\\CYRS{}"], ["0422", "\\cyrchar\\CYRT{}"], ["0423", "\\cyrchar\\CYRU{}"], ["0424", "\\cyrchar\\CYRF{}"], ["0425", "\\cyrchar\\CYRH{}"], ["0426", "\\cyrchar\\CYRC{}"], ["0427", "\\cyrchar\\CYRCH{}"], ["0428", "\\cyrchar\\CYRSH{}"], ["0429", "\\cyrchar\\CYRSHCH{}"], ["042a", "\\cyrchar\\CYRHRDSN{}"], ["042b", "\\cyrchar\\CYRERY{}"], ["042c", "\\cyrchar\\CYRSFTSN{}"], ["042d", "\\cyrchar\\CYREREV{}"], ["042e", "\\cyrchar\\CYRYU{}"], ["042f", "\\cyrchar\\CYRYA{}"], ["0430", "\\cyrchar\\cyra{}"], ["0431", "\\cyrchar\\cyrb{}"], ["0432", "\\cyrchar\\cyrv{}"], ["0433", "\\cyrchar\\cyrg{}"], ["0434", "\\cyrchar\\cyrd{}"], ["0435", "\\cyrchar\\cyre{}"], ["0436", "\\cyrchar\\cyrzh{}"], ["0437", "\\cyrchar\\cyrz{}"], ["0438", "\\cyrchar\\cyri{}"], ["0439", "\\cyrchar\\cyrishrt{}"], ["043a", "\\cyrchar\\cyrk{}"], ["043b", "\\cyrchar\\cyrl{}"], ["043c", "\\cyrchar\\cyrm{}"], ["043d", "\\cyrchar\\cyrn{}"], ["043e", "\\cyrchar\\cyro{}"], ["043f", "\\cyrchar\\cyrp{}"], ["0440", "\\cyrchar\\cyrr{}"], ["0441", "\\cyrchar\\cyrs{}"], ["0442", "\\cyrchar\\cyrt{}"], ["0443", "\\cyrchar\\cyru{}"], ["0444", "\\cyrchar\\cyrf{}"], ["0445", "\\cyrchar\\cyrh{}"], ["0446", "\\cyrchar\\cyrc{}"], ["0447", "\\cyrchar\\cyrch{}"], ["0448", "\\cyrchar\\cyrsh{}"], ["0449", "\\cyrchar\\cyrshch{}"], ["044a", "\\cyrchar\\cyrhrdsn{}"], ["044b", "\\cyrchar\\cyrery{}"], ["044c", "\\cyrchar\\cyrsftsn{}"], ["044d", "\\cyrchar\\cyrerev{}"], ["044e", "\\cyrchar\\cyryu{}"], ["044f", "\\cyrchar\\cyrya{}"], ["0451", "\\cyrchar\\cyryo{}"], ["0452", "\\cyrchar\\cyrdje{}"], ["0453", "\\cyrchar{\\'\\cyrg}"], ["0454", "\\cyrchar\\cyrie{}"], ["0455", "\\cyrchar\\cyrdze{}"], ["0456", "\\cyrchar\\cyrii{}"], ["0457", "\\cyrchar\\cyryi{}"], ["0458", "\\cyrchar\\cyrje{}"], ["0459", "\\cyrchar\\cyrlje{}"], ["045a", "\\cyrchar\\cyrnje{}"], ["045b", "\\cyrchar\\cyrtshe{}"], ["045c", "\\cyrchar{\\'\\cyrk}"], ["045e", "\\cyrchar\\cyrushrt{}"], ["045f", "\\cyrchar\\cyrdzhe{}"], ["0460", "\\cyrchar\\CYROMEGA{}"], ["0461", "\\cyrchar\\cyromega{}"], ["0462", "\\cyrchar\\CYRYAT{}"], ["0464", "\\cyrchar\\CYRIOTE{}"], ["0465", "\\cyrchar\\cyriote{}"], ["0466", "\\cyrchar\\CYRLYUS{}"], ["0467", "\\cyrchar\\cyrlyus{}"], ["0468", "\\cyrchar\\CYRIOTLYUS{}"], ["0469", "\\cyrchar\\cyriotlyus{}"], ["046a", "\\cyrchar\\CYRBYUS{}"], ["046c", "\\cyrchar\\CYRIOTBYUS{}"], ["046d", "\\cyrchar\\cyriotbyus{}"], ["046e", "\\cyrchar\\CYRKSI{}"], ["046f", "\\cyrchar\\cyrksi{}"], ["0470", "\\cyrchar\\CYRPSI{}"], ["0471", "\\cyrchar\\cyrpsi{}"], ["0472", "\\cyrchar\\CYRFITA{}"], ["0474", "\\cyrchar\\CYRIZH{}"], ["0478", "\\cyrchar\\CYRUK{}"], ["0479", "\\cyrchar\\cyruk{}"], ["047a", "\\cyrchar\\CYROMEGARND{}"], ["047b", "\\cyrchar\\cyromegarnd{}"], ["047c", "\\cyrchar\\CYROMEGATITLO{}"], ["047d", "\\cyrchar\\cyromegatitlo{}"], ["047e", "\\cyrchar\\CYROT{}"], ["047f", "\\cyrchar\\cyrot{}"], ["0480", "\\cyrchar\\CYRKOPPA{}"], ["0481", "\\cyrchar\\cyrkoppa{}"], ["0482", "\\cyrchar\\cyrthousands{}"], ["0488", "\\cyrchar\\cyrhundredthousands{}"], ["0489", "\\cyrchar\\cyrmillions{}"], ["048c", "\\cyrchar\\CYRSEMISFTSN{}"], ["048d", "\\cyrchar\\cyrsemisftsn{}"], ["048e", "\\cyrchar\\CYRRTICK{}"], ["048f", "\\cyrchar\\cyrrtick{}"], ["0490", "\\cyrchar\\CYRGUP{}"], ["0491", "\\cyrchar\\cyrgup{}"], ["0492", "\\cyrchar\\CYRGHCRS{}"], ["0493", "\\cyrchar\\cyrghcrs{}"], ["0494", "\\cyrchar\\CYRGHK{}"], ["0495", "\\cyrchar\\cyrghk{}"], ["0496", "\\cyrchar\\CYRZHDSC{}"], ["0497", "\\cyrchar\\cyrzhdsc{}"], ["0498", "\\cyrchar\\CYRZDSC{}"], ["0499", "\\cyrchar\\cyrzdsc{}"], ["049a", "\\cyrchar\\CYRKDSC{}"], ["049b", "\\cyrchar\\cyrkdsc{}"], ["049c", "\\cyrchar\\CYRKVCRS{}"], ["049d", "\\cyrchar\\cyrkvcrs{}"], ["049e", "\\cyrchar\\CYRKHCRS{}"], ["049f", "\\cyrchar\\cyrkhcrs{}"], ["04a0", "\\cyrchar\\CYRKBEAK{}"], ["04a1", "\\cyrchar\\cyrkbeak{}"], ["04a2", "\\cyrchar\\CYRNDSC{}"], ["04a3", "\\cyrchar\\cyrndsc{}"], ["04a4", "\\cyrchar\\CYRNG{}"], ["04a5", "\\cyrchar\\cyrng{}"], ["04a6", "\\cyrchar\\CYRPHK{}"], ["04a7", "\\cyrchar\\cyrphk{}"], ["04a8", "\\cyrchar\\CYRABHHA{}"], ["04a9", "\\cyrchar\\cyrabhha{}"], ["04aa", "\\cyrchar\\CYRSDSC{}"], ["04ab", "\\cyrchar\\cyrsdsc{}"], ["04ac", "\\cyrchar\\CYRTDSC{}"], ["04ad", "\\cyrchar\\cyrtdsc{}"], ["04ae", "\\cyrchar\\CYRY{}"], ["04af", "\\cyrchar\\cyry{}"], ["04b0", "\\cyrchar\\CYRYHCRS{}"], ["04b1", "\\cyrchar\\cyryhcrs{}"], ["04b2", "\\cyrchar\\CYRHDSC{}"], ["04b3", "\\cyrchar\\cyrhdsc{}"], ["04b4", "\\cyrchar\\CYRTETSE{}"], ["04b5", "\\cyrchar\\cyrtetse{}"], ["04b6", "\\cyrchar\\CYRCHRDSC{}"], ["04b7", "\\cyrchar\\cyrchrdsc{}"], ["04b8", "\\cyrchar\\CYRCHVCRS{}"], ["04b9", "\\cyrchar\\cyrchvcrs{}"], ["04ba", "\\cyrchar\\CYRSHHA{}"], ["04bb", "\\cyrchar\\cyrshha{}"], ["04bc", "\\cyrchar\\CYRABHCH{}"], ["04bd", "\\cyrchar\\cyrabhch{}"], ["04be", "\\cyrchar\\CYRABHCHDSC{}"], ["04bf", "\\cyrchar\\cyrabhchdsc{}"], ["04c0", "\\cyrchar\\CYRpalochka{}"], ["04c3", "\\cyrchar\\CYRKHK{}"], ["04c4", "\\cyrchar\\cyrkhk{}"], ["04c7", "\\cyrchar\\CYRNHK{}"], ["04c8", "\\cyrchar\\cyrnhk{}"], ["04cb", "\\cyrchar\\CYRCHLDSC{}"], ["04cc", "\\cyrchar\\cyrchldsc{}"], ["04d4", "\\cyrchar\\CYRAE{}"], ["04d5", "\\cyrchar\\cyrae{}"], ["04d8", "\\cyrchar\\CYRSCHWA{}"], ["04d9", "\\cyrchar\\cyrschwa{}"], ["04e0", "\\cyrchar\\CYRABHDZE{}"], ["04e1", "\\cyrchar\\cyrabhdze{}"], ["04e8", "\\cyrchar\\CYROTLD{}"], ["04e9", "\\cyrchar\\cyrotld{}"], ["2002", "\\hspace{0.6em}"], ["2003", "\\hspace{1em}"], ["2004", "\\hspace{0.33em}"], ["2005", "\\hspace{0.25em}"], ["2006", "\\hspace{0.166em}"], ["2007", "\\hphantom{0}"], ["2008", "\\hphantom{,}"], ["2009", "\\hspace{0.167em}"], ["200a", "\\mkern1mu{}"], ["2010", "-"], ["2014", "--"], ["2015", "\\rule{1em}{1pt}"], ["2016", "\\Vert{}"], ["2018", "`"], ["2019", "'"], ["201b", "\\Elzreapos{}"], ["201c", "``"], ["201d", "''"], ["201e", ",,"], ["2020", "\\textdagger{}"], ["2021", "\\textdaggerdbl{}"], ["2022", "\\textbullet{}"], ["2025", ".."], ["2026", "\\ldots{}"], ["2030", "\\textperthousand{}"], ["2031", "\\textpertenthousand{}"], ["2032", "\\ensuremath{'}"], ["2033", "\\ensuremath{''}"], ["2034", "\\ensuremath{'''}"], ["2035", "\\backprime{}"], ["2039", "\\guilsinglleft{}"], ["203a", "\\guilsinglright{}"], ["2057", "''''"], ["205f", "\\mkern4mu{}"], ["2060", "\\nolinebreak{}"], ["20a7", "\\ensuremath{\\Elzpes}"], ["20ac", "\\mbox{\\texteuro}{}"], ["20db", "\\dddot{}"], ["20dc", "\\ddddot{}"], ["2102", "\\mathbb{C}"], ["210a", "\\mathscr{g}"], ["210b", "\\mathscr{H}"], ["210c", "\\mathfrak{H}"], ["210d", "\\mathbb{H}"], ["210f", "\\hslash{}"], ["2110", "\\mathscr{I}"], ["2111", "\\mathfrak{I}"], ["2112", "\\mathscr{L}"], ["2113", "\\mathscr{l}"], ["2115", "\\mathbb{N}"], ["2116", "\\cyrchar\\textnumero{}"], ["2118", "\\wp{}"], ["2119", "\\mathbb{P}"], ["211a", "\\mathbb{Q}"], ["211b", "\\mathscr{R}"], ["211c", "\\mathfrak{R}"], ["211d", "\\mathbb{R}"], ["211e", "\\Elzxrat{}"], ["2122", "\\texttrademark{}"], ["2124", "\\mathbb{Z}"], ["2126", "\\Omega{}"], ["2127", "\\mho{}"], ["2128", "\\mathfrak{Z}"], ["2129", "\\ElsevierGlyph{2129}"], ["212b", "\\AA{}"], ["212c", "\\mathscr{B}"], ["212d", "\\mathfrak{C}"], ["212f", "\\mathscr{e}"], ["2130", "\\mathscr{E}"], ["2131", "\\mathscr{F}"], ["2133", "\\mathscr{M}"], ["2134", "\\mathscr{o}"], ["2135", "\\aleph{}"], ["2136", "\\beth{}"], ["2137", "\\gimel{}"], ["2138", "\\daleth{}"], ["2153", "\\textfrac{1}{3}"], ["2154", "\\textfrac{2}{3}"], ["2155", "\\textfrac{1}{5}"], ["2156", "\\textfrac{2}{5}"], ["2157", "\\textfrac{3}{5}"], ["2158", "\\textfrac{4}{5}"], ["2159", "\\textfrac{1}{6}"], ["215a", "\\textfrac{5}{6}"], ["215b", "\\textfrac{1}{8}"], ["215c", "\\textfrac{3}{8}"], ["215d", "\\textfrac{5}{8}"], ["215e", "\\textfrac{7}{8}"], ["2190", "\\leftarrow{}"], ["2191", "\\uparrow{}"], ["2192", "\\rightarrow{}"], ["2193", "\\downarrow{}"], ["2194", "\\leftrightarrow{}"], ["2195", "\\updownarrow{}"], ["2196", "\\nwarrow{}"], ["2197", "\\nearrow{}"], ["2198", "\\searrow{}"], ["2199", "\\swarrow{}"], ["219a", "\\nleftarrow{}"], ["219b", "\\nrightarrow{}"], ["219c", "\\arrowwaveright{}"], ["219d", "\\arrowwaveright{}"], ["219e", "\\twoheadleftarrow{}"], ["21a0", "\\twoheadrightarrow{}"], ["21a2", "\\leftarrowtail{}"], ["21a3", "\\rightarrowtail{}"], ["21a6", "\\mapsto{}"], ["21a9", "\\hookleftarrow{}"], ["21aa", "\\hookrightarrow{}"], ["21ab", "\\looparrowleft{}"], ["21ac", "\\looparrowright{}"], ["21ad", "\\leftrightsquigarrow{}"], ["21ae", "\\nleftrightarrow{}"], ["21b0", "\\Lsh{}"], ["21b1", "\\Rsh{}"], ["21b3", "\\ElsevierGlyph{21B3}"], ["21b6", "\\curvearrowleft{}"], ["21b7", "\\curvearrowright{}"], ["21ba", "\\circlearrowleft{}"], ["21bb", "\\circlearrowright{}"], ["21bc", "\\leftharpoonup{}"], ["21bd", "\\leftharpoondown{}"], ["21be", "\\upharpoonright{}"], ["21bf", "\\upharpoonleft{}"], ["21c0", "\\rightharpoonup{}"], ["21c1", "\\rightharpoondown{}"], ["21c2", "\\downharpoonright{}"], ["21c3", "\\downharpoonleft{}"], ["21c4", "\\rightleftarrows{}"], ["21c5", "\\dblarrowupdown{}"], ["21c6", "\\leftrightarrows{}"], ["21c7", "\\leftleftarrows{}"], ["21c8", "\\upuparrows{}"], ["21c9", "\\rightrightarrows{}"], ["21ca", "\\downdownarrows{}"], ["21cb", "\\leftrightharpoons{}"], ["21cc", "\\rightleftharpoons{}"], ["21cd", "\\nLeftarrow{}"], ["21ce", "\\nLeftrightarrow{}"], ["21cf", "\\nRightarrow{}"], ["21d0", "\\Leftarrow{}"], ["21d1", "\\Uparrow{}"], ["21d2", "\\Rightarrow{}"], ["21d3", "\\Downarrow{}"], ["21d4", "\\Leftrightarrow{}"], ["21d5", "\\Updownarrow{}"], ["21da", "\\Lleftarrow{}"], ["21db", "\\Rrightarrow{}"], ["21dd", "\\rightsquigarrow{}"], ["21f5", "\\DownArrowUpArrow{}"], ["2200", "\\forall{}"], ["2201", "\\complement{}"], ["2202", "\\partial{}"], ["2203", "\\exists{}"], ["2204", "\\nexists{}"], ["2205", "\\varnothing{}"], ["2207", "\\nabla{}"], ["2208", "\\in{}"], ["2209", "\\not\\in{}"], ["220b", "\\ni{}"], ["220c", "\\not\\ni{}"], ["220f", "\\prod{}"], ["2210", "\\coprod{}"], ["2211", "\\sum{}"], ["2212", "-"], ["2213", "\\mp{}"], ["2214", "\\dotplus{}"], ["2216", "\\setminus{}"], ["2217", "{\\_\\ast}"], ["2218", "\\circ{}"], ["2219", "\\bullet{}"], ["221a", "\\surd{}"], ["221d", "\\propto{}"], ["221e", "\\infty{}"], ["221f", "\\rightangle{}"], ["2220", "\\angle{}"], ["2221", "\\measuredangle{}"], ["2222", "\\sphericalangle{}"], ["2223", "\\mid{}"], ["2224", "\\nmid{}"], ["2225", "\\parallel{}"], ["2226", "\\nparallel{}"], ["2227", "\\wedge{}"], ["2228", "\\vee{}"], ["2229", "\\cap{}"], ["222a", "\\cup{}"], ["222b", "\\int{}"], ["222c", "\\int\\!\\int{}"], ["222d", "\\int\\!\\int\\!\\int{}"], ["222e", "\\oint{}"], ["222f", "\\surfintegral{}"], ["2230", "\\volintegral{}"], ["2231", "\\clwintegral{}"], ["2232", "\\ElsevierGlyph{2232}"], ["2233", "\\ElsevierGlyph{2233}"], ["2234", "\\therefore{}"], ["2235", "\\because{}"], ["2237", "\\Colon{}"], ["2238", "\\ElsevierGlyph{2238}"], ["223a", "\\mathbin{{:}\\!\\!{-}\\!\\!{:}}"], ["223b", "\\homothetic{}"], ["223c", "\\sim{}"], ["223d", "\\backsim{}"], ["223e", "\\lazysinv{}"], ["2240", "\\wr{}"], ["2241", "\\not\\sim{}"], ["2242", "\\ElsevierGlyph{2242}"], ["2243", "\\simeq{}"], ["2244", "\\not\\simeq{}"], ["2245", "\\cong{}"], ["2246", "\\approxnotequal{}"], ["2247", "\\not\\cong{}"], ["2248", "\\approx{}"], ["2249", "\\not\\approx{}"], ["224a", "\\approxeq{}"], ["224b", "\\tildetrpl{}"], ["224c", "\\allequal{}"], ["224d", "\\asymp{}"], ["224e", "\\Bumpeq{}"], ["224f", "\\bumpeq{}"], ["2250", "\\doteq{}"], ["2251", "\\doteqdot{}"], ["2252", "\\fallingdotseq{}"], ["2253", "\\risingdotseq{}"], ["2254", ":="], ["2255", "=:"], ["2256", "\\eqcirc{}"], ["2257", "\\circeq{}"], ["2259", "\\estimates{}"], ["225a", "\\ElsevierGlyph{225A}"], ["225b", "\\starequal{}"], ["225c", "\\triangleq{}"], ["225f", "\\ElsevierGlyph{225F}"], ["2260", "\\not ="], ["2261", "\\equiv{}"], ["2262", "\\not\\equiv{}"], ["2264", "\\leq{}"], ["2265", "\\geq{}"], ["2266", "\\leqq{}"], ["2267", "\\geqq{}"], ["2268", "\\lneqq{}"], ["2269", "\\gneqq{}"], ["226a", "\\ll{}"], ["226b", "\\gg{}"], ["226c", "\\between{}"], ["226d", "\\not\\kern-0.3em\\times{}"], ["226e", "\\not&lt;"], ["226f", "\\not&gt;"], ["2270", "\\not\\leq{}"], ["2271", "\\not\\geq{}"], ["2272", "\\lessequivlnt{}"], ["2273", "\\greaterequivlnt{}"], ["2274", "\\ElsevierGlyph{2274}"], ["2275", "\\ElsevierGlyph{2275}"], ["2276", "\\lessgtr{}"], ["2277", "\\gtrless{}"], ["2278", "\\notlessgreater{}"], ["2279", "\\notgreaterless{}"], ["227a", "\\prec{}"], ["227b", "\\succ{}"], ["227c", "\\preccurlyeq{}"], ["227d", "\\succcurlyeq{}"], ["227e", "\\precapprox{}"], ["227f", "\\succapprox{}"], ["2280", "\\not\\prec{}"], ["2281", "\\not\\succ{}"], ["2282", "\\subset{}"], ["2283", "\\supset{}"], ["2284", "\\not\\subset{}"], ["2285", "\\not\\supset{}"], ["2286", "\\subseteq{}"], ["2287", "\\supseteq{}"], ["2288", "\\not\\subseteq{}"], ["2289", "\\not\\supseteq{}"], ["228a", "\\subsetneq{}"], ["228b", "\\supsetneq{}"], ["228e", "\\uplus{}"], ["228f", "\\sqsubset{}"], ["2290", "\\sqsupset{}"], ["2291", "\\sqsubseteq{}"], ["2292", "\\sqsupseteq{}"], ["2293", "\\sqcap{}"], ["2294", "\\sqcup{}"], ["2295", "\\oplus{}"], ["2296", "\\ominus{}"], ["2297", "\\otimes{}"], ["2298", "\\oslash{}"], ["2299", "\\odot{}"], ["229a", "\\circledcirc{}"], ["229b", "\\circledast{}"], ["229d", "\\circleddash{}"], ["229e", "\\boxplus{}"], ["229f", "\\boxminus{}"], ["22a0", "\\boxtimes{}"], ["22a1", "\\boxdot{}"], ["22a2", "\\vdash{}"], ["22a3", "\\dashv{}"], ["22a4", "\\top{}"], ["22a5", "\\perp{}"], ["22a7", "\\truestate{}"], ["22a8", "\\forcesextra{}"], ["22a9", "\\Vdash{}"], ["22aa", "\\Vvdash{}"], ["22ab", "\\VDash{}"], ["22ac", "\\nvdash{}"], ["22ad", "\\nvDash{}"], ["22ae", "\\nVdash{}"], ["22af", "\\nVDash{}"], ["22b2", "\\vartriangleleft{}"], ["22b3", "\\vartriangleright{}"], ["22b4", "\\trianglelefteq{}"], ["22b5", "\\trianglerighteq{}"], ["22b6", "\\original{}"], ["22b7", "\\image{}"], ["22b8", "\\multimap{}"], ["22b9", "\\hermitconjmatrix{}"], ["22ba", "\\intercal{}"], ["22bb", "\\veebar{}"], ["22be", "\\rightanglearc{}"], ["22c0", "\\ElsevierGlyph{22C0}"], ["22c1", "\\ElsevierGlyph{22C1}"], ["22c2", "\\bigcap{}"], ["22c3", "\\bigcup{}"], ["22c4", "\\diamond{}"], ["22c5", "\\cdot{}"], ["22c6", "\\star{}"], ["22c7", "\\divideontimes{}"], ["22c8", "\\bowtie{}"], ["22c9", "\\ltimes{}"], ["22ca", "\\rtimes{}"], ["22cb", "\\leftthreetimes{}"], ["22cc", "\\rightthreetimes{}"], ["22cd", "\\backsimeq{}"], ["22ce", "\\curlyvee{}"], ["22cf", "\\curlywedge{}"], ["22d0", "\\Subset{}"], ["22d1", "\\Supset{}"], ["22d2", "\\Cap{}"], ["22d3", "\\Cup{}"], ["22d4", "\\pitchfork{}"], ["22d6", "\\lessdot{}"], ["22d7", "\\gtrdot{}"], ["22d8", "\\verymuchless{}"], ["22d9", "\\verymuchgreater{}"], ["22da", "\\lesseqgtr{}"], ["22db", "\\gtreqless{}"], ["22de", "\\curlyeqprec{}"], ["22df", "\\curlyeqsucc{}"], ["22e2", "\\not\\sqsubseteq{}"], ["22e3", "\\not\\sqsupseteq{}"], ["22e5", "\\Elzsqspne{}"], ["22e6", "\\lnsim{}"], ["22e7", "\\gnsim{}"], ["22e8", "\\precedesnotsimilar{}"], ["22e9", "\\succnsim{}"], ["22ea", "\\ntriangleleft{}"], ["22eb", "\\ntriangleright{}"], ["22ec", "\\ntrianglelefteq{}"], ["22ed", "\\ntrianglerighteq{}"], ["22ee", "\\vdots{}"], ["22ef", "\\cdots{}"], ["22f0", "\\upslopeellipsis{}"], ["22f1", "\\downslopeellipsis{}"], ["2305", "\\barwedge{}"], ["2306", "\\perspcorrespond{}"], ["2308", "\\lceil{}"], ["2309", "\\rceil{}"], ["230a", "\\lfloor{}"], ["230b", "\\rfloor{}"], ["2315", "\\recorder{}"], ["2316", '\\mathchar"2208'], ["231c", "\\ulcorner{}"], ["231d", "\\urcorner{}"], ["231e", "\\llcorner{}"], ["231f", "\\lrcorner{}"], ["2322", "\\frown{}"], ["2323", "\\smile{}"], ["2329", "\\langle{}"], ["232a", "\\rangle{}"], ["233d", "\\ElsevierGlyph{E838}"], ["23a3", "\\Elzdlcorn{}"], ["23b0", "\\lmoustache{}"], ["23b1", "\\rmoustache{}"], ["2423", "\\textvisiblespace{}"], ["2460", "\\ding{172}"], ["2461", "\\ding{173}"], ["2462", "\\ding{174}"], ["2463", "\\ding{175}"], ["2464", "\\ding{176}"], ["2465", "\\ding{177}"], ["2466", "\\ding{178}"], ["2467", "\\ding{179}"], ["2468", "\\ding{180}"], ["2469", "\\ding{181}"], ["24c8", "\\circledS{}"], ["2506", "\\Elzdshfnc{}"], ["2519", "\\Elzsqfnw{}"], ["2571", "\\diagup{}"], ["25a0", "\\ding{110}"], ["25a1", "\\square{}"], ["25aa", "\\blacksquare{}"], ["25ad", "\\fbox{~~}"], ["25af", "\\Elzvrecto{}"], ["25b1", "\\ElsevierGlyph{E381}"], ["25b2", "\\ding{115}"], ["25b3", "\\bigtriangleup{}"], ["25b4", "\\blacktriangle{}"], ["25b5", "\\vartriangle{}"], ["25b8", "\\blacktriangleright{}"], ["25b9", "\\triangleright{}"], ["25bc", "\\ding{116}"], ["25bd", "\\bigtriangledown{}"], ["25be", "\\blacktriangledown{}"], ["25bf", "\\triangledown{}"], ["25c2", "\\blacktriangleleft{}"], ["25c3", "\\triangleleft{}"], ["25c6", "\\ding{117}"], ["25ca", "\\lozenge{}"], ["25cb", "\\bigcirc{}"], ["25cf", "\\ding{108}"], ["25d0", "\\Elzcirfl{}"], ["25d1", "\\Elzcirfr{}"], ["25d2", "\\Elzcirfb{}"], ["25d7", "\\ding{119}"], ["25d8", "\\Elzrvbull{}"], ["25e7", "\\Elzsqfl{}"], ["25e8", "\\Elzsqfr{}"], ["25ea", "\\Elzsqfse{}"], ["25ef", "\\bigcirc{}"], ["2605", "\\ding{72}"], ["2606", "\\ding{73}"], ["260e", "\\ding{37}"], ["261b", "\\ding{42}"], ["261e", "\\ding{43}"], ["263e", "\\rightmoon{}"], ["263f", "\\mercury{}"], ["2640", "\\venus{}"], ["2642", "\\male{}"], ["2643", "\\jupiter{}"], ["2644", "\\saturn{}"], ["2645", "\\uranus{}"], ["2646", "\\neptune{}"], ["2647", "\\pluto{}"], ["2648", "\\aries{}"], ["2649", "\\taurus{}"], ["264a", "\\gemini{}"], ["264b", "\\cancer{}"], ["264c", "\\leo{}"], ["264d", "\\virgo{}"], ["264e", "\\libra{}"], ["264f", "\\scorpio{}"], ["2650", "\\sagittarius{}"], ["2651", "\\capricornus{}"], ["2652", "\\aquarius{}"], ["2653", "\\pisces{}"], ["2660", "\\ding{171}"], ["2662", "\\diamond{}"], ["2663", "\\ding{168}"], ["2665", "\\ding{170}"], ["2666", "\\ding{169}"], ["2669", "\\quarternote{}"], ["266a", "\\eighthnote{}"], ["266d", "\\flat{}"], ["266e", "\\natural{}"], ["266f", "\\sharp{}"], ["2701", "\\ding{33}"], ["2702", "\\ding{34}"], ["2703", "\\ding{35}"], ["2704", "\\ding{36}"], ["2706", "\\ding{38}"], ["2707", "\\ding{39}"], ["2708", "\\ding{40}"], ["2709", "\\ding{41}"], ["270c", "\\ding{44}"], ["270d", "\\ding{45}"], ["270e", "\\ding{46}"], ["270f", "\\ding{47}"], ["2710", "\\ding{48}"], ["2711", "\\ding{49}"], ["2712", "\\ding{50}"], ["2713", "\\ding{51}"], ["2714", "\\ding{52}"], ["2715", "\\ding{53}"], ["2716", "\\ding{54}"], ["2717", "\\ding{55}"], ["2718", "\\ding{56}"], ["2719", "\\ding{57}"], ["271a", "\\ding{58}"], ["271b", "\\ding{59}"], ["271c", "\\ding{60}"], ["271d", "\\ding{61}"], ["271e", "\\ding{62}"], ["271f", "\\ding{63}"], ["2720", "\\ding{64}"], ["2721", "\\ding{65}"], ["2722", "\\ding{66}"], ["2723", "\\ding{67}"], ["2724", "\\ding{68}"], ["2725", "\\ding{69}"], ["2726", "\\ding{70}"], ["2727", "\\ding{71}"], ["2729", "\\ding{73}"], ["272a", "\\ding{74}"], ["272b", "\\ding{75}"], ["272c", "\\ding{76}"], ["272d", "\\ding{77}"], ["272e", "\\ding{78}"], ["272f", "\\ding{79}"], ["2730", "\\ding{80}"], ["2731", "\\ding{81}"], ["2732", "\\ding{82}"], ["2733", "\\ding{83}"], ["2734", "\\ding{84}"], ["2735", "\\ding{85}"], ["2736", "\\ding{86}"], ["2737", "\\ding{87}"], ["2738", "\\ding{88}"], ["2739", "\\ding{89}"], ["273a", "\\ding{90}"], ["273b", "\\ding{91}"], ["273c", "\\ding{92}"], ["273d", "\\ding{93}"], ["273e", "\\ding{94}"], ["273f", "\\ding{95}"], ["2740", "\\ding{96}"], ["2741", "\\ding{97}"], ["2742", "\\ding{98}"], ["2743", "\\ding{99}"], ["2744", "\\ding{100}"], ["2745", "\\ding{101}"], ["2746", "\\ding{102}"], ["2747", "\\ding{103}"], ["2748", "\\ding{104}"], ["2749", "\\ding{105}"], ["274a", "\\ding{106}"], ["274b", "\\ding{107}"], ["274d", "\\ding{109}"], ["274f", "\\ding{111}"], ["2750", "\\ding{112}"], ["2751", "\\ding{113}"], ["2752", "\\ding{114}"], ["2756", "\\ding{118}"], ["2758", "\\ding{120}"], ["2759", "\\ding{121}"], ["275a", "\\ding{122}"], ["275b", "\\ding{123}"], ["275c", "\\ding{124}"], ["275d", "\\ding{125}"], ["275e", "\\ding{126}"], ["2761", "\\ding{161}"], ["2762", "\\ding{162}"], ["2763", "\\ding{163}"], ["2764", "\\ding{164}"], ["2765", "\\ding{165}"], ["2766", "\\ding{166}"], ["2767", "\\ding{167}"], ["2776", "\\ding{182}"], ["2777", "\\ding{183}"], ["2778", "\\ding{184}"], ["2779", "\\ding{185}"], ["277a", "\\ding{186}"], ["277b", "\\ding{187}"], ["277c", "\\ding{188}"], ["277d", "\\ding{189}"], ["277e", "\\ding{190}"], ["277f", "\\ding{191}"], ["2780", "\\ding{192}"], ["2781", "\\ding{193}"], ["2782", "\\ding{194}"], ["2783", "\\ding{195}"], ["2784", "\\ding{196}"], ["2785", "\\ding{197}"], ["2786", "\\ding{198}"], ["2787", "\\ding{199}"], ["2788", "\\ding{200}"], ["2789", "\\ding{201}"], ["278a", "\\ding{202}"], ["278b", "\\ding{203}"], ["278c", "\\ding{204}"], ["278d", "\\ding{205}"], ["278e", "\\ding{206}"], ["278f", "\\ding{207}"], ["2790", "\\ding{208}"], ["2791", "\\ding{209}"], ["2792", "\\ding{210}"], ["2793", "\\ding{211}"], ["2794", "\\ding{212}"], ["2798", "\\ding{216}"], ["2799", "\\ding{217}"], ["279a", "\\ding{218}"], ["279b", "\\ding{219}"], ["279c", "\\ding{220}"], ["279d", "\\ding{221}"], ["279e", "\\ding{222}"], ["279f", "\\ding{223}"], ["27a0", "\\ding{224}"], ["27a1", "\\ding{225}"], ["27a2", "\\ding{226}"], ["27a3", "\\ding{227}"], ["27a4", "\\ding{228}"], ["27a5", "\\ding{229}"], ["27a6", "\\ding{230}"], ["27a7", "\\ding{231}"], ["27a8", "\\ding{232}"], ["27a9", "\\ding{233}"], ["27aa", "\\ding{234}"], ["27ab", "\\ding{235}"], ["27ac", "\\ding{236}"], ["27ad", "\\ding{237}"], ["27ae", "\\ding{238}"], ["27af", "\\ding{239}"], ["27b1", "\\ding{241}"], ["27b2", "\\ding{242}"], ["27b3", "\\ding{243}"], ["27b4", "\\ding{244}"], ["27b5", "\\ding{245}"], ["27b6", "\\ding{246}"], ["27b7", "\\ding{247}"], ["27b8", "\\ding{248}"], ["27b9", "\\ding{249}"], ["27ba", "\\ding{250}"], ["27bb", "\\ding{251}"], ["27bc", "\\ding{252}"], ["27bd", "\\ding{253}"], ["27be", "\\ding{254}"], ["27f5", "\\longleftarrow{}"], ["27f6", "\\longrightarrow{}"], ["27f7", "\\longleftrightarrow{}"], ["27f8", "\\Longleftarrow{}"], ["27f9", "\\Longrightarrow{}"], ["27fa", "\\Longleftrightarrow{}"], ["27fc", "\\longmapsto{}"], ["27ff", "\\sim\\joinrel\\leadsto"], ["2905", "\\ElsevierGlyph{E212}"], ["2912", "\\UpArrowBar{}"], ["2913", "\\DownArrowBar{}"], ["2923", "\\ElsevierGlyph{E20C}"], ["2924", "\\ElsevierGlyph{E20D}"], ["2925", "\\ElsevierGlyph{E20B}"], ["2926", "\\ElsevierGlyph{E20A}"], ["2927", "\\ElsevierGlyph{E211}"], ["2928", "\\ElsevierGlyph{E20E}"], ["2929", "\\ElsevierGlyph{E20F}"], ["292a", "\\ElsevierGlyph{E210}"], ["2933", "\\ElsevierGlyph{E21C}"], ["2936", "\\ElsevierGlyph{E21A}"], ["2937", "\\ElsevierGlyph{E219}"], ["2940", "\\Elolarr{}"], ["2941", "\\Elorarr{}"], ["2942", "\\ElzRlarr{}"], ["2944", "\\ElzrLarr{}"], ["2947", "\\Elzrarrx{}"], ["294e", "\\LeftRightVector{}"], ["294f", "\\RightUpDownVector{}"], ["2950", "\\DownLeftRightVector{}"], ["2951", "\\LeftUpDownVector{}"], ["2952", "\\LeftVectorBar{}"], ["2953", "\\RightVectorBar{}"], ["2954", "\\RightUpVectorBar{}"], ["2955", "\\RightDownVectorBar{}"], ["2956", "\\DownLeftVectorBar{}"], ["2957", "\\DownRightVectorBar{}"], ["2958", "\\LeftUpVectorBar{}"], ["2959", "\\LeftDownVectorBar{}"], ["295a", "\\LeftTeeVector{}"], ["295b", "\\RightTeeVector{}"], ["295c", "\\RightUpTeeVector{}"], ["295d", "\\RightDownTeeVector{}"], ["295e", "\\DownLeftTeeVector{}"], ["295f", "\\DownRightTeeVector{}"], ["2960", "\\LeftUpTeeVector{}"], ["2961", "\\LeftDownTeeVector{}"], ["296e", "\\UpEquilibrium{}"], ["296f", "\\ReverseUpEquilibrium{}"], ["2970", "\\RoundImplies{}"], ["297c", "\\ElsevierGlyph{E214}"], ["297d", "\\ElsevierGlyph{E215}"], ["2980", "\\Elztfnc{}"], ["2985", "\\ElsevierGlyph{3018}"], ["2986", "\\Elroang{}"], ["2993", "&lt;\\kern-0.58em("], ["2994", "\\ElsevierGlyph{E291}"], ["2999", "\\Elzddfnc{}"], ["299c", "\\Angle{}"], ["29a0", "\\Elzlpargt{}"], ["29b5", "\\ElsevierGlyph{E260}"], ["29b6", "\\ElsevierGlyph{E61B}"], ["29ca", "\\ElzLap{}"], ["29cb", "\\Elzdefas{}"], ["29cf", "\\LeftTriangleBar{}"], ["29d0", "\\RightTriangleBar{}"], ["29dc", "\\ElsevierGlyph{E372}"], ["29eb", "\\blacklozenge{}"], ["29f4", "\\RuleDelayed{}"], ["2a04", "\\Elxuplus{}"], ["2a05", "\\ElzThr{}"], ["2a06", "\\Elxsqcup{}"], ["2a07", "\\ElzInf{}"], ["2a08", "\\ElzSup{}"], ["2a0d", "\\ElzCint{}"], ["2a0f", "\\clockoint{}"], ["2a10", "\\ElsevierGlyph{E395}"], ["2a16", "\\sqrint{}"], ["2a25", "\\ElsevierGlyph{E25A}"], ["2a2a", "\\ElsevierGlyph{E25B}"], ["2a2d", "\\ElsevierGlyph{E25C}"], ["2a2e", "\\ElsevierGlyph{E25D}"], ["2a2f", "\\ElzTimes{}"], ["2a34", "\\ElsevierGlyph{E25E}"], ["2a35", "\\ElsevierGlyph{E25E}"], ["2a3c", "\\ElsevierGlyph{E259}"], ["2a3f", "\\amalg{}"], ["2a53", "\\ElzAnd{}"], ["2a54", "\\ElzOr{}"], ["2a55", "\\ElsevierGlyph{E36E}"], ["2a56", "\\ElOr{}"], ["2a5e", "\\perspcorrespond{}"], ["2a5f", "\\Elzminhat{}"], ["2a63", "\\ElsevierGlyph{225A}"], ["2a6e", "\\stackrel{*}{=}"], ["2a75", "\\Equal{}"], ["2a7d", "\\leqslant{}"], ["2a7e", "\\geqslant{}"], ["2a85", "\\lessapprox{}"], ["2a86", "\\gtrapprox{}"], ["2a87", "\\lneq{}"], ["2a88", "\\gneq{}"], ["2a89", "\\lnapprox{}"], ["2a8a", "\\gnapprox{}"], ["2a8b", "\\lesseqqgtr{}"], ["2a8c", "\\gtreqqless{}"], ["2a95", "\\eqslantless{}"], ["2a96", "\\eqslantgtr{}"], ["2a9d", "\\Pisymbol{ppi020}{117}"], ["2a9e", "\\Pisymbol{ppi020}{105}"], ["2aa1", "\\NestedLessLess{}"], ["2aa2", "\\NestedGreaterGreater{}"], ["2aaf", "\\preceq{}"], ["2ab0", "\\succeq{}"], ["2ab5", "\\precneqq{}"], ["2ab6", "\\succneqq{}"], ["2ab7", "\\precapprox{}"], ["2ab8", "\\succapprox{}"], ["2ab9", "\\precnapprox{}"], ["2aba", "\\succnapprox{}"], ["2ac5", "\\subseteqq{}"], ["2ac6", "\\supseteqq{}"], ["2acb", "\\subsetneqq{}"], ["2acc", "\\supsetneqq{}"], ["2aeb", "\\ElsevierGlyph{E30D}"], ["2af6", "\\Elztdcol{}"], ["2afd", "{{/}\\!\\!{/}}"], ["300a", "\\ElsevierGlyph{300A}"], ["300b", "\\ElsevierGlyph{300B}"], ["3018", "\\ElsevierGlyph{3018}"], ["3019", "\\ElsevierGlyph{3019}"], ["301a", "\\openbracketleft{}"], ["301b", "\\openbracketright{}"], ["fb00", "ff"], ["fb01", "fi"], ["fb02", "fl"], ["fb03", "ffi"], ["fb04", "ffl"], ["d400", "\\mathbf{A}"], ["d401", "\\mathbf{B}"], ["d402", "\\mathbf{C}"], ["d403", "\\mathbf{D}"], ["d404", "\\mathbf{E}"], ["d405", "\\mathbf{F}"], ["d406", "\\mathbf{G}"], ["d407", "\\mathbf{H}"], ["d408", "\\mathbf{I}"], ["d409", "\\mathbf{J}"], ["d40a", "\\mathbf{K}"], ["d40b", "\\mathbf{L}"], ["d40c", "\\mathbf{M}"], ["d40d", "\\mathbf{N}"], ["d40e", "\\mathbf{O}"], ["d40f", "\\mathbf{P}"], ["d410", "\\mathbf{Q}"], ["d411", "\\mathbf{R}"], ["d412", "\\mathbf{S}"], ["d413", "\\mathbf{T}"], ["d414", "\\mathbf{U}"], ["d415", "\\mathbf{V}"], ["d416", "\\mathbf{W}"], ["d417", "\\mathbf{X}"], ["d418", "\\mathbf{Y}"], ["d419", "\\mathbf{Z}"], ["d41a", "\\mathbf{a}"], ["d41b", "\\mathbf{b}"], ["d41c", "\\mathbf{c}"], ["d41d", "\\mathbf{d}"], ["d41e", "\\mathbf{e}"], ["d41f", "\\mathbf{f}"], ["d420", "\\mathbf{g}"], ["d421", "\\mathbf{h}"], ["d422", "\\mathbf{i}"], ["d423", "\\mathbf{j}"], ["d424", "\\mathbf{k}"], ["d425", "\\mathbf{l}"], ["d426", "\\mathbf{m}"], ["d427", "\\mathbf{n}"], ["d428", "\\mathbf{o}"], ["d429", "\\mathbf{p}"], ["d42a", "\\mathbf{q}"], ["d42b", "\\mathbf{r}"], ["d42c", "\\mathbf{s}"], ["d42d", "\\mathbf{t}"], ["d42e", "\\mathbf{u}"], ["d42f", "\\mathbf{v}"], ["d430", "\\mathbf{w}"], ["d431", "\\mathbf{x}"], ["d432", "\\mathbf{y}"], ["d433", "\\mathbf{z}"], ["d434", "\\mathsl{A}"], ["d435", "\\mathsl{B}"], ["d436", "\\mathsl{C}"], ["d437", "\\mathsl{D}"], ["d438", "\\mathsl{E}"], ["d439", "\\mathsl{F}"], ["d43a", "\\mathsl{G}"], ["d43b", "\\mathsl{H}"], ["d43c", "\\mathsl{I}"], ["d43d", "\\mathsl{J}"], ["d43e", "\\mathsl{K}"], ["d43f", "\\mathsl{L}"], ["d440", "\\mathsl{M}"], ["d441", "\\mathsl{N}"], ["d442", "\\mathsl{O}"], ["d443", "\\mathsl{P}"], ["d444", "\\mathsl{Q}"], ["d445", "\\mathsl{R}"], ["d446", "\\mathsl{S}"], ["d447", "\\mathsl{T}"], ["d448", "\\mathsl{U}"], ["d449", "\\mathsl{V}"], ["d44a", "\\mathsl{W}"], ["d44b", "\\mathsl{X}"], ["d44c", "\\mathsl{Y}"], ["d44d", "\\mathsl{Z}"], ["d44e", "\\mathsl{a}"], ["d44f", "\\mathsl{b}"], ["d450", "\\mathsl{c}"], ["d451", "\\mathsl{d}"], ["d452", "\\mathsl{e}"], ["d453", "\\mathsl{f}"], ["d454", "\\mathsl{g}"], ["d456", "\\mathsl{i}"], ["d457", "\\mathsl{j}"], ["d458", "\\mathsl{k}"], ["d459", "\\mathsl{l}"], ["d45a", "\\mathsl{m}"], ["d45b", "\\mathsl{n}"], ["d45c", "\\mathsl{o}"], ["d45d", "\\mathsl{p}"], ["d45e", "\\mathsl{q}"], ["d45f", "\\mathsl{r}"], ["d460", "\\mathsl{s}"], ["d461", "\\mathsl{t}"], ["d462", "\\mathsl{u}"], ["d463", "\\mathsl{v}"], ["d464", "\\mathsl{w}"], ["d465", "\\mathsl{x}"], ["d466", "\\mathsl{y}"], ["d467", "\\mathsl{z}"], ["d468", "\\mathbit{A}"], ["d469", "\\mathbit{B}"], ["d46a", "\\mathbit{C}"], ["d46b", "\\mathbit{D}"], ["d46c", "\\mathbit{E}"], ["d46d", "\\mathbit{F}"], ["d46e", "\\mathbit{G}"], ["d46f", "\\mathbit{H}"], ["d470", "\\mathbit{I}"], ["d471", "\\mathbit{J}"], ["d472", "\\mathbit{K}"], ["d473", "\\mathbit{L}"], ["d474", "\\mathbit{M}"], ["d475", "\\mathbit{N}"], ["d476", "\\mathbit{O}"], ["d477", "\\mathbit{P}"], ["d478", "\\mathbit{Q}"], ["d479", "\\mathbit{R}"], ["d47a", "\\mathbit{S}"], ["d47b", "\\mathbit{T}"], ["d47c", "\\mathbit{U}"], ["d47d", "\\mathbit{V}"], ["d47e", "\\mathbit{W}"], ["d47f", "\\mathbit{X}"], ["d480", "\\mathbit{Y}"], ["d481", "\\mathbit{Z}"], ["d482", "\\mathbit{a}"], ["d483", "\\mathbit{b}"], ["d484", "\\mathbit{c}"], ["d485", "\\mathbit{d}"], ["d486", "\\mathbit{e}"], ["d487", "\\mathbit{f}"], ["d488", "\\mathbit{g}"], ["d489", "\\mathbit{h}"], ["d48a", "\\mathbit{i}"], ["d48b", "\\mathbit{j}"], ["d48c", "\\mathbit{k}"], ["d48d", "\\mathbit{l}"], ["d48e", "\\mathbit{m}"], ["d48f", "\\mathbit{n}"], ["d490", "\\mathbit{o}"], ["d491", "\\mathbit{p}"], ["d492", "\\mathbit{q}"], ["d493", "\\mathbit{r}"], ["d494", "\\mathbit{s}"], ["d495", "\\mathbit{t}"], ["d496", "\\mathbit{u}"], ["d497", "\\mathbit{v}"], ["d498", "\\mathbit{w}"], ["d499", "\\mathbit{x}"], ["d49a", "\\mathbit{y}"], ["d49b", "\\mathbit{z}"], ["d49c", "\\mathscr{A}"], ["d49e", "\\mathscr{C}"], ["d49f", "\\mathscr{D}"], ["d4a2", "\\mathscr{G}"], ["d4a5", "\\mathscr{J}"], ["d4a6", "\\mathscr{K}"], ["d4a9", "\\mathscr{N}"], ["d4aa", "\\mathscr{O}"], ["d4ab", "\\mathscr{P}"], ["d4ac", "\\mathscr{Q}"], ["d4ae", "\\mathscr{S}"], ["d4af", "\\mathscr{T}"], ["d4b0", "\\mathscr{U}"], ["d4b1", "\\mathscr{V}"], ["d4b2", "\\mathscr{W}"], ["d4b3", "\\mathscr{X}"], ["d4b4", "\\mathscr{Y}"], ["d4b5", "\\mathscr{Z}"], ["d4b6", "\\mathscr{a}"], ["d4b7", "\\mathscr{b}"], ["d4b8", "\\mathscr{c}"], ["d4b9", "\\mathscr{d}"], ["d4bb", "\\mathscr{f}"], ["d4bd", "\\mathscr{h}"], ["d4be", "\\mathscr{i}"], ["d4bf", "\\mathscr{j}"], ["d4c0", "\\mathscr{k}"], ["d4c1", "\\mathscr{l}"], ["d4c2", "\\mathscr{m}"], ["d4c3", "\\mathscr{n}"], ["d4c5", "\\mathscr{p}"], ["d4c6", "\\mathscr{q}"], ["d4c7", "\\mathscr{r}"], ["d4c8", "\\mathscr{s}"], ["d4c9", "\\mathscr{t}"], ["d4ca", "\\mathscr{u}"], ["d4cb", "\\mathscr{v}"], ["d4cc", "\\mathscr{w}"], ["d4cd", "\\mathscr{x}"], ["d4ce", "\\mathscr{y}"], ["d4cf", "\\mathscr{z}"], ["d4d0", "\\mathmit{A}"], ["d4d1", "\\mathmit{B}"], ["d4d2", "\\mathmit{C}"], ["d4d3", "\\mathmit{D}"], ["d4d4", "\\mathmit{E}"], ["d4d5", "\\mathmit{F}"], ["d4d6", "\\mathmit{G}"], ["d4d7", "\\mathmit{H}"], ["d4d8", "\\mathmit{I}"], ["d4d9", "\\mathmit{J}"], ["d4da", "\\mathmit{K}"], ["d4db", "\\mathmit{L}"], ["d4dc", "\\mathmit{M}"], ["d4dd", "\\mathmit{N}"], ["d4de", "\\mathmit{O}"], ["d4df", "\\mathmit{P}"], ["d4e0", "\\mathmit{Q}"], ["d4e1", "\\mathmit{R}"], ["d4e2", "\\mathmit{S}"], ["d4e3", "\\mathmit{T}"], ["d4e4", "\\mathmit{U}"], ["d4e5", "\\mathmit{V}"], ["d4e6", "\\mathmit{W}"], ["d4e7", "\\mathmit{X}"], ["d4e8", "\\mathmit{Y}"], ["d4e9", "\\mathmit{Z}"], ["d4ea", "\\mathmit{a}"], ["d4eb", "\\mathmit{b}"], ["d4ec", "\\mathmit{c}"], ["d4ed", "\\mathmit{d}"], ["d4ee", "\\mathmit{e}"], ["d4ef", "\\mathmit{f}"], ["d4f0", "\\mathmit{g}"], ["d4f1", "\\mathmit{h}"], ["d4f2", "\\mathmit{i}"], ["d4f3", "\\mathmit{j}"], ["d4f4", "\\mathmit{k}"], ["d4f5", "\\mathmit{l}"], ["d4f6", "\\mathmit{m}"], ["d4f7", "\\mathmit{n}"], ["d4f8", "\\mathmit{o}"], ["d4f9", "\\mathmit{p}"], ["d4fa", "\\mathmit{q}"], ["d4fb", "\\mathmit{r}"], ["d4fc", "\\mathmit{s}"], ["d4fd", "\\mathmit{t}"], ["d4fe", "\\mathmit{u}"], ["d4ff", "\\mathmit{v}"], ["d500", "\\mathmit{w}"], ["d501", "\\mathmit{x}"], ["d502", "\\mathmit{y}"], ["d503", "\\mathmit{z}"], ["d504", "\\mathfrak{A}"], ["d505", "\\mathfrak{B}"], ["d507", "\\mathfrak{D}"], ["d508", "\\mathfrak{E}"], ["d509", "\\mathfrak{F}"], ["d50a", "\\mathfrak{G}"], ["d50d", "\\mathfrak{J}"], ["d50e", "\\mathfrak{K}"], ["d50f", "\\mathfrak{L}"], ["d510", "\\mathfrak{M}"], ["d511", "\\mathfrak{N}"], ["d512", "\\mathfrak{O}"], ["d513", "\\mathfrak{P}"], ["d514", "\\mathfrak{Q}"], ["d516", "\\mathfrak{S}"], ["d517", "\\mathfrak{T}"], ["d518", "\\mathfrak{U}"], ["d519", "\\mathfrak{V}"], ["d51a", "\\mathfrak{W}"], ["d51b", "\\mathfrak{X}"], ["d51c", "\\mathfrak{Y}"], ["d51e", "\\mathfrak{a}"], ["d51f", "\\mathfrak{b}"], ["d520", "\\mathfrak{c}"], ["d521", "\\mathfrak{d}"], ["d522", "\\mathfrak{e}"], ["d523", "\\mathfrak{f}"], ["d524", "\\mathfrak{g}"], ["d525", "\\mathfrak{h}"], ["d526", "\\mathfrak{i}"], ["d527", "\\mathfrak{j}"], ["d528", "\\mathfrak{k}"], ["d529", "\\mathfrak{l}"], ["d52a", "\\mathfrak{m}"], ["d52b", "\\mathfrak{n}"], ["d52c", "\\mathfrak{o}"], ["d52d", "\\mathfrak{p}"], ["d52e", "\\mathfrak{q}"], ["d52f", "\\mathfrak{r}"], ["d530", "\\mathfrak{s}"], ["d531", "\\mathfrak{t}"], ["d532", "\\mathfrak{u}"], ["d533", "\\mathfrak{v}"], ["d534", "\\mathfrak{w}"], ["d535", "\\mathfrak{x}"], ["d536", "\\mathfrak{y}"], ["d537", "\\mathfrak{z}"], ["d538", "\\mathbb{A}"], ["d539", "\\mathbb{B}"], ["d53b", "\\mathbb{D}"], ["d53c", "\\mathbb{E}"], ["d53d", "\\mathbb{F}"], ["d53e", "\\mathbb{G}"], ["d540", "\\mathbb{I}"], ["d541", "\\mathbb{J}"], ["d542", "\\mathbb{K}"], ["d543", "\\mathbb{L}"], ["d544", "\\mathbb{M}"], ["d546", "\\mathbb{O}"], ["d54a", "\\mathbb{S}"], ["d54b", "\\mathbb{T}"], ["d54c", "\\mathbb{U}"], ["d54d", "\\mathbb{V}"], ["d54e", "\\mathbb{W}"], ["d54f", "\\mathbb{X}"], ["d550", "\\mathbb{Y}"], ["d552", "\\mathbb{a}"], ["d553", "\\mathbb{b}"], ["d554", "\\mathbb{c}"], ["d555", "\\mathbb{d}"], ["d556", "\\mathbb{e}"], ["d557", "\\mathbb{f}"], ["d558", "\\mathbb{g}"], ["d559", "\\mathbb{h}"], ["d55a", "\\mathbb{i}"], ["d55b", "\\mathbb{j}"], ["d55c", "\\mathbb{k}"], ["d55d", "\\mathbb{l}"], ["d55e", "\\mathbb{m}"], ["d55f", "\\mathbb{n}"], ["d560", "\\mathbb{o}"], ["d561", "\\mathbb{p}"], ["d562", "\\mathbb{q}"], ["d563", "\\mathbb{r}"], ["d564", "\\mathbb{s}"], ["d565", "\\mathbb{t}"], ["d566", "\\mathbb{u}"], ["d567", "\\mathbb{v}"], ["d568", "\\mathbb{w}"], ["d569", "\\mathbb{x}"], ["d56a", "\\mathbb{y}"], ["d56b", "\\mathbb{z}"], ["d56c", "\\mathslbb{A}"], ["d56d", "\\mathslbb{B}"], ["d56e", "\\mathslbb{C}"], ["d56f", "\\mathslbb{D}"], ["d570", "\\mathslbb{E}"], ["d571", "\\mathslbb{F}"], ["d572", "\\mathslbb{G}"], ["d573", "\\mathslbb{H}"], ["d574", "\\mathslbb{I}"], ["d575", "\\mathslbb{J}"], ["d576", "\\mathslbb{K}"], ["d577", "\\mathslbb{L}"], ["d578", "\\mathslbb{M}"], ["d579", "\\mathslbb{N}"], ["d57a", "\\mathslbb{O}"], ["d57b", "\\mathslbb{P}"], ["d57c", "\\mathslbb{Q}"], ["d57d", "\\mathslbb{R}"], ["d57e", "\\mathslbb{S}"], ["d57f", "\\mathslbb{T}"], ["d580", "\\mathslbb{U}"], ["d581", "\\mathslbb{V}"], ["d582", "\\mathslbb{W}"], ["d583", "\\mathslbb{X}"], ["d584", "\\mathslbb{Y}"], ["d585", "\\mathslbb{Z}"], ["d586", "\\mathslbb{a}"], ["d587", "\\mathslbb{b}"], ["d588", "\\mathslbb{c}"], ["d589", "\\mathslbb{d}"], ["d58a", "\\mathslbb{e}"], ["d58b", "\\mathslbb{f}"], ["d58c", "\\mathslbb{g}"], ["d58d", "\\mathslbb{h}"], ["d58e", "\\mathslbb{i}"], ["d58f", "\\mathslbb{j}"], ["d590", "\\mathslbb{k}"], ["d591", "\\mathslbb{l}"], ["d592", "\\mathslbb{m}"], ["d593", "\\mathslbb{n}"], ["d594", "\\mathslbb{o}"], ["d595", "\\mathslbb{p}"], ["d596", "\\mathslbb{q}"], ["d597", "\\mathslbb{r}"], ["d598", "\\mathslbb{s}"], ["d599", "\\mathslbb{t}"], ["d59a", "\\mathslbb{u}"], ["d59b", "\\mathslbb{v}"], ["d59c", "\\mathslbb{w}"], ["d59d", "\\mathslbb{x}"], ["d59e", "\\mathslbb{y}"], ["d59f", "\\mathslbb{z}"], ["d5a0", "\\mathsf{A}"], ["d5a1", "\\mathsf{B}"], ["d5a2", "\\mathsf{C}"], ["d5a3", "\\mathsf{D}"], ["d5a4", "\\mathsf{E}"], ["d5a5", "\\mathsf{F}"], ["d5a6", "\\mathsf{G}"], ["d5a7", "\\mathsf{H}"], ["d5a8", "\\mathsf{I}"], ["d5a9", "\\mathsf{J}"], ["d5aa", "\\mathsf{K}"], ["d5ab", "\\mathsf{L}"], ["d5ac", "\\mathsf{M}"], ["d5ad", "\\mathsf{N}"], ["d5ae", "\\mathsf{O}"], ["d5af", "\\mathsf{P}"], ["d5b0", "\\mathsf{Q}"], ["d5b1", "\\mathsf{R}"], ["d5b2", "\\mathsf{S}"], ["d5b3", "\\mathsf{T}"], ["d5b4", "\\mathsf{U}"], ["d5b5", "\\mathsf{V}"], ["d5b6", "\\mathsf{W}"], ["d5b7", "\\mathsf{X}"], ["d5b8", "\\mathsf{Y}"], ["d5b9", "\\mathsf{Z}"], ["d5ba", "\\mathsf{a}"], ["d5bb", "\\mathsf{b}"], ["d5bc", "\\mathsf{c}"], ["d5bd", "\\mathsf{d}"], ["d5be", "\\mathsf{e}"], ["d5bf", "\\mathsf{f}"], ["d5c0", "\\mathsf{g}"], ["d5c1", "\\mathsf{h}"], ["d5c2", "\\mathsf{i}"], ["d5c3", "\\mathsf{j}"], ["d5c4", "\\mathsf{k}"], ["d5c5", "\\mathsf{l}"], ["d5c6", "\\mathsf{m}"], ["d5c7", "\\mathsf{n}"], ["d5c8", "\\mathsf{o}"], ["d5c9", "\\mathsf{p}"], ["d5ca", "\\mathsf{q}"], ["d5cb", "\\mathsf{r}"], ["d5cc", "\\mathsf{s}"], ["d5cd", "\\mathsf{t}"], ["d5ce", "\\mathsf{u}"], ["d5cf", "\\mathsf{v}"], ["d5d0", "\\mathsf{w}"], ["d5d1", "\\mathsf{x}"], ["d5d2", "\\mathsf{y}"], ["d5d3", "\\mathsf{z}"], ["d5d4", "\\mathsfbf{A}"], ["d5d5", "\\mathsfbf{B}"], ["d5d6", "\\mathsfbf{C}"], ["d5d7", "\\mathsfbf{D}"], ["d5d8", "\\mathsfbf{E}"], ["d5d9", "\\mathsfbf{F}"], ["d5da", "\\mathsfbf{G}"], ["d5db", "\\mathsfbf{H}"], ["d5dc", "\\mathsfbf{I}"], ["d5dd", "\\mathsfbf{J}"], ["d5de", "\\mathsfbf{K}"], ["d5df", "\\mathsfbf{L}"], ["d5e0", "\\mathsfbf{M}"], ["d5e1", "\\mathsfbf{N}"], ["d5e2", "\\mathsfbf{O}"], ["d5e3", "\\mathsfbf{P}"], ["d5e4", "\\mathsfbf{Q}"], ["d5e5", "\\mathsfbf{R}"], ["d5e6", "\\mathsfbf{S}"], ["d5e7", "\\mathsfbf{T}"], ["d5e8", "\\mathsfbf{U}"], ["d5e9", "\\mathsfbf{V}"], ["d5ea", "\\mathsfbf{W}"], ["d5eb", "\\mathsfbf{X}"], ["d5ec", "\\mathsfbf{Y}"], ["d5ed", "\\mathsfbf{Z}"], ["d5ee", "\\mathsfbf{a}"], ["d5ef", "\\mathsfbf{b}"], ["d5f0", "\\mathsfbf{c}"], ["d5f1", "\\mathsfbf{d}"], ["d5f2", "\\mathsfbf{e}"], ["d5f3", "\\mathsfbf{f}"], ["d5f4", "\\mathsfbf{g}"], ["d5f5", "\\mathsfbf{h}"], ["d5f6", "\\mathsfbf{i}"], ["d5f7", "\\mathsfbf{j}"], ["d5f8", "\\mathsfbf{k}"], ["d5f9", "\\mathsfbf{l}"], ["d5fa", "\\mathsfbf{m}"], ["d5fb", "\\mathsfbf{n}"], ["d5fc", "\\mathsfbf{o}"], ["d5fd", "\\mathsfbf{p}"], ["d5fe", "\\mathsfbf{q}"], ["d5ff", "\\mathsfbf{r}"], ["d600", "\\mathsfbf{s}"], ["d601", "\\mathsfbf{t}"], ["d602", "\\mathsfbf{u}"], ["d603", "\\mathsfbf{v}"], ["d604", "\\mathsfbf{w}"], ["d605", "\\mathsfbf{x}"], ["d606", "\\mathsfbf{y}"], ["d607", "\\mathsfbf{z}"], ["d608", "\\mathsfsl{A}"], ["d609", "\\mathsfsl{B}"], ["d60a", "\\mathsfsl{C}"], ["d60b", "\\mathsfsl{D}"], ["d60c", "\\mathsfsl{E}"], ["d60d", "\\mathsfsl{F}"], ["d60e", "\\mathsfsl{G}"], ["d60f", "\\mathsfsl{H}"], ["d610", "\\mathsfsl{I}"], ["d611", "\\mathsfsl{J}"], ["d612", "\\mathsfsl{K}"], ["d613", "\\mathsfsl{L}"], ["d614", "\\mathsfsl{M}"], ["d615", "\\mathsfsl{N}"], ["d616", "\\mathsfsl{O}"], ["d617", "\\mathsfsl{P}"], ["d618", "\\mathsfsl{Q}"], ["d619", "\\mathsfsl{R}"], ["d61a", "\\mathsfsl{S}"], ["d61b", "\\mathsfsl{T}"], ["d61c", "\\mathsfsl{U}"], ["d61d", "\\mathsfsl{V}"], ["d61e", "\\mathsfsl{W}"], ["d61f", "\\mathsfsl{X}"], ["d620", "\\mathsfsl{Y}"], ["d621", "\\mathsfsl{Z}"], ["d622", "\\mathsfsl{a}"], ["d623", "\\mathsfsl{b}"], ["d624", "\\mathsfsl{c}"], ["d625", "\\mathsfsl{d}"], ["d626", "\\mathsfsl{e}"], ["d627", "\\mathsfsl{f}"], ["d628", "\\mathsfsl{g}"], ["d629", "\\mathsfsl{h}"], ["d62a", "\\mathsfsl{i}"], ["d62b", "\\mathsfsl{j}"], ["d62c", "\\mathsfsl{k}"], ["d62d", "\\mathsfsl{l}"], ["d62e", "\\mathsfsl{m}"], ["d62f", "\\mathsfsl{n}"], ["d630", "\\mathsfsl{o}"], ["d631", "\\mathsfsl{p}"], ["d632", "\\mathsfsl{q}"], ["d633", "\\mathsfsl{r}"], ["d634", "\\mathsfsl{s}"], ["d635", "\\mathsfsl{t}"], ["d636", "\\mathsfsl{u}"], ["d637", "\\mathsfsl{v}"], ["d638", "\\mathsfsl{w}"], ["d639", "\\mathsfsl{x}"], ["d63a", "\\mathsfsl{y}"], ["d63b", "\\mathsfsl{z}"], ["d63c", "\\mathsfbfsl{A}"], ["d63d", "\\mathsfbfsl{B}"], ["d63e", "\\mathsfbfsl{C}"], ["d63f", "\\mathsfbfsl{D}"], ["d640", "\\mathsfbfsl{E}"], ["d641", "\\mathsfbfsl{F}"], ["d642", "\\mathsfbfsl{G}"], ["d643", "\\mathsfbfsl{H}"], ["d644", "\\mathsfbfsl{I}"], ["d645", "\\mathsfbfsl{J}"], ["d646", "\\mathsfbfsl{K}"], ["d647", "\\mathsfbfsl{L}"], ["d648", "\\mathsfbfsl{M}"], ["d649", "\\mathsfbfsl{N}"], ["d64a", "\\mathsfbfsl{O}"], ["d64b", "\\mathsfbfsl{P}"], ["d64c", "\\mathsfbfsl{Q}"], ["d64d", "\\mathsfbfsl{R}"], ["d64e", "\\mathsfbfsl{S}"], ["d64f", "\\mathsfbfsl{T}"], ["d650", "\\mathsfbfsl{U}"], ["d651", "\\mathsfbfsl{V}"], ["d652", "\\mathsfbfsl{W}"], ["d653", "\\mathsfbfsl{X}"], ["d654", "\\mathsfbfsl{Y}"], ["d655", "\\mathsfbfsl{Z}"], ["d656", "\\mathsfbfsl{a}"], ["d657", "\\mathsfbfsl{b}"], ["d658", "\\mathsfbfsl{c}"], ["d659", "\\mathsfbfsl{d}"], ["d65a", "\\mathsfbfsl{e}"], ["d65b", "\\mathsfbfsl{f}"], ["d65c", "\\mathsfbfsl{g}"], ["d65d", "\\mathsfbfsl{h}"], ["d65e", "\\mathsfbfsl{i}"], ["d65f", "\\mathsfbfsl{j}"], ["d660", "\\mathsfbfsl{k}"], ["d661", "\\mathsfbfsl{l}"], ["d662", "\\mathsfbfsl{m}"], ["d663", "\\mathsfbfsl{n}"], ["d664", "\\mathsfbfsl{o}"], ["d665", "\\mathsfbfsl{p}"], ["d666", "\\mathsfbfsl{q}"], ["d667", "\\mathsfbfsl{r}"], ["d668", "\\mathsfbfsl{s}"], ["d669", "\\mathsfbfsl{t}"], ["d66a", "\\mathsfbfsl{u}"], ["d66b", "\\mathsfbfsl{v}"], ["d66c", "\\mathsfbfsl{w}"], ["d66d", "\\mathsfbfsl{x}"], ["d66e", "\\mathsfbfsl{y}"], ["d66f", "\\mathsfbfsl{z}"], ["d670", "\\mathtt{A}"], ["d671", "\\mathtt{B}"], ["d672", "\\mathtt{C}"], ["d673", "\\mathtt{D}"], ["d674", "\\mathtt{E}"], ["d675", "\\mathtt{F}"], ["d676", "\\mathtt{G}"], ["d677", "\\mathtt{H}"], ["d678", "\\mathtt{I}"], ["d679", "\\mathtt{J}"], ["d67a", "\\mathtt{K}"], ["d67b", "\\mathtt{L}"], ["d67c", "\\mathtt{M}"], ["d67d", "\\mathtt{N}"], ["d67e", "\\mathtt{O}"], ["d67f", "\\mathtt{P}"], ["d680", "\\mathtt{Q}"], ["d681", "\\mathtt{R}"], ["d682", "\\mathtt{S}"], ["d683", "\\mathtt{T}"], ["d684", "\\mathtt{U}"], ["d685", "\\mathtt{V}"], ["d686", "\\mathtt{W}"], ["d687", "\\mathtt{X}"], ["d688", "\\mathtt{Y}"], ["d689", "\\mathtt{Z}"], ["d68a", "\\mathtt{a}"], ["d68b", "\\mathtt{b}"], ["d68c", "\\mathtt{c}"], ["d68d", "\\mathtt{d}"], ["d68e", "\\mathtt{e}"], ["d68f", "\\mathtt{f}"], ["d690", "\\mathtt{g}"], ["d691", "\\mathtt{h}"], ["d692", "\\mathtt{i}"], ["d693", "\\mathtt{j}"], ["d694", "\\mathtt{k}"], ["d695", "\\mathtt{l}"], ["d696", "\\mathtt{m}"], ["d697", "\\mathtt{n}"], ["d698", "\\mathtt{o}"], ["d699", "\\mathtt{p}"], ["d69a", "\\mathtt{q}"], ["d69b", "\\mathtt{r}"], ["d69c", "\\mathtt{s}"], ["d69d", "\\mathtt{t}"], ["d69e", "\\mathtt{u}"], ["d69f", "\\mathtt{v}"], ["d6a0", "\\mathtt{w}"], ["d6a1", "\\mathtt{x}"], ["d6a2", "\\mathtt{y}"], ["d6a3", "\\mathtt{z}"], ["d6a8", "\\mathbf{\\Alpha}"], ["d6a9", "\\mathbf{\\Beta}"], ["d6aa", "\\mathbf{\\Gamma}"], ["d6ab", "\\mathbf{\\Delta}"], ["d6ac", "\\mathbf{\\Epsilon}"], ["d6ad", "\\mathbf{\\Zeta}"], ["d6ae", "\\mathbf{\\Eta}"], ["d6af", "\\mathbf{\\Theta}"], ["d6b0", "\\mathbf{\\Iota}"], ["d6b1", "\\mathbf{\\Kappa}"], ["d6b2", "\\mathbf{\\Lambda}"], ["d6b5", "\\mathbf{\\Xi}"], ["d6b7", "\\mathbf{\\Pi}"], ["d6b8", "\\mathbf{\\Rho}"], ["d6b9", "\\mathbf{\\vartheta}"], ["d6ba", "\\mathbf{\\Sigma}"], ["d6bb", "\\mathbf{\\Tau}"], ["d6bc", "\\mathbf{\\Upsilon}"], ["d6bd", "\\mathbf{\\Phi}"], ["d6be", "\\mathbf{\\Chi}"], ["d6bf", "\\mathbf{\\Psi}"], ["d6c0", "\\mathbf{\\Omega}"], ["d6c1", "\\mathbf{\\nabla}"], ["d6c2", "\\mathbf{\\Alpha}"], ["d6c3", "\\mathbf{\\Beta}"], ["d6c4", "\\mathbf{\\Gamma}"], ["d6c5", "\\mathbf{\\Delta}"], ["d6c6", "\\mathbf{\\Epsilon}"], ["d6c7", "\\mathbf{\\Zeta}"], ["d6c8", "\\mathbf{\\Eta}"], ["d6c9", "\\mathbf{\\theta}"], ["d6ca", "\\mathbf{\\Iota}"], ["d6cb", "\\mathbf{\\Kappa}"], ["d6cc", "\\mathbf{\\Lambda}"], ["d6cf", "\\mathbf{\\Xi}"], ["d6d1", "\\mathbf{\\Pi}"], ["d6d2", "\\mathbf{\\Rho}"], ["d6d3", "\\mathbf{\\varsigma}"], ["d6d4", "\\mathbf{\\Sigma}"], ["d6d5", "\\mathbf{\\Tau}"], ["d6d6", "\\mathbf{\\Upsilon}"], ["d6d7", "\\mathbf{\\Phi}"], ["d6d8", "\\mathbf{\\Chi}"], ["d6d9", "\\mathbf{\\Psi}"], ["d6da", "\\mathbf{\\Omega}"], ["d6db", "\\partial{}"], ["d6dc", "\\in"], ["d6dd", "\\mathbf{\\vartheta}"], ["d6de", "\\mathbf{\\varkappa}"], ["d6df", "\\mathbf{\\phi}"], ["d6e0", "\\mathbf{\\varrho}"], ["d6e1", "\\mathbf{\\varpi}"], ["d6e2", "\\mathsl{\\Alpha}"], ["d6e3", "\\mathsl{\\Beta}"], ["d6e4", "\\mathsl{\\Gamma}"], ["d6e5", "\\mathsl{\\Delta}"], ["d6e6", "\\mathsl{\\Epsilon}"], ["d6e7", "\\mathsl{\\Zeta}"], ["d6e8", "\\mathsl{\\Eta}"], ["d6e9", "\\mathsl{\\Theta}"], ["d6ea", "\\mathsl{\\Iota}"], ["d6eb", "\\mathsl{\\Kappa}"], ["d6ec", "\\mathsl{\\Lambda}"], ["d6ef", "\\mathsl{\\Xi}"], ["d6f1", "\\mathsl{\\Pi}"], ["d6f2", "\\mathsl{\\Rho}"], ["d6f3", "\\mathsl{\\vartheta}"], ["d6f4", "\\mathsl{\\Sigma}"], ["d6f5", "\\mathsl{\\Tau}"], ["d6f6", "\\mathsl{\\Upsilon}"], ["d6f7", "\\mathsl{\\Phi}"], ["d6f8", "\\mathsl{\\Chi}"], ["d6f9", "\\mathsl{\\Psi}"], ["d6fa", "\\mathsl{\\Omega}"], ["d6fb", "\\mathsl{\\nabla}"], ["d6fc", "\\mathsl{\\Alpha}"], ["d6fd", "\\mathsl{\\Beta}"], ["d6fe", "\\mathsl{\\Gamma}"], ["d6ff", "\\mathsl{\\Delta}"], ["d700", "\\mathsl{\\Epsilon}"], ["d701", "\\mathsl{\\Zeta}"], ["d702", "\\mathsl{\\Eta}"], ["d703", "\\mathsl{\\Theta}"], ["d704", "\\mathsl{\\Iota}"], ["d705", "\\mathsl{\\Kappa}"], ["d706", "\\mathsl{\\Lambda}"], ["d709", "\\mathsl{\\Xi}"], ["d70b", "\\mathsl{\\Pi}"], ["d70c", "\\mathsl{\\Rho}"], ["d70d", "\\mathsl{\\varsigma}"], ["d70e", "\\mathsl{\\Sigma}"], ["d70f", "\\mathsl{\\Tau}"], ["d710", "\\mathsl{\\Upsilon}"], ["d711", "\\mathsl{\\Phi}"], ["d712", "\\mathsl{\\Chi}"], ["d713", "\\mathsl{\\Psi}"], ["d714", "\\mathsl{\\Omega}"], ["d715", "\\partial{}"], ["d716", "\\in"], ["d717", "\\mathsl{\\vartheta}"], ["d718", "\\mathsl{\\varkappa}"], ["d719", "\\mathsl{\\phi}"], ["d71a", "\\mathsl{\\varrho}"], ["d71b", "\\mathsl{\\varpi}"], ["d71c", "\\mathbit{\\Alpha}"], ["d71d", "\\mathbit{\\Beta}"], ["d71e", "\\mathbit{\\Gamma}"], ["d71f", "\\mathbit{\\Delta}"], ["d720", "\\mathbit{\\Epsilon}"], ["d721", "\\mathbit{\\Zeta}"], ["d722", "\\mathbit{\\Eta}"], ["d723", "\\mathbit{\\Theta}"], ["d724", "\\mathbit{\\Iota}"], ["d725", "\\mathbit{\\Kappa}"], ["d726", "\\mathbit{\\Lambda}"], ["d729", "\\mathbit{\\Xi}"], ["d72b", "\\mathbit{\\Pi}"], ["d72c", "\\mathbit{\\Rho}"], ["d72d", "\\mathbit{O}"], ["d72e", "\\mathbit{\\Sigma}"], ["d72f", "\\mathbit{\\Tau}"], ["d730", "\\mathbit{\\Upsilon}"], ["d731", "\\mathbit{\\Phi}"], ["d732", "\\mathbit{\\Chi}"], ["d733", "\\mathbit{\\Psi}"], ["d734", "\\mathbit{\\Omega}"], ["d735", "\\mathbit{\\nabla}"], ["d736", "\\mathbit{\\Alpha}"], ["d737", "\\mathbit{\\Beta}"], ["d738", "\\mathbit{\\Gamma}"], ["d739", "\\mathbit{\\Delta}"], ["d73a", "\\mathbit{\\Epsilon}"], ["d73b", "\\mathbit{\\Zeta}"], ["d73c", "\\mathbit{\\Eta}"], ["d73d", "\\mathbit{\\Theta}"], ["d73e", "\\mathbit{\\Iota}"], ["d73f", "\\mathbit{\\Kappa}"], ["d740", "\\mathbit{\\Lambda}"], ["d743", "\\mathbit{\\Xi}"], ["d745", "\\mathbit{\\Pi}"], ["d746", "\\mathbit{\\Rho}"], ["d747", "\\mathbit{\\varsigma}"], ["d748", "\\mathbit{\\Sigma}"], ["d749", "\\mathbit{\\Tau}"], ["d74a", "\\mathbit{\\Upsilon}"], ["d74b", "\\mathbit{\\Phi}"], ["d74c", "\\mathbit{\\Chi}"], ["d74d", "\\mathbit{\\Psi}"], ["d74e", "\\mathbit{\\Omega}"], ["d74f", "\\partial{}"], ["d750", "\\in"], ["d751", "\\mathbit{\\vartheta}"], ["d752", "\\mathbit{\\varkappa}"], ["d753", "\\mathbit{\\phi}"], ["d754", "\\mathbit{\\varrho}"], ["d755", "\\mathbit{\\varpi}"], ["d756", "\\mathsfbf{\\Alpha}"], ["d757", "\\mathsfbf{\\Beta}"], ["d758", "\\mathsfbf{\\Gamma}"], ["d759", "\\mathsfbf{\\Delta}"], ["d75a", "\\mathsfbf{\\Epsilon}"], ["d75b", "\\mathsfbf{\\Zeta}"], ["d75c", "\\mathsfbf{\\Eta}"], ["d75d", "\\mathsfbf{\\Theta}"], ["d75e", "\\mathsfbf{\\Iota}"], ["d75f", "\\mathsfbf{\\Kappa}"], ["d760", "\\mathsfbf{\\Lambda}"], ["d763", "\\mathsfbf{\\Xi}"], ["d765", "\\mathsfbf{\\Pi}"], ["d766", "\\mathsfbf{\\Rho}"], ["d767", "\\mathsfbf{\\vartheta}"], ["d768", "\\mathsfbf{\\Sigma}"], ["d769", "\\mathsfbf{\\Tau}"], ["d76a", "\\mathsfbf{\\Upsilon}"], ["d76b", "\\mathsfbf{\\Phi}"], ["d76c", "\\mathsfbf{\\Chi}"], ["d76d", "\\mathsfbf{\\Psi}"], ["d76e", "\\mathsfbf{\\Omega}"], ["d76f", "\\mathsfbf{\\nabla}"], ["d770", "\\mathsfbf{\\Alpha}"], ["d771", "\\mathsfbf{\\Beta}"], ["d772", "\\mathsfbf{\\Gamma}"], ["d773", "\\mathsfbf{\\Delta}"], ["d774", "\\mathsfbf{\\Epsilon}"], ["d775", "\\mathsfbf{\\Zeta}"], ["d776", "\\mathsfbf{\\Eta}"], ["d777", "\\mathsfbf{\\Theta}"], ["d778", "\\mathsfbf{\\Iota}"], ["d779", "\\mathsfbf{\\Kappa}"], ["d77a", "\\mathsfbf{\\Lambda}"], ["d77d", "\\mathsfbf{\\Xi}"], ["d77f", "\\mathsfbf{\\Pi}"], ["d780", "\\mathsfbf{\\Rho}"], ["d781", "\\mathsfbf{\\varsigma}"], ["d782", "\\mathsfbf{\\Sigma}"], ["d783", "\\mathsfbf{\\Tau}"], ["d784", "\\mathsfbf{\\Upsilon}"], ["d785", "\\mathsfbf{\\Phi}"], ["d786", "\\mathsfbf{\\Chi}"], ["d787", "\\mathsfbf{\\Psi}"], ["d788", "\\mathsfbf{\\Omega}"], ["d789", "\\partial{}"], ["d78a", "\\in"], ["d78b", "\\mathsfbf{\\vartheta}"], ["d78c", "\\mathsfbf{\\varkappa}"], ["d78d", "\\mathsfbf{\\phi}"], ["d78e", "\\mathsfbf{\\varrho}"], ["d78f", "\\mathsfbf{\\varpi}"], ["d790", "\\mathsfbfsl{\\Alpha}"], ["d791", "\\mathsfbfsl{\\Beta}"], ["d792", "\\mathsfbfsl{\\Gamma}"], ["d793", "\\mathsfbfsl{\\Delta}"], ["d794", "\\mathsfbfsl{\\Epsilon}"], ["d795", "\\mathsfbfsl{\\Zeta}"], ["d796", "\\mathsfbfsl{\\Eta}"], ["d797", "\\mathsfbfsl{\\vartheta}"], ["d798", "\\mathsfbfsl{\\Iota}"], ["d799", "\\mathsfbfsl{\\Kappa}"], ["d79a", "\\mathsfbfsl{\\Lambda}"], ["d79d", "\\mathsfbfsl{\\Xi}"], ["d79f", "\\mathsfbfsl{\\Pi}"], ["d7a0", "\\mathsfbfsl{\\Rho}"], ["d7a1", "\\mathsfbfsl{\\vartheta}"], ["d7a2", "\\mathsfbfsl{\\Sigma}"], ["d7a3", "\\mathsfbfsl{\\Tau}"], ["d7a4", "\\mathsfbfsl{\\Upsilon}"], ["d7a5", "\\mathsfbfsl{\\Phi}"], ["d7a6", "\\mathsfbfsl{\\Chi}"], ["d7a7", "\\mathsfbfsl{\\Psi}"], ["d7a8", "\\mathsfbfsl{\\Omega}"], ["d7a9", "\\mathsfbfsl{\\nabla}"], ["d7aa", "\\mathsfbfsl{\\Alpha}"], ["d7ab", "\\mathsfbfsl{\\Beta}"], ["d7ac", "\\mathsfbfsl{\\Gamma}"], ["d7ad", "\\mathsfbfsl{\\Delta}"], ["d7ae", "\\mathsfbfsl{\\Epsilon}"], ["d7af", "\\mathsfbfsl{\\Zeta}"], ["d7b0", "\\mathsfbfsl{\\Eta}"], ["d7b1", "\\mathsfbfsl{\\vartheta}"], ["d7b2", "\\mathsfbfsl{\\Iota}"], ["d7b3", "\\mathsfbfsl{\\Kappa}"], ["d7b4", "\\mathsfbfsl{\\Lambda}"], ["d7b7", "\\mathsfbfsl{\\Xi}"], ["d7b9", "\\mathsfbfsl{\\Pi}"], ["d7ba", "\\mathsfbfsl{\\Rho}"], ["d7bb", "\\mathsfbfsl{\\varsigma}"], ["d7bc", "\\mathsfbfsl{\\Sigma}"], ["d7bd", "\\mathsfbfsl{\\Tau}"], ["d7be", "\\mathsfbfsl{\\Upsilon}"], ["d7bf", "\\mathsfbfsl{\\Phi}"], ["d7c0", "\\mathsfbfsl{\\Chi}"], ["d7c1", "\\mathsfbfsl{\\Psi}"], ["d7c2", "\\mathsfbfsl{\\Omega}"], ["d7c3", "\\partial{}"], ["d7c4", "\\in"], ["d7c5", "\\mathsfbfsl{\\vartheta}"], ["d7c6", "\\mathsfbfsl{\\varkappa}"], ["d7c7", "\\mathsfbfsl{\\phi}"], ["d7c8", "\\mathsfbfsl{\\varrho}"], ["d7c9", "\\mathsfbfsl{\\varpi}"], ["d7ce", "\\mathbf{0}"], ["d7cf", "\\mathbf{1}"], ["d7d0", "\\mathbf{2}"], ["d7d1", "\\mathbf{3}"], ["d7d2", "\\mathbf{4}"], ["d7d3", "\\mathbf{5}"], ["d7d4", "\\mathbf{6}"], ["d7d5", "\\mathbf{7}"], ["d7d6", "\\mathbf{8}"], ["d7d7", "\\mathbf{9}"], ["d7d8", "\\mathbb{0}"], ["d7d9", "\\mathbb{1}"], ["d7da", "\\mathbb{2}"], ["d7db", "\\mathbb{3}"], ["d7dc", "\\mathbb{4}"], ["d7dd", "\\mathbb{5}"], ["d7de", "\\mathbb{6}"], ["d7df", "\\mathbb{7}"], ["d7e0", "\\mathbb{8}"], ["d7e1", "\\mathbb{9}"], ["d7e2", "\\mathsf{0}"], ["d7e3", "\\mathsf{1}"], ["d7e4", "\\mathsf{2}"], ["d7e5", "\\mathsf{3}"], ["d7e6", "\\mathsf{4}"], ["d7e7", "\\mathsf{5}"], ["d7e8", "\\mathsf{6}"], ["d7e9", "\\mathsf{7}"], ["d7ea", "\\mathsf{8}"], ["d7eb", "\\mathsf{9}"], ["d7ec", "\\mathsfbf{0}"], ["d7ed", "\\mathsfbf{1}"], ["d7ee", "\\mathsfbf{2}"], ["d7ef", "\\mathsfbf{3}"], ["d7f0", "\\mathsfbf{4}"], ["d7f1", "\\mathsfbf{5}"], ["d7f2", "\\mathsfbf{6}"], ["d7f3", "\\mathsfbf{7}"], ["d7f4", "\\mathsfbf{8}"], ["d7f5", "\\mathsfbf{9}"], ["d7f6", "\\mathtt{0}"], ["d7f7", "\\mathtt{1}"], ["d7f8", "\\mathtt{2}"], ["d7f9", "\\mathtt{3}"], ["d7fa", "\\mathtt{4}"], ["d7fb", "\\mathtt{5}"], ["d7fc", "\\mathtt{6}"], ["d7fd", "\\mathtt{7}"], ["d7fe", "\\mathtt{8}"], ["d7ff", "\\mathtt{9}"]]);
    }

  }); // src/utils.ts


  function escapeSpecialCharacters(str) {
    var mathExpressions = [];
    str = str.replace(/\$[^$]+\$/, match => {
      mathExpressions.push(match);
      return "MATH.EXP.".concat(mathExpressions.length - 1);
    });
    var newstr = "";
    var escapeMode = false;

    for (var _i153 = 0; _i153 < str.length; _i153++) {
      if (escapeMode) {
        escapeMode = false;
        newstr += str[_i153];
        continue;
      }

      if (str[_i153] === "\\") {
        escapeMode = true;
        newstr += str[_i153];
        continue;
      }

      var c = str.charCodeAt(_i153).toString(16).padStart(4, "0");
      newstr += specialCharacters.get(c) || str[_i153];
    }

    return newstr.replace(/MATH\.EXP\.(\d+)/, (_, i) => mathExpressions[Number(i)]);
  }

  function titleCase(str) {
    return str.replace(/(\w)(\S*)/g, (_, first, rest) => first.toLocaleUpperCase() + rest.toLocaleLowerCase());
  }

  function alphaNum(str) {
    return str.replace(/[^0-9A-Za-z]/g, "").toLocaleLowerCase();
  }

  function convertCRLF(str) {
    return str.replace(/\r\n?/g, "\n");
  }

  function wrapText(line, lineWidth) {
    var words = line.split(" ");
    var lines = [""];

    var _iterator204 = _createForOfIteratorHelper(words),
        _step204;

    try {
      for (_iterator204.s(); !(_step204 = _iterator204.n()).done;) {
        var word = _step204.value;

        if (lines[lines.length - 1].length + word.length + 1 > lineWidth) {
          lines.push("");
        }

        lines[lines.length - 1] += word + " ";
      }
    } catch (err) {
      _iterator204.e(err);
    } finally {
      _iterator204.f();
    }

    return lines.map(line2 => line2.trim());
  }

  function unwrapText(str) {
    return str.replace(/\s*\n\s*\n\s*/g, "<<BIBTEX_TIDY_PARA>>").replace(/\s*\n\s*/g, " ").replace(/<<BIBTEX_TIDY_PARA>>/g, "\n\n");
  }

  function addEnclosingBraces(str, removeInsideBraces) {
    if (removeInsideBraces) str = str.replace(/[{}]/g, "");
    return "{".concat(str, "}");
  }

  function removeEnclosingBraces(str) {
    return str.replace(/^\{([^{}]*)\}$/g, "$1");
  }

  function escapeURL(str) {
    return str.replace(/\\?_/g, "\\%5F");
  }

  function limitAuthors(str, maxAuthors) {
    var authors = str.split(" and ");

    if (authors.length > maxAuthors) {
      return [...authors.slice(0, maxAuthors), "others"].join(" and ");
    }

    return str;
  }

  function formatPageRange(str) {
    for (var _i154 = 0; _i154 < 4; _i154++) {
      str = str.replace(/(\d)\s*-\s*(\d)/g, "$1--$2");
    }

    return str;
  }

  var init_utils = __esm({
    "src/utils.ts"() {
      init_unicode();
    }

  }); // src/sort.ts


  function sortEntries(ast, fieldMaps, sort) {
    var _a2, _b, _c, _d, _e;

    if (!sort) return;
    var sortIndexes = /* @__PURE__ */new Map();
    var precedingMeta = [];

    var _iterator205 = _createForOfIteratorHelper(ast.children),
        _step205;

    try {
      for (_iterator205.s(); !(_step205 = _iterator205.n()).done;) {
        var item = _step205.value;

        if (item.type === "text" || ((_a2 = item.block) == null ? void 0 : _a2.type) !== "entry") {
          precedingMeta.push(item);
          continue;
        }

        var sortIndex = /* @__PURE__ */new Map();

        var _iterator206 = _createForOfIteratorHelper(sort),
            _step206;

        try {
          for (_iterator206.s(); !(_step206 = _iterator206.n()).done;) {
            var key = _step206.value;
            if (key.startsWith("-")) key = key.slice(1);
            var val = void 0;

            if (key === "key") {
              val = (_b = item.block.key) != null ? _b : "";
            } else if (key === "type") {
              val = item.command;
            } else if (key === "month") {
              var v = (_c = fieldMaps.get(item.block)) == null ? void 0 : _c.get(key);

              var _i156 = v ? MONTHS.indexOf(v) : -1;

              val = _i156 > -1 ? _i156 : "";
            } else {
              val = (_e = (_d = fieldMaps.get(item.block)) == null ? void 0 : _d.get(key)) != null ? _e : "";
            }

            sortIndex.set(key, typeof val === "string" ? val.toLowerCase() : val);
          }
        } catch (err) {
          _iterator206.e(err);
        } finally {
          _iterator206.f();
        }

        sortIndexes.set(item, sortIndex);

        while (precedingMeta.length > 0) {
          sortIndexes.set(precedingMeta.pop(), sortIndex);
        }
      }
    } catch (err) {
      _iterator205.e(err);
    } finally {
      _iterator205.f();
    }

    var _loop21 = function _loop21(_i155) {
      var desc = sort[_i155].startsWith("-");

      var key = desc ? sort[_i155].slice(1) : sort[_i155];
      ast.children.sort((a, b) => {
        var _a3, _b2, _c2, _d2;

        var ia = (_b2 = (_a3 = sortIndexes.get(a)) == null ? void 0 : _a3.get(key)) != null ? _b2 : "\uFFF0";
        var ib = (_d2 = (_c2 = sortIndexes.get(b)) == null ? void 0 : _c2.get(key)) != null ? _d2 : "\uFFF0";
        if (typeof ia === "number") ia = String(ia).padStart(50, "0");
        if (typeof ib === "number") ib = String(ib).padStart(50, "0");
        return (desc ? ib : ia).localeCompare(desc ? ia : ib);
      });
    };

    for (var _i155 = sort.length - 1; _i155 >= 0; _i155--) {
      _loop21(_i155);
    }
  }

  function sortEntryFields(ast, fieldOrder) {
    var _iterator207 = _createForOfIteratorHelper(getEntries(ast)),
        _step207;

    try {
      for (_iterator207.s(); !(_step207 = _iterator207.n()).done;) {
        var entry = _step207.value;
        entry.fields.sort((a, b) => {
          var orderA = fieldOrder.indexOf(a.name.toLocaleLowerCase());
          var orderB = fieldOrder.indexOf(b.name.toLocaleLowerCase());
          if (orderA === -1 && orderB === -1) return 0;
          if (orderA === -1) return 1;
          if (orderB === -1) return -1;
          if (orderB < orderA) return 1;
          if (orderB > orderA) return -1;
          return 0;
        });
      }
    } catch (err) {
      _iterator207.e(err);
    } finally {
      _iterator207.f();
    }
  }

  var MONTHS;

  var init_sort = __esm({
    "src/sort.ts"() {
      init_src();
      MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    }

  }); // src/format.ts


  function formatBibtex(ast, options, replacementKeys) {
    var omit = options.omit,
        tab = options.tab,
        space = options.space;
    var indent = tab ? "	" : " ".repeat(space);
    var omitFields = new Set(omit);
    var bibtex = ast.children.map(child => formatNode(child, options, indent, omitFields, replacementKeys)).join("");
    if (!bibtex.endsWith("\n")) bibtex += "\n";
    return bibtex;
  }

  function formatNode(child, options, indent, omitFields, replacementKeys) {
    if (child.type === "text") {
      return formatComment(child.text, options);
    }

    if (!child.block) throw new Error("FATAL!");

    switch (child.block.type) {
      case "preamble":
      case "string":
        return "".concat(child.block.raw, "\n");

      case "comment":
        return formatComment(child.block.raw, options);

      case "entry":
        return formatEntry(child.command, child.block, options, indent, omitFields, replacementKeys == null ? void 0 : replacementKeys.get(child.block));
    }
  }

  function formatEntry(entryType, entry, options, indent, omitFields, replacementKey) {
    var align = options.align,
        trailingCommas = options.trailingCommas,
        removeDuplicateFields = options.removeDuplicateFields,
        removeEmptyFields = options.removeEmptyFields,
        lowercase = options.lowercase;
    var bibtex = "";
    var itemType = lowercase ? entryType.toLocaleLowerCase() : entryType;
    bibtex += "@".concat(itemType, "{");
    var key = replacementKey != null ? replacementKey : entry.key;
    if (key) bibtex += "".concat(key, ",");
    var fieldSeen = /* @__PURE__ */new Set();

    for (var _i157 = 0; _i157 < entry.fields.length; _i157++) {
      var field = entry.fields[_i157];
      var nameLowerCase = field.name.toLocaleLowerCase();
      var name2 = lowercase ? nameLowerCase : field.name;
      if (field.name === "") continue;
      if (omitFields.has(nameLowerCase)) continue;
      if (removeDuplicateFields && fieldSeen.has(nameLowerCase)) continue;
      fieldSeen.add(nameLowerCase);

      if (field.value.concat.length === 0) {
        if (removeEmptyFields) continue;
        bibtex += "\n".concat(indent).concat(name2);
      } else {
        var value = formatValue(field, options);
        if (removeEmptyFields && (value === "{}" || value === '""')) continue;
        bibtex += "\n".concat(indent).concat(name2.trim().padEnd(align - 1), " = ").concat(value);
      }

      if (_i157 < entry.fields.length - 1 || trailingCommas) bibtex += ",";
    }

    bibtex += "\n}\n";
    return bibtex;
  }

  function formatComment(comment2, _ref65) {
    var stripComments = _ref65.stripComments,
        tidyComments = _ref65.tidyComments;
    if (stripComments) return "";

    if (tidyComments) {
      var trimmed = comment2.trim();
      if (trimmed === "") return "";
      return trimmed + "\n";
    } else {
      return comment2.replace(/^[ \t]*\n|[ \t]*$/g, "");
    }
  }

  function formatValue(field, options) {
    var curly = options.curly,
        numeric = options.numeric,
        align = options.align,
        stripEnclosingBraces = options.stripEnclosingBraces,
        dropAllCaps = options.dropAllCaps,
        escape = options.escape,
        encodeUrls = options.encodeUrls,
        wrap = options.wrap,
        maxAuthors = options.maxAuthors,
        tab = options.tab,
        space = options.space,
        enclosingBraces = options.enclosingBraces;
    var nameLowerCase = field.name.toLocaleLowerCase();
    var indent = tab ? "	" : " ".repeat(space);
    var enclosingBracesFields = new Set((enclosingBraces || []).map(field2 => field2.toLocaleLowerCase()));
    return field.value.concat.map(_ref66 => {
      var type = _ref66.type,
          value = _ref66.value;
      var isNumeric = value.match(/^[1-9][0-9]*$/);

      if (isNumeric && curly) {
        type = "braced";
      }

      if (type === "literal" || numeric && isNumeric) {
        return value;
      }

      var dig3 = value.slice(0, 3).toLowerCase();

      if (!curly && numeric && nameLowerCase === "month" && MONTH_SET.has(dig3)) {
        return dig3;
      }

      value = unwrapText(value);

      if (stripEnclosingBraces) {
        value = removeEnclosingBraces(value);
      }

      if (dropAllCaps && !value.match(/[a-z]/)) {
        value = titleCase(value);
      }

      if (nameLowerCase === "url" && encodeUrls) {
        value = escapeURL(value);
      }

      if (escape) {
        value = escapeSpecialCharacters(value);
      }

      if (nameLowerCase === "pages") {
        value = formatPageRange(value);
      }

      if (nameLowerCase === "author" && maxAuthors) {
        value = limitAuthors(value, maxAuthors);
      }

      if (enclosingBracesFields.has(nameLowerCase) && (type === "braced" || curly)) {
        value = addEnclosingBraces(value, true);
      }

      if (type === "braced" && field.value.concat.length === 1) {
        value = value.trim();
      }

      if (type === "braced" || curly) {
        var lineLength = "".concat(indent).concat(align, "{").concat(value, "}").length;
        var multiLine = value.includes("\n\n");

        if (wrap && lineLength > wrap || multiLine) {
          var paragraphs = value.split("\n\n");
          var valIndent = indent.repeat(2);

          if (wrap) {
            var wrapCol = wrap;
            paragraphs = paragraphs.map(paragraph => wrapText(paragraph, wrapCol - valIndent.length).join("\n" + valIndent));
          }

          value = "\n" + valIndent + paragraphs.join("\n\n".concat(valIndent)) + "\n" + indent;
        }

        return addEnclosingBraces(value);
      } else {
        return "\"".concat(value, "\"");
      }
    }).join(" # ");
  }

  var MONTH_SET;

  var init_format = __esm({
    "src/format.ts"() {
      init_utils();
      init_sort();
      MONTH_SET = new Set(MONTHS);
    }

  }); // src/duplicates.ts


  function checkForDuplicates(ast, valueLookup, duplicates, merge) {
    var _a2, _b;

    var uniqCheck = /* @__PURE__ */new Map();

    if (duplicates) {
      var _iterator208 = _createForOfIteratorHelper(duplicates),
          _step208;

      try {
        for (_iterator208.s(); !(_step208 = _iterator208.n()).done;) {
          var key = _step208.value;
          uniqCheck.set(key, !!merge);
        }
      } catch (err) {
        _iterator208.e(err);
      } finally {
        _iterator208.f();
      }
    }

    if (!uniqCheck.has("key")) {
      uniqCheck.set("key", false);
    }

    var duplicateEntries = /* @__PURE__ */new Set();
    var warnings = [];
    var keys2 = /* @__PURE__ */new Map();
    var dois = /* @__PURE__ */new Map();
    var citations = /* @__PURE__ */new Map();
    var abstracts = /* @__PURE__ */new Map();

    var _iterator209 = _createForOfIteratorHelper(getEntries(ast)),
        _step209;

    try {
      for (_iterator209.s(); !(_step209 = _iterator209.n()).done;) {
        var entry = _step209.value;
        var entryValues = valueLookup.get(entry);

        var _iterator210 = _createForOfIteratorHelper(uniqCheck),
            _step210;

        try {
          for (_iterator210.s(); !(_step210 = _iterator210.n()).done;) {
            var _step210$value = _slicedToArray(_step210.value, 2),
                _key4 = _step210$value[0],
                doMerge = _step210$value[1];

            var duplicateOf = void 0;

            switch (_key4) {
              case "key":
                {
                  if (!entry.key) continue;
                  var keyLC = entry.key.toLocaleLowerCase();
                  duplicateOf = keys2.get(keyLC);
                  if (!duplicateOf) keys2.set(keyLC, entry);
                  break;
                }

              case "doi":
                var doi = alphaNum((_a2 = entryValues.get("doi")) != null ? _a2 : "");
                if (!doi) continue;
                duplicateOf = dois.get(doi);
                if (!duplicateOf) dois.set(doi, entry);
                break;

              case "citation":
                var ttl = entryValues.get("title");
                var aut = entryValues.get("author");
                if (!ttl || !aut) continue;
                var cit = alphaNum(aut.split(/,| and/)[0]) + ":" + alphaNum(ttl);
                duplicateOf = citations.get(cit);
                if (!duplicateOf) citations.set(cit, entry);
                break;

              case "abstract":
                var abstract = alphaNum((_b = entryValues.get("abstract")) != null ? _b : "");
                var abs = abstract == null ? void 0 : abstract.slice(0, 100);
                if (!abs) continue;
                duplicateOf = abstracts.get(abs);
                if (!duplicateOf) abstracts.set(abs, entry);
                break;
            }

            if (duplicateOf) {
              if (doMerge) {
                duplicateEntries.add(entry);
                warnings.push({
                  code: "DUPLICATE_ENTRY",
                  message: "".concat(entry.key, " appears to be a duplicate of ").concat(duplicateOf.key, " and was removed.")
                });
                mergeEntries(merge, duplicateOf, entry);
              } else {
                warnings.push({
                  code: "DUPLICATE_KEY",
                  message: "".concat(entry.key, " is a duplicate entry key.")
                });
              }
            }
          }
        } catch (err) {
          _iterator210.e(err);
        } finally {
          _iterator210.f();
        }
      }
    } catch (err) {
      _iterator209.e(err);
    } finally {
      _iterator209.f();
    }

    return {
      entries: duplicateEntries,
      warnings
    };
  }

  function mergeEntries(merge, duplicateOf, entry) {
    switch (merge) {
      case "last":
        duplicateOf.key = entry.key;
        duplicateOf.fields = entry.fields;
        break;

      case "combine":
      case "overwrite":
        var _iterator211 = _createForOfIteratorHelper(entry.fields),
            _step211;

        try {
          var _loop22 = function _loop22() {
            var field = _step211.value;
            var existing = duplicateOf.fields.find(f => f.name.toLocaleLowerCase() === field.name.toLocaleLowerCase());

            if (!existing) {
              duplicateOf.fields.push(field);
            } else if (merge === "overwrite") {
              existing.value = field.value;
            }
          };

          for (_iterator211.s(); !(_step211 = _iterator211.n()).done;) {
            _loop22();
          }
        } catch (err) {
          _iterator211.e(err);
        } finally {
          _iterator211.f();
        }

        break;
    }
  }

  var init_duplicates = __esm({
    "src/duplicates.ts"() {
      init_utils();
      init_src();
    }

  }); // src/parseAuthors.ts


  function parseAuthors(authors) {
    return authors.replace(/\s+/g, " ").split(/ and /i).map(nameRaw => {
      var name2 = nameRaw.trim();
      var commaPos = name2.indexOf(",");

      if (commaPos > -1) {
        return {
          firstNames: name2.slice(commaPos + 1).trim(),
          lastName: name2.slice(0, commaPos).trim()
        };
      } else {
        var lastSpacePos = name2.lastIndexOf(" ");
        return {
          firstNames: name2.slice(0, lastSpacePos).trim(),
          lastName: name2.slice(lastSpacePos).trim()
        };
      }
    });
  }

  var init_parseAuthors = __esm({
    "src/parseAuthors.ts"() {}

  }); // src/index.ts


  function tidy(input) {
    var options_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = normalizeOptions(options_);
    input = convertCRLF(input);
    var ast = generateAST(input);
    var warnings = getEntries(ast).filter(entry => !entry.key).map(entry => ({
      code: "MISSING_KEY",
      message: "".concat(entry.type, " entry does not have an entry key.")
    }));
    var valueLookup = generateValueLookup(ast, options);
    var duplicates = checkForDuplicates(ast, valueLookup, options.duplicates, options.merge);
    warnings.push(...duplicates.warnings);
    ast.children = ast.children.filter(child => !isEntryNode(child) || !duplicates.entries.has(child.block));
    if (options.sort) sortEntries(ast, valueLookup, options.sort);
    if (options.sortFields) sortEntryFields(ast, options.sortFields);
    var newKeys = options.generateKeys ? generateKeys(ast, valueLookup) : void 0;
    var bibtex = formatBibtex(ast, options, newKeys);
    return {
      bibtex,
      warnings,
      count: getEntries(ast).length
    };
  }

  function generateKeys(ast, valueLookup) {
    var _a2;

    var keys2 = /* @__PURE__ */new Map();
    var keyCounts = /* @__PURE__ */new Map();

    var _iterator212 = _createForOfIteratorHelper(ast.children),
        _step212;

    try {
      for (_iterator212.s(); !(_step212 = _iterator212.n()).done;) {
        var node = _step212.value;

        if (isEntryNode(node)) {
          var newKey = generateKey(valueLookup.get(node.block));

          if (newKey) {
            var keyCount = ((_a2 = keyCounts.get(newKey)) != null ? _a2 : 0) + 1;
            keys2.set(node.block, newKey + (keyCount > 1 ? keyCount : ""));
            keyCounts.set(newKey, keyCount);
          }
        }
      }
    } catch (err) {
      _iterator212.e(err);
    } finally {
      _iterator212.f();
    }

    return keys2;
  }

  function generateKey(valueLookup) {
    var _a2, _b, _c, _d, _e;

    var authors = parseAuthors((_b = (_a2 = valueLookup == null ? void 0 : valueLookup.get("author")) == null ? void 0 : _a2.replace(/["{}]/g, "")) != null ? _b : "");
    var lastName = (_c = authors[0]) == null ? void 0 : _c.lastName.toLowerCase();
    var year = (_d = valueLookup == null ? void 0 : valueLookup.get("year")) == null ? void 0 : _d.replace(/[^0-9]/g, "");
    var title = (_e = valueLookup == null ? void 0 : valueLookup.get("title")) != null ? _e : valueLookup == null ? void 0 : valueLookup.get("booktitle");
    var titleFirstWord = title == null ? void 0 : title.toLowerCase().replace(new RegExp("^.*?([a-z]+)[^a-z].*$", "s"), "$1");
    if (!lastName || !year) return;
    return [lastName, year, titleFirstWord != null ? titleFirstWord : ""].join("");
  }

  function isEntryNode(node) {
    var _a2;

    return node.type !== "text" && ((_a2 = node.block) == null ? void 0 : _a2.type) === "entry";
  }

  function getEntries(ast) {
    return ast.children.filter(isEntryNode).map(node => node.block);
  }

  function generateValueLookup(ast, options) {
    return new Map(getEntries(ast).map(entry => [entry, new Map(entry.fields.map(field => [field.name.toLocaleLowerCase(), formatValue(field, options)]))]));
  }

  var src_default;

  var init_src = __esm({
    "src/index.ts"() {
      init_optionUtils();
      init_bibtex_parser();
      init_utils();
      init_format();
      init_sort();
      init_duplicates();
      init_parseAuthors();
      src_default = {
        tidy
      };
    }

  }); // src/cliUtils.ts


  function optionsToCLIArgs(options) {
    return optionDefinitions.map(def => {
      var _a2;

      return (_a2 = def.toCLI) == null ? void 0 : _a2.call(def, options[def.key]);
    }).filter(arg => typeof arg === "string");
  }

  var OPTIONS;

  var init_cliUtils = __esm({
    "src/cliUtils.ts"() {
      init_optionDefinitions();
      OPTIONS = new Set(optionDefinitions.flatMap(def => Object.keys(def.cli)));
    }

  }); // docs/index.ts


  var require_docs = __commonJS({
    "docs/index.ts"(exports) {
      init_dist10();
      init_src();
      init_optionDefinitions();
      init_cliUtils();
      init_bibtex_parser();
      init_dist();
      init_dist2();
      var initialText = "Click Tidy to clean up the entries below      \n@Book{sweig42,\n  Author =\t { Stefa{n} Sweig },\n  title =\t { The impossible book },\n  publisher =\t { Dead Poet Society},\n  year =\t 1942,\n  month =        mar\n}\n@article{steward03,\n  author =\t {Martha Steward},\n  title =\t {Cooking behind bars}, publisher = \"Culinary Expert Series\",\n  year = {2003}\n}\n@Book{impossible,\n  Author =\t { Stefan Sweig },\n  title =\t { The impossible book },\n  publisher =\t { Dead Poet Society},\n  year =\t 1942,\n  month =        mar\n}\n";

      function $(selector, parent) {
        return (parent != null ? parent : document).querySelector(selector);
      }

      function $$(selector, parent) {
        return (parent != null ? parent : document).querySelectorAll(selector);
      }

      function renderSuboptions() {
        var _iterator213 = _createForOfIteratorHelper($$(".suboptions")),
            _step213;

        try {
          for (_iterator213.s(); !(_step213 = _iterator213.n()).done;) {
            var suboption = _step213.value;
            var checkbox = $("input", suboption.parentNode);
            suboption.style.display = checkbox.matches(":checked") ? "block" : "none";
          }
        } catch (err) {
          _iterator213.e(err);
        } finally {
          _iterator213.f();
        }
      }

      var _iterator214 = _createForOfIteratorHelper($$("input, textarea")),
          _step214;

      try {
        for (_iterator214.s(); !(_step214 = _iterator214.n()).done;) {
          var input = _step214.value;
          input.addEventListener("input", () => {
            renderSuboptions();
            formatCLICommand();
          });
        }
      } catch (err) {
        _iterator214.e(err);
      } finally {
        _iterator214.f();
      }

      renderSuboptions();
      var options = document.forms.options;
      var cmEditor = new EditorView({
        parent: $("#editor"),
        state: EditorState.create({
          doc: initialText,
          extensions: [lineNumbers(), drawSelection()]
        })
      });
      var optionDocs = {};

      var _iterator215 = _createForOfIteratorHelper(optionDefinitions),
          _step215;

      try {
        for (_iterator215.s(); !(_step215 = _iterator215.n()).done;) {
          var option = _step215.value;
          optionDocs[option.key] = option;
        }
      } catch (err) {
        _iterator215.e(err);
      } finally {
        _iterator215.f();
      }

      var _iterator216 = _createForOfIteratorHelper($$("label[data-option]")),
          _step216;

      try {
        for (_iterator216.s(); !(_step216 = _iterator216.n()).done;) {
          var $label = _step216.value;
          var key = $label.dataset.option;
          var _option2 = optionDocs[key];
          var $input = $label.querySelector("input");
          if (_option2.description) $label.setAttribute("title", _option2.description.join("\n"));
          $label.querySelector(".name").textContent = _option2.title;

          if (!$input.getAttribute("name")) {
            $input.setAttribute("name", key);
          }
        }
      } catch (err) {
        _iterator216.e(err);
      } finally {
        _iterator216.f();
      }

      $("#tidy").addEventListener("click", () => {
        $("#tidy").setAttribute("disabled", "true");
        $("#feedback").style.display = "none";
        $("#feedback").innerHTML = "";
        document.body.classList.toggle("error", false);
        cmEditor.dispatch({
          effects: []
        });
        var bibtex = cmEditor.state.doc.toString();
        var result;
        var opt = getOptions();
        setTimeout(() => {
          try {
            result = src_default.tidy(bibtex, opt);
            cmEditor.dispatch({
              changes: {
                from: 0,
                to: cmEditor.state.doc.length,
                insert: result.bibtex
              }
            });
            $("#feedback").innerHTML += formatSuccessMessage(opt, result);
          } catch (e) {
            console.error("bibtex parse problem:", e);
            document.body.classList.toggle("error", true);
            $("#feedback").innerHTML = formatError(e);
            var addUnderline = StateEffect.define();
            var errorUnderline = Decoration.mark({
              attributes: {
                class: "bibtex-error"
              }
            });

            if (e instanceof BibTeXSyntaxError) {
              console.log(e.line, e.column);
              var from = cmEditor.state.doc.line(e.line - 1).from + e.column - 2;
              var to = cmEditor.state.doc.line(e.line - 1).from + e.column - 1;
              cmEditor.dispatch({
                effects: addUnderline.of([errorUnderline.range(from, to)])
              });
            }
          }

          $("#feedback").style.display = "block";
          $("#tidy").removeAttribute("disabled");
        }, 100);
      });
      var resetCopyBtnTimeout;
      $("#copy").addEventListener("click", () => __async(exports, null, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return navigator.clipboard.writeText(cmEditor.state.doc.toString());

              case 3:
                $("#copy").classList.toggle("copied", true);
                clearInterval(resetCopyBtnTimeout);
                resetCopyBtnTimeout = setTimeout(() => $("#copy").classList.toggle("copied", false), 3e3);
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                alert("Failed to copy");

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      })));

      function formatSuccessMessage(options2, result) {
        var warnings = result.warnings.filter(w => w.code !== "DUPLICATE_ENTRY");
        return "\n\t\t<strong>Successful!</strong><br>\n\t\tTidied ".concat(result.count, " entries.<br><br>\n\t\t<ul>\n\t\t\t").concat(warnings.map(warning => "<li>".concat(warning.message, "</li>")).join(""), "\n\t\t</ul>\n\t\t").concat(options2.merge ? formatDuplicateSummary(result) : "");
      }

      function formatDuplicateSummary(result) {
        var dupes = result.warnings.filter(w => w.code === "DUPLICATE_ENTRY");

        if (dupes.length > 0) {
          return "No duplicates.";
        }

        return "\n\t\t<strong>".concat(dupes.length, " merged:\n\t\t\t<ul>\n\t\t\t\t").concat(dupes.map(dupe => "<li>".concat(dupe.message, "</li>")).join(""), "\n\t\t\t</ul>\n\t\t</strong>");
      }

      function formatError(e) {
        if (e instanceof BibTeXSyntaxError) {
          return "\n\t\t<strong>There's a problem with the bibtex (".concat(e.name, ")</strong><br>\n\t\tSyntax Error on line ").concat(e.line, " column ").concat(e.column, "<br>\n\t\tUnexpected ").concat(JSON.stringify(e.char), " in ").concat(e.node.type, ".");
        }

        return "\n\t\t<strong>There's a problem with the bibtex</strong><br>\n\t\tUnknown error: ".concat(e, "<br>\n\t\tThis is probably a bug.");
      }

      window.cmEditor = cmEditor;

      function getOptions() {
        return {
          curly: options.curly.checked,
          numeric: options.numeric.checked,
          sort: options.sort.checked && options.sortList.value.length > 0 && options.sortList.value.split(/[\n\t ,]+/),
          omit: options.omit.checked && options.omitList.value.length > 0 ? options.omitList.value.split(/[\n\t ,]+/) : void 0,
          space: Number(options.spaces.value),
          tab: options.indent.value === "tabs",
          align: options.align.checked ? Number(options.alignnum.value) : 0,
          wrap: options.wrap.checked ? Number(options.wrapnum.value) : false,
          duplicates: options.duplicates.checked ? [options.uniqKEY.checked ? "key" : null, options.uniqDOI.checked ? "doi" : null, options.uniqABS.checked ? "abstract" : null, options.uniqCIT.checked ? "citation" : null].filter(a => a !== null) : false,
          merge: options.merge.checked ? options.mergeStrategy.value : false,
          enclosingBraces: options.enclosingBraces.checked && options.enclosingBracesList.value.length > 0 && options.enclosingBracesList.value.split(/[\n\t ,]+/),
          stripEnclosingBraces: options.stripEnclosingBraces.checked,
          dropAllCaps: options.dropAllCaps.checked,
          sortFields: options.sortFields.checked && options.sortFieldList.value.length > 0 && options.sortFieldList.value.split(/[\n\t ,]+/),
          stripComments: options.stripComments.checked,
          tidyComments: options.tidyComments.checked,
          encodeUrls: options.encodeUrls.checked,
          escape: options.escape.checked,
          trailingCommas: options.trailingCommas.checked,
          removeEmptyFields: options.removeEmptyFields.checked,
          removeDuplicateFields: options.removeDuplicateFields.checked,
          lowercase: options.lowercase.checked,
          generateKeys: options.generateKeys.checked,
          maxAuthors: options.maxAuthors.checked ? Number(options.maxAuthorsNum.value) : void 0
        };
      }

      function formatCLICommand() {
        var options2 = getOptions();
        $("#cli").innerHTML = "bibtex-tidy " + optionsToCLIArgs(options2).map(opt => {
          var i = opt.indexOf("=");

          if (i === -1) {
            return "<span class=\"opt-name\">".concat(opt, "</span>");
          } else {
            return ["<span class=\"opt-name\">".concat(opt.slice(0, i), "</span>"), "<span class=\"opt-val\">".concat(opt.slice(i + 1), "</span>")].join("=");
          }
        }).join(" ") + " YOUR_FILE.bib";
      }

      window.requestAnimationFrame(formatCLICommand);
    }

  });

  require_docs();
})();