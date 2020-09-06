import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

export interface IPage {
  number: number;
  text: string;
}

@Component({
  template: `
    <ul class="pager">
      <li :class="{ disabled: !canPrevious }">
        <a role="button" aria-label="go to first page" href="javascript:void(0)" @click="selectPage(1)">
          <i :class="pagerPreviousIcon"></i>
        </a>
      </li>
      <li :class="{ disabled: !canPrevious }">
        <a role="button" aria-label="go to previous page" href="javascript:void(0)" @click="prevPage">
          <i :class="pagerLeftArrowIcon"></i>
        </a>
      </li>
      <li
        role="button"
        aria-label="'page ' + pg.number"
        class="pages"
        v-for="pg of pages"
        :class="{ active: pg.number === myPage }"
      >
        <a href="javascript:void(0)" @click="selectPage(pg.number)">
          {{ pg.text }}
        </a>
      </li>
      <li :class="{ disabled: !canNext }">
        <a role="button" aria-label="go to next page" href="javascript:void(0)" @click="nextPage">
          <i :class="pagerRightArrowIcon"></i>
        </a>
      </li>
      <li :class="{ disabled: !canNext }">
        <a role="button" aria-label="go to last page" href="javascript:void(0)" @click="selectPage(totalPages)">
          <i :class="pagerNextIcon"></i>
        </a>
      </li>
    </ul>
  `,
})
export default class DataTablePagerComponent extends Vue {
  @Prop() pagerLeftArrowIcon: string;
  @Prop() pagerRightArrowIcon: string;
  @Prop() pagerPreviousIcon: string;
  @Prop() pagerNextIcon: string;
  @Prop({ type: Number, default: 0 }) size: number;
  @Prop({ type: Number, default: 0 }) count: number;
  @Prop({ type: Number, default: 1 }) page: number;

  pages: any = [];
  myPage = 0;

  @Watch('count') onCountChanged(): void {
    this.pages = this.calcPages();
  }

  @Watch('size') onSizeChanged(): void {
    this.pages = this.calcPages();
  }

  @Watch('page') onPageChanged(): void {
    this.myPage = this.page;
    this.pages = this.calcPages();
  }

  created(): void {
    this.myPage = this.page;
    this.pages = this.calcPages();
  }

  get totalPages(): number {
    // const count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
    if (this.size < 1) {
      return 1;
    }
    let result = Math.ceil(this.count / this.size);
    const newCount = Math.floor(this.count / this.size) * this.size;
    if (this.count - newCount === 1) {
      // correct page's number if last page contnains one row
      result--;
    }
    return Math.max(result || 0, 1);
  }

  // @Output() change: EventEmitter<any> = new EventEmitter();

  get canPrevious(): boolean {
    return this.myPage > 1;
  }

  get canNext(): boolean {
    return this.myPage < this.totalPages;
  }

  prevPage(): void {
    this.selectPage(this.myPage - 1);
  }

  nextPage(): void {
    this.selectPage(this.myPage + 1);
  }

  selectPage(page: number): void {
    if (page > 0 && page <= this.totalPages && page !== this.myPage) {
      this.myPage = page;

      this.$emit('change-page', {
        page,
      });
    }
  }

  calcPages(page?: number): IPage[] {
    const pages: IPage[] = [];
    let startPage = 1;
    let endPage = this.totalPages;
    const maxSize = 5;
    const isMaxSized = maxSize < this.totalPages;

    page = page || this.myPage;

    if (isMaxSized) {
      startPage = page - Math.floor(maxSize / 2);
      endPage = page + Math.floor(maxSize / 2);

      if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(startPage + maxSize - 1, this.totalPages);
      } else if (endPage > this.totalPages) {
        startPage = Math.max(this.totalPages - maxSize + 1, 1);
        endPage = this.totalPages;
      }
    }

    for (let num = startPage; num <= endPage; num++) {
      pages.push({
        number: num,
        text: String(num),
      });
    }
    return pages;
  }
}
