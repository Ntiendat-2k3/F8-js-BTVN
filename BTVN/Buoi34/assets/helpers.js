export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

export const escapeHTML = (str) => {
     const lt = /</g,
          gt = />/g,
          ap = /'/g,
          ic = /"/g;
     return str
          .toString()
          .replace(lt, "&lt;")
          .replace(gt, "&gt;")
          .replace(ap, "&#39;")
          .replace(ic, "&#34;");
};
