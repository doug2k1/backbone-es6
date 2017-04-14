import _uniqueId from 'lodash.uniqueid'
import _result from 'lodash.result'
import matchesSelector from 'matches-selector'

// Cached regex to split keys for `delegate`.
const delegateEventSplitter = /^(\S+)\s*(.*)$/

export default class View {
  constructor () {
    this.tagName = 'div'
    this.cid = _uniqueId('view')
    this.el = document.createElement(this.tagName)
    this.el.id = this.cid
    this.eventListeners = []
    this.delegateEvents()
  }

  render () {
    return this
  }

  delegateEvents (events) {
    events = events || _result(this, 'events')
    if (!events) return this
    this.undelegateEvents()

    for (let key in events) {
      let method = events[key]
      if (typeof method !== 'function') method = this[method]
      if (!method) continue
      const match = key.match(delegateEventSplitter)
      this.delegate(match[1], match[2], method.bind(this))
    }

    return this
  }

  undelegateEvents () {
    if (this.el) {
      this.eventListeners.forEach((listener) => {
        this.el.removeEventListener(listener.type, listener.func)
      })
      this.eventListeners = []
    }
    return this
  }

  delegate (eventName, selector, listener) {
    const delegatedListener = function (e) {
      if (e.target && matchesSelector(e.target, selector)) listener.apply(this, arguments)
    }
    this.el.addEventListener(eventName, delegatedListener)
    this.eventListeners.push({
      type: eventName,
      func: delegatedListener
    })
    return this
  }
}
