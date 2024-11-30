import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-emerald-500">
              TypeFast
            </Link>
            <p className="text-sm text-neutral-400 mt-2">
              © 2023 TypeFast. All rights reserved.
            </p>
          </div>
          <nav className="flex space-x-4">
            <Link
              href="#"
              className="text-sm text-neutral-400 hover:text-emerald-500 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-neutral-400 hover:text-emerald-500 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-neutral-400 hover:text-emerald-500 transition-colors"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
