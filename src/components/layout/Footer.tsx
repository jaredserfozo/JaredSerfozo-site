export default function Footer() {
  return (
    <footer className="border-t border-surface-hover bg-bg px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-text-secondary">
          &copy; {new Date().getFullYear()} Jared Serfozo. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/jaredserfozo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/jaredserfozo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary transition-colors hover:text-accent"
          >
            Instagram
          </a>
          <a
            href="https://www.youtube.com/lifeontech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary transition-colors hover:text-accent"
          >
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}
