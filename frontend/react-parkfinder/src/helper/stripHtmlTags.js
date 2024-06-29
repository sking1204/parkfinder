
function stripHtmlTags(html) {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  }

  export default stripHtmlTags;