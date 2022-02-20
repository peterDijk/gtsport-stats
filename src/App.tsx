import { h, FunctionalComponent } from 'preact';
import { Router } from 'preact-router';

import Header from './components/Header';
import Home from './routes/Home';
import Test from './routes/Test';

const App: FunctionalComponent = () => {
  return (
    <div id="app" class="font-code relative mb-8 bg-richblack p-3">
      <Header />
      <Router>
        <Home path="/" />
        <Home path="/:userid" />
      </Router>
    </div>
  );
};

export default App;
