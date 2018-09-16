import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { AppComponent } from './app.component';

@Component({
  components: {
    app: AppComponent,
  },
})
class VueRootComponent extends Vue {
}
new VueRootComponent({ el: '#app-main' }).$mount();
