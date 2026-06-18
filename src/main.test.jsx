import React from 'react'
import ReactDOM from 'react-dom/client'

function TestApp() {
  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#FFF7ED', minHeight: '100vh' }}>
      <h1>Lion Spices - Test</h1>
      <p>React is working!</p>
      <img src="/images/products/lion-spices-trio.png" alt="Lion Spices" style={{ maxWidth: '300px', marginTop: '20px' }} />
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <TestApp />
    </React.StrictMode>,
  );
}
