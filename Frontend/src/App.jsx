import { Route, Routes } from 'react-router-dom';
import About from './components/About/About';
import { default as Blog } from './components/Blog/Blog';
import BlogPost from './components/Blog/BlogPost';
import Contact from './components/Contact/Contact';
import ContactTable from './components/ContactTable/ContactTable';
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
      <Navbar />
      <GlobalSnackbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/blog" element={<Blog />} />
        
        {/* Consolidated contact routes */}
        <Route path="/contacts" element={<Contact />} />
        {/* <Route path="/contact-table" element={<Navigate to="/contacts" replace />} /> */}
          {/* Consolidated contact routes */}
          <Route path="/contact-table" element={<ContactTable />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;












