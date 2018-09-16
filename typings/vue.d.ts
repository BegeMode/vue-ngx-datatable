import Vue, { ComponentOptions } from "vue";

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    functional?: boolean;
  }
}

/*declare module "vue/types/vue" {
  interface Vue {
    metaInfo?: MetaInfo | (() => MetaInfo)
  }
}*/

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    log?: any;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $log?: any;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    $toasted?: any;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $toasted?: any;
  }
}
