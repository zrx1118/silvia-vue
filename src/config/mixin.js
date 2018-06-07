import { getStyle } from './mUtils'
import { imgBaseUrl } from './env'

export const loadMore = {
  directives: {
    'load-more': {
      bind: (el, binding) => {
        let windowHeight = window.screen.height;
        let height;
        let setTop;
        let paddingBottom;
        let marginBottom;
        let requestFram;
        let oldScrollTop;
        let scrollE1;
        let heightE1;
        let scrollType = el.attributes.type && el.attributes.type.value;
        let scrollReduce = 2;
        if (scrollType == 2) {
          scrollE1 = el;
          heightE1 = el.children[0]
        } else {
          scrollE1 = document.body;
          heightE1 = el;
        }

        el.addEventListener('touchstart', () => {
          height = heightE1.clientHeight;
          if (scrollType == 2) {
            height = height
          }
          setTop = el.offsetTop;
          paddingBottom = getStyle(el, 'paddingBottom');
          marginBottom = getStyle(el, 'marginBottom');
        }, false)

        el.addEventListener('touchmove', () => {
          loadMore()
        }, false)

        el.addEventListener('touchend', () => {
          oldScrollTop = scrollE1.scrollTop;
          moveEnd();
        })

        const moveEnd = () => {
          requestFram = requestAnimationFrame(() => {
            if (scrollE1.scrollTop != oldScrollTop) {
              oldScrollTop = scrollE1.scrollTop;
              moveEnd();
            } else {
              cancelAnimationFrame(requestFram);
              height = heightE1.clientHeight;
              loadMore();
            }
          })
        }

        const loadMore = () => {
          if (scrollE1.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
            binding.value();
          }

        }
      }
    }
  }
}

export const getImgPath = {
  methods: {
    getImgPath(path) {
      let suffix;
      if (!path) {
        return '//elm.cangdu.org/img/default.jpg'
      }
      if (path.indexOf('jpeg') !== -1) {
        suffix = '.jpeg'
      } else {
        suffix = '.png'
      }
      let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
      return 'https://fuss10.elemecdn.com' + url
    }
  }
}
