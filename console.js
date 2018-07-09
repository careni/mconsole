;(function (win, doc, screen) {
  let cssText = `@charset \"utf-8\";.console-float-layer{position:fixed;bottom:0;right:0;width:100%;height:20%;overflow-y:scroll;background:rgba(0, 0, 0, 0.6);color: #fff;}.console-float-layer-normal{display:inline-block;width:50%;font-size: 15px;margin:0;padding:0;border-bottom: 1px solid rgba(255, 255, 255, 0.5);}.console-float-layer-normal:nth-child(even){text-align: right;}`
  let el = document.createElement('style')
  if (el.styleSheet) {
    if (!el.styleSheet.disabled) {
      el.styleSheet.cssText = cssText
    }
  } else {
    try {
      el.innerHTML = cssText
    } catch (e) {
      el.innerHTML = cssText
    }
  }
  document.querySelector('head').appendChild(el)
}(window, document, screen));

;(function (win, doc, screen) {
  let el = doc.querySelector('.console-float-layer')
  if (el === null) {
    let newEl = doc.createElement('div')
    newEl.className = 'console-float-layer'
    doc.body.appendChild(newEl)
    el = newEl
  }

  let timeStart = 0
  let timeEnd = 0
  document.body.addEventListener('touchstart', function () {
    e.preventDefault()
    timeStart = new Date().getTime()
  })
  document.body.addEventListener('touchend', function () {
    timeEnd = new Date().getTime()
    if (timeEnd - timeStart > 2000) {
      alert('yes')
    }
  }, {passive: true})
  win.mconsole = {
    REG: {
      FILEPATH: /file(.*?):\d*:\d*/gm,
      NAMEANDLINE: /\w+\.(.*)(:(\d+)){2}/
    },
    create (line, type='log', ...args) {
      let msg = ''
      for (let i = 0; i < args.length; i++) {
        msg +=  args[i] + ' '
      }
      console.log(msg)
      let cname = 'console-float-layer-normal'
      switch (type) {
        case 'log':
        default:
          break
        case 'warn':
          cname = 'console-float-layer-warn'
          break;
      }
      let spanMsg = doc.createElement('span')
      let spanLine = doc.createElement('span')
      spanMsg.className = spanLine.className = 'console-float-layer-normal'
      spanMsg.innerHTML = msg
      spanLine.innerHTML = line
      el.appendChild(spanMsg)
      el.appendChild(spanLine)
    },
    trace () {
      let error = new Error()
      return error.stack.match(this.REG.FILEPATH)[2].match(this.REG.NAMEANDLINE)[0]
    },
    log (...args) {
      this.create(this.trace(), 'log', ...args)
    },
    warn (msg) {
      let p = doc.createElement('p')
      p.style = `display:block;font-size: 15px;margin:0;padding:0;background:rgba(255, 235, 59, 0.85);border-bottom: 1px solid rgba(255, 255, 255, 0.5);color: #000;`
      p.innerHTML = msg
      el.appendChild(p)
    }
  }
}(window, document, screen));
console.log(JSON.stringify(console.trace))