import "./App.css";
import MyChart from "./Chart";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <MyChart />
      </div>
    </QueryClientProvider>
  );
}

export default App;
