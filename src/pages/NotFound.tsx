
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-bold text-gray-900">404</h1>
          <h2 className="mt-6 text-3xl font-medium text-gray-900">Page not found</h2>
          <p className="mt-2 text-sm text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="mt-8">
          <Link to="/">
            <Button className="w-full rounded-full">Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
