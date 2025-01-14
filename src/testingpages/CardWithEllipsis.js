import React from 'react';

const CardWithEllipsis = () => {
  const cardStyle = {
    width: '300px',
    height: '150px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2, // Limit to 4 lines
    WebkitBoxOrient: 'vertical',
    lineHeight: '1.5',
  };

  const text =
    "This is a sample card text that might be too long for the given space. When the text exceeds the allowed number of lines, it will be truncated with ellipsis (...)This is a sample card text that might be too long for the given space. When the text exceeds the allowed number of lines, it will be truncated with ellipsis (...).";

  return (
    <div style={cardStyle}>
      {text}
    </div>
  );
};

export default CardWithEllipsis;
