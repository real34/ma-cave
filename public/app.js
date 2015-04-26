/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	if(false) {
		var lastData;
		var upToDate = function upToDate() {
			return lastData.indexOf(__webpack_hash__) >= 0;
		};
		var check = function check() {
			module.hot.check(true, function(err, updatedModules) {
				if(err) {
					if(module.hot.status() in {abort:1,fail:1}) {
						console.warn("[HMR] Cannot apply update. Need to do a full reload!");
						console.warn("[HMR] " + err.stack || err.message);
						window.location.reload();
					} else {
						console.warn("[HMR] Update failed: " + err.stack || err.message);
					}
					return;
				}

				if(!updatedModules) {
					console.warn("[HMR] Cannot find update. Need to do a full reload!");
					console.warn("[HMR] (Probably because of restarting the webpack-dev-server)")
					window.location.reload();
					return;
				}

				if(!upToDate()) {
					check();
				}

				require("./log-apply-result")(updatedModules, updatedModules);

				if(upToDate()) {
					console.log("[HMR] App is up to date.");
				}

			});
		};
		var addEventListener = window.addEventListener ? function(eventName, listener) {
			window.addEventListener(eventName, listener, false);
		} : function (eventName, listener) {
			window.attachEvent('on' + eventName, listener);
		};
		addEventListener("message", function(event) {
			if(typeof event.data === "string" && event.data.indexOf("webpackHotUpdate") === 0) {
				lastData = event.data;
				if(!upToDate() && module.hot.status() === "idle") {
					console.log("[HMR] Checking for updates on the server...");
					check();
				}
			}
		});
		console.log("[HMR] Waiting for update signal from WDS...");
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var riot = _interopRequire(__webpack_require__(4));

	__webpack_require__(3);

	riot.mount("ma-cave-app");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var riot = _interopRequire(__webpack_require__(4));

	var layout = _interopRequire(__webpack_require__(7));

	var presentation = _interopRequire(__webpack_require__(5));

	var cave = _interopRequire(__webpack_require__(6));

	riot.tag("ma-cave-app", "\n    <layout-header></layout-header>\n\n    <presentation></presentation>\n    <cave></cave>\n\n    <layout-footer></layout-footer>\n\t");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* Riot v2.0.13, @license MIT, (c) 2015 Muut Inc. + contributors */

	;(function() {

	  var riot = { version: 'v2.0.13', settings: {} }

	  'use strict'

	riot.observable = function(el) {

	  el = el || {}

	  var callbacks = {},
	      _id = 0

	  el.on = function(events, fn) {
	    if (typeof fn == 'function') {
	      fn._id = typeof fn._id == 'undefined' ? _id++ : fn._id

	      events.replace(/\S+/g, function(name, pos) {
	        (callbacks[name] = callbacks[name] || []).push(fn)
	        fn.typed = pos > 0
	      })
	    }
	    return el
	  }

	  el.off = function(events, fn) {
	    if (events == '*') callbacks = {}
	    else {
	      events.replace(/\S+/g, function(name) {
	        if (fn) {
	          var arr = callbacks[name]
	          for (var i = 0, cb; (cb = arr && arr[i]); ++i) {
	            if (cb._id == fn._id) { arr.splice(i, 1); i-- }
	          }
	        } else {
	          callbacks[name] = []
	        }
	      })
	    }
	    return el
	  }

	  // only single event supported
	  el.one = function(name, fn) {
	    if (fn) fn.one = 1
	    return el.on(name, fn)
	  }

	  el.trigger = function(name) {
	    var args = [].slice.call(arguments, 1),
	        fns = callbacks[name] || []

	    for (var i = 0, fn; (fn = fns[i]); ++i) {
	      if (!fn.busy) {
	        fn.busy = 1
	        fn.apply(el, fn.typed ? [name].concat(args) : args)
	        if (fn.one) { fns.splice(i, 1); i-- }
	         else if (fns[i] !== fn) { i-- } // Makes self-removal possible during iteration
	        fn.busy = 0
	      }
	    }

	    if (callbacks.all && name != 'all') {
	      el.trigger.apply(el, ['all', name].concat(args))
	    }

	    return el
	  }

	  return el

	}
	;(function(riot, evt) {

	  // browsers only
	  if (!this.top) return

	  var loc = location,
	      fns = riot.observable(),
	      win = window,
	      current

	  function hash() {
	    return loc.href.split('#')[1] || ''
	  }

	  function parser(path) {
	    return path.split('/')
	  }

	  function emit(path) {
	    if (path.type) path = hash()

	    if (path != current) {
	      fns.trigger.apply(null, ['H'].concat(parser(path)))
	      current = path
	    }
	  }

	  var r = riot.route = function(arg) {
	    // string
	    if (arg[0]) {
	      loc.hash = arg
	      emit(arg)

	    // function
	    } else {
	      fns.on('H', arg)
	    }
	  }

	  r.exec = function(fn) {
	    fn.apply(null, parser(hash()))
	  }

	  r.parser = function(fn) {
	    parser = fn
	  }

	  win.addEventListener ? win.addEventListener(evt, emit, false) : win.attachEvent('on' + evt, emit)

	})(riot, 'hashchange')
	/*

	//// How it works?


	Three ways:

	1. Expressions: tmpl('{ value }', data).
	   Returns the result of evaluated expression as a raw object.

	2. Templates: tmpl('Hi { name } { surname }', data).
	   Returns a string with evaluated expressions.

	3. Filters: tmpl('{ show: !done, highlight: active }', data).
	   Returns a space separated list of trueish keys (mainly
	   used for setting html classes), e.g. "show highlight".


	// Template examples

	tmpl('{ title || "Untitled" }', data)
	tmpl('Results are { results ? "ready" : "loading" }', data)
	tmpl('Today is { new Date() }', data)
	tmpl('{ message.length > 140 && "Message is too long" }', data)
	tmpl('This item got { Math.round(rating) } stars', data)
	tmpl('<h1>{ title }</h1>{ body }', data)


	// Falsy expressions in templates

	In templates (as opposed to single expressions) all falsy values
	except zero (undefined/null/false) will default to empty string:

	tmpl('{ undefined } - { false } - { null } - { 0 }', {})
	// will return: " - - - 0"

	*/


	var brackets = (function(orig, s, b) {
	  return function(x) {

	    // make sure we use the current setting
	    s = riot.settings.brackets || orig
	    if (b != s) b = s.split(' ')

	    // if regexp given, rewrite it with current brackets (only if differ from default)
	    return x && x.test
	      ? s == orig
	        ? x : RegExp(x.source
	                      .replace(/\{/g, b[0].replace(/(?=.)/g, '\\'))
	                      .replace(/\}/g, b[1].replace(/(?=.)/g, '\\')),
	                    x.global ? 'g' : '')

	      // else, get specific bracket
	      : b[x]

	  }
	})('{ }')


	var tmpl = (function() {

	  var cache = {},
	      re_vars = /(['"\/]).*?[^\\]\1|\.\w*|\w*:|\b(?:(?:new|typeof|in|instanceof) |(?:this|true|false|null|undefined)\b|function *\()|([a-z_$]\w*)/gi
	              // [ 1               ][ 2  ][ 3 ][ 4                                                                                  ][ 5       ]
	              // find variable names:
	              // 1. skip quoted strings and regexps: "a b", 'a b', 'a \'b\'', /a b/
	              // 2. skip object properties: .name
	              // 3. skip object literals: name:
	              // 4. skip javascript keywords
	              // 5. match var name

	  // build a template (or get it from cache), render with data
	  return function(str, data) {
	    return str && (cache[str] = cache[str] || tmpl(str))(data)
	  }


	  // create a template instance

	  function tmpl(s, p) {

	    // default template string to {}
	    s = (s || (brackets(0) + brackets(1)))

	      // temporarily convert \{ and \} to a non-character
	      .replace(brackets(/\\{/g), '\uFFF0')
	      .replace(brackets(/\\}/g), '\uFFF1')

	    // split string to expression and non-expresion parts
	    p = split(s, extract(s, brackets(/{/), brackets(/}/)))

	    return new Function('d', 'return ' + (

	      // is it a single expression or a template? i.e. {x} or <b>{x}</b>
	      !p[0] && !p[2] && !p[3]

	        // if expression, evaluate it
	        ? expr(p[1])

	        // if template, evaluate all expressions in it
	        : '[' + p.map(function(s, i) {

	            // is it an expression or a string (every second part is an expression)
	          return i % 2

	              // evaluate the expressions
	              ? expr(s, true)

	              // process string parts of the template:
	              : '"' + s

	                  // preserve new lines
	                  .replace(/\n/g, '\\n')

	                  // escape quotes
	                  .replace(/"/g, '\\"')

	                + '"'

	        }).join(',') + '].join("")'
	      )

	      // bring escaped { and } back
	      .replace(/\uFFF0/g, brackets(0))
	      .replace(/\uFFF1/g, brackets(1))

	    + ';')

	  }


	  // parse { ... } expression

	  function expr(s, n) {
	    s = s

	      // convert new lines to spaces
	      .replace(/\n/g, ' ')

	      // trim whitespace, brackets, strip comments
	      .replace(brackets(/^[{ ]+|[ }]+$|\/\*.+?\*\//g), '')

	    // is it an object literal? i.e. { key : value }
	    return /^\s*[\w- "']+ *:/.test(s)

	      // if object literal, return trueish keys
	      // e.g.: { show: isOpen(), done: item.done } -> "show done"
	      ? '[' +

	          // extract key:val pairs, ignoring any nested objects
	          extract(s,

	              // name part: name:, "name":, 'name':, name :
	              /["' ]*[\w- ]+["' ]*:/,

	              // expression part: everything upto a comma followed by a name (see above) or end of line
	              /,(?=["' ]*[\w- ]+["' ]*:)|}|$/
	              ).map(function(pair) {

	                // get key, val parts
	                return pair.replace(/^[ "']*(.+?)[ "']*: *(.+?),? *$/, function(_, k, v) {

	                  // wrap all conditional parts to ignore errors
	                  return v.replace(/[^&|=!><]+/g, wrap) + '?"' + k + '":"",'

	                })

	              }).join('')

	        + '].join(" ").trim()'

	      // if js expression, evaluate as javascript
	      : wrap(s, n)

	  }


	  // execute js w/o breaking on errors or undefined vars

	  function wrap(s, nonull) {
	    s = s.trim()
	    return !s ? '' : '(function(v){try{v='

	        // prefix vars (name => data.name)
	        + (s.replace(re_vars, function(s, _, v) { return v ? '(d.'+v+'===undefined?'+(typeof window == 'undefined' ? 'global.' : 'window.')+v+':d.'+v+')' : s })

	          // break the expression if its empty (resulting in undefined value)
	          || 'x')

	      + '}finally{return '

	        // default to empty string for falsy values except zero
	        + (nonull === true ? '!v&&v!==0?"":v' : 'v')

	      + '}}).call(d)'
	  }


	  // split string by an array of substrings

	  function split(str, substrings) {
	    var parts = []
	    substrings.map(function(sub, i) {

	      // push matched expression and part before it
	      i = str.indexOf(sub)
	      parts.push(str.slice(0, i), sub)
	      str = str.slice(i + sub.length)
	    })

	    // push the remaining part
	    return parts.concat(str)
	  }


	  // match strings between opening and closing regexp, skipping any inner/nested matches

	  function extract(str, open, close) {

	    var start,
	        level = 0,
	        matches = [],
	        re = new RegExp('('+open.source+')|('+close.source+')', 'g')

	    str.replace(re, function(_, open, close, pos) {

	      // if outer inner bracket, mark position
	      if(!level && open) start = pos

	      // in(de)crease bracket level
	      level += open ? 1 : -1

	      // if outer closing bracket, grab the match
	      if(!level && close != null) matches.push(str.slice(start, pos+close.length))

	    })

	    return matches
	  }

	})()

	// { key, i in items} -> { key, i, items }
	function loopKeys(expr) {
	  var ret = { val: expr },
	      els = expr.split(/\s+in\s+/)

	  if (els[1]) {
	    ret.val = brackets(0) + els[1]
	    els = els[0].slice(brackets(0).length).trim().split(/,\s*/)
	    ret.key = els[0]
	    ret.pos = els[1]
	  }

	  return ret
	}

	function mkitem(expr, key, val) {
	  var item = {}
	  item[expr.key] = key
	  if (expr.pos) item[expr.pos] = val
	  return item
	}


	/* Beware: heavy stuff */
	function _each(dom, parent, expr) {

	  remAttr(dom, 'each')

	  var template = dom.outerHTML,
	      prev = dom.previousSibling,
	      root = dom.parentNode,
	      rendered = [],
	      tags = [],
	      checksum

	  expr = loopKeys(expr)

	  function add(pos, item, tag) {
	    rendered.splice(pos, 0, item)
	    tags.splice(pos, 0, tag)
	  }

	  // clean template code
	  parent.one('update', function() {
	    root.removeChild(dom)

	  }).one('premount', function() {
	    if (root.stub) root = parent.root

	  }).on('update', function() {

	    var items = tmpl(expr.val, parent)
	    if (!items) return

	    // object loop. any changes cause full redraw
	    if (!Array.isArray(items)) {
	      var testsum = JSON.stringify(items)
	      if (testsum == checksum) return
	      checksum = testsum

	      // clear old items
	      each(tags, function(tag) { tag.unmount() })
	      rendered = []
	      tags = []

	      items = Object.keys(items).map(function(key) {
	        return mkitem(expr, key, items[key])
	      })

	    }

	    // unmount redundant
	    each(rendered, function(item) {
	      if (item instanceof Object) {
	        // skip existing items
	        if (items.indexOf(item) > -1) {
	          return
	        }
	      } else {
	        // find all non-objects
	        var newItems = arrFindEquals(items, item),
	            oldItems = arrFindEquals(rendered, item)

	        // if more or equal amount, no need to remove
	        if (newItems.length >= oldItems.length) {
	          return
	        }
	      }
	      var pos = rendered.indexOf(item),
	          tag = tags[pos]

	      if (tag) {
	        tag.unmount()
	        rendered.splice(pos, 1)
	        tags.splice(pos, 1)
	      }

	    })

	    // mount new / reorder
	    var nodes = [].slice.call(root.childNodes),
	        prev_index = nodes.indexOf(prev)

	    each(items, function(item, i) {

	      // start index search from position based on the current i
	      var pos = items.indexOf(item, i),
	          oldPos = rendered.indexOf(item, i)

	      // if not found, search backwards from current i position
	      pos < 0 && (pos = items.lastIndexOf(item, i))
	      oldPos < 0 && (oldPos = rendered.lastIndexOf(item, i))

	      if (!(item instanceof Object)) {
	        // find all non-objects
	        var newItems = arrFindEquals(items, item),
	            oldItems = arrFindEquals(rendered, item)

	        // if more, should mount one new
	        if (newItems.length > oldItems.length) {
	          oldPos = -1
	        }
	      }

	      // mount new
	      if (oldPos < 0) {
	        rendered.push(item)
	        if (!checksum && expr.key) item = mkitem(expr, item, pos)

	        var tag = new Tag({ tmpl: template }, {
	          before: nodes[prev_index + 1 + pos],
	          parent: parent,
	          root: root,
	          item: item
	        })

	        tag.mount()

	        return add(pos, item, tag)
	      }

	      // change pos value
	      if (expr.pos && tags[oldPos][expr.pos] != pos) {
	        tags[oldPos].one('update', function(item) {
	          item[expr.pos] = pos
	        })
	        tags[oldPos].update()
	      }

	      // reorder
	      if (pos != oldPos) {
	        root.insertBefore(nodes[prev_index + oldPos + 1], nodes[prev_index + pos + 1])
	        return add(pos, rendered.splice(oldPos, 1)[0], tags.splice(oldPos, 1)[0])
	      }

	    })

	    rendered = items.slice()

	  })

	}


	function parseNamedElements(root, parent, child_tags) {

	  walk(root, function(dom) {
	    if (dom.nodeType == 1) {

	      // custom child tag
	      var child = getTag(dom)

	      if (child && !dom.getAttribute('each')) {
	        var tag = new Tag(child, { root: dom, parent: parent })
	        parent.tags[dom.getAttribute('name') || child.name] = tag
	        // empty the child node once we got its template
	        // to avoid that its children get compiled multiple times
	        dom.innerHTML = ''
	        child_tags.push(tag)
	      }

	      each(dom.attributes, function(attr) {
	        if (/^(name|id)$/.test(attr.name)) parent[attr.value] = dom
	      })
	    }

	  })

	}

	function parseExpressions(root, tag, expressions) {

	  function addExpr(dom, val, extra) {
	    if (val.indexOf(brackets(0)) >= 0) {
	      var expr = { dom: dom, expr: val }
	      expressions.push(extend(expr, extra))
	    }
	  }

	  walk(root, function(dom) {
	    var type = dom.nodeType

	    // text node
	    if (type == 3 && dom.parentNode.tagName != 'STYLE') addExpr(dom, dom.nodeValue)
	    if (type != 1) return

	    /* element */

	    // loop
	    var attr = dom.getAttribute('each')
	    if (attr) { _each(dom, tag, attr); return false }

	    // attribute expressions
	    each(dom.attributes, function(attr) {
	      var name = attr.name,
	          bool = name.split('__')[1]

	      addExpr(dom, attr.value, { attr: bool || name, bool: bool })
	      if (bool) { remAttr(dom, name); return false }

	    })

	    // skip custom tags
	    if (getTag(dom)) return false

	  })

	}

	function Tag(impl, conf) {

	  var self = riot.observable(this),
	      opts = inherit(conf.opts) || {},
	      dom = mkdom(impl.tmpl),
	      parent = conf.parent,
	      expressions = [],
	      child_tags = [],
	      root = conf.root,
	      item = conf.item,
	      fn = impl.fn,
	      attr = {},
	      loop_dom

	  if (fn && root.riot) return
	  root.riot = true

	  extend(this, { parent: parent, root: root, opts: opts, tags: {} }, item)

	  // grab attributes
	  each(root.attributes, function(el) {
	    attr[el.name] = el.value
	  })

	  // options
	  function updateOpts(rem_attr) {
	    each(Object.keys(attr), function(name) {
	      opts[name] = tmpl(attr[name], parent || self)
	    })
	  }

	  this.update = function(data, init) {
	    extend(self, data, item)
	    updateOpts()
	    self.trigger('update', item)
	    update(expressions, self, item)
	    self.trigger('updated')
	  }

	  this.mount = function() {

	    updateOpts()

	    // initialiation
	    fn && fn.call(self, opts)

	    toggle(true)

	    // parse layout after init. fn may calculate args for nested custom tags
	    parseExpressions(dom, self, expressions)

	    self.update()

	    // internal use only, fixes #403
	    self.trigger('premount')

	    if (fn) {
	      while (dom.firstChild) root.appendChild(dom.firstChild)

	    } else {
	      loop_dom = dom.firstChild
	      root.insertBefore(loop_dom, conf.before || null) // null needed for IE8
	    }

	    if (root.stub) self.root = root = parent.root
	    self.trigger('mount')

	  }


	  this.unmount = function() {
	    var el = fn ? root : loop_dom,
	        p = el.parentNode

	    if (p) {
	      if (parent) p.removeChild(el)
	      else while (root.firstChild) root.removeChild(root.firstChild)
	      toggle()
	      self.trigger('unmount')
	      self.off('*')
	      delete root.riot
	    }

	  }

	  function toggle(is_mount) {

	    // mount/unmount children
	    each(child_tags, function(child) { child[is_mount ? 'mount' : 'unmount']() })

	    // listen/unlisten parent (events flow one way from parent to children)
	    if (parent) {
	      var evt = is_mount ? 'on' : 'off'
	      parent[evt]('update', self.update)[evt]('unmount', self.unmount)
	    }
	  }

	  // named elements available for fn
	  parseNamedElements(dom, this, child_tags)


	}

	function setEventHandler(name, handler, dom, tag, item) {

	  dom[name] = function(e) {

	    // cross browser event fix
	    e = e || window.event
	    e.which = e.which || e.charCode || e.keyCode
	    e.target = e.target || e.srcElement
	    e.currentTarget = dom
	    e.item = item

	    // prevent default behaviour (by default)
	    if (handler.call(tag, e) !== true) {
	      e.preventDefault && e.preventDefault()
	      e.returnValue = false
	    }

	    var el = item ? tag.parent : tag
	    el.update()

	  }

	}

	// used by if- attribute
	function insertTo(root, node, before) {
	  if (root) {
	    root.insertBefore(before, node)
	    root.removeChild(node)
	  }
	}

	// item = currently looped item
	function update(expressions, tag, item) {

	  each(expressions, function(expr) {

	    var dom = expr.dom,
	        attr_name = expr.attr,
	        value = tmpl(expr.expr, tag),
	        parent = expr.dom.parentNode

	    if (value == null) value = ''

	    // leave out riot- prefixes from strings inside textarea
	    if (parent && parent.tagName == 'TEXTAREA') value = value.replace(/riot-/g, '')

	    // no change
	    if (expr.value === value) return
	    expr.value = value

	    // text node
	    if (!attr_name) return dom.nodeValue = value

	    // remove original attribute
	    remAttr(dom, attr_name)

	    // event handler
	    if (typeof value == 'function') {
	      setEventHandler(attr_name, value, dom, tag, item)

	    // if- conditional
	    } else if (attr_name == 'if') {
	      var stub = expr.stub

	      // add to DOM
	      if (value) {
	        stub && insertTo(stub.parentNode, stub, dom)

	      // remove from DOM
	      } else {
	        stub = expr.stub = stub || document.createTextNode('')
	        insertTo(dom.parentNode, dom, stub)
	      }

	    // show / hide
	    } else if (/^(show|hide)$/.test(attr_name)) {
	      if (attr_name == 'hide') value = !value
	      dom.style.display = value ? '' : 'none'

	    // field value
	    } else if (attr_name == 'value') {
	      dom.value = value

	    // <img src="{ expr }">
	    } else if (attr_name.slice(0, 5) == 'riot-') {
	      attr_name = attr_name.slice(5)
	      value ? dom.setAttribute(attr_name, value) : remAttr(dom, attr_name)

	    } else {
	      if (expr.bool) {
	        dom[attr_name] = value
	        if (!value) return
	        value = attr_name
	      }

	      if (typeof value != 'object') dom.setAttribute(attr_name, value)

	    }

	  })

	}
	function each(els, fn) {
	  for (var i = 0, len = (els || []).length, el; i < len; i++) {
	    el = els[i]
	    // return false -> reomve current item during loop
	    if (el != null && fn(el, i) === false) i--
	  }
	  return els
	}

	function remAttr(dom, name) {
	  dom.removeAttribute(name)
	}

	// max 2 from objects allowed
	function extend(obj, from, from2) {
	  from && each(Object.keys(from), function(key) {
	    obj[key] = from[key]
	  })
	  return from2 ? extend(obj, from2) : obj
	}

	function mkdom(template) {
	  var tag_name = template.trim().slice(1, 3).toLowerCase(),
	      root_tag = /td|th/.test(tag_name) ? 'tr' : tag_name == 'tr' ? 'tbody' : 'div',
	      el = document.createElement(root_tag)

	  el.stub = true
	  el.innerHTML = template
	  return el
	}

	function walk(dom, fn) {
	  if (dom) {
	    if (fn(dom) === false) walk(dom.nextSibling, fn)
	    else {
	      dom = dom.firstChild

	      while (dom) {
	        walk(dom, fn)
	        dom = dom.nextSibling
	      }
	    }
	  }
	}

	function arrDiff(arr1, arr2) {
	  return arr1.filter(function(el) {
	    return arr2.indexOf(el) < 0
	  })
	}

	function arrFindEquals(arr, el) {
	  return arr.filter(function (_el) {
	    return _el === el
	  })
	}

	function inherit(parent) {
	  function Child() {}
	  Child.prototype = parent
	  return new Child()
	}

	/*
	 Virtual dom is an array of custom tags on the document.
	 Updates and unmounts propagate downwards from parent to children.
	*/

	var virtual_dom = [],
	    tag_impl = {}


	function getTag(dom) {
	  return tag_impl[dom.tagName.toLowerCase()]
	}

	function injectStyle(css) {
	  var node = document.createElement('style')
	  node.innerHTML = css
	  document.head.appendChild(node)
	}

	function mountTo(root, tagName, opts) {
	  var tag = tag_impl[tagName]

	  if (tag && root) tag = new Tag(tag, { root: root, opts: opts })

	  if (tag && tag.mount) {
	    tag.mount()
	    virtual_dom.push(tag)
	    return tag.on('unmount', function() {
	      virtual_dom.splice(virtual_dom.indexOf(tag), 1)
	    })
	  }

	}

	riot.tag = function(name, html, css, fn) {
	  if (typeof css == 'function') fn = css
	  else if (css) injectStyle(css)
	  tag_impl[name] = { name: name, tmpl: html, fn: fn }
	}

	riot.mount = function(selector, tagName, opts) {
	  if (selector == '*') selector = Object.keys(tag_impl).join(', ')
	  if (typeof tagName == 'object') { opts = tagName; tagName = 0 }

	  var tags = []

	  function push(root) {
	    var name = tagName || root.tagName.toLowerCase(),
	        tag = mountTo(root, name, opts)

	    if (tag) tags.push(tag)
	  }

	  // DOM node
	  if (selector.tagName) {
	    push(selector)
	    return tags[0]

	  // selector
	  } else {
	    each(document.querySelectorAll(selector), push)
	    return tags
	  }

	}

	// update everything
	riot.update = function() {
	  return each(virtual_dom, function(tag) {
	    tag.update()
	  })
	}

	// @deprecated
	riot.mountTo = riot.mount


	  
	  // share methods for other riot parts, e.g. compiler
	  riot.util = { brackets: brackets, tmpl: tmpl }

	  // support CommonJS
	  if (true)
	    module.exports = riot

	  // support AMD
	  else if (typeof define === 'function' && define.amd)
	    define(function() { return riot })

	  // support browser
	  else
	    this.riot = riot

	})();


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var riot = _interopRequire(__webpack_require__(4));

	riot.tag("presentation", "<section class=\"presentation\">\n\t    <h2>Qu'est-ce que c'est ?</h2>\n\t    <p>\n\t        Cette application vous permet de gérer, visualiser et organiser\n\t        le contenu de votre cave à vin.\n\t    </p>\n\t</section>");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var riot = _interopRequire(__webpack_require__(4));

	var Cave = __webpack_require__(8).Cave;

	var formulaireImport = _interopRequire(__webpack_require__(9));

	var formulaireSaisie = _interopRequire(__webpack_require__(10));

	riot.tag("cave", "\n\t<section class=\"cave\" ng-controller=\"CaveController\">\n\t\t<div class=\"erreur\" if=\"{ estVide }\">\n\t\t\t<p>Vous n'avez pas encore ajouté de bouteilles à votre cave.</p>\n\t\t\t<p>\n\t\t\t\t<a class=\"action\" onclick=\"{ afficherFormulaires }\"><i class=\"fa fa-plus\"></i> Mettez des bouteilles en cave</a>\n\t\t\t\tou <a class=\"action\" onclick=\"{ afficherFormulaires }\"><i class=\"fa fa-file\"></i> Importez une cave depuis OpenCellar</a>\n\t\t\t\tafin de pouvoir commencer à utiliser le site\n\t\t\t</p>\n\t\t</div>\n\n\t\t<div if=\"{ enModeAjout }\">\n\t\t\t<a onclick=\"{ cacherFormulaires }\" href=\"#\">Fermer [x]</a>\n\t\t\t<formulaire-import cave=\"{ cave }\">\n\t\t\t<formulaire-saisie cave=\"{ cave }\">\n\t\t</div>\n\n\t\t<div class=\"bouteilles\" if=\"{ !estVide }\">\n\t\t\t<h2>Vos bouteilles</h2>\n\t\t\t<p>\n\t\t\t\t<button onclick=\"{ afficherFormulaires }\">Mettre une bouteille en cave</button>\n\t\t\t\t<button onclick=\"{ afficherFormulaires }\">Importer depuis OpenCellar</button>\n\t\t\t</p>\n\n\t\t\t<ul>\n\t\t\t\t<li each=\"{ bouteilles }\">\n\t\t\t\t\t{ nom } { millesime.annee } ({ couleur.nom })\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</div>\n\t</section>\n\t", function (opts) {
		var _this = this;

		this.cave = new Cave();

		this.cave.on("update", function () {
			return _this.update();
		});

		this.enModeAjout = false;
		this.afficherFormulaires = function (e) {
			return _this.enModeAjout = true;
		};
		this.cacherFormulaires = function (e) {
			return _this.enModeAjout = false;
		};

		this.on("update", function () {
			_this.bouteilles = _this.cave.bouteilles();
			_this.estVide = _this.cave.estVide();
		});
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var header = _interopRequire(__webpack_require__(11));

	var footer = _interopRequire(__webpack_require__(12));

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var InMemoryCave = __webpack_require__(15).Cave;

	var Bouteille = __webpack_require__(14).Bouteille;

	var STORAGE_KEY = "cave";

	var Cave = exports.Cave = (function (_InMemoryCave) {
		function Cave() {
			_classCallCheck(this, Cave);

			_get(Object.getPrototypeOf(Cave.prototype), "constructor", this).call(this);
			this._storage = window.localStorage;
			this._bouteilles = unserializeBouteilles(this._storage.getItem(STORAGE_KEY) || "[]");
		}

		_inherits(Cave, _InMemoryCave);

		_createClass(Cave, {
			ajouteBouteille: {
				value: function ajouteBouteille(bouteille) {
					_get(Object.getPrototypeOf(Cave.prototype), "ajouteBouteille", this).call(this, bouteille);
					this._storage.setItem(STORAGE_KEY, serializeBouteilles(this._bouteilles));
				}
			}
		});

		return Cave;
	})(InMemoryCave);

	function serializeBouteilles(bouteilles) {
		return JSON.stringify(bouteilles);
	}

	function unserializeBouteilles(bouteilles) {
		return JSON.parse(bouteilles).map(Bouteille.fromJSON);
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var riot = _interopRequire(__webpack_require__(4));

	var OpenCellarImporter = _interopRequire(__webpack_require__(13));

	riot.tag("formulaire-import", "\n\t<form>\n\t\t<input type=\"file\" onchange=\"{ importerFichier }\"></div>\n\t\tImporter un fichier CSV OpenCellar\n\t</form>\n\t", function (opts) {
		var cave = this.opts.cave;

		this.importerFichier = function (e) {
			var reader = new FileReader();
			reader.onload = function (e) {
				return new OpenCellarImporter(cave).importCsvString(e.target.result);
			};
			reader.readAsText(e.target.files[0]);
		};
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var riot = _interopRequire(__webpack_require__(4));

	var _bouteille = __webpack_require__(14);

	var Bouteille = _bouteille.Bouteille;
	var Cepage = _bouteille.Cepage;
	var Contenance = _bouteille.Contenance;
	var Couleur = _bouteille.Couleur;
	var Denomination = _bouteille.Denomination;
	var Medaille = _bouteille.Medaille;
	var Millesime = _bouteille.Millesime;
	var Producteur = _bouteille.Producteur;
	var Region = _bouteille.Region;
	var Taux = _bouteille.Taux;

	riot.tag("formulaire-saisie", "\n\t<form onsubmit=\"{ ajouteBouteille }\">\n\t    <div>\n\t        <label for=\"nom\">Nom / Cuvée</label>\n\t        <input type='text' name='nom' placeholder='Entrez le nom / la cuvée de la bouteille'>\n\t    </div>\n\n\t    <div>\n\t        <label for=\"millesime\">Millésime</label>\n\t        <input type='number' name='millesime' placeholder='2012'>\n\t    </div>\n\n\t    <div>\n\t        <label for=\"couleur\">Couleur</label>\n\t        <select name=\"couleur\">\n\t            <option value=\"Rouge\">Rouge\n\t            <option value=\"Rosé\">Rosé\n\t            <option value=\"Blanc\">Blanc\n\t            <option value=\"Champagne\">Champagne\n\t        </select>\n\t    </div>\n\n\t    <div>\n\t        <label for=\"contenance\">Contenance</label>\n\t        <input type='number' name='contenance_quantite' placeholder='75'>\n\t        <select name='contenance_unite'>\n\t            <option value=\"cl\">cl</option>\n\t            <option value=\"l\">L</option>\n\t        </select>\n\t    </div>\n\n\t    <div>\n\t        <label for=\"producteur\">Producteur</label>\n\t        <input type='text' name='producteur' placeholder='Château Saincrit'>\n\t    </div>\n\n\t    <div>\n\t        <label for=\"denomination\">Dénomination</label>\n\t        <input type='text' name='denomination' placeholder='bordeaux supérieur aoc'>\n\t    </div>\n\n\t    <div>\n\t        <label for=\"region\">Région</label>\n\t        <input type='region' name='region' placeholder='bordeaux'>\n\t    </div>\n\n\t    <div>\n\t        <label for=\"taux_alcool\">Taux d'alcool</label>\n\t        <input type='text' name='taux_alcool' placeholder='12,5'>\n\t    </div>\n\n\t    <div>\n\t        <label for=\"cepages\">Cépages</label>\n\n\t        <input type=\"checkbox\" name=\"cepages_cabernet\" id=\"cabernet\" value=\"cabernet\">\n\t        <label for=\"cabernet\">Cabernet</label>\n\n\t        <input type=\"checkbox\" name=\"cepages_sauvignon\" id=\"sauvignon\" value=\"sauvignon\">\n\t        <label for=\"sauvignon\">Sauvignon</label>\n\n\t        <input type=\"checkbox\" name=\"cepages_syrah\" id=\"syrah\" value=\"syrah\">\n\t        <label for=\"syrah\">Syrah</label>\n\n\t        <input type=\"checkbox\" name=\"cepages_merlot\" id=\"merlot\" value=\"merlot\">\n\t        <label for=\"merlot\">Merlot</label>\n\n\t        <input type=\"checkbox\" name=\"cepages_tanat\" id=\"tanat\" value=\"tanat\">\n\t        <label for=\"tanat\">Tanat</label>\n\n\t        <input type=\"checkbox\" name=\"cepages_muscat\" id=\"muscat\" value=\"muscat\">\n\t        <label for=\"muscat\">Muscat</label>\n\n\t        <input type=\"checkbox\" name=\"cepages_chacelas\" id=\"chacelas\" value=\"chacelas\">\n\t        <label for=\"chacelas\">Chacelas</label>\n\t    </div>\n\n\t    <div>\n\t        <label for=\"medaille\">Médaille</label>\n\n\t        <label for=\"classement\">Classement</label>\n\t        <input type=\"number\" name=\"medaille_classement\">\n\n\t        <label for=\"nom\">Nom</label>\n\t        <input type=\"text\" name=\"medaille_nom\">\n\n\t        <label for=\"annee\">Annee</label>\n\t        <input type=\"number\" name=\"medaille_annee\">\n\t    </div>\n\n\t    <button type=\"submit\">Mettre en cave</button>\n\t</form>\n\t", function (opts) {
		var _this = this;

		var cave = this.opts.cave;

		this.ajouteBouteille = function (e) {
			var bouteille = new Bouteille(_this.nom.value);
			bouteille.setMillesime(new Millesime(_this.millesime.value));
			bouteille.setCouleur(new Couleur(_this.couleur.value));
			bouteille.setContenance(new Contenance(_this.contenance_quantite.value, _this.contenance_unite.value));
			bouteille.setProducteur(new Producteur(_this.producteur.value));
			bouteille.setDenomination(new Denomination(_this.denomination.value));
			bouteille.setRegion(new Region(_this.region.value));
			bouteille.setTauxAlcool(new Taux(_this.taux_alcool.value));

			// TODO Make it work in a different component
			// for (var cepage in this.cepages.value) {
			// 	bouteille.ajouteCepage(new Cepage(cepage));
			// }

			bouteille.ajouteMedaille(new Medaille(_this.medaille_classement.value, _this.medaille_nom.value, _this.medaille_annee.value));

			cave.ajouteBouteille(bouteille);
		};
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var riot = _interopRequire(__webpack_require__(4));

	riot.tag("layout-header", "\n\t<header>\n        <h1>Ma cave à vin !</h1>\n    </header>\n\t");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var riot = _interopRequire(__webpack_require__(4));

	riot.tag("layout-footer", "\n\t<footer>\n        <hr/>\n        <div class=\"a-propos\">\n            <h4>Qui sommes-nous ?</h4>\n            <p>\n                <i class=\"fa fa-twitter\"></i>\n                Le projet principalement maintenu par\n                <a href=\"http://twitter.com/pierremartin\">Pierre Martin</a>.\n            </p>\n            <p>\n                <i class=\"fa fa-github\"></i>\n                Le code source est disponible sur <a href=\"http://github.com/real34/ma-cave\">Github</a> !\n            </p>\n        </div>\n        <div class=\"suggestions\">\n            <h4>Un problème, des suggestions ? Contactez-nous !</h4>\n            <form action=\"//api.formspree.com/contact@pierre-martin.fr\" method=\"post\">\n                <label for=\"nom\">Nom :</label> <input type=\"text\" name=\"nom\">\n                <label for=\"_replyto\">Email :</label> <input type=\"email\" name=\"_replyto\">\n                <label for=\"suggestion\">Message : </label>\n                <textarea name=\"suggestion\" required=\"required\" id=\"\" cols=\"30\" rows=\"10\"></textarea>\n                <button type=\"submit\"><i class=\"fa fa-rocket\"></i> Envoyer</button>\n            </form>\n        </div>\n    </footer>\n\t");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var csv = __webpack_require__(16);
	var Bouteille = __webpack_require__(14).Bouteille;
	var Couleur = __webpack_require__(14).Couleur;

	var csvFormatOptions = { delimiter: ";", columns: true };

	var OpenCellarImporter = function OpenCellarImporter(cave) {
		this.cave = cave;
	};

	OpenCellarImporter.prototype.importCsv = function (csvFilePathOrString, callback) {
		this.csvParser(callback).from(csvFilePathOrString, csvFormatOptions);
	};

	OpenCellarImporter.prototype.importCsvString = function (content, callback) {
		this.csvParser(callback).from.string(content, csvFormatOptions);
	};

	OpenCellarImporter.prototype.csvParser = function (callback) {
		callback = callback || function () {};
		return csv().on("record", this.importRow.bind(this)).on("end", callback);
	};

	OpenCellarImporter.prototype.importRow = function (row) {
		var bouteille = new Bouteille(row.Nom);
		bouteille.setCouleur(new Couleur(row.Couleur));
		this.cave.ajouteBouteille(bouteille);
	};

	module.exports = OpenCellarImporter;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Bouteille = function Bouteille(nom) {
		this.nom = nom;
		this.cepages = [];
		this.medailles = [];
	};

	Bouteille.prototype.setMillesime = function (millesime) {
		this.millesime = millesime;
	};
	Bouteille.prototype.setCouleur = function (couleur) {
		this.couleur = couleur;
	};
	Bouteille.prototype.setContenance = function (contenance) {
		this.contenance = contenance;
	};
	Bouteille.prototype.setProducteur = function (producteur) {
		this.producteur = producteur;
	};
	Bouteille.prototype.setDenomination = function (denomination) {
		this.denomination = denomination;
	};
	Bouteille.prototype.setRegion = function (region) {
		this.region = region;
	};
	Bouteille.prototype.setTauxAlcool = function (taux_alcool) {
		this.taux_alcool = taux_alcool;
	};
	Bouteille.prototype.ajouteCepage = function (cepage) {
		this.cepages.push(cepage);
	};
	Bouteille.prototype.ajouteMedaille = function (medaille) {
		this.medailles.push(medaille);
	};
	Bouteille.fromJSON = function (data) {
		var bouteille = new Bouteille(data.nom);
		// TODO Set correct data
		bouteille.setMillesime(Millesime.fromJSON(data.millesime));
		bouteille.setCouleur(Couleur.fromJSON(data.couleur));
		return bouteille;
	};

	var Millesime = function Millesime(annee) {
		this.annee = annee;
	};
	Millesime.fromJSON = function (data) {
		data = data || { annee: "" };
		return new Millesime(data.annee);
	};

	var Couleur = function Couleur(nom) {
		this.nom = nom;
	};
	Couleur.fromJSON = function (data) {
		data = data || { nom: "" };
		return new Couleur(data.nom);
	};

	var Contenance = function Contenance(quantité, unité) {
		this.quantité = quantité;
		this.unité = unité;
	};

	var Producteur = function Producteur(nom) {
		this.nom = nom;
		// TODO Ajouter les informations détaillées
		// domaine : Château Saincrit
		//    nom
		//    propriétaire
		//     adresse
	};

	var Denomination = function Denomination(nom) {
		this.nom = nom;
	};

	var Region = function Region(nom) {
		this.nom = nom;
	};

	var Cepage = function Cepage(nom) {
		this.nom = nom;
	};

	var Taux = function Taux(pourcentage) {
		this.pourcentage = pourcentage;
	};

	var Medaille = function Medaille(classement, nom, annee) {
		this.classement = classement;
		this.nom = nom;
		this.annee = annee;
	};

	module.exports = {
		Bouteille: Bouteille,
		Millesime: Millesime,
		Couleur: Couleur,
		Contenance: Contenance,
		Producteur: Producteur,
		Denomination: Denomination,
		Region: Region,
		Cepage: Cepage,
		Taux: Taux,
		Medaille: Medaille
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var riot = _interopRequire(__webpack_require__(4));

	var Cave = exports.Cave = (function () {
		function Cave() {
			_classCallCheck(this, Cave);

			riot.observable(this);
			this._bouteilles = [];
		}

		_createClass(Cave, {
			estVide: {
				value: function estVide() {
					return this._bouteilles.length === 0;
				}
			},
			ajouteBouteille: {
				value: function ajouteBouteille(bouteille) {
					this._bouteilles.push(bouteille);
					this.trigger("update");
				}
			},
			bouteilles: {
				value: function bouteilles() {
					return this._bouteilles;
				}
			}
		});

		return Cave;
	})();

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var csv = __webpack_require__(18);
	csv.generator = __webpack_require__(17);

	module.exports = csv;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, Buffer) {// Generated by CoffeeScript 1.7.0
	var Generator, Stream, nextTick, timers, util;

	Stream = __webpack_require__(27);

	util = __webpack_require__(28);

	timers = __webpack_require__(29);

	nextTick = timers.setImmediate ? timers.setImmediate : process.nextTick;


	/*

	`generator([options])`: Generate random CSV data
	================================================

	This function is provided for conveniency in case you need to generate random CSV data.

	Note, it is quite simple at the moment, more functionnalities could come later. The code 
	originates from "./samples/perf.coffee" and was later extracted in case other persons need 
	its functionnalities.

	Options may include

	*   duration          Period to run in milliseconds, default to 4 minutes.
	*   nb_columns        Number of fields per record
	*   max_word_length   Maximum number of characters per word
	*   start             Start the generation on next tick, otherwise you must call resume

	Starting a generation

	  csv = require 'csv'
	  generator = csv.generator
	  generator(start: true).pipe csv().to.path "#{__dirname}/perf.out"
	 */

	Generator = function(options) {
	  var _base, _base1;
	  this.options = options != null ? options : {};
	  if ((_base = this.options).duration == null) {
	    _base.duration = 4 * 60 * 1000;
	  }
	  this.options.nb_columns = 8;
	  if ((_base1 = this.options).max_word_length == null) {
	    _base1.max_word_length = 16;
	  }
	  this.start = Date.now();
	  this.end = this.start + this.options.duration;
	  this.readable = true;
	  if (this.options.start) {
	    nextTick(this.resume.bind(this));
	  }
	  return this;
	};

	Generator.prototype.__proto__ = Stream.prototype;

	Generator.prototype.resume = function() {
	  var char, column, line, nb_chars, nb_words, _i, _j, _ref, _ref1;
	  this.paused = false;
	  while (!this.paused && this.readable) {
	    if (Date.now() > this.end) {
	      return this.destroy();
	    }
	    line = [];
	    for (nb_words = _i = 0, _ref = this.options.nb_columns; 0 <= _ref ? _i < _ref : _i > _ref; nb_words = 0 <= _ref ? ++_i : --_i) {
	      column = [];
	      for (nb_chars = _j = 0, _ref1 = Math.ceil(Math.random() * this.options.max_word_length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; nb_chars = 0 <= _ref1 ? ++_j : --_j) {
	        char = Math.floor(Math.random() * 32);
	        column.push(String.fromCharCode(char + (char < 16 ? 65 : 97 - 16)));
	      }
	      line.push(column.join(''));
	    }
	    this.emit('data', new Buffer("" + (line.join(',')) + "\n", this.options.encoding));
	  }
	};

	Generator.prototype.pause = function() {
	  return this.paused = true;
	};

	Generator.prototype.destroy = function() {
	  this.readable = false;
	  this.emit('end');
	  return this.emit('close');
	};


	/*
	`setEncoding([encoding])`

	Makes the 'data' event emit a string instead of a Buffer. 
	encoding can be 'utf8', 'utf16le' ('ucs2'), 'ascii', or 
	'hex'. Defaults to 'utf8'.
	 */

	Generator.prototype.setEncoding = function(encoding) {
	  return this.options.encoding = encoding;
	};

	module.exports = function(options) {
	  return new Generator(options);
	};

	module.exports.Generator = Generator;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30), __webpack_require__(31).Buffer))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Generated by CoffeeScript 1.7.0

	/*

	Node CSV
	========

	This project provides CSV parsing and has been tested and used 
	on large input files.

	*   Follow the Node.js streaming API
	*   Async and event based
	*   Support delimiters, quotes, escape characters and comments
	*   Line breaks discovery: detected in source and reported to destination
	*   Data transformation
	*   Support for large datasets
	*   Complete test coverage as sample and inspiration
	*   no external dependencies

	Important: this documentation covers the current version (0.2.x) of 
	`node-csv-parser`. The documentation for the previous version (0.1.0) is 
	available [here](https://github.com/wdavidw/node-csv-parser/tree/v0.1).

	Installation
	------------

	```bash
	npm install csv
	```

	Quick example
	-------------

	This take a string with a comment and convert it to an array:

	    // node samples/string.js
	    csv()
	    .from.string(
	      '#Welcome\n"1","2","3","4"\n"a","b","c","d"',
	      {comment: '#'} )
	    .to.array( function(data){
	      console.log(data)
	    } );
	    // [ [ '1', '2', '3', '4' ], [ 'a', 'b', 'c', 'd' ] ]


	Advanced example
	----------------

	The following example illustrates 4 usages of the library:
	1.  Plug a readable stream from a file
	2.  Direct output to a file path
	3.  Transform each row
	4.  Listen to events
	    
	    // node samples/sample.js
	    var csv = require('csv');
	    var fs = require('fs');
	    csv()
	    .from.stream(fs.createReadStream(__dirname+'/sample.in'))
	    .to.path(__dirname+'/sample.out')
	    .transform( function(row){
	      row.unshift(row.pop());
	      return row;
	    })
	    .on('record', function(row,index){
	      console.log('#'+index+' '+JSON.stringify(row));
	    })
	    .on('end', function(count){
	      console.log('Number of lines: '+count);
	    })
	    .on('error', function(error){
	      console.log(error.message);
	    });
	    // #0 ["2000-01-01","20322051544","1979.0","8.8017226E7","ABC","45"]
	    // #1 ["2050-11-27","28392898392","1974.0","8.8392926E7","DEF","23"]
	    // Number of lines: 2

	Pipe example
	------------

	The module follow a Stream architecture. At its core, the parser and 
	the stringifier utilities provide a [Stream Writer][writable_stream] 
	and a [Stream Reader][readable_stream] implementation available in the CSV API.

	    +--------+      +----------+----------+       +--------+
	    |        |      |          |          |       |        |
	    |        |      |         CSV         |       |        |
	    |        |      |          |          |       |        |
	    | Stream |      |  Writer  |  Reader  |       | Stream |
	    | Reader |.pipe(|   API    |   API    |).pipe(| Writer |)
	    |        |      |          |          |       |        |
	    |        |      |          |          |       |        |
	    +--------+      +----------+----------+       +--------+

	Here's a quick example:

	    in = fs.createReadStream('./in')
	    out = fs.createWriteStream('./out')
	    in.pipe(csv()).pipe(out)

	Installing
	----------

	Via [npm](http://github.com/isaacs/npm):
	```bash
	npm install csv
	```

	Via git (or downloaded tarball):
	```bash
	git clone http://github.com/wdavidw/node-csv-parser.git
	```

	Events
	------

	The library extends Node [EventEmitter][event] class and emit all
	the events of the Writable and Readable [Stream API][stream]. Additionally, the useful "records" event 
	is emitted.

	*   *record*   
	  Emitted by the stringifier when a new row is parsed and transformed. The data is 
	  the value returned by the user `transform` callback if any. Note however that the event won't 
	  be called if `transform` returns `null` since the record is skipped.
	  The callback provides two arguments. `row` is the CSV line being processed (an array or an object)
	  and `index` is the index number of the line starting at zero
	*   *data*   
	  Emitted by the stringifier on each line once the data has been transformed and stringified.
	*   *drain*   
	*   *end*   
	  Emitted when the CSV content has been parsed.
	*   *finish*   
	  Emitted when all data has been flushed to the underlying system. For example, when writting to a file with `csv().to.path()`, the event will be called once the writing process is complete and the file closed.
	*   *error*   
	  Thrown whenever an error occured.

	Architecture
	------------

	The code is organized mainly around 5 main components. 
	The "from" properties provide convenient functions 
	to write CSV text or to plug a Stream Reader. The "parser" 
	takes this CSV content and transform it into an array or 
	an object for each line. The "transformer" provides the ability 
	to work on each line in a synchronous or asynchronous mode. 
	The "stringifier" takes an array or an object and serializes it into 
	CSV text. Finally, the "to" properties provide convenient 
	functions to retrieve the text or to write to plug a Stream Writer.

	    +-------+--------+--------------+--------------+-----+
	    |       |        |              |              |     |
	    | from -> parser -> transformer -> stringifier -> to |
	    |       |        |              |              |     |
	    +-------+--------+--------------+--------------+-----+

	Note, even though the "parser", "transformer" and "singifier" are available
	as properties, you won't have to interact with those.
	 */
	var CSV, from, options, parser, state, stream, stringifier, to, transformer, utils;

	stream = __webpack_require__(27);

	state = __webpack_require__(19);

	options = __webpack_require__(20);

	from = __webpack_require__(21);

	to = __webpack_require__(22);

	stringifier = __webpack_require__(23);

	parser = __webpack_require__(24);

	transformer = __webpack_require__(25);

	utils = __webpack_require__(26);

	CSV = function() {
	  var self;
	  self = this;
	  this.paused = false;
	  this.readable = true;
	  this.writable = true;
	  this.state = state();
	  this.options = options();
	  this.from = from(this);
	  this.to = to(this);
	  this.parser = parser(this);
	  this.parser.on('row', function(row) {
	    return self.transformer.write(row);
	  });
	  this.parser.on('end', function() {
	    if (self.state.count === 0) {
	      self.transformer.headers();
	    }
	    return self.transformer.end();
	  });
	  this.parser.on('error', function(e) {
	    return self.error(e);
	  });
	  this.stringifier = stringifier(this);
	  this.transformer = transformer(this);
	  this.transformer.on('end', function() {
	    var eof;
	    eof = self.options.to.eof;
	    if (eof) {
	      if (eof === true) {
	        eof = '\n';
	      }
	      self.stringifier.write(eof);
	    }
	    return self.emit('end', self.state.count);
	  });
	  return this;
	};

	CSV.prototype.__proto__ = stream.prototype;


	/*

	`pause()`
	---------

	Implementation of the Readable Stream API, requesting that no further data 
	be sent until resume() is called.
	 */

	CSV.prototype.pause = function() {
	  this.paused = true;
	  return this;
	};


	/*

	`resume()`
	----------

	Implementation of the Readable Stream API, resuming the incoming 'data' 
	events after a pause().
	 */

	CSV.prototype.resume = function() {
	  this.paused = false;
	  this.emit('drain');
	  return this;
	};


	/*

	`write(data, [preserve])`
	-------------------------

	Implementation of the Writable Stream API with a larger signature. Data
	may be a string, a buffer, an array or an object.

	If data is a string or a buffer, it could span multiple lines. If data 
	is an object or an array, it must represent a single line.
	Preserve is for line which are not considered as CSV data.
	 */

	CSV.prototype.write = function(chunk, preserve) {
	  var csv;
	  if (!this.writable) {
	    return this.emit('error', new Error('CSV no longer writable'));
	  }
	  if (chunk instanceof Buffer) {
	    chunk = chunk.toString();
	  }
	  if (typeof chunk === 'string' && !preserve) {
	    this.parser.write(chunk);
	  } else if (Array.isArray(chunk) && !this.state.transforming) {
	    csv = this;
	    this.transformer.write(chunk);
	  } else {
	    if (preserve || this.state.transforming) {
	      this.stringifier.write(chunk);
	    } else {
	      this.transformer.write(chunk);
	    }
	  }
	  return !this.paused;
	};


	/*

	`end()`
	-------

	Terminate the parsing. Call this method when no more csv data is 
	to be parsed. It implement the StreamWriter API by setting the `writable` 
	property to "false" and emitting the `end` event.
	 */

	CSV.prototype.end = function() {
	  if (!this.writable) {
	    return;
	  }
	  this.readable = false;
	  this.writable = false;
	  this.parser.end();
	  return this;
	};


	/*

	`transform(callback, [options])`
	---------------------

	Register the transformer callback. The callback is a user provided 
	function call on each line to filter, enrich or modify the 
	dataset. More information in the "transforming data" section.
	 */

	CSV.prototype.transform = function(callback, options) {
	  this.transformer.callback = callback;
	  if (options) {
	    utils.merge(this.transformer.options, options);
	  }
	  return this;
	};


	/*

	`error(error)`
	--------------

	Unified mechanism to handle error, emit the error and mark the 
	stream as non readable and non writable.
	 */

	CSV.prototype.error = function(e) {
	  this.readable = false;
	  this.writable = false;
	  this.emit('error', e);
	  if (this.readStream) {
	    this.readStream.destroy();
	  }
	  return this;
	};

	module.exports = function() {
	  return new CSV;
	};


	/*
	[event]: http://nodejs.org/api/events.html
	[stream]: http://nodejs.org/api/stream.html
	[writable_stream]: http://nodejs.org/api/stream.html#stream_writable_stream
	[readable_stream]: http://nodejs.org/api/stream.html#stream_readable_stream
	 */

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31).Buffer))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.7.0
	module.exports = function() {
	  return {
	    count: 0,
	    line: [],
	    countWriten: 0,
	    transforming: 0
	  };
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.7.0

	/*
	Input and output options
	========================

	The `options` property provide access to the `from` and `to` object used to store options. This
	property is for internal usage and could be considered private. It is recommanded to use
	the `from.options()` and `to.options()` to access those objects.
	 */
	module.exports = function() {
	  return {
	    from: {
	      rowDelimiter: null,
	      delimiter: ',',
	      quote: '"',
	      escape: '"',
	      columns: null,
	      comment: '',
	      flags: 'r',
	      encoding: 'utf8',
	      trim: false,
	      ltrim: false,
	      relax: false,
	      rtrim: false
	    },
	    to: {
	      delimiter: null,
	      quote: null,
	      quoted: false,
	      escape: null,
	      columns: null,
	      header: false,
	      lineBreaks: null,
	      flags: 'w',
	      encoding: 'utf8',
	      newColumns: false,
	      end: true,
	      eof: false
	    }
	  };
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.7.0
	var Stream, fs, nextTick, path, timers, utils;

	fs = __webpack_require__(34);

	path = __webpack_require__(32);

	if (fs.exists == null) {
	  fs.exists = path.exists;
	}

	utils = __webpack_require__(26);

	Stream = __webpack_require__(27);

	timers = __webpack_require__(29);

	nextTick = timers.setImmediate ? timers.setImmediate : process.nextTick;


	/*

	Reading data from a source
	==========================

	The `csv().from` property provides functions to read from an external 
	source and write to a CSV instance. The source may be a string, a file, 
	a buffer or a readable stream.   

	You may call the `from` function or one of its sub function. For example, 
	here are two identical ways to read from a file:

	    csv().from('/tmp/data.csv').on('data', console.log);
	    csv().from.path('/tmp/data.csv').on('data', console.log);
	 */

	module.exports = function(csv) {

	  /*
	  
	  `from(mixed)`
	  -------------
	  
	  Read from any sort of source. It should be considered as a convenient function which 
	  will discover the nature of the data source to parse.   
	  
	  If the parameter is a string, check if a file of that path exists. If so, read the file contents,
	  otherwise, treat the string as CSV data. If the parameter is an instance of `stream`, consider the
	  object to be an input stream. If it is an array, then treat each line as a record.   
	  
	  Here are some examples on how to use this function:
	  
	      csv()
	      .from('"1","2","3","4"\n"a","b","c","d"')
	      .on('end', function(){ console.log('done') })
	  
	      csv()
	      .from('./path/to/file.csv')
	      .on('end', function(){ console.log('done') })
	  
	      csv()
	      .from(fs.createReadStream('./path/to/file.csv'))
	      .on('end', function(){ console.log('done') })
	  
	      csv()
	      .from(['"1","2","3","4","5"',['1','2','3','4','5']])
	      .on('end', function(){ console.log('done') })
	   */
	  var from;
	  from = function(mixed, options) {
	    var error;
	    error = false;
	    switch (typeof mixed) {
	      case 'string':
	        fs.exists(mixed, function(exists) {
	          if (exists) {
	            return from.path(mixed, options);
	          } else {
	            return from.string(mixed, options);
	          }
	        });
	        break;
	      case 'object':
	        if (Array.isArray(mixed)) {
	          from.array(mixed, options);
	        } else {
	          if (mixed instanceof Stream) {
	            from.stream(mixed, options);
	          } else {
	            error = true;
	          }
	        }
	        break;
	      default:
	        error = true;
	    }
	    if (error) {
	      csv.error(new Error("Invalid mixed argument in from"));
	    }
	    return csv;
	  };

	  /*
	  
	  `from.options([options])`
	  -------------------------
	  
	  Update and retrieve options relative to the input source. Return 
	  the options as an object if no argument is provided.
	  
	  *   `delimiter`     Set the field delimiter. One character only, defaults to comma.
	  *   `rowDelimiter`  String used to delimit record rows or a special value; special values are 'auto', 'unix', 'mac', 'windows', 'unicode'; defaults to 'auto' (discovered in source or 'unix' if no source is specified).
	  *   `quote`         Optionnal character surrounding a field, one character only, defaults to double quotes.
	  *   `escape`        Set the escape character, one character only, defaults to double quotes.
	  *   `columns`       List of fields or true if autodiscovered in the first CSV line, default to null. Impact the `transform` argument and the `data` event by providing an object instead of an array, order matters, see the transform and the columns sections for more details.
	  *   `comment`       Treat all the characteres after this one as a comment, default to '#'
	  *   `flags`         Used to read a file stream, default to the r charactere.
	  *   `encoding`      Encoding of the read stream, defaults to 'utf8', applied when a readable stream is created.
	  *   `trim`          If true, ignore whitespace immediately around the delimiter, defaults to false.
	  *   `ltrim`         If true, ignore whitespace immediately following the delimiter (i.e. left-trim all fields), defaults to false.
	  *   `rtrim`         If true, ignore whitespace immediately preceding the delimiter (i.e. right-trim all fields), defaults to false.
	  
	  Additionnally, in case you are working with stream, you can pass all 
	  the options accepted by the `stream.pipe` function.
	   */
	  from.options = function(options) {
	    if (options != null) {
	      utils.merge(csv.options.from, options);
	      return csv;
	    } else {
	      return csv.options.from;
	    }
	  };

	  /*
	  
	  `from.array(data, [options])`
	  ------------------------------
	  
	  Read from an array. Take an array as first argument and optionally 
	  an object of options as a second argument. Each element of the array 
	  represents a CSV record. Those elements may be a string, a buffer, an
	  array or an object.
	   */
	  from.array = function(data, options) {
	    this.options(options);
	    nextTick(function() {
	      var record, _i, _len;
	      for (_i = 0, _len = data.length; _i < _len; _i++) {
	        record = data[_i];
	        csv.write(record);
	      }
	      return csv.end();
	    });
	    return csv;
	  };

	  /*
	  
	  `from.string(data, [options])`
	  -------------------------------
	  
	  Read from a string or a buffer. Take a string as first argument and 
	  optionally an object of options as a second argument. The string 
	  must be the complete csv data, look at the streaming alternative if your 
	  CSV is large.
	  
	      csv()
	      .from( '"1","2","3","4"\n"a","b","c","d"' )
	      .to( function(data){} )
	   */
	  from.string = function(data, options) {
	    this.options(options);
	    nextTick(function() {
	      csv.write(data);
	      return csv.end();
	    });
	    return csv;
	  };

	  /*
	  
	  `from.stream(stream, [options])`
	  --------------------------------
	  
	  Read from a stream. Take a readable stream as first argument and optionally 
	  an object of options as a second argument.
	  
	  Additionnal options may be defined. See the [`readable.pipe` 
	  documentation][srpdo] for additionnal information.
	  
	  [srpdo]: http://www.nodejs.org/api/stream.html#stream_readable_pipe_destination_options
	   */
	  from.stream = function(stream, options) {
	    if (options) {
	      this.options(options);
	    }
	    if (stream.setEncoding) {
	      stream.setEncoding(csv.from.options().encoding);
	    }
	    stream.pipe(csv, csv.from.options());
	    return csv;
	  };

	  /*
	  
	  `from.path(path, [options])`
	  ----------------------------
	  
	  Read from a file path. Take a file path as first argument and optionally an object 
	  of options as a second argument.
	  
	  Additionnal options may be defined with the following default:
	  
	      { flags: 'r',
	        encoding: null,
	        fd: null,
	        mode: 0666,
	        bufferSize: 64 * 1024,
	        autoClose: true }
	  
	  See the [`fs.createReadStream` documentation][fscpo] for additionnal information.
	  
	  [fscpo]: http://www.nodejs.org/api/fs.html#fs_fs_createreadstream_path_options
	   */
	  from.path = function(path, options) {
	    var stream;
	    this.options(options);
	    stream = fs.createReadStream(path, csv.from.options());
	    stream.on('error', function(err) {
	      return csv.error(err);
	    });
	    return csv.from.stream(stream);
	  };
	  return from;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.7.0
	var Stream, fs, utils;

	fs = __webpack_require__(34);

	Stream = __webpack_require__(27);

	utils = __webpack_require__(26);


	/*

	Writing data to a destination
	=============================

	The `csv().to` property provides functions to read from a CSV instance and
	to write to an external destination. The destination may be a stream, a file
	or a callback. 

	You may call the `to` function or one of its sub function. For example, 
	here are two identical ways to write to a file:

	    csv.from(data).to('/tmp/data.csv');
	    csv.from(data).to.path('/tmp/data.csv');
	 */

	module.exports = function(csv) {

	  /*
	  
	  `to(mixed)`
	  -----------
	  
	  Write from any sort of destination. It should be considered as a convenient function 
	  which will discover the nature of the destination where to write the CSV data.   
	  
	  If the parameter is a function, then the csv will be provided as the first argument 
	  of the callback. If it is a string, then it is expected to be a 
	  file path. If it is an instance of `stream`, it consider the object to be an  
	  output stream. 
	  
	  Here's some examples on how to use this function:
	  
	      csv()
	      .from('"1","2","3","4","5"')
	      .to(function(data){ console.log(data) })
	  
	      csv()
	      .from('"1","2","3","4","5"')
	      .to('./path/to/file.csv')
	  
	      csv()
	      .from('"1","2","3","4","5"')
	      .to(fs.createWriteStream('./path/to/file.csv'))
	   */
	  var to;
	  to = function(mixed, options) {
	    var error;
	    error = false;
	    switch (typeof mixed) {
	      case 'string':
	        to.path(mixed, options);
	        break;
	      case 'object':
	        if (mixed instanceof Stream) {
	          to.stream(mixed, options);
	        } else {
	          error = true;
	        }
	        break;
	      case 'function':
	        to.string(mixed, options);
	        break;
	      default:
	        error = true;
	    }
	    if (error) {
	      csv.error(new Error("Invalid mixed argument in from"));
	    }
	    return csv;
	  };

	  /*
	  
	  `to.options([options])`
	  -----------------------
	  
	  Update and retrieve options relative to the output. Return the options 
	  as an object if no argument is provided.
	  
	  *   `delimiter`   Set the field delimiter, one character only, defaults to `options.from.delimiter` which is a comma.
	  *   `quote`       Defaults to the quote read option.
	  *   `quoted`      Boolean, default to false, quote all the fields even if not required.
	  *   `escape`      Defaults to the escape read option.
	  *   `columns`     List of fields, applied when `transform` returns an object, order matters, read the transformer documentation for additionnal information.
	  *   `header`      Display the column names on the first line if the columns option is provided.
	  *   `lineBreaks`  String used to delimit record rows or a special value; special values are 'auto', 'unix', 'mac', 'windows', 'unicode'; defaults to 'auto' (discovered in source or 'unix' if no source is specified).
	  *   `flags`       Defaults to 'w', 'w' to create or overwrite an file, 'a' to append to a file. Applied when using the `toPath` method.
	  *   `newColumns`  If the `columns` option is not specified (which means columns will be taken from the reader options, will automatically append new columns if they are added during `transform()`.
	  *   `end`         Prevent calling `end` on the destination, so that destination is no longer writable.
	  *   `eof`         Add a linebreak on the last line, default to false, expect a charactere or use '\n' if value is set to "true"
	  
	  The end options is similar to passing `{end: false}` option in `stream.pipe()`. According to the Node.js documentation:
	  > By default end() is called on the destination when the source stream emits end, so that destination is no longer writable. Pass { end: false } as options to keep the destination stream open.
	   */
	  to.options = function(options) {
	    if (options != null) {
	      utils.merge(csv.options.to, options);
	      if (csv.options.to.lineBreaks) {
	        console.log('To options linebreaks is replaced by rowDelimiter');
	        if (!csv.options.to.rowDelimiter) {
	          csv.options.to.rowDelimiter = csv.options.to.lineBreaks;
	        }
	      }
	      switch (csv.options.to.rowDelimiter) {
	        case 'auto':
	          csv.options.to.rowDelimiter = null;
	          break;
	        case 'unix':
	          csv.options.to.rowDelimiter = "\n";
	          break;
	        case 'mac':
	          csv.options.to.rowDelimiter = "\r";
	          break;
	        case 'windows':
	          csv.options.to.rowDelimiter = "\r\n";
	          break;
	        case 'unicode':
	          csv.options.to.rowDelimiter = "\u2028";
	      }
	      return csv;
	    } else {
	      return csv.options.to;
	    }
	  };

	  /*
	  
	  `to.string(callback, [options])`
	  ------------------------------
	  
	  Provide the output string to a callback.
	  
	      csv()
	      .from( '"1","2","3"\n"a","b","c"' )
	      .to.string( function(data, count){} )
	  
	  Callback is called with 2 arguments:
	  *   data      Entire CSV as a string
	  *   count     Number of stringified records
	   */
	  to.string = function(callback, options) {
	    var data, stream;
	    this.options(options);
	    data = [];
	    stream = new Stream;
	    stream.writable = true;
	    stream.write = function(d) {
	      data.push(d);
	      return true;
	    };
	    stream.end = function() {
	      return callback(data.join(''), csv.state.countWriten);
	    };
	    csv.pipe(stream);
	    return csv;
	  };

	  /*
	  
	  `to.stream(stream, [options])`
	  ------------------------------
	  
	  Write to a stream. Take a writable stream as first argument and  
	  optionally an object of options as a second argument.
	  
	  Additionnal options may be defined. See the [`readable.pipe` 
	  documentation][srpdo] for additionnal information.
	  
	  [srpdo]: http://www.nodejs.org/api/stream.html#stream_readable_pipe_destination_options
	   */
	  to.stream = function(stream, options) {
	    this.options(options);
	    csv.pipe(stream, csv.options.to);
	    stream.on('error', function(e) {
	      return csv.error(e);
	    });
	    stream.on('close', function() {
	      return csv.emit('close', csv.state.count);
	    });
	    stream.on('finish', function() {
	      return csv.emit('finish', csv.state.count);
	    });
	    return csv;
	  };

	  /*
	  
	  `to.path(path, [options])`
	  --------------------------
	  
	  Write to a path. Take a file path as first argument and optionally an object of 
	  options as a second argument. The `close` event is sent after the file is written. 
	  Relying on the `end` event is incorrect because it is sent when parsing is done 
	  but before the file is written.
	  
	  Additionnal options may be defined with the following default:
	  
	      { flags: 'w',
	        encoding: null,
	        mode: 0666 }
	  
	  See the [`fs.createReadStream` documentation][fscpo] for additionnal information.
	  
	  [fscpo]: http://www.nodejs.org/api/fs.html#fs_fs_createwritestream_path_options
	  
	  Example to modify a file rather than replacing it:
	  
	      csv()
	      .to.file('my.csv', {flags:'r+'})
	      .write(['hello', 'node'])
	      .end()
	   */
	  to.path = function(path, options) {
	    var stream;
	    this.options(options);
	    options = utils.merge({}, csv.options.to);
	    delete options.end;
	    stream = fs.createWriteStream(path, options);
	    csv.to.stream(stream, null);
	    return csv;
	  };

	  /*
	  
	  `to.array(path, [options])`
	  --------------------------
	  
	  Provide the output string to a callback.
	  
	      csv()
	      .from( '"1","2","3"\n"a","b","c"' )
	      .to.array( function(data, count){} )
	  
	  Callback is called with 2 arguments:
	  *   data      Entire CSV as an array of records
	  *   count     Number of stringified records
	   */
	  to.array = function(callback, options) {
	    var records;
	    this.options(options);
	    records = [];
	    csv.on('record', function(record) {
	      var column, i, _i, _j, _len, _len1, _record, _ref, _ref1;
	      if (this.options.to.columns) {
	        if (Array.isArray(record)) {
	          _record = record;
	          record = {};
	          _ref = this.options.to.columns;
	          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
	            column = _ref[i];
	            record[column] = _record[i];
	          }
	        } else {
	          _record = record;
	          record = {};
	          _ref1 = this.options.to.columns;
	          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
	            column = _ref1[_j];
	            record[column] = _record[column];
	          }
	        }
	      }
	      return records.push(record);
	    });
	    csv.on('end', function() {
	      return callback(records, csv.state.countWriten);
	    });
	    return csv;
	  };
	  return to;
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.7.0

	/*

	Stringifier
	===========

	Convert an array or an object into a CSV line.
	 */
	var Stringifier,
	  __hasProp = {}.hasOwnProperty;

	Stringifier = function(csv) {
	  this.csv = csv;
	  return this;
	};


	/*

	`write(line, [preserve])`
	-------------------------

	Write a line to the written stream. Line may be an object, an array or a string
	The `preserve` argument is for the lines which are not considered as CSV data.
	 */

	Stringifier.prototype.write = function(line) {
	  var e, preserve;
	  if (line == null) {
	    return;
	  }
	  preserve = typeof line !== 'object';
	  if (!preserve) {
	    try {
	      this.csv.emit('record', line, this.csv.state.count - 1);
	    } catch (_error) {
	      e = _error;
	      return this.csv.error(e);
	    }
	    line = this.csv.stringifier.stringify(line);
	  }
	  if (typeof line === 'number') {
	    line = "" + line;
	  }
	  this.csv.emit('data', line);
	  if (!preserve) {
	    this.csv.state.countWriten++;
	  }
	  return true;
	};


	/*

	`Stringifier(line)`
	-------------------

	Convert a line to a string. Line may be an object, an array or a string.
	 */

	Stringifier.prototype.stringify = function(line) {
	  var column, columns, containsLinebreak, containsQuote, containsdelimiter, delimiter, e, escape, field, i, newLine, quote, regexp, _i, _j, _line, _ref, _ref1;
	  if (typeof line !== 'object') {
	    return line;
	  }
	  columns = this.csv.options.to.columns || this.csv.options.from.columns;
	  if (typeof columns === 'object' && columns !== null && !Array.isArray(columns)) {
	    columns = Object.keys(columns);
	  }
	  delimiter = this.csv.options.to.delimiter || this.csv.options.from.delimiter;
	  quote = this.csv.options.to.quote || this.csv.options.from.quote;
	  escape = this.csv.options.to.escape || this.csv.options.from.escape;
	  if (!Array.isArray(line)) {
	    _line = [];
	    if (columns) {
	      for (i = _i = 0, _ref = columns.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
	        column = columns[i];
	        _line[i] = typeof line[column] === 'undefined' || line[column] === null ? '' : line[column];
	      }
	    } else {
	      for (column in line) {
	        if (!__hasProp.call(line, column)) continue;
	        _line.push(line[column]);
	      }
	    }
	    line = _line;
	    _line = null;
	  } else if (columns) {
	    line.splice(columns.length);
	  }
	  if (Array.isArray(line)) {
	    newLine = this.csv.state.countWriten ? this.csv.options.to.rowDelimiter || "\n" : '';
	    for (i = _j = 0, _ref1 = line.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
	      field = line[i];
	      if (typeof field === 'string') {

	      } else if (typeof field === 'number') {
	        field = '' + field;
	      } else if (typeof field === 'boolean') {
	        field = field ? '1' : '';
	      } else if (field instanceof Date) {
	        field = '' + field.getTime();
	      } else if (field instanceof Number) {
	        field = '' + field.valueOf();
	      } else {
	        try {
	          field = field.toString();
	        } catch (_error) {
	          e = _error;
	        }
	      }
	      if (field) {
	        containsdelimiter = field.indexOf(delimiter) >= 0;
	        containsQuote = field.indexOf(quote) >= 0;
	        containsLinebreak = field.indexOf("\r") >= 0 || field.indexOf("\n") >= 0;
	        if (containsQuote) {
	          regexp = new RegExp(quote, 'g');
	          field = field.replace(regexp, escape + quote);
	        }
	        if (containsQuote || containsdelimiter || containsLinebreak || this.csv.options.to.quoted) {
	          field = quote + field + quote;
	        }
	        newLine += field;
	      }
	      if (i !== line.length - 1) {
	        newLine += delimiter;
	      }
	    }
	    line = newLine;
	  }
	  return line;
	};

	module.exports = function(csv) {
	  return new Stringifier(csv);
	};

	module.exports.Stringifier = Stringifier;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.7.0
	var EventEmitter, Parser;

	EventEmitter = __webpack_require__(33).EventEmitter;


	/*

	Parsing
	=======

	The library extend the [EventEmitter][event] and emit the following events:

	*   *row*   
	  Emitted by the parser on each line with the line content as an array of fields.
	*   *end*   
	  Emitted when no more data will be parsed.
	*   *error*   
	  Emitted when an error occured.
	 */

	Parser = function(csv) {
	  this.csv = csv;
	  this.options = csv.options.from;
	  this.lines = 0;
	  this.buf = '';
	  this.quoting = false;
	  this.commenting = false;
	  this.field = '';
	  this.lastC = '';
	  this.nextChar = null;
	  this.closingQuote = 0;
	  this.line = [];
	  return this;
	};

	Parser.prototype.__proto__ = EventEmitter.prototype;


	/*

	`write(chars)`
	--------------

	Parse a string which may hold multiple lines.
	Private state object is enriched on each character until 
	transform is called on a new line.
	 */

	Parser.prototype.write = function(chars, end) {
	  var areNextCharsRowDelimiters, char, delimLength, escapeIsQuote, i, isDelimiter, isEscape, isQuote, isRowDelimiter, l, ltrim, nextNextCharPas, nextNextCharPos, rowDelimiter, rtrim, _results;
	  ltrim = this.options.trim || this.options.ltrim;
	  rtrim = this.options.trim || this.options.rtrim;
	  chars = this.buf + chars;
	  l = chars.length;
	  delimLength = this.options.rowDelimiter ? this.options.rowDelimiter.length : 0;
	  i = 0;
	  if (this.lines === 0 && 0xFEFF === chars.charCodeAt(0)) {
	    i++;
	  }
	  while (i < l) {
	    if ((i + delimLength >= l && chars.substr(i, this.options.rowDelimiter.length) !== this.options.rowDelimiter) && !end) {
	      break;
	    }
	    if ((i + this.options.escape.length >= l && chars.substr(i, this.options.escape.length) === this.options.escape) && !end) {
	      break;
	    }
	    char = this.nextChar ? this.nextChar : chars.charAt(i);
	    this.lastC = char;
	    this.nextChar = chars.charAt(i + 1);
	    if (this.options.rowDelimiter == null) {
	      if ((this.field === '') && (char === '\n' || char === '\r')) {
	        rowDelimiter = char;
	        nextNextCharPos = i + 1;
	      } else if (this.nextChar === '\n' || this.nextChar === '\r') {
	        rowDelimiter = this.nextChar;
	        nextNextCharPas = i + 2;
	      }
	      if (rowDelimiter) {
	        this.options.rowDelimiter = rowDelimiter;
	        if (rowDelimiter === '\r' && chars.charAt(nextNextCharPas) === '\n') {
	          this.options.rowDelimiter += '\n';
	        }
	        delimLength = this.options.rowDelimiter.length;
	      }
	    }
	    if (char === this.options.escape) {
	      escapeIsQuote = this.options.escape === this.options.quote;
	      isEscape = this.nextChar === this.options.escape;
	      isQuote = this.nextChar === this.options.quote;
	      if (!(escapeIsQuote && !this.field && !this.quoting) && (isEscape || isQuote)) {
	        i++;
	        char = this.nextChar;
	        this.nextChar = chars.charAt(i + 1);
	        this.field += char;
	        i++;
	        continue;
	      }
	    }
	    if (char === this.options.quote) {
	      if (this.quoting) {
	        areNextCharsRowDelimiters = this.options.rowDelimiter && chars.substr(i + 1, this.options.rowDelimiter.length) === this.options.rowDelimiter;
	        if (!this.options.relax && this.nextChar && !areNextCharsRowDelimiters && this.nextChar !== this.options.delimiter && this.nextChar !== this.options.comment) {
	          return this.error(new Error("Invalid closing quote at line " + (this.lines + 1) + "; found " + (JSON.stringify(this.nextChar)) + " instead of delimiter " + (JSON.stringify(this.options.delimiter))));
	        }
	        this.quoting = false;
	        this.closingQuote = i;
	        i++;
	        continue;
	      } else if (!this.field) {
	        this.quoting = true;
	        i++;
	        continue;
	      }
	    }
	    isDelimiter = char === this.options.delimiter;
	    isRowDelimiter = this.options.rowDelimiter && chars.substr(i, this.options.rowDelimiter.length) === this.options.rowDelimiter;
	    if (!this.commenting && !this.quoting && char === this.options.comment) {
	      this.commenting = true;
	    } else if (this.commenting && isRowDelimiter) {
	      this.commenting = false;
	    }
	    if (!this.commenting && !this.quoting && (isDelimiter || isRowDelimiter)) {
	      if (isRowDelimiter && this.line.length === 0 && this.field === '') {
	        i += this.options.rowDelimiter.length;
	        this.nextChar = chars.charAt(i);
	        continue;
	      }
	      if (rtrim) {
	        if (this.closingQuote) {
	          this.field = this.field.substr(0, this.closingQuote);
	        } else {
	          this.field = this.field.trimRight();
	        }
	      }
	      this.line.push(this.field);
	      this.closingQuote = 0;
	      this.field = '';
	      if (isRowDelimiter) {
	        this.emit('row', this.line);
	        this.line = [];
	        i += this.options.rowDelimiter.length;
	        this.nextChar = chars.charAt(i);
	        continue;
	      }
	    } else if (!this.commenting && !this.quoting && (char === ' ' || char === '\t')) {
	      if (!(ltrim && !this.field)) {
	        this.field += char;
	      }
	    } else if (!this.commenting) {
	      this.field += char;
	    }
	    i++;
	  }
	  this.buf = '';
	  _results = [];
	  while (i < l) {
	    this.buf += chars.charAt(i);
	    _results.push(i++);
	  }
	  return _results;
	};

	Parser.prototype.end = function() {
	  this.write('', true);
	  if (this.quoting) {
	    return this.error(new Error("Quoted field not terminated at line " + (this.lines + 1)));
	  }
	  if (this.field || this.lastC === this.options.delimiter || this.lastC === this.options.quote) {
	    if (this.options.trim || this.options.rtrim) {
	      this.field = this.field.trimRight();
	    }
	    this.line.push(this.field);
	    this.field = '';
	  }
	  if (this.line.length > 0) {
	    this.emit('row', this.line);
	  }
	  return this.emit('end', null);
	};

	Parser.prototype.error = function(e) {
	  return this.emit('error', e);
	};

	module.exports = function(csv) {
	  return new Parser(csv);
	};

	module.exports.Parser = Parser;


	/*
	[event]: http://nodejs.org/api/events.html
	 */


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.7.0
	var Transformer, nextTick, stream, timers;

	stream = __webpack_require__(27);

	timers = __webpack_require__(29);

	nextTick = timers.setImmediate ? timers.setImmediate : process.nextTick;


	/*
	Transforming data
	=================

	Transformations may occur synchronously or asynchronously depending
	on the provided transform callback and its declared arguments length.

	Callbacks are called for each line, with these arguments:    

	*   *row*   
	  CSV record
	*   *index*   
	  Incremented counter
	*   *callback*   
	  Callback function to be called in asynchronous mode

	If you specify the `columns` read option, the `row` argument will be 
	provided as an object with keys matching columns names. Otherwise it
	will be provided as an array.

	In synchronous mode, the contract is quite simple, you will receive an array 
	of fields for each record and the transformed array should be returned.

	In asynchronous mode, it is your responsibility to call the callback 
	provided as the third argument. It must be called with two arguments,
	an error (if any), and the transformed record.

	Transformed records may be an array, an associative array, a 
	string or `null`. If `null`, the record will simply be skipped. When the
	returned value is an array, the fields are merged in order. 
	When the returned value is an object, the module will search for
	the `columns` property in the write or in the read options and 
	intelligently order the values. If no `columns` options are found, 
	it will merge the values in their order of appearance. When the 
	returned value is a string, it is directly sent to the destination 
	and it is your responsibility to delimit, quote, escape 
	or define line breaks.

	Transform callback run synchronously:

	    csv()
	    .from('82,Preisner,Zbigniew\n94,Gainsbourg,Serge')
	    .to(console.log)
	    .transform(function(row, index){
	        return row.reverse()
	    });
	    // Executing `node samples/transform.js`, print:
	    // Zbigniew,Preisner,82\nSerge,Gainsbourg,94

	Transform callback run asynchronously:

	    csv()
	    .from('82,Preisner,Zbigniew\n94,Gainsbourg,Serge')
	    .to(console.log)
	    .transform(function(row, index, callback){
	        process.nextTick(function(){
	            callback(null, row.reverse());
	        });
	    });
	    // Executing `node samples/transform.js`, print:
	    // Zbigniew,Preisner,82\nSerge,Gainsbourg,94

	Transform callback returning a string:

	    csv()
	    .from('82,Preisner,Zbigniew\n94,Gainsbourg,Serge')
	    .to(console.log)
	    .transform(function(row, index){
	        return (index>0 ? ',' : '') + row[0] + ":" + row[2] + ' ' + row[1];
	    });
	    // Executing `node samples/transform.js`, print:
	    // 82:Zbigniew Preisner,94:Serge Gainsbourg
	 */

	Transformer = function(csv) {
	  this.csv = csv;
	  this.running = 0;
	  this.options = {
	    parallel: 100
	  };
	  this.todo = [];
	  return this;
	};

	Transformer.prototype.__proto__ = stream.prototype;


	/* no doc

	`headers()`
	----------------------------

	Print headers.
	 */

	Transformer.prototype.headers = function() {
	  var k, label, labels;
	  labels = this.csv.options.to.columns || this.csv.options.from.columns;
	  if (typeof labels === 'object') {
	    labels = (function() {
	      var _results;
	      _results = [];
	      for (k in labels) {
	        label = labels[k];
	        _results.push(label);
	      }
	      return _results;
	    })();
	  }
	  return this.csv.stringifier.write(labels);
	};


	/* no doc

	`write(line)`
	----------------------------------

	Call a callback to transform a line. Called for each line after being parsed. 
	It is responsible for transforming the data and finally calling `write`.
	 */

	Transformer.prototype.write = function(line) {
	  var column, columns, csv, done, finish, i, lineAsObject, run, self, sync, _i, _j, _len, _len1;
	  self = this;
	  csv = this.csv;
	  if (this.columns == null) {
	    columns = csv.options.from.columns;
	    if (typeof columns === 'object' && columns !== null && !Array.isArray(columns)) {
	      columns = Object.keys(columns);
	    }
	    if (csv.state.count === 0 && columns === true) {
	      columns = csv.options.from.columns = line;
	      return;
	    }
	    this.columns = columns != null ? columns : false;
	  } else {
	    columns = this.columns;
	  }
	  if (columns) {
	    if (Array.isArray(line)) {
	      lineAsObject = {};
	      for (i = _i = 0, _len = columns.length; _i < _len; i = ++_i) {
	        column = columns[i];
	        lineAsObject[column] = line[i] != null ? line[i] : null;
	      }
	      line = lineAsObject;
	    } else {
	      lineAsObject = {};
	      for (i = _j = 0, _len1 = columns.length; _j < _len1; i = ++_j) {
	        column = columns[i];
	        lineAsObject[column] = line[column] != null ? line[column] : null;
	      }
	      line = lineAsObject;
	    }
	  }
	  finish = function(line) {
	    if (csv.options.to.header === true && (csv.state.count - csv.state.transforming) === 1) {
	      self.headers();
	    }
	    csv.stringifier.write(line);
	    line = self.todo.shift();
	    if (line) {
	      return run(line);
	    }
	    if (csv.state.transforming === 0 && self.closed === true) {
	      return self.emit('end', csv.state.count);
	    }
	  };
	  csv.state.count++;
	  if (!this.callback) {
	    return finish(line);
	  }
	  sync = this.callback.length !== 3;
	  csv.state.transforming++;
	  self = this;
	  done = function(err, line) {
	    var isObject;
	    self.running--;
	    if (err) {
	      return csv.error(err);
	    }
	    isObject = typeof line === 'object' && !Array.isArray(line);
	    if (isObject && csv.options.to.newColumns && !csv.options.to.columns) {
	      Object.keys(line).filter(function(column) {
	        return self.columns.indexOf(column) === -1;
	      }).forEach(function(column) {
	        return self.columns.push(column);
	      });
	    }
	    csv.state.transforming--;
	    return finish(line);
	  };
	  run = function(line) {
	    var err;
	    self.running++;
	    try {
	      if (sync) {
	        return done(null, self.callback(line, csv.state.count - self.todo.length - 1));
	      } else {
	        return self.callback(line, csv.state.count - self.todo.length - 1, done);
	      }
	    } catch (_error) {
	      err = _error;
	      return done(err);
	    }
	  };
	  if (this.running === this.options.parallel) {
	    this.todo.push(line);
	    return false;
	  }
	  run(line);
	  return true;
	};


	/* no doc
	`end()`
	------------------------

	A transformer instance extends the EventEmitter and 
	emit the 'end' event when the last callback is called.
	 */

	Transformer.prototype.end = function() {
	  if (this.closed) {
	    return this.csv.error(new Error('Transformer already closed'));
	  }
	  this.closed = true;
	  if (this.csv.state.transforming === 0) {
	    return this.emit('end');
	  }
	};

	module.exports = function(csv) {
	  return new Transformer(csv);
	};

	module.exports.Transformer = Transformer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.7.0
	module.exports = {
	  merge: function(obj1, obj2) {
	    var key, r;
	    r = obj1 || {};
	    for (key in obj2) {
	      r[key] = obj2[key];
	    }
	    return r;
	  }
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Stream;

	var EE = __webpack_require__(33).EventEmitter;
	var inherits = __webpack_require__(43);

	inherits(Stream, EE);
	Stream.Readable = __webpack_require__(38);
	Stream.Writable = __webpack_require__(39);
	Stream.Duplex = __webpack_require__(40);
	Stream.Transform = __webpack_require__(41);
	Stream.PassThrough = __webpack_require__(42);

	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;



	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.

	function Stream() {
	  EE.call(this);
	}

	Stream.prototype.pipe = function(dest, options) {
	  var source = this;

	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }

	  source.on('data', ondata);

	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }

	  dest.on('drain', ondrain);

	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }

	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    dest.end();
	  }


	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    if (typeof dest.destroy === 'function') dest.destroy();
	  }

	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EE.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }

	  source.on('error', onerror);
	  dest.on('error', onerror);

	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);

	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);

	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);

	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);

	    dest.removeListener('close', cleanup);
	  }

	  source.on('end', cleanup);
	  source.on('close', cleanup);

	  dest.on('close', cleanup);

	  dest.emit('pipe', source);

	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(35);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(44);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(30)))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(30).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29).setImmediate, __webpack_require__(29).clearImmediate))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    draining = true;
	    var currentQueue;
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        var i = -1;
	        while (++i < len) {
	            currentQueue[i]();
	        }
	        len = queue.length;
	    }
	    draining = false;
	}
	process.nextTick = function (fun) {
	    queue.push(fun);
	    if (!draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	var base64 = __webpack_require__(45)
	var ieee754 = __webpack_require__(36)
	var isArray = __webpack_require__(37)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var kMaxLength = 0x3fffffff
	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Note:
	 *
	 * - Implementation must support adding new properties to `Uint8Array` instances.
	 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
	 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *    incorrect length in some situations.
	 *
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
	 * get the Object implementation, which is slower but will work correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = (function () {
	  try {
	    var buf = new ArrayBuffer(0)
	    var arr = new Uint8Array(buf)
	    arr.foo = function () { return 42 }
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	})()

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (subject, encoding) {
	  var self = this
	  if (!(self instanceof Buffer)) return new Buffer(subject, encoding)

	  var type = typeof subject
	  var length

	  if (type === 'number') {
	    length = +subject
	  } else if (type === 'string') {
	    length = Buffer.byteLength(subject, encoding)
	  } else if (type === 'object' && subject !== null) {
	    // assume object is array-like
	    if (subject.type === 'Buffer' && isArray(subject.data)) subject = subject.data
	    length = +subject.length
	  } else {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (length > kMaxLength) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum size: 0x' +
	      kMaxLength.toString(16) + ' bytes')
	  }

	  if (length < 0) length = 0
	  else length >>>= 0 // coerce to uint32

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Preferred: Return an augmented `Uint8Array` instance for best performance
	    self = Buffer._augment(new Uint8Array(length)) // eslint-disable-line consistent-this
	  } else {
	    // Fallback: Return THIS instance of Buffer (created by `new`)
	    self.length = length
	    self._isBuffer = true
	  }

	  var i
	  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
	    // Speed optimization -- use set if we're copying from a typed array
	    self._set(subject)
	  } else if (isArrayish(subject)) {
	    // Treat array-ish objects as a byte array
	    if (Buffer.isBuffer(subject)) {
	      for (i = 0; i < length; i++) {
	        self[i] = subject.readUInt8(i)
	      }
	    } else {
	      for (i = 0; i < length; i++) {
	        self[i] = ((subject[i] % 256) + 256) % 256
	      }
	    }
	  } else if (type === 'string') {
	    self.write(subject, 0, encoding)
	  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT) {
	    for (i = 0; i < length; i++) {
	      self[i] = 0
	    }
	  }

	  if (length > 0 && length <= Buffer.poolSize) self.parent = rootParent

	  return self
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length
	  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, totalLength) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  } else if (list.length === 1) {
	    return list[0]
	  }

	  var i
	  if (totalLength === undefined) {
	    totalLength = 0
	    for (i = 0; i < list.length; i++) {
	      totalLength += list[i].length
	    }
	  }

	  var buf = new Buffer(totalLength)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	Buffer.byteLength = function byteLength (str, encoding) {
	  var ret
	  str = str + ''
	  switch (encoding || 'utf8') {
	    case 'ascii':
	    case 'binary':
	    case 'raw':
	      ret = str.length
	      break
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      ret = str.length * 2
	      break
	    case 'hex':
	      ret = str.length >>> 1
	      break
	    case 'utf8':
	    case 'utf-8':
	      ret = utf8ToBytes(str).length
	      break
	    case 'base64':
	      ret = base64ToBytes(str).length
	      break
	    default:
	      ret = str.length
	  }
	  return ret
	}

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined

	// toString(encoding, start=0, end=buffer.length)
	Buffer.prototype.toString = function toString (encoding, start, end) {
	  var loweredCase = false

	  start = start >>> 0
	  end = end === undefined || end === Infinity ? this.length : end >>> 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` will be removed in Node 0.13+
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` will be removed in Node 0.13+
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  var charsWritten = blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	  return charsWritten
	}

	function asciiWrite (buf, string, offset, length) {
	  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
	  return charsWritten
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
	  return charsWritten
	}

	function utf16leWrite (buf, string, offset, length) {
	  var charsWritten = blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	  return charsWritten
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Support both (string, offset, length, encoding)
	  // and the legacy (string, encoding, offset, length)
	  if (isFinite(offset)) {
	    if (!isFinite(length)) {
	      encoding = length
	      length = undefined
	    }
	  } else {  // legacy
	    var swap = encoding
	    encoding = offset
	    offset = length
	    length = swap
	  }

	  offset = Number(offset) || 0

	  if (length < 0 || offset < 0 || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  var remaining = this.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	  encoding = String(encoding || 'utf8').toLowerCase()

	  var ret
	  switch (encoding) {
	    case 'hex':
	      ret = hexWrite(this, string, offset, length)
	      break
	    case 'utf8':
	    case 'utf-8':
	      ret = utf8Write(this, string, offset, length)
	      break
	    case 'ascii':
	      ret = asciiWrite(this, string, offset, length)
	      break
	    case 'binary':
	      ret = binaryWrite(this, string, offset, length)
	      break
	    case 'base64':
	      ret = base64Write(this, string, offset, length)
	      break
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      ret = utf16leWrite(this, string, offset, length)
	      break
	    default:
	      throw new TypeError('Unknown encoding: ' + encoding)
	  }
	  return ret
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  var res = ''
	  var tmp = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    if (buf[i] <= 0x7F) {
	      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
	      tmp = ''
	    } else {
	      tmp += '%' + buf[i].toString(16)
	    }
	  }

	  return res + decodeUtf8Char(tmp)
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset >>> 0
	  byteLength = byteLength >>> 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset >>> 0
	  byteLength = byteLength >>> 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset >>> 0
	  byteLength = byteLength >>> 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset >>> 0
	  byteLength = byteLength >>> 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  byteLength = byteLength >>> 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) >>> 0 & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  byteLength = byteLength >>> 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) >>> 0 & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = value
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = value
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) {
	    checkInt(
	      this, value, offset, byteLength,
	      Math.pow(2, 8 * byteLength - 1) - 1,
	      -Math.pow(2, 8 * byteLength - 1)
	    )
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) {
	    checkInt(
	      this, value, offset, byteLength,
	      Math.pow(2, 8 * byteLength - 1) - 1,
	      -Math.pow(2, 8 * byteLength - 1)
	    )
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = value
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, target_start, start, end) {
	  var self = this // source

	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (target_start >= target.length) target_start = target.length
	  if (!target_start) target_start = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || self.length === 0) return 0

	  // Fatal error conditions
	  if (target_start < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= self.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - target_start < end - start) {
	    end = target.length - target_start + start
	  }

	  var len = end - start

	  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < len; i++) {
	      target[i + target_start] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), target_start)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array get/set methods before overwriting
	  arr._get = arr.get
	  arr._set = arr.set

	  // deprecated, will be removed in node 0.13+
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-z\-]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function isArrayish (subject) {
	  return isArray(subject) || Buffer.isBuffer(subject) ||
	      subject && typeof subject === 'object' &&
	      typeof subject.length === 'number'
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	  var i = 0

	  for (; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (leadSurrogate) {
	        // 2 leads in a row
	        if (codePoint < 0xDC00) {
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          leadSurrogate = codePoint
	          continue
	        } else {
	          // valid surrogate pair
	          codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
	          leadSurrogate = null
	        }
	      } else {
	        // no lead yet

	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else {
	          // valid lead
	          leadSurrogate = codePoint
	          continue
	        }
	      }
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	      leadSurrogate = null
	    }

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x200000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function decodeUtf8Char (str) {
	  try {
	    return decodeURIComponent(str)
	  } catch (err) {
	    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31).Buffer))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	exports.read = function(buffer, offset, isLE, mLen, nBytes) {
	  var e, m,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      nBits = -7,
	      i = isLE ? (nBytes - 1) : 0,
	      d = isLE ? -1 : 1,
	      s = buffer[offset + i];

	  i += d;

	  e = s & ((1 << (-nBits)) - 1);
	  s >>= (-nBits);
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

	  m = e & ((1 << (-nBits)) - 1);
	  e >>= (-nBits);
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity);
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
	};

	exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
	      i = isLE ? 0 : (nBytes - 1),
	      d = isLE ? 1 : -1,
	      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

	  value = Math.abs(value);

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

	  e = (e << mLen) | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

	  buffer[offset + i - d] |= s * 128;
	};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * isArray
	 */

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(46);
	exports.Stream = __webpack_require__(27);
	exports.Readable = exports;
	exports.Writable = __webpack_require__(47);
	exports.Duplex = __webpack_require__(48);
	exports.Transform = __webpack_require__(49);
	exports.PassThrough = __webpack_require__(50);


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(47)


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(48)


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(49)


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(50)


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}(false ? (this.base64js = {}) : exports))


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Readable;

	/*<replacement>*/
	var isArray = __webpack_require__(52);
	/*</replacement>*/


	/*<replacement>*/
	var Buffer = __webpack_require__(31).Buffer;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	var EE = __webpack_require__(33).EventEmitter;

	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	var Stream = __webpack_require__(27);

	/*<replacement>*/
	var util = __webpack_require__(54);
	util.inherits = __webpack_require__(55);
	/*</replacement>*/

	var StringDecoder;


	/*<replacement>*/
	var debug = __webpack_require__(51);
	if (debug && debug.debuglog) {
	  debug = debug.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/


	util.inherits(Readable, Stream);

	function ReadableState(options, stream) {
	  var Duplex = __webpack_require__(48);

	  options = options || {};

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;


	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder)
	      StringDecoder = __webpack_require__(53).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  var Duplex = __webpack_require__(48);

	  if (!(this instanceof Readable))
	    return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  Stream.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function(chunk, encoding) {
	  var state = this._readableState;

	  if (util.isString(chunk) && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function(chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (util.isNullOrUndefined(chunk)) {
	    state.reading = false;
	    if (!state.ended)
	      onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding)
	        chunk = state.decoder.write(chunk);

	      if (!addToFront)
	        state.reading = false;

	      // if we want the data now, just emit it.
	      if (state.flowing && state.length === 0 && !state.sync) {
	        stream.emit('data', chunk);
	        stream.read(0);
	      } else {
	        // update the buffer info.
	        state.length += state.objectMode ? 1 : chunk.length;
	        if (addToFront)
	          state.buffer.unshift(chunk);
	        else
	          state.buffer.push(chunk);

	        if (state.needReadable)
	          emitReadable(stream);
	      }

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}



	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended &&
	         (state.needReadable ||
	          state.length < state.highWaterMark ||
	          state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function(enc) {
	  if (!StringDecoder)
	    StringDecoder = __webpack_require__(53).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};

	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}

	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended)
	    return 0;

	  if (state.objectMode)
	    return n === 0 ? 0 : 1;

	  if (isNaN(n) || util.isNull(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length)
	      return state.buffer[0].length;
	    else
	      return state.length;
	  }

	  if (n <= 0)
	    return 0;

	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark)
	    state.highWaterMark = roundUpToNextPowerOf2(n);

	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else
	      return state.length;
	  }

	  return n;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function(n) {
	  debug('read', n);
	  var state = this._readableState;
	  var nOrig = n;

	  if (!util.isNumber(n) || n > 0)
	    state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 &&
	      state.needReadable &&
	      (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended)
	      endReadable(this);
	    else
	      emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0)
	      endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  }

	  if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0)
	      state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }

	  // If _read pushed data synchronously, then `reading` will be false,
	  // and we need to re-evaluate how much data we can return to the user.
	  if (doRead && !state.reading)
	    n = howMuchToRead(nOrig, state);

	  var ret;
	  if (n > 0)
	    ret = fromList(n, state);
	  else
	    ret = null;

	  if (util.isNull(ret)) {
	    state.needReadable = true;
	    n = 0;
	  }

	  state.length -= n;

	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended)
	    state.needReadable = true;

	  // If we tried to read() past the EOF, then emit end on the next tick.
	  if (nOrig !== n && state.ended && state.length === 0)
	    endReadable(this);

	  if (!util.isNull(ret))
	    this.emit('data', ret);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}


	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync)
	      process.nextTick(function() {
	        emitReadable_(stream);
	      });
	    else
	      emitReadable_(stream);
	  }
	}

	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}


	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function() {
	      maybeReadMore_(stream, state);
	    });
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended &&
	         state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	    else
	      len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function(n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function(dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
	              dest !== process.stdout &&
	              dest !== process.stderr;

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted)
	    process.nextTick(endFn);
	  else
	    src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain &&
	        (!dest._writableState || dest._writableState.needDrain))
	      ondrain();
	  }

	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    if (false === ret) {
	      debug('false write response, pause',
	            src._readableState.awaitDrain);
	      src._readableState.awaitDrain++;
	      src.pause();
	    }
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0)
	      dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error)
	    dest.on('error', onerror);
	  else if (isArray(dest._events.error))
	    dest._events.error.unshift(onerror);
	  else
	    dest._events.error = [onerror, dest._events.error];



	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function() {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain)
	      state.awaitDrain--;
	    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}


	Readable.prototype.unpipe = function(dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0)
	    return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes)
	      return this;

	    if (!dest)
	      dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest)
	      dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var i = 0; i < len; i++)
	      dests[i].emit('unpipe', this);
	    return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1)
	    return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1)
	    state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function(ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  // If listening to data, and it has not explicitly been paused,
	  // then call resume to start the flow of data on the next tick.
	  if (ev === 'data' && false !== this._readableState.flowing) {
	    this.resume();
	  }

	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        var self = this;
	        process.nextTick(function() {
	          debug('readable nexttick read 0');
	          self.read(0);
	        });
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function() {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    if (!state.reading) {
	      debug('resume read 0');
	      this.read(0);
	    }
	    resume(this, state);
	  }
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    process.nextTick(function() {
	      resume_(stream, state);
	    });
	  }
	}

	function resume_(stream, state) {
	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading)
	    stream.read(0);
	}

	Readable.prototype.pause = function() {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  if (state.flowing) {
	    do {
	      var chunk = stream.read();
	    } while (null !== chunk && state.flowing);
	  }
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function(stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function() {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length)
	        self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function(chunk) {
	    debug('wrapped data');
	    if (state.decoder)
	      chunk = state.decoder.write(chunk);
	    if (!chunk || !state.objectMode && !chunk.length)
	      return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
	      this[i] = function(method) { return function() {
	        return stream[method].apply(stream, arguments);
	      }}(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function(ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function(n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};



	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;

	  // nothing in the list, definitely empty.
	  if (list.length === 0)
	    return null;

	  if (length === 0)
	    ret = null;
	  else if (objectMode)
	    ret = list.shift();
	  else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode)
	      ret = list.join('');
	    else
	      ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode)
	        ret = '';
	      else
	        ret = new Buffer(n);

	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);

	        if (stringMode)
	          ret += buf.slice(0, cpy);
	        else
	          buf.copy(ret, c, 0, cpy);

	        if (cpy < buf.length)
	          list[0] = buf.slice(cpy);
	        else
	          list.shift();

	        c += cpy;
	      }
	    }
	  }

	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0)
	    throw new Error('endReadable called on non-empty stream');

	  if (!state.endEmitted) {
	    state.ended = true;
	    process.nextTick(function() {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf (xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.

	module.exports = Writable;

	/*<replacement>*/
	var Buffer = __webpack_require__(31).Buffer;
	/*</replacement>*/

	Writable.WritableState = WritableState;


	/*<replacement>*/
	var util = __webpack_require__(54);
	util.inherits = __webpack_require__(55);
	/*</replacement>*/

	var Stream = __webpack_require__(27);

	util.inherits(Writable, Stream);

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}

	function WritableState(options, stream) {
	  var Duplex = __webpack_require__(48);

	  options = options || {};

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function(er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.buffer = [];

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}

	function Writable(options) {
	  var Duplex = __webpack_require__(48);

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex))
	    return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function() {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};


	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function() {
	    cb(er);
	  });
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function() {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function(chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  else if (!encoding)
	    encoding = state.defaultEncoding;

	  if (!util.isFunction(cb))
	    cb = function() {};

	  if (state.ended)
	    writeAfterEnd(this, state, cb);
	  else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }

	  return ret;
	};

	Writable.prototype.cork = function() {
	  var state = this._writableState;

	  state.corked++;
	};

	Writable.prototype.uncork = function() {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;

	    if (!state.writing &&
	        !state.corked &&
	        !state.finished &&
	        !state.bufferProcessing &&
	        state.buffer.length)
	      clearBuffer(this, state);
	  }
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode &&
	      state.decodeStrings !== false &&
	      util.isString(chunk)) {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret)
	    state.needDrain = true;

	  if (state.writing || state.corked)
	    state.buffer.push(new WriteReq(chunk, encoding, cb));
	  else
	    doWrite(stream, state, false, len, chunk, encoding, cb);

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev)
	    stream._writev(chunk, state.onwrite);
	  else
	    stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  if (sync)
	    process.nextTick(function() {
	      state.pendingcb--;
	      cb(er);
	    });
	  else {
	    state.pendingcb--;
	    cb(er);
	  }

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er)
	    onwriteError(stream, state, sync, er, cb);
	  else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);

	    if (!finished &&
	        !state.corked &&
	        !state.bufferProcessing &&
	        state.buffer.length) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      process.nextTick(function() {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished)
	    onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}


	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;

	  if (stream._writev && state.buffer.length > 1) {
	    // Fast case, write everything using _writev()
	    var cbs = [];
	    for (var c = 0; c < state.buffer.length; c++)
	      cbs.push(state.buffer[c].callback);

	    // count the one we are adding, as well.
	    // TODO(isaacs) clean this up
	    state.pendingcb++;
	    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
	      for (var i = 0; i < cbs.length; i++) {
	        state.pendingcb--;
	        cbs[i](err);
	      }
	    });

	    // Clear buffer
	    state.buffer = [];
	  } else {
	    // Slow case, write chunks one-by-one
	    for (var c = 0; c < state.buffer.length; c++) {
	      var entry = state.buffer[c];
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;

	      doWrite(stream, state, false, len, chunk, encoding, cb);

	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        c++;
	        break;
	      }
	    }

	    if (c < state.buffer.length)
	      state.buffer = state.buffer.slice(c);
	    else
	      state.buffer.length = 0;
	  }

	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function(chunk, encoding, cb) {
	  cb(new Error('not implemented'));

	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function(chunk, encoding, cb) {
	  var state = this._writableState;

	  if (util.isFunction(chunk)) {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (!util.isNullOrUndefined(chunk))
	    this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished)
	    endWritable(this, state, cb);
	};


	function needFinish(stream, state) {
	  return (state.ending &&
	          state.length === 0 &&
	          !state.finished &&
	          !state.writing);
	}

	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else
	      prefinish(stream, state);
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished)
	      process.nextTick(cb);
	    else
	      stream.once('finish', cb);
	  }
	  state.ended = true;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	module.exports = Duplex;

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	/*</replacement>*/


	/*<replacement>*/
	var util = __webpack_require__(54);
	util.inherits = __webpack_require__(55);
	/*</replacement>*/

	var Readable = __webpack_require__(46);
	var Writable = __webpack_require__(47);

	util.inherits(Duplex, Readable);

	forEach(objectKeys(Writable.prototype), function(method) {
	  if (!Duplex.prototype[method])
	    Duplex.prototype[method] = Writable.prototype[method];
	});

	function Duplex(options) {
	  if (!(this instanceof Duplex))
	    return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false)
	    this.readable = false;

	  if (options && options.writable === false)
	    this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false)
	    this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended)
	    return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.


	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	module.exports = Transform;

	var Duplex = __webpack_require__(48);

	/*<replacement>*/
	var util = __webpack_require__(54);
	util.inherits = __webpack_require__(55);
	/*</replacement>*/

	util.inherits(Transform, Duplex);


	function TransformState(options, stream) {
	  this.afterTransform = function(er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb)
	    return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (!util.isNullOrUndefined(data))
	    stream.push(data);

	  if (cb)
	    cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}


	function Transform(options) {
	  if (!(this instanceof Transform))
	    return new Transform(options);

	  Duplex.call(this, options);

	  this._transformState = new TransformState(options, this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  this.once('prefinish', function() {
	    if (util.isFunction(this._flush))
	      this._flush(function(er) {
	        done(stream, er);
	      });
	    else
	      done(stream);
	  });
	}

	Transform.prototype.push = function(chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function(chunk, encoding, cb) {
	  throw new Error('not implemented');
	};

	Transform.prototype._write = function(chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform ||
	        rs.needReadable ||
	        rs.length < rs.highWaterMark)
	      this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function(n) {
	  var ts = this._transformState;

	  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};


	function done(stream, er) {
	  if (er)
	    return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;

	  if (ws.length)
	    throw new Error('calling transform done when ws.length != 0');

	  if (ts.transforming)
	    throw new Error('calling transform done when still transforming');

	  return stream.push(null);
	}


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.

	module.exports = PassThrough;

	var Transform = __webpack_require__(49);

	/*<replacement>*/
	var util = __webpack_require__(54);
	util.inherits = __webpack_require__(55);
	/*</replacement>*/

	util.inherits(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough))
	    return new PassThrough(options);

	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function(chunk, encoding, cb) {
	  cb(null, chunk);
	};


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* (ignored) */

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var Buffer = __webpack_require__(31).Buffer;

	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     }


	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};


	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }

	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};

	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}

	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	function isBuffer(arg) {
	  return Buffer.isBuffer(arg);
	}
	exports.isBuffer = isBuffer;

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31).Buffer))

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ }
/******/ ]);