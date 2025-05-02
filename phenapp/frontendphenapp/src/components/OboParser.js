import React, { useState } from 'react';

function OboParser() {
  const [terms, setTerms] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Funció per parsejar fitxer .obo
  const parseOBO = (text) => {
    const blocks = text.split(/\n\[Term\]/g).map((block, i) => (i === 0 ? block : '[Term]' + block)).filter(Boolean);

    return blocks.map((block) => {
      const term = {};
      const lines = block.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('['));

      lines.forEach((line) => {
        const match = line.match(/^(\w+):\s+(.*)$/);
        if (match) {
          const [, key, rawValue] = match;
          const value = rawValue.trim();
          if (!term[key]) {
            term[key] = value;
          } else if (Array.isArray(term[key])) {
            term[key].push(value);
          } else {
            term[key] = [term[key], value];
          }
        }
      });

      return term;
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const parsedTerms = parseOBO(text);
      setTerms(parsedTerms);
    };
    reader.readAsText(file);
  };

  const handleSearch = () => {
    const lowerQuery = query.toLowerCase();
    const filtered = terms.filter((term) =>
      Object.values(term).some((val) => {
        if (Array.isArray(val)) return val.some(v => v.toLowerCase().includes(lowerQuery));
        return val.toLowerCase().includes(lowerQuery);
      })
    );
    setResults(filtered);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">.obo Term Finder</h1>

      <input type="file" accept=".obo,.txt" onChange={handleFileUpload} className="mb-4" />

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Paraula clau, ex: urinary"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 flex-1"
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">
          Cercar
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-2">Resultats ({results.length})</h2>
      <ul className="space-y-2">
        {results.map((term, index) => (
          <li key={index} className="border p-2 rounded">
            <strong>{term.id}</strong>: {term.name}
            {term.synonym && (
              <div className="text-sm text-gray-600 mt-1">
                <strong>Sinònims:</strong>{' '}
                {Array.isArray(term.synonym) ? term.synonym.join(', ') : term.synonym}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OboParser;