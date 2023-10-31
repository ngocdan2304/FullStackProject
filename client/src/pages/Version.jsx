import React, { useState, useEffect } from 'react';

export default function Version() {
  const [versionData, setVersionData] = useState(null);

  useEffect(() => {
    fetch('/version') // Replace with the actual path to your .version file
      .then((response) => response.text())
      .then((data) => setVersionData(data))
      .catch((error) => console.error('Error fetching version data:', error));
  }, []);

  return (
    <div>
      <h1>My React App</h1>
      {versionData && <p>Version: {versionData}</p>}
    </div>
  );
}