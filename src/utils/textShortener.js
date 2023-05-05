function textShortener(text, maxLen) {
  if (text.length > maxLen) {
    let newText = text.slice(0, maxLen - 3) + '...'
    return newText
  }
  return text
}

export default textShortener
