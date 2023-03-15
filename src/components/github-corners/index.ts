import { defineCustomElement } from "vue";
import GithubCornersCe from "./GithubCorners.ce.vue";

const GithubCorners = defineCustomElement(GithubCornersCe)
customElements.define('wc-github-corners', GithubCorners)

// export { GithubCorners}

// export function register() {
//   customElements.define('wc-github-corners', GithubCorners)
// }