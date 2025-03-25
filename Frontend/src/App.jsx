import { Route, Routes } from 'react-router-dom';
import About from './components/About/About';
import { default as Blog, default as BlogList } from './components/Blog/Blog';
import BlogPost from './components/Blog/BlogPost';
import Contact from './components/Contact/Contact';
import Experience from './components/Experience/Experience';
import Home from './components/Home/Home'; // Import a new Home component
import Footer from './components/layouts/Footer';
import Navbar from './components/layouts/Navbar';
import NotFound from './components/NOTFOUND/NotFound';
import Projects from './components/Projects/Projects';
import Resume from './components/Resume/Resume';
import GlobalSnackbar from './features/snackbar/GlobalSnackbar';

const App = () => {
  return (
    <>
      {/* Navbar at the top */}
      <Navbar />

        {/* Snackbar for global notifications */}
        <GlobalSnackbar />

      {/* Routes */}
      <Routes>
        {/* Home Route with Hero */}
        <Route path="/" element={<Home />} />

        {/* Other Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Resume />} />
        <Route exact path="/blog" component={BlogList} />
        <Route path="/blog/:id" component={BlogPost} />

        {/* 404 - Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer at the bottom */}
      <Footer />
    </>
  );
};

export default App;












