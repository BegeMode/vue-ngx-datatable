import { Component, Vue } from 'vue-property-decorator';

@Component({
  template: `
    <div class="progress-linear" role="progressbar">
      <div class="container">
        <div class="bar"></div>
      </div>
    </div>
  `,
})
export default class ProgressBarComponent extends Vue {
}
