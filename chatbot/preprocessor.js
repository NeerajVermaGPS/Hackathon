function formatText(text) {
    const boldRegex = /\*\*(.*?)\*\*/g;
    text = text.replace(boldRegex, '<strong>$1</strong>');

    const listRegex = /(?<!\*)\*(.*?)(?<!\*)/g;
    text = text.replace(listRegex, '$1');

    const italicRegex = /\*(.*?)\*/g;
    text = text.replace(italicRegex, '<em>$1</em>');

    const codeRegex = /```([\s\S]*?)```/g;
    text = text.replace(codeRegex, '<code>$1</code>');
    
    const spaceRegex = /(?<!<code>)[ ]{2,}(?![^<]*<\/code>)/g;
    text = text.replace(spaceRegex, '');

    return text;
}
