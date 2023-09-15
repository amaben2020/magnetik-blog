import { decode } from "html-entities";
import * as sanitizeHtml from "sanitize-html";
export const htmlSanitizeAndDecode = (html: string): string =>
  sanitizeHtml(decode(html));
