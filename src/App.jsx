import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import CustomCursor from './components/cursor/CustomCursor.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './pages/Home.jsx';
import ProjectsList from './pages/ProjectsList.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import BlogList from './pages/BlogList.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import './styles/variables.css';

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <CustomCursor />
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<ProjectsList />} />
                    <Route path="/projects/:id" element={<ProjectDetail />} />
                    <Route path="/blog" element={<BlogList />} />
                    <Route path="/blog/:slug" element={<BlogDetail />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
