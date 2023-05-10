class TextEditor {
  static convertArrayToString(arrayToConvert, replacedValue, reverse) {
    return reverse
      ? arrayToConvert.reverse().toString().replace(replacedValue, '')
      : arrayToConvert.toString().replace(replacedValue, '');
  }
}
export default TextEditor;
