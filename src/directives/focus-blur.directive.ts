import { Vue } from 'vue-property-decorator';

export default Vue.directive('focus-blur', {
  bind(el, binding, vnode) {
    // vnode.componentInstance.$on('blur', function(e) {
    //   console.log('received $on(blur) - event value:', event);
    // });
    // vnode.componentInstance.$on('input', function(e) {
    //   console.log('received $on(input) - event value:', e);
    // });
    
    el.addEventListener('blur', (e) => {
      console.log('received NATIVE(blur) - event value:', e.target);
    }, true);  // <======================================================= IMPORTANT
    
    el.addEventListener('input', (e) => {
      console.log('received NATIVE(input) - event value:', e.target);
    });
  },
  // unbind(el) {
  //   el.removeEventListener('blur', (e) => {
  //     console.log('received NATIVE(blur) - event value:', e.target);
  //   }, true);  // <======================================================= IMPORTANT
    
  //   el.removeEventListener('input', (e) => {
  //     console.log('received NATIVE(input) - event value:', e.target);
  //   });
  // }
});
