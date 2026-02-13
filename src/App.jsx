import { Route, Switch } from "wouter";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import TechnologyPage from "./pages/TechnologyPage";
import PrivacyPage from "./pages/PrivacyPage";
import DemoPage from "./pages/DemoPage";

function App() {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" component={LandingPage} />
                <Route path="/technology" component={TechnologyPage} />
                <Route path="/privacy" component={PrivacyPage} />
                <Route path="/demo" component={DemoPage} />
                <Route path="/dashboard" component={Dashboard} />
                <Route>
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-4xl font-display font-bold mb-2">404</h1>
                            <p className="text-muted-foreground">Page not found</p>
                        </div>
                    </div>
                </Route>
            </Switch>
        </>
    );
}

export default App;
