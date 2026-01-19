interface FormattedSegment {
  readonly type: 'text' | 'list' | 'code';
  readonly content: string;
  readonly items?: readonly string[];
}

export function formatAnswerText(answer: string): FormattedSegment[] {
  const segments: FormattedSegment[] = [];
  const lines = answer.split('\n');
  
  let currentParagraph: string[] = [];
  let currentList: string[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.length === 0) {
      if (currentParagraph.length > 0) {
        segments.push({ type: 'text', content: currentParagraph.join(' ') });
        currentParagraph = [];
      }
      if (currentList.length > 0) {
        segments.push({ type: 'list', content: '', items: [...currentList] });
        currentList = [];
      }
      continue;
    }

    const isListItem = /^[-•*]\s/.test(trimmedLine) || /^\d+[.)]\s/.test(trimmedLine);
    
    if (isListItem) {
      if (currentParagraph.length > 0) {
        segments.push({ type: 'text', content: currentParagraph.join(' ') });
        currentParagraph = [];
      }
      const listContent = trimmedLine.replace(/^[-•*]\s/, '').replace(/^\d+[.)]\s/, '');
      currentList.push(listContent);
    } else {
      if (currentList.length > 0) {
        segments.push({ type: 'list', content: '', items: [...currentList] });
        currentList = [];
      }
      currentParagraph.push(trimmedLine);
    }
  }

  if (currentParagraph.length > 0) {
    segments.push({ type: 'text', content: currentParagraph.join(' ') });
  }
  if (currentList.length > 0) {
    segments.push({ type: 'list', content: '', items: [...currentList] });
  }

  return segments.map((segment) => {
    if (segment.type === 'text') {
      return {
        ...segment,
        content: formatTextIntoParagraphs(segment.content),
      };
    }
    return segment;
  });
}

function formatTextIntoParagraphs(text: string): string {
  const sentences = extractSentences(text);
  
  if (sentences.length <= 3) {
    return sentences.join(' ');
  }

  const paragraphs: string[] = [];
  let currentGroup: string[] = [];
  let sentenceCount = 0;
  const maxSentencesPerParagraph = 3;

  for (const sentence of sentences) {
    currentGroup.push(sentence);
    sentenceCount++;

    const shouldBreak = sentenceCount >= maxSentencesPerParagraph && 
                       (sentence.endsWith('.') || sentence.endsWith('!') || sentence.endsWith('?'));

    if (shouldBreak) {
      paragraphs.push(currentGroup.join(' '));
      currentGroup = [];
      sentenceCount = 0;
    }
  }

  if (currentGroup.length > 0) {
    paragraphs.push(currentGroup.join(' '));
  }

  return paragraphs.length > 0 ? paragraphs.join('\n\n') : text;
}

function extractSentences(text: string): string[] {
  const sentenceEndings = /([.!?])\s+/g;
  const sentences: string[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = sentenceEndings.exec(text)) !== null) {
    const sentence = text.substring(lastIndex, match.index + match[1].length).trim();
    if (sentence.length > 0) {
      sentences.push(sentence);
    }
    lastIndex = match.index + match[0].length;
  }

  const remaining = text.substring(lastIndex).trim();
  if (remaining.length > 0) {
    sentences.push(remaining);
  }

  return sentences.length > 0 ? sentences : [text];
}
