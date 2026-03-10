import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<ProjectsList />} />
                        <Route path="/projects/:id" element={<ProjectDetail />} />
                        <Route path="/blog" element={<BlogList />} />
                        <Route path="/blog/:slug" element={<BlogDetail />} />

                        {/* Old /en/ or other language paths will redirect to the home page seamlessly */}
                        <Route path="/tr/*" element={<Navigate to="/" replace />} />
                        <Route path="/en/*" element={<Navigate to="/" replace />} />
                        <Route path="/ar/*" element={<Navigate to="/" replace />} />
                        <Route path="/ru/*" element={<Navigate to="/" replace />} />
                        <Route path="/de/*" element={<Navigate to="/" replace />} />

                        {/* Any other unknown paths also redirect to home */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
