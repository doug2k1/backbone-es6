import View from './src/View'

class MyView extends View {
  events () {
    return {
      'click p': 'onClick'
    }
  }

  render () {
    this.el.innerHTML = '<p>my view p</p> <span>my span</span>'
    return this
  }

  onClick (e) {
    console.log(e)
  }
}

const myView = new MyView()
document.querySelector('#app').appendChild(myView.render().el)
