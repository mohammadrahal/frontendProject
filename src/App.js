import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Content from './dashbaord/Content';
import LoginPage from './dashbaord/LoginPage';
// import './index.css';

import Header from './portfolio/component/Header1';
import Whyus from './portfolio/component/whyus';
import ContactUs from './portfolio/component/contactus';
import Blog from './portfolio/component/blog';
import Projects from './portfolio/component/project';
import Footer from './portfolio/component/Footer1';
import Experience from './portfolio/component/experience';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<div> <Header />
            <Whyus />
            <Experience />
            <Blog />
            <Projects />
            <Footer />
          </div>}
          />

          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/Content" element={<Content />} />
        </Routes>
      </Router>


    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
