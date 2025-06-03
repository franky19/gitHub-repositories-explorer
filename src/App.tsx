/** @format */

// export default App
import React from "react";

import Search from "./component/Search";

const App: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">GitHub User Search</h1>
      <Search />
    </div>
  );
};

export default App;
