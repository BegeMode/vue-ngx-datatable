import { Component, Vue } from 'vue-property-decorator';

@Component({
  template: `
    <div class="progress-linear" role="progressbar">
      <div class="ngx-container">
        <div class="ngx-bar"></div>
      </div>
    </div>
  `,
})
export default class ProgressBarComponent extends Vue {}
