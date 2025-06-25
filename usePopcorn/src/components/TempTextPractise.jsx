import { useState } from 'react';

export default function TempTextPractise() {
  return (
    <div className="font-sans space-y-6 p-6 max-w-2xl mx-auto">
      <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars and exploring new
        worlds. It's the stuff of dreams and science fiction, but believe it or not, space travel is
        a real thing. Humans and robots are constantly venturing out into the cosmos to uncover its
        secrets and push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={20}
        expandButtonText="Show text"
        collapseButtonText="Collapse text"
        buttonColor="#ff6622"
      >
        Space travel requires some seriously amazing technology and collaboration between countries,
        private companies, and international space organizations. And while it's not always easy (or
        cheap), the results are out of this world. Think about the first time humans stepped foot on
        the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander expanded={true} className="p-4 border border-gray-300 rounded bg-gray-100">
        Space missions have given us incredible insights into our universe and have inspired future
        generations to keep reaching for the stars. Space travel is a pretty cool thing to think
        about. Who knows what we'll discover next!
      </TextExpander>
    </div>
  );
}

function TextExpander({
  collapsedNumWords = 10,
  expandButtonText = 'Show more',
  collapseButtonText = 'Show less',
  expanded = false,
  className = '',
  buttonColor = '',
  children,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const words = typeof children === 'string' ? children.split(' ') : [];
  const displayText =
    isExpanded || words.length <= collapsedNumWords
      ? children
      : words.slice(0, collapsedNumWords).join(' ') + '...';

  return (
    <div className={`text-gray-800 leading-relaxed ${className}`}>
      <p className="mb-2">{displayText}</p>
      {words.length > collapsedNumWords && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm font-medium px-3 py-1 rounded shadow"
          style={{ backgroundColor: buttonColor || '#3b82f6', color: '#fff' }}
        >
          {isExpanded ? collapseButtonText : expandButtonText}
        </button>
      )}
    </div>
  );
}
