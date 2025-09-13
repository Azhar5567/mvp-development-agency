import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Process from './components/Process'
import WhyChooseUs from './components/WhyChooseUs'
import Pricing from './components/Pricing'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import Analytics from './components/Analytics'
import { SoundProvider } from './components/SoundControls'

function App() {
  return (
    <SoundProvider>
      <div className="min-h-screen bg-white">
        {/* Analytics */}
        <Analytics />
        
        {/* Scroll Components */}
        <ScrollProgress />
        
        {/* Core Components */}
        <Navbar />
        <Hero />
        <Services />
        <Process />
        <WhyChooseUs />
        <Pricing />
        <ContactForm />
        <Footer />
      </div>
    </SoundProvider>
  )
}

export default App
