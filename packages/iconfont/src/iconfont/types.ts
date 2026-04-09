export interface VIconFontProps {
  /** Font class 中横线后的图标名，如 CSS 为 `.icon-shuidi` 则传 `shuidi` */
  icon: string;
  /** 字号；number 会转为 `px`，string 原样作为 font-size */
  size?: string | number;
  /** 图标颜色，对应 CSS color */
  color?: string;
  /** 额外类名 */
  customClass?: string;
  /** 与 iconfont.css 中图标类前缀一致，如 `.icon-xxx` 则为 `icon` */
  prefix?: string;
  /** 与 iconfont.css 中基础类名一致（设置 font-family 的容器类，常见为 `iconfont`） */
  fontfamily?: string;
}
