import { DarkThemeToggle } from "flowbite-react";
import Products from "./routes/products"


function App() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-4 dark:bg-gray-800 p-4">
      <div className="flex items-center justify-between w-full max-w-4xl mb-4">
        <h1 className="text-3xl dark:text-white">Rivki's children's clothing store</h1>
        <DarkThemeToggle />
      </div>
      <Products />
    </main>
  );
}

export default App;