import BaseRelationshipRenderer from "./BaseRelationshipRenderer.vue";
import BaseParagraphRenderer from "./BaseParagraphRenderer.vue";
import BaseHeadingRenderer from "./BaseHeadingRenderer.vue";
import BaseListRenderer from "./BaseListRenderer.vue";
import BaseListItemRenderer from "./BaseListItemRenderer.vue";
import BaseListItemContentRenderer from "./BaseListItemContentRenderer.vue";
import BaseLayoutRenderer from "./BaseLayoutRenderer.vue";
import BaseImageRenderer from "./BaseImageRenderer.vue";
import BaseBlockquoteRenderer from "./BaseBlockquoteRenderer.vue";

export default {
  inline: {
    bold: "strong",
    code: "code",
    keyboard: "kbd",
    strikethrough: "s",
    italic: "em",
    subscript: "sub",
    superscript: "sup",
    underline: "u",
    relationship: BaseRelationshipRenderer,
  },
  block: {
    link: "a",
    block: "div",
    blockquote: BaseBlockquoteRenderer,
    paragraph: BaseParagraphRenderer,
    divider: "hr",
    heading: BaseHeadingRenderer,
    code: "pre",
    list: BaseListRenderer,
    listItem: BaseListItemRenderer,
    listItemContent: BaseListItemContentRenderer,
    layout: BaseLayoutRenderer,
    "component-block": BaseImageRenderer
  },
};
