import content from "./data";
function tr(text, lang) {
  return (content[text] || {})[lang] || text;
}
export default tr;