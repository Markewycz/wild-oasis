// TypeAheadDropDown.js
import { useState } from 'react';
import { Input } from '@/components/ui/input';

const TypeAheadDropDown = ({ items }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState('');

  const onTextChange = e => {
    const value = e.target.value;
    let newSuggestions = [];

    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      newSuggestions = items.sort().filter(item => regex.test(item));
    }

    setSuggestions(newSuggestions);
    setText(value);
  };

  const suggestionSelected = value => {
    setText(value);
    setSuggestions([]);
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }

    return (
      <ul>
        {suggestions.map(item => (
          <li key={item} onClick={() => suggestionSelected(item)}>
            {item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="TypeAheadDropDown">
      <Input
        onChange={onTextChange}
        placeholder="Search country"
        value={text}
        type="text"
      />
      {renderSuggestions()}
    </div>
  );
};

export default TypeAheadDropDown;
